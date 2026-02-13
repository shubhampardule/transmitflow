import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'sonner';

import { TransferState } from '@/types';
import { signalingService } from '@/lib/signaling';
import { webrtcService } from '@/lib/webrtc';
import { generateRoomCode, downloadFile } from '@/lib/file-utils';

type TransferStatus = TransferState['status'];
type TerminalTransferStatus = Extract<TransferStatus, 'completed' | 'error' | 'cancelled'>;

const isTerminalStatus = (status: TransferStatus): status is TerminalTransferStatus => (
  status === 'completed' || status === 'error' || status === 'cancelled'
);

const ALLOWED_STATUS_TRANSITIONS: Record<TransferStatus, TransferStatus[]> = {
  idle: ['idle', 'connecting'],
  connecting: ['connecting', 'transferring', 'completed', 'error', 'cancelled'],
  transferring: ['transferring', 'completed', 'error', 'cancelled'],
  completed: ['completed'],
  error: ['error'],
  cancelled: ['cancelled'],
};

const toUserFriendlyError = (error: string): string => {
  const message = error.trim();

  if (/transfer incomplete|missing \d+ chunks/i.test(message)) {
    return 'Transfer incomplete. Some file data did not arrive. Please retry.';
  }

  if (/connection timeout/i.test(message)) {
    return 'Connection timed out. Check the room code and try again.';
  }

  if (/connection lost/i.test(message)) {
    return 'Connection was lost during transfer. Please retry.';
  }

  if (/connection failed/i.test(message)) {
    return 'Connection failed. Please retry.';
  }

  if (/timed out waiting for receiver confirmation/i.test(message)) {
    return 'Sender did not receive final confirmation from receiver. Please retry.';
  }

  if (/completion was received before all files were finalized/i.test(message)) {
    return 'Transfer ended before all files were finalized. Please retry.';
  }

  if (/integrity check failed|failed to persist received chunk|failed to process|signaling error/i.test(message)) {
    return 'Transfer failed due to a connection issue. Please retry.';
  }

  return 'Transfer could not be completed. Please retry.';
};

const toUserFriendlyCancelMessage = (
  cancelledBy: 'sender' | 'receiver' | 'system',
  reason?: string | null,
): string => {
  if (reason === 'all-files-cancelled') {
    return 'Transfer cancelled.';
  }

  if (cancelledBy === 'system') {
    return 'Transfer was cancelled.';
  }

  return `Transfer cancelled by ${cancelledBy}.`;
};

