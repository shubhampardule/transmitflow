import { Shield, Globe, Lock, ArrowLeftRight, Rocket, Users } from 'lucide-react';

export default function LandingFeaturesSection() {
  return (
    <section className="py-20 border-t border-border/40">
      <div className="text-center mb-14">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Features</span>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
          Why <span className="text-gradient">TransmitFlow</span>?
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]">
        <div className="md:col-span-2 lg:col-span-2 lg:row-span-2 rounded-2xl border border-border bg-card p-8 flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/[0.04]">
          <div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-500/15">
              <ArrowLeftRight className="h-6 w-6 text-indigo-500" />
            </div>
            <h3 className="mt-5 text-2xl font-bold">True Peer-to-Peer</h3>
            <p className="mt-3 text-muted-foreground text-lg leading-relaxed max-w-lg">
              Files travel directly between devices using WebRTC data channels. No cloud relay, no servers touching your data — as direct as handing someone a USB drive, but over the internet.
            </p>
          </div>
          <p className="mt-6 text-xs text-muted-foreground/60 font-medium uppercase tracking-wider">Powered by WebRTC Data Channels</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 flex flex-col transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/[0.04]">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-500/15">
            <Lock className="h-5 w-5 text-violet-500" />
          </div>
          <h3 className="mt-4 font-semibold text-lg">Total Privacy</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Your files never touch a server. We can&apos;t see, store, or track them.</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 flex flex-col transition-all duration-200 hover:shadow-lg hover:shadow-rose-500/[0.04]">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-500/15">
            <Shield className="h-5 w-5 text-rose-500" />
          </div>
          <h3 className="mt-4 font-semibold text-lg">Encrypted</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">DTLS-secured connections with isolated room sessions.</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 flex flex-col transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/[0.04]">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-500/15">
            <Rocket className="h-5 w-5 text-amber-500" />
          </div>
          <h3 className="mt-4 font-semibold text-lg">No Limits</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Adaptive chunking for maximum throughput. Any file, any size.</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 flex flex-col transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/[0.04]">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-500/15">
            <Globe className="h-5 w-5 text-emerald-500" />
          </div>
          <h3 className="mt-4 font-semibold text-lg">Works Everywhere</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Modern browser on any device. Zero installs needed.</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 flex flex-col transition-all duration-200 hover:shadow-lg hover:shadow-sky-500/[0.04]">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 dark:bg-sky-500/15">
            <Users className="h-5 w-5 text-sky-500" />
          </div>
          <h3 className="mt-4 font-semibold text-lg">Open Source</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Fully transparent codebase. Audit, contribute, or fork anytime.</p>
        </div>
      </div>
    </section>
  );
}
