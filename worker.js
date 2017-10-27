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
  '/',
  '/demo/',
  '/integration/',
  '/styles.css',
  '/common.js',
  '/dashboard/',
  '/dashboard/dashboard.css',
  '/dashboard/dashboard.js'
];

var SHOW_ALERT = ~location.search.indexOf('alert');

self.addEventListener('install', function(event) {
  (SHOW_ALERT ? alert : console.log)('worker:install');
  event.waitUntil(caches.open(CACHE_NAME).then(function(cache) {
    (SHOW_ALERT ? alert : console.log)('worker:install:cache');
    return cache.addAll(CACHE_URLS);
  }));
});

self.addEventListener('activate', function(event) {
  (SHOW_ALERT ? alert : console.log)('worker:activate');
});

self.addEventListener('fetch', function(event) {
  (SHOW_ALERT ? alert : console.log)('worker:fetch');
  event.respondWith(caches.match(event.request).then(function(response) {
  (SHOW_ALERT ? alert : console.log)('worker:fetch:match');
    return response || fetch(event.request);
  }));
});
