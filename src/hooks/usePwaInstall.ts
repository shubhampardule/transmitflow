'use client';

import { useEffect, useState, useCallback } from 'react';

export interface DeferredInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const isAppInstalled = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  const standalone = window.matchMedia?.('(display-mode: standalone)')?.matches;
  // iOS Safari uses navigator.standalone
  const iosStandalone = Boolean((navigator as unknown as { standalone?: boolean }).standalone);
  return Boolean(standalone || iosStandalone);
};

// Module-level state so every component using this hook shares the same
// deferred prompt event instead of racing to capture `beforeinstallprompt`.
let sharedPromptEvent: DeferredInstallPromptEvent | null = null;
const listeners = new Set<(event: DeferredInstallPromptEvent | null) => void>();

const setSharedPromptEvent = (event: DeferredInstallPromptEvent | null) => {
  sharedPromptEvent = event;
  listeners.forEach((listener) => listener(event));
};

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    setSharedPromptEvent(event as DeferredInstallPromptEvent);
  });

  window.addEventListener('appinstalled', () => {
    setSharedPromptEvent(null);
  });
}

/**
 * Tracks whether the app can be installed as a PWA and whether it's already
 * installed, and exposes a function to trigger the native install prompt.
 */
export function usePwaInstall() {
  const [installed, setInstalled] = useState(() => isAppInstalled());
  const [promptEvent, setPromptEvent] = useState<DeferredInstallPromptEvent | null>(
    () => sharedPromptEvent
  );

  useEffect(() => {
    const listener = (event: DeferredInstallPromptEvent | null) => {
      setPromptEvent(event);
      if (event) {
        setInstalled(false);
      }
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  useEffect(() => {
    const displayModeQuery = window.matchMedia?.('(display-mode: standalone)');

    const handleDisplayModeChange = () => {
      const nextInstalled = isAppInstalled();
      setInstalled(nextInstalled);
      if (nextInstalled) {
        setSharedPromptEvent(null);
      }
    };

    const handleAppInstalled = () => {
      setInstalled(true);
    };

    if (displayModeQuery?.addEventListener) {
      displayModeQuery.addEventListener('change', handleDisplayModeChange);
    }
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      if (displayModeQuery?.removeEventListener) {
        displayModeQuery.removeEventListener('change', handleDisplayModeChange);
      }
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const promptInstall = useCallback(async (): Promise<'accepted' | 'dismissed' | 'unavailable'> => {
    if (!promptEvent) {
      return 'unavailable';
    }

    await promptEvent.prompt();
    const choice = await promptEvent.userChoice;
    setSharedPromptEvent(null);
    if (choice.outcome === 'accepted') {
      setInstalled(true);
    }
    return choice.outcome;
  }, [promptEvent]);

  return {
    // True once the browser tells us the app is installable and it isn't
    // already installed.
    canInstall: Boolean(promptEvent) && !installed,
    installed,
    promptInstall,
  };
}
