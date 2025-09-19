'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, Trash2, QrCode } from 'lucide-react';

import QRCode from 'qrcode';

import { formatFileSize } from '@/lib/file-utils';

interface SendFilesPanelProps {
  onSendFiles: (files: File[]) => void;
  disabled: boolean;
  roomCode: string;
}

export default function SendFilesPanel({ onSendFiles, disabled, roomCode }: SendFilesPanelProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  // Start with empty QR code
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log('SendFilesPanel rendering, roomCode:', roomCode, 'qrCodeUrl:', qrCodeUrl ? 'HAS_VALUE' : 'EMPTY');

  // Test QR code generation immediately
  useEffect(() => {
    // Always generate a test QR code to verify rendering works
    const generateTestQR = async () => {
      try {
        console.log('Generating test QR code...');
        const testQrUrl = await QRCode.toDataURL('https://example.com');
        console.log('Test QR generated, length:', testQrUrl.length);
        setQrCodeUrl(testQrUrl);
      } catch (error) {
        console.error('Test QR generation failed:', error);
      }
    };
    generateTestQR();
  }, []);

  // Generate QR code when room code changes
  useEffect(() => {
    console.log('=== QR EFFECT RUNNING ===', 'roomCode:', roomCode);
    if (roomCode) {
      console.log('Room code exists, generating QR...');
      const generateQR = async () => {
        try {
          const shareUrl = `${window.location.origin}?receive=${roomCode}`;
          console.log('Generating QR for URL:', shareUrl);
          const qrDataUrl = await QRCode.toDataURL(shareUrl, {
            width: 256,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            }
          });
          console.log('QR generated successfully! Length:', qrDataUrl.length);
          setQrCodeUrl(qrDataUrl);
          console.log('QR code state updated');
        } catch (error) {
          console.error('QR generation failed:', error);
        }
      };
      generateQR();
    } else {
      console.log('No room code, clearing QR');
      setQrCodeUrl('');
    }
  }, [roomCode]);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setSelectedFiles(files);
    }
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) {
      setSelectedFiles(files);
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
      const shareUrl = `${window.location.origin}?receive=${roomCode}`;
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
  }, [roomCode]);

  const handleSendFiles = useCallback(() => {
    console.log('handleSendFiles called with:', selectedFiles.length, 'files');
    console.log('disabled:', disabled);
    if (selectedFiles.length > 0) {
      console.log('Calling onSendFiles with files:', selectedFiles);
      onSendFiles(selectedFiles);
    } else {
      console.log('No files selected');
    }
  }, [selectedFiles, onSendFiles, disabled]);

  const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);

  if (roomCode) {
    console.log('Rendering room code section - roomCode:', roomCode, 'qrCodeUrl:', qrCodeUrl || 'EMPTY');
    return (
      <div className="space-y-6">
        <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/50">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="p-3 mx-auto w-fit rounded-full bg-green-100 dark:bg-green-900">
                <QrCode className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
                  Share Room Created!
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Share this code with the receiver
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="p-4 bg-white dark:bg-gray-900 rounded-lg border">
                  <div className="font-mono text-2xl font-bold text-center tracking-widest">
                    {roomCode}
                  </div>
                </div>
                
                {qrCodeUrl ? (
                  <div className="flex justify-center">
                    <Image 
                      src={qrCodeUrl} 
                      alt="QR Code" 
                      width={256} 
                      height={256} 
                      className="rounded-lg border" 
                    />
                  </div>
                ) : (
                  <Button onClick={generateQRCode} variant="outline" size="sm">
                    <QrCode className="h-4 w-4 mr-2" />
                    Generate QR Code
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold mb-4">Files to Send:</h4>
            <div className="space-y-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{file.name}</div>
                      <div className="text-sm text-muted-foreground">{formatFileSize(file.size)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Total:</span>
                <span>{selectedFiles.length} files, {formatFileSize(totalSize)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div
        className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer bg-gradient-to-br from-background to-muted/20"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="space-y-4">
          <div className="p-4 mx-auto w-fit rounded-full bg-primary/10">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <div>
            <p className="text-lg font-medium">Choose files to share</p>
            <p className="text-sm text-muted-foreground">
              Drop files here or click to browse
              <br />
              <span className="flex items-center justify-center gap-1 text-xs text-yellow-700 dark:text-yellow-300 mt-1 w-full text-center">
                Large files may crash or fail to download, especially on mobile.
              </span>
            </p>
          </div>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {selectedFiles.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Selected Files</h4>
              <Badge variant="secondary">
                {selectedFiles.length} files
              </Badge>
            </div>
            
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium truncate">{file.name}</div>
                      <div className="text-sm text-muted-foreground">{formatFileSize(file.size)}</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="flex-shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Total:</span>
                <span>{selectedFiles.length} files, {formatFileSize(totalSize)}</span>
              </div>
              
              <Button
                onClick={handleSendFiles}
                disabled={disabled}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                size="lg"
              >
                <Upload className="h-4 w-4 mr-2" />
                Start Sharing
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}