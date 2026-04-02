const CACHE = 'biblioteca-da-lua-v2';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './pascoa-da-lua/00_L.jpg', './pascoa-da-lua/00_R.jpg',
  './pascoa-da-lua/01_L.jpg', './pascoa-da-lua/01_R.jpg',
  './pascoa-da-lua/02_L.jpg', './pascoa-da-lua/02_R.jpg',
  './pascoa-da-lua/03_L.jpg', './pascoa-da-lua/03_R.jpg',
  './pascoa-da-lua/04_L.jpg', './pascoa-da-lua/04_R.jpg',
  './pascoa-da-lua/05_L.jpg', './pascoa-da-lua/05_R.jpg',
  './pascoa-da-lua/06_L.jpg', './pascoa-da-lua/06_R.jpg',
  './pascoa-da-lua/07_L.jpg', './pascoa-da-lua/07_R.jpg',
  './pascoa-da-lua/08_L.jpg', './pascoa-da-lua/08_R.jpg',
  './pascoa-da-lua/09_L.jpg', './pascoa-da-lua/09_R.jpg',
  './pascoa-da-lua/10_L.jpg', './pascoa-da-lua/10_R.jpg',
  './pascoa-da-lua/11_L.jpg', './pascoa-da-lua/11_R.jpg',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
