// Criando bug ao registrar o service worker, bugando todo o cache

// Define the cache name
const CACHE_NAME = "pwa-cache";

// Define the files to cache for the root directory
const ROOT_CACHE_FILES = [
  "../",
  "../index.html",
  "../service-worker.js",
  "../js/local-push.js",
  "../styles/index.css",
  "../images/favicon-512x512px.png",
];

// Install the service worker and cache the files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(ROOT_CACHE_FILES);
    })
  );
});
