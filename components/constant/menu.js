export const MENUITEMS = [
   {
      title: 'Shop by categories', type: 'sub', children: [
         {
            title: "Electronics", type: "sub", tag: 'new', children: [
               { path: '/layouts/Tools', title: 'Camera, Photo & Videos', type: 'link' },
               { path: '/layouts/Christmas', title: 'Computer & Accessories', type: 'link' },
               { path: '/layouts/Marketplace', title: 'Desktop', type: 'link' },
               { path: '/layouts/Game', title: 'Film Cameras', type: 'link' },
               { path: '/layouts/Gym', title: 'Monitors', type: 'link' },
               { path: '/layouts/Marijuana', title: 'Tablets', type: 'link' },
               { path: '/layouts/Leftsidebar', title: 'Headphones & Earphones', type: 'link' },
               { path: '/layouts/Jewellery', title: 'Laptops', type: 'link' },
               { path: '/layouts/Pets', title: 'Speakers', type: 'link' },
               { path: '/layouts/Metros', title: 'Video Games', type: 'link' }
            ]
         },
         {
            title: 'Fashion', type: 'sub', children: [
               { path: '/', title: 'Clothing, Shoes & Jewelry', type: 'link' },
               { path: '/layouts/Fashion2', title: 'Eyewear', type: 'link' },
               { path: '/layouts/Fashion3', title: 'Handbags', type: 'link' },
               { path: '/layouts/Kids', title: 'Backpacks', type: 'link' },
               { path: '/layouts/Kids', title: 'Watches', type: 'link' },
               { path: '/layouts/Kids', title: 'Jewelry', type: 'link' }
            ]
         },
         {
            title: 'Home & Kitchen', type: 'sub', children: [
               { path: '/layouts/Basics/Lookbook', title: 'Bedding', type: 'link' },
               { path: '/layouts/Basics/Instagram', title: 'Tower rings', type: 'link' },
               { path: '/layouts/Basics/Video', title: 'Wall art', type: 'link' },
               { path: '/layouts/Basics/Parallax', title: 'Wall clocks', type: 'link' },
               { path: '/layouts/Basics/Fullpage', title: 'Cleaning supplies', type: 'link' },
               { path: '/layouts/Basics/Fullpage', title: 'Kitchen & dining', type: 'link' },
               { path: '/layouts/Basics/Fullpage', title: 'Tools & home improvement', type: 'link' },
               { path: '/layouts/Basics/Fullpage', title: 'Home appliances', type: 'link' },
               { path: '/layouts/Basics/Fullpage', title: 'Bar tools & drinkware supplies', type: 'link' },
               { path: '/layouts/Basics/Fullpage', title: 'Bath', type: 'link' },
               { path: '/layouts/Basics/Fullpage', title: 'Bathroom accessories', type: 'link' },
               { path: '/layouts/Basics/Fullpage', title: 'Home decor', type: 'link' },
               { path: '/layouts/Basics/Fullpage', title: "Kid's home store", type: 'link' },
               { path: '/layouts/Basics/Fullpage', title: 'Seasonal decor', type: 'link' },
               { path: '/layouts/Basics/Fullpage', title: 'Storage & organization', type: 'link' },
               { path: '/layouts/Basics/Fullpage', title: 'Tower bars', type: 'link' },
               { path: '/layouts/Basics/Fullpage', title: 'Vacuum & floor care', type: 'link' },
               { path: '/layouts/Basics/Fullpage', title: 'Coasters', type: 'link' },
               { path: '/layouts/Basics/Fullpage', title: 'Event & party supplies', type: 'link' },
               { path: '/layouts/Basics/Fullpage', title: 'Furniture', type: 'link' },
               { path: '/layouts/Basics/Fullpage', title: 'Glassware & drinkware', type: 'link' },
               { path: '/layouts/Basics/Fullpage', title: 'Heating, Cooling & air quality', type: 'link' },
            ]
         },
         {  title: 'Beauty & Personal Care', type: 'sub', children: [
               { path: '/layouts/Electronic/Electronic-1', title: 'Foot, Hand & Nail Care', type: 'link', },
               { path: '/layouts/Electronic/Electronic-2', title: 'Concealer', type: 'link', },
               { path: '/layouts/Electronic/Electronic-2', title: 'Foundation', type: 'link', },
               { path: '/layouts/Electronic/Electronic-2', title: 'Compact powder', type: 'link', },
               { path: '/layouts/Electronic/Electronic-2', title: 'Hair care & styling', type: 'link', },
               { path: '/layouts/Electronic/Electronic-2', title: 'Conditioner', type: 'link', },
               { path: '/layouts/Electronic/Electronic-2', title: 'Face wash', type: 'link', },
               { path: '/layouts/Electronic/Electronic-2', title: 'Bath oils', type: 'link', },
               { path: '/layouts/Electronic/Electronic-2', title: 'Makeup', type: 'link', },
               { path: '/layouts/Electronic/Electronic-2', title: 'Fragrance', type: 'link', },
               { path: '/layouts/Electronic/Electronic-2', title: 'Grooming', type: 'link', },
               { path: '/layouts/Electronic/Electronic-2', title: 'Bleaches', type: 'link', },
               { path: '/layouts/Electronic/Electronic-2', title: 'Hair Oils', type: 'link', },
               { path: '/layouts/Electronic/Electronic-2', title: 'Cleansing Creams & Milks', type: 'link', },
               { path: '/layouts/Electronic/Electronic-2', title: 'Skin Care', type: 'link', },
               { path: '/layouts/Electronic/Electronic-2', title: 'Toners', type: 'link', },
            ] },
         {
            title: 'Health & Wellness', type: 'sub', children: [
               { path: '/layouts/Electronic/Electronic-1', title: 'Electronic-1', type: 'link', },
               { path: '/layouts/Electronic/Electronic-2', title: 'Electronic-2', type: 'link', },
            ]
         },
         { path: '/layouts/Furniture', title: 'Grocery', type: 'link' },
         { path: '/layouts/Vegetables', title: 'Sports & Outdoors', type: 'link' },
         { path: '/layouts/Watch', title: 'Baby & Toys', type: 'link' },
         { path: '/layouts/Lights', title: 'Next Day Delivery', type: 'link' }
      ],
   },
   {
      title: 'Shop', type: 'sub', children: [
         { path: '/shop/left_sidebar', title: 'Left Sidebar', type: 'link' },
         { path: '/shop/right_sidebar', title: 'Right Sidebar', type: 'link' },
         { path: '/shop/no_sidebar', title: 'No Sidebar', type: 'link', },
         { path: '/shop/sidebar_popup', title: 'Sidebar Popup', type: 'link' },
         { path: '/shop/metro', title: 'Metro', type: 'link', tag: 'new' },
         { path: '/shop/full_width', title: 'Full Width', type: 'link', tag: 'new' },
         { path: '/shop/three_grid', title: '3 Grid', type: 'link' },
         { path: '/shop/six_grid', title: '6 Six', type: 'link' },
         { path: '/shop/list_view', title: 'List View', type: 'link' }
      ],
   },
   {
      title: 'Products', type: 'sub', children: [
         {
            title: 'Sidebar', type: 'sub', children: [
               { path: '/p/1', title: 'Left Sidebar', type: 'link' },
               { path: '/p/right_sidebar', title: 'Right Sidebar', type: 'link' },
               { path: '/p/no-sidebar', title: 'No Sidebar', type: 'link' },
            ]
         },
         {
            title: "Thumbnail Image", type: "sub", children: [
               { path: '/p/thumbnail_left', title: 'Left Image', type: 'link' },
               { path: '/p/thumbnail_right', title: 'Right Image', type: 'link' },
               { path: '/p/thumbnail_outside', title: 'Image Outside', type: 'link' }
            ]
         },
         {
            title: "3-Column", type: "sub", children: [
               { path: '/p/3_col_left', title: 'Thumbnail Left', type: 'link' },
               { path: '/p/3_col_right', title: 'Thumbnail Right', type: 'link' },
               { path: '/p/3_col_bottom', title: 'Thumbnail Bottom', type: 'link' }
            ]
         },
         {
            path: '/p/4_image', title: '4 Image', type: 'link', tag: 'New'
         },
         {
            path: '/p/bundle_product', title: 'Bundle Product', type: 'link', tag: 'New'
         },
         {
            path: '/p/sticky', title: 'Sticky', type: 'link'
         },
         {
            path: '/p/accordian', title: 'Accordian', type: 'link'
         },
         {
            path: '/p/image_swatch', title: 'Image Swatch', type: 'link', tag: 'New'
         },
         {
            path: '/p/vertical_tab', title: 'Vertical Tab', type: 'link'
         },
      ]
   },
   {
      title: 'features', megaMenu: true, megaMenuType: 'small', type: 'sub', children: [
         {
            title: 'Portfolio', type: 'sub', children: [
               { path: '/portfolio/grid-2', title: 'Portfolio Grid 2', type: 'link', icon: 'alert' },
               { path: '/portfolio/grid-3', title: 'Portfolio Grid 3', type: 'link', icon: 'layout-accordion-merged' },
               { path: '/portfolio/grid-4', title: 'Portfolio Grid 4', type: 'link', icon: 'layers' },
               { path: '/portfolio/masonry-grid-2', title: 'masonry Grid 2', type: 'link', icon: 'write' },
               { path: '/portfolio/masonry-grid-3', title: 'masonry Grid 3', type: 'link', icon: 'map-alt' },
               { path: '/portfolio/masonry-grid-4', title: 'masonry Grid 4', type: 'link', icon: 'map-alt' },
               { path: '/portfolio/masonry-full-width', title: 'masonry Full Width', type: 'link', icon: 'map-alt' },
            ]
         },
         {
            title: 'Add To Cart', type: 'sub', children: [
               { path: '/layouts/Nursery', title: 'Cart Modal Popup', type: 'link', icon: 'list' },
               { path: '/layouts/Vegetables', title: 'Qty Counter', type: 'link', icon: 'gallery' },
               { path: '/layouts/Bags', title: 'Cart Top', type: 'link', icon: 'money' },
               { path: '/layouts/Shoes', title: 'Cart Bottom', type: 'link', icon: 'time' },
               { path: '/layouts/Watch', title: 'Cart Left', type: 'link', icon: 'alarm-clock' },
               { path: '/layouts/Tools', title: 'Cart Right', type: 'link', icon: 'alarm-clock' }
            ]
         },
         {
            title: 'Theme Element', type: 'sub', children: [
               { path: '/portfolio/title', title: 'Title', type: 'link', icon: 'bar-chart' },
               { path: '/portfolio/collection-banner', title: 'Collection Banner', type: 'link', icon: 'thought' },
               { path: '/portfolio/home-slider', title: 'Home Slider', type: 'link', icon: 'video-camera' },
               { path: '/portfolio/category', title: 'Category', type: 'link', icon: 'headphone' },
               { path: '/portfolio/service', title: 'Service', type: 'link', icon: 'headphone' }
            ]
         },
         {
            title: 'Product Element', type: 'sub', children: [
               { path: '/portfolio/product-box', title: 'Product Box', type: 'link', icon: 'bar-chart' },
               { path: '/portfolio/product-slider', title: 'Product Slider', type: 'link', icon: 'thought' },
               { path: '/portfolio/no-slider', title: 'No Slider', type: 'link', icon: 'video-camera' },
               { path: '/portfolio/multi-slider', title: 'Multi Slider', type: 'link', icon: 'headphone' },
               { path: '/portfolio/tab', title: 'Tab', type: 'link', icon: 'headphone' }
            ]
         },
         {
            title: 'Email Template', type: 'sub', children: [
               { path: '/portfolio/order-success', title: 'Order Success', type: 'link', icon: 'bar-chart' },
               { path: '/portfolio/order-success-2', title: 'Order Success 2', type: 'link', icon: 'thought' },
               { path: '/portfolio/email-template', title: 'Email Template', type: 'link', icon: 'headphone' },
               { path: '/portfolio/email-template-2', title: 'Email Template 2', type: 'link', icon: 'headphone' }
            ]
         }
      ]
   },
   {
      title: 'Pages', type: 'sub', children: [
         {
            title: 'vendor', type: 'sub', tag: 'new', children: [
               { path: '/page/vendor/vendor-dashboard', title: 'Vendor Dashboard', type: 'link' },
               { path: '/page/vendor/vendor-profile', title: 'Vendor Profile', type: 'link' },
               { path: '/page/vendor/become-vendor', title: 'Become Vendor', type: 'link' },
            ]
         },
         {
            title: 'Account', type: 'sub', children: [
               { path: '/page/account/wishlist', title: 'Wishlist', type: 'link' },
               { path: '/page/account/cart', title: 'cart', type: 'link' },
               { path: '/page/account/dashboard', title: 'dashboard', type: 'link' },
               { path: '/page/account/login', title: 'login', type: 'link' },
               { path: '/page/account/login-auth', title: 'login-auth', type: 'link' },
               { path: '/page/account/register', title: 'register', type: 'link' },
               { path: '/page/account/contact', title: 'contact', type: 'link' },
               { path: '/page/account/forget-pwd', title: 'forgot-password', type: 'link' },
               { path: '/page/account/profile', title: 'profile', type: 'link' },
               { path: '/page/account/checkout', title: 'checkout', type: 'link' },
            ]
         },
         { path: '/page/about-us', title: 'about-us', type: 'link' },
         { path: '/page/search', title: 'search', type: 'link' },
         { path: '/page/typography', title: 'typography', type: 'link', tag: 'new' },
         { path: '/page/review', title: 'review', type: 'link' },
         { path: '/page/order-success', title: 'order-success', type: 'link' },
         {
            title: 'compare', type: 'sub', children: [
               { path: '/page/compare', title: 'compare', type: 'link' },
               { path: '/page/compare-2', title: 'compare-2', type: 'link', tag: 'new' }
            ]
         },
         { path: '/page/collection', title: 'collection', type: 'link' },
         { path: '/page/lookbook', title: 'lookbook', type: 'link' },
         { path: '/page/site-map', title: 'site-map', type: 'link' },
         { path: '/page/404', title: '404', type: 'link' },
         { path: '/page/coming-soon', title: 'coming-soon', type: 'link' },
         { path: '/page/faq', title: 'faq', type: 'link' },
      ]
   },
   {
      title: 'Blogs', type: 'sub', children: [
         { path: '/blogs/blog_left_sidebar', title: 'blog left sidebar', type: 'link' },
         { path: '/blogs/blog_right_sidebar', title: 'blog right sidebar', type: 'link' },
         { path: '/blogs/no_sidebar', title: 'no sidebar', type: 'link' },
         { path: '/blogs/blog_detail', title: 'blog detail', type: 'link' },
      ]
   },
]
