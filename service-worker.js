const CACHE_NAME = 'mutu-v1';

const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/audio/laugh.mp3',
  '/audio/beep.mp3',
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-512.png'
];

// ── INSTALL: cache all assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// ── ACTIVATE: clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ── FETCH: serve from cache, fallback to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
