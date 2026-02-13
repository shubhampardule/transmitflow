'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, QrCode, Camera, X } from 'lucide-react';
import { Scanner } from '@yudiel/react-qr-scanner';

interface ReceiveFilesPanelProps {
  onReceiveFiles: (roomCode: string) => void;
  disabled: boolean;
}

const ROOM_CODE_REGEX = /^[A-Z0-9]{4}$/;

const normalizeRoomCode = (value: string): string => (
  value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4)
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

  const receiveMatch = upper.match(/RECEIVE=([A-Z0-9]{4})/);
  if (receiveMatch) {
    return receiveMatch[1];
  }

  const normalizedDirect = normalizeRoomCode(trimmed);
  const directCandidateLength = trimmed.replace(/[^A-Z0-9]/gi, '').length;
  if (directCandidateLength <= 4 && ROOM_CODE_REGEX.test(normalizedDirect)) {
    return normalizedDirect;
  }

  const regexMatch = upper.match(/[A-Z0-9]{4}/);
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
  const isComposingRef = useRef(false);

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

  useEffect(() => {
    if (!showScanner) {
      return;
    }

    const isDecoderCspError = (message: string) => (
      /webassembly/i.test(message)
      && (/content security policy/i.test(message) || /unsafe-eval/i.test(message))
    );

    const onWindowError = (event: ErrorEvent) => {
      const message = event?.message || event?.error?.message || '';
      if (!message) return;
      if (!isDecoderCspError(message)) return;
      setScanMessage('QR scanner is blocked by site security policy (CSP). Please update/redeploy TransmitFlow with WASM allowed, or enter the code manually.');
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event?.reason;
      const message = typeof reason === 'string' ? reason : (reason?.message || '');
      if (!message) return;
      if (!isDecoderCspError(message)) return;
      setScanMessage('QR scanner is blocked by site security policy (CSP). Please update/redeploy TransmitFlow with WASM allowed, or enter the code manually.');
    };

    window.addEventListener('error', onWindowError);
    window.addEventListener('unhandledrejection', onUnhandledRejection);

    return () => {
      window.removeEventListener('error', onWindowError);
      window.removeEventListener('unhandledrejection', onUnhandledRejection);
    };
  }, [showScanner]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    const normalized = normalizeRoomCode(roomCode);
    if (!ROOM_CODE_REGEX.test(normalized)) {
      setScanMessage('Room code must be 4 characters.');
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
    setScanMessage('Unable to read QR right now. Move closer and improve lighting.');
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextRaw = e.target.value;

    // Avoid breaking IME/composition flows (common on mobile) which can drop
    // previously-entered characters when we aggressively normalize mid-compose.
    if (isComposingRef.current) {
      setRoomCode(nextRaw.toUpperCase());
      return;
    }

    setRoomCode(normalizeRoomCode(nextRaw));

    if (scanMessage) {
      setScanMessage(null);
    }
  };

  const handleCompositionStart = () => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    isComposingRef.current = false;
    setRoomCode(normalizeRoomCode(e.currentTarget.value));
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
      <div className="rounded-2xl border border-border p-4 md:p-6 animate-in fade-in duration-300">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Scan QR Code</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowScanner(false)}
              aria-label="Close QR scanner"
              className="h-8 w-8 p-0 rounded-lg"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative aspect-square w-full max-w-xs md:max-w-sm mx-auto rounded-xl overflow-hidden bg-black">
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
              <div className="w-32 h-32 md:w-48 md:h-48 border-2 border-white/50 rounded-xl relative">
                <div className="absolute top-0 left-0 w-5 h-5 md:w-6 md:h-6 border-t-[3px] border-l-[3px] border-indigo-400 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-5 h-5 md:w-6 md:h-6 border-t-[3px] border-r-[3px] border-indigo-400 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-5 h-5 md:w-6 md:h-6 border-b-[3px] border-l-[3px] border-indigo-400 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-5 h-5 md:w-6 md:h-6 border-b-[3px] border-r-[3px] border-indigo-400 rounded-br-lg" />
              </div>
            </div>
          </div>

          <p className="text-xs md:text-sm text-muted-foreground text-center">
            Point your camera at the QR code
          </p>
          {scanMessage && (
            <p className="text-xs md:text-sm text-red-500 text-center">
              {scanMessage}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (showConnectInterface) {
    return (
      <div className="space-y-5 animate-in fade-in duration-300">
        <div className="relative rounded-2xl border border-border overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-500" />
          <div className="p-6 pl-5">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 h-11 w-11 rounded-xl bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center">
                <QrCode className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-base">QR Code Scanned!</h3>
                <p className="text-sm text-muted-foreground mt-0.5">Ready to connect to room</p>
              </div>
            </div>

            <div className="mt-5 p-4 bg-muted/70 rounded-xl text-center">
              <div className="font-mono slashed-zero text-2xl font-bold tracking-[0.35em] text-foreground">
                {scannedCode}
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <Button
                variant="outline"
                onClick={handleConnectCancel}
                className="flex-1 rounded-xl"
                size="lg"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConnectConfirm}
                className="flex-1 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:brightness-110 transition-all"
                size="lg"
              >
                <Download className="h-4 w-4 mr-2" />
                Connect
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-5 animate-in fade-in duration-300">
      <div className="md:grid md:grid-cols-2 md:gap-4">
        {/* Mobile: combined card */}
        <div className="md:hidden rounded-2xl border border-border p-5">
          <div className="space-y-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="roomCode" className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-2">
                  Room Code
                </label>
                <Input
                  ref={inputRef}
                  id="roomCode"
                  type="text"
                  value={roomCode}
                  onChange={handleInputChange}
                  onCompositionStart={handleCompositionStart}
                  onCompositionEnd={handleCompositionEnd}
                  placeholder="Enter 4-char code"
                  className={`text-center font-mono slashed-zero h-12 rounded-xl ${
                    roomCode
                      ? 'text-lg tracking-[0.3em]'
                      : 'text-sm md:text-base tracking-normal placeholder:tracking-normal placeholder:font-sans'
                  }`}
                  maxLength={4}
                  autoCorrect="off"
                  spellCheck={false}
                  autoCapitalize="characters"
                  inputMode="text"
                />
              </div>
              {scanMessage && (
                <p className="text-xs text-red-500">{scanMessage}</p>
              )}

              <Button
                type="submit"
                disabled={disabled || roomCode.length !== 4}
                className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:brightness-110 transition-all"
                size="lg"
              >
                <Download className="h-4 w-4 mr-2" />
                Connect
              </Button>
            </form>

            <div className="pt-4 border-t border-border/60 space-y-4">
              <div className="text-center">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-500/15 mx-auto mb-2">
                  <Camera className="h-5 w-5 text-purple-500" />
                </div>
                <h4 className="font-medium text-sm">Scan QR Code</h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Use your camera to scan
                </p>
              </div>

              <Button
                onClick={() => {
                  setScanMessage(null);
                  setShowScanner(true);
                }}
                variant="outline"
                className="w-full rounded-xl"
                size="lg"
              >
                <Camera className="h-4 w-4 mr-2" />
                Open Scanner
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop: code entry card */}
        <div className="hidden md:block rounded-2xl border border-border p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="roomCode" className="text-xs font-bold uppercase tracking-widest text-muted-foreground block mb-2">
                Room Code
              </label>
              <Input
                ref={inputRef}
                id="roomCode"
                type="text"
                value={roomCode}
                onChange={handleInputChange}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
                placeholder="Enter 4-char code"
                className={`text-center font-mono slashed-zero h-12 rounded-xl ${
                  roomCode
                    ? 'text-lg tracking-[0.3em]'
                    : 'text-sm md:text-base tracking-normal placeholder:tracking-normal placeholder:font-sans'
                }`}
                maxLength={4}
                autoCorrect="off"
                spellCheck={false}
                autoCapitalize="characters"
                inputMode="text"
              />
            </div>
            {scanMessage && (
              <p className="text-xs text-red-500">{scanMessage}</p>
            )}

            <Button
              type="submit"
              disabled={disabled || roomCode.length !== 4}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:brightness-110 transition-all"
              size="lg"
            >
              <Download className="h-4 w-4 mr-2" />
              Connect
            </Button>
          </form>
        </div>

        {/* Desktop: QR scanner card */}
        <div className="hidden md:flex flex-col rounded-2xl border border-border p-6">
          <div className="flex-1 flex flex-col items-center justify-center space-y-4">
            <div className="h-12 w-12 rounded-xl bg-purple-100 dark:bg-purple-500/15 flex items-center justify-center">
              <QrCode className="h-6 w-6 text-purple-500" />
            </div>
            <div className="text-center">
              <h4 className="font-semibold">Scan QR Code</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Use your camera to scan
              </p>
            </div>

            <Button
              onClick={() => {
                setScanMessage(null);
                setShowScanner(true);
              }}
              variant="outline"
              className="w-full rounded-xl"
              size="lg"
            >
              <Camera className="h-4 w-4 mr-2" />
              Open Scanner
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
