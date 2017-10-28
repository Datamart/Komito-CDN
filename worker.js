/**
 * @fileoverview Service worker for Komito Analytics website.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 * @see https://developers.google.com/web/fundamentals/primers/service-workers/
 * @see https://developers.google.com/web/fundamentals/app-install-banners/
 */

/** @const {string} */ var CACHE_NAME = 'komito-cache-v1';

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
  log_('worker:install');
  event.waitUntil(caches.open(CACHE_NAME).then(function(cache) {
    log_('worker:install:cache');
    return cache.addAll(CACHE_URLS);
  }));
});

self.addEventListener('fetch', function(event) {
  log_('worker:fetch');
  event.respondWith(caches.match(event.request).then(function(response) {
    log_('worker:fetch:match');
    return response || fetch(event.request.clone()).then(function(response) {
      if (response && 200 === response.status && 'basic' === response.type) {
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, clone);
        });
      }
      return response;
    });
  }));
});

self.addEventListener('activate', function(event) {
  log_('worker:activate');
  var whitelist = [CACHE_NAME];

  event.waitUntil(caches.keys().then(function(cacheNames) {
    return Promise.all(cacheNames.map(function(cacheName) {
      if (whitelist.indexOf(cacheName) === -1) {
        return caches.delete(cacheName);
      }
    }));
  }));
});

function log_(message) {
  (~location.search.indexOf('alert') ? alert : console.log)(message);
}
