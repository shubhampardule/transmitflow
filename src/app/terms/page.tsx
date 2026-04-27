import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms and acceptable use policy for TransmitFlow.',
};

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 md:px-6 py-10 md:py-14">
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Terms of Use</h1>
        <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
          By using TransmitFlow, you agree to these terms. If you do not agree, please do not use the service.
        </p>
        <p className="mt-2 text-xs md:text-sm text-muted-foreground">Last updated: April 27, 2026</p>

        <section className="mt-7 space-y-2">
          <h2 className="text-lg font-semibold">Service scope</h2>
          <ul className="list-disc pl-5 text-sm md:text-base text-muted-foreground space-y-1.5">
            <li>TransmitFlow provides browser-based peer-to-peer signaling and transfer tooling.</li>
            <li>File transfer happens between participants’ devices; no account is required.</li>
            <li>Service availability and speed may vary by network conditions and browser support.</li>
          </ul>
        </section>

        <section className="mt-7 space-y-2">
          <h2 className="text-lg font-semibold">Acceptable use</h2>
          <ul className="list-disc pl-5 text-sm md:text-base text-muted-foreground space-y-1.5">
            <li>Do not use the service for illegal content, malware, abuse, or unauthorized access.</li>
            <li>Do not attempt to disrupt, overload, reverse engineer, or bypass service protections.</li>
            <li>You are responsible for the files you share and your compliance with local laws.</li>
          </ul>
        </section>

        <section className="mt-7 space-y-2">
          <h2 className="text-lg font-semibold">Privacy and security</h2>
          <ul className="list-disc pl-5 text-sm md:text-base text-muted-foreground space-y-1.5">
            <li>Please review the Privacy page for details on data handling and transfer limitations.</li>
            <li>While designed for secure transport, no internet service can guarantee absolute security.</li>
          </ul>
        </section>

        <section className="mt-7 space-y-2">
          <h2 className="text-lg font-semibold">Disclaimer and liability</h2>
          <ul className="list-disc pl-5 text-sm md:text-base text-muted-foreground space-y-1.5">
            <li>The service is provided “as is” without warranties of any kind.</li>
            <li>To the maximum extent permitted by law, TransmitFlow is not liable for indirect or consequential damages.</li>
          </ul>
        </section>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/" className="inline-flex rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted transition-colors">
            Back to TransmitFlow
          </Link>
          <Link href="/privacy" className="inline-flex rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted transition-colors">
            Privacy Policy
          </Link>
          <Link href="/contact" className="inline-flex rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </main>
  );
}
