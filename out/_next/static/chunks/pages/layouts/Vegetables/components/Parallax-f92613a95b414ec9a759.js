_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[178],{"0CpL":function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/layouts/Vegetables/components/Parallax",function(){return t("9rHB")}])},"1Yj4":function(n,e,t){"use strict";var r=t("wx14"),o=t("zLVn"),a=t("q1tI"),i=t.n(a),u=t("17x9"),c=t.n(u),s=t("TSYQ"),l=t.n(s),d=t("33Jr"),f={tag:d.o,fluid:c.a.oneOfType([c.a.bool,c.a.string]),className:c.a.string,cssModule:c.a.object},p=function(n){var e=n.className,t=n.cssModule,a=n.fluid,u=n.tag,c=Object(o.a)(n,["className","cssModule","fluid","tag"]),s="container";!0===a?s="container-fluid":a&&(s="container-"+a);var f=Object(d.k)(l()(e,s),t);return i.a.createElement(u,Object(r.a)({},c,{className:f}))};p.propTypes=f,p.defaultProps={tag:"div"},e.a=p},"33Jr":function(n,e,t){"use strict";t.d(e,"n",(function(){return i})),t.d(e,"g",(function(){return u})),t.d(e,"e",(function(){return c})),t.d(e,"k",(function(){return s})),t.d(e,"l",(function(){return l})),t.d(e,"m",(function(){return d})),t.d(e,"q",(function(){return p})),t.d(e,"p",(function(){return m})),t.d(e,"o",(function(){return y})),t.d(e,"c",(function(){return h})),t.d(e,"a",(function(){return g})),t.d(e,"b",(function(){return v})),t.d(e,"j",(function(){return w})),t.d(e,"d",(function(){return x})),t.d(e,"i",(function(){return E})),t.d(e,"h",(function(){return T})),t.d(e,"f",(function(){return k}));var r,o=t("17x9"),a=t.n(o);function i(n){document.body.style.paddingRight=n>0?n+"px":null}function u(){var n=window.getComputedStyle(document.body,null);return parseInt(n&&n.getPropertyValue("padding-right")||0,10)}function c(){var n=function(){var n=document.createElement("div");n.style.position="absolute",n.style.top="-9999px",n.style.width="50px",n.style.height="50px",n.style.overflow="scroll",document.body.appendChild(n);var e=n.offsetWidth-n.clientWidth;return document.body.removeChild(n),e}(),e=document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top")[0],t=e?parseInt(e.style.paddingRight||0,10):0;document.body.clientWidth<window.innerWidth&&i(t+n)}function s(n,e){return void 0===n&&(n=""),void 0===e&&(e=r),e?n.split(" ").map((function(n){return e[n]||n})).join(" "):n}function l(n,e){var t={};return Object.keys(n).forEach((function(r){-1===e.indexOf(r)&&(t[r]=n[r])})),t}function d(n,e){for(var t,r=Array.isArray(e)?e:[e],o=r.length,a={};o>0;)a[t=r[o-=1]]=n[t];return a}var f={};function p(n){f[n]||("undefined"!==typeof console&&console.error(n),f[n]=!0)}var b="object"===typeof window&&window.Element||function(){};var m=a.a.oneOfType([a.a.string,a.a.func,function(n,e,t){if(!(n[e]instanceof b))return new Error("Invalid prop `"+e+"` supplied to `"+t+"`. Expected prop to be an instance of Element. Validation failed.")},a.a.shape({current:a.a.any})]),y=a.a.oneOfType([a.a.func,a.a.string,a.a.shape({$$typeof:a.a.symbol,render:a.a.func}),a.a.arrayOf(a.a.oneOfType([a.a.func,a.a.string,a.a.shape({$$typeof:a.a.symbol,render:a.a.func})]))]),h={Fade:150,Collapse:350,Modal:300,Carousel:600},g=["in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","onEnter","onEntering","onEntered","onExit","onExiting","onExited"],v={ENTERING:"entering",ENTERED:"entered",EXITING:"exiting",EXITED:"exited"},w={esc:27,space:32,enter:13,tab:9,up:38,down:40,home:36,end:35,n:78,p:80},x=!("undefined"===typeof window||!window.document||!window.document.createElement);function j(n){return null==n?void 0===n?"[object Undefined]":"[object Null]":Object.prototype.toString.call(n)}function E(n){var e=typeof n;return null!=n&&("object"===e||"function"===e)}function O(n){if(function(n){return!(!n||"object"!==typeof n)&&"current"in n}(n))return n.current;if(function(n){if(!E(n))return!1;var e=j(n);return"[object Function]"===e||"[object AsyncFunction]"===e||"[object GeneratorFunction]"===e||"[object Proxy]"===e}(n))return n();if("string"===typeof n&&x){var e=document.querySelectorAll(n);if(e.length||(e=document.querySelectorAll("#"+n)),!e.length)throw new Error("The target '"+n+"' could not be identified in the dom, tip: check spelling");return e}return n}function N(n){return null!==n&&(Array.isArray(n)||x&&"number"===typeof n.length)}function T(n,e){var t=O(n);return e?N(t)?t:null===t?[]:[t]:N(t)?t[0]:t}var k=["a[href]","area[href]","input:not([disabled]):not([type=hidden])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","object","embed","[tabindex]:not(.modal)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])']},"9rHB":function(n,e,t){"use strict";t.r(e);var r=t("q1tI"),o=t.n(r),a=t("1Yj4"),i=t("ok1R"),u=t("rhny"),c=o.a.createElement;e.default=function(){return c(r.Fragment,null,c("section",{className:"p-0"},c("div",{className:"full-banner parallax-banner15 parallax text-left p-left"},c(a.a,null,c(i.a,null,c(u.a,null,c("div",{className:"banner-contain"},c("h2",null,"2021"),c("h3",null,"food market"),c("h4",null,"special offer"))))))))}},Qetd:function(n,e,t){"use strict";var r=Object.assign.bind(Object);n.exports=r,n.exports.default=n.exports},TSYQ:function(n,e,t){var r;!function(){"use strict";var t={}.hasOwnProperty;function o(){for(var n=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var a=typeof r;if("string"===a||"number"===a)n.push(r);else if(Array.isArray(r)&&r.length){var i=o.apply(null,r);i&&n.push(i)}else if("object"===a)for(var u in r)t.call(r,u)&&r[u]&&n.push(u)}}return n.join(" ")}n.exports?(o.default=o,n.exports=o):void 0===(r=function(){return o}.apply(e,[]))||(n.exports=r)}()},ok1R:function(n,e,t){"use strict";var r=t("wx14"),o=t("zLVn"),a=t("q1tI"),i=t.n(a),u=t("17x9"),c=t.n(u),s=t("TSYQ"),l=t.n(s),d=t("33Jr"),f=c.a.oneOfType([c.a.number,c.a.string]),p={tag:d.o,noGutters:c.a.bool,className:c.a.string,cssModule:c.a.object,form:c.a.bool,xs:f,sm:f,md:f,lg:f,xl:f},b={tag:"div",widths:["xs","sm","md","lg","xl"]},m=function(n){var e=n.className,t=n.cssModule,a=n.noGutters,u=n.tag,c=n.form,s=n.widths,f=Object(o.a)(n,["className","cssModule","noGutters","tag","form","widths"]),p=[];s.forEach((function(e,t){var r=n[e];if(delete f[e],r){var o=!t;p.push(o?"row-cols-"+r:"row-cols-"+e+"-"+r)}}));var b=Object(d.k)(l()(e,a?"no-gutters":null,c?"form-row":"row",p),t);return i.a.createElement(u,Object(r.a)({},f,{className:b}))};m.propTypes=p,m.defaultProps=b,e.a=m},rhny:function(n,e,t){"use strict";var r=t("wx14"),o=t("zLVn"),a=t("q1tI"),i=t.n(a),u=t("17x9"),c=t.n(u),s=t("TSYQ"),l=t.n(s),d=t("33Jr"),f=c.a.oneOfType([c.a.number,c.a.string]),p=c.a.oneOfType([c.a.bool,c.a.number,c.a.string,c.a.shape({size:c.a.oneOfType([c.a.bool,c.a.number,c.a.string]),order:f,offset:f})]),b={tag:d.o,xs:p,sm:p,md:p,lg:p,xl:p,className:c.a.string,cssModule:c.a.object,widths:c.a.array},m={tag:"div",widths:["xs","sm","md","lg","xl"]},y=function(n,e,t){return!0===t||""===t?n?"col":"col-"+e:"auto"===t?n?"col-auto":"col-"+e+"-auto":n?"col-"+t:"col-"+e+"-"+t},h=function(n){var e=n.className,t=n.cssModule,a=n.widths,u=n.tag,c=Object(o.a)(n,["className","cssModule","widths","tag"]),s=[];a.forEach((function(e,r){var o=n[e];if(delete c[e],o||""===o){var a=!r;if(Object(d.i)(o)){var i,u=a?"-":"-"+e+"-",f=y(a,e,o.size);s.push(Object(d.k)(l()(((i={})[f]=o.size||""===o.size,i["order"+u+o.order]=o.order||0===o.order,i["offset"+u+o.offset]=o.offset||0===o.offset,i)),t))}else{var p=y(a,e,o);s.push(p)}}})),s.length||s.push("col");var f=Object(d.k)(l()(e,s),t);return i.a.createElement(u,Object(r.a)({},c,{className:f}))};h.propTypes=b,h.defaultProps=m,e.a=h},wx14:function(n,e,t){"use strict";function r(){return(r=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n}).apply(this,arguments)}t.d(e,"a",(function(){return r}))},zLVn:function(n,e,t){"use strict";function r(n,e){if(null==n)return{};var t,r,o={},a=Object.keys(n);for(r=0;r<a.length;r++)t=a[r],e.indexOf(t)>=0||(o[t]=n[t]);return o}t.d(e,"a",(function(){return r}))}},[["0CpL",1,0]]]);