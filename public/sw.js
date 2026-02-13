const SHELL_CACHE = 'transmitflow-shell-v3';
const RUNTIME_CACHE = 'transmitflow-runtime-v3';
const OFFLINE_URL = '/offline';
const SENSITIVE_NAVIGATION_QUERY_KEYS = new Set(['receive', 'sharing']);
const APP_SHELL = [
  '/',
  OFFLINE_URL,
  '/manifest.webmanifest',
  '/favicon.svg?v=2',
  '/icon.svg?v=2',
  '/pwa-192.svg?v=2',
  '/pwa-512.svg?v=2',
];

function hasSensitiveNavigationQuery(url) {
  for (const key of url.searchParams.keys()) {
    if (SENSITIVE_NAVIGATION_QUERY_KEYS.has(key.toLowerCase())) {
      return true;
    }
  }

  return false;
}

function getNormalizedNavigationCacheKey(url) {
  return `${url.origin}${url.pathname}`;
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      await Promise.allSettled(APP_SHELL.map((url) => cache.add(url)));
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key !== SHELL_CACHE && key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key)),
      );

      if (self.registration.navigationPreload) {
        await self.registration.navigationPreload.enable();
      }

      await self.clients.claim();
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);
  if (url.pathname.startsWith('/socket.io')) {
    return;
  }

  if (request.mode === 'navigate') {
    const shouldCacheNavigation =
      url.origin === self.location.origin && !hasSensitiveNavigationQuery(url);
    const navigationCacheKey = getNormalizedNavigationCacheKey(url);

    event.respondWith(
      (async () => {
        try {
          const preload = await event.preloadResponse;
          if (preload) {
            return preload;
          }

          const networkResponse = await fetch(request);
          if (shouldCacheNavigation && networkResponse.ok) {
            const runtimeCache = await caches.open(RUNTIME_CACHE);
            runtimeCache.put(navigationCacheKey, networkResponse.clone());
          }
          return networkResponse;
        } catch (error) {
          if (shouldCacheNavigation) {
            const cachedPage = await caches.match(navigationCacheKey);
            if (cachedPage) {
              return cachedPage;
            }
          }

          const cachedRoot = await caches.match('/');
          if (cachedRoot) {
            return cachedRoot;
          }

          const offlineResponse = await caches.match(OFFLINE_URL);
          if (offlineResponse) {
            return offlineResponse;
          }

          return new Response('Offline', {
            status: 503,
            statusText: 'Offline',
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
          });
        }
      })(),
    );
    return;
  }

  if (url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    (async () => {
      const cached = await caches.match(request);
      if (cached) {
        return cached;
      }

      try {
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.ok) {
          const runtimeCache = await caches.open(RUNTIME_CACHE);
          runtimeCache.put(request, networkResponse.clone());
        }
        return networkResponse;
      } catch (error) {
        return new Response('Offline', {
          status: 503,
          statusText: 'Offline',
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
      }
    })(),
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
