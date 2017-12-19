/**
 * @fileoverview Service worker for Komito Analytics website.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 * @see https://developers.google.com/web/fundamentals/primers/service-workers/
 */

/** @const {string} */ var CACHE_KEY = 'komito-cache-20171218-1715';
/** @const {string} */ var SCOPE_URL = 'https://komito.net/';

/** @const {Array.<string>} */ var CACHE_URLS = [
  // '/',
  // '/demo/',
  // '/integration/',
  // '/styles.css',
  // '/common.js',
  // '/dashboard/',
  // '/dashboard/dashboard.css',
  // '/dashboard/dashboard.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(caches.open(CACHE_KEY).then(function(cache) {
    return cache.addAll(CACHE_URLS);
  }));
});

self.addEventListener('fetch', function(event) {
  if ('GET' === event.request.method) {
    /** @type {string} */ var url = event.request.url;
    event.respondWith(caches.match(url).then(function(response) {
      return response || fetch(event.request.clone()).then(function(response) {
        if (SCOPE_URL === url.slice(0, 19)) {
          if (response && 200 === response.status && 'basic' == response.type) {
            var clone = response.clone();
            caches.open(CACHE_KEY).then(function(cache) {
              cache.put(url, clone);
            });
          }
        }
        return response;
      });
    }));
  }
});

self.addEventListener('activate', function(event) {
  var whitelist = [CACHE_KEY];

  event.waitUntil(caches.keys().then(function(cacheNames) {
    return Promise.all(cacheNames.map(function(cacheName) {
      if (whitelist.indexOf(cacheName) === -1) {
        return caches.delete(cacheName);
      }
    }));
  }));
});
