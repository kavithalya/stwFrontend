_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[176],{"1Yj4":function(n,e,t){"use strict";var r=t("wx14"),o=t("zLVn"),a=t("q1tI"),i=t.n(a),u=t("17x9"),s=t.n(u),c=t("TSYQ"),l=t.n(c),d=t("33Jr"),f={tag:d.o,fluid:s.a.oneOfType([s.a.bool,s.a.string]),className:s.a.string,cssModule:s.a.object},p=function(n){var e=n.className,t=n.cssModule,a=n.fluid,u=n.tag,s=Object(o.a)(n,["className","cssModule","fluid","tag"]),c="container";!0===a?c="container-fluid":a&&(c="container-"+a);var f=Object(d.k)(l()(e,c),t);return i.a.createElement(u,Object(r.a)({},s,{className:f}))};p.propTypes=f,p.defaultProps={tag:"div"},e.a=p},"33Jr":function(n,e,t){"use strict";t.d(e,"n",(function(){return i})),t.d(e,"g",(function(){return u})),t.d(e,"e",(function(){return s})),t.d(e,"k",(function(){return c})),t.d(e,"l",(function(){return l})),t.d(e,"m",(function(){return d})),t.d(e,"q",(function(){return p})),t.d(e,"p",(function(){return h})),t.d(e,"o",(function(){return m})),t.d(e,"c",(function(){return y})),t.d(e,"a",(function(){return v})),t.d(e,"b",(function(){return g})),t.d(e,"j",(function(){return w})),t.d(e,"d",(function(){return x})),t.d(e,"i",(function(){return E})),t.d(e,"h",(function(){return T})),t.d(e,"f",(function(){return k}));var r,o=t("17x9"),a=t.n(o);function i(n){document.body.style.paddingRight=n>0?n+"px":null}function u(){var n=window.getComputedStyle(document.body,null);return parseInt(n&&n.getPropertyValue("padding-right")||0,10)}function s(){var n=function(){var n=document.createElement("div");n.style.position="absolute",n.style.top="-9999px",n.style.width="50px",n.style.height="50px",n.style.overflow="scroll",document.body.appendChild(n);var e=n.offsetWidth-n.clientWidth;return document.body.removeChild(n),e}(),e=document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top")[0],t=e?parseInt(e.style.paddingRight||0,10):0;document.body.clientWidth<window.innerWidth&&i(t+n)}function c(n,e){return void 0===n&&(n=""),void 0===e&&(e=r),e?n.split(" ").map((function(n){return e[n]||n})).join(" "):n}function l(n,e){var t={};return Object.keys(n).forEach((function(r){-1===e.indexOf(r)&&(t[r]=n[r])})),t}function d(n,e){for(var t,r=Array.isArray(e)?e:[e],o=r.length,a={};o>0;)a[t=r[o-=1]]=n[t];return a}var f={};function p(n){f[n]||("undefined"!==typeof console&&console.error(n),f[n]=!0)}var b="object"===typeof window&&window.Element||function(){};var h=a.a.oneOfType([a.a.string,a.a.func,function(n,e,t){if(!(n[e]instanceof b))return new Error("Invalid prop `"+e+"` supplied to `"+t+"`. Expected prop to be an instance of Element. Validation failed.")},a.a.shape({current:a.a.any})]),m=a.a.oneOfType([a.a.func,a.a.string,a.a.shape({$$typeof:a.a.symbol,render:a.a.func}),a.a.arrayOf(a.a.oneOfType([a.a.func,a.a.string,a.a.shape({$$typeof:a.a.symbol,render:a.a.func})]))]),y={Fade:150,Collapse:350,Modal:300,Carousel:600},v=["in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","onEnter","onEntering","onEntered","onExit","onExiting","onExited"],g={ENTERING:"entering",ENTERED:"entered",EXITING:"exiting",EXITED:"exited"},w={esc:27,space:32,enter:13,tab:9,up:38,down:40,home:36,end:35,n:78,p:80},x=!("undefined"===typeof window||!window.document||!window.document.createElement);function j(n){return null==n?void 0===n?"[object Undefined]":"[object Null]":Object.prototype.toString.call(n)}function E(n){var e=typeof n;return null!=n&&("object"===e||"function"===e)}function O(n){if(function(n){return!(!n||"object"!==typeof n)&&"current"in n}(n))return n.current;if(function(n){if(!E(n))return!1;var e=j(n);return"[object Function]"===e||"[object AsyncFunction]"===e||"[object GeneratorFunction]"===e||"[object Proxy]"===e}(n))return n();if("string"===typeof n&&x){var e=document.querySelectorAll(n);if(e.length||(e=document.querySelectorAll("#"+n)),!e.length)throw new Error("The target '"+n+"' could not be identified in the dom, tip: check spelling");return e}return n}function N(n){return null!==n&&(Array.isArray(n)||x&&"number"===typeof n.length)}function T(n,e){var t=O(n);return e?N(t)?t:null===t?[]:[t]:N(t)?t[0]:t}var k=["a[href]","area[href]","input:not([disabled]):not([type=hidden])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","object","embed","[tabindex]:not(.modal)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])']},"7PPy":function(n,e,t){"use strict";t.r(e);var r=t("q1tI"),o=t.n(r),a=t("OS56"),i=t.n(a),u=t("1Yj4"),s=t("ok1R"),c=t("rhny"),l=o.a.createElement;e.default=function(){return l(r.Fragment,null,l("section",{className:"p-0"},l(i.a,{className:"slide-1 home-slider"},l("div",null,l("div",{className:"home home39 text-center"},l(u.a,null,l(s.a,null,l(c.a,null,l("div",{className:"slider-contain"},l("div",null,l("h4",null,"save 10%"),l("h1",null,"fresh vegetables"),l("a",{href:null,className:"btn btn-solid"},"shop now")))))))),l("div",null,l("div",{className:"home home38 text-center"},l(u.a,null,l(s.a,null,l(c.a,null,l("div",{className:"slider-contain"},l("div",null,l("h4",null,"save upto 10%"),l("h1",null,"fresh vegetables"),l("a",{href:null,className:"btn btn-solid"},"shop now")))))))))))}},Qetd:function(n,e,t){"use strict";var r=Object.assign.bind(Object);n.exports=r,n.exports.default=n.exports},TSYQ:function(n,e,t){var r;!function(){"use strict";var t={}.hasOwnProperty;function o(){for(var n=[],e=0;e<arguments.length;e++){var r=arguments[e];if(r){var a=typeof r;if("string"===a||"number"===a)n.push(r);else if(Array.isArray(r)&&r.length){var i=o.apply(null,r);i&&n.push(i)}else if("object"===a)for(var u in r)t.call(r,u)&&r[u]&&n.push(u)}}return n.join(" ")}n.exports?(o.default=o,n.exports=o):void 0===(r=function(){return o}.apply(e,[]))||(n.exports=r)}()},"Xq5+":function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/layouts/Vegetables/components/Banner",function(){return t("7PPy")}])},ntbh:function(n,e){(function(e){n.exports=function(){var n={149:function(n){var e;e=function(){return this}();try{e=e||new Function("return this")()}catch(t){"object"===typeof window&&(e=window)}n.exports=e}},t={};function r(e){if(t[e])return t[e].exports;var o=t[e]={exports:{}},a=!0;try{n[e](o,o.exports,r),a=!1}finally{a&&delete t[e]}return o.exports}return r.ab=e+"/",r(149)}()}).call(this,"/")},ok1R:function(n,e,t){"use strict";var r=t("wx14"),o=t("zLVn"),a=t("q1tI"),i=t.n(a),u=t("17x9"),s=t.n(u),c=t("TSYQ"),l=t.n(c),d=t("33Jr"),f=s.a.oneOfType([s.a.number,s.a.string]),p={tag:d.o,noGutters:s.a.bool,className:s.a.string,cssModule:s.a.object,form:s.a.bool,xs:f,sm:f,md:f,lg:f,xl:f},b={tag:"div",widths:["xs","sm","md","lg","xl"]},h=function(n){var e=n.className,t=n.cssModule,a=n.noGutters,u=n.tag,s=n.form,c=n.widths,f=Object(o.a)(n,["className","cssModule","noGutters","tag","form","widths"]),p=[];c.forEach((function(e,t){var r=n[e];if(delete f[e],r){var o=!t;p.push(o?"row-cols-"+r:"row-cols-"+e+"-"+r)}}));var b=Object(d.k)(l()(e,a?"no-gutters":null,s?"form-row":"row",p),t);return i.a.createElement(u,Object(r.a)({},f,{className:b}))};h.propTypes=p,h.defaultProps=b,e.a=h},rhny:function(n,e,t){"use strict";var r=t("wx14"),o=t("zLVn"),a=t("q1tI"),i=t.n(a),u=t("17x9"),s=t.n(u),c=t("TSYQ"),l=t.n(c),d=t("33Jr"),f=s.a.oneOfType([s.a.number,s.a.string]),p=s.a.oneOfType([s.a.bool,s.a.number,s.a.string,s.a.shape({size:s.a.oneOfType([s.a.bool,s.a.number,s.a.string]),order:f,offset:f})]),b={tag:d.o,xs:p,sm:p,md:p,lg:p,xl:p,className:s.a.string,cssModule:s.a.object,widths:s.a.array},h={tag:"div",widths:["xs","sm","md","lg","xl"]},m=function(n,e,t){return!0===t||""===t?n?"col":"col-"+e:"auto"===t?n?"col-auto":"col-"+e+"-auto":n?"col-"+t:"col-"+e+"-"+t},y=function(n){var e=n.className,t=n.cssModule,a=n.widths,u=n.tag,s=Object(o.a)(n,["className","cssModule","widths","tag"]),c=[];a.forEach((function(e,r){var o=n[e];if(delete s[e],o||""===o){var a=!r;if(Object(d.i)(o)){var i,u=a?"-":"-"+e+"-",f=m(a,e,o.size);c.push(Object(d.k)(l()(((i={})[f]=o.size||""===o.size,i["order"+u+o.order]=o.order||0===o.order,i["offset"+u+o.offset]=o.offset||0===o.offset,i)),t))}else{var p=m(a,e,o);c.push(p)}}})),c.length||c.push("col");var f=Object(d.k)(l()(e,c),t);return i.a.createElement(u,Object(r.a)({},s,{className:f}))};y.propTypes=b,y.defaultProps=h,e.a=y},wx14:function(n,e,t){"use strict";function r(){return(r=Object.assign||function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n}).apply(this,arguments)}t.d(e,"a",(function(){return r}))},zLVn:function(n,e,t){"use strict";function r(n,e){if(null==n)return{};var t,r,o={},a=Object.keys(n);for(r=0;r<a.length;r++)t=a[r],e.indexOf(t)>=0||(o[t]=n[t]);return o}t.d(e,"a",(function(){return r}))}},[["Xq5+",1,0,7]]]);