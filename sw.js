let static_cache = 'restaurant-static-v1';

self.addEventListener('install', ev => {
    // installing assets to be cached
    ev.waitUntil(
        caches.open(static_cache)
        .then(cache =>{
            return cache.addAll(
                [
                '/',
                '/restaurant.html',
                '/data/restaurant.json',
                '/img/1.jpg',
                '/img/2.jpg',
                '/img/3.jpg',
                '/img/4.jpg',
                '/img/5.jpg',
                '/img/6.jpg',
                '/img/7.jpg',
                '/img/8.jpg',
                '/img/9.jpg',
                '/img/10.jpg',
                '/js/dbhelper.js',
                '/js/main.js',
                '/js/restaurant_info.js',
                ]
            );
        })
    );
});

self.addEventListener('activate', ev => {
    // update service worker
    ev.waitUntil(
        caches.keys().then( cacheNames => {
            return Promise.all(
                cacheNames.filter( cacheName => {
                    return cacheName.startsWith('restaurant-')
                    && cacheName != static_cache;
                }).map(cacheName => {
                    return cache.delete(cacheName);
                })
            )
        })
    )
});

self.addEventListener('fetch', ev => {
    ev.respondWith(
        caches.match(event.request).then( response => {
            return response || fetch(event.request).then( res => {
                return caches.open(cacheName).then(cache => {
                    cache.put(event.request, res.clone());
                    return res;
                });
            });
        }).catch(function (error) {
            console.log(error);
        })
    );
});