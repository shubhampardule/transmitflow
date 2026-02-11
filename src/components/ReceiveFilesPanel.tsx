'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Download, QrCode, Camera, X } from 'lucide-react';
import { Scanner } from '@yudiel/react-qr-scanner';

interface ReceiveFilesPanelProps {
  onReceiveFiles: (roomCode: string) => void;
  disabled: boolean;
}

const ROOM_CODE_REGEX = /^[A-Z0-9]{8}$/;

const normalizeRoomCode = (value: string): string => (
  value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8)
);

const tryParseUrl = (value: string): URL | null => {
  try {
    return new URL(value);
  } catch {
    // Fall through to add scheme when missing.
  }

  if (!/^https?:\/\//i.test(value) && value.includes('.')) {
    try {
      return new URL(`https://${value}`);
    } catch {
      return null;
    }
  }

  return null;
};

const extractRoomCodeFromScan = (rawValue: string): string | null => {
  const trimmed = rawValue.trim();
  if (!trimmed) return null;

  const upper = trimmed.toUpperCase();

  const parsedUrl = tryParseUrl(trimmed);
  if (parsedUrl) {
    const receiveParam = parsedUrl.searchParams.get('receive');
    if (receiveParam) {
      const normalizedParam = normalizeRoomCode(receiveParam);
      if (ROOM_CODE_REGEX.test(normalizedParam)) {
        return normalizedParam;
      }
    }
  }

  const receiveMatch = upper.match(/RECEIVE=([A-Z0-9]{8})/);
  if (receiveMatch) {
    return receiveMatch[1];
  }

  const normalizedDirect = normalizeRoomCode(trimmed);
  const directCandidateLength = trimmed.replace(/[^A-Z0-9]/gi, '').length;
  if (directCandidateLength <= 8 && ROOM_CODE_REGEX.test(normalizedDirect)) {
    return normalizedDirect;
  }

  const regexMatch = upper.match(/[A-Z0-9]{8}/);
  if (regexMatch) {
    return regexMatch[0];
  }

  return null;
};

