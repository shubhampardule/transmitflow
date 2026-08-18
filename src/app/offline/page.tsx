import Link from 'next/link';
import { WifiOff, RefreshCw } from 'lucide-react';

export const dynamic = 'force-static';

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <section className="w-full max-w-md rounded-md border border-border bg-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-amber-500/50 text-amber-500">
            <WifiOff className="h-5 w-5" />
          </span>
          <h1 className="text-xl font-semibold">You are offline</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          TransmitFlow loaded from your local app shell. Reconnect to the internet to resume live signaling and transfers.
        </p>
        <div className="flex">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-4 py-2 text-sm font-mono font-medium"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </Link>
        </div>
      </section>
    </main>
  );
}
