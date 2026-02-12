'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Trash2, QrCode, Copy, Link2 } from 'lucide-react';
import { toast } from 'sonner';

import QRCode from 'qrcode';

import { formatFileSize } from '@/lib/file-utils';

interface SendFilesPanelProps {
  onSendFiles: (files: File[]) => void;
  disabled: boolean;
  roomCode: string;
}

export default function SendFilesPanel({ onSendFiles, disabled, roomCode }: SendFilesPanelProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [showQrCode, setShowQrCode] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getShareUrl = useCallback(() => {
    if (typeof window === 'undefined') {
      return '';
    }
    return `${window.location.origin}?receive=${roomCode}`;
  }, [roomCode]);

  const copyToClipboard = useCallback(async (value: string) => {
    if (!value) {
      throw new Error('Nothing to copy');
    }

    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }, []);

  const handleCopyCode = useCallback(async () => {
    try {
      await copyToClipboard(roomCode);
      toast.success('Code copied');
    } catch (error) {
      console.warn('Copy code failed:', error);
      toast.error('Could not copy code');
    }
  }, [copyToClipboard, roomCode]);

  const handleCopyLink = useCallback(async () => {
    try {
      const shareUrl = getShareUrl();
      await copyToClipboard(shareUrl);
      toast.success('Link copied');
    } catch (error) {
      console.warn('Copy link failed:', error);
      toast.error('Could not copy link');
    }
  }, [copyToClipboard, getShareUrl]);

  // Generate QR code when room code changes
  useEffect(() => {
    let cancelled = false;

    if (roomCode) {
      setShowQrCode(true);
      const generateQR = async () => {
        try {
          const shareUrl = getShareUrl();
          const qrDataUrl = await QRCode.toDataURL(shareUrl, {
            width: 256,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            }
          });
          if (!cancelled) {
            setQrCodeUrl(qrDataUrl);
          }
        } catch (error) {
          console.error('QR generation failed:', error);
        }
      };
      generateQR();
    } else {
      setQrCodeUrl('');
    }

    return () => {
      cancelled = true;
    };
  }, [getShareUrl, roomCode]);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setSelectedFiles((prev) => {
        const merged = [...prev];

        for (const file of files) {
          const exists = merged.some(
            (existing) =>
              existing.name === file.name
              && existing.size === file.size
              && existing.lastModified === file.lastModified,
          );

          if (!exists) {
            merged.push(file);
          }
        }

        return merged;
      });
    }
    event.target.value = '';
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) {
      setSelectedFiles((prev) => {
        const merged = [...prev];

        for (const file of files) {
          const exists = merged.some(
            (existing) =>
              existing.name === file.name
              && existing.size === file.size
              && existing.lastModified === file.lastModified,
          );

          if (!exists) {
            merged.push(file);
          }
        }

        return merged;
      });
    }
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  const removeFile = useCallback((index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const generateQRCode = useCallback(async () => {
    if (!roomCode) return;
    
    try {
      const shareUrl = getShareUrl();
      const qrDataUrl = await QRCode.toDataURL(shareUrl, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(qrDataUrl);
    } catch (error) {
      console.error('Manual QR generation failed:', error);
    }
  }, [getShareUrl, roomCode]);

  const handleSendFiles = useCallback(() => {
    if (selectedFiles.length > 0) {
      onSendFiles(selectedFiles);
    }
  }, [selectedFiles, onSendFiles]);

  const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);

  if (roomCode) {
    return (
      <div className="space-y-5 animate-in fade-in duration-300">
        {/* Room info card */}
        <div className="relative rounded-2xl border border-border overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-500" />
          <div className="p-6 pl-5">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-11 w-11 rounded-xl bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center">
                <QrCode className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base">Room Ready</h3>
                <p className="text-sm text-muted-foreground mt-0.5">Share this code with the receiver</p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <div className="p-4 bg-muted/70 rounded-xl text-center">
                <div className="font-mono slashed-zero text-2xl md:text-3xl font-bold tracking-[0.35em] text-foreground">
                  {roomCode}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full rounded-lg"
                  onClick={handleCopyCode}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy code
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full rounded-lg"
                  onClick={handleCopyLink}
                >
                  <Link2 className="h-4 w-4 mr-2" />
                  Copy link
                </Button>
                {qrCodeUrl ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full rounded-lg"
                    onClick={() => setShowQrCode((prev) => !prev)}
                  >
                    <QrCode className="h-4 w-4 mr-2" />
                    {showQrCode ? 'Hide QR' : 'Show QR'}
                  </Button>
                ) : null}
              </div>

              {qrCodeUrl ? (
                showQrCode ? (
                  <div className="flex justify-center">
                    <div className="p-2 bg-white rounded-xl shadow-sm">
                      <Image
                        src={qrCodeUrl}
                        alt="QR Code"
                        width={200}
                        height={200}
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                ) : null
              ) : (
                <Button onClick={generateQRCode} variant="outline" size="sm" className="w-full rounded-lg">
                  <QrCode className="h-4 w-4 mr-2" />
                  Generate QR Code
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Queued files */}
        <div className="rounded-2xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Queued Files</h4>
            <Badge variant="secondary" className="text-xs">{selectedFiles.length}</Badge>
          </div>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted/40 rounded-xl">
                <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-indigo-100 dark:bg-indigo-500/15 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-indigo-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-sm truncate">{file.name}</div>
                  <div className="text-xs text-muted-foreground">{formatFileSize(file.size)}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total</span>
            <span className="font-semibold">{selectedFiles.length} files · {formatFileSize(totalSize)}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* Drop zone */}
      {selectedFiles.length === 0 && (
        <div
          className="relative border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-indigo-400/50 dark:hover:border-indigo-500/30 transition-all cursor-pointer group overflow-hidden"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-indigo-50/0 group-hover:from-indigo-50/60 group-hover:to-purple-50/40 dark:group-hover:from-indigo-500/5 dark:group-hover:to-purple-500/5 transition-all duration-300" />
          <div className="relative space-y-4">
            <div className="mx-auto w-fit rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 p-4 group-hover:scale-110 transition-transform duration-300">
              <Upload className="h-7 w-7 text-indigo-500" />
            </div>
            <div>
              <p className="text-base font-semibold">Choose files to share</p>
              <p className="text-sm text-muted-foreground mt-1">
                Drop files here or click to browse
              </p>
              <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-2">
                Large files may be slow on mobile connections
              </p>
            </div>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Selected files list */}
      {selectedFiles.length > 0 && (
        <div className="rounded-2xl border border-border p-4 md:p-5">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Selected Files</h4>
            <Badge variant="secondary" className="text-xs">
              {selectedFiles.length} files
            </Badge>
          </div>

          <div className="mb-3 md:mb-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full rounded-lg"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Select more files
            </Button>
          </div>

          <div className="space-y-2 max-h-44 md:max-h-60 overflow-y-auto pr-1">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center gap-3 p-2.5 md:p-3 bg-muted/40 rounded-xl group/item">
                <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-violet-100 dark:bg-violet-500/15 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-violet-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-sm truncate">{file.name}</div>
                  <div className="text-xs text-muted-foreground">{formatFileSize(file.size)}</div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                  aria-label={`Remove ${file.name}`}
                  title={`Remove ${file.name}`}
                  className="flex-shrink-0 h-8 w-8 p-0 text-muted-foreground hover:text-red-500 opacity-100 md:opacity-0 md:group-hover/item:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-border/60">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="font-semibold">{selectedFiles.length} files · {formatFileSize(totalSize)}</span>
            </div>
          </div>

          <div className="mt-3 md:mt-4">
            <Button
              onClick={handleSendFiles}
              disabled={disabled}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 hover:brightness-110 transition-all"
              size="lg"
            >
              <Upload className="h-4 w-4 mr-2" />
              Start Sharing
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
