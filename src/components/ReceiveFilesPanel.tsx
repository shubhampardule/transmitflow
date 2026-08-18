'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, KeyRound, QrCode, X } from 'lucide-react';

interface ReceiveFilesPanelProps {
  onPrepareReceive: () => void;
  onReceiveFiles: (roomCode: string) => void;
  disabled: boolean;
}

const ROOM_CODE_REGEX = /^[0-9]{4}$/;

const normalizeRoomCode = (value: string): string => (
  value.replace(/[^0-9]/g, '').slice(0, 4)
);

const tryParseUrl = (value: string): URL | null => {
  try {
    return new URL(value);
  } catch {
    if (!/^https?:\/\//i.test(value) && value.includes('.')) {
      try {
        return new URL(`https://${value}`);
      } catch {
        return null;
      }
    }
    return null;
  }
};

const extractRoomCode = (rawValue: string): string | null => {
  const trimmed = rawValue.trim();
  if (!trimmed) return null;

  const parsedUrl = tryParseUrl(trimmed);
  if (!parsedUrl) return null;

  const roomCode = normalizeRoomCode(parsedUrl.searchParams.get('receive') || '');
  return ROOM_CODE_REGEX.test(roomCode) ? roomCode : null;
};

export default function ReceiveFilesPanel({ onPrepareReceive, onReceiveFiles, disabled }: ReceiveFilesPanelProps) {
  const searchParams = useSearchParams();
  const receiveCode = searchParams.get('receive');

  const [roomCode, setRoomCode] = useState(receiveCode ? normalizeRoomCode(receiveCode) : '');
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const normalized = receiveCode ? normalizeRoomCode(receiveCode) : '';
    if (!ROOM_CODE_REGEX.test(normalized)) return;

    const timeoutId = setTimeout(() => {
      onReceiveFiles(normalized);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [receiveCode, onReceiveFiles]);

  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();

    const normalizedCode = normalizeRoomCode(roomCode);
    const fromLink = extractRoomCode(roomCode);
    const code = fromLink || (ROOM_CODE_REGEX.test(normalizedCode) ? normalizedCode : null);

    if (!code) {
      setScanMessage('Enter the 4-digit code, or paste the complete link instead.');
      return;
    }

    setScanMessage(null);
    onReceiveFiles(code);
  }, [onReceiveFiles, roomCode]);

  const handleRoomCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    const looksLikeLink = /[/?=&.]/.test(nextValue);
    setRoomCode(looksLikeLink ? nextValue : normalizeRoomCode(nextValue));
    setScanMessage(null);
  };

  if (showManualEntry) {
    return (
      <div className="rounded-md border border-border p-5 md:p-6 animate-in fade-in duration-300">
        <div className="space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Enter code</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Type the 4-digit code the sender gave you, or paste their link.
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowManualEntry(false)}
              aria-label="Back to receive options"
              className="h-8 w-8 shrink-0 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="roomCode" className="mb-2 block font-mono text-[11px] tracking-widest text-muted-foreground">
                CODE
              </label>
              <Input
                ref={inputRef}
                id="roomCode"
                value={roomCode}
                onChange={handleRoomCodeChange}
                placeholder="1234"
                inputMode="numeric"
                className="h-12 text-lg font-mono tracking-[0.3em] text-center"
                autoCorrect="off"
                spellCheck={false}
                autoCapitalize="none"
              />
            </div>
            {scanMessage && <p className="text-xs text-destructive">{scanMessage}</p>}
            <Button type="submit" disabled={disabled || !roomCode.trim()} className="w-full" size="lg">
              <Download className="h-4 w-4" />
              Connect
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-border p-5 md:p-6 animate-in fade-in duration-300">
      <div className="space-y-5">
        <div>
          <h3 className="text-lg font-semibold">Receive files</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Generate a QR code for the sender, or enter a code if the sender already shared one.
          </p>
        </div>

        <Button type="button" onClick={onPrepareReceive} disabled={disabled} className="w-full" size="lg">
          <QrCode className="h-4 w-4" />
          Generate QR
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setScanMessage(null);
            setShowManualEntry(true);
          }}
          disabled={disabled}
          className="w-full"
          size="lg"
        >
          <KeyRound className="h-4 w-4" />
          Enter code
        </Button>
      </div>
    </div>
  );
}
