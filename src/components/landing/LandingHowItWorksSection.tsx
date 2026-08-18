const STEPS: Array<{ num: string; title: string; desc: string }> = [
  { num: '01', title: 'Choose files', desc: 'Drop files or click to browse. Any file type, up to 20 GB per transfer.' },
  { num: '02', title: 'Share the code', desc: 'Send the room code or QR to the receiver.' },
  { num: '03', title: 'Direct transfer', desc: 'Files flow peer-to-peer. Encrypted, fast, no cloud.' },
];

export default function LandingHowItWorksSection() {
  return (
    <section className="py-20 border-t border-border">
      <div className="mb-12">
        <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">ROUTE</span>
        <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-tight">Three stops, in order</h2>
      </div>
      <div className="max-w-2xl">
        {STEPS.map((step, i) => (
          <div key={step.num} className="flex gap-5">
            <div className="flex flex-col items-center">
              <div className="postmark h-10 w-10 shrink-0 border-foreground font-mono text-sm font-semibold">
                {step.num}
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className="w-px flex-1 my-1"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(to bottom, hsl(var(--border)) 0, hsl(var(--border)) 4px, transparent 4px, transparent 9px)',
                  }}
                />
              )}
            </div>
            <div className={i < STEPS.length - 1 ? 'pb-10' : ''}>
              <h3 className="pt-2 font-display font-semibold text-lg">{step.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed max-w-sm">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
