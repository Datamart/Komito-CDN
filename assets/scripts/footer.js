(function(win, doc) {
  var content = '' +
    '<footer>' +
    '  <ul class="social">' +
    '    <li>Follow us on:</li>' +
    '    <li><a href="https://www.facebook.com/KomitoAnalytics/" title="Komito Analytics on Facebook"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 60.734 60.733" role="img" aria-label="Facebook Logo"><path fill="#fff" d="M57.378,0.001H3.352C1.502,0.001,0,1.5,0,3.353v54.026c0,1.853,1.502,3.354,3.352,3.354h29.086V37.214h-7.914v-9.167h7.914v-6.76c0-7.843,4.789-12.116,11.787-12.116c3.355,0,6.232,0.251,7.071,0.36v8.198l-4.854,0.002c-3.805,0-4.539,1.809-4.539,4.462v5.851h9.078l-1.187,9.166h-7.892v23.52h15.475c1.852,0,3.355-1.503,3.355-3.351V3.351C60.731,1.5,59.23,0.001,57.378,0.001z" /></svg></a></li>' +
    '    <li><a href="https://www.instagram.com/KomitoAnalytics/" title="Komito Analytics on Instagram"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 169.063 169.063" role="img" aria-label="Instagram Logo"><path d="M122.406,0H46.654C20.929,0,0,20.93,0,46.655v75.752c0,25.726,20.929,46.655,46.654,46.655h75.752 c25.727,0,46.656-20.93,46.656-46.655V46.655C169.063,20.93,148.133,0,122.406,0z M154.063,122.407 c0,17.455-14.201,31.655-31.656,31.655H46.654C29.2,154.063,15,139.862,15,122.407V46.655C15,29.201,29.2,15,46.654,15h75.752 c17.455,0,31.656,14.201,31.656,31.655V122.407z" fill="#fff" /><path d="M84.531,40.97c-24.021,0-43.563,19.542-43.563,43.563c0,24.02,19.542,43.561,43.563,43.561s43.563-19.541,43.563-43.561 C128.094,60.512,108.552,40.97,84.531,40.97z M84.531,113.093c-15.749,0-28.563-12.812-28.563-28.561 c0-15.75,12.813-28.563,28.563-28.563s28.563,12.813,28.563,28.563C113.094,100.281,100.28,113.093,84.531,113.093z" fill="#fff" /><path d="M129.921,28.251c-2.89,0-5.729,1.17-7.77,3.22c-2.051,2.04-3.23,4.88-3.23,7.78c0,2.891,1.18,5.73,3.23,7.78 c2.04,2.04,4.88,3.22,7.77,3.22c2.9,0,5.73-1.18,7.78-3.22c2.05-2.05,3.22-4.89,3.22-7.78c0-2.9-1.17-5.74-3.22-7.78 C135.661,29.421,132.821,28.251,129.921,28.251z" fill="#fff" /></svg></a></li>' +
    '    <li><a href="https://twitter.com/KomitoAnalytics/" title="Komito Analytics on Twitter"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 612 612" role="img" aria-label="Twitter Logo"><path d="M612,116.258c-22.525,9.981-46.694,16.75-72.088,19.772c25.929-15.527,45.777-40.155,55.184-69.411 c-24.322,14.379-51.169,24.82-79.775,30.48c-22.907-24.437-55.49-39.658-91.63-39.658c-69.334,0-125.551,56.217-125.551,125.513    c0,9.828,1.109,19.427,3.251,28.606C197.065,206.32,104.556,156.337,42.641,80.386c-10.823,18.51-16.98,40.078-16.98,63.101 c0,43.559,22.181,81.993,55.835,104.479c-20.575-0.688-39.926-6.348-56.867-15.756v1.568c0,60.806,43.291,111.554,100.693,123.104 c-10.517,2.83-21.607,4.398-33.08,4.398c-8.107,0-15.947-0.803-23.634-2.333c15.985,49.907,62.336,86.199,117.253,87.194 c-42.947,33.654-97.099,53.655-155.916,53.655c-10.134,0-20.116-0.612-29.944-1.721c55.567,35.681,121.536,56.485,192.438,56.485 c230.948,0,357.188-191.291,357.188-357.188l-0.421-16.253C573.872,163.526,595.211,141.422,612,116.258z" fill="#fff" /></svg></a></li>' +
    '  </ul>' + getNavMenu() +

    '  <div class="extra">' +
    '    <a href="https://www.dtm.io" title="Datamart Inc." class="logo"><svg xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Datamart Logo" width="33px" height="33px" viewBox="0 0 83 75"><path fill="#d61700" d="M41.008,0.938c9.558,0,18.338,3.321,25.255,8.87L29.338,2.652 C33.032,1.539,36.949,0.938,41.008,0.938L41.008,0.938z" /><path fill="#d61700" d="M78.159,25.45c0.784,1.833,1.438,3.736,1.947,5.696L36.787,80.062 l-21-66.474L78.159,25.45L78.159,25.45z" /><path fill="#d61700" d="M80.388,50.366C77.372,63.57,67.886,74.306,55.443,79.069L80.388,50.366L80.388,50.366z" /><path fill="#d61700" d="M21.163,76.523C8.896,69.589,0.612,56.431,0.612,41.333c0-6.387,1.484-12.427,4.124-17.796L21.163,76.523L21.163,76.523z" /></svg><span><i>Powered by</i><b>Datamart</b></span></a>' +
    '    <div>' +
    '      <p>Komito Analytics is subject to the terms and conditions of' +
    '        <a href="https://www.apache.org/licenses/LICENSE-2.0" rel="nofollow" title="Apache License">Apache License 2.0</a>' +
    '      </p>' +
    '      <span itemprop="publisher" itemscope itemtype="http://schema.org/Organization">' +
    '        <a href="tel:+14157997500" itemprop="telephone">+1 (415) 799-7500</a> •' +
    '        <a href="mailto:support@komito.net" itemprop="email">support@komito.net</a>' +
    '        <p>© ' + (new Date).getFullYear() +
    '        <a itemprop="url" href="https://www.dtm.io" title="Datamart Inc."><span itemprop="name">Datamart Inc.</span></a></p>' +
    '        <meta itemprop="address" content="2100 Geng Road, Suite 210, Palo Alto, CA 94303">' +
    '        <link itemprop="logo" href="https://www.dtm.io/images/datamart-logo-512x512.png">' +
    '        <link itemprop="sameAs" href="https://www.linkedin.com/company/datamartinc">' +
    '        <link itemprop="sameAs" href="https://www.facebook.com/datamartinc">' +
    '        <link itemprop="sameAs" href="https://twitter.com/thedatamartinc">' +
    '      </span>' +
    '    </div>' +
    '  </div>' +
    '</footer>';
  insertAdjacentHTMLContent(doc.currentScript, content);

  /**
   * Initializes Google Tag Manager.
   * @private
   */
  function initGTM_() {
    if ('file:' !== location.protocol) {
      var containerId = 'GTM-57BM5H';
      win.dataLayer = win.dataLayer || [];
      win.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});

      loadScript('https://www.googletagmanager.com/gtm.js?id=' + containerId);

      /*
      var trackingId = 'UA-5065160-14';
      loadScript('https://www.googletagmanager.com/gtag/js?id=' + trackingId);

      win.dataLayer = win.dataLayer || [];
      function gtag(){dataLayer.push(arguments)}
      gtag('js', new Date);
      gtag('config', trackingId);

      loadScript('https://komito.net/komito.js');
      */
    }
  }

  /**
   * Replaces unsupported '.webp' with '.jpg' background image.
   * @private
   */
  function fixWebP_() {
    var selector = '#main h1';
    var node = doc.querySelector(selector);

    if (node) {
      var bgImage = win.getComputedStyle(node).getPropertyValue('background-image');

      function callback(result) {
        result || doc.styleSheets[0].addRule(
            selector,
            'background-image: ' + bgImage.replace('.webp', '.jpg'));
        node.onload = node.onerror = null;
        node = null;
      }

      node = new Image;
      node.onload = function () {callback(node.width > 0 && node.height > 0);};
      node.onerror = function () {callback(false);};
      node.src = bgImage.split('url(')[1].split(')')[0].replace(/"/g,'');
    }
  }

  /**
   * Initializes lazy images preloader.
   * @private
   */
  function initIntersectionObserver_() {
    function load(image) { image.src = image.dataset.src; };
    var images = doc.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in win) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.intersectionRatio > 0) {
            observer.unobserve(entry.target);
            load(entry.target);
          }
        });
      }, {'rootMargin': '50px 0px', 'threshold': 0.01});
      images.forEach(function(image) { observer.observe(image); });
    } else {
      for (var length = images.length; length;) {
        load(images[--length]);
      }
    }
  }

  /**
   * Initializes service worker.
   * @private
   */
  function initServiceWorker_() {
    if ('serviceWorker' in navigator) {
      win.addEventListener('load', function() {
        navigator.serviceWorker.register('/worker.js', {
          'scope': '/'
        }).then(function(registration) {
          registration.addEventListener('updatefound', function() {
            var newWorker = registration.installing;
            newWorker.addEventListener('statechange', function() {
              if ('installed' === newWorker.state) {
                if (navigator.serviceWorker.controller) {
                  // var toast = doc.body.appendChild(doc.createElement('DIV'));
                  // toast.className = 'toast';
                  // toast.innerHTML = 'A new version is available: <a href="./"' +
                  //   'onclick="location.reload(true);return false">Refresh</a>';
                }
              }
            });
          });
        }, function(error) {
          // DEBUG && alert('Registration failed: ' + error);
        });
      });
    }
  }

  /**
   * Fixes embedded gists container width.
   * @private
   */
  function fixGists_() {
    var width = screen.availWidth;
    var sheet = doc.styleSheets[1];

    if (768 > width && sheet) {
      sheet.insertRule('.gist{max-width: ' + (width - 32) + 'px}');
    }
  }

  /**
   * Initializes application.
   * @private
   */
  function init_() {
    function ready() {
      initGTM_();
      fixWebP_();
      initIntersectionObserver_();
    }

    'interactive' === doc.readyState || 'complete' === doc.readyState ?
        setTimeout(ready, 0) :
        win.addEventListener('DOMContentLoaded', ready);

    fixGists_();
    initServiceWorker_();
  }

  // Initializing application.
  init_();

})(window, document);
