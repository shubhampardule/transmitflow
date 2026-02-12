'use client';

import { useEffect, useState } from 'react';
import { Download, Wifi, WifiOff } from 'lucide-react';

interface DeferredInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

type NetworkBannerState = 'hidden' | 'offline' | 'online';

const INSTALL_CTA_AUTOHIDE_MS = 8000;
const INSTALL_CTA_DISMISS_TTL_MS = 24 * 60 * 60 * 1000; // 24h
const INSTALL_CTA_DISMISSED_UNTIL_KEY = 'transmitflow.installCtaDismissedUntil';

const isAppInstalled = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  const standalone = window.matchMedia?.('(display-mode: standalone)')?.matches;
  // iOS Safari uses navigator.standalone
  const iosStandalone = Boolean((navigator as unknown as { standalone?: boolean }).standalone);
  return Boolean(standalone || iosStandalone);
};

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
  const [installPromptEvent, setInstallPromptEvent] = useState<DeferredInstallPromptEvent | null>(null);
  const [showInstallCta, setShowInstallCta] = useState(false);
  const [installed, setInstalled] = useState(() => isAppInstalled());

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
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      if (installed || isAppInstalled()) {
        setInstalled(true);
        setInstallPromptEvent(null);
        setShowInstallCta(false);
        return;
      }

      const dismissedUntil = getDismissedUntil();
      const now = Date.now();

      setInstallPromptEvent(event as DeferredInstallPromptEvent);
      if (dismissedUntil > now) {
        setShowInstallCta(false);
        return;
      }

      setShowInstallCta(true);
      window.setTimeout(() => {
        // Auto-hide so the CTA doesn't stick on-screen.
        setShowInstallCta(false);
        setDismissedUntil(Date.now() + INSTALL_CTA_DISMISS_TTL_MS);
      }, INSTALL_CTA_AUTOHIDE_MS);
    };

    const handleAppInstalled = () => {
      setInstallPromptEvent(null);
      setShowInstallCta(false);
      setInstalled(true);
    };

    const displayModeQuery = window.matchMedia?.('(display-mode: standalone)');
    const handleDisplayModeChange = () => {
      const nextInstalled = isAppInstalled();
      setInstalled(nextInstalled);
      if (nextInstalled) {
        setInstallPromptEvent(null);
        setShowInstallCta(false);
      }
    };

    if (displayModeQuery?.addEventListener) {
      displayModeQuery.addEventListener('change', handleDisplayModeChange);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      if (displayModeQuery?.removeEventListener) {
        displayModeQuery.removeEventListener('change', handleDisplayModeChange);
      }
    };
  }, [installed]);

  const handleInstallClick = async () => {
    if (!installPromptEvent) {
      return;
    }

    await installPromptEvent.prompt();
    const choice = await installPromptEvent.userChoice;
    if (choice.outcome === 'accepted') {
      setInstallPromptEvent(null);
      setShowInstallCta(false);
      setDismissedUntil(Date.now() + INSTALL_CTA_DISMISS_TTL_MS);
    } else {
      setShowInstallCta(false);
      setDismissedUntil(Date.now() + INSTALL_CTA_DISMISS_TTL_MS);
    }
  };

  const showInstallButton = Boolean(installPromptEvent) && showInstallCta && !installed;

  return (
    <>
      {networkBanner === 'offline' && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-[70] rounded-full border border-amber-300/40 bg-amber-500/20 backdrop-blur px-4 py-2 text-amber-100 shadow-lg">
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium">
            <WifiOff className="h-4 w-4" />
            You are offline. Reconnect to continue transfer.
          </span>
        </div>
      )}

      {networkBanner === 'online' && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-[70] rounded-full border border-emerald-300/40 bg-emerald-500/20 backdrop-blur px-4 py-2 text-emerald-100 shadow-lg">
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium">
            <Wifi className="h-4 w-4" />
            Back online. Reconnecting...
          </span>
        </div>
      )}

      {showInstallButton && (
        <button
          type="button"
          onClick={() => void handleInstallClick()}
          className="fixed bottom-5 right-5 z-[70] inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 text-sm font-medium shadow-xl transition-colors"
        >
          <Download className="h-4 w-4" />
          Install App
        </button>
      )}
    </>
  );
}
