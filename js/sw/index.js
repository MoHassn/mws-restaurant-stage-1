self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('restaurant-app-v1').then((cache) => {
            cache.addAll([
                '/',
                '/css/styles.css',
                '/js/main.js',
                '/js/restaurant_info.js',
                '/js/dbhelper.js',
                '/data/restaurant.json',
                '/img'
            ]);
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