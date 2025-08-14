'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Download, Wifi, WifiOff, Zap } from 'lucide-react';
import { toast } from 'sonner';

import { TransferState } from '@/types';
import { signalingService } from '@/lib/signaling';
import { webrtcService } from '@/lib/webrtc';
import { generateRoomCode } from '@/lib/file-utils';

import SendFilesPanel from './SendFilesPanel';
import ReceiveFilesPanel from './ReceiveFilesPanel';
import TransferProgress from './TransferProgress';

export default function P2PFileTransfer() {
  console.log('=== P2PFileTransfer COMPONENT RENDERING ===');
  
  const searchParams = useSearchParams();
  const receiveCode = searchParams.get('receive');
  console.log('Next.js searchParams receive:', receiveCode);
  
  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState<'send' | 'receive'>(receiveCode ? 'receive' : 'send');
  console.log('Current activeTab in render:', activeTab);
  const [transferState, setTransferState] = useState<TransferState>({
    status: 'idle',
    files: [],
    progress: [],
  });
  
  const [roomCode, setRoomCode] = useState('');
  const [receivedFiles, setReceivedFiles] = useState<File[]>([]);
  const [hasNavigatedToSharing, setHasNavigatedToSharing] = useState(false);

  // Define handleReset first since other functions depend on it
  const handleReset = useCallback(() => {
    webrtcService.cleanup();
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
  }, []);

  // Auto-switch to receive tab when QR code URL is detected (client-side only)
  useEffect(() => {
    console.log('=== SIMPLE useEffect TEST ===');
  }, []);

  // Auto-switch to receive tab when QR code URL is detected (client-side only)
  useEffect(() => {
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
      toast.error(`Room ${data.room} is full! Only 2 people can share files at once.`);
      setTransferState(prev => ({ ...prev, status: 'error', error: 'Room is full' }));
    });

    signalingService.onRoomBusy((data) => {
      toast.error(`Room ${data.room} is currently transferring files. Please try again later.`);
      setTransferState(prev => ({ ...prev, status: 'error', error: 'Room is busy' }));
    });

    signalingService.onRoomExpired(() => {
      toast.error('This share session has expired. Please create a new one.');
      handleReset();
    });

    signalingService.onPeerDisconnected((peerId) => {
      console.log('Peer disconnected:', peerId);
      handleReset();
    });

    return () => {
      webrtcService.cleanup();
      signalingService.disconnect();
    };
  }, [handleReset]);

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
      if (state === 'connected') {
        setTransferState(prev => ({ ...prev, status: 'connecting' }));
      } else if (state === 'failed' || state === 'disconnected') {
        setTransferState(prev => ({ ...prev, status: 'error', error: 'Connection failed' }));
      }
    };

    webrtcService.onDataChannelOpen = () => {
      console.log('Data channel opened');
      setTransferState(prev => ({ ...prev, status: 'transferring' }));
    };

    webrtcService.onIncomingFiles = (fileList) => {
      console.log('Incoming files:', fileList);
      
      setTransferState(prev => ({
        ...prev,
        files: fileList, // Keep as FileMetadata[]
        status: 'transferring'
      }));
    };

    webrtcService.onTransferProgress = (progress) => {
      setTransferState(prev => ({
        ...prev,
        progress: prev.progress.map(p => 
          p.fileIndex === progress.fileIndex ? {
            fileIndex: progress.fileIndex,
            fileName: progress.fileName,
            progress: progress.progress,
            speed: progress.speed,
            bytesTransferred: progress.bytesTransferred,
            totalBytes: progress.totalBytes,
          } : p
        ).concat(
          prev.progress.find(p => p.fileIndex === progress.fileIndex) ? [] : [{
            fileIndex: progress.fileIndex,
            fileName: progress.fileName,
            progress: progress.progress,
            speed: progress.speed,
            bytesTransferred: progress.bytesTransferred,
            totalBytes: progress.totalBytes,
          }]
        )
      }));
    };

    webrtcService.onFileReceived = (file) => {
      console.log('onFileReceived called with file:', file.name, file.size, 'bytes');
      setReceivedFiles(prev => [...prev, file]);
      
      // Show success notification without auto-download
      toast.success(`File received: ${file.name}`, {
        description: 'Click the download button to save the file',
        duration: 5000,
      });
    };

    webrtcService.onTransferComplete = () => {
      setTransferState(prev => ({ ...prev, status: 'completed' }));
      toast.success('Transfer completed successfully!');
    };

    webrtcService.onTransferCancelled = (cancelledBy) => {
      toast.warning(`Transfer cancelled by ${cancelledBy}`);
      setTransferState(prev => ({ 
        ...prev, 
        status: 'error',
        error: `Transfer cancelled by ${cancelledBy}`
      }));
    };

    webrtcService.onFileCancelled = (data) => {
      toast.warning(`File "${data.fileName}" cancelled by ${data.cancelledBy}`);
      // Mark the file as cancelled in progress instead of removing it
      setTransferState(prev => ({
        ...prev,
        progress: [
          ...prev.progress.filter(p => p.fileIndex !== data.fileIndex),
          {
            fileIndex: data.fileIndex,
            fileName: data.fileName,
            progress: 0,
            speed: 0,
            bytesTransferred: 0,
            totalBytes: 0,
            cancelled: true,
            cancelledBy: data.cancelledBy
          }
        ]
      }));
    };

    webrtcService.onError = (error) => {
      toast.error(error);
      setTransferState(prev => ({ ...prev, status: 'error', error }));
    };
  }, [handleReset]);

  const handleCancelFile = useCallback((fileIndex: number) => {
    const file = transferState.files[fileIndex];
    if (!file) return;
    
    // Send cancellation message to peer
    webrtcService.cancelFile(fileIndex, file.name);
    
    // Mark the file as cancelled locally
    setTransferState(prev => ({
      ...prev,
      progress: [
        ...prev.progress.filter(p => p.fileIndex !== fileIndex),
        {
          fileIndex,
          fileName: file.name,
          progress: 0,
          speed: 0,
          bytesTransferred: 0,
          totalBytes: file.size,
          cancelled: true,
          cancelledBy: webrtcService.currentRole as 'sender' | 'receiver'
        }
      ]
    }));
    
    toast.info(`File "${file.name}" cancelled`);
  }, [transferState.files]);

  const handleSendFiles = useCallback(async (files: File[]) => {
    console.log('handleSendFiles called in main component');
    console.log('isConnected:', isConnected);
    console.log('files:', files);
    
    if (!isConnected) {
      console.log('Not connected to signaling server');
      return;
    }

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
    });

    // Scroll to top when sharing starts
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      console.log('Joining room:', code);
      signalingService.joinRoom(code);
      
      // Wait for peer to join
      signalingService.onPeerJoined(async (peerId) => {
        console.log('Peer joined:', peerId);
        toast.success('Receiver connected! Starting transfer...');
        await webrtcService.initializeAsSender(code, files);
      });

    } catch (error) {
      console.error('Failed to initialize sender:', error);
      toast.error('Failed to start file sharing');
      handleReset();
    }
  }, [isConnected, handleReset]);

  const handleReceiveFiles = useCallback(async (code: string) => {
    if (!isConnected) {
      return;
    }

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
    });

    try {
      signalingService.joinRoom(code);
      await webrtcService.initializeAsReceiver(code);
      toast.success('Connected to sender. Waiting for files...');
    } catch (error) {
      console.error('Failed to initialize receiver:', error);
      toast.error('Failed to join file sharing session');
      handleReset();
    }
  }, [isConnected, handleReset]);

  const handleCancelTransfer = useCallback(() => {
    webrtcService.cancelTransfer();
    handleReset();
  }, [handleReset]);

  return (
    <div className="min-h-screen w-full relative">
      {/* Radial Gradient Background from Bottom */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
        }}
      />
      {/* Your Content/Components */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <Card className="w-full max-w-2xl bg-background/80 backdrop-blur-xl border-white/20 shadow-2xl">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center gap-2">
                {isConnected ? (
                  <Wifi className="h-5 w-5 text-green-500" />
                ) : (
                  <WifiOff className="h-5 w-5 text-red-500" />
                )}
                <Badge variant={isConnected ? 'default' : 'destructive'}>
                  {isConnected ? 'Connected' : 'Disconnected'}
                </Badge>
              </div>
            </div>
            
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight pb-2">
              TransmitFlow
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Seamless file transmission
            </CardDescription>
          </CardHeader>

          <CardContent>
            {transferState.status === 'idle' ? (
              <>
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'send' | 'receive')} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="send" className="flex items-center gap-2 transition-all duration-200 ease-in-out">
                    <Upload className="h-4 w-4" />
                    Send Files
                  </TabsTrigger>
                  <TabsTrigger value="receive" className="flex items-center gap-2 transition-all duration-200 ease-in-out">
                    <Download className="h-4 w-4" />
                    Receive Files
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="send" className="mt-6 transition-all duration-300 ease-in-out">
                  <SendFilesPanel
                    onSendFiles={handleSendFiles}
                    disabled={!isConnected}
                    roomCode={roomCode}
                  />
                </TabsContent>

                <TabsContent value="receive" className="mt-6 transition-all duration-300 ease-in-out">
                  <ReceiveFilesPanel
                    onReceiveFiles={handleReceiveFiles}
                    disabled={!isConnected}
                  />
                </TabsContent>
              </Tabs>
              </>
            ) : (
              <TransferProgress
                transferState={transferState}
                roomCode={roomCode}
                receivedFiles={receivedFiles}
                onCancel={handleCancelTransfer}
                onReset={handleReset}
                onCancelFile={handleCancelFile}
              />
            )}
          </CardContent>
        </Card>
        
        {/* Website Info */}
        <div className="mt-6 w-full max-w-2xl text-center">
          <div className="text-black/80">
            <h3 className="text-lg font-semibold mb-2">TransmitFlow</h3>
            <p className="text-sm text-black/70 mb-1">
              Seamless file transmission
            </p>
            <p className="text-sm text-black/70">
              No servers, no limits, direct device-to-device transfer
            </p>
          </div>
        </div>
        
        {/* Social Media Links - Outside the main card */}
        <div className="mt-8 w-full max-w-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-black/80">
            <div className="text-sm">
              Built with ❤️ for secure P2P file sharing
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://buymeacoffee.com/10newolf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                title="Buy Me a Coffee"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-.766-1.658A4.389 4.389 0 0 0 15.5 2.5h-7c-1.103 0-2.103.897-2.103 2v.5c0 .8.4 1.5 1 1.9v8.1c0 2.2 1.8 4 4 4h3c2.2 0 4-1.8 4-4V6.9c.6-.4 1-1.1 1-1.9v-.5c0-.138-.011-.273-.032-.406-.012-.067-.024-.133-.037-.198-.025-.129-.053-.256-.084-.382zm-2.216 8.585c0 1.1-.9 2-2 2h-3c-1.1 0-2-.9-2-2V7h7v8z"/>
                  <circle cx="7" cy="10" r="1"/>
                  <circle cx="11" cy="10" r="1"/>
                  <circle cx="15" cy="10" r="1"/>
                </svg>
                <span className="text-sm">Support Us</span>
              </a>
              <a
                href="https://github.com/10neWOlF"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/60 hover:text-black transition-colors"
                title="GitHub"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://x.com/ShubhamPardule"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/60 hover:text-black transition-colors"
                title="X (Twitter)"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
