/**
 * @fileoverview Service worker for Komito Analytics website.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 * @see https://developers.google.com/web/fundamentals/primers/service-workers/
 */

/** @const {string} */ var CACHE_KEY = 'komito-cache-20200920-2030';

/** @const {!Array.<string>} */ var CACHE_URLS = [
  // Assets:
  '/assets/images/software/particles-logo-h50.png',
  '/assets/images/software/particles-logo-h50.webp',
  '/assets/images/komito-hero-background.jpg',
  '/assets/images/komito-hero-background.webp',
  '/assets/scripts/header.js',
  '/assets/scripts/cta-area.js',
  '/assets/scripts/sidebar.js',
  '/assets/scripts/footer.js',
  '/assets/styles.css',

  // Pages:
  '/',
  '/about/',
  '/integration/',
  '/support/',
  '/404.html',

  // Articles:
  '/integration/google-tag-manager/',
  '/integration/google-tag-manager/google-tag-manager.jpg',
  '/integration/google-tag-manager/google-tag-manager-thumbnail.jpg',
  '/integration/wordpress/',
  '/integration/wordpress/komito-analytics-wordpress-plugin.jpg',
  '/integration/wordpress/komito-analytics-wordpress-plugin-thumbnail.jpg',

  // Posts:
  '/posts/track-form-submissions/',
  '/posts/track-form-submissions/track-form-submissions-screenshot.png',
  '/posts/track-form-submissions/track-form-submissions-thumbnail.jpg',
  '/posts/track-form-submissions/track-form-submissions-thumbnail.webp',
  '/posts/track-form-submissions/track-form-submissions.jpg',

  '/posts/track-scroll-depth/',
  '/posts/track-scroll-depth/track-scroll-depth-screenshot.png',
  '/posts/track-scroll-depth/track-scroll-depth-thumbnail.jpg',
  '/posts/track-scroll-depth/track-scroll-depth-thumbnail.webp',
  '/posts/track-scroll-depth/track-scroll-depth.jpg',

  '/posts/track-color-scheme/',
  '/posts/track-color-scheme/track-color-scheme-screenshot.png',
  '/posts/track-color-scheme/track-color-scheme-thumbnail.jpg',
  '/posts/track-color-scheme/track-color-scheme-thumbnail.webp',
  '/posts/track-color-scheme/track-color-scheme.jpg',

  '/posts/track-social-interactions/',
  '/posts/track-social-interactions/track-social-interactions-screenshot.png',
  '/posts/track-social-interactions/track-social-interactions-thumbnail.jpg',
  '/posts/track-social-interactions/track-social-interactions-thumbnail.webp',
  '/posts/track-social-interactions/track-social-interactions.jpg'
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
