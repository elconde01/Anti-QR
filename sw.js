const CACHE_NAME = "qr-safe-check-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/app.js",
  "./js/analyzer.js",
  "./js/history.js",
  "./js/scanner.js",
  "./manifest.json",
  "https://unpkg.com/html5-qrcode"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});
