(function() {
  var content = '<div class="cta-area">' +
    '<h3>Curious?</h3>' +
    '<p>' +
    'Get started with step-by-step Komito Analytics integration instructions using '+
    '<a href="https://komito.net/integration/google-tag-manager/">Google Tag Manager</a>, ' +
    '<a href="https://komito.net/integration/wordpress/">WordPress plugin</a>, ' +
    '<a href="https://www.npmjs.com/komito-analytics">NPM Package</a>, or ' +
    'single <a href="https://komito.net/integration/">JavaScript</a> file:' +
    '</p>' +
    '<ul>' +
    '<li><a href="https://komito.net/integration/google-tag-manager/" title="Google Tag Manager" aria-label="Google Tag Manager"><svg role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2469.7 2469.8" width="64"><path fill="#8AB4F8" d="M1449.8,2376L1021,1946.7l921.1-930.5l436.7,436.6L1449.8,2376z"/><path fill="#4285F4" d="M1452.9,527.1L1016.3,90.4L90.5,1016.2c-120.6,120.5-120.7,315.8-0.2,436.4c0.1,0.1,0.2,0.2,0.2,0.2 l925.8,925.8l428.3-430.3L745,1235.1L1452.9,527.1z"/><path fill="#8AB4F8" d="M2378.7,1016.2L1452.9,90.4c-120.6-120.6-316.1-120.6-436.7,0c-120.6,120.6-120.6,316.1,0,436.6l926.3,925.8 c120.6,120.6,316.1,120.6,436.6,0c120.6-120.6,120.6-316.1,0-436.6L2378.7,1016.2z"/><circle fill="#246FDB" cx="1231.2" cy="2163.9" r="306"/></svg></a></li>' +
    '<li><a href="https://komito.net/integration/wordpress/" title="WordPress" aria-label="WordPress"><svg role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="8.399 8.4 51.2 51.2" width="64"><path fill="#21759B" d="M34 59.6C19.813 59.6 8.293 48.293 8.4 34 8.507 19.707 19.28 8.4 34 8.4c14.721 0 25.6 11.52 25.6 25.6S48.187 59.6 34 59.6zm7.573-3.947l-7.253-19.52-6.827 19.947c5.014 1.174 8.427 1.493 14.08-.427zm-17.706-1.066l-10.88-29.76c-1.494 3.2-1.813 5.867-2.027 9.173.107 8.746 5.013 16.746 12.907 20.587zM56.934 34c.106-5.653-2.453-10.133-2.667-10.773.214 4.374-.427 6.613-1.173 9.067l-7.467 21.44C55.014 48.08 56.826 39.653 57.04 34h-.106zm-23.68-.96l-3.627-9.92-2.667-.213c-1.066-.747-.427-1.92.32-1.92 4.8.32 7.466.32 12.267 0 1.174 0 1.493 1.707.106 1.92l-2.56.213 8.319 24.533 3.946-13.44c.214-5.866-1.387-6.506-3.52-10.773-1.707-3.307.107-6.507 3.414-6.613-2.668-2.56-8.107-5.76-15.254-5.867s-14.72 3.52-19.2 10.347l7.894-.213c.96.427.533 1.813 0 1.92l-2.773.213 8.32 24.96 5.015-15.147z"/></svg></a></li>' +
    '<li><a href="https://www.npmjs.com/komito-analytics" title="NPM Package" aria-label="NPM Package"><svg role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 990 990" width="64"><path fill="#cb3837" d="M0,990V0H990V990ZM186.19,185.53V803h312V314.29H680v488.8H803.78V185.53Z"/><path fill="#fff" d="M186.19,185.53h617.6V803.09H680V314.29H498.17V803h-312Z"/></svg></a></li>' +
    '<li><a href="https://komito.net/integration/" title="JavaScript" aria-label="JavaScript"><svg role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="64"><path d="M0 0h256v256H0V0z" fill="#F7DF1E"/><path d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247L210.29 147.43c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574"/></svg></a></li>' +
    '</ul>' +
  '</div>';
  insertAdjacentHTMLContent(document.currentScript, content);
})();
