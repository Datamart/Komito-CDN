window.insertAdjacentHTMLContent = function(element, content) {
  if (!element) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/currentScript#Browser_compatibility
    var scripts = document.getElementsByTagName('SCRIPT');
    element = scripts[scripts.length - 1];
  }

  if (element) {
    var container = element.parentNode.insertBefore(document.createElement('DIV'), element);
    container.innerHTML = content;

    var length = container.childNodes.length;
    var lastChild = element;
    for (; length--;) {
      var child = container.childNodes[length];
      lastChild = container.parentNode.insertBefore(child, lastChild);
    }
    container.parentNode.removeChild(container);
    element.parentNode.removeChild(element);
  }
};

window.getNavMenu = function() {
  var links = [
    ['/', 'Overview', 'Komito Analytics overview page.'],
    ['/integration/', 'Integration', 'Step-by-step Komito Analytics integration instructions.'],
    ['/demo/', 'Demo', 'See Komito Analytics in action!']
  ];
  var path = location.pathname;
  var menu = '<ul class="menu">';
  var isDev = 'file:' === location.protocol;

  for (var i = 0; i < links.length;) {
    var link = links[i++];

    menu += '<li><a href="' + link[0] + '" ' +
            (path == link[0] || (isDev && 1 === i) ? ' class="active"' : '') +
            'title="' + link[2] + '">' + link[1] + '</a></li>';
  }

  return menu +
         '<li><a href="https://github.com/Datamart/Komito/tree/master"' +
         '             title="Get Komito Analytics Source Code."' +
         '             rel="nofollow">Get source code</a></li></ul>';
};

(function() {
  var content = '' +
    '<header>' +
    '  <div class="logo">' +
    '    <a href="/" title="Komito Analytics"><svg version="1.1"' +
    '       xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="45px"' +
    '       role="img" aria-label="Komito Analytics Logo"' +
    '       height="45px" viewBox="0 0 45 45"><polygon fill="#d20"' +
    '       points="0,0 0,20.1 19.8,0"/><polygon fill="#f80"' +
    '       points="0,32 0,45 20.9,45 8.3,24.6"/><polygon fill="#07d"' +
    '       points="33.6,45 45,45 45,0 32.3,0 14.6,18"/>' +
    '       </svg><span><b>Komito</b><i>Analytics</i></span></a>' +
    '  </div>' +
    '  <div id="nav">' +
    '    <input type="checkbox">' +
    '    <div class="hamburger"><span></span></div>' + getNavMenu() +
    '  </div>' +
    '</header>';
  insertAdjacentHTMLContent(document.currentScript, content);
})();
