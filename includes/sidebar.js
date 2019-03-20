(function() {
  var script = document.currentScript;
  if (!script) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/currentScript#Browser_compatibility
    var scripts = document.getElementsByTagName('SCRIPT');
    script = scripts[scripts.length - 1];
  }
  if (script && screen.width > 1000) {
    var container = script.parentNode.insertBefore(document.createElement('DIV'), script);
    var page = location.href.split('?')[0];
    var width = 250;
    var height = Math.round(width / 1.5);
    var margin = Math.round(height / 2.5);
    var posts = [
      ['How to track scroll depth with Komito Analytics',
       'https://komito.net/posts/track-scroll-depth/track-scroll-depth.jpg'],
      ['How to integrate Komito Analytics using Google Tag Manager',
       'https://komito.net/integration/google-tag-manager/google-tag-manager.jpg']
    ];
    posts.sort(function(a, b){return 0.5 - Math.random()});
    var html = '<div class="sidebar" style="float:right;width:' + width + 'px">';
    for (var i = 0; i < posts.length; i++) {
      var post = posts[i];
      var href = post[1].split('/').slice(0, -1).join('/') + '/';
      if (href != page) {
        html += '<a class="post" href="' + href + '" style="' +
        'background:url(' + post[1] + ') center;background-size:cover;' +
        'display:inline-block;margin:0 0 ' + margin + 'px;' +
        'padding-top:' + height + 'px;height:' + height + 'px">' +
        post[0] + '</a>';
      }
    }
    html += '</div>';
    container.innerHTML = html;
  }
})();
