import { Coffee, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingSupportSection() {
  return (
    <section className="py-16">
      <div className="relative overflow-hidden rounded-lg border border-dashed border-border px-6 py-12 md:px-12 text-center">
        <div className="airmail-stripe absolute inset-x-0 top-0 h-[5px]" />
        <Coffee className="mx-auto h-6 w-6 text-muted-foreground" />
        <h3 className="mt-4 font-display text-2xl font-semibold">Enjoying TransmitFlow?</h3>
        <p className="mt-3 text-muted-foreground max-w-sm mx-auto">
          Help keep it free, open source, and ad-free for everyone.
        </p>
        <Button asChild size="lg" className="mt-6">
          <a
            href="https://buymeacoffee.com/shubhampardule"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Heart className="h-4 w-4" />
            Support the project
          </a>
        </Button>
      </div>
    </section>
  );
}
