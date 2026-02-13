import { Coffee, Heart } from 'lucide-react';

export default function LandingSupportSection() {
  return (
    <section className="py-16">
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.06] via-purple-500/[0.04] to-pink-500/[0.06]" />
        <div className="relative px-6 py-12 md:px-12 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-500/15 mb-5">
            <Coffee className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-2xl font-bold">Enjoying TransmitFlow?</h3>
          <p className="mt-3 text-muted-foreground max-w-sm mx-auto">Help keep it free, open-source, and ad-free for everyone.</p>
          <a
            href="https://buymeacoffee.com/shubhampardule"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/35 hover:brightness-110"
          >
            <Heart className="h-4 w-4" />
            Support the Project
          </a>
        </div>
      </div>
    </section>
  );
}
