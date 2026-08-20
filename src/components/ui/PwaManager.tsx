'use client';

import { useEffect, useState } from 'react';
import { Download, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePwaInstall } from '@/hooks/usePwaInstall';

type NetworkBannerState = 'hidden' | 'offline' | 'online';

const INSTALL_CTA_AUTOHIDE_MS = 8000;
const INSTALL_CTA_DISMISS_TTL_MS = 24 * 60 * 60 * 1000; // 24h
const INSTALL_CTA_DISMISSED_UNTIL_KEY = 'transmitflow.installCtaDismissedUntil';

const getDismissedUntil = (): number => {
  if (typeof window === 'undefined') {
    return 0;
  }
  const raw = window.localStorage.getItem(INSTALL_CTA_DISMISSED_UNTIL_KEY);
  const parsed = raw ? Number(raw) : 0;
  return Number.isFinite(parsed) ? parsed : 0;
};

const setDismissedUntil = (timestamp: number) => {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(INSTALL_CTA_DISMISSED_UNTIL_KEY, String(timestamp));
};

export default function PwaManager() {
  const [networkBanner, setNetworkBanner] = useState<NetworkBannerState>('hidden');
  const [showInstallCta, setShowInstallCta] = useState(false);
  const { canInstall, promptInstall } = usePwaInstall();

  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }

        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              newWorker.postMessage({ type: 'SKIP_WAITING' });
            }
          });
        });
      } catch (error) {
        console.warn('Service worker registration failed:', error);
      }
    };

    void registerServiceWorker();
  }, []);

  useEffect(() => {
    let onlineBannerTimer: ReturnType<typeof setTimeout> | null = null;

    const showOnlineBanner = () => {
      if (onlineBannerTimer) {
        clearTimeout(onlineBannerTimer);
      }
      setNetworkBanner('online');
      onlineBannerTimer = setTimeout(() => {
        setNetworkBanner('hidden');
      }, 2500);
    };

    const handleOffline = () => {
      if (onlineBannerTimer) {
        clearTimeout(onlineBannerTimer);
        onlineBannerTimer = null;
      }
      setNetworkBanner('offline');
    };

    const handleOnline = () => {
      showOnlineBanner();
    };

    if (!navigator.onLine) {
      setNetworkBanner('offline');
    }

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      if (onlineBannerTimer) {
        clearTimeout(onlineBannerTimer);
      }
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  useEffect(() => {
    if (!canInstall) {
      setShowInstallCta(false);
      return;
    }

    const dismissedUntil = getDismissedUntil();
    const now = Date.now();

    if (dismissedUntil > now) {
      setShowInstallCta(false);
      return;
    }

    setShowInstallCta(true);
    const timer = window.setTimeout(() => {
      // Auto-hide so the CTA doesn't stick on-screen.
      setShowInstallCta(false);
      setDismissedUntil(Date.now() + INSTALL_CTA_DISMISS_TTL_MS);
    }, INSTALL_CTA_AUTOHIDE_MS);

    return () => window.clearTimeout(timer);
  }, [canInstall]);

  const handleInstallClick = async () => {
    const outcome = await promptInstall();
    if (outcome !== 'unavailable') {
      setShowInstallCta(false);
      setDismissedUntil(Date.now() + INSTALL_CTA_DISMISS_TTL_MS);
    }
  };

  const showInstallButton = canInstall && showInstallCta;

  return (
    <>
      {networkBanner === 'offline' && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-[70] rounded-md border border-amber-500/60 bg-card px-4 py-2 text-foreground shadow-none">
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium">
            <WifiOff className="h-4 w-4 text-amber-500" />
            You are offline. Reconnect to continue transfer.
          </span>
        </div>
      )}

      {networkBanner === 'online' && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-[70] rounded-md border border-emerald-500/60 bg-card px-4 py-2 text-foreground shadow-none">
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium">
            <Wifi className="h-4 w-4 text-emerald-500" />
            Back online. Reconnecting...
          </span>
        </div>
      )}

      {showInstallButton && (
        <Button
          type="button"
          onClick={() => void handleInstallClick()}
          className="fixed bottom-5 right-5 z-[70]"
        >
          <Download className="h-4 w-4" />
          Install App
        </Button>
      )}
    </>
  );
}
