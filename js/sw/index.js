let staticCacheName = 'restaurant-app-v1';

let urlsToCache = [
    '/',
    '/index.html',
    '/retaurant.html',
    '/css/styles.css',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/js/dbhelper.js',
    '/data/restaurant.json',
    '/img',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== staticCacheName) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request, {ignoreSearch: true}).then((response) => {
            return response || fetch(event.request);
        })
    );
});