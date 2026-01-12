const CACHE_NAME = "qr-safe-check-v2";

const FILES_TO_CACHE = [
  "/qr-safe-check/",
  "/qr-safe-check/index.html",
  "/qr-safe-check/css/style.css",
  "/qr-safe-check/js/app.js",
  "/qr-safe-check/js/analyzer.js",
  "/qr-safe-check/js/history.js",
  "/qr-safe-check/js/scanner.js",
  "/qr-safe-check/manifest.json"
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
