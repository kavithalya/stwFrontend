_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[282],{"4enZ":function(t,e,a){"use strict";a.r(e);var n=a("jT3O"),r=a("q1tI"),i=a.n(r),c=a("1Yj4"),o=a("ok1R"),s=a("rhny"),u=a("UU0N"),l=a("DCcX"),d=a("CaDr"),m=a("VX74"),f=a("lTCR"),p=a.n(f),b=a("XJI2"),g=a("/5QC"),y=a("EO2r"),v=a("U8OX"),N=a("20a2"),h=i.a.createElement;function O(){var t=Object(n.a)(["\n    query  products($type:_CategoryType!,$indexFrom:Int! ,$limit:Int!) {\n        products (type: $type,indexFrom:$indexFrom ,limit:$limit){\n            items {\n                id\n                title\n                description\n                type\n                brand\n                category \n                price\n                new\n                stock\n                sale\n                discount\n                variants{\n                    id\n                    sku\n                    size\n                    color\n                    image_id\n                }\n                images{\n                    image_id\n                    id\n                    alt\n                    src\n                }\n            }\n        }\n    }\n"]);return O=function(){return t},t}var C=p()(O());e.default=function(){var t=Object(N.useRouter)(),e=Object(r.useContext)(b.b),a=Object(r.useContext)(y.c),n=Object(r.useContext)(v.a),f=e.state.symbol,p=(e.state,Object(r.useContext)(g.a)),O=p.addToCart,j=p.quantity,w=p.plusQty,k=p.minusQty,I=p.setQuantity,S=Object(r.useState)(),x=S[0],F=S[1],_=Object(r.useState)(""),E=_[0],A=(_[1],Object(r.useState)(!1)),T=A[0],q=A[1],P=function(){return q(!T)},z=[],X=function(e){var a=e.title.split(" ").join("");t.push("/product-details/".concat(e.id)+"-"+"".concat(a))},J=Object(m.useQuery)(C,{variables:{type:"fashion",indexFrom:0,limit:8}}),W=J.loading,$=J.data;return h("section",{className:"section-b-space ratio_asos"},h(c.a,null,h(o.a,null,h(s.a,{className:"product-related"},h("h2",null,"related products"))),h(o.a,{className:"search-product"},$&&$.products&&0!==$.products.items.length&&!W?h(i.a.Fragment,null,$&&$.products.items.slice(0,6).map((function(t,e){return h(s.a,{xl:"2",md:"4",sm:"6",key:e},h("div",{className:"product-box"},h("div",{className:"img-wrapper"},h("div",{className:"front"},h("a",{href:null},h(u.a,{onClick:function(){return X(t)},src:t.images[0].src,className:"img-fluid blur-up lazyload bg-img",alt:""}))),h("div",{className:"back"},h("a",{href:null},h(u.a,{src:t.images[1].src,className:"img-fluid blur-up lazyload bg-img",alt:""}))),h("div",{className:"cart-info cart-wrap"},h("button",{"data-toggle":"modal","data-target":"#addtocart",title:"Add to cart",onClick:function(){return O(t,j)}},h("i",{className:"fa fa-shopping-cart"})),h("a",{href:"#",onClick:function(){return a.addToWish(t)},title:"Add to Wishlist"},h("i",{className:"fa fa-heart","aria-hidden":"true"})),h("a",{href:"#",onClick:function(){return F(t),void P()},"data-toggle":"modal","data-target":"#quick-view",title:"Quick View"},h("i",{className:"fa fa-search","aria-hidden":"true"})),h("a",{href:"#",onClick:function(){return n.addToCompare(t)},title:"Compare"},h("i",{className:"fa fa-refresh","aria-hidden":"true"})))),h("div",{className:"product-detail"},h("div",{className:"rating"},h("i",{className:"fa fa-star"})," ",h("i",{className:"fa fa-star"})," ",h("i",{className:"fa fa-star"})," ",h("i",{className:"fa fa-star"})," ",h("i",{className:"fa fa-star"})),h("a",{href:null},h("h6",null,t.title)),h("h4",null,f,t.price),h("ul",{className:"color-variant"},h("li",{className:"bg-light0"}),h("li",{className:"bg-light1"}),h("li",{className:"bg-light2"})))))}))):"loading"),x?h(l.a,{isOpen:T,toggle:P,className:"modal-lg quickview-modal",centered:!0},h(d.a,null,h(o.a,null,h(s.a,{lg:"6",xs:"12"},h("div",{className:"quick-view-img"},h(u.a,{src:"".concat(x.variants&&E||x.images[0].src),alt:"",className:"img-fluid"}))),h(s.a,{lg:"6",className:"rtl-text"},h("div",{className:"product-right"},h("h2",null," ",x.title," "),h("h3",null,'"$" ',(1*x.price).toFixed(2)),x.variants?h("ul",{className:"color-variant"},z?h("ul",{className:"color-variant"},"jewellery"===x.type||"nursery"===x.type||"beauty"===x.type||"electronics"===x.type||"goggles"===x.type||"watch"===x.type||"pets"===x.type?"":h(i.a.Fragment,null,z?h("ul",{className:"color-variant"},z.map((function(t,e){return h("li",{className:t.color,key:e,title:t.color,onClick:function(){return variantChangeByColor(t.image_id,x.images)}})}))):"")):""):"",h("div",{className:"border-product"},h("h6",{className:"product-title"},"product details"),h("p",null,x.description)),h("div",{className:"product-description border-product"},x.size?h("div",{className:"size-box"},h("ul",null,x.size.map((function(t,e){return h("li",{key:e},h("a",{href:null},t))})))):"",h("h6",{className:"product-title"},"quantity"),h("div",{className:"qty-box"},h("div",{className:"input-group"},h("span",{className:"input-group-prepend"},h("button",{type:"button",className:"btn quantity-left-minus",onClick:k,"data-type":"minus","data-field":""},h("i",{className:"fa fa-angle-left"}))),h("input",{type:"text",name:"quantity",value:j,onChange:function(t){I(parseInt(t.target.value))},className:"form-control input-number"}),h("span",{className:"input-group-prepend"},h("button",{type:"button",className:"btn quantity-right-plus",onClick:function(){return w(x)},"data-type":"plus","data-field":""},h("i",{className:"fa fa-angle-right"})))))),h("div",{className:"product-buttons"},h("button",{className:"btn btn-solid",onClick:function(){return O(x,j)}},"add to cart"),h("button",{className:"btn btn-solid",onClick:function(){return X(x)}},"View detail"))))))):""))}},"Dj+e":function(t,e,a){"use strict";a.r(e);var n=a("q1tI"),r=a.n(n),i=a("ncOK"),c=a("4enZ"),o=a("gy5E"),s=a("ktJU"),u=r.a.createElement;e.default=Object(o.a)((function(){return u(i.a,{parent:"home",title:"product"},u(s.default,{pathId:"1"}),u(c.default,null))}))},EO2r:function(t,e,a){"use strict";a.d(e,"a",(function(){return u})),a.d(e,"b",(function(){return l}));var n=a("z7pX"),r=a("q1tI"),i=a.n(r),c=a("FGyW"),o=a("EO2r");a.d(e,"c",(function(){return o.a})),a.d(e,"d",(function(){return o.b}));var s=i.a.createElement,u=Object(r.createContext)({wishlistItems:Function,addToWish:Function,removeFromWish:Function}),l=function(t){var e=Object(r.useState)(function(){try{var t=localStorage.getItem("wishlist");return null===t?[]:JSON.parse(t)}catch(e){return[]}}()),a=e[0],i=e[1];Object(r.useEffect)((function(){localStorage.setItem("wishlist",JSON.stringify(a))}),[a]);t.value;return s(u.Provider,{value:{wishlistItems:a,addToWish:function(t){-1===a.findIndex((function(e){return e.id===t.id}))?(c.b.success("Product Added Successfully !"),i([].concat(Object(n.a)(a),[t]))):c.b.error("This Product Already Added !")},removeFromWish:function(t){i(a.filter((function(e){return e.id!==t.id}))),c.b.error("Product Removed Successfully !")}}},t.children)}},PPDz:function(t,e,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/product-details/vertical_tab",function(){return a("Dj+e")}])},U8OX:function(t,e,a){"use strict";a.d(e,"c",(function(){return u})),a.d(e,"d",(function(){return l}));var n=a("z7pX"),r=a("q1tI"),i=a.n(r),c=a("FGyW"),o=a("U8OX");a.d(e,"a",(function(){return o.c})),a.d(e,"b",(function(){return o.d}));var s=i.a.createElement,u=Object(r.createContext)({compareItems:Function,addToCompare:Function,removeFromComapre:Function}),l=function(t){var e=Object(r.useState)(function(){try{var t=localStorage.getItem("compare");return null===t?[]:JSON.parse(t)}catch(e){return[]}}()),a=e[0],i=e[1];Object(r.useEffect)((function(){localStorage.setItem("compare",JSON.stringify(a))}),[a]);t.value;return s(u.Provider,{value:{compareItems:a,addToCompare:function(t){-1===a.findIndex((function(e){return e.id===t.id}))?(c.b.success("Product Added Successfully !"),i([].concat(Object(n.a)(a),[t]))):c.b.error("This Product Already Added !")},removeFromComapre:function(t){i(a.filter((function(e){return e.id!==t.id}))),c.b.error("Product Removed Successfully !")}}},t.children)}},z7pX:function(t,e,a){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,n=new Array(e);a<e;a++)n[a]=t[a];return n}function r(t){return function(t){if(Array.isArray(t))return n(t)}(t)||function(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(t){if("string"===typeof t)return n(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(t):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?n(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}a.d(e,"a",(function(){return r}))}},[["PPDz",1,0,11,2,3,4,5,6,8,7,9,10,12,13,14,15,16,17,18,32]]]);