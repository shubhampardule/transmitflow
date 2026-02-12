
import P2PFileTransfer from '@/components/P2PFileTransfer';
import FloatingScrollButton from '@/components/FloatingScrollButton';
import { Toaster } from 'sonner';
import { Analytics } from "@vercel/analytics/next";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background">
      {/* Content */}
      <div className="relative">
        <P2PFileTransfer />
        <Toaster position="top-right" richColors />
      </div>
      
      {/* Floating Scroll Button - Outside all other UI elements */}
      <FloatingScrollButton />
      
      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
}
