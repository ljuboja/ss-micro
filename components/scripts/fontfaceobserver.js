(function(){'use strict';function e(a){this.a=document.createElement("div");this.a.setAttribute("aria-hidden","true");this.a.appendChild(document.createTextNode(a));this.b=document.createElement("span");this.c=document.createElement("span");this.f=document.createElement("span");this.e=document.createElement("span");this.d=-1;this.b.style.cssText="display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;";this.c.style.cssText="display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;";
this.e.style.cssText="display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;";this.f.style.cssText="display:inline-block;width:200%;height:200%;";this.b.appendChild(this.f);this.c.appendChild(this.e);this.a.appendChild(this.b);this.a.appendChild(this.c)}function t(a,b,c){a.a.style.cssText="min-width:20px;min-height:20px;display:inline-block;visibility:hidden;position:absolute;width:auto;margin:0;padding:0;top:0;white-space:nowrap;font-size:100px;font-family:"+b+";"+c}
function u(a){var b=a.a.offsetWidth,c=b+100;a.e.style.width=c+"px";a.c.scrollLeft=c;a.b.scrollLeft=a.b.scrollWidth+100;return a.d!==b?(a.d=b,!0):!1}function v(a,b){a.b.addEventListener("scroll",function(){u(a)&&null!==a.a.parentNode&&b(a.d)},!1);a.c.addEventListener("scroll",function(){u(a)&&null!==a.a.parentNode&&b(a.d)},!1);u(a)};function w(a,b){this.family=a;this.style=b.style||"normal";this.variant=b.variant||"normal";this.weight=b.weight||"normal";this.stretch=b.stretch||"stretch";this.featureSettings=b.featureSettings||"normal"}var x=null;
w.prototype.a=function(a,b){var c=a||"BESbswy",z=b||3E3,f="font-style:"+this.style+";font-variant:"+this.variant+";font-weight:"+this.weight+";font-stretch:"+this.stretch+";font-feature-settings:"+this.featureSettings+";-moz-font-feature-settings:"+this.featureSettings+";-webkit-font-feature-settings:"+this.featureSettings+";",g=document.createElement("div"),m=new e(c),n=new e(c),p=new e(c),h=-1,d=-1,k=-1,q=-1,r=-1,s=-1,l=this;t(m,"sans-serif",f);t(n,"serif",f);t(p,"monospace",f);g.appendChild(m.a);
g.appendChild(n.a);g.appendChild(p.a);document.body.appendChild(g);q=m.a.offsetWidth;r=n.a.offsetWidth;s=p.a.offsetWidth;return new Promise(function(a,b){function c(){null!==g.parentNode&&document.body.removeChild(g)}function y(){if(-1!==h&&-1!==d&&-1!==k&&h===d&&d===k){if(null===x){var b=/AppleWeb[kK]it\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);x=!!b&&(536>parseInt(b[1],10)||536===parseInt(b[1],10)&&11>=parseInt(b[2],10))}x?h===q&&d===q&&k===q||h===r&&d===r&&k===r||h===s&&d===s&&
k===s||(c(),a(l)):(c(),a(l))}}setTimeout(function(){c();b(l)},z);v(m,function(a){h=a;y()});t(m,l.family+",sans-serif",f);v(n,function(a){d=a;y()});t(n,l.family+",serif",f);v(p,function(a){k=a;y()});t(p,l.family+",monospace",f)})};window.FontFaceObserver=w;window.FontFaceObserver.prototype.check=w.prototype.a;}());
