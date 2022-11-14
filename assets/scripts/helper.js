// window.loadScript = function(src) {
//   var script = document.body.appendChild(document.createElement('script'));
//   script.async = true;
//   script.src = src;
// };

(function (win, doc) {
  // /**
  //  * Initializes Google Tag Manager.
  //  * @private
  //  */
  // function initGTM_() {
  //   if ("file:" !== location.protocol) {
  //     var containerId = "GTM-57BM5H";
  //     win.dataLayer = win.dataLayer || [];
  //     win.dataLayer.push({
  //       "gtm.start": new Date().getTime(),
  //       event: "gtm.js",
  //     });

  //     loadScript("https://www.googletagmanager.com/gtm.js?id=" + containerId);

  //     /*
  //     var trackingId = 'UA-5065160-14';
  //     loadScript('https://www.googletagmanager.com/gtag/js?id=' + trackingId);

  //     win.dataLayer = win.dataLayer || [];
  //     function gtag(){dataLayer.push(arguments)}
  //     gtag('js', new Date);
  //     gtag('config', trackingId);

  //     loadScript('https://komito.net/komito.js');
  //     */
  //   }
  // }

  // /**
  //  * Initializes service worker.
  //  * @private
  //  */
  // function initServiceWorker_() {
  //   if ("serviceWorker" in navigator) {
  //     win.addEventListener("load", function () {
  //       navigator.serviceWorker
  //         .register("/worker.js", {
  //           scope: "/",
  //         })
  //         .then(
  //           function (registration) {
  //             registration.addEventListener("updatefound", function () {
  //               var newWorker = registration.installing;
  //               newWorker.addEventListener("statechange", function () {
  //                 if ("installed" === newWorker.state) {
  //                   if (navigator.serviceWorker.controller) {
  //                     // var toast = doc.body.appendChild(doc.createElement('DIV'));
  //                     // toast.className = 'toast';
  //                     // toast.innerHTML = 'A new version is available: <a href="./"' +
  //                     //   'onclick="location.reload(true);return false">Refresh</a>';
  //                   }
  //                 }
  //               });
  //             });
  //           },
  //           function (error) {
  //             // DEBUG && alert('Registration failed: ' + error);
  //           }
  //         );
  //     });
  //   }
  // }

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
   * Fixes embedded gists container width.
   * @private
   */
  function fixGists_() {
    var width = screen.availWidth;
    var sheet = doc.styleSheets[1];

    if (768 > width && sheet && document.querySelector('.gist')) {
      sheet.insertRule('.gist{max-width: ' + (width - 32) + 'px}');
    }
  }

  /**
   * Initializes application.
   * @private
   */
  function init_() {
    function ready() {
      // initGTM_();
      fixWebP_();
      initIntersectionObserver_();
    }

    'interactive' === doc.readyState || 'complete' === doc.readyState ?
        setTimeout(ready, 0) :
        win.addEventListener('DOMContentLoaded', ready);

    fixGists_();
    // initServiceWorker_();
  }

  // Initializing application.
  init_();
})(window, document);
