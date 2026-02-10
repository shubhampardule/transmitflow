'use client';

import { useEffect } from 'react';

type ConsoleMethod = 'log' | 'info' | 'debug' | 'warn' | 'error';

const CONSOLE_METHODS: ConsoleMethod[] = ['log', 'info', 'debug', 'warn', 'error'];

export default function ProductionLogGuard() {
  useEffect(() => {
    // Keep full logging in development. In production, suppress browser console
    // output by default to avoid leaking transfer context in client logs.
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    if (process.env.NEXT_PUBLIC_ENABLE_CLIENT_LOGS === 'true') {
      return;
    }

    const originalConsole = {
      log: console.log,
      info: console.info,
      debug: console.debug,
      warn: console.warn,
      error: console.error,
    };

    const noop = () => undefined;
    for (const method of CONSOLE_METHODS) {
      console[method] = noop;
    }

    return () => {
      for (const method of CONSOLE_METHODS) {
        console[method] = originalConsole[method];
      }
    };
  }, []);

  return null;
}

