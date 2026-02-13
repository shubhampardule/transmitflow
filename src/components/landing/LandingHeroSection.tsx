import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Upload, Download, Shield, Globe, Lock, Rocket } from 'lucide-react';
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
  onReceiveFiles: (roomCode: string) => void;
  roomCode: string;
}

export default function LandingHeroSection({
  isConnected,
  isOnline,
  signalingStatus,
  signalingError,
  onRetrySignaling,
  activeTab,
  onTabChange,
  onSendFiles,
  onReceiveFiles,
  roomCode,
}: LandingHeroSectionProps) {
  return (
    <section className="pt-12 md:pt-20 lg:pt-28 pb-16 lg:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="lg:order-2 w-full max-w-lg mx-auto lg:mx-0 lg:ml-auto">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-[0.12] blur-2xl dark:opacity-[0.08]" />
            <div className="relative rounded-2xl border border-border bg-card/90 backdrop-blur-sm shadow-2xl shadow-indigo-500/[0.04] p-1">
              <div className="rounded-xl bg-card p-5 md:p-7">
                {!isConnected && (
                  <div className="mb-4 flex items-start justify-between gap-3 rounded-xl border border-border/60 bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
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
                        className="h-8 rounded-lg"
                        onClick={onRetrySignaling}
                      >
                        Retry
                      </Button>
                    ) : null}
                  </div>
                )}
                <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as 'send' | 'receive')} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 h-11 rounded-lg bg-muted p-1" aria-label="Transfer mode">
                    <TabsTrigger value="send" className="flex items-center gap-2 rounded-md text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm">
                      <Upload className="h-4 w-4" />
                      Send
                    </TabsTrigger>
                    <TabsTrigger value="receive" className="flex items-center gap-2 rounded-md text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm">
                      <Download className="h-4 w-4" />
                      Receive
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="send" className="mt-6">
                    <SendFilesPanel onSendFiles={onSendFiles} disabled={!isConnected} roomCode={roomCode} />
                  </TabsContent>
                  <TabsContent value="receive" className="mt-6">
                    <ReceiveFilesPanel onReceiveFiles={onReceiveFiles} disabled={!isConnected} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:order-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 dark:border-indigo-500/20 bg-indigo-50 dark:bg-indigo-500/10 px-3.5 py-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400">
            <Lock className="h-3 w-3" />
            End-to-end encrypted
          </div>
          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
            Drop. Share.{" "}
            <br className="hidden sm:block" />
            <span className="text-gradient">Done.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground leading-relaxed mx-auto lg:mx-0">
            Transfer files peer-to-peer with WebRTC. No cloud uploads, no accounts, no file size limits.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 justify-center lg:justify-start text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-indigo-500" /> DTLS encrypted</span>
            <span className="flex items-center gap-1.5"><Rocket className="h-4 w-4 text-purple-500" /> No size limits</span>
            <span className="flex items-center gap-1.5"><Globe className="h-4 w-4 text-pink-500" /> Any browser</span>
          </div>
        </div>
      </div>
    </section>
  );
}
