/**
 * @fileoverview Service worker for Komito Analytics website.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 * @see https://developers.google.com/web/fundamentals/primers/service-workers/
 */

/** @const {string} */ var CACHE_KEY = 'komito-cache-20191012-2200';

/** @const {!Array.<string>} */ var CACHE_URLS = [
  // Assets:
  '/assets/styles.css',
  '/assets/scripts/header.js',
  '/assets/scripts/cta-area.js',
  '/assets/scripts/sidebar.js',
  '/assets/scripts/footer.js',

  // Pages:
  '/',
  '/integration/',
  '/integration/google-tag-manager/',
  'integration/wordpress/',
  '/posts/track-scroll-depth/',
  '/support/',
  '/404.html',

  // Images
  '/images/komito-hero-background.jpg',
  '/images/software/particles-logo-h50.png',
  '/integration/google-tag-manager/google-tag-manager.jpg',
  '/integration/google-tag-manager/google-tag-manager-thumbnail.jpg',
  '/integration/wordpress/komito-analytics-wordpress-plugin.jpg',
  '/integration/wordpress/komito-analytics-wordpress-plugin-thumbnail.jpg',
  '/posts/track-scroll-depth/track-scroll-depth.jpg',
  '/posts/track-scroll-depth/track-scroll-depth-thumbnail.jpg'
];


self.addEventListener('install', function(event) {
  event.waitUntil(caches.open(CACHE_KEY).then(function(cache) {
    return cache.addAll(CACHE_URLS);
  }));
});


self.addEventListener('activate', function(event) {
  event.waitUntil(caches.keys().then(function(cacheNames) {
    return Promise.all(cacheNames.map(function(cacheName) {
      if (cacheName !== CACHE_KEY) {
        return caches.delete(cacheName);
      }
    }));
  }));
});


self.addEventListener('fetch', function(event) {
  // event.respondWith(fromNetwork(event.request, 400).catch(function() {
  //   return fromCache(event.request);
  // }));

  // event.respondWith(fromCache(event.request));
  // event.waitUntil(update(event.request));

  if (0 === event.request.url.indexOf('https://komito.net/')) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetchAndCache(event.request);
      })
    );
  } else {
    event.respondWith(fetch(event.request));
  }
});


function fetchAndCache(request) {
  return fetch(request).then(function(response) {
    // Check if we received a valid response.
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return caches.open(CACHE_KEY).then(function(cache) {
      cache.put(request, response.clone());
      return response;
    });
  }).catch(function(error) {
    console.log('Request failed:', error);
    return fromCache('/404.html');
  });
}


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
  return caches.open(CACHE_KEY).then(function(cache) {
    return fetch(request).then(function(response) {
      return cache.put(request, response.clone());
    });
  });
}
