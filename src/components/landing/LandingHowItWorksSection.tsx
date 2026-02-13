export default function LandingHowItWorksSection() {
  return (
    <section className="py-20 border-t border-border/40">
      <div className="text-center mb-14">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">How it works</span>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Three simple steps</h2>
      </div>
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 max-w-3xl mx-auto">
        <div className="hidden md:block pointer-events-none absolute top-8 left-[calc(16.666%+2rem)] right-[calc(16.666%+2rem)] h-px bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30" />
        {[
          { num: '01', title: 'Choose files', desc: 'Drop files or click to browse. Any file type, any size.' },
          { num: '02', title: 'Share the code', desc: 'Send the room code or QR to the receiver.' },
          { num: '03', title: 'Direct transfer', desc: 'Files flow peer-to-peer. Encrypted, fast, no cloud.' },
        ].map((step) => (
          <div key={step.num} className="relative text-center">
            <div className="relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-lg font-bold shadow-lg shadow-indigo-500/25 mb-5">
              {step.num}
            </div>
            <h3 className="font-semibold text-lg">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-[220px] mx-auto">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
