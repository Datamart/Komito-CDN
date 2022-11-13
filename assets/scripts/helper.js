window.loadScript = function(src) {
  var script = document.body.appendChild(document.createElement('script'));
  script.async = true;
  script.src = src;
};

(function (win, doc) {
  /**
   * Initializes Google Tag Manager.
   * @private
   */
  function initGTM_() {
    if ("file:" !== location.protocol) {
      var containerId = "GTM-57BM5H";
      win.dataLayer = win.dataLayer || [];
      win.dataLayer.push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js",
      });

      loadScript("https://www.googletagmanager.com/gtm.js?id=" + containerId);

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
   * Initializes service worker.
   * @private
   */
  function initServiceWorker_() {
    if ("serviceWorker" in navigator) {
      win.addEventListener("load", function () {
        navigator.serviceWorker
          .register("/worker.js", {
            scope: "/",
          })
          .then(
            function (registration) {
              registration.addEventListener("updatefound", function () {
                var newWorker = registration.installing;
                newWorker.addEventListener("statechange", function () {
                  if ("installed" === newWorker.state) {
                    if (navigator.serviceWorker.controller) {
                      // var toast = doc.body.appendChild(doc.createElement('DIV'));
                      // toast.className = 'toast';
                      // toast.innerHTML = 'A new version is available: <a href="./"' +
                      //   'onclick="location.reload(true);return false">Refresh</a>';
                    }
                  }
                });
              });
            },
            function (error) {
              // DEBUG && alert('Registration failed: ' + error);
            }
          );
      });
    }
  }

  /**
   * Initializes application.
   * @private
   */
  function init_() {
    function ready() {
      initGTM_();
    }

    "interactive" === doc.readyState || "complete" === doc.readyState
      ? setTimeout(ready, 0)
      : win.addEventListener("DOMContentLoaded", ready);

    initServiceWorker_();
  }

  // Initializing application.
  init_();
})(window, document);
