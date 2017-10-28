/**
 * @fileoverview Common JavaScript functions for Komito Analytics website.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 */


(function() {
  /**
   * Initializes Google Analytics.
   * @private
   */
  function initGa_() {
    /** @type {Function} */ var ga = window['ga'];

    if (ga && 'function' === typeof ga) {
      ga('create', 'UA-5065160-14', 'auto');
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
    /** @type {string} */ var hostname = location.hostname;
    /** @type {Element} */ var obj = document.createElement('OBJECT');
    obj.style.position = 'absolute';
    obj.style.visibility = 'hidden';
    obj.data = 'https://data.alexa.com/data?cli=10&dat=snbamz&url=' + hostname;
    obj.onload = obj.onerror = function() {
      if (obj) {
        obj.onload = obj.onerror = null;
        obj.parentNode.removeChild(obj);
        obj = null;
      }
    };
    document.body.appendChild(obj);
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
    if ('serviceWorker' in navigator && ~location.search.indexOf('pwa')) {
      window.addEventListener('load', function() {
        function onSuccess(registration) {
          console.log('Registration successful with scope: ', registration.scope);
        }
        function onFail(error) {
          console.log('Registration failed: ', error);
        }
        navigator.serviceWorker.register('/worker.js').then(onSuccess, onFail);
      });
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
  }

  // Initializing application.
  init_();
})();
