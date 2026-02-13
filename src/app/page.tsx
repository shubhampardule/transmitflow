
import P2PFileTransfer from '../components/P2PFileTransfer';
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
      
      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
}
