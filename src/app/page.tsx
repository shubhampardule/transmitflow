
import P2PFileTransfer from '@/components/P2PFileTransfer';
import FloatingScrollButton from '@/components/FloatingScrollButton';
import { Toaster } from 'sonner';
import DelayedLoader from '@/components/ui/DelayedLoader';
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white">
      {/* Content */}
      <div className="relative">
          <DelayedLoader minimumLoadTime={1500}>
            <P2PFileTransfer />
          </DelayedLoader>
        <Toaster position="top-right" richColors />
      </div>
      
      {/* Floating Scroll Button - Outside all other UI elements */}
      <FloatingScrollButton />
      
      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
}
