import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy & Security | TransmitFlow',
  description: 'How TransmitFlow handles your data, file transfer security, and privacy model.',
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 md:px-6 py-10 md:py-14">
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Privacy & Security</h1>
        <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
          TransmitFlow is designed for direct device-to-device transfer. This page explains what data is and is not handled by the service.
        </p>

        <section className="mt-7 space-y-2">
          <h2 className="text-lg font-semibold">What we do</h2>
          <ul className="list-disc pl-5 text-sm md:text-base text-muted-foreground space-y-1.5">
            <li>Use WebRTC data channels for direct peer-to-peer file transfer.</li>
            <li>Use a signaling server only to connect peers and exchange session metadata.</li>
            <li>Use encrypted peer connections (DTLS/SRTP in WebRTC transport stack).</li>
            <li>Use short-lived room sessions designed for temporary sharing.</li>
          </ul>
        </section>

        <section className="mt-7 space-y-2">
          <h2 className="text-lg font-semibold">What we do not do</h2>
          <ul className="list-disc pl-5 text-sm md:text-base text-muted-foreground space-y-1.5">
            <li>We do not permanently store your transferred files on our server.</li>
            <li>We do not require account creation to send or receive files.</li>
            <li>We do not use your file content for analytics or advertising.</li>
          </ul>
        </section>

        <section className="mt-7 space-y-2">
          <h2 className="text-lg font-semibold">Important limitations</h2>
          <ul className="list-disc pl-5 text-sm md:text-base text-muted-foreground space-y-1.5">
            <li>If a direct peer path cannot be established, relay infrastructure may be used by WebRTC networking.</li>
            <li>Client/browser behavior (extensions, device security, OS logs) can affect local privacy outside app control.</li>
            <li>You should still share room codes/links only with trusted recipients.</li>
          </ul>
        </section>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/" className="inline-flex rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted transition-colors">
            Back to TransmitFlow
          </Link>
          <Link href="https://github.com/shubhampardule/transmitflow/blob/main/SECURITY.md" target="_blank" rel="noopener noreferrer" className="inline-flex rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted transition-colors">
            Security Policy
          </Link>
        </div>
      </div>
    </main>
  );
}
