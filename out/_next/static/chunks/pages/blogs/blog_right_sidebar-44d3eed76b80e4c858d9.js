_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[64],{bavT:function(l,e,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blogs/blog_right_sidebar",function(){return a("hlzR")}])},hlzR:function(l,e,a){"use strict";a.r(e);var n=a("q1tI"),i=a.n(n),t=a("1Yj4"),s=a("ok1R"),u=a("ncOK"),o=a("ie52"),c=a("ij6E"),r=a("gy5E"),d=i.a.createElement;e.default=Object(r.a)((function(){return d(u.a,{parent:"blog",title:"blog right sidebar"},d("section",{className:"section-b-space blog-page ratio2_3"},d(t.a,null,d(s.a,null,d("div",{className:"col-xl-9 col-lg-8 col-md-7"},d(o.default,null)),d(c.default,null)))))}))},ie52:function(l,e,a){"use strict";a.r(e);var n=a("jT3O"),i=a("q1tI"),t=a.n(i),s=a("ok1R"),u=a("rhny"),o=a("UU0N"),c=a("lTCR"),r=a.n(c),d=a("VX74"),m=t.a.createElement;function g(){var l=Object(n.a)(["\nquery blog ($type:String!) {\n    blog(type:$type){\n    img\n   \tlink\n    title\n    desc\n    date\n    longDesc\n    shortDesc\n  }\n} \n"]);return g=function(){return l},l}var b=r()(g());e.default=function(){var l=Object(d.useQuery)(b,{variables:{type:"fashion"}}),e=(l.loading,l.data);return m(t.a.Fragment,null,e&&e.blog.map((function(l,e){return m(s.a,{className:"blog-media",key:e},m(u.a,{xl:"6"},m("div",{className:"blog-left"},m("a",{href:"#"},m(o.a,{src:l.img,className:"img-fluid blur-up lazyload bg-img",alt:""})))),m(u.a,{xl:"6"},m("div",{className:"blog-right"},m("div",null,m("h6",null,l.title),m("a",{href:"#"},m("h4",null,l.shortDesc)),m("ul",{className:"post-social"},m("li",null,"Posted By : Admin Admin"),m("li",null,m("i",{className:"fa fa-heart"})," 5 Hits"),m("li",null,m("i",{className:"fa fa-comments"})," 10 Comment")),m("p",null,l.longDesc)))))})))}},ij6E:function(l,e,a){"use strict";a.r(e);var n=a("jT3O"),i=a("q1tI"),t=a.n(i),s=a("lTCR"),u=a.n(s),o=a("VX74"),c=t.a.createElement;function r(){var l=Object(n.a)(["\nquery blog ($type:String!) {\n    blog(type:$type){\n    img\n   \tlink\n    title\n    desc\n    date\n    longDesc\n    shortDesc\n  }\n} \n"]);return r=function(){return l},l}var d=u()(r());e.default=function(){var l=Object(o.useQuery)(d,{variables:{type:"fashion"}}),e=(l.loading,l.data);return c(t.a.Fragment,null,c("div",{className:"col-xl-3 col-lg-4 col-md-5"},c("div",{className:"blog-sidebar"},c("div",{className:"theme-card"},c("h4",null,"Recent Blog"),c("ul",{className:"recent-blog"},e&&e.blog.map((function(l,e){return c("li",{key:e},c("div",{className:"media"},c("img",{className:"img-fluid blur-up lazyload",src:l.img,alt:"Generic placeholder image"}),c("div",{className:"media-body align-self-center"},c("h6",null,l.title),c("p",null,"0 hits"))))})))),c("div",{className:"theme-card"},c("h4",null,"Popular Blog"),c("ul",{className:"popular-blog"},c("li",null,c("div",{className:"media"},c("div",{className:"blog-date"},c("span",null,"03 "),c("span",null,"may")),c("div",{className:"media-body align-self-center"},c("h6",null,"Injected humour the like"),c("p",null,"0 hits"))),c("p",null,"it look like readable English. Many desktop publishing text.")),c("li",null,c("div",{className:"media"},c("div",{className:"blog-date"},c("span",null,"03 "),c("span",null,"may")),c("div",{className:"media-body align-self-center"},c("h6",null,"Injected humour the like"),c("p",null,"0 hits"))),c("p",null,"it look like readable English. Many desktop publishing text.")),c("li",null,c("div",{className:"media"},c("div",{className:"blog-date"},c("span",null,"03 "),c("span",null,"may")),c("div",{className:"media-body align-self-center"},c("h6",null,"Injected humour the like"),c("p",null,"0 hits"))),c("p",null,"it look like readable English. Many desktop publishing text.")),c("li",null,c("div",{className:"media"},c("div",{className:"blog-date"},c("span",null,"03 "),c("span",null,"may")),c("div",{className:"media-body align-self-center"},c("h6",null,"Injected humour the like"),c("p",null,"0 hits"))),c("p",null,"it look like readable English. Many desktop publishing text.")))))))}}},[["bavT",1,0,11,2,3,4,5,6,8,9,10,12,13,16]]]);