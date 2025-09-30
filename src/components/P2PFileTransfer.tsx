'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Download, Shield, Globe, Lock, ArrowLeftRight, Rocket, Users, Coffee } from 'lucide-react';
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
  const [transferCompleted, setTransferCompleted] = useState(false);

  // Define handleReset first since other functions depend on it
  const handleReset = useCallback(() => {
    webrtcService.cleanup();
    setRoomCode('');
    setReceivedFiles([]);
    setTransferCompleted(false);
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
      } else if (state === 'failed') {
        setTransferState(prev => ({ ...prev, status: 'error', error: 'Connection failed' }));
      } else if (state === 'disconnected') {
        // Only treat disconnection as error if transfer wasn't completed successfully
        if (!transferCompleted) {
          setTransferState(prev => ({ ...prev, status: 'error', error: 'Connection failed' }));
        } else {
          console.log('✅ Connection closed after successful transfer - maintaining completed status');
        }
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
            stage: progress.stage,
            conversionProgress: progress.conversionProgress,
          } : p
        ).concat(
          prev.progress.find(p => p.fileIndex === progress.fileIndex) ? [] : [{
            fileIndex: progress.fileIndex,
            fileName: progress.fileName,
            progress: progress.progress,
            speed: progress.speed,
            bytesTransferred: progress.bytesTransferred,
            totalBytes: progress.totalBytes,
            stage: progress.stage,
            conversionProgress: progress.conversionProgress,
          }]
        )
      }));
    };

    webrtcService.onFileReceived = (file) => {
      console.log('onFileReceived called with file:', file.name, file.size, 'bytes');
      setReceivedFiles(prev => [...prev, file]);
      
      // Auto-download the file immediately
      try {
        downloadFile(file);
        toast.success(`File received and downloaded: ${file.name}`, {
          description: `${file.name} has been automatically saved to your downloads folder`,
          duration: 5000,
        });
      } catch (error) {
        console.error('Error auto-downloading file:', error);
        toast.error(`File received but download failed: ${file.name}`, {
          description: 'You can manually download using the download button',
          duration: 7000,
        });
      }
    };

    webrtcService.onTransferComplete = () => {
      setTransferCompleted(true);
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
            cancelledBy: data.cancelledBy,
            stage: 'transferring' as const,
          }
        ]
      }));
    };

    webrtcService.onError = (error) => {
      toast.error(error);
      setTransferState(prev => ({ ...prev, status: 'error', error }));
    };
  }, [handleReset, transferCompleted]);

  // Connection timeout - auto-fail if stuck connecting for too long
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (transferState.status === 'connecting') {
      // Set a 30-second timeout for connection attempts
      timeoutId = setTimeout(() => {
        console.log('Connection timeout reached');
        toast.error('Connection timeout - the room code may be invalid or the sender is offline');
        setTransferState(prev => ({ 
          ...prev, 
          status: 'error', 
          error: 'Connection timeout. Please check the room code and try again.' 
        }));
      }, 30000); // 30 seconds
    }
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [transferState.status]);

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
          cancelledBy: webrtcService.currentRole as 'sender' | 'receiver',
          stage: 'transferring' as const,
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
    <div className="min-h-screen w-full relative transition-all duration-500 ease-in-out">
      {/* Radial Gradient Background from Bottom */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-500 ease-in-out"
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
        }}
      />
      {/* Dark mode background - Ocean Night */}
      <div 
        className="absolute inset-0 z-0 dark:block hidden transition-opacity duration-500 ease-in-out"
        style={{
          background: `
            linear-gradient(135deg, 
              #0c1445 0%, 
              #1e1b4b 25%, 
              #312e81 50%, 
              #1e1b4b 75%, 
              #0c1445 100%
            )
          `,
        }}
      />
      
      {/* Subtle animated stars/particles for dark mode */}
      <div
        className="absolute inset-0 z-0 dark:block hidden opacity-30 transition-opacity duration-500 ease-in-out"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 90% 90%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)
          `,
        }}
      />
      
      {/* Theme Toggle - Desktop only */}
      <div className="absolute top-6 right-6 z-20 hidden md:block">
        <ThemeToggle />
      </div>
      
      {/* Your Content/Components */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-start md:justify-center p-6 pt-8 md:pt-6 transition-all duration-500 ease-in-out">
        <Card className="w-full max-w-2xl bg-background/80 backdrop-blur-xl border-white/20 shadow-2xl dark:bg-gray-800/80 dark:border-gray-700/50 transition-all duration-500 ease-in-out relative">
          {/* Theme Toggle - Mobile only, inside card */}
          <div className="absolute top-4 right-4 z-30 md:hidden">
            <ThemeToggle />
          </div>
          
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <TransmitFlowLogo size={48} />
            </div>
            
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight pb-2 dark:from-blue-300 dark:to-purple-300 transition-all duration-500 ease-in-out">
              TransmitFlow
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground dark:text-gray-300 transition-colors duration-500 ease-in-out">
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
                role={activeTab}
              />
            )}
          </CardContent>
        </Card>
        
        {/* Features Section - Only show when idle */}
        {transferState.status === 'idle' && (
          <>
            {/* Features Section */}
            <div className="mt-12 w-full max-w-4xl">
              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {/* True Peer-to-Peer */}
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50 dark:bg-gray-800/90 dark:border-gray-700/50 transition-all duration-500 ease-in-out">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 transition-all duration-500 ease-in-out">
                      <ArrowLeftRight className="h-6 w-6 text-blue-600 dark:text-blue-400 transition-colors duration-500 ease-in-out" />
                    </div>
                    <h3 className="text-lg font-semibold text-black/90 dark:text-white/90 transition-colors duration-500 ease-in-out">True Peer-to-Peer</h3>
                  </div>
                  <p className="text-black/70 text-sm dark:text-gray-300 transition-colors duration-500 ease-in-out">
                    Files sent directly device-to-device using WebRTC. No cloud, no intermediaries.
                  </p>
                </div>

                {/* Absolute Privacy */}
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50 dark:bg-gray-800/90 dark:border-gray-700/50 transition-all duration-500 ease-in-out">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/50 transition-all duration-500 ease-in-out">
                      <Lock className="h-6 w-6 text-green-600 dark:text-green-400 transition-colors duration-500 ease-in-out" />
                    </div>
                    <h3 className="text-lg font-semibold text-black/90 dark:text-white/90 transition-colors duration-500 ease-in-out">Absolute Privacy</h3>
                  </div>
                  <p className="text-black/70 text-sm dark:text-gray-300 transition-colors duration-500 ease-in-out">
                    Your files never touch our servers. We don&apos;t see, store, or track them.
                  </p>
                </div>

                {/* Secure & Encrypted */}
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50 dark:bg-gray-800/90 dark:border-gray-700/50 transition-all duration-500 ease-in-out">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/50 transition-all duration-500 ease-in-out">
                      <Shield className="h-6 w-6 text-red-600 dark:text-red-400 transition-colors duration-500 ease-in-out" />
                    </div>
                    <h3 className="text-lg font-semibold text-black/90 dark:text-white/90 transition-colors duration-500 ease-in-out">Secure & Encrypted</h3>
                  </div>
                  <p className="text-black/70 text-sm dark:text-gray-300 transition-colors duration-500 ease-in-out">
                    Secure connections with isolated rooms for end-to-end protection.
                  </p>
                </div>

                {/* Limitless High-Speed */}
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50 dark:bg-gray-800/90 dark:border-gray-700/50 transition-all duration-500 ease-in-out">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 transition-all duration-500 ease-in-out">
                      <Rocket className="h-6 w-6 text-indigo-600 dark:text-indigo-400 transition-colors duration-500 ease-in-out" />
                    </div>
                    <h3 className="text-lg font-semibold text-black/90 dark:text-white/90 transition-colors duration-500 ease-in-out">Limitless High-Speed</h3>
                  </div>
                  <p className="text-black/70 text-sm dark:text-gray-300 transition-colors duration-500 ease-in-out">
                    Transfer files of any size with smart chunking to maximize network speed.
                  </p>
                </div>

                {/* Universal Compatibility */}
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50 dark:bg-gray-800/90 dark:border-gray-700/50 transition-all duration-500 ease-in-out">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50 transition-all duration-500 ease-in-out">
                      <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400 transition-colors duration-500 ease-in-out" />
                    </div>
                    <h3 className="text-lg font-semibold text-black/90 dark:text-white/90 transition-colors duration-500 ease-in-out">Universal Compatibility</h3>
                  </div>
                  <p className="text-black/70 text-sm dark:text-gray-300 transition-colors duration-500 ease-in-out">
                    Works instantly in any modern browser on any platform. No app required.
                  </p>
                </div>

                {/* Open & Community Driven */}
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50 dark:bg-gray-800/90 dark:border-gray-700/50 transition-all duration-500 ease-in-out">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-900/50 transition-all duration-500 ease-in-out">
                      <Users className="h-6 w-6 text-teal-600 dark:text-teal-400 transition-colors duration-500 ease-in-out" />
                    </div>
                    <h3 className="text-lg font-semibold text-black/90 dark:text-white/90 transition-colors duration-500 ease-in-out">Open & Community Driven</h3>
                  </div>
                  <p className="text-black/70 text-sm dark:text-gray-300 transition-colors duration-500 ease-in-out">
                    Fully open-source for transparency. Help us improve on{' '}
                    <a 
                      href="https://github.com/shubhampardule/transmitflow" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:text-teal-700 font-medium dark:text-teal-400 dark:hover:text-teal-300 transition-colors duration-300 ease-in-out"
                    >
                      GitHub
                    </a>.
                  </p>
                </div>
              </div>

              {/* Support Section */}
              <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 backdrop-blur-sm rounded-xl p-6 border border-white/50 text-center dark:bg-gradient-to-r dark:from-orange-500/30 dark:to-yellow-500/30 dark:border-gray-700/50 transition-all duration-500 ease-in-out">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/50 transition-all duration-500 ease-in-out">
                    <Users className="h-6 w-6 text-orange-600 dark:text-orange-400 transition-colors duration-500 ease-in-out" />
                  </div>
                  <h3 className="text-xl font-semibold text-black/90 dark:text-white/90 transition-colors duration-500 ease-in-out">Support Our Work</h3>
                </div>
                <p className="text-black/70 mb-4 dark:text-gray-300 transition-colors duration-500 ease-in-out">
                  Love using TransmitFlow? Help us keep it free and running smoothly!
                </p>
                <a
                  href="https://buymeacoffee.com/shubhampardule"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out"
                >
                  <Coffee className="h-5 w-5" />
                  Buy Me a Coffee
                </a>
              </div>
            </div>
          </>
        )}
        
        {/* Website Info */}
        <div className="mt-6 w-full max-w-2xl text-center">
          <div className="text-black/80 dark:text-white/80 transition-colors duration-500 ease-in-out">
            <h3 className="text-lg font-semibold mb-2 transition-colors duration-500 ease-in-out">TransmitFlow</h3>
            <p className="text-sm text-black/70 dark:text-gray-300 transition-colors duration-500 ease-in-out">
              No servers, no limits, direct device-to-device transfer
            </p>
          </div>
        </div>
        
        {/* Social Media Links - Outside the main card */}
        <div className="mt-8 w-full max-w-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-black/80 dark:text-white/80">
            <div className="text-sm">
              Built with ❤️ for secure P2P file sharing
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/shubhampardule"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/60 hover:text-black transition-colors dark:text-white/60 dark:hover:text-white"
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
                className="text-black/60 hover:text-black transition-colors dark:text-white/60 dark:hover:text-white"
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