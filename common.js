/**
 * @fileoverview Common JavaScript functions for Komito Analytics website.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


(function() {
  /** @const {number} */ var DEBUG = ~location.search.indexOf('debug=');
  /** @const {string} */ var GA_TRACKING_ID = 'UA-5065160-14';
  /** @const {string} */ var FB_APP_ID = '490025408049997';

  /**
   * Initializes Google Analytics.
   * @private
   */
  function initGa_() {
    /** @type {Function} */ var ga = window['ga'];

    if (ga && 'function' === typeof ga) {
      ga('create', GA_TRACKING_ID, 'auto');
      ga('require', 'displayfeatures');
      ga('send', 'pageview');
    }
  }

  /**
   * Toggles element class name.
   * @param {Node} element The element to add or remove the class on.
   * @param {string} className The class name to toggle.
   * @private
   */
  function toggleClass_(element, className) {
    /** @type {!RegExp} */ var pattern = new RegExp('\\s*' + className);
    if (pattern.test(element.className)) {
      element.className = element.className.replace(pattern, '');
    } else {
      element.className += ' ' + className;
    }
  }

  /**
   * Initializes menu navigation.
   * @private
   */
  function initMenu_() {
    /** @type {!Document} */ var doc = document;
    /** @type {Element} */ var hamburger = doc.querySelector('.hamburger');
    /** @type {Element} */ var nav = doc.querySelector('.kmt-navigation');

    if (hamburger && nav) {
      hamburger.addEventListener('click', function() {
        toggleClass_(doc.body, 'lock');
        toggleClass_(hamburger, 'active');
        toggleClass_(nav, 'active');
      }, false);
    }
  }

  /**
   * Initializes Alexa widget.
   * @private
   */
  function initAlexa_() {
    /** @type {string} */ var host = location.hostname;
    /** @type {Element} */ var obj = document.createElement('OBJECT');
    if ('web.archive.org' !== host && 'file:' !== location.protocol) {
      obj.style.position = 'absolute';
      obj.style.visibility = 'hidden';
      obj.data = 'https://data.alexa.com/data?cli=10&dat=snbamz&url=' + host;
      obj.onload = obj.onerror = function() {
        if (obj) {
          obj.onload = obj.onerror = null;
          obj.parentNode.removeChild(obj);
          obj = null;
        }
      };
      document.body.appendChild(obj);
    }
  }

  /**
   * Replaces unsupported '.webp' with '.jpg' background image.
   * @private
   */
  function fixWebP_() {
    var selector = '.kmt-page-hero';
    var node = document.querySelector(selector);

    if (node) {
      var bgImage = window.getComputedStyle(
          node,':after').getPropertyValue('background-image');

      function callback(result) {
        result || document.styleSheets[0].addRule(
            selector + ':after',
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
   * Initializes service worker.
   * @private
   */
  function initServiceWorker_() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/worker.js', {
          'scope': '/'
        }).then(function(registration) {
          DEBUG && alert(
              'Registration successful with scope: ' + registration.scope);
        }, function(error) {
          DEBUG && alert('Registration failed: ' + error);
        });
      });
    }
  }

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent
   * @see https://developers.google.com/web/fundamentals/app-install-banners/
   * @private
   */
  function initInstallPrompt_() {
    if ('BeforeInstallPromptEvent' in window) {
      window.addEventListener('beforeinstallprompt', function(event) {
        DEBUG && alert('onBeforeInstallPromptEvent');
      });

      window.addEventListener('appinstalled', function() {
        DEBUG && alert('onAppInstalled');
      });
    }
  }

  /**
   * Loads and initializes Facebook SDK.
   * @see https://developers.facebook.com/docs/javascript/quickstart
   * @see https://developers.facebook.com/docs/javascript/reference/FB.init/v2.11
   * @private
   */
  function initFacebookSdk_() {
    var params = 'xfbml=1&version=v2.11&appId=' + FB_APP_ID + '&status=1&cookie=1';
    var script = document.createElement('SCRIPT');
    script.async = 1;
    script.id = 'facebook-jssdk';
    script.src = 'https://connect.facebook.net/en_US/sdk.js#' + params;
    document.body.appendChild(script);
  }

  /**
   * Initializes lazy images preloader.
   */
  function initIntersectionObserver_() {
    function load(image) { image.src = image.dataset.src; };
    var images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
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
   * Initializes application.
   * @private
   */
  function init_() {
    fixWebP_();
    initGa_();
    initMenu_();
    initAlexa_();
    initServiceWorker_();
    initInstallPrompt_();
    initFacebookSdk_();
    initIntersectionObserver_();
  }

  // Initializing application.
  init_();
})();
