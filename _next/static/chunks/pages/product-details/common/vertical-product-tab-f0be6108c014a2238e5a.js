_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[259],{"/pOw":function(t,e,n){"use strict";n.r(e);var a=n("q1tI"),r=n.n(a),o=n("1Yj4"),i=n("ok1R"),s=n("rhny"),c=n("9a8N"),u=n("F66N"),l=n("arvA"),d=n("Czwy"),f=n("EzvR"),p=r.a.createElement;e.default=function(){var t=Object(a.useState)("1"),e=t[0],n=t[1];return p("section",{className:"tab-product m-0 vertical-tab"},p(o.a,{className:"p-0"},p(i.a,{className:"tab-border"},p(s.a,{xl:"2",className:"p-0"},p(c.a,{className:"nav nav-tabs nav-material flex-column nav-border",id:"top-tab",role:"tablist"},p(u.a,{className:"nav-item"},p(l.a,{className:"1"===e?"active":"",onClick:function(){return n("1")}},"Description")),p(u.a,{className:"nav-item"},p(l.a,{className:"2"===e?"active":"",onClick:function(){return n("2")}},"Reviews")),p(u.a,{className:"nav-item"},p(l.a,{className:"3"===e?"active":"",onClick:function(){return n("3")}},"Product tags")))),p(s.a,{xl:"10"},p(d.a,{activeTab:e,className:"nav-material",id:"top-tabContent"},p(f.a,{tabId:"1"},p("p",null,"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")),p(f.a,{tabId:"2"},p("p",null,"No reviews yet")),p(f.a,{tabId:"3"},p("p",null,"black, block1, blue, cotton, purple, skirts, top, under-100, versace, woman")))))))}},"1Yj4":function(t,e,n){"use strict";var a=n("wx14"),r=n("zLVn"),o=n("q1tI"),i=n.n(o),s=n("17x9"),c=n.n(s),u=n("TSYQ"),l=n.n(u),d=n("33Jr"),f={tag:d.o,fluid:c.a.oneOfType([c.a.bool,c.a.string]),className:c.a.string,cssModule:c.a.object},p=function(t){var e=t.className,n=t.cssModule,o=t.fluid,s=t.tag,c=Object(r.a)(t,["className","cssModule","fluid","tag"]),u="container";!0===o?u="container-fluid":o&&(u="container-"+o);var f=Object(d.k)(l()(e,u),n);return i.a.createElement(s,Object(a.a)({},c,{className:f}))};p.propTypes=f,p.defaultProps={tag:"div"},e.a=p},"33Jr":function(t,e,n){"use strict";n.d(e,"n",(function(){return i})),n.d(e,"g",(function(){return s})),n.d(e,"e",(function(){return c})),n.d(e,"k",(function(){return u})),n.d(e,"l",(function(){return l})),n.d(e,"m",(function(){return d})),n.d(e,"q",(function(){return p})),n.d(e,"p",(function(){return v})),n.d(e,"o",(function(){return m})),n.d(e,"c",(function(){return g})),n.d(e,"a",(function(){return y})),n.d(e,"b",(function(){return h})),n.d(e,"j",(function(){return j})),n.d(e,"d",(function(){return w})),n.d(e,"i",(function(){return O})),n.d(e,"h",(function(){return T})),n.d(e,"f",(function(){return k}));var a,r=n("17x9"),o=n.n(r);function i(t){document.body.style.paddingRight=t>0?t+"px":null}function s(){var t=window.getComputedStyle(document.body,null);return parseInt(t&&t.getPropertyValue("padding-right")||0,10)}function c(){var t=function(){var t=document.createElement("div");t.style.position="absolute",t.style.top="-9999px",t.style.width="50px",t.style.height="50px",t.style.overflow="scroll",document.body.appendChild(t);var e=t.offsetWidth-t.clientWidth;return document.body.removeChild(t),e}(),e=document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top")[0],n=e?parseInt(e.style.paddingRight||0,10):0;document.body.clientWidth<window.innerWidth&&i(n+t)}function u(t,e){return void 0===t&&(t=""),void 0===e&&(e=a),e?t.split(" ").map((function(t){return e[t]||t})).join(" "):t}function l(t,e){var n={};return Object.keys(t).forEach((function(a){-1===e.indexOf(a)&&(n[a]=t[a])})),n}function d(t,e){for(var n,a=Array.isArray(e)?e:[e],r=a.length,o={};r>0;)o[n=a[r-=1]]=t[n];return o}var f={};function p(t){f[t]||("undefined"!==typeof console&&console.error(t),f[t]=!0)}var b="object"===typeof window&&window.Element||function(){};var v=o.a.oneOfType([o.a.string,o.a.func,function(t,e,n){if(!(t[e]instanceof b))return new Error("Invalid prop `"+e+"` supplied to `"+n+"`. Expected prop to be an instance of Element. Validation failed.")},o.a.shape({current:o.a.any})]),m=o.a.oneOfType([o.a.func,o.a.string,o.a.shape({$$typeof:o.a.symbol,render:o.a.func}),o.a.arrayOf(o.a.oneOfType([o.a.func,o.a.string,o.a.shape({$$typeof:o.a.symbol,render:o.a.func})]))]),g={Fade:150,Collapse:350,Modal:300,Carousel:600},y=["in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","onEnter","onEntering","onEntered","onExit","onExiting","onExited"],h={ENTERING:"entering",ENTERED:"entered",EXITING:"exiting",EXITED:"exited"},j={esc:27,space:32,enter:13,tab:9,up:38,down:40,home:36,end:35,n:78,p:80},w=!("undefined"===typeof window||!window.document||!window.document.createElement);function x(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":Object.prototype.toString.call(t)}function O(t){var e=typeof t;return null!=t&&("object"===e||"function"===e)}function N(t){if(function(t){return!(!t||"object"!==typeof t)&&"current"in t}(t))return t.current;if(function(t){if(!O(t))return!1;var e=x(t);return"[object Function]"===e||"[object AsyncFunction]"===e||"[object GeneratorFunction]"===e||"[object Proxy]"===e}(t))return t();if("string"===typeof t&&w){var e=document.querySelectorAll(t);if(e.length||(e=document.querySelectorAll("#"+t)),!e.length)throw new Error("The target '"+t+"' could not be identified in the dom, tip: check spelling");return e}return t}function E(t){return null!==t&&(Array.isArray(t)||w&&"number"===typeof t.length)}function T(t,e){var n=N(t);return e?E(n)?n:null===n?[]:[n]:E(n)?n[0]:n}var k=["a[href]","area[href]","input:not([disabled]):not([type=hidden])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","object","embed","[tabindex]:not(.modal)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])']},"9a8N":function(t,e,n){"use strict";var a=n("wx14"),r=n("zLVn"),o=n("q1tI"),i=n.n(o),s=n("17x9"),c=n.n(s),u=n("TSYQ"),l=n.n(u),d=n("33Jr"),f={tabs:c.a.bool,pills:c.a.bool,vertical:c.a.oneOfType([c.a.bool,c.a.string]),horizontal:c.a.string,justified:c.a.bool,fill:c.a.bool,navbar:c.a.bool,card:c.a.bool,tag:d.o,className:c.a.string,cssModule:c.a.object},p=function(t){var e=t.className,n=t.cssModule,o=t.tabs,s=t.pills,c=t.vertical,u=t.horizontal,f=t.justified,p=t.fill,b=t.navbar,v=t.card,m=t.tag,g=Object(r.a)(t,["className","cssModule","tabs","pills","vertical","horizontal","justified","fill","navbar","card","tag"]),y=Object(d.k)(l()(e,b?"navbar-nav":"nav",!!u&&"justify-content-"+u,function(t){return!1!==t&&(!0===t||"xs"===t?"flex-column":"flex-"+t+"-column")}(c),{"nav-tabs":o,"card-header-tabs":v&&o,"nav-pills":s,"card-header-pills":v&&s,"nav-justified":f,"nav-fill":p}),n);return i.a.createElement(m,Object(a.a)({},g,{className:y}))};p.propTypes=f,p.defaultProps={tag:"ul",vertical:!1},e.a=p},Czwy:function(t,e,n){"use strict";var a=n("wx14"),r=n("dI71"),o=n("q1tI"),i=n.n(o),s=n("17x9"),c=n.n(s),u=n("TSYQ"),l=n.n(u),d=n("I8YG"),f=n("33Jr"),p={tag:f.o,activeTab:c.a.any,className:c.a.string,cssModule:c.a.object},b=function(t){function e(e){var n;return(n=t.call(this,e)||this).state={activeTab:n.props.activeTab},n}return Object(r.a)(e,t),e.getDerivedStateFromProps=function(t,e){return e.activeTab!==t.activeTab?{activeTab:t.activeTab}:null},e.prototype.render=function(){var t=this.props,e=t.className,n=t.cssModule,r=t.tag,o=Object(f.l)(this.props,Object.keys(p)),s=Object(f.k)(l()("tab-content",e),n);return i.a.createElement(d.a.Provider,{value:{activeTabId:this.state.activeTab}},i.a.createElement(r,Object(a.a)({},o,{className:s})))},e}(o.Component);e.a=b,b.propTypes=p,b.defaultProps={tag:"div"}},EzvR:function(t,e,n){"use strict";n.d(e,"a",(function(){return b}));var a=n("wx14"),r=n("zLVn"),o=n("q1tI"),i=n.n(o),s=n("17x9"),c=n.n(s),u=n("TSYQ"),l=n.n(u),d=n("I8YG"),f=n("33Jr"),p={tag:f.o,className:c.a.string,cssModule:c.a.object,tabId:c.a.any};function b(t){var e=t.className,n=t.cssModule,o=t.tabId,s=t.tag,c=Object(r.a)(t,["className","cssModule","tabId","tag"]),u=function(t){return Object(f.k)(l()("tab-pane",e,{active:o===t}),n)};return i.a.createElement(d.a.Consumer,null,(function(t){var e=t.activeTabId;return i.a.createElement(s,Object(a.a)({},c,{className:u(e)}))}))}b.propTypes=p,b.defaultProps={tag:"div"}},F66N:function(t,e,n){"use strict";var a=n("wx14"),r=n("zLVn"),o=n("q1tI"),i=n.n(o),s=n("17x9"),c=n.n(s),u=n("TSYQ"),l=n.n(u),d=n("33Jr"),f={tag:d.o,active:c.a.bool,className:c.a.string,cssModule:c.a.object},p=function(t){var e=t.className,n=t.cssModule,o=t.active,s=t.tag,c=Object(r.a)(t,["className","cssModule","active","tag"]),u=Object(d.k)(l()(e,"nav-item",!!o&&"active"),n);return i.a.createElement(s,Object(a.a)({},c,{className:u}))};p.propTypes=f,p.defaultProps={tag:"li"},e.a=p},I8YG:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var a=n("q1tI"),r=n.n(a).a.createContext({})},JX7q:function(t,e,n){"use strict";function a(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}n.d(e,"a",(function(){return a}))},Qetd:function(t,e,n){"use strict";var a=Object.assign.bind(Object);t.exports=a,t.exports.default=t.exports},TSYQ:function(t,e,n){var a;!function(){"use strict";var n={}.hasOwnProperty;function r(){for(var t=[],e=0;e<arguments.length;e++){var a=arguments[e];if(a){var o=typeof a;if("string"===o||"number"===o)t.push(a);else if(Array.isArray(a)&&a.length){var i=r.apply(null,a);i&&t.push(i)}else if("object"===o)for(var s in a)n.call(a,s)&&a[s]&&t.push(s)}}return t.join(" ")}t.exports?(r.default=r,t.exports=r):void 0===(a=function(){return r}.apply(e,[]))||(t.exports=a)}()},arvA:function(t,e,n){"use strict";var a=n("wx14"),r=n("zLVn"),o=n("JX7q"),i=n("dI71"),s=n("q1tI"),c=n.n(s),u=n("17x9"),l=n.n(u),d=n("TSYQ"),f=n.n(d),p=n("33Jr"),b={tag:p.o,innerRef:l.a.oneOfType([l.a.object,l.a.func,l.a.string]),disabled:l.a.bool,active:l.a.bool,className:l.a.string,cssModule:l.a.object,onClick:l.a.func,href:l.a.any},v=function(t){function e(e){var n;return(n=t.call(this,e)||this).onClick=n.onClick.bind(Object(o.a)(n)),n}Object(i.a)(e,t);var n=e.prototype;return n.onClick=function(t){this.props.disabled?t.preventDefault():("#"===this.props.href&&t.preventDefault(),this.props.onClick&&this.props.onClick(t))},n.render=function(){var t=this.props,e=t.className,n=t.cssModule,o=t.active,i=t.tag,s=t.innerRef,u=Object(r.a)(t,["className","cssModule","active","tag","innerRef"]),l=Object(p.k)(f()(e,"nav-link",{disabled:u.disabled,active:o}),n);return c.a.createElement(i,Object(a.a)({},u,{ref:s,onClick:this.onClick,className:l}))},e}(c.a.Component);v.propTypes=b,v.defaultProps={tag:"a"},e.a=v},cj0I:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/product-details/common/vertical-product-tab",function(){return n("/pOw")}])},dI71:function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var a=n("s4An");function r(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,Object(a.a)(t,e)}},ok1R:function(t,e,n){"use strict";var a=n("wx14"),r=n("zLVn"),o=n("q1tI"),i=n.n(o),s=n("17x9"),c=n.n(s),u=n("TSYQ"),l=n.n(u),d=n("33Jr"),f=c.a.oneOfType([c.a.number,c.a.string]),p={tag:d.o,noGutters:c.a.bool,className:c.a.string,cssModule:c.a.object,form:c.a.bool,xs:f,sm:f,md:f,lg:f,xl:f},b={tag:"div",widths:["xs","sm","md","lg","xl"]},v=function(t){var e=t.className,n=t.cssModule,o=t.noGutters,s=t.tag,c=t.form,u=t.widths,f=Object(r.a)(t,["className","cssModule","noGutters","tag","form","widths"]),p=[];u.forEach((function(e,n){var a=t[e];if(delete f[e],a){var r=!n;p.push(r?"row-cols-"+a:"row-cols-"+e+"-"+a)}}));var b=Object(d.k)(l()(e,o?"no-gutters":null,c?"form-row":"row",p),n);return i.a.createElement(s,Object(a.a)({},f,{className:b}))};v.propTypes=p,v.defaultProps=b,e.a=v},rhny:function(t,e,n){"use strict";var a=n("wx14"),r=n("zLVn"),o=n("q1tI"),i=n.n(o),s=n("17x9"),c=n.n(s),u=n("TSYQ"),l=n.n(u),d=n("33Jr"),f=c.a.oneOfType([c.a.number,c.a.string]),p=c.a.oneOfType([c.a.bool,c.a.number,c.a.string,c.a.shape({size:c.a.oneOfType([c.a.bool,c.a.number,c.a.string]),order:f,offset:f})]),b={tag:d.o,xs:p,sm:p,md:p,lg:p,xl:p,className:c.a.string,cssModule:c.a.object,widths:c.a.array},v={tag:"div",widths:["xs","sm","md","lg","xl"]},m=function(t,e,n){return!0===n||""===n?t?"col":"col-"+e:"auto"===n?t?"col-auto":"col-"+e+"-auto":t?"col-"+n:"col-"+e+"-"+n},g=function(t){var e=t.className,n=t.cssModule,o=t.widths,s=t.tag,c=Object(r.a)(t,["className","cssModule","widths","tag"]),u=[];o.forEach((function(e,a){var r=t[e];if(delete c[e],r||""===r){var o=!a;if(Object(d.i)(r)){var i,s=o?"-":"-"+e+"-",f=m(o,e,r.size);u.push(Object(d.k)(l()(((i={})[f]=r.size||""===r.size,i["order"+s+r.order]=r.order||0===r.order,i["offset"+s+r.offset]=r.offset||0===r.offset,i)),n))}else{var p=m(o,e,r);u.push(p)}}})),u.length||u.push("col");var f=Object(d.k)(l()(e,u),n);return i.a.createElement(s,Object(a.a)({},c,{className:f}))};g.propTypes=b,g.defaultProps=v,e.a=g},s4An:function(t,e,n){"use strict";function a(t,e){return(a=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}n.d(e,"a",(function(){return a}))},wx14:function(t,e,n){"use strict";function a(){return(a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t}).apply(this,arguments)}n.d(e,"a",(function(){return a}))},zLVn:function(t,e,n){"use strict";function a(t,e){if(null==t)return{};var n,a,r={},o=Object.keys(t);for(a=0;a<o.length;a++)n=o[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}n.d(e,"a",(function(){return a}))}},[["cj0I",1,0]]]);