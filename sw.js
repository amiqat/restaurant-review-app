let static_cache = 'restaurant-static-v1';

self.addEventListener('install', ev => {
    console.log('install');

    // installing assets to be cached
    ev.waitUntil(
        caches.open(static_cache)
        .then(cache =>{
            return cache.addAll(
                [
                '/',
                '/restaurant.html',
                '/css/styles.css',
                '/data/restaurants.json',
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
    console.log('activated');
    // update service worker
    ev.waitUntil(
        caches.keys().then( cacheNames => {
            return Promise.all(
                cacheNames.filter( cacheName => {
                    return cacheName.startsWith('restaurant-')
                    && cacheName != static_cache;
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            )
        })
    )
});

self.addEventListener('fetch', ev => {
    ev.respondWith(
        caches.match(ev.request).then( response => {
            return response || fetch(ev.request).then( resp => {
                return caches.open(static_cache).then(cache => {
                    cache.put(ev.request, resp.clone());
                    return resp;
                });
            });
        }).catch(function (error) {
            console.log(error);
        })
    );
});