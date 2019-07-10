/**
 * @fileoverview Service worker for Komito Analytics website.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 * @see https://developers.google.com/web/fundamentals/primers/service-workers/
 */

/** @const {string} */ var CACHE_KEY = 'komito-cache-20190709-2130';
/** @const {string} */ var SCOPE_URL = 'https://komito.net/';
/** @const {string} */ var WORKER_JS = 'worker.js';

/** @const {Array.<string>} */ var CACHE_URLS = [
  '/assets/styles.css',
  '/assets/scripts/header.js',
  '/assets/scripts/cta-area.js',
  '/assets/scripts/sidebar.js',
  '/assets/scripts/footer.js'
];


self.addEventListener('install', function(event) {
  event.waitUntil(caches.open(CACHE_KEY).then(function(cache) {
    return cache.addAll(CACHE_URLS);
  }));
});


self.addEventListener('fetch', function(event) {
  // event.respondWith(fromNetwork(event.request, 400).catch(function() {
  //   return fromCache(event.request);
  // }));

  event.respondWith(fromCache(event.request));
  event.waitUntil(update(event.request));
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


/**
 * Time limited network request.
 * If the network fails or the response is not served before timeout,
 * the promise is rejected.
 */
function fromNetwork(request, timeout) {
  return new Promise(function(fulfill, reject) {
    var timeoutId = setTimeout(reject, timeout);
    fetch(request).then(function(response) {
      clearTimeout(timeoutId);
      fulfill(response);
    }, reject);
  });
}


/**
 * Open the cache where the assets were stored and search for the requested resource.
 */
function fromCache(request) {
  return caches.open(CACHE_KEY).then(function(cache) {
    return cache.match(request).then(function(matching) {
      return matching || Promise.reject('no-match');
    });
  });
}


/**
 * Update consists in opening the cache, performing a network request and
 * storing the new response data.
 */
function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}
