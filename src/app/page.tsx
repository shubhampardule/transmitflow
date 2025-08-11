
import P2PFileTransfer from '@/components/P2PFileTransfer';
import FloatingScrollButton from '@/components/FloatingScrollButton';
import { Toaster } from 'sonner';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#f8fafc] relative">
      {/* Bottom Fade Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: "20px 30px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <Suspense fallback={<div>Loading...</div>}>
          <P2PFileTransfer />
        </Suspense>
        <Toaster position="top-right" richColors />
      </div>
      
      {/* Floating Scroll Button - Outside all other UI elements */}
      <FloatingScrollButton />
    </div>
  );
}
