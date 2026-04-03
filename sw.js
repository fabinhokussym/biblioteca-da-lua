// sw.js — v13
// Muda o número da versão aqui a cada deploy para forçar atualização
const CACHE_NAME = 'biblioteca-da-lua-v13';

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

// Instala e cacheia os assets
self.addEventListener('install', e => {
  // skipWaiting faz o novo SW assumir imediatamente
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).catch(() => {})
  );
});

// Ativa e LIMPA todos os caches antigos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Deletando cache antigo:', key);
            return caches.delete(key);
          })
      )
    ).then(() => {
      // Toma controle de todas as abas abertas imediatamente
      return self.clients.claim();
    })
  );
});

// Serve do cache, com fallback para rede
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).then(response => {
        // Cacheia novas respostas bem-sucedidas
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return response;
      });
    }).catch(() => caches.match('./index.html'))
  );
});