export default function ReceiveFilesPanel({ onReceiveFiles, disabled }: ReceiveFilesPanelProps) {
  const searchParams = useSearchParams();
  const receiveCode = searchParams.get('receive');

  const [roomCode, setRoomCode] = useState(receiveCode ? normalizeRoomCode(receiveCode) : '');
  const [showScanner, setShowScanner] = useState(false);
  const [showConnectInterface, setShowConnectInterface] = useState(false);
  const [scannedCode, setScannedCode] = useState('');
  const [hasAutoConnected, setHasAutoConnected] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!receiveCode || hasAutoConnected) {
      return;
    }

    const normalized = normalizeRoomCode(receiveCode);
    if (!ROOM_CODE_REGEX.test(normalized)) {
      return;
    }

    setHasAutoConnected(true);
    const timeoutId = setTimeout(() => {
      onReceiveFiles(normalized);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [receiveCode, hasAutoConnected, onReceiveFiles]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    const normalized = normalizeRoomCode(roomCode);
    if (!ROOM_CODE_REGEX.test(normalized)) {
      setScanMessage('Room code must be 8 letters/numbers.');
      return;
    }

    setScanMessage(null);
    onReceiveFiles(normalized);
  }, [roomCode, onReceiveFiles]);

  const handleScanSuccess = useCallback((detectedCodes: { rawValue: string }[]) => {
    if (!detectedCodes || detectedCodes.length === 0) {
      return;
    }

    const rawValue = detectedCodes[0]?.rawValue || '';
    const code = extractRoomCodeFromScan(rawValue);

    if (!code) {
      setScanMessage('QR detected, but room code was invalid. Try rescanning.');
      return;
    }

    setScanMessage(null);
    setScannedCode(code);
    setShowScanner(false);
    setShowConnectInterface(true);
  }, []);

  const handleScanError = useCallback((error: unknown) => {
    console.error('QR scan error:', error);
    const msg = error instanceof Error ? error.message : String(error);
    const lower = msg.toLowerCase();

    if (lower.includes('permission') || lower.includes('denied') || lower.includes('notallowed')) {
      setScanMessage('Camera permission denied. Please allow camera access in your browser settings.');
    } else if (lower.includes('secure') || lower.includes('https') || lower.includes('notreadable') || lower.includes('not found')) {
      setScanMessage(
        'Camera not available. On mobile, open this page over HTTPS or localhost.'
      );
    } else {
      setScanMessage('Unable to read QR right now. Move closer and improve lighting.');
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = normalizeRoomCode(e.target.value);
    setRoomCode(formatted);

    if (scanMessage) {
      setScanMessage(null);
    }
  };

  const handleConnectConfirm = () => {
    setShowConnectInterface(false);
    onReceiveFiles(scannedCode);
  };

  const handleConnectCancel = () => {
    setShowConnectInterface(false);
    setScannedCode('');
  };

  if (showScanner) {
    return (
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Scan QR Code</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowScanner(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="relative aspect-square w-full max-w-xs md:max-w-sm mx-auto rounded-lg overflow-hidden bg-black">
              <Scanner
                onScan={handleScanSuccess}
                onError={handleScanError}
                formats={['qr_code']}
                allowMultiple={false}
                scanDelay={300}
                constraints={{
                  facingMode: 'environment'
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-32 h-32 md:w-48 md:h-48 border-2 border-white rounded-lg relative">
                  <div className="absolute top-0 left-0 w-4 h-4 md:w-6 md:h-6 border-t-4 border-l-4 border-blue-500 rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 md:w-6 md:h-6 border-t-4 border-r-4 border-blue-500 rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 md:w-6 md:h-6 border-b-4 border-l-4 border-blue-500 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 md:w-6 md:h-6 border-b-4 border-r-4 border-blue-500 rounded-br-lg"></div>
                </div>
              </div>
            </div>

            <p className="text-xs md:text-sm text-muted-foreground text-center">
              Point your camera at the QR code to connect
            </p>
            {scanMessage && (
              <p className="text-xs md:text-sm text-red-500 text-center">
                {scanMessage}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showConnectInterface) {
    return (
      <div className="space-y-4 md:space-y-6 animate-in fade-in duration-300">
        <Card className="hidden md:block bg-gradient-to-br from-background to-muted/20">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <div className="p-2 mx-auto w-fit rounded-full bg-primary/10">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Receive Files</h3>
                <p className="text-xs text-muted-foreground">
                  Enter the room code or scan QR code to connect
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-background to-muted/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="p-3 mx-auto w-fit rounded-full bg-green-100 dark:bg-green-900/20">
                <QrCode className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">QR Code Scanned!</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Ready to connect to room:
                </p>
                <div className="p-3 bg-muted rounded-lg mb-4">
                  <span className="text-lg font-mono font-bold tracking-wider">{scannedCode}</span>
                </div>
              </div>

              <div className="flex gap-3 justify-center max-w-sm mx-auto">
                <Button
                  variant="outline"
                  onClick={handleConnectCancel}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConnectConfirm}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Connect
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-300">
      <div className="md:grid md:grid-cols-2 md:gap-4">
        <Card className="md:hidden">
          <CardContent className="p-4">
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="roomCode" className="text-sm font-medium block mb-2">
                    Room Code
                  </label>
                  <Input
                    ref={inputRef}
                    id="roomCode"
                    type="text"
                    value={roomCode}
                    onChange={handleInputChange}
                    placeholder="Enter 8-digit code"
                    className="text-center font-mono text-lg tracking-widest"
                    maxLength={8}
                  />
                </div>
                {scanMessage && (
                  <p className="text-xs text-red-500">{scanMessage}</p>
                )}

                <Button
                  type="submit"
                  disabled={disabled || roomCode.length !== 8}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  size="lg"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Connect
                </Button>
              </form>

              <div className="space-y-4 pt-2 border-t">
                <div className="text-center">
                  <QrCode className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <h4 className="font-medium text-sm">Scan QR Code</h4>
                  <p className="text-xs text-muted-foreground">
                    Use your camera to scan
                  </p>
                </div>

                <Button
                  onClick={() => {
                    setScanMessage(null);
                    setShowScanner(true);
                  }}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Open Scanner
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hidden md:block">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="roomCode" className="text-sm font-medium block mb-2">
                  Room Code
                </label>
                <Input
                  ref={inputRef}
                  id="roomCode"
                  type="text"
                  value={roomCode}
                  onChange={handleInputChange}
                  placeholder="Enter 8-digit code"
                  className="text-center font-mono text-lg tracking-widest"
                  maxLength={8}
                />
              </div>
              {scanMessage && (
                <p className="text-xs text-red-500">{scanMessage}</p>
              )}

              <Button
                type="submit"
                disabled={disabled || roomCode.length !== 8}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                size="lg"
              >
                <Download className="h-4 w-4 mr-2" />
                Connect
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="hidden md:block">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="text-center">
                <QrCode className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <h4 className="font-medium text-base">Scan QR Code</h4>
                <p className="text-sm text-muted-foreground">
                  Use your camera to scan
                </p>
              </div>

              <Button
                onClick={() => {
                  setScanMessage(null);
                  setShowScanner(true);
                }}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <Camera className="h-4 w-4 mr-2" />
                Open Scanner
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
