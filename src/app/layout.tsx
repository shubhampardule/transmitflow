import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import PwaManager from '@/components/ui/PwaManager';
import ProductionLogGuard from '@/components/ui/ProductionLogGuard';
import ThemeProvider from '@/components/ui/ThemeProvider';
import "./globals.css";

const DEFAULT_SITE_URL = 'https://transmitflow.fun';
const SITE_NAME = 'TransmitFlow';
const SITE_DESCRIPTION = 'Private peer-to-peer file transfer with WebRTC. No account, no cloud upload step, direct device-to-device sharing.';

const metadataBase = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_APP_URL || DEFAULT_SITE_URL);
  } catch {
    return new URL(DEFAULT_SITE_URL);
  }
})();

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ["file sharing", "peer-to-peer", "P2P", "transmit", "flow", "data transfer", "WebRTC"],
  authors: [{ name: "TransmitFlow" }],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  manifest: "/manifest.webmanifest",
  applicationName: SITE_NAME,
  openGraph: {
    type: 'website',
    url: '/',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} preview image`,
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ['/twitter-image'],
    creator: '@ShubhamPardule',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon.svg?v=3", type: "image/svg+xml" },
      { url: "/favicon.svg?v=3", type: "image/svg+xml" },
    ],
    shortcut: [{ url: "/favicon.svg?v=3" }],
    apple: [{ url: "/pwa-192.svg?v=3", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0f3f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0e1a" },
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
        className="font-sans antialiased"
        suppressHydrationWarning={true}
      >
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`}
        </Script>
        <ThemeProvider>
          <ProductionLogGuard />
          <PwaManager />
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
