/* @license http://www.apache.org/licenses/LICENSE-2.0 */
(function(){
var k=document,n=window,aa=navigator,q=(k.charset||k.characterSet||"utf-8").toLowerCase();function r(a){return a?k.createElement(a):null}function t(a){return k&&k.getElementsByTagName(a)}function v(a,b,c){a.attachEvent?a.attachEvent("on"+b,c):a.addEventListener(b,c,!1)}function w(a,b,c){a.attachEvent?a.detachEvent("on"+b,c):a.removeEventListener(b,c,!1)}function x(a){a=a||n.event;return a.target||a.srcElement}
function y(a,b){var c=r("SCRIPT"),e=!1,d;c.src=a;c.onload=c.onreadystatechange=function(){d=c.readyState||"complete";e||"loaded"!==d&&"complete"!==d||(e=!0,c.onload=c.onreadystatechange=null,c&&c.parentNode&&c.parentNode.removeChild(c),b&&b())};z.parentNode.appendChild(c)}var z,A=t("SCRIPT");z=A&&A[A.length-1];function ba(){function a(c,e,d,f){e=e.replace(/^\/+/,"/");e+=(~e.indexOf("?")?"&":"?")+"nocache="+ +new ca;B++;var g=n.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");g.onreadystatechange=function(){4===g.readyState&&(B--,d(g))};g.open(c,e,!0);g.send(b(g,c,f));return g}function b(c,e,d){for(var f in C)c.setRequestHeader(f,C[f]);c.setRequestHeader("X-Requested-With","XMLHttpRequest");d&&"object"==typeof d?(c.setRequestHeader("Content-Type","application/json; charset="+q),d=
E(d)):"POST"==e&&c.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset="+q);return d}this.a=function(c,e){a("HEAD",c,e)};B=B||0}var B,C={};var da=Array.prototype.slice;function F(a,b){var c;c|=0;a=G(a);var e=a.length,d=a.indexOf,f=d?d.call(a,b,c):-1;if(!d)for(;c<e&&!~f;c++)f=a[c]===b?c:f;return f}function H(a){var b=Array.isArray;return b?b(a):"[object Array]"===Object.prototype.toString.call(a)}function I(a,b){a=G(a);var c=a.length,e=0,d=0,f=a.filter,g=f?f.call(a,b,void 0):[];if(!f)for(;e<c;)f=a[e++],b.call(void 0,f,e,a)&&(g[d++]=f);return g}
function ea(a,b){a=G(a);var c=a.length,e=0,d=a.forEach;if(d)d.call(a,b,void 0);else for(;e<c;)b.call(void 0,a[e],e++,a)}function G(a){return H(a)?a:da.call(a)};var ca=Date;var E=n.JSON?JSON.stringify:function(a){var b=typeof a,c=[],e;if("object"!==b||null===a)a="string"===b?'"'+a+'"':""+a;else{var d=H(a);for(e in a){var f=a[e];b=typeof f;"string"===b?f='"'+f+'"':"object"===b&&null!==f&&(f=E(f));c.push((d?"":'"'+e+'":')+f)}a=(d?"[":"{")+c+(d?"]":"}")}return a};var J={gtag:1,trackTwitter:1,trackFacebook:1,trackLinkedIn:1,trackDownloads:1,trackOutbound:1,trackForms:1,trackUsers:1,trackActions:1,trackPrint:1,trackMedia:1,trackScroll:1,trackOrientation:1,trackColorScheme:1,nonInteraction:"adblock audio color-scheme form heartbeat orientation print scroll video".split(" "),debugMode:/[?&]debug=1/.test(location.search)},K=/\.([0-9a-z]+)(?:[\?#]|$)/i,L=n.GoogleAnalyticsObject||"ga";
function M(a){var b=fa(G(arguments));if(b){N.gtag?ia(b):O(b);var c=+N.propIndex||0;var e=n.TagLoader||n.AppMeasurement,d=n.s,f=[],g=1;if(e&&d&&d instanceof e){for(;g<b.length;g++)e="prop"+(g+c),f.push(e),d[e]=b[g];d.linkTrackEvents="None";d.linkTrackVars=f.join(",");P([d],"tl",[d,"download"===b[1]?"d":"o",b[0]])}c=b.concat();"social"===c[0]&&(c[1]="social:"+c.splice(2,1,c[1])[0]);c=c.slice(1);P([n],"ClickTaleEvent",[c.join(":")]);P([n],"__utmTrackEvent",c);n._hmt&&P([n._hmt],"push",[["_trackEvent"].concat(c)]);
if(n._gat||n._gaq)c=n._gat&&n._gat._getTrackers&&n._gat._getTrackers(),d=Q(b)?b.concat([1]):b,d[0]={social:"_trackSocial",event:"_trackEvent"}[d[0]],c?P(c,d[0],d.slice(1)):n._gaq&&P([n._gaq],"push",[d]);c=[];d="params";for(var l in n)0==l.indexOf("yaCounter")&&c.push(n[l]);l=b[1];"outbound"===l?(d="extLink",b=[b.pop()]):"download"===l&&(d="file",b=[b.pop()]);P(c,d,b)}}function R(a){if(N.trackDynamicContent)var b=setTimeout(function(){b&&clearTimeout(b);a()},1E3)}
function S(a){a.setAttribute("data-kmt",1)}function T(a){return a.hasAttribute("data-kmt")}function U(a){var b=N.nonInteraction;b&&H(b)&&!(0<=F(b,a))&&b.push(a)}
function ja(){if(!V){var a=function(){N=n._komito||{};for(b in J)b in N||(N[b]=J[b]);W&&new W;X&&new X;Y&&new Y;ka&&new ka;la&&new la;ma&&new ma;na();oa();if(N.trackColorScheme&&n.matchMedia){U("color-scheme");var c=n.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";M(0,"color-scheme",c)}pa();var e=N.trackMedia;c=["html5","vimeo","youtube"];var d;if(e)for(H(e)&&(c=e),d=c.length;d--;)e=c[d].toLowerCase(),"html5"==e?qa&&new qa:"vimeo"==e?ra&&new ra:"youtube"==e&&sa&&new sa;c={trackFacebook:ta,
trackLinkedIn:ua,trackTwitter:va,trackUsers:wa};for(var f in c)N[f]&&new c[f]};V=1;var b=k.readyState;"interactive"===b||"complete"===b?setTimeout(a,1E3):v(n,"DOMContentLoaded",a)}}function O(a){if("function"===typeof n[L]){var b=n[L].getAll&&n[L].getAll(),c=N.trackingIds,e={};b&&c&&(H(c)||(c=[""+c]),b=I(b,function(d){d=d.get("trackingId");return 0<=F(c,d)}));b=I(b,function(d){d=d.get("trackingId");var f=!e[d];e[d]=!0;return f});a=Q(a)?a.concat([{nonInteraction:1}]):a;b&&P(b,"send",a)}}
function ia(a){var b=n.dataLayer;if(H(b)&&0<b.length){var c=a[2],e=function(){b.push(arguments)};"social"===a[0]&&"share"===c?e("event",c,{method:a[1],target:a[3],social_target:a[3]}):e("event",c,{event_category:a[1],event_label:a[3],non_interaction:Q(a)})}else O(a)}function P(a,b,c){var e=a.length;for(xa(b,c);e;){var d=a[--e];"function"===typeof d[b]&&d[b].apply(d,c)}}function xa(a){var b=n.console;N.debugMode&&b&&b.log.apply(b,arguments)}
function Q(a){a=a[1];var b=N.nonInteraction,c;(c=0<=F(b,a))||(c=0<=F(b,a.split(/\W/)[0]));return c}function fa(a){a[0]=a[0]?"social":"event";var b=!0;a={type:a[0],category:a[1],action:a[2],label:a[3],preventDefault:function(){b=!1}};N.onBeforeTrack&&N.onBeforeTrack(a);return b?[a.type,a.category,a.action,a.label]:null}var N={},V;"web.archive.org"!==location.hostname&&ja();function na(){var a=+N.sendHeartbeat;if(a){var b;a=Math.max(a,30);v(k,"visibilitychange",function(){"visible"===k.visibilityState?b=setInterval(function(){M(0,"heartbeat",a+"s")},1E3*a):b&&clearInterval(b)})}}function oa(){var a=N.trackErrorPages&&location.href;a&&(U("errors"),(new ba).a(a,function(b){399<b.status&&M(0,"errors",b.status,a)}))}function pa(){N.trackErrors&&(U("errors"),v(n,"error",function(a){M(0,"errors",a.message,a.filename)}))};function ma(){(function(){if(N.trackAdblock){var a=k.body.appendChild(r("DIV"));a.id="ad-container";a.style.position="absolute";a.innerHTML='<img src="data:image/svg+xml,%3Csvg/%3E" id="ad" class="banner" height="5" width="5">';setTimeout(function(){5>a.offsetHeight&&M(0,"adblock","pageview",location.href);a&&a.parentNode&&a.parentNode.removeChild(a)},1E3)}})()};function W(){function a(){if(N.trackForms)for(var e=k.forms,d=e.length,f;d;)f=e[--d],T(f)||(S(f),v(f,"submit",b));R(a)}function b(e){e=x(e);var d=e.elements,f=d.length,g=0,l=e.getAttribute("action"),h;if(!(h=e.getAttribute("name")||e.getAttribute("id")||e.className.replace(/\W+/g,"-"))&&(h=l)){h=0;for(var m=l.length,p=0,u=0;u<m;)h^=l.charCodeAt(u++)<<p,p+=8,p%=24;h=h.toString(36).toUpperCase()}for(l=h||"form-"+ ++c;g<f;)h=d[g++],h.name&&M(0,"form",l,h.name+":"+(h.type||h.tagName));w(e,"submit",b)}
var c=0;a()};function X(){function a(){for(var h=t("A"),m=h.length,p;m;)if(p=h[--m],!T(p)){S(p);var u=f(p),D=l.test(u);u=(u.match(K)||[""]).pop().toLowerCase();N.trackOutbound&&D&&!~p.hostname.indexOf(location.hostname)&&v(p,"mousedown",b);N.trackDownloads&&u&&~",mp3,mp4,wma,mov,avi,wmv,mkv,eot,woff,ttf,txt,csv,tsv,pdf,doc,docx,xls,xlsx,ppt,pptx,zip,tar,tgz,bz2,gz,rar,dmg,pkg,7z,ida,exe,sh,bat,".indexOf(","+u+",")&&v(p,"mousedown",c);N.trackActions&&!D&&v(p,"mousedown",e)}R(a)}function b(h){h=d(h);var m="outbound",
p=h.hostname,u=h.pathname.split("/"),D=f(h),ha=g[p.replace(/^www\./,"")];M(0,m,p,D);ha&&("twitter.com"===p.substr(-11)&&"intent"===u[u.length-2]&&(m="intent-"+u.pop()),M(1,ha,m,D));w(h,"mousedown",b)}function c(h){h=d(h);var m=f(h),p=(m.match(K)||[""]).pop().toLowerCase();M(0,"download",p,m);w(h,"mousedown",c)}function e(h){h=d(h);var m=h.protocol.slice(0,-1),p=f(h);l.test(p)||(M(0,"cta:"+m,p.slice(m.length+1).split("?")[0],p),w(h,"mousedown",e))}function d(h){for(h=x(h);h&&"A"!==h.tagName;)h=h.parentNode;
return h}function f(h){return h.href||h.getAttribute("href")||""}var g={"plus.google.com":"Google+","plus.url.google.com":"Google+","blogspot.com":"Blogger","facebook.com":"Facebook","on.fb.me":"Facebook","fb.me":"Facebook","fb.com":"Facebook","twitter.com":"Twitter","t.co":"Twitter","linkedin.com":"LinkedIn","myspace.com":"MySpace","vk.com":"VKontakte","odnoklassniki.ru":"Odnoklassniki","xing.com":"Xing","youtube.com":"YouTube","youtu.be":"YouTube","twoo.com":"Twoo","reddit.com":"Reddit","pinterest.com":"Pinterest",
"digg.com":"Digg","4sq.com":"Foursquare","foursquare.com":"Foursquare","hi.baidu.com":"Baidu Space"},l=/^(https?:)?\/\//;a()};function la(){function a(e){M(0,"orientation","change",b(e))}function b(e){var d=screen.orientation||screen.mozOrientation||screen.msOrientation;return(d?d.type:e.matches?"portrait":"landscape").split("-")[0]}var c;(function(){if((aa.maxTouchPoints||"ontouchstart"in k)&&N.trackOrientation){var e=n.matchMedia;c=e&&e("(orientation: portrait)");M(0,"orientation","initial",b(c));c?c.addListener(a):v(n,"orientationchange",a)}})()};function Y(){function a(){M(0,"print",k.title,location.href);b?b.removeListener(a):w(n,"afterprint",a);b=a=null}var b;(function(){if(N.trackPrint){var c=n.matchMedia;(b=c&&c("print"))?b.addListener(a):v(n,"afterprint",a)}})()};function ka(){(function(){var a=N.trackScroll;if(a){var b=[25,50,75,100];H(a)&&(b=a);for(var c=k.documentElement,e=k.body,d={},f=b.length;f--;)d[b[f]]=0;v(n,"scroll",function(){(f=25*~~((c.scrollTop||e.scrollTop)/((c.scrollHeight||e.offsetHeight)-(c.clientHeight||n.innerHeight))*100/25))&&f in d&&!d[f]&&(d[f]=1,M(0,"scroll","depth",f+"%"))})}})()};function qa(){function a(){function c(m){g=x(m);l=m.type;~l.indexOf("fullscreen")&&(l=k.fullScreen||k.mozFullScreen||k.webkitIsFullScreen?"fullscreen":"");l&&M(0,g.tagName.toLowerCase()+":html5",l,g.currentSrc||g.src)}for(var e="ended pause play webkitfullscreenchange mozfullscreenchange fullscreenchange".split(" "),d=b("AUDIO","VIDEO"),f=d.length,g,l,h;f--;)if(g=d[f],!T(g))for(S(g),h=0;6>h;)v(g,e[h++],c);R(a)}function b(c){for(var e=[],d=arguments.length,f,g;d;)for(f=t(arguments[--d]),g=0;g<f.length;)e.push(f[g++]);
return e}a()};function ra(){function a(){for(var d=t("IFRAME"),f=d.length,g=[],l;f;)l=d[--f],e.test(l.src)&&!T(l)&&(S(l),g.push(l));g.length&&(n.Vimeo&&n.Vimeo.Player?b(g):y("https://player.vimeo.com/api/player.js",function(){b(g)}));R(a)}function b(d){var f=n.Vimeo&&n.Vimeo.Player;if(f)for(var g=d.length,l;g;)l=d[--g],c(new f(l),l.src.split("?")[0])}function c(d,f){d.on("ended",function(){M(0,"video:vimeo","ended",f)});d.on("play",function(){M(0,"video:vimeo","play",f)});d.on("pause",function(){M(0,"video:vimeo",
"pause",f)})}var e=/^(https?:)?\/\/player\.vimeo\.com\/video\/\d+/;a()};function sa(){function a(){for(var e=t("IFRAME"),d=e.length,f=[],g,l,h,m;d--;)g=e[d],l=g.src,c.test(l)&&!T(g)&&(S(g),0>l.indexOf("enablejsapi")&&(g.src+=(~l.indexOf("?")?"&":"?")+"enablejsapi=1"),f.push(g));if(d=f.length)m=n.onYouTubeIframeAPIReady,n.onYouTubeIframeAPIReady=function(){for(m&&m();d--;)g=f[d],h=n.YT.get(g.id)||new n.YT.Player(g),v(h,"onStateChange",b)},n.YT||y("https://www.youtube.com/iframe_api");R(a)}function b(e){var d=["ended","play","pause"][e.data];d&&(e=e.target,e=e.getVideoUrl?
e.getVideoUrl():e.getIframe().src.split("?")[0],M(0,"video:youtube",d,e))}var c=/^(https?:)?\/\/(www\.)?youtube(\-nocookie)?\.com\/(embed|watch|v)/;a()};function ta(){ya(function(){v(n,"blur",function(){var a=k.activeElement;a&&"IFRAME"==a.tagName&&0==a.src.indexOf("https://www.facebook.com/")&&(a=a.title.split(" ")[0],0==a.indexOf("fb:")&&(a=a.slice(3).split("_")[0],M(1,"Facebook",a,location.href)))})})}var Z,za;
function ya(a){if(!za&&(za=1,!n.FB)){var b=Z;if(!b){if(b=N.trackFacebook)if(b=""+b,9>b.length)for(var c=G(t("META")),e=c.length,d;e--;)if(d=c[e],"fb:app_id"==d.getAttribute("property")){b=d.getAttribute("content");break}Z=9>b.length?"":b}if(b=Z)c=r("SCRIPT"),c.async=1,c.id="facebook-jssdk",c.src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2&status=1&cookie=1&appId="+b,k.body.appendChild(c),setTimeout(a,3E3)}b||a()};function ua(){function a(){for(var e=t("SCRIPT"),d=e.length,f=0,g,l;f<d;)g=e[f++],l=(g.getAttribute("type")||"").toLowerCase(),l.indexOf("in/")||b(g,l.substr(3).split("+")[0]);R(a)}function b(e,d){if(!T(e)){var f=function(){c[d]||(c[d]=1,M(1,"LinkedIn",d,location.href),l&&w(l,"click",f))};S(e);var g=["cb_onsuccess",d,+new Date].join("_"),l;e.onsuccess=(e.onsuccess?e.onsuccess+",":"")+g;e.setAttribute("data-onsuccess",g);n[g]=f;setTimeout(function(){(l=e.previousSibling)&&"IN-widget"===l.className&&
v(l,"click",f)},1E3)}}var c={};a()};function va(){function a(){9>e++&&(n.twttr&&n.twttr.ready?n.twttr.ready(function(f){var g=N.trackTwitter,l,h,m;g=H(g)?g:b;ea(g,function(p){f.events.bind(p,function(u){l=u.type;d[l]||(d[l]=1,h=(m=c[l])&&u.data&&u.data[m]||location.href,M(1,"Twitter",l,h))})})}):setTimeout(a,5E3))}var b=["tweet","retweet","like","follow"],c={follow:"screen_name",retweet:"source_tweet_id",like:"tweet_id",tweet:"url"},e=0,d={};a()};function wa(){var a={Google:"https://accounts.google.com/CheckCookie?continue=https%3A%2F%2Fwww.google.com%2Fintl%2Fen%2Fimages%2Flogos%2Faccounts_logo.png&amp;followup=https%3A%2F%2Fwww.google.com%2Fintl%2Fen%2Fimages%2Flogos%2Faccounts_logo.png&amp;chtml=LoginDoneHtml&amp;checkedDomains=youtube&amp;checkConnection=youtube%3A291%3A1"};(function(){function b(h,m){v(h,"load",function(){M(1,m,"pageview",location.href)});h.src=a[m]}function c(h){h(function(m){m&&"unknown"!==m.status&&!d++&&M(1,"Facebook",
"pageview",location.href)},!0)}function e(){var h=n.FB&&n.FB.getLoginStatus;h?(c(h),v(n,"message",function(m){try{"facebook.com"===m.origin.substr(-12)&&m.data&&~m.data.indexOf("xd_action=proxy_ready")&&c(h)}catch(p){}})):--f&&setTimeout(e,2E3)}var d=0,f=5,g;for(g in a){var l=new Image(1,1);b(l,g)}ya(e)})()};
})();
