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

self.addEventListener('install', function(event) {
  log_('worker:install');
  event.waitUntil(caches.open(CACHE_NAME).then(function(cache) {
    log_('worker:install:cache');
    return cache.addAll(CACHE_URLS);
  }));
});

self.addEventListener('activate', function(event) {
  log_('worker:activate');
});

self.addEventListener('fetch', function(event) {
  log_('worker:fetch');
  event.respondWith(caches.match(event.request).then(function(response) {
    log_('worker:fetch:match');
    return response || fetch(event.request);
  }));
});

self.addEventListener('beforeinstallprompt', function(event) {
  log_('worker:beforeinstallprompt');
  event.userChoice.then(function(choice) {
    log_(choice.outcome);
    if ('dismissed' === choice.outcome) {
      log_('User canceled home screen install');
    } else {
      log_('User added to home screen');
    }
  });
});

function log_(message) {
  (~location.search.indexOf('alert') ? alert : console.log)(message);
}
