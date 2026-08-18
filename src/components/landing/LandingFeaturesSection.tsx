const SPECS: Array<{ tag: string; title: string; description: string }> = [
  {
    tag: 'P2P',
    title: 'True peer-to-peer',
    description:
      'Files travel directly between devices over a WebRTC data channel. No relay server ever touches your data — as direct as handing over a USB drive, but over the internet.',
  },
  {
    tag: 'PRV',
    title: 'Nothing stored',
    description: 'Your files never touch a server, so there is nothing for anyone to see, store, or track.',
  },
  {
    tag: 'ENC',
    title: 'Encrypted in transit',
    description: 'DTLS/SRTP secures the data channel, and each room is an isolated session with a one-time code.',
  },
  {
    tag: 'LIM',
    title: 'Up to 20 GB per transfer',
    description: 'Adaptive chunking streams files at a size that fits the connection, up to 20 GB total per session (10 GB per file, 100 files max).',
  },
  {
    tag: 'ENV',
    title: 'Works anywhere',
    description: 'Any modern browser, on any device. Nothing to install, nothing to configure.',
  },
  {
    tag: 'OSS',
    title: 'Open source',
    description: 'The full codebase is public — audit it, fork it, or run your own signaling server.',
  },
];

const ROTATIONS = ['-rotate-1', 'rotate-1', '-rotate-[2deg]', 'rotate-[2deg]', '-rotate-1', 'rotate-1'];

export default function LandingFeaturesSection() {
  return (
    <section className="py-20 border-t border-border">
      <div className="mb-12">
        <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">MANIFEST</span>
        <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-tight">
          What TransmitFlow does
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {SPECS.map((spec, i) => (
          <div key={spec.tag} className="relative rounded-lg border border-border bg-card p-6 md:p-7">
            <span
              className={`postmark absolute -top-3 -left-3 h-11 w-11 border-primary text-primary bg-background font-mono text-[10px] font-semibold tracking-widest ${ROTATIONS[i % ROTATIONS.length]}`}
            >
              {spec.tag}
            </span>
            <h3 className="font-display text-lg font-semibold">{spec.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{spec.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