export function useP2PTransferController() {
  const [isConnected, setIsConnected] = useState(false);
  const [isOnline, setIsOnline] = useState(() => (typeof navigator === 'undefined' ? true : navigator.onLine));
  const [signalingError, setSignalingError] = useState<string | null>(null);
  const signalingConnectInFlightRef = useRef(false);
  const [activeTab, setActiveTab] = useState<'send' | 'receive'>(() => {
    if (typeof window === 'undefined') {
      return 'send';
    }
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('receive') ? 'receive' : 'send';
  });
  const [transferState, setTransferState] = useState<TransferState>({
    status: 'idle',
    files: [],
    progress: [],
  });
  const [transferStartedAt, setTransferStartedAt] = useState<number | null>(null);
  const [transferEndedAt, setTransferEndedAt] = useState<number | null>(null);

  const [roomCode, setRoomCode] = useState('');
  const [receivedFiles, setReceivedFiles] = useState<File[]>([]);
  const [hasNavigatedToSharing, setHasNavigatedToSharing] = useState(false);
  const transferStatusRef = useRef<TransferState['status']>('idle');
  const transferStateRef = useRef<TransferState>({
    status: 'idle',
    files: [],
    progress: [],
  });
  const transferCompletedRef = useRef(false);
  const transferFinalizedRef = useRef(false);
  const transferSessionActiveRef = useRef(false);
  const transferStartedToastShownRef = useRef(false);
  const autoDownloadFailureToastShownRef = useRef(false);
  const shownToastKeysRef = useRef<Set<string>>(new Set());
  const senderFilesRef = useRef<File[]>([]);

  const attemptSignalingConnect = useCallback(async () => {
    if (signalingConnectInFlightRef.current) {
      return;
    }

    signalingConnectInFlightRef.current = true;
    try {
      await signalingService.connect();
      setIsConnected(true);
      setSignalingError(null);
    } catch (error) {
      setIsConnected(false);
      setSignalingError(error instanceof Error ? error.message : 'Unable to connect');
      throw error;
    } finally {
      signalingConnectInFlightRef.current = false;
    }
  }, []);

  const handleRetrySignaling = useCallback(() => {
    void attemptSignalingConnect();
  }, [attemptSignalingConnect]);

  const signalingStatus = (() => {
    if (!isOnline) {
      return { label: 'Offline', dotClass: 'bg-rose-500' };
    }

    if (isConnected) {
      return { label: 'Ready', dotClass: 'bg-emerald-500' };
    }

    return { label: 'Connecting', dotClass: 'bg-amber-500' };
  })();

  useEffect(() => {
    transferStatusRef.current = transferState.status;
    transferStateRef.current = transferState;
  }, [transferState]);

  const notifyOnce = useCallback((
    key: string,
    level: 'success' | 'error' | 'warning' | 'info',
    message: string,
    options?: { description?: string; duration?: number },
  ) => {
    if (shownToastKeysRef.current.has(key)) {
      return;
    }
    shownToastKeysRef.current.add(key);
    toast[level](message, options);
  }, []);

  const resetTransferRuntimeState = useCallback(() => {
    transferCompletedRef.current = false;
    transferFinalizedRef.current = false;
    transferSessionActiveRef.current = false;
    transferStartedToastShownRef.current = false;
    autoDownloadFailureToastShownRef.current = false;
    shownToastKeysRef.current.clear();
  }, []);

  const resetToTab = useCallback((tab: 'send' | 'receive') => {
    webrtcService.cleanup();
    signalingService.leaveRoom();
    resetTransferRuntimeState();
    senderFilesRef.current = [];
    setRoomCode('');
    setReceivedFiles([]);
    setTransferState({
      status: 'idle',
      files: [],
      progress: [],
    });
    setTransferStartedAt(null);
    setTransferEndedAt(null);
    setHasNavigatedToSharing(false);
    setActiveTab(tab);

    if (typeof window !== 'undefined') {
      const cleanUrl = new URL(window.location.href);
      cleanUrl.search = '';
      window.history.replaceState({}, '', cleanUrl.toString());
      window.scrollTo(0, 0);
    }
  }, [resetTransferRuntimeState]);

  const beginTransferSession = useCallback(() => {
    transferCompletedRef.current = false;
    transferFinalizedRef.current = false;
    transferSessionActiveRef.current = true;
    transferStartedToastShownRef.current = false;
    autoDownloadFailureToastShownRef.current = false;
    shownToastKeysRef.current.clear();
    setTransferStartedAt(Date.now());
    setTransferEndedAt(null);
  }, []);

  const updateTransferStatus = useCallback((nextStatus: TransferStatus, error?: string) => {
    setTransferState((prev) => {
      const allowedNextStatuses = ALLOWED_STATUS_TRANSITIONS[prev.status];
      if (!allowedNextStatuses.includes(nextStatus)) {
        return prev;
      }

      const clearError =
        nextStatus === 'connecting' || nextStatus === 'transferring' || nextStatus === 'completed';
      const nextError = clearError ? undefined : error ?? prev.error;

      if (prev.status === nextStatus && prev.error === nextError) {
        return prev;
      }

      return { ...prev, status: nextStatus, error: nextError };
    });
  }, []);

  const finalizeTransfer = useCallback((
    status: TerminalTransferStatus,
    toastMessage: string,
    errorText?: string,
  ) => {
    if (transferFinalizedRef.current) {
      return;
    }

    transferFinalizedRef.current = true;
    transferSessionActiveRef.current = false;
    transferCompletedRef.current = status === 'completed';
    setTransferEndedAt(Date.now());

    updateTransferStatus(
      status,
      status === 'completed' ? undefined : (errorText ?? toastMessage),
    );

    notifyOnce(
      `transfer-${status}`,
      status === 'completed' ? 'success' : status === 'cancelled' ? 'warning' : 'error',
      toastMessage,
    );
  }, [notifyOnce, updateTransferStatus]);

  const markTransferStarted = useCallback(() => {
    if (transferFinalizedRef.current || !transferSessionActiveRef.current) {
      return;
    }

    updateTransferStatus('transferring');

    if (!transferStartedToastShownRef.current) {
      transferStartedToastShownRef.current = true;
      notifyOnce('transfer-started', 'info', 'Transfer started');
    }
  }, [notifyOnce, updateTransferStatus]);

  const handleReset = useCallback(() => {
    resetToTab('send');
  }, [resetToTab]);

  const handleBackToSend = useCallback(() => {
    resetToTab('send');
  }, [resetToTab]);

  const handleBackToReceive = useCallback(() => {
    resetToTab('receive');
  }, [resetToTab]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }

    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const receiveCode = urlParams.get('receive');

      if (receiveCode) {
        setActiveTab('receive');
        setHasNavigatedToSharing(true);
        window.history.replaceState({ receiving: true, roomCode: receiveCode }, '', window.location.href);
      }
    }
  }, []);

  useEffect(() => {
    const connectToSignaling = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        await attemptSignalingConnect();
      } catch (error) {
        setIsConnected(false);
        setSignalingError(error instanceof Error ? error.message : 'Unable to connect');

        setTimeout(() => {
          void connectToSignaling();
        }, 2000);
      }
    };

    void connectToSignaling();

    signalingService.onRoomFull((data) => {
      if (!transferSessionActiveRef.current || transferFinalizedRef.current) {
        return;
      }
      const message = `Room ${data.room} is full. Only 2 people can share files at once.`;
      finalizeTransfer('error', message, 'Room is full.');
    });

    signalingService.onRoomBusy((data) => {
      if (!transferSessionActiveRef.current || transferFinalizedRef.current) {
        return;
      }
      const message = `Room ${data.room} is currently busy with another transfer.`;
      finalizeTransfer('error', message, 'Room is busy.');
    });

    signalingService.onRoomExpired(() => {
      signalingService.leaveRoom();
      if (!transferSessionActiveRef.current || transferFinalizedRef.current) {
        return;
      }
      const message = 'This share session has expired. Start a new transfer.';
      finalizeTransfer('error', message, message);
    });

    signalingService.onPeerDisconnected(() => {
      if (!transferSessionActiveRef.current || transferFinalizedRef.current) {
        return;
      }
      const message = 'Peer disconnected before transfer completed.';
      finalizeTransfer('error', message, message);
    });

    signalingService.onTransferStarted(() => {
      markTransferStarted();
    });

    signalingService.onTransferCompleted(() => {
      if (!transferSessionActiveRef.current || transferFinalizedRef.current) {
        return;
      }

      const hadCancelledFiles = transferStateRef.current.progress.some((p) => p.cancelled);
      const message = hadCancelledFiles
        ? 'Transfer finished. Some files were cancelled.'
        : 'Transfer completed successfully!';
      finalizeTransfer('completed', message);
    });

    signalingService.onTransferCancelled((data) => {
      if (!transferSessionActiveRef.current || transferFinalizedRef.current) {
        return;
      }

      const raw = data.cancelledBy;
      const cancelledBy: 'sender' | 'receiver' | 'system' =
        raw === 'sender' || raw === 'receiver' || raw === 'system' ? raw : 'system';

      const message = toUserFriendlyCancelMessage(cancelledBy, data.reason);

      finalizeTransfer('cancelled', message, message);
    });

    return () => {
      webrtcService.cleanup();
      signalingService.disconnect();
    };
  }, [attemptSignalingConnect, finalizeTransfer, markTransferStarted]);

  useEffect(() => {
    const handleOffline = () => {
      setIsOnline(false);
      setIsConnected(false);
      if (transferSessionActiveRef.current && !transferFinalizedRef.current) {
        notifyOnce('network-offline', 'warning', 'Network connection lost. Waiting to reconnect...');
      }
    };

    const handleOnline = () => {
      setIsOnline(true);
      void (async () => {
        if (transferSessionActiveRef.current && !transferFinalizedRef.current) {
          notifyOnce('network-online', 'info', 'Back online. Reconnecting signaling...');
        }

        try {
          await attemptSignalingConnect();
          if (transferSessionActiveRef.current && !transferFinalizedRef.current) {
            notifyOnce('network-online-restored', 'success', 'Signaling reconnected.');
          }
        } catch (error) {
          setIsConnected(false);
          setSignalingError(error instanceof Error ? error.message : 'Unable to connect');
          console.warn('Signaling reconnect after online event failed:', error);
        }
      })();
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [attemptSignalingConnect, notifyOnce]);

  useEffect(() => {
    const handlePopState = () => {
      if (roomCode || hasNavigatedToSharing) {
        handleReset();

        const cleanUrl = new URL(window.location.href);
        cleanUrl.search = '';
        window.history.replaceState({}, '', cleanUrl.toString());
      }
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (roomCode && (transferState.status === 'transferring' || transferState.status === 'connecting')) {
        event.preventDefault();
        event.returnValue = '';
        return '';
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [roomCode, hasNavigatedToSharing, handleReset, transferState.status]);

  useEffect(() => {
    webrtcService.onConnectionStateChange = (state) => {
      if (!transferSessionActiveRef.current && !transferFinalizedRef.current) {
        return;
      }

      if (state === 'connected') {
        if (!transferFinalizedRef.current) {
          if (transferStatusRef.current === 'idle' || transferStatusRef.current === 'connecting') {
            updateTransferStatus('connecting');
          }
        }
      } else if (state === 'failed') {
        finalizeTransfer('error', 'Connection failed. Please try again.', 'Connection failed.');
      } else if (state === 'disconnected') {
        if (!transferFinalizedRef.current && !transferCompletedRef.current) {
          const message = 'Connection lost before transfer completed. Please retry.';
          finalizeTransfer('error', message, message);
        }
      }
    };

    webrtcService.onDataChannelOpen = () => {
      markTransferStarted();
    };

    webrtcService.onIncomingFiles = (fileList) => {
      if (!transferSessionActiveRef.current || transferFinalizedRef.current) {
        return;
      }

      setTransferState((prev) => {
        if (isTerminalStatus(prev.status)) {
          return prev;
        }

        return {
          ...prev,
          files: fileList,
          status: 'transferring',
          error: undefined,
        };
      });
      markTransferStarted();
    };

    webrtcService.onTransferProgress = (progress) => {
      if (!transferSessionActiveRef.current || transferFinalizedRef.current) {
        return;
      }

      setTransferState((prev) => {
        if (isTerminalStatus(prev.status)) {
          return prev;
        }

        const nextProgressEntry = {
          fileIndex: progress.fileIndex,
          fileName: progress.fileName,
          progress: progress.progress,
          speed: progress.speed,
          bytesTransferred: progress.bytesTransferred,
          totalBytes: progress.totalBytes,
          stage: progress.stage,
          conversionProgress: progress.conversionProgress,
        };

        const existingIndex = prev.progress.findIndex((p) => p.fileIndex === progress.fileIndex);
        const nextProgress = existingIndex === -1
          ? [...prev.progress, nextProgressEntry]
          : prev.progress.map((p, index) => index === existingIndex ? nextProgressEntry : p);

        return {
          ...prev,
          status: 'transferring',
          error: undefined,
          progress: nextProgress,
        };
      });

      if (!transferStartedToastShownRef.current) {
        transferStartedToastShownRef.current = true;
        notifyOnce('transfer-started', 'info', 'Transfer started');
      }
    };

    webrtcService.onFileReceived = (file) => {
      if (transferFinalizedRef.current && transferStatusRef.current !== 'completed') {
        return;
      }

      setReceivedFiles((prev) => [...prev, file]);

      try {
        downloadFile(file);
      } catch {
        if (!autoDownloadFailureToastShownRef.current) {
          autoDownloadFailureToastShownRef.current = true;
          notifyOnce(
            'auto-download-failed',
            'warning',
            'Automatic download was blocked by the browser.',
            {
              description: 'Use the download button next to each file.',
              duration: 7000,
            },
          );
        }
      }
    };

    webrtcService.onTransferComplete = () => {
      const hadCancelledFiles = transferStateRef.current.progress.some((p) => p.cancelled);
      const message = hadCancelledFiles
        ? 'Transfer finished. Some files were cancelled.'
        : 'Transfer completed successfully!';
      finalizeTransfer('completed', message);
    };

    webrtcService.onTransferCancelled = ({ cancelledBy, reason }) => {
      const message = toUserFriendlyCancelMessage(cancelledBy, reason);
      finalizeTransfer('cancelled', message, message);
    };

    webrtcService.onFileCancelled = (data) => {
      if (transferFinalizedRef.current) {
        return;
      }

      notifyOnce(
        `file-cancelled-${data.fileIndex}-${data.cancelledBy}`,
        'warning',
        `File "${data.fileName}" was cancelled by ${data.cancelledBy}.`,
      );

      setTransferState((prev) => ({
        ...prev,
        progress: [
          ...prev.progress.filter((p) => p.fileIndex !== data.fileIndex),
          {
            fileIndex: data.fileIndex,
            fileName: data.fileName,
            progress: 0,
            speed: 0,
            bytesTransferred: 0,
            totalBytes: 0,
            cancelled: true,
            cancelledBy: data.cancelledBy,
            stage: 'transferring' as const,
          },
        ],
      }));
    };

    webrtcService.onError = (rawError) => {
      if (transferFinalizedRef.current) {
        return;
      }

      const error = toUserFriendlyError(rawError);
      finalizeTransfer('error', error, error);
    };

    return () => {
      webrtcService.onConnectionStateChange = undefined;
      webrtcService.onDataChannelOpen = undefined;
      webrtcService.onIncomingFiles = undefined;
      webrtcService.onTransferProgress = undefined;
      webrtcService.onFileReceived = undefined;
      webrtcService.onTransferComplete = undefined;
      webrtcService.onTransferCancelled = undefined;
      webrtcService.onFileCancelled = undefined;
      webrtcService.onError = undefined;
    };
  }, [finalizeTransfer, markTransferStarted, notifyOnce, updateTransferStatus]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (transferState.status === 'connecting' && transferSessionActiveRef.current && !transferFinalizedRef.current) {
      timeoutId = setTimeout(() => {
        if (
          transferStatusRef.current !== 'connecting' ||
          transferFinalizedRef.current ||
          !transferSessionActiveRef.current
        ) {
          return;
        }

        const message = 'Connection timed out. On slow networks this can take up to 2 minutes — try again or re-check the code.';
        finalizeTransfer('error', message, message);
      }, 120000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [finalizeTransfer, transferState.status]);

  const handleCancelFile = useCallback((fileIndex: number) => {
    if (
      transferStatusRef.current !== 'transferring' ||
      !transferSessionActiveRef.current ||
      transferFinalizedRef.current
    ) {
      return;
    }

    const file = transferState.files[fileIndex];
    if (!file) return;

    const currentProgress = transferState.progress.find(p => p.fileIndex === fileIndex);
    if (currentProgress?.cancelled || (currentProgress && currentProgress.progress >= 100)) {
      return;
    }

    const cancelledBy: 'sender' | 'receiver' =
      webrtcService.currentRole === 'receiver' ? 'receiver' : 'sender';

    webrtcService.cancelFile(fileIndex, file.name);

    setTransferState((prev) => ({
      ...prev,
      progress: [
        ...prev.progress.filter((p) => p.fileIndex !== fileIndex),
        {
          fileIndex,
          fileName: file.name,
          progress: 0,
          speed: 0,
          bytesTransferred: 0,
          totalBytes: file.size,
          cancelled: true,
          cancelledBy,
          stage: 'transferring' as const,
        }
      ]
    }));

    notifyOnce(`file-local-cancel-${fileIndex}`, 'info', `File "${file.name}" cancelled.`);
  }, [notifyOnce, transferState.files, transferState.progress]);

  const handleSendFiles = useCallback(async (files: File[]) => {
    senderFilesRef.current = files;

    if (!isConnected) {
      return;
    }

    beginTransferSession();
    setReceivedFiles([]);

    const code = generateRoomCode();
    setRoomCode(code);
    setHasNavigatedToSharing(true);

    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('sharing', code);
    window.history.pushState({ sharing: true, roomCode: code }, '', currentUrl.toString());

    setTransferState({
      status: 'connecting',
      files: files.map((f, index) => ({
        name: f.name,
        size: f.size,
        type: f.type,
        lastModified: f.lastModified,
        fileIndex: index,
      })),
      progress: [],
      error: undefined,
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      let senderInitialized = false;
      signalingService.onPeerJoined(async () => {
        if (senderInitialized || transferFinalizedRef.current) {
          return;
        }
        senderInitialized = true;

        notifyOnce('peer-connected', 'success', 'Receiver connected. Starting transfer...');
        try {
          await webrtcService.initializeAsSender(code, files);
        } catch {
          const message = 'Failed to establish sender connection. Please retry.';
          finalizeTransfer('error', message, message);
        }
      });

      signalingService.joinRoom(code, { role: 'sender' });

    } catch {
      const message = 'Failed to start file sharing. Please try again.';
      finalizeTransfer('error', message, message);
    }
  }, [beginTransferSession, finalizeTransfer, isConnected, notifyOnce]);

  const handleReceiveFiles = useCallback(async (code: string) => {
    if (!isConnected) {
      return;
    }

    beginTransferSession();
    setReceivedFiles([]);

    setRoomCode(code);
    setHasNavigatedToSharing(true);

    const currentUrl = new URL(window.location.href);
    if (!currentUrl.searchParams.has('receive')) {
      currentUrl.searchParams.set('receive', code);
      window.history.pushState({ receiving: true, roomCode: code }, '', currentUrl.toString());
    }

    setTransferState({
      status: 'connecting',
      files: [],
      progress: [],
      error: undefined,
    });

    try {
      signalingService.joinRoom(code, { role: 'receiver' });
      await webrtcService.initializeAsReceiver(code);
      notifyOnce('receiver-joined', 'info', 'Joined room. Waiting for sender...');
    } catch {
      const message = 'Failed to join the file sharing session. Check the room code and retry.';
      finalizeTransfer('error', message, message);
    }
  }, [beginTransferSession, finalizeTransfer, isConnected, notifyOnce]);

  const handleRetry = useCallback(() => {
    void (async () => {
      try {
        await attemptSignalingConnect();
      } catch {
      }

      if (activeTab === 'send') {
        const files = senderFilesRef.current;
        if (!files || files.length === 0) {
          const message = 'Please select files again to create a new room.';
          finalizeTransfer('error', message, message);
          return;
        }

        try {
          signalingService.leaveRoom();

          beginTransferSession();
          setReceivedFiles([]);

          const code = generateRoomCode();
          setRoomCode(code);
          setHasNavigatedToSharing(true);

          const currentUrl = new URL(window.location.href);
          currentUrl.searchParams.set('sharing', code);
          window.history.replaceState({ sharing: true, roomCode: code }, '', currentUrl.toString());

          setTransferState({
            status: 'connecting',
            files: files.map((f, index) => ({
              name: f.name,
              size: f.size,
              type: f.type,
              lastModified: f.lastModified,
              fileIndex: index,
            })),
            progress: [],
            error: undefined,
          });

          window.scrollTo({ top: 0, behavior: 'smooth' });

          let senderInitialized = false;
          signalingService.onPeerJoined(async () => {
            if (senderInitialized || transferFinalizedRef.current) {
              return;
            }
            senderInitialized = true;

            notifyOnce('peer-connected', 'success', 'Receiver connected. Starting transfer...');
            try {
              await webrtcService.initializeAsSender(code, files);
            } catch {
              const message = 'Failed to establish sender connection. Please retry.';
              finalizeTransfer('error', message, message);
            }
          });

          signalingService.joinRoom(code, { role: 'sender' });
          notifyOnce('retry-new-room', 'info', 'New room code created. Share this code with receiver.');
        } catch {
          const message = 'Could not create a new room. Please retry.';
          finalizeTransfer('error', message, message);
        }

        return;
      }

      if (activeTab === 'receive' && roomCode) {
        await handleReceiveFiles(roomCode);
      }
    })();
  }, [activeTab, attemptSignalingConnect, beginTransferSession, finalizeTransfer, handleReceiveFiles, notifyOnce, roomCode]);

  const handleCancelTransfer = useCallback(() => {
    webrtcService.cancelTransfer();
    handleReset();
  }, [handleReset]);

  return {
    isConnected,
    isOnline,
    signalingError,
    signalingStatus,
    activeTab,
    setActiveTab,
    transferState,
    transferStartedAt,
    transferEndedAt,
    roomCode,
    receivedFiles,
    handleRetrySignaling,
    handleSendFiles,
    handleReceiveFiles,
    handleCancelTransfer,
    handleReset,
    handleCancelFile,
    handleRetry,
    handleBackToSend,
    handleBackToReceive,
  };
}
