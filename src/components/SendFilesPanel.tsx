'use client';

import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Trash2, Camera, X } from 'lucide-react';
import { Scanner } from '@yudiel/react-qr-scanner';

import { formatFileSize } from '@/lib/file-utils';
import { getFileIcon } from '@/lib/file-icons';

interface SendFilesPanelProps {
  onSendFiles: (files: File[], roomCode?: string) => void;
  disabled: boolean;
}

const ROOM_CODE_REGEX = /^[0-9]{4}$/;

const extractReceiverInvite = (rawValue: string): { roomCode: string } | null => {
  try {
    const url = new URL(rawValue.trim());
    const roomCode = (url.searchParams.get('receive') || '').replace(/[^0-9]/g, '').slice(0, 4);
    return ROOM_CODE_REGEX.test(roomCode) ? { roomCode } : null;
  } catch {
    return null;
  }
};

export default function SendFilesPanel({ onSendFiles, disabled }: SendFilesPanelProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);
  const dragCounterRef = useRef(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    dragCounterRef.current = 0;
    setIsDragging(false);
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

  const handleDragEnter = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    dragCounterRef.current += 1;
    if (dragCounterRef.current === 1) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    dragCounterRef.current -= 1;
    if (dragCounterRef.current <= 0) {
      dragCounterRef.current = 0;
      setIsDragging(false);
    }
  }, []);

  const removeFile = useCallback((index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleSendFiles = useCallback(() => {
    if (selectedFiles.length > 0) {
      onSendFiles(selectedFiles);
    }
  }, [selectedFiles, onSendFiles]);

  const handleScanSuccess = useCallback((detectedCodes: { rawValue: string }[]) => {
    const invite = extractReceiverInvite(detectedCodes[0]?.rawValue || '');
    if (!invite) {
      setScanMessage('That QR code didn\u2019t work. Ask the receiver to show theirs again.');
      return;
    }

    setScanMessage(null);
    setShowScanner(false);
    onSendFiles(selectedFiles, invite.roomCode);
  }, [onSendFiles, selectedFiles]);

  const handleScanError = useCallback((error: unknown) => {
    console.error('QR scan error:', error);
    setScanMessage('Unable to read QR right now. Move closer and improve lighting.');
  }, []);

  const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);

  if (showScanner) {
    return (
      <div className="rounded-md border border-border p-4 md:p-6 animate-in fade-in duration-300">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Scan receiver QR</h3>
              <p className="text-sm text-muted-foreground mt-1">Point your camera at the QR shown on the receiving device.</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowScanner(false)} aria-label="Close QR scanner" className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative aspect-square w-full max-w-xs md:max-w-sm mx-auto rounded-md overflow-hidden bg-black">
            <Scanner
              onScan={handleScanSuccess}
              onError={handleScanError}
              formats={['qr_code']}
              allowMultiple={false}
              scanDelay={300}
              constraints={{ facingMode: 'environment' }}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-32 h-32 md:w-48 md:h-48 border border-white/40 relative">
                <div className="absolute top-0 left-0 w-5 h-5 md:w-6 md:h-6 border-t-[3px] border-l-[3px] border-primary" />
                <div className="absolute top-0 right-0 w-5 h-5 md:w-6 md:h-6 border-t-[3px] border-r-[3px] border-primary" />
                <div className="absolute bottom-0 left-0 w-5 h-5 md:w-6 md:h-6 border-b-[3px] border-l-[3px] border-primary" />
                <div className="absolute bottom-0 right-0 w-5 h-5 md:w-6 md:h-6 border-b-[3px] border-r-[3px] border-primary" />
              </div>
            </div>
          </div>
          {scanMessage && <p className="text-xs text-destructive text-center">{scanMessage}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Drop zone */}
      {selectedFiles.length === 0 && (
        <>
          <div
            className={`relative border border-dashed rounded-md p-8 text-center transition-colors duration-150 cursor-pointer ${
              isDragging
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-foreground/40'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="space-y-3">
              <div className={`mx-auto w-fit rounded-md border p-3 transition-colors duration-150 ${
                isDragging ? 'border-primary text-primary' : 'border-border text-muted-foreground'
              }`}>
                <Upload className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  {isDragging ? 'Drop files here' : 'Choose files to share'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {isDragging ? 'Release to add files' : 'Drop files here or click to browse'}
                </p>
                <p className="font-mono text-[10px] tracking-wide text-muted-foreground/70 mt-3">
                  NOTE — LARGE FILES MAY BE SLOWER ON MOBILE
                </p>
              </div>
            </div>
          </div>

          {scanMessage && <p className="text-xs text-destructive text-center">{scanMessage}</p>}
        </>
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
        <div className="rounded-md border border-border p-4 md:p-5">
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <h4 className="font-mono text-[11px] tracking-widest text-muted-foreground">SELECTED</h4>
            <Badge variant="secondary">
              {selectedFiles.length} {selectedFiles.length === 1 ? 'file' : 'files'}
            </Badge>
          </div>

          <div className="mb-3 md:mb-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4" />
              Select more files
            </Button>
          </div>

          <div className="space-y-1.5 max-h-44 md:max-h-60 overflow-y-auto pr-1">
            {selectedFiles.map((file, index) => {
              const Icon = getFileIcon(file.name, file.type);
              return (
              <div key={index} className="flex items-center gap-3 p-2.5 md:p-3 border border-border rounded-md group/item">
                <div className="flex-shrink-0 h-8 w-8 rounded-md border border-border flex items-center justify-center text-muted-foreground">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-sm truncate">{file.name}</div>
                  <div className="font-mono text-xs text-muted-foreground">{formatFileSize(file.size)}</div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                  aria-label={`Remove ${file.name}`}
                  title={`Remove ${file.name}`}
                  className="flex-shrink-0 h-8 w-8 p-0 text-muted-foreground hover:text-destructive opacity-100 md:opacity-0 md:group-hover/item:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              );
            })}
          </div>

          <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-border font-mono">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>TOTAL</span>
              <span className="text-foreground">{selectedFiles.length} files · {formatFileSize(totalSize)}</span>
            </div>
          </div>

          <div className="mt-3 md:mt-4 space-y-2">
            <Button
              onClick={handleSendFiles}
              disabled={disabled}
              className="w-full"
              size="lg"
            >
              <Upload className="h-4 w-4" />
              Send files
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setScanMessage(null);
                setShowScanner(true);
              }}
              disabled={disabled}
              className="w-full"
              size="lg"
            >
              <Camera className="h-4 w-4" />
              Scan QR
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
