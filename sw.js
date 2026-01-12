const CACHE = "anti-qr-v1";

const FILES = [
  "/Anti-QR/",
  "/Anti-QR/index.html",
  "/Anti-QR/css/style.css",
  "/Anti-QR/js/app.js",
  "/Anti-QR/js/scanner.js",
  "/Anti-QR/js/analyzer.js",
  "/Anti-QR/js/history.js",
  "/Anti-QR/manifest.json"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
