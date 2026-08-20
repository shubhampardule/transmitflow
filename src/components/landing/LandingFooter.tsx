'use client';

import { Download } from 'lucide-react';
import TransmitFlowLogo from '@/components/ui/TransmitFlowLogo';
import { usePwaInstall } from '@/hooks/usePwaInstall';

export default function LandingFooter() {
  const { canInstall, promptInstall } = usePwaInstall();

  return (
    <footer className="bg-background mt-8">
      <div className="airmail-stripe h-[3px] w-full opacity-80" />
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-8">
        <div className="flex flex-col items-center gap-5 md:flex-row md:items-center md:justify-between md:gap-4">
          <div className="flex items-center justify-center gap-2 text-center">
            <TransmitFlowLogo size={18} className="text-foreground shrink-0" />
            <span className="font-display text-sm font-semibold">TransmitFlow</span>
            <span className="hidden text-xs text-muted-foreground sm:inline">— direct device-to-device transfer</span>
          </div>
          <div className="grid w-full grid-cols-3 place-items-center gap-x-1 gap-y-2 font-mono sm:flex sm:w-auto sm:flex-wrap sm:justify-center sm:gap-1.5">
            {canInstall && (
              <button
                type="button"
                onClick={() => void promptInstall()}
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors duration-150 ease-out motion-reduce:transition-none hover:bg-muted hover:text-foreground sm:px-2.5"
                title="Install app"
              >
                <Download className="h-3.5 w-3.5 shrink-0" />
                install app
              </button>
            )}
            <a href="/privacy" className="inline-flex items-center rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors duration-150 ease-out motion-reduce:transition-none hover:bg-muted hover:text-foreground sm:px-2.5" title="Privacy & Security">
              privacy
            </a>
            <a href="/terms" className="inline-flex items-center rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors duration-150 ease-out motion-reduce:transition-none hover:bg-muted hover:text-foreground sm:px-2.5" title="Terms of Use">
              terms
            </a>
            <a href="/contact" className="inline-flex items-center rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors duration-150 ease-out motion-reduce:transition-none hover:bg-muted hover:text-foreground sm:px-2.5" title="Contact support">
              contact
            </a>
            <a href="https://github.com/shubhampardule/transmitflow" target="_blank" rel="noopener noreferrer" className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors duration-150 ease-out motion-reduce:transition-none hover:bg-muted hover:text-foreground" title="GitHub">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="https://x.com/ShubhamPardule" target="_blank" rel="noopener noreferrer" className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors duration-150 ease-out motion-reduce:transition-none hover:bg-muted hover:text-foreground" title="X (Twitter)">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </div>
        <p className="mt-6 text-center font-mono text-xs text-muted-foreground sm:hidden">— direct device-to-device transfer</p>
        <p className="mt-2 text-center font-mono text-xs text-muted-foreground sm:mt-6">built for the open web</p>
      </div>
    </footer>
  );
}
