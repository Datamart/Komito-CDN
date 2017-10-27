/**
 * @fileoverview Service worker for Komito Analytics website.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 * @see https://developers.google.com/web/fundamentals/primers/service-workers/
 */

/** @const {string} */ var CACHE_NAME = 'komito-cache-v1';

/** @const {Array.<string>} */ var CACHE_URLS = [
  '/',
  '/demo/',
  '/integration/',
  '/styles.css',
  '/common.js',
  '/dashboard/',
  '/dashboard/dashboard.css',
  '/dashboard/dashboard.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(caches.open(CACHE_NAME).then(function(cache) {
    console.log('Opened cache');
    return cache.addAll(CACHE_URLS);
  }));
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    return response || fetch(event.request);
  }));
});
