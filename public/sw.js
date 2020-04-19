var cacheName = 'hello-pwa';
var filesToCache = [
  "./",
  "./index.html",
  "./css/style.css",
  "./img/icon.png",
  "./img/logo.svg",
  "./img/splash.png",
  "./js/example.js",
  "./js/main.js",

];

/* Start the service worker and cache all of the app's content */
self.addEventListener("install", (e) => {
  e.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(cacheName);
        return cache.addAll(filesToCache);
      } catch (e) {
        console.log("install ", e.message);
      }
    })()
  );
});

/* Serve cached content when offline */
self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      try {
        const response = await caches.match(e.request);
        return response || fetch(e.request);
      } catch (e) {
        console.log("fetch ", e.message);
      }
    })()
  );
});


