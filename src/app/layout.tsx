import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import PwaManager from '@/components/ui/PwaManager';
import ProductionLogGuard from '@/components/ui/ProductionLogGuard';
import ThemeProvider from '@/components/ui/ThemeProvider';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TransmitFlow",
  description: "Share files directly between devices - Peer-to-peer file sharing made simple",
  keywords: ["file sharing", "peer-to-peer", "P2P", "transmit", "flow", "data transfer", "WebRTC"],
  authors: [{ name: "TransmitFlow" }],
  robots: "index, follow",
  manifest: "/manifest.webmanifest",
  applicationName: "TransmitFlow",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TransmitFlow",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: [{ url: "/icon.svg" }],
    apple: [{ url: "/pwa-192.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider>
          <ProductionLogGuard />
          <PwaManager />
          {children}
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
