'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Download, 
  QrCode,
  X,
  RotateCcw,
  Copy,
  Link2,
  ArrowLeft
} from 'lucide-react';
import { getFileIcon } from '@/lib/file-icons';
import { toast } from 'sonner';
import QRCode from 'qrcode';

import { TransferState } from '@/types';
import { formatFileSize, formatTime, downloadFile } from '@/lib/file-utils';

interface TransferProgressProps {
  transferState: TransferState;
  transferStartedAt?: number | null;
  transferEndedAt?: number | null;
  roomCode: string;
  receivedFiles: File[];
  onCancel: () => void;
  onReset: () => void;
  onCancelFile?: (fileIndex: number) => void;
  role?: 'send' | 'receive'; // Add role prop to properly determine if user is receiver
  onRetry?: () => void;
  onBackToSend?: () => void;
  onBackToReceive?: () => void;
}

export default function TransferProgress({
  transferState,
  transferStartedAt,
  transferEndedAt,
  roomCode,
  receivedFiles,
  onCancel,
  onReset,
  onCancelFile,
  role,
  onRetry,
  onBackToSend,
  onBackToReceive,
}: TransferProgressProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [showQrCode, setShowQrCode] = useState(true);
  const isReceiver = role === 'receive'; // Fix: Use role prop instead of receivedFiles.length

  const isMobileShareSupported = () => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return false;
    }

    const hasNativeShare = typeof navigator.share === 'function';
    if (!hasNativeShare) {
      return false;
    }

    const hasCoarsePointer = typeof window.matchMedia === 'function'
      && window.matchMedia('(pointer: coarse)').matches;
    const isMobileUserAgent = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent || '');

    return hasCoarsePointer || isMobileUserAgent;
  };
  
  // Generate QR code when room code is available - ONLY for senders, never for receivers
  useEffect(() => {
    if (roomCode && !isReceiver && role === 'send') {
      // Default to hiding QR on small screens to avoid forcing scroll.
      if (typeof window !== 'undefined') {
        setShowQrCode(window.matchMedia('(min-width: 640px)').matches);
      } else {
        setShowQrCode(true);
      }
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
  }, [roomCode, isReceiver, role]);
  
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
      if (isMobileShareSupported()) {
        await navigator.share({
          title: 'TransmitFlow',
          text: `Join my room (${roomCode})`,
          url: shareUrl,
        });
        return;
      }

      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied');
      } else {
        // Fallback for mobile/older browsers
        copyToClipboardFallback(shareUrl);
        toast.success('Link copied');
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }
      // If clipboard API fails, use fallback
      copyToClipboardFallback(shareUrl);
      toast.success('Link copied');
    }
  };

  const linkActionLabel = isMobileShareSupported() ? 'Share link' : 'Copy link';

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
          icon: <Loader2 className="h-6 w-6 animate-spin motion-reduce:animate-none text-blue-500" />,
          title: 'Connecting...',
          description: 'Establishing peer-to-peer connection',
          color: 'blue'
        };
      case 'transferring':
        return {
          icon: <Loader2 className="h-6 w-6 animate-spin motion-reduce:animate-none text-purple-500" />,
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
      case 'cancelled':
        return {
          icon: <XCircle className="h-6 w-6 text-amber-500" />,
          title: 'Transfer Cancelled',
          description: transferState.error || 'The transfer was cancelled',
          color: 'amber'
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
  const isCancelled = transferState.status === 'cancelled';

  const formatProgressLabel = (progressValue: number, bytesTransferred: number): string => {
    if (progressValue <= 0 && bytesTransferred > 0) {
      return '<1%';
    }

    if (progressValue > 0 && progressValue < 1) {
      return '<1%';
    }

    return `${Math.round(progressValue)}%`;
  };

  const canEstimateEta = (
    speed: number,
    bytesTransferred: number,
    totalBytes: number,
    progressValue: number,
  ): boolean => {
    if (speed <= 0 || totalBytes <= 0) {
      return false;
    }

    const minimumSampleBytes = Math.min(Math.max(totalBytes * 0.005, 8 * 1024 * 1024), 64 * 1024 * 1024);
    return bytesTransferred >= minimumSampleBytes && progressValue >= 0.2;
  };

  const getWhatsHappeningText = (): string | null => {
    if (transferState.status === 'connecting') {
      return isReceiver
        ? 'Joining the room and setting up a secure link to the sender.'
        : 'Waiting for the receiver and setting up a secure link.';
    }

    if (transferState.status === 'transferring') {
      const hasPreparingFile = transferState.progress.some((progress) => progress.stage === 'converting');
      if (hasPreparingFile) {
        return 'Preparing files for transfer. This usually takes a moment.';
      }

      return 'Moving files directly between both devices. Keep this screen open.';
    }

    return null;
  };

  const whatsHappeningText = getWhatsHappeningText();

  const summaryTotalBytes = transferState.files.reduce((sum, file) => sum + file.size, 0);
  const summaryTransferredBytes = transferState.progress.reduce((sum, progress) => {
    if (progress.cancelled) {
      return sum;
    }
    const bounded = Math.min(progress.bytesTransferred || 0, progress.totalBytes || 0);
    return sum + bounded;
  }, 0);
  const summaryCancelledCount = transferState.progress.filter((progress) => progress.cancelled).length;
  const summaryCompletedCount = transferState.files.length - summaryCancelledCount;

  const summaryDurationSeconds = (
    transferStartedAt && transferEndedAt && transferEndedAt > transferStartedAt
      ? (transferEndedAt - transferStartedAt) / 1000
      : null
  );
  const summaryAverageSpeed = (
    summaryDurationSeconds && summaryDurationSeconds > 0
      ? summaryTransferredBytes / summaryDurationSeconds
      : null
  );
  const summaryIntegrityLabel = isComplete
    ? 'No integrity mismatch reported'
    : 'Not fully verified (transfer cancelled)';

  return (
    <>
      <div className="space-y-6">
      {/* Room Code - Only show during initial connection phase */}
      {(transferState.status === 'idle' || transferState.status === 'connecting') && (
        <>
          {/* Receiver: show minimal room info (no share actions) */}
          {isReceiver ? (
            <div className="rounded-xl border border-border p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Room</h3>
                  <p className="mt-1 text-xl font-mono slashed-zero font-bold tracking-[0.25em]">{roomCode}</p>
                </div>
                {onBackToReceive ? (
                  <Button onClick={onBackToReceive} variant="outline" size="sm" className="rounded-lg">
                    Change code
                  </Button>
                ) : null}
              </div>
            </div>
          ) : (
            <>
              {/* Mobile: compact, QR collapsible to avoid scroll */}
              <div className="sm:hidden rounded-xl border border-border p-4">
                <div className="space-y-3">
                  <div className="text-center">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Room Code</h3>
                    <p className="mt-1 text-2xl font-mono slashed-zero font-bold tracking-[0.3em]">{roomCode}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button onClick={copyRoomCode} variant="outline" size="sm" className="rounded-lg">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy code
                    </Button>
                    <Button onClick={copyShareLink} variant="outline" size="sm" className="rounded-lg">
                      <Link2 className="h-4 w-4 mr-2" />
                      {linkActionLabel}
                    </Button>
                    {!isReceiver && role === 'send' && qrCodeUrl ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-lg col-span-2"
                        onClick={() => setShowQrCode((prev) => !prev)}
                      >
                        <QrCode className="h-4 w-4 mr-2" />
                        {showQrCode ? 'Hide QR' : 'Show QR'}
                      </Button>
                    ) : null}
                  </div>

                  {!isReceiver && role === 'send' && qrCodeUrl && showQrCode ? (
                    <div className="pt-3 border-t border-border/60">
                      <div className="flex justify-center">
                        <Image
                          src={qrCodeUrl}
                          alt="QR Code for sharing"
                          width={170}
                          height={170}
                          className="rounded-xl border border-border bg-white"
                        />
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground text-center">
                        Receiver can scan this QR to connect.
                      </p>
                    </div>
                  ) : null}

                  {!isReceiver && role === 'send' && qrCodeUrl && !showQrCode ? (
                    <p className="text-[11px] text-muted-foreground text-center">
                      QR hidden to save space.
                    </p>
                  ) : null}
                </div>
              </div>

              {/* Desktop: restore the previous split cards layout */}
              <div className="hidden sm:block rounded-xl border border-border p-4">
                <div className="flex items-center justify-between h-12">
                  <div className="flex flex-col justify-center h-full">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Room Code</h3>
                    <p className="text-2xl font-mono slashed-zero font-bold tracking-[0.3em]">{roomCode}</p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Button onClick={copyRoomCode} variant="outline" size="sm" className="rounded-lg">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy code
                    </Button>
                    <Button onClick={copyShareLink} variant="outline" size="sm" className="rounded-lg">
                      <Link2 className="h-4 w-4 mr-2" />
                      {linkActionLabel}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Desktop QR: separate card like before (senders only) */}
              {!isReceiver && role === 'send' && qrCodeUrl && (
                <div className="hidden sm:block rounded-xl border border-border p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">QR Code</h3>
                    <div className="flex flex-col items-center space-y-4">
                      <Image
                        src={qrCodeUrl}
                        alt="QR Code for sharing"
                        width={200}
                        height={200}
                        className="rounded-xl border border-border"
                      />
                      <p className="text-sm text-muted-foreground text-center">
                        Scan with receiver&apos;s device to connect
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* Status */}
      <div className="rounded-xl border border-border p-4">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0">
              {statusInfo.icon}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-base sm:text-lg leading-tight">{statusInfo.title}</h3>
              <p className="mt-1 text-sm sm:text-base text-muted-foreground leading-relaxed break-words">
                {statusInfo.description}
              </p>
              {whatsHappeningText ? (
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground/90 leading-relaxed break-words">
                  What&apos;s happening: {whatsHappeningText}
                </p>
              ) : null}
            </div>
          </div>
      </div>

      {/* File Transfer Queue */}
      {transferState.files.length > 0 && (
        <div data-transfer-card className="rounded-xl border border-border">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="font-semibold">File Transfer</span>
            <Badge variant="secondary">
              {transferState.files.length} files
            </Badge>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {transferState.files.map((file, index) => {
                const progress = transferState.progress.find(p => p.fileIndex === index);
                const isCancelled = progress?.cancelled === true;
                const isFileComplete = Boolean(progress && progress.progress >= 100 && !isCancelled);
                const isCompleted = isComplete || isFileComplete;
                const hasProgress = Boolean(progress && progress.progress > 0 && !isCancelled);
                const showTransferMetrics = Boolean(
                  hasProgress &&
                  progress &&
                  progress.progress < 100 &&
                  progress.stage === 'transferring',
                );
                const isActiveFile = Boolean(
                  isTransferring &&
                  progress &&
                  !isCancelled &&
                  !isFileComplete &&
                  (progress.stage === 'converting' || progress.progress > 0 || progress.bytesTransferred > 0)
                );
                const canCancelFile = Boolean(onCancelFile && isTransferring && !isCancelled && !isFileComplete);
                const cancelButtonTitle = isActiveFile ? 'Cancel file transfer' : 'Remove from queue';
                
                return (
                    <div key={index} data-file-item className="border border-border rounded-xl p-4 space-y-3">
                    {/* File Info Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {(() => { const Icon = getFileIcon(file.name, file.type); return <Icon className="h-5 w-5 text-muted-foreground flex-shrink-0" />; })()}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{file.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatFileSize(file.size || (progress?.totalBytes || 0))}
                            {isCancelled ? (
                              <> Cancelled</>
                            ) : isFileComplete ? (
                              <> Completed</>
                            ) : progress && !isCancelled ? (
                              progress.stage === 'converting' ? (
                                <> Preparing</>
                              ) : (
                                <> Transferring</>
                              )
                            ) : null}
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {/* Speed and ETA for current file - only show during transfer stage */}
                        {showTransferMetrics && progress && (
                          <div className="hidden sm:block text-right text-xs text-muted-foreground mr-2">
                            <div>
                              {progress.speed && progress.speed > 0 
                                ? `Avg ${formatFileSize(progress.speed)}/s`
                                : 'Calculating...'}
                            </div>
                            <div>
                              {canEstimateEta(progress.speed, progress.bytesTransferred, progress.totalBytes, progress.progress)
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
                                aria-label={`Download ${file.name}`}
                                title={`Download ${file.name}`}
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
                        ) : isTransferring ? (
                          <div className="flex items-center gap-2">
                            {isActiveFile ? (
                              <Loader2 className="h-5 w-5 animate-spin motion-reduce:animate-none text-blue-500" />
                            ) : (
                              <div className="w-5 h-5 rounded-full bg-muted flex-shrink-0" />
                            )}
                            {canCancelFile && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onCancelFile?.(index)}
                                title={cancelButtonTitle}
                                aria-label={`${cancelButtonTitle}: ${file.name}`}
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
                    {!isCancelled && (Boolean(progress) || isCompleted) && (
                      <div className="space-y-1">
                        <Progress 
                          value={progress ? (progress.stage === 'converting' && progress.conversionProgress ? progress.conversionProgress : progress.progress) : (isCompleted ? 100 : 0)} 
                          className={`h-2 ${progress?.stage === 'converting' ? '[&>div]:bg-orange-500' : ''}`}
                        />
                        {showTransferMetrics && progress && (
                          <div className="sm:hidden flex items-center justify-between text-[11px] text-muted-foreground">
                            <span>
                              {progress.speed && progress.speed > 0
                                ? `Avg ${formatFileSize(progress.speed)}/s`
                                : 'Speed: Calculating...'}
                            </span>
                            <span>
                              {canEstimateEta(progress.speed, progress.bytesTransferred, progress.totalBytes, progress.progress)
                                ? formatTime((progress.totalBytes - progress.bytesTransferred) / progress.speed)
                                : 'ETA: Calculating...'}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>
                            {progress ? (
                              progress.stage === 'converting' && progress.conversionProgress ? 
                                `${Math.round(progress.conversionProgress)}% prepared` : 
                                formatProgressLabel(progress.progress, progress.bytesTransferred)
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
          </div>
        </div>
      )}

      {(isComplete || isCancelled) && transferState.files.length > 0 ? (
        <div className="rounded-xl border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold">Transfer Summary</h4>
            <Badge variant={isComplete ? 'secondary' : 'outline'}>
              {isComplete ? 'Completed' : 'Cancelled'}
            </Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-border/70 bg-muted/30 px-3 py-2">
              <div className="text-xs text-muted-foreground">Total size</div>
              <div className="font-medium">{formatFileSize(summaryTotalBytes)}</div>
            </div>
            <div className="rounded-lg border border-border/70 bg-muted/30 px-3 py-2">
              <div className="text-xs text-muted-foreground">Elapsed time</div>
              <div className="font-medium">{summaryDurationSeconds ? formatTime(summaryDurationSeconds) : '—'}</div>
            </div>
            <div className="rounded-lg border border-border/70 bg-muted/30 px-3 py-2">
              <div className="text-xs text-muted-foreground">Average speed</div>
              <div className="font-medium">
                {summaryAverageSpeed ? `${formatFileSize(summaryAverageSpeed)}/s` : '—'}
              </div>
            </div>
            <div className="rounded-lg border border-border/70 bg-muted/30 px-3 py-2">
              <div className="text-xs text-muted-foreground">Files</div>
              <div className="font-medium">
                {summaryCompletedCount}/{transferState.files.length} completed
                {summaryCancelledCount > 0 ? `, ${summaryCancelledCount} cancelled` : ''}
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Integrity status: {summaryIntegrityLabel}
          </p>
        </div>
      ) : null}

      {/* Action Buttons - Always visible */}
      <div className="rounded-xl border border-border p-4">
        {hasError ? (
          <div className="flex flex-col sm:flex-row gap-3">
            {onRetry ? (
              <Button onClick={onRetry} className="flex-1 rounded-xl">
                <RotateCcw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            ) : null}

            {isReceiver ? (
              <>
                {onBackToReceive ? (
                  <Button onClick={onBackToReceive} variant="outline" className="flex-1 rounded-xl">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Enter code again
                  </Button>
                ) : (
                  <Button onClick={onReset} variant="outline" className="flex-1 rounded-xl">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                )}

                {onBackToSend ? (
                  <Button onClick={onBackToSend} variant="ghost" className="flex-1 rounded-xl">
                    Switch to Send
                  </Button>
                ) : null}
              </>
            ) : (
              <>
                {onBackToSend ? (
                  <Button onClick={onBackToSend} variant="outline" className="flex-1 rounded-xl">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    New room
                  </Button>
                ) : (
                  <Button onClick={onReset} variant="outline" className="flex-1 rounded-xl">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    New transfer
                  </Button>
                )}

                {onBackToReceive ? (
                  <Button onClick={onBackToReceive} variant="ghost" className="flex-1 rounded-xl">
                    Switch to Receive
                  </Button>
                ) : null}
              </>
            )}
          </div>
        ) : transferState.status === 'connecting' ? (
          <div className="flex flex-col sm:flex-row gap-3">
            {isReceiver && onRetry ? (
              <Button onClick={onRetry} className="flex-1 rounded-xl">
                <RotateCcw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            ) : null}
            <Button onClick={onReset} variant="outline" className="flex-1 rounded-xl">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Cancel & Go Back
            </Button>
          </div>
        ) : isTransferring ? (
          <div className="flex gap-3">
            <Button onClick={onCancel} variant="outline" className="flex-1 rounded-xl">
              <X className="h-4 w-4 mr-2" />
              Cancel Transfer
            </Button>
          </div>
        ) : isComplete || isCancelled ? (
          <div className="flex flex-col sm:flex-row gap-3">
            {isReceiver ? (
              <Button onClick={onReset} variant="outline" className="flex-1 rounded-xl">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to menu
              </Button>
            ) : (
              <Button onClick={onReset} variant="outline" className="flex-1 rounded-xl">
                <RotateCcw className="h-4 w-4 mr-2" />
                New transfer
              </Button>
            )}
            {isReceiver && onBackToSend ? (
              <Button onClick={onBackToSend} variant="ghost" className="flex-1 rounded-xl">
                Switch to Send
              </Button>
            ) : null}
            {!isReceiver && onBackToReceive ? (
              <Button onClick={onBackToReceive} variant="ghost" className="flex-1 rounded-xl">
                Switch to Receive
              </Button>
            ) : null}
          </div>
        ) : (
          <div className="flex gap-3">
            <Button onClick={onReset} variant="outline" className="flex-1 rounded-xl">
              <RotateCcw className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
        )}
      </div>
      </div>
    </>
  );
}
