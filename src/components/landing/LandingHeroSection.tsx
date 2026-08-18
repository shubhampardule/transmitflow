"use client";

import { useEffect, useRef } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Upload, Download } from 'lucide-react';
import SendFilesPanel from '@/components/SendFilesPanel';
import ReceiveFilesPanel from '@/components/ReceiveFilesPanel';

interface LandingHeroSectionProps {
  isConnected: boolean;
  isOnline: boolean;
  signalingStatus: {
    label: string;
    dotClass: string;
  };
  signalingError: string | null;
  onRetrySignaling: () => void;
  activeTab: 'send' | 'receive';
  onTabChange: (tab: 'send' | 'receive') => void;
  onSendFiles: (files: File[]) => void;
  onPrepareReceive: () => void;
  onReceiveFiles: (roomCode: string) => void;
}

const MANIFEST_FIELDS: Array<{ label: string; value: string }> = [
  { label: 'Carrier', value: 'WebRTC data channel' },
  { label: 'Seal', value: 'DTLS / SRTP, in-browser' },
  { label: 'Max weight', value: '20 GB / transfer' },
];

export default function LandingHeroSection({
  isConnected,
  isOnline,
  signalingStatus,
  signalingError,
  onRetrySignaling,
  activeTab,
  onTabChange,
  onSendFiles,
  onPrepareReceive,
  onReceiveFiles,
}: LandingHeroSectionProps) {
  const previousTabRef = useRef<'send' | 'receive'>(activeTab);

  const panelTransitionClass =
    previousTabRef.current === 'send' && activeTab === 'receive'
      ? 'animate-tab-slide-left'
      : previousTabRef.current === 'receive' && activeTab === 'send'
        ? 'animate-tab-slide-right'
        : 'animate-tab-slide-left';

  useEffect(() => {
    previousTabRef.current = activeTab;
  }, [activeTab]);

  return (
    <section className="pt-12 md:pt-20 lg:pt-24 pb-16 lg:pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="lg:order-2 w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto">
          <div className="rounded-lg border border-border bg-card overflow-hidden shadow-[0_1px_0_hsl(var(--border))]">
            <div className="airmail-stripe h-[6px] w-full" />
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <span className="font-mono text-[11px] tracking-widest text-muted-foreground">WAYBILL</span>
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                <span className={`h-1.5 w-1.5 rounded-full ${signalingStatus.dotClass}`} />
                {signalingStatus.label}
              </span>
            </div>
            <div className="p-5 md:p-7">
              {!isConnected && (
                <div className="mb-4 flex items-start justify-between gap-3 rounded-md border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                  <div className="leading-relaxed">
                    <span className="font-medium text-foreground/80">{signalingStatus.label}.</span>{' '}
                    {isOnline
                      ? 'You can pick files now — sharing unlocks when ready.'
                      : 'Reconnect to the internet to start sharing.'}
                    {signalingError ? (
                      <span className="block mt-1 text-[11px] text-muted-foreground/80">{signalingError}</span>
                    ) : null}
                  </div>
                  {(signalingError || !isOnline) ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8"
                      onClick={onRetrySignaling}
                    >
                      Retry
                    </Button>
                  ) : null}
                </div>
              )}
              <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as 'send' | 'receive')} className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-11 p-1" aria-label="Transfer mode">
                  <TabsTrigger value="send" className="flex items-center gap-2 text-sm">
                    <Upload className="h-4 w-4" />
                    Send
                  </TabsTrigger>
                  <TabsTrigger value="receive" className="flex items-center gap-2 text-sm">
                    <Download className="h-4 w-4" />
                    Receive
                  </TabsTrigger>
                </TabsList>
                <div className="mt-6">
                  <div
                    key={activeTab}
                    className={panelTransitionClass}
                  >
                    {activeTab === 'send' ? (
                      <SendFilesPanel onSendFiles={onSendFiles} disabled={!isConnected} />
                    ) : (
                      <ReceiveFilesPanel
                        onPrepareReceive={onPrepareReceive}
                        onReceiveFiles={onReceiveFiles}
                        disabled={!isConnected}
                      />
                    )}
                  </div>
                </div>
              </Tabs>
            </div>
          </div>
        </div>

        <div className="lg:order-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 font-mono text-[11px] tracking-widest text-primary">
            DIRECT ROUTE — NO LAYOVER
          </div>
          <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.08] text-balance">
            Files move in a straight line.
          </h1>
          <p className="mt-5 max-w-md text-base md:text-lg text-muted-foreground leading-relaxed mx-auto lg:mx-0">
            TransmitFlow opens a direct WebRTC connection between two browsers, like sending
            mail airmail instead of through a sorting depot. Nothing sits on a server in between.
          </p>

          <dl className="mt-10 flex flex-wrap justify-center gap-2 max-w-md mx-auto lg:mx-0 lg:justify-start">
            {MANIFEST_FIELDS.map((row) => (
              <div key={row.label} className="rounded-md border border-dashed border-border px-3.5 py-2.5 text-left">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{row.label}</dt>
                <dd className="mt-1 font-display text-sm text-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
