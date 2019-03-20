(function() {
  var script = document.currentScript;
  if (!script) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/currentScript#Browser_compatibility
    var scripts = document.getElementsByTagName('SCRIPT');
    script = scripts[scripts.length - 1];
  }
  if (script && screen.width > 1000) {
    var container = script.parentNode.insertBefore(document.createElement('DIV'), script);
    var posts = [
      ['How to track scroll depth with Komito Analytics',
       'https://komito.net/posts/track-scroll-depth/track-scroll-depth.jpg'],
      ['How to integrate Komito Analytics using Google Tag Manager',
       'https://komito.net/integration/google-tag-manager/google-tag-manager.jpg']
    ];
    posts.sort(function(a, b){return 0.5 - Math.random()});
    var html = '<div class="sidebar" style="float:right;width:250px">';
    for (var i = 0; i < posts.length; i++) {
      var post = posts[i];
      var href = post[1].split('/').slice(0, -1).join('/') + '/';
      if (href != location.href) {
        html += '<a class="post" href="' + href + '" ' +
        'style="background:url(' + post[1] + ') center;background-size:cover;' +
        'display:inline-block;padding-top:160px;height:160px;margin:0 0 70px">'+
        post[0] + '</a>';
      }
    }
    html += '</div>';
    container.innerHTML = html;
  }
})();
