import Link from 'next/link';
import { WifiOff, RefreshCw } from 'lucide-react';

export const dynamic = 'force-static';

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-slate-100 flex items-center justify-center p-6">
      <section className="w-full max-w-md rounded-2xl border border-slate-700/70 bg-slate-900/80 backdrop-blur p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300">
            <WifiOff className="h-5 w-5" />
          </span>
          <h1 className="text-xl font-semibold">You are offline</h1>
        </div>
        <p className="text-sm text-slate-300 mb-6">
          TransmitFlow loaded from your local app shell. Reconnect to the internet to resume live signaling and transfers.
        </p>
        <div className="flex">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors px-4 py-2 text-sm font-medium"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </Link>
        </div>
      </section>
    </main>
  );
}
