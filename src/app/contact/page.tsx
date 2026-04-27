import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Support and contact information for TransmitFlow.',
};

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 md:px-6 py-10 md:py-14">
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Contact</h1>
        <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
          Need help, want to report a bug, or share feedback? Reach out using the channels below.
        </p>

        <section className="mt-7 space-y-3">
          <div>
            <h2 className="text-lg font-semibold">Email support</h2>
            <a
              href="mailto:shubhampardule@gmail.com"
              className="mt-1 inline-flex text-sm md:text-base text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              shubhampardule@gmail.com
            </a>
          </div>

          <div>
            <h2 className="text-lg font-semibold">GitHub issues</h2>
            <a
              href="https://github.com/shubhampardule/transmitflow/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex text-sm md:text-base text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Submit an issue
            </a>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Security reports</h2>
            <p className="text-sm md:text-base text-muted-foreground">
              For sensitive security issues, please use the guidance in our Security Policy.
            </p>
            <a
              href="https://github.com/shubhampardule/transmitflow/blob/main/SECURITY.md"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex text-sm md:text-base text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              View Security Policy
            </a>
          </div>
        </section>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/" className="inline-flex rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted transition-colors">
            Back to TransmitFlow
          </Link>
          <Link href="/privacy" className="inline-flex rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="inline-flex rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </main>
  );
}
