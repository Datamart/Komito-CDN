(function() {
  var posts = [
      ['How to track scroll depth with Komito Analytics?',
       'https://komito.net/posts/track-scroll-depth/track-scroll-depth-thumbnail.webp'],
      ['How to integrate Komito Analytics using Google Tag Manager?',
       'https://komito.net/integration/google-tag-manager/google-tag-manager-thumbnail.webp'],
      ['How to integrate Komito Analytics using plugin for WordPress?',
       'https://komito.net/integration/wordpress/komito-analytics-wordpress-plugin-thumbnail.webp'],
      ['How to track form submissions with Komito Analytics?',
       'https://komito.net/posts/track-form-submissions/track-form-submissions-thumbnail.webp'],
      ['How to track color scheme with Komito Analytics?',
       'https://komito.net/posts/track-color-scheme/track-color-scheme-thumbnail.webp'],
      ['How to track Social Media Interactions with Komito Analytics?',
       'https://komito.net/posts/track-social-interactions/track-social-interactions-thumbnail.webp']
  ];
  posts.sort(function(a, b){return 0.5 - Math.random()});


  var page = location.href.split('?')[0];
  var html = '';
  // var pixel = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
  var pixel = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg"/>');

  window.fixWebP_ = function(event) {
    var image = event.target;
    // console.log(event.type, image.width, image.height, image.src);
    if ('error' === event.type || (0 === image.width && 0 === image.height)) {
      image.onerror = image.onload = null;
      image.src = image.src.replace('.webp', '.jpg');
    }
  };

  var maxPosts = /\/posts\/$/.test(location.pathname) ? posts.length : 3;
  for (var i = Math.min(posts.length, maxPosts); i--;) {
    var post = posts[i];
    var href = post[1].split('/').slice(0, -1).join('/') + '/';

    if (href != page) {
      html += '<div class="card">' +
              '  <a href="' + href + '" title="' + post[0] + '">' +
              '    <img src="' + pixel + '" ' +
              '         data-src="' + post[1] + '" width="100%" ' +
              '         alt="' + post[0] + '" ' +
              '         onload="fixWebP_(event)" ' +
              '         onerror="fixWebP_(event)">' +
              '    <b>' + post[0] + '</b>' +
              '  </a>' +
              '</div>';
    }
  }

  html += '<div class="card info">' +
          'Privacy is not a concern: Komito Analytics does not store any data.<br><br>' +
          'Why? Because it\'s an extension for the most popular web analytics software, not a service.<br><br>' +
          '<a href="/about/">Read more about Komito Analytics</a></div>';

  html +='<a class="twitter-timeline" data-dnt="true" data-chrome="nofooter" data-tweet-limit="3" ' +
         'href="https://twitter.com/KomitoAnalytics?ref_src=twsrc%5Etfw">Tweets by KomitoAnalytics</a>';

  insertAdjacentHTMLContent(document.currentScript, '<aside>' + html + '</aside>');
  loadScript('https://platform.twitter.com/widgets.js');
})();
