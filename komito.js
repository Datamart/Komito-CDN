/* @license http://www.apache.org/licenses/LICENSE-2.0 */
(function(){
var g=document,k=window;function l(b,a,d){b.attachEvent?b.attachEvent("on"+a,d):b.addEventListener(a,d,!1)}function m(b,a,d){b.attachEvent?b.detachEvent("on"+a,d):b.removeEventListener(a,d,!1)}function p(b){b=b||k.event;return b.target||b.srcElement}
function q(b,a){var d=g.createElement("SCRIPT"),c=!1,f;d.src=b;d.onload=d.onreadystatechange=function(){f=d.readyState||"complete";c||"loaded"!==f&&"complete"!==f||(c=!0,d.onload=d.onreadystatechange=null,d.parentNode.removeChild(d),a&&a())};t.parentNode.appendChild(d)}var t,w=g&&g.getElementsByTagName("SCRIPT");t=w[w.length-1];var x=Array.prototype.slice;function y(b,a){var d;d|=0;b=z(b);var c=b.length,f=b.indexOf,e=f?f.call(b,a,d):-1;if(!f)for(;d<c&&!~e;d++)e=b[d]===a?d:e;return e}function A(b){var a=Array.isArray;return a?a(b):"[object Array]"===Object.prototype.toString.call(b)}function B(b,a){b=z(b);var d=b.length,c=0,f=0,e=b.filter,h=e?e.call(b,a,void 0):[];if(!e)for(;c<d;)e=b[c++],a.call(void 0,e,c,b)&&(h[f++]=e);return h}
function C(b,a){b=z(b);var d=b.length,c=0,f=b.forEach;if(f)f.call(b,a,void 0);else for(;c<d;)a.call(void 0,b[c],c++,b)}function z(b){return A(b)?b:x.call(b)};var D={trackTwitter:1,trackFacebook:1,trackLinkedIn:1,trackDownloads:1,trackOutbound:1,trackForms:1,trackUsers:1,trackActions:1,trackPrint:1,trackMedia:1,trackScroll:1,nonInteraction:["form","print","scroll","video"],debugMode:/[?&]debug=1/.test(location.search)},E=/\.([0-9a-z]+)(?:[\?#]|$)/i,F=k.GoogleAnalyticsObject||"ga";
function G(b){var a=z(arguments);a[0]=a[0]?"social":"event";H(a);var d=k.TagLoader;var c=k.s;var f=[],e=1;if(d&&c&&c instanceof d){for(;e<a.length;e++)d="prop"+e,f.push(d),c[d]=a[e];c.linkTrackEvents="None";c.linkTrackVars=f.join(",");I([c],"tl",[c,"download"===a[1]?"d":"o",a[0]])}c=[].concat(a);"social"==c[0]&&(c[1]="social:"+c.splice(2,1,c[1])[0]);c=c.slice(1);I([k],"ClickTaleEvent",[c.join(":")]);I([k],"__utmTrackEvent",c);k._hmt&&I([k._hmt],"push",[["_trackEvent"].concat(c)]);if(k._gat||k._gaq)c=
k._gat&&k._gat._getTrackers&&k._gat._getTrackers(),a=J(a)?a.concat([1]):a,a[0]={social:"_trackSocial",event:"_trackEvent"}[a[0]],c?I(c,a[0],a.slice(1)):k._gaq&&I([k._gaq],"push",[a])}function H(b){if("function"===typeof k[F]){var a=k[F].getAll&&k[F].getAll(),d=K.trackingIds;a&&d&&(A(d)||(d=[""+d]),a=B(a,function(a){a=a.get("trackingId");var c=0<=y(d,a);L(a,c);return c}));b=J(b)?b.concat([{nonInteraction:1}]):b;a&&I(a,"send",b)}}
function I(b,a,d){var c=b.length;for(L(a,d);c;){var f=b[--c];"function"===typeof f[a]&&f[a].apply(f,d)}}function L(b){var a=k.console;K.debugMode&&a&&a.log.apply(a,arguments)}function J(b){return 0<=y(K.nonInteraction,b[1].split(/\W/)[0])}var K={};
(function(){function b(){K=k._komito||{};for(a in D)a in K||(K[a]=D[a]);M&&new M;N&&new N;O&&new O;R&&new R;K.trackMedia&&(S&&new S,T&&new T,U&&new U);var b={trackFacebook:V,trackLinkedIn:W,trackTwitter:X,trackUsers:Y},c;for(c in b)K[c]&&new b[c]}var a=g.readyState;"interactive"==a||"complete"==a?setTimeout(b,1E3):l(k,"DOMContentLoaded",b)})();function M(){function b(a){a=p(a);for(var d=a.elements,c=d.length,f=0,e;f<c;)e=d[f++],e.name&&G(0,"form",a.getAttribute("name")||a.getAttribute("id")||"form",e.name+":"+(e.type||e.tagName));m(a,"submit",b)}(function(){if(K.trackForms)for(var a=g.forms,d=a.length;d;)l(a[--d],"submit",b)})()};function N(){function b(a){a=c(a);var d="outbound",n=a.hostname,h=a.pathname.split("/"),v=f(a),Q=e[n.replace(/^www\./,"")];G(0,d,n,v);Q&&("twitter.com"===n.substr(-11)&&"intent"===h[h.length-2]&&(d="intent-"+h.pop()),G(1,Q,d,v));m(a,"mousedown",b)}function a(b){b=c(b);var d=f(b),e=(d.match(E)||[""]).pop().toLowerCase();G(0,"download",e,d);m(b,"mousedown",a)}function d(a){a=c(a);var b=a.protocol.slice(0,-1),e=f(a);h.test(e)||(G(0,"cta:"+b,e.slice(b.length+1).split("?")[0],e),m(a,"mousedown",d))}function c(a){for(a=
p(a);a&&"A"!==a.tagName;)a=a.parentNode;return a}function f(a){return a.href||a.getAttribute("href")||""}var e={"plus.google.com":"Google+","plus.url.google.com":"Google+","blogspot.com":"Blogger","facebook.com":"Facebook","on.fb.me":"Facebook","fb.me":"Facebook","fb.com":"Facebook","twitter.com":"Twitter","t.co":"Twitter","linkedin.com":"LinkedIn","myspace.com":"MySpace","vk.com":"VKontakte","odnoklassniki.ru":"Odnoklassniki","xing.com":"Xing","youtube.com":"YouTube","youtu.be":"YouTube","twoo.com":"Twoo",
"reddit.com":"Reddit","pinterest.com":"Pinterest","digg.com":"Digg","4sq.com":"Foursquare","foursquare.com":"Foursquare","hi.baidu.com":"Baidu Space"},h=/^(https?:)?\/\//;(function(){for(var c=g&&g.getElementsByTagName("A"),e=c.length;e;){var r=c[--e],u=f(r),v=h.test(u);u=(u.match(E)||[""]).pop().toLowerCase();K.trackOutbound&&v&&!~r.hostname.indexOf(location.hostname)&&l(r,"mousedown",b);K.trackDownloads&&u&&~",mp3,mp4,wma,mov,avi,wmv,mkv,eot,woff,ttf,txt,csv,tsv,pdf,doc,docx,xls,xlsx,ppt,pptx,zip,tar,tgz,bz2,gz,rar,dmg,pkg,7z,ida,exe,sh,bat,".indexOf(","+
u+",")&&l(r,"mousedown",a);K.trackActions&&!v&&l(r,"mousedown",d)}})()};function O(){function b(){G(0,"print",g.title,location.href);a?a.removeListener(b):m(k,"afterprint",b);a=b=null}var a;(function(){if(K.trackPrint){var d=k.matchMedia;(a=d&&d("print"))?a.addListener(b):l(k,"afterprint",b)}})()};function R(){(function(){if(K.trackScroll){var b={25:0,50:0,75:0,100:0},a=g.documentElement,d=g.body,c;l(k,"scroll",function(){(c=25*~~((a.scrollTop||d.scrollTop)/((a.scrollHeight||d.offsetHeight)-(a.clientHeight||k.innerHeight))*100/25))&&c in b&&!b[c]&&(b[c]=1,G(0,"scroll","depth",c+"%"))})}})()};function S(){function b(a){for(var b=[],c=arguments.length,f,e;c;)for(f=arguments[--c],f=g&&g.getElementsByTagName(f),e=0;e<f.length;)b.push(f[e++]);return b}(function(){function a(a){e=p(a);h=a.type;~h.indexOf("fullscreen")&&(h=g.fullScreen||g.mozFullScreen||g.webkitIsFullScreen?"fullscreen":"");h&&G(0,e.tagName.toLowerCase()+":html5",h,e.currentSrc||e.src)}for(var d="ended pause play webkitfullscreenchange mozfullscreenchange fullscreenchange".split(" "),c=b("AUDIO","VIDEO"),f=c.length,e,h,n;f--;)for(e=
c[f],n=0;6>n;)l(e,d[n++],a)})()};function T(){function b(b){var c=k.Vimeo&&k.Vimeo.Player;if(c)for(var d=b.length,h;d;)h=b[--d],a(new c(h),h.src.split("?")[0])}function a(a,b){a.on("ended",function(){G(0,"video:vimeo","ended",b)});a.on("play",function(){G(0,"video:vimeo","play",b)});a.on("pause",function(){G(0,"video:vimeo","pause",b)})}var d=/^(https?:)?\/\/player\.vimeo\.com\/video\/\d+/;(function(){for(var a=g&&g.getElementsByTagName("IFRAME"),f=a.length,e=[],h;f;)h=a[--f],d.test(h.src)&&e.push(h);e.length&&(k.Vimeo&&k.Vimeo.Player?
b(e):q("https://player.vimeo.com/api/player.js",function(){b(e)}))})()};function U(){function b(a){var b=["ended","play","pause"][a.data];b&&G(0,"video:youtube",b,a.target.getVideoUrl())}var a=/^(https?:)?\/\/(www\.)?youtube(\-nocookie)?\.com\/(embed|watch|v)/;(function(){for(var d=g&&g.getElementsByTagName("IFRAME"),c=d.length,f=0,e=[],h,n;f<c;)h=d[f++],n=h.src,a.test(n)&&(0>n.indexOf("enablejsapi")&&(h.src+=(~n.indexOf("?")?"&":"?")+"enablejsapi=1"),e.push(h));if(c=e.length)k.onYouTubeIframeAPIReady=function(){for(f=0;f<c;)l(new k.YT.Player(e[f++]),"onStateChange",
b)},k.YT||q("https://www.youtube.com/iframe_api")})()};function V(){function b(){if(9>d++){var c=k.FB;if(c=c&&c.Event&&c.Event.subscribe)try{c("edge.create",function(){a("like")}),c("edge.remove",function(){a("unlike")}),c("message.send",function(){a("message")})}catch(f){}else setTimeout(b,5E3)}}function a(a){G(1,"Facebook",a,location.href)}var d=0;b()};function W(){function b(a,b){var c=["cb_onsuccess",b,+new Date].join("_");a.onsuccess=(a.onsuccess?a.onsuccess+",":"")+c;k[c]=function(){G(1,"LinkedIn",b,location.href)}}(function(){for(var a=g&&g.getElementsByTagName("SCRIPT"),d=a.length,c=0,f,e;c<d;)f=a[c++],e=(f.getAttribute("type")||"").toLowerCase(),e.indexOf("in/")||b(f,e.substr(3))})()};function X(){function b(){9>c++&&(k.twttr&&k.twttr.ready?k.twttr.ready(function(){var b=K.trackTwitter,c,n,P;b=A(b)?b:a;C(b,function(a){c=a.type;f[c]||(f[c]=1,n=(P=d[c])&&a.data&&a.data[P]||location.href,G(1,"Twitter",c,n))})}):setTimeout(b,5E3))}var a=["tweet","retweet","like","follow"],d={follow:"screen_name",retweet:"source_tweet_id",like:"tweet_id",tweet:"url"},c=0,f={};b()};function Y(){var b={Google:"https://accounts.google.com/CheckCookie?continue=https%3A%2F%2Fwww.google.com%2Fintl%2Fen%2Fimages%2Flogos%2Faccounts_logo.png&amp;followup=https%3A%2F%2Fwww.google.com%2Fintl%2Fen%2Fimages%2Flogos%2Faccounts_logo.png&amp;chtml=LoginDoneHtml&amp;checkedDomains=youtube&amp;checkConnection=youtube%3A291%3A1","Google+":"https://plus.google.com/up/?continue=https%3A%2F%2Fwww.google.com%2Fintl%2Fen%2Fimages%2Flogos%2Faccounts_logo.png",Twitter:"https://twitter.com/login?redirect_after_login=https%3A%2F%2Fplatform.twitter.com%2Fwidgets%2Fimages%2Fbtn.png"};
(function(){function a(a,c){l(a,"load",function(){G(1,c,"pageview",location.href)});a.src=b[c]}function d(a){a(function(a){a&&"unknown"!==a.status&&!f++&&G(1,"Facebook","pageview",location.href)})}function c(){var a=k.FB&&k.FB.getLoginStatus;a?(d(a),l(k,"message",function(b){try{"facebook.com"===b.origin.substr(-12)&&b.data&&~b.data.indexOf("xd_action=proxy_ready")&&d(a)}catch(r){}})):--e&&setTimeout(c,2E3)}var f=0,e=5,h;for(h in b)a(new Image(1,1),h);c()})()};
})();
