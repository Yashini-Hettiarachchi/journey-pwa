const CACHE_NAME = 'journey-of-pride-v1';
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/tribute.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    '/images/cake.png',
    '/images/tulip.png',
    '/images/happy-birthday-greeting-card.png',
    '/images/favicon.ico',
    '/images/icon-192.png',
    '/images/icon-512.png',
    '/assets/chime.mp3'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});