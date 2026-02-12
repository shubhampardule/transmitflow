'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Download, Shield, Globe, Lock, ArrowLeftRight, Rocket, Users, Coffee, Heart } from 'lucide-react';
import { toast } from 'sonner';
import TransmitFlowLogo from './ui/TransmitFlowLogo';

import { TransferState } from '@/types';
import { signalingService } from '@/lib/signaling';
import { webrtcService } from '@/lib/webrtc';
import { generateRoomCode, downloadFile } from '@/lib/file-utils';

import SendFilesPanel from './SendFilesPanel';
import ReceiveFilesPanel from './ReceiveFilesPanel';
import TransferProgress from './TransferProgress';
import ThemeToggle from './ui/ThemeToggle';

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

  // Default fallback keeps production UX clean and avoids exposing internal/debug phrasing.
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

export default function P2PFileTransfer() {
  console.log('=== P2PFileTransfer COMPONENT RENDERING ===');

  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState<'send' | 'receive'>(() => {
    if (typeof window === 'undefined') {
      return 'send';
    }
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('receive') ? 'receive' : 'send';
  });
  console.log('Current activeTab in render:', activeTab);
  const [transferState, setTransferState] = useState<TransferState>({
    status: 'idle',
    files: [],
    progress: [],
  });
  
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

  const beginTransferSession = useCallback(() => {
    transferCompletedRef.current = false;
    transferFinalizedRef.current = false;
    transferSessionActiveRef.current = true;
    transferStartedToastShownRef.current = false;
    autoDownloadFailureToastShownRef.current = false;
    shownToastKeysRef.current.clear();
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

  // Define handleReset first since other functions depend on it
  const handleReset = useCallback(() => {
    webrtcService.cleanup();
    signalingService.removeAllListeners();
    resetTransferRuntimeState();
    setRoomCode('');
    setReceivedFiles([]);
    setTransferState({
      status: 'idle',
      files: [],
      progress: [],
    });
    setHasNavigatedToSharing(false);
    
    // Force return to Send tab when resetting
    setActiveTab('send');
    
    // Redirect to main page for clean state
    if (typeof window !== 'undefined') {
      console.log('Redirecting to main page for clean reset');
      window.location.href = window.location.origin;
    }
    
    console.log('Reset complete - redirected to main page');
  }, [resetTransferRuntimeState]);

  // Auto-switch to receive tab when QR code URL is detected (client-side only)
  useEffect(() => {
    console.log('=== SIMPLE useEffect TEST ===');
  }, []);

  // Auto-switch to receive tab when QR code URL is detected (client-side only)
  useEffect(() => {
    // Ensure page always starts at the top
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    
    console.log('=== useEffect running ===');
    console.log('typeof window:', typeof window);
    console.log('window.location:', typeof window !== 'undefined' ? window.location : 'undefined');
    console.log('window.location.search:', typeof window !== 'undefined' ? window.location.search : 'undefined');
    console.log('window.location.href:', typeof window !== 'undefined' ? window.location.href : 'undefined');
    
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const receiveCode = urlParams.get('receive');
      console.log('receiveCode from URL:', receiveCode);
      
      if (receiveCode) {
        console.log('QR code URL detected, switching to receive tab');
        setActiveTab('receive');
        setHasNavigatedToSharing(true);
        
        // Set up initial browser history state for receiver
        window.history.replaceState({ receiving: true, roomCode: receiveCode }, '', window.location.href);
      }
    }
  }, []);

  // Initialize signaling connection
  useEffect(() => {
    const connectToSignaling = async () => {
      try {
        console.log('Attempting to connect to signaling server...');
        console.log('Current connection state:', signalingService.isConnected());
        
        // Add a small delay to avoid rapid connection attempts
        await new Promise(resolve => setTimeout(resolve, 500));
        
        await signalingService.connect();
        console.log('Successfully connected to signaling server');
        setIsConnected(true);
      } catch (error) {
        console.error('Failed to connect to signaling server:', error);
        setIsConnected(false);
        
        // Retry connection after a delay
        setTimeout(() => {
          console.log('Retrying connection...');
          connectToSignaling();
        }, 2000);
      }
    };

    connectToSignaling();

    // Set up signaling event handlers
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
      if (!transferSessionActiveRef.current || transferFinalizedRef.current) {
        return;
      }
      const message = 'This share session has expired. Start a new transfer.';
      finalizeTransfer('error', message, message);
    });

    signalingService.onPeerDisconnected((peerId) => {
      console.log('Peer disconnected:', peerId);
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
  }, [finalizeTransfer, markTransferStarted]);

  // Network events: keep signaling status fresh and avoid abrupt UX on mobile reconnects.
  useEffect(() => {
    const handleOffline = () => {
      setIsConnected(false);
      if (transferSessionActiveRef.current && !transferFinalizedRef.current) {
        notifyOnce('network-offline', 'warning', 'Network connection lost. Waiting to reconnect...');
      }
    };

    const handleOnline = () => {
      void (async () => {
        if (transferSessionActiveRef.current && !transferFinalizedRef.current) {
          notifyOnce('network-online', 'info', 'Back online. Reconnecting signaling...');
        }

        try {
          await signalingService.connect();
          setIsConnected(true);
          if (transferSessionActiveRef.current && !transferFinalizedRef.current) {
            notifyOnce('network-online-restored', 'success', 'Signaling reconnected.');
          }
        } catch (error) {
          setIsConnected(false);
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
  }, [notifyOnce]);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      console.log('Browser back button pressed, current state:', { roomCode, hasNavigatedToSharing });
      console.log('PopState event state:', event.state);
      
      // If we're in a sharing state (have room code) and user pressed back
      if (roomCode || hasNavigatedToSharing) {
        console.log('Resetting to main state due to back button');
        
        // Reset to main state
        handleReset();
        
        // Ensure we stay on the current page without query parameters
        const cleanUrl = new URL(window.location.href);
        cleanUrl.search = '';
        window.history.replaceState({}, '', cleanUrl.toString());
      }
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Only show warning if there's an active transfer
      if (roomCode && (transferState.status === 'transferring' || transferState.status === 'connecting')) {
        event.preventDefault();
        event.returnValue = '';
        return '';
      }
    };

    // Add the event listeners
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [roomCode, hasNavigatedToSharing, handleReset, transferState.status]);

  // Set up WebRTC event handlers
  useEffect(() => {
    webrtcService.onConnectionStateChange = (state) => {
      console.log('WebRTC connection state:', state);
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
        } else {
          console.log('Connection closed after terminal transfer state.');
        }
      }
    };

    webrtcService.onDataChannelOpen = () => {
      console.log('Data channel opened');
      markTransferStarted();
    };

    webrtcService.onIncomingFiles = (fileList) => {
      if (!transferSessionActiveRef.current || transferFinalizedRef.current) {
        return;
      }

      console.log('Incoming files:', fileList);

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

      console.log('onFileReceived called with file:', file.name, file.size, 'bytes');
      setReceivedFiles((prev) => [...prev, file]);

      // Auto-download on receiver side. Avoid noisy success toasts for each file.
      try {
        downloadFile(file);
      } catch (error) {
        console.error('Error auto-downloading file:', error);
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

      // Mark the file as cancelled in progress instead of removing it.
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
        console.log('Ignoring post-terminal error:', rawError);
        return;
      }

      const error = toUserFriendlyError(rawError);
      console.error('WebRTC error:', rawError);
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

  // Connection timeout - auto-fail if stuck connecting for too long
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    
    if (transferState.status === 'connecting' && transferSessionActiveRef.current && !transferFinalizedRef.current) {
      // Allow more time for slow devices / networks to establish signaling + WebRTC.
      timeoutId = setTimeout(() => {
        if (
          transferStatusRef.current !== 'connecting' ||
          transferFinalizedRef.current ||
          !transferSessionActiveRef.current
        ) {
          return;
        }

        console.log('Connection timeout reached');
        const message = 'Connection timed out. On slow networks this can take up to 2 minutes — try again or re-check the code.';
        finalizeTransfer('error', message, message);
      }, 120000); // 2 minutes
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
    
    // Send cancellation message to peer
    webrtcService.cancelFile(fileIndex, file.name);
    
    // Mark the file as cancelled locally
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
    console.log('handleSendFiles called in main component');
    console.log('isConnected:', isConnected);
    console.log('files:', files);
    
    if (!isConnected) {
      console.log('Not connected to signaling server');
      return;
    }

    beginTransferSession();
    setReceivedFiles([]);

    const code = generateRoomCode();
    console.log('Generated room code:', code);
    setRoomCode(code);
    setHasNavigatedToSharing(true);
    
    // Create a browser history entry for the sharing state
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

    // Scroll to top when sharing starts
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      // Register listener before joining to avoid missing fast peer-joined events
      let senderInitialized = false;
      signalingService.onPeerJoined(async (peerId) => {
        if (senderInitialized || transferFinalizedRef.current) {
          return;
        }
        senderInitialized = true;

        console.log('Peer joined:', peerId);
        notifyOnce('peer-connected', 'success', 'Receiver connected. Starting transfer...');
        try {
          await webrtcService.initializeAsSender(code, files);
        } catch (error) {
          console.error('Failed to initialize sender after peer join:', error);
          const message = 'Failed to establish sender connection. Please retry.';
          finalizeTransfer('error', message, message);
        }
      });

      console.log('Joining room:', code);
      signalingService.joinRoom(code, { role: 'sender' });

    } catch (error) {
      console.error('Failed to initialize sender:', error);
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
    
    // Create a browser history entry for the receiving state
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
    } catch (error) {
      console.error('Failed to initialize receiver:', error);
      const message = 'Failed to join the file sharing session. Check the room code and retry.';
      finalizeTransfer('error', message, message);
    }
  }, [beginTransferSession, finalizeTransfer, isConnected, notifyOnce]);

  const handleCancelTransfer = useCallback(() => {
    webrtcService.cancelTransfer();
    handleReset();
  }, [handleReset]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Background layers */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="blob blob-1 absolute -top-48 -right-48 h-[600px] w-[600px] bg-indigo-400/15 dark:bg-indigo-600/8" />
        <div className="blob blob-2 absolute top-1/2 -left-48 h-[500px] w-[500px] bg-purple-400/10 dark:bg-purple-600/5" />
        <div className="blob blob-3 absolute -bottom-32 right-1/4 h-[450px] w-[450px] bg-pink-400/8 dark:bg-pink-600/4" />
        <div className="absolute inset-0 dot-pattern" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2.5">
            <TransmitFlowLogo size={28} />
            <span className="text-lg font-bold tracking-tight">
              Transmit<span className="text-gradient">Flow</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a href="https://github.com/shubhampardule/transmitflow" target="_blank" rel="noopener noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" title="GitHub">
              <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 md:px-6 pb-16">
        {transferState.status === 'idle' ? (
          <>
            {/* ─── SPLIT HERO ─── */}
            <section className="pt-12 md:pt-20 lg:pt-28 pb-16 lg:pb-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Card — first on mobile, second on desktop */}
                <div className="lg:order-2 w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto">
                  <div className="relative">
                    <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-[0.12] blur-2xl dark:opacity-[0.08]" />
                    <div className="relative rounded-2xl border border-border bg-card/90 backdrop-blur-sm shadow-2xl shadow-indigo-500/[0.04] p-1">
                      <div className="rounded-xl bg-card p-5 md:p-7">
                        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'send' | 'receive')} className="w-full">
                          <TabsList className="grid w-full grid-cols-2 h-11 rounded-lg bg-muted p-1">
                            <TabsTrigger value="send" className="flex items-center gap-2 rounded-md text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm">
                              <Upload className="h-4 w-4" />
                              Send
                            </TabsTrigger>
                            <TabsTrigger value="receive" className="flex items-center gap-2 rounded-md text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm">
                              <Download className="h-4 w-4" />
                              Receive
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="send" className="mt-6">
                            <SendFilesPanel onSendFiles={handleSendFiles} disabled={!isConnected} roomCode={roomCode} />
                          </TabsContent>
                          <TabsContent value="receive" className="mt-6">
                            <ReceiveFilesPanel onReceiveFiles={handleReceiveFiles} disabled={!isConnected} />
                          </TabsContent>
                        </Tabs>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hero text — second on mobile, first on desktop */}
                <div className="lg:order-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 dark:border-indigo-500/20 bg-indigo-50 dark:bg-indigo-500/10 px-3.5 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                    <Lock className="h-3 w-3" />
                    End-to-end encrypted
                  </div>
                  <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
                    Drop. Share.{' '}
                    <br className="hidden sm:block" />
                    <span className="text-gradient">Done.</span>
                  </h1>
                  <p className="mt-6 max-w-md text-lg text-muted-foreground leading-relaxed mx-auto lg:mx-0">
                    Transfer files peer-to-peer with WebRTC. No cloud uploads, no accounts, no file size limits.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 justify-center lg:justify-start text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-indigo-500" /> DTLS encrypted</span>
                    <span className="flex items-center gap-1.5"><Rocket className="h-4 w-4 text-purple-500" /> No size limits</span>
                    <span className="flex items-center gap-1.5"><Globe className="h-4 w-4 text-pink-500" /> Any browser</span>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── HOW IT WORKS ─── */}
            <section className="py-20 border-t border-border/40">
              <div className="text-center mb-14">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">How it works</span>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Three simple steps</h2>
              </div>
              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 max-w-3xl mx-auto">
                <div className="hidden md:block pointer-events-none absolute top-8 left-[calc(16.666%+2rem)] right-[calc(16.666%+2rem)] h-px bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30" />
                {[
                  { num: '01', title: 'Choose files', desc: 'Drop files or click to browse. Any file type, any size.' },
                  { num: '02', title: 'Share the code', desc: 'Send the room code or QR to the receiver.' },
                  { num: '03', title: 'Direct transfer', desc: 'Files flow peer-to-peer. Encrypted, fast, no cloud.' },
                ].map((step) => (
                  <div key={step.num} className="relative text-center">
                    <div className="relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-lg font-bold shadow-lg shadow-indigo-500/25 mb-5">
                      {step.num}
                    </div>
                    <h3 className="font-semibold text-lg">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-[220px] mx-auto">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ─── BENTO FEATURES ─── */}
            <section className="py-20 border-t border-border/40">
              <div className="text-center mb-14">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Features</span>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
                  Why <span className="text-gradient">TransmitFlow</span>?
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]">
                {/* Hero card: P2P */}
                <div className="md:col-span-2 lg:col-span-2 lg:row-span-2 rounded-2xl border border-border bg-card p-8 flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/[0.04]">
                  <div>
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-500/15">
                      <ArrowLeftRight className="h-6 w-6 text-indigo-500" />
                    </div>
                    <h3 className="mt-5 text-2xl font-bold">True Peer-to-Peer</h3>
                    <p className="mt-3 text-muted-foreground text-lg leading-relaxed max-w-lg">
                      Files travel directly between devices using WebRTC data channels. No cloud relay, no servers touching your data — as direct as handing someone a USB drive, but over the internet.
                    </p>
                  </div>
                  <p className="mt-6 text-xs text-muted-foreground/60 font-medium uppercase tracking-wider">Powered by WebRTC Data Channels</p>
                </div>
                {/* Privacy */}
                <div className="rounded-2xl border border-border bg-card p-6 flex flex-col transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/[0.04]">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-500/15">
                    <Lock className="h-5 w-5 text-violet-500" />
                  </div>
                  <h3 className="mt-4 font-semibold text-lg">Total Privacy</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Your files never touch a server. We can&apos;t see, store, or track them.</p>
                </div>
                {/* Encrypted */}
                <div className="rounded-2xl border border-border bg-card p-6 flex flex-col transition-all duration-200 hover:shadow-lg hover:shadow-rose-500/[0.04]">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-500/15">
                    <Shield className="h-5 w-5 text-rose-500" />
                  </div>
                  <h3 className="mt-4 font-semibold text-lg">Encrypted</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">DTLS-secured connections with isolated room sessions.</p>
                </div>
                {/* Speed */}
                <div className="rounded-2xl border border-border bg-card p-6 flex flex-col transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/[0.04]">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-500/15">
                    <Rocket className="h-5 w-5 text-amber-500" />
                  </div>
                  <h3 className="mt-4 font-semibold text-lg">No Limits</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Adaptive chunking for maximum throughput. Any file, any size.</p>
                </div>
                {/* Universal */}
                <div className="rounded-2xl border border-border bg-card p-6 flex flex-col transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/[0.04]">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-500/15">
                    <Globe className="h-5 w-5 text-emerald-500" />
                  </div>
                  <h3 className="mt-4 font-semibold text-lg">Works Everywhere</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Modern browser on any device. Zero installs needed.</p>
                </div>
                {/* Open Source */}
                <div className="rounded-2xl border border-border bg-card p-6 flex flex-col transition-all duration-200 hover:shadow-lg hover:shadow-sky-500/[0.04]">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 dark:bg-sky-500/15">
                    <Users className="h-5 w-5 text-sky-500" />
                  </div>
                  <h3 className="mt-4 font-semibold text-lg">Open Source</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Fully transparent codebase. Audit, contribute, or fork anytime.</p>
                </div>
              </div>
            </section>

            {/* ─── SUPPORT CTA ─── */}
            <section className="py-16">
              <div className="relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.06] via-purple-500/[0.04] to-pink-500/[0.06]" />
                <div className="relative px-6 py-12 md:px-12 text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-500/15 mb-5">
                    <Coffee className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="text-2xl font-bold">Enjoying TransmitFlow?</h3>
                  <p className="mt-3 text-muted-foreground max-w-sm mx-auto">Help keep it free, open-source, and ad-free for everyone.</p>
                  <a
                    href="https://buymeacoffee.com/shubhampardule"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/35 hover:brightness-110"
                  >
                    <Heart className="h-4 w-4" />
                    Support the Project
                  </a>
                </div>
              </div>
            </section>
          </>
        ) : (
          /* ─── TRANSFER ACTIVE ─── */
          <section className="pt-8 pb-20">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-2xl animate-glow-pulse" />
                <div className="relative rounded-2xl border border-border bg-card/90 backdrop-blur-sm shadow-2xl p-1">
                  <div className="rounded-xl bg-card p-5 md:p-7">
                    <TransferProgress
                      transferState={transferState}
                      roomCode={roomCode}
                      receivedFiles={receivedFiles}
                      onCancel={handleCancelTransfer}
                      onReset={handleReset}
                      onCancelFile={handleCancelFile}
                      role={activeTab}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/50 backdrop-blur-sm mt-8">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <TransmitFlowLogo size={20} />
              <span className="text-sm font-semibold">TransmitFlow</span>
              <span className="text-xs text-muted-foreground">— Direct device-to-device transfer</span>
            </div>
            <div className="flex items-center gap-2">
              <a href="https://github.com/shubhampardule/transmitflow" target="_blank" rel="noopener noreferrer" className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" title="GitHub">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a href="https://x.com/ShubhamPardule" target="_blank" rel="noopener noreferrer" className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" title="X (Twitter)">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">Built with ❤️ for the open web</p>
        </div>
      </footer>
    </div>
  );
}

