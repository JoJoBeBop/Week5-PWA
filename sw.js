var cacheName = 'hello-pwa';
var filesToCache = [
  './',
  './index.html',
  './css/style.css',
  './js/main.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    try {
      const cache = await caches.open(cacheName);
      // console.log(cache);
      return cache.addAll(filesToCache);
    }
    catch (e) {
      console.log('after install', e.message);
    }
  })());
});

/* Serve cached content when offline */
self.addEventListener('fetch', (e) => {
  // console.log(e.request);
  e.respondWith((async () => {
    try {
      const response = await caches.match(e.request);
      // console.log('resp', response);
      return response || fetch(e.request);
    }
    catch (e) {
      console.log('load cache', e.message);
    }
  })());
});


