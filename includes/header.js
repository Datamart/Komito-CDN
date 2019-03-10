(function() {
  var script = document.currentScript;
  if (!script) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/currentScript#Browser_compatibility
    var scripts = document.getElementsByTagName('SCRIPT');
    script = scripts[scripts.length - 1];
  }
  if (script) {
    var container = script.parentNode.insertBefore(document.createElement('DIV'), script);
    container.innerHTML =
    '<div class="kmt-page-header">' +
    '<div class="kmt-logo">' +
    '  <a href="../" title="Komito Analytics"><svg version="1.1"' +
    '     xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="45px"' +
    '     role="img" aria-label="Komito Analytics Logo"' +
    '     height="45px" viewBox="0 0 45 45"><polygon fill="#d20"' +
    '     points="0,0 0,20.1 19.8,0"/><polygon fill="#f80"' +
    '     points="0,32 0,45 20.9,45 8.3,24.6"/><polygon fill="#07d"' +
    '     points="33.6,45 45,45 45,0 32.3,0 14.6,18"/>' +
    '  </svg><span><b>Komito</b><i>Analytics</i></span></a>' +
    '</div>' +
    '<div class="hamburger">' +
    '  <div class="hamburger-box"><div class="hamburger-inner"></div></div>' +
    '</div>' +
    '<ul class="kmt-navigation">' +
    '  <li><a title="Komito Analytics overview page."' +
    '         href="../">Overview</a></li>' +
    '  <li><a title="Step-by-step Komito Analytics integration instructions."' +
    '         href="../integration/">Integration</a></li>' +
    '  <li><a title="See Komito Analytics in action!"' +
    '         href="../demo/">Demo</a></li>' +
    '  <li><a href="https://bit.ly/komitoenterprise"' +
    '         title="Custom solutions for Enterprises."' +
    '         rel="nofollow">Enterprise</a></li>' +
    '  <li><a href="https://github.com/Datamart/Komito/tree/master"' +
    '         title="Get Komito Analytics Source Code."' +
    '</ul>' +
    '</div>';
  }
})();
