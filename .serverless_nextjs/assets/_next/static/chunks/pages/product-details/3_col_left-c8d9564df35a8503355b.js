_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[243],{"/hLU":function(t,a,e){"use strict";e.r(a);var n=e("HALo"),r=e("jT3O"),l=e("q1tI"),i=e.n(l),c=e("1Yj4"),s=e("ok1R"),o=e("rhny"),u=e("UU0N"),d=e("OS56"),m=e.n(d),f=e("lTCR"),p=e.n(f),b=e("VX74"),g=(e("RGkR"),e("rgQu")),v=e("D/Lk"),N=e("TMPb"),h=e("XJI2"),y=e("/5QC"),O=i.a.createElement;function C(){var t=Object(r.a)(["\n    query product ($id:Int!) {\n        product (id:$id) {\n            id\n            title\n            description\n            type\n            brand\n            category \n            price\n            new\n            sale\n            discount\n            stock\n            variants\n            {\n                id\n                color\n                image_id\n                variant_id\n                size\n            }\n            images\n            {\n                image_id\n                src\n            }\n        }\n    }\n"]);return C=function(){return t},t}var j=p()(C());a.default=function(){Object(l.useContext)(y.a).addToCart;var t=Object(l.useContext)(h.b).state.symbol,a=Object(l.useState)({nav1:null,nav2:null}),e=a[0],r=a[1],i=Object(l.useRef)(),d=Object(l.useRef)(),f=Object(b.useQuery)(j,{variables:{id:1}}),p=f.loading,C=f.data;Object(l.useEffect)((function(){r({nav1:i.current,nav2:d.current})}),[C]);var k=e.nav1,w=e.nav2;return O("section",null,O("div",{className:"collection-wrapper"},O(c.a,null,C&&C.product&&0!==C.product.length&&!p?O(s.a,null,O(o.a,{lg:"1",sm:"2",xs:"12",className:"p-0 pb-cls-slider"},O(m.a,Object(n.a)({className:"slider-nav"},{slidesToShow:3,swipeToSlide:!0,arrows:!1,dots:!1,vertical:!0,focusOnSelect:!0},{asNavFor:k,ref:function(t){return d.current=t}}),C.product.variants?C.product.images.map((function(t,a){return O("div",{key:a},O(u.a,{src:"".concat(t.src),key:a,alt:t.alt,className:"img-fluid"}))})):"")),O(o.a,{lg:"3",sm:"10",xs:"12",className:"order-up"},O(s.a,null,O(o.a,null,O(m.a,Object(n.a)({},{slidesToShow:1,slidesToScroll:1,dots:!1,arrows:!0,fade:!0},{asNavFor:w,ref:function(t){return i.current=t},className:"product-right-slick"}),(C.product.variants,C.product.images.map((function(t,a){return O("div",{key:a},O(g.default,{image:t}))}))))))),O(o.a,{lg:"4"},O(N.default,{item:C.product})),O(o.a,{lg:"4"},O(v.default,{symbol:t,item:C.product,changeColorVar:function(t){d.current.slickGoTo(t)}}))):"loading")))}},"0+lY":function(t,a,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/product-details/3_col_left",function(){return e("Uz/0")}])},"4enZ":function(t,a,e){"use strict";e.r(a);var n=e("jT3O"),r=e("q1tI"),l=e.n(r),i=e("1Yj4"),c=e("ok1R"),s=e("rhny"),o=e("UU0N"),u=e("DCcX"),d=e("CaDr"),m=e("VX74"),f=e("lTCR"),p=e.n(f),b=e("XJI2"),g=e("/5QC"),v=e("EO2r"),N=e("U8OX"),h=e("20a2"),y=l.a.createElement;function O(){var t=Object(n.a)(["\n    query  products($type:_CategoryType!,$indexFrom:Int! ,$limit:Int!) {\n        products (type: $type,indexFrom:$indexFrom ,limit:$limit){\n            items {\n                id\n                title\n                description\n                type\n                brand\n                category \n                price\n                new\n                stock\n                sale\n                discount\n                variants{\n                    id\n                    sku\n                    size\n                    color\n                    image_id\n                }\n                images{\n                    image_id\n                    id\n                    alt\n                    src\n                }\n            }\n        }\n    }\n"]);return O=function(){return t},t}var C=p()(O());a.default=function(){var t=Object(h.useRouter)(),a=Object(r.useContext)(b.b),e=Object(r.useContext)(v.c),n=Object(r.useContext)(N.a),f=a.state.symbol,p=(a.state,Object(r.useContext)(g.a)),O=p.addToCart,j=p.quantity,k=p.plusQty,w=p.minusQty,x=p.setQuantity,T=Object(r.useState)(),S=T[0],I=T[1],_=Object(r.useState)(""),q=_[0],E=(_[1],Object(r.useState)(!1)),z=E[0],F=E[1],A=function(){return F(!z)},U=[],R=function(a){var e=a.title.split(" ").join("");t.push("/product-details/".concat(a.id)+"-"+"".concat(e))},P=Object(m.useQuery)(C,{variables:{type:"fashion",indexFrom:0,limit:8}}),Q=P.loading,X=P.data;return y("section",{className:"section-b-space ratio_asos"},y(i.a,null,y(c.a,null,y(s.a,{className:"product-related"},y("h2",null,"related products"))),y(c.a,{className:"search-product"},X&&X.products&&0!==X.products.items.length&&!Q?y(l.a.Fragment,null,X&&X.products.items.slice(0,6).map((function(t,a){return y(s.a,{xl:"2",md:"4",sm:"6",key:a},y("div",{className:"product-box"},y("div",{className:"img-wrapper"},y("div",{className:"front"},y("a",{href:null},y(o.a,{onClick:function(){return R(t)},src:t.images[0].src,className:"img-fluid blur-up lazyload bg-img",alt:""}))),y("div",{className:"back"},y("a",{href:null},y(o.a,{src:t.images[1].src,className:"img-fluid blur-up lazyload bg-img",alt:""}))),y("div",{className:"cart-info cart-wrap"},y("button",{"data-toggle":"modal","data-target":"#addtocart",title:"Add to cart",onClick:function(){return O(t,j)}},y("i",{className:"fa fa-shopping-cart"})),y("a",{href:"#",onClick:function(){return e.addToWish(t)},title:"Add to Wishlist"},y("i",{className:"fa fa-heart","aria-hidden":"true"})),y("a",{href:"#",onClick:function(){return I(t),void A()},"data-toggle":"modal","data-target":"#quick-view",title:"Quick View"},y("i",{className:"fa fa-search","aria-hidden":"true"})),y("a",{href:"#",onClick:function(){return n.addToCompare(t)},title:"Compare"},y("i",{className:"fa fa-refresh","aria-hidden":"true"})))),y("div",{className:"product-detail"},y("div",{className:"rating"},y("i",{className:"fa fa-star"})," ",y("i",{className:"fa fa-star"})," ",y("i",{className:"fa fa-star"})," ",y("i",{className:"fa fa-star"})," ",y("i",{className:"fa fa-star"})),y("a",{href:null},y("h6",null,t.title)),y("h4",null,f,t.price),y("ul",{className:"color-variant"},y("li",{className:"bg-light0"}),y("li",{className:"bg-light1"}),y("li",{className:"bg-light2"})))))}))):"loading"),S?y(u.a,{isOpen:z,toggle:A,className:"modal-lg quickview-modal",centered:!0},y(d.a,null,y(c.a,null,y(s.a,{lg:"6",xs:"12"},y("div",{className:"quick-view-img"},y(o.a,{src:"".concat(S.variants&&q||S.images[0].src),alt:"",className:"img-fluid"}))),y(s.a,{lg:"6",className:"rtl-text"},y("div",{className:"product-right"},y("h2",null," ",S.title," "),y("h3",null,'"$" ',(1*S.price).toFixed(2)),S.variants?y("ul",{className:"color-variant"},U?y("ul",{className:"color-variant"},"jewellery"===S.type||"nursery"===S.type||"beauty"===S.type||"electronics"===S.type||"goggles"===S.type||"watch"===S.type||"pets"===S.type?"":y(l.a.Fragment,null,U?y("ul",{className:"color-variant"},U.map((function(t,a){return y("li",{className:t.color,key:a,title:t.color,onClick:function(){return variantChangeByColor(t.image_id,S.images)}})}))):"")):""):"",y("div",{className:"border-product"},y("h6",{className:"product-title"},"product details"),y("p",null,S.description)),y("div",{className:"product-description border-product"},S.size?y("div",{className:"size-box"},y("ul",null,S.size.map((function(t,a){return y("li",{key:a},y("a",{href:null},t))})))):"",y("h6",{className:"product-title"},"quantity"),y("div",{className:"qty-box"},y("div",{className:"input-group"},y("span",{className:"input-group-prepend"},y("button",{type:"button",className:"btn quantity-left-minus",onClick:w,"data-type":"minus","data-field":""},y("i",{className:"fa fa-angle-left"}))),y("input",{type:"text",name:"quantity",value:j,onChange:function(t){x(parseInt(t.target.value))},className:"form-control input-number"}),y("span",{className:"input-group-prepend"},y("button",{type:"button",className:"btn quantity-right-plus",onClick:function(){return k(S)},"data-type":"plus","data-field":""},y("i",{className:"fa fa-angle-right"})))))),y("div",{className:"product-buttons"},y("button",{className:"btn btn-solid",onClick:function(){return O(S,j)}},"add to cart"),y("button",{className:"btn btn-solid",onClick:function(){return R(S)}},"View detail"))))))):""))}},CaDr:function(t,a,e){"use strict";var n=e("wx14"),r=e("zLVn"),l=e("q1tI"),i=e.n(l),c=e("17x9"),s=e.n(c),o=e("TSYQ"),u=e.n(o),d=e("33Jr"),m={tag:d.o,className:s.a.string,cssModule:s.a.object},f=function(t){var a=t.className,e=t.cssModule,l=t.tag,c=Object(r.a)(t,["className","cssModule","tag"]),s=Object(d.k)(u()(a,"modal-body"),e);return i.a.createElement(l,Object(n.a)({},c,{className:s}))};f.propTypes=m,f.defaultProps={tag:"div"},a.a=f},"D/Lk":function(t,a,e){"use strict";e.r(a);var n=e("jT3O"),r=e("q1tI"),l=e.n(r),i=(e("OS56"),e("L3zb")),c=e("JtKs"),s=(e("xTE4"),e("/5QC")),o=e("XJI2"),u=e("lTCR"),d=e.n(u),m=l.a.createElement;function f(){var t=Object(n.a)(["\n    query product ($id:Int!) {\n        product (id:$id) {\n            id\n            title\n            description\n            type\n            brand\n            category \n            price\n            new\n            sale\n            discount\n            stock\n            variants{\n              id\n              sku\n              size\n              color\n              image_id\n            }\n            images{\n              alt\n              src\n            }\n        }\n    }\n"]);return f=function(){return t},t}d()(f());a.default=function(t){var a=t.item,e=t.changeColorVar,n=Object(r.useState)(!1),l=(n[0],n[1],Object(r.useContext)(o.b).state.symbol),u=Object(r.useState)(!1),d=(u[0],u[1],Object(r.useContext)(s.a)),f=d.addToCart,p=d.plusQty,b=d.minusQty,g=d.quantity,v=[],N=[];return m("div",{className:"product-right product-form-box"},m("h4",null,m("del",null,a.price,"%"),m("span",null,a.discount,"% off")),m("h3",null,l,a.price),m("ul",null,a.variants.map((function(t){v.find((function(a){return a.color===t.color}))||v.push(t),N.find((function(a){return a===t.size}))||N.push(t.size)})),v?m("ul",{className:"color-variant"},v.map((function(t,a){return m("li",{className:t.color,key:a,title:t.color,onClick:function(){return e(a)}})}))):""),m("div",{className:"product-description border-product"},m("h6",{className:"product-title"},"Time Reminder"),m(c.a,null),m("h6",{className:"product-title"},"select size"),a.variants?m("div",null,m("div",{className:"size-box"},m("ul",null,N.map((function(t,a){return m("li",{key:a},m("a",{href:null},t))}))))):"",m("h6",{className:"product-title"},"quantity"),m("div",{className:"qty-box"},m("div",{className:"input-group"},m("span",{className:"input-group-prepend"},m("button",{type:"button",className:"btn quantity-left-minus",onClick:b,"data-type":"minus","data-field":""},m("i",{className:"fa fa-angle-left"}))),m(i.a,{type:"text",name:"quantity",value:g,onChange:function(t){setQuantity(parseInt(t.target.value))},className:"form-control input-number"}),m("span",{className:"input-group-prepend"},m("button",{type:"button",className:"btn quantity-right-plus",onClick:function(){return p(a)},"data-type":"plus","data-field":""},m("i",{className:"fa fa-angle-right"})))))),m("div",{className:"product-buttons"},m("a",{href:null,"data-toggle":"modal","data-target":"#addtocart",onClick:function(){return f(a,g)},className:"btn btn-solid"},"add to cart")," ",m("a",{href:"#",className:"btn btn-solid"},"buy now")))}},EO2r:function(t,a,e){"use strict";e.d(a,"a",(function(){return o})),e.d(a,"b",(function(){return u}));var n=e("z7pX"),r=e("q1tI"),l=e.n(r),i=e("FGyW"),c=e("EO2r");e.d(a,"c",(function(){return c.a})),e.d(a,"d",(function(){return c.b}));var s=l.a.createElement,o=Object(r.createContext)({wishlistItems:Function,addToWish:Function,removeFromWish:Function}),u=function(t){var a=Object(r.useState)(function(){try{var t=localStorage.getItem("wishlist");return null===t?[]:JSON.parse(t)}catch(a){return[]}}()),e=a[0],l=a[1];Object(r.useEffect)((function(){localStorage.setItem("wishlist",JSON.stringify(e))}),[e]);t.value;return s(o.Provider,{value:{wishlistItems:e,addToWish:function(t){-1===e.findIndex((function(a){return a.id===t.id}))?(i.b.success("Product Added Successfully !"),l([].concat(Object(n.a)(e),[t]))):i.b.error("This Product Already Added !")},removeFromWish:function(t){l(e.filter((function(a){return a.id!==t.id}))),i.b.error("Product Removed Successfully !")}}},t.children)}},HALo:function(t,a,e){"use strict";function n(){return(n=Object.assign||function(t){for(var a=1;a<arguments.length;a++){var e=arguments[a];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])}return t}).apply(this,arguments)}e.d(a,"a",(function(){return n}))},RGkR:function(t,a,e){"use strict";var n=e("q1tI"),r=Object(n.createContext)();a.a=r},TMPb:function(t,a,e){"use strict";e.r(a);var n=e("q1tI"),r=e.n(n),l=e("JzZ/"),i=e.n(l),c=e("dtqM"),s=e.n(c),o=e("k2Z+"),u=e.n(o),d=e("zUnT"),m=e.n(d),f=e("T8au"),p=e.n(f),b=e("UU0N"),g=r.a.createElement;a.default=function(t){var a=t.item;return g("div",{className:"product-right product-description-box"},g("h2",null,a.title),g("div",{className:"border-product"},g("h6",{className:"product-title"},"product details"),g("p",null,a.description)),g("div",{className:"single-product-tables border-product detail-section"},g("table",null,g("tbody",null,g("tr",null,g("td",null,"Febric:"),g("td",null,"Chiffon")),g("tr",null,g("td",null,"Color:"),g("td",null,"Red")),g("tr",null,g("td",null,"Material:"),g("td",null,"Crepe printed"))))),g("div",{className:"border-product"},g("h6",{className:"product-title"},"share it"),g("div",{className:"product-icon"},g("ul",{className:"product-social"},g("li",null,g("a",{href:"https://www.facebook.com",target:"_blank"},g("i",{className:"fa fa-facebook"}))),g("li",null,g("a",{href:"https://plus.google.com",target:"_blank"},g("i",{className:"fa fa-google-plus"}))),g("li",null,g("a",{href:"https://twitter.com",target:"_blank"},g("i",{className:"fa fa-twitter"}))),g("li",null,g("a",{href:"https://www.instagram.com",target:"_blank"},g("i",{className:"fa fa-instagram"}))),g("li",null,g("a",{href:"https://rss.com",target:"_blank"},g("i",{className:"fa fa-rss"})))),g("form",{className:"d-inline-block"},g("button",{className:"wishlist-btn"},g("i",{className:"fa fa-heart"}),g("span",{className:"title-font"},"Add To WishList"))))),g("div",{className:"border-product"},g("h6",{className:"product-title"},"100% SECURE PAYMENT"),g("div",{className:"payment-card-bottom"},g("ul",null,g("li",null,g("a",{href:"#"},g(b.a,{src:i.a,alt:""}))),g("li",null,g("a",{href:"#"},g(b.a,{src:s.a,alt:""}))),g("li",null,g("a",{href:"#"},g(b.a,{src:u.a,alt:""}))),g("li",null,g("a",{href:"#"},g(b.a,{src:m.a,alt:""}))),g("li",null,g("a",{href:"#"},g(b.a,{src:p.a,alt:""})))))))}},U8OX:function(t,a,e){"use strict";e.d(a,"c",(function(){return o})),e.d(a,"d",(function(){return u}));var n=e("z7pX"),r=e("q1tI"),l=e.n(r),i=e("FGyW"),c=e("U8OX");e.d(a,"a",(function(){return c.c})),e.d(a,"b",(function(){return c.d}));var s=l.a.createElement,o=Object(r.createContext)({compareItems:Function,addToCompare:Function,removeFromComapre:Function}),u=function(t){var a=Object(r.useState)(function(){try{var t=localStorage.getItem("compare");return null===t?[]:JSON.parse(t)}catch(a){return[]}}()),e=a[0],l=a[1];Object(r.useEffect)((function(){localStorage.setItem("compare",JSON.stringify(e))}),[e]);t.value;return s(o.Provider,{value:{compareItems:e,addToCompare:function(t){-1===e.findIndex((function(a){return a.id===t.id}))?(i.b.success("Product Added Successfully !"),l([].concat(Object(n.a)(e),[t]))):i.b.error("This Product Already Added !")},removeFromComapre:function(t){l(e.filter((function(a){return a.id!==t.id}))),i.b.error("Product Removed Successfully !")}}},t.children)}},"Uz/0":function(t,a,e){"use strict";e.r(a);var n=e("q1tI"),r=e.n(n),l=(e("20a2"),e("ncOK")),i=e("4enZ"),c=e("gy5E"),s=e("/hLU"),o=r.a.createElement;a.default=Object(c.a)((function(){return o(l.a,{parent:"home",title:"product"},o(s.default,null),o(i.default,null))}))},rgQu:function(t,a,e){"use strict";e.r(a);var n=e("q1tI"),r=e.n(n),l=e("UU0N"),i=r.a.createElement;a.default=function(t){var a=t.image;return i(l.a,{src:"".concat(a.src),alt:a.alt,className:"img-fluid image_zoom_cls-0"})}},xTE4:function(t,a){t.exports="/_next/static/images/size-chart-27d5967a8cdfebf70b190ed5c6dd9bac.jpg"},z7pX:function(t,a,e){"use strict";function n(t,a){(null==a||a>t.length)&&(a=t.length);for(var e=0,n=new Array(a);e<a;e++)n[e]=t[e];return n}function r(t){return function(t){if(Array.isArray(t))return n(t)}(t)||function(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,a){if(t){if("string"===typeof t)return n(t,a);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?n(t,a):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}e.d(a,"a",(function(){return r}))}},[["0+lY",1,0,11,2,3,4,5,6,8,7,9,10,12,13,14,15,16,17,18]]]);