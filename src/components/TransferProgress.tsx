'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Download, 
  FileText, 
  X,
  RotateCcw,
  Copy,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';
import QRCode from 'qrcode';

import { TransferState } from '@/types';
import { formatFileSize, formatTime, downloadFile } from '@/lib/file-utils';

interface TransferProgressProps {
  transferState: TransferState;
  roomCode: string;
  receivedFiles: File[];
  onCancel: () => void;
  onReset: () => void;
  onCancelFile?: (fileIndex: number) => void;
}

export default function TransferProgress({
  transferState,
  roomCode,
  receivedFiles,
  onCancel,
  onReset,
  onCancelFile,
}: TransferProgressProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const isReceiver = receivedFiles.length > 0; // Simple check: if we have any received files, we're a receiver
  
  // Generate QR code when room code is available
  useEffect(() => {
    if (roomCode) {
      const generateQR = async () => {
        try {
          const shareUrl = `${window.location.origin}${window.location.pathname}?receive=${roomCode}`;
          const url = await QRCode.toDataURL(shareUrl, {
            width: 200,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            }
          });
          setQrCodeUrl(url);
        } catch (error) {
          console.error('Error generating QR code:', error);
        }
      };
      generateQR();
    }
  }, [roomCode]);
  
  const copyRoomCode = async () => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(roomCode);
        toast.success('Room code copied to clipboard!');
      } else {
        // Fallback for mobile/older browsers
        copyToClipboardFallback(roomCode);
        toast.success('Room code copied to clipboard!');
      }
    } catch {
      // If clipboard API fails, use fallback
      copyToClipboardFallback(roomCode);
      toast.success('Room code copied to clipboard!');
    }
  };

  const copyShareLink = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?receive=${roomCode}`;
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Share link copied to clipboard!');
      } else {
        // Fallback for mobile/older browsers
        copyToClipboardFallback(shareUrl);
        toast.success('Share link copied to clipboard!');
      }
    } catch {
      // If clipboard API fails, use fallback
      copyToClipboardFallback(shareUrl);
      toast.success('Share link copied to clipboard!');
    }
  };

  const copyToClipboardFallback = (text: string) => {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '-9999px';
    document.body.appendChild(textarea);
    
    // Select and copy the text
    textarea.focus();
    textarea.select();
    
    try {
      document.execCommand('copy');
    } catch (error) {
      console.error('Fallback copy failed:', error);
    }
    
    // Clean up
    document.body.removeChild(textarea);
  };

  const downloadFileManual = (file: File) => {
    try {
      downloadFile(file);
      toast.success(`Downloaded ${file.name}`);
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('Failed to download file');
    }
  };

  const getStatusInfo = () => {
    switch (transferState.status) {
      case 'idle':
        return {
          icon: <XCircle className="h-6 w-6 text-gray-400" />,
          title: 'Ready to Transfer',
          description: 'Waiting for connection',
          color: 'gray'
        };
      case 'connecting':
        return {
          icon: <Loader2 className="h-6 w-6 animate-spin text-blue-500" />,
          title: 'Connecting...',
          description: 'Establishing peer-to-peer connection',
          color: 'blue'
        };
      case 'transferring':
        return {
          icon: <Loader2 className="h-6 w-6 animate-spin text-purple-500" />,
          title: 'Transferring Files',
          description: 'Transfer in progress...',
          color: 'purple'
        };
      case 'completed':
        return {
          icon: <CheckCircle className="h-6 w-6 text-green-500" />,
          title: 'Transfer Complete!',
          description: 'All files transferred successfully',
          color: 'green'
        };
      case 'error':
        return {
          icon: <XCircle className="h-6 w-6 text-red-500" />,
          title: 'Transfer Failed',
          description: transferState.error || 'An error occurred during transfer',
          color: 'red'
        };
      default:
        return {
          icon: <XCircle className="h-6 w-6 text-gray-400" />,
          title: 'Unknown Status',
          description: 'Please try again',
          color: 'gray'
        };
    }
  };

  const statusInfo = getStatusInfo();
  const isTransferring = transferState.status === 'transferring';
  const isComplete = transferState.status === 'completed';
  const hasError = transferState.status === 'error';

  return (
    <>
      <div className="space-y-6">
      {/* Room Code - Only show during initial connection phase */}
      {(transferState.status === 'idle' || transferState.status === 'connecting') && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Room Code</h3>
                <p className="text-2xl font-mono font-bold tracking-wider">{roomCode}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button onClick={copyRoomCode} variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Code
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* QR Code - Always show for senders during initial connection phase */}
      {!isReceiver && qrCodeUrl && (transferState.status === 'idle' || transferState.status === 'connecting') && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <h3 className="font-medium">QR Code</h3>
              <div className="flex flex-col items-center space-y-4">
                <Image 
                  src={qrCodeUrl} 
                  alt="QR Code for sharing" 
                  width={200}
                  height={200}
                  className="border rounded-lg"
                />
                <p className="text-sm text-muted-foreground text-center">
                  Scan with receiver&apos;s device to connect
                </p>
                <Button onClick={copyShareLink} variant="outline" size="sm" className="w-full sm:w-auto">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Share Link
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Status */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            {statusInfo.icon}
            <div className="flex-1">
              <h3 className="font-medium text-lg">{statusInfo.title}</h3>
              <p className="text-muted-foreground">{statusInfo.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Transfer Queue */}
      {transferState.files.length > 0 && (
        <Card data-transfer-card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>File Transfer</span>
              <Badge variant="secondary">
                {transferState.files.length} files
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transferState.files.map((file, index) => {
                const progress = transferState.progress.find(p => p.fileIndex === index);
                const isCurrentFile = progress && progress.progress < 100 && isTransferring && !progress.cancelled;
                const isCompleted = isComplete || (progress && progress.progress >= 100 && !progress.cancelled);
                const isFileComplete = progress && progress.progress >= 100 && !progress.cancelled; // Individual file completion
                const isCancelled = progress?.cancelled;
                const hasProgress = progress && progress.progress > 0 && !progress.cancelled;
                const isPendingFile = isTransferring && !hasProgress && !isCancelled; // File waiting in queue
                
                return (
                  <div key={index} data-file-item className="border rounded-lg p-4 space-y-3">
                    {/* File Info Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{file.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {/* Use progress.totalBytes if file.size is 0 (for receivers) */}
                            {formatFileSize(file.size || (progress?.totalBytes || 0))}
                            {isCancelled ? (
                              <> • Transfer cancelled</>
                            ) : isFileComplete ? (
                              <> • Transfer completed</>
                            ) : hasProgress && progress ? (
                              progress.stage === 'converting' ? (
                                <> • Converting to base64 {progress.conversionProgress ? `(${progress.conversionProgress}%)` : ''}</>
                              ) : (
                                <> • {formatFileSize(progress.bytesTransferred)} transferring</>
                              )
                            ) : null}
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {/* Speed and ETA for current file */}
                        {hasProgress && progress && progress.progress < 100 && (
                          <div className="text-right text-xs text-muted-foreground mr-2">
                            <div>
                              {progress.speed && progress.speed > 0 
                                ? formatFileSize(progress.speed) + '/s' 
                                : 'Calculating...'}
                            </div>
                            <div>
                              {progress.speed && progress.speed > 0 && progress.totalBytes 
                                ? formatTime((progress.totalBytes - progress.bytesTransferred) / progress.speed)
                                : 'ETA: Calculating...'
                              }
                            </div>
                          </div>
                        )}
                        
                        {/* Status Icons and Buttons */}
                        {isCancelled ? (
                          <div className="flex items-center gap-2">
                            <XCircle className="h-5 w-5 text-red-500" />
                            <Badge variant="destructive" className="text-xs">
                              Cancelled by {progress?.cancelledBy}
                            </Badge>
                          </div>
                        ) : isFileComplete ? (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            {/* Show download button immediately when individual file completes on receiver side */}
                            {isReceiver && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  // Try to find the received file first
                                  const receivedFile = receivedFiles.find(rf => rf.name === file.name && rf.size === file.size);
                                  if (receivedFile) {
                                    downloadFileManual(receivedFile);
                                  } else {
                                    // If file not found in receivedFiles, create a dummy file for download
                                    const dummyBlob = new Blob(['File data not available'], { type: 'text/plain' });
                                    const dummyFile = new File([dummyBlob], file.name, { type: file.type || 'application/octet-stream' });
                                    downloadFileManual(dummyFile);
                                    toast.warning(`${file.name} downloaded as placeholder - original file data not available`);
                                  }
                                }}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ) : isCurrentFile ? (
                          // Currently transferring file - only show spinner, NO cancel button
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                          </div>
                        ) : isPendingFile ? (
                          // Pending files that haven't started yet - allow individual cancellation
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-muted flex-shrink-0" />
                            {onCancelFile && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onCancelFile(index)}
                                title="Remove from queue"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-muted flex-shrink-0" />
                        )}
                      </div>
                    </div>
                    
                    {/* Progress Bar - Don't show for cancelled files */}
                    {!isCancelled && (hasProgress || isCompleted) && (
                      <div className="space-y-1">
                        <Progress 
                          value={progress ? (progress.stage === 'converting' && progress.conversionProgress ? progress.conversionProgress : progress.progress) : (isCompleted ? 100 : 0)} 
                          className="h-2" 
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>
                            {progress ? (
                              progress.stage === 'converting' && progress.conversionProgress ? 
                                `${Math.round(progress.conversionProgress)}% converted` : 
                                `${Math.round(progress.progress)}%`
                            ) : (isCompleted ? '100%' : '0%')}
                          </span>
                          {progress && progress.stage === 'transferring' && (
                            <span>{formatFileSize(progress.bytesTransferred)} / {formatFileSize(progress.totalBytes)}</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Download All Button */}
            {isReceiver && transferState.files.length > 1 && (() => {
              const completedFiles = transferState.files.filter((file, index) => {
                const progress = transferState.progress.find(p => p.fileIndex === index);
                return progress && progress.progress >= 100 && !progress.cancelled;
              });
              
              return completedFiles.length > 1 ? (
                <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Button
                    onClick={() => {
                      let downloadedCount = 0;
                      completedFiles.forEach(file => {
                        const receivedFile = receivedFiles.find(rf => rf.name === file.name && rf.size === file.size);
                        if (receivedFile) {
                          downloadFileManual(receivedFile);
                          downloadedCount++;
                        }
                      });
                      
                      if (downloadedCount > 0) {
                        toast.success(`Downloaded ${downloadedCount} files`);
                      } else {
                        toast.error('No files available for download');
                      }
                    }}
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download All ({completedFiles.length} files)
                  </Button>
                </div>
              ) : null;
            })()}
            
            {/* Action Buttons at Bottom */}
            <div className="mt-6 flex gap-3">
              {hasError ? (
                <Button onClick={onReset} variant="outline" className="flex-1">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Main
                </Button>
              ) : isTransferring ? (
                <Button onClick={onCancel} variant="outline" className="flex-1">
                  <X className="h-4 w-4 mr-2" />
                  Cancel Transfer
                </Button>
              ) : isReceiver ? (
                <Button onClick={onReset} variant="outline" className="flex-1">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Menu
                </Button>
              ) : (
                <Button onClick={onReset} variant="outline" className="flex-1">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  New Transfer
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      </div>
    </>
  );
}