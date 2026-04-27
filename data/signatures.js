// data/signatures.js
// Detection rule types:
//   { type: 'global', value: 'React' }            → window.React exists
//   { type: 'global_path', value: 'wp.hooks' }    → window.wp.hooks exists
//   { type: 'script_src', value: '/wp-content/' } → any <script src> contains this
//   { type: 'link_href', value: 'wp-content' }    → any <link href> contains this
//   { type: 'meta_name', name: 'generator', value: 'WordPress' } → meta tag content
//   { type: 'html_attr', attr: 'data-reactroot' } → any element has this attribute
//   { type: 'html_class_prefix', value: 'MuiBox' }→ any class contains this string
//   { type: 'cookie', value: 'PHPSESSID' }         → document.cookie contains
//   { type: 'element_id', value: '__next' }        → document.getElementById
//   { type: 'head_comment', value: 'Joomla' }      → HTML comment in <head>
//   { type: 'input_name', value: '__VIEWSTATE' }   → hidden input with this name

const SIGNATURES = [

  // ─── JAVASCRIPT FRAMEWORKS ───────────────────────────────────────────
  {
    name: 'React',
    category: 'framework',
    icon: '⚛️',
    color: '#E8F4FD',
    textColor: '#0369A1',
    website: 'https://react.dev',
    detect: [
      { type: 'global', value: 'React' },
      { type: 'global', value: '__REACT_DEVTOOLS_GLOBAL_HOOK__' },
      { type: 'html_attr', attr: 'data-reactroot' },
      { type: 'html_attr', attr: 'data-reactid' },
      { type: 'element_id', value: '__react' }
    ]
  },
  {
    name: 'Next.js',
    category: 'framework',
    icon: '▲',
    color: '#E5E7EB',
    textColor: '#111111',
    website: 'https://nextjs.org',
    detect: [
      { type: 'global', value: '__NEXT_DATA__' },
      { type: 'element_id', value: '__next' },
      { type: 'script_src', value: '/_next/static/' },
      { type: 'meta_name', name: 'generator', value: 'Next.js' }
    ]
  },
  {
    name: 'Vue.js',
    category: 'framework',
    icon: '💚',
    color: '#E8F5E9',
    textColor: '#2E7D32',
    website: 'https://vuejs.org',
    detect: [
      { type: 'global', value: 'Vue' },
      { type: 'global', value: '__vue_app__' },
      { type: 'html_attr', attr: 'data-v-app' },
      { type: 'html_attr', attr: '__vue__' },
      { type: 'script_src', value: '/vue.' }
    ]
  },
  {
    name: 'Nuxt.js',
    category: 'framework',
    icon: '🟢',
    color: '#E8F5E9',
    textColor: '#166534',
    website: 'https://nuxt.com',
    detect: [
      { type: 'global', value: '__NUXT__' },
      { type: 'global', value: '$nuxt' },
      { type: 'script_src', value: '/_nuxt/' }
    ]
  },
  {
    name: 'Angular',
    category: 'framework',
    icon: '🔴',
    color: '#FDEDED',
    textColor: '#B71C1C',
    website: 'https://angular.io',
    detect: [
      { type: 'global', value: 'ng' },
      { type: 'html_attr', attr: 'ng-version' },
      { type: 'html_attr', attr: 'ng-app' },
      { type: 'script_src', value: '/angular.' }
    ]
  },
  {
    name: 'Svelte',
    category: 'framework',
    icon: '🟠',
    color: '#FFF3E0',
    textColor: '#E64A19',
    website: 'https://svelte.dev',
    detect: [
      { type: 'global', value: '__svelte' },
      { type: 'html_attr', attr: 'data-svelte' },
      { type: 'script_src', value: '/svelte/' }
    ]
  },
  {
    name: 'SvelteKit',
    category: 'framework',
    icon: '🟠',
    color: '#FFF3E0',
    textColor: '#BF360C',
    website: 'https://kit.svelte.dev',
    detect: [
      { type: 'global', value: '__sveltekit_dev' },
      { type: 'script_src', value: '/_app/immutable/' }
    ]
  },
  {
    name: 'Remix',
    category: 'framework',
    icon: '🔵',
    color: '#EFF6FF',
    textColor: '#1D4ED8',
    website: 'https://remix.run',
    detect: [
      { type: 'global', value: '__remixContext' },
      { type: 'global', value: '__remixManifest' }
    ]
  },
  {
    name: 'Astro',
    category: 'framework',
    icon: '🚀',
    color: '#F5F3FF',
    textColor: '#6D28D9',
    website: 'https://astro.build',
    detect: [
      { type: 'html_attr', attr: 'data-astro-cid' },
      { type: 'script_src', value: '/_astro/' },
      { type: 'meta_name', name: 'generator', value: 'Astro' }
    ]
  },
  {
    name: 'Gatsby',
    category: 'framework',
    icon: '💜',
    color: '#F5F3FF',
    textColor: '#663399',
    website: 'https://www.gatsbyjs.com',
    detect: [
      { type: 'global', value: '___gatsby' },
      { type: 'global', value: '__gatsby_chunk_mapping' },
      { type: 'element_id', value: 'gatsby-focus-wrapper' }
    ]
  },
  {
    name: 'Solid.js',
    category: 'framework',
    icon: '🔷',
    color: '#EFF6FF',
    textColor: '#1D4ED8',
    website: 'https://www.solidjs.com',
    detect: [
      { type: 'global', value: 'solid' },
      { type: 'script_src', value: 'solid-js' }
    ]
  },
  {
    name: 'Qwik',
    category: 'framework',
    icon: '⚡',
    color: '#FEF9C3',
    textColor: '#854D0E',
    website: 'https://qwik.dev',
    detect: [
      { type: 'global', value: 'qwikevents' },
      { type: 'html_attr', attr: 'q:container' },
      { type: 'html_attr', attr: 'q:version' }
    ]
  },
  {
    name: 'Preact',
    category: 'framework',
    icon: '💜',
    color: '#F5F3FF',
    textColor: '#673AB7',
    website: 'https://preactjs.com',
    detect: [
      { type: 'global', value: 'preact' },
      { type: 'script_src', value: 'preact' }
    ]
  },
  {
    name: 'Ember.js',
    category: 'framework',
    icon: '🔥',
    color: '#FFF1F2',
    textColor: '#BE123C',
    website: 'https://emberjs.com',
    detect: [
      { type: 'global', value: 'Ember' },
      { type: 'global', value: 'EmberENV' },
      { type: 'script_src', value: 'ember.' }
    ]
  },
  {
    name: 'Backbone.js',
    category: 'framework',
    icon: '🦴',
    color: '#F3F4F6',
    textColor: '#374151',
    website: 'https://backbonejs.org',
    detect: [
      { type: 'global', value: 'Backbone' }
    ]
  },
  {
    name: 'Ruby on Rails',
    category: 'framework',
    icon: '💎',
    color: '#FFF1F2',
    textColor: '#BE123C',
    website: 'https://rubyonrails.org',
    detect: [
      { type: 'meta_name', name: 'csrf-token', value: '' },
      { type: 'meta_name', name: 'csrf-param', value: 'authenticity_token' },
      { type: 'cookie', value: '_session_id' }
    ]
  },
  {
    name: 'Laravel',
    category: 'framework',
    icon: '🔴',
    color: '#FFF1F2',
    textColor: '#E11D48',
    website: 'https://laravel.com',
    detect: [
      { type: 'cookie', value: 'laravel_session' },
      { type: 'cookie', value: 'XSRF-TOKEN' },
      { type: 'global', value: 'livewire' }
    ]
  },
  {
    name: 'Django',
    category: 'framework',
    icon: '🐍',
    color: '#ECFDF5',
    textColor: '#065F46',
    website: 'https://djangoproject.com',
    detect: [
      { type: 'cookie', value: 'csrftoken' },
      { type: 'cookie', value: 'sessionid' },
      { type: 'global', value: 'django' },
      { type: 'input_name', value: 'csrfmiddlewaretoken' }
    ]
  },
  {
    name: 'ASP.NET',
    category: 'framework',
    icon: '🟣',
    color: '#F5F3FF',
    textColor: '#5B21B6',
    website: 'https://dotnet.microsoft.com',
    detect: [
      { type: 'cookie', value: 'ASP.NET_SessionId' },
      { type: 'input_name', value: '__VIEWSTATE' },
      { type: 'input_name', value: '__RequestVerificationToken' },
      { type: 'global', value: '__aspnetForm' }
    ]
  },

  // ─── JAVASCRIPT LIBRARIES ────────────────────────────────────────────
  {
    name: 'jQuery',
    category: 'library',
    icon: '💡',
    color: '#FFF9E6',
    textColor: '#92400E',
    website: 'https://jquery.com',
    detect: [
      { type: 'global', value: 'jQuery' },
      { type: 'script_src', value: '/jquery.' },
      { type: 'script_src', value: '/jquery-' }
    ]
  },
  {
    name: 'Lodash',
    category: 'library',
    icon: '🔧',
    color: '#F3F4F6',
    textColor: '#374151',
    website: 'https://lodash.com',
    detect: [
      { type: 'script_src', value: '/lodash.' }
    ]
  },
  {
    name: 'Alpine.js',
    category: 'library',
    icon: '🏔️',
    color: '#E0F2FE',
    textColor: '#075985',
    website: 'https://alpinejs.dev',
    detect: [
      { type: 'global', value: 'Alpine' },
      { type: 'html_attr', attr: 'x-data' }
    ]
  },
  {
    name: 'HTMX',
    category: 'library',
    icon: '⚡',
    color: '#FEF9C3',
    textColor: '#854D0E',
    website: 'https://htmx.org',
    detect: [
      { type: 'global', value: 'htmx' },
      { type: 'html_attr', attr: 'hx-get' },
      { type: 'html_attr', attr: 'hx-post' },
      { type: 'html_attr', attr: 'hx-boost' }
    ]
  },
  {
    name: 'Three.js',
    category: 'library',
    icon: '🎲',
    color: '#F1F5F9',
    textColor: '#0F172A',
    website: 'https://threejs.org',
    detect: [
      { type: 'global', value: 'THREE' }
    ]
  },
  {
    name: 'Chart.js',
    category: 'library',
    icon: '📊',
    color: '#FFF7ED',
    textColor: '#C2410C',
    website: 'https://chartjs.org',
    detect: [
      { type: 'global', value: 'Chart' },
      { type: 'script_src', value: 'chart.js' },
      { type: 'script_src', value: 'chart.min.js' }
    ]
  },
  {
    name: 'D3.js',
    category: 'library',
    icon: '📈',
    color: '#FFF7ED',
    textColor: '#C2410C',
    website: 'https://d3js.org',
    detect: [
      { type: 'global', value: 'd3' },
      { type: 'script_src', value: '/d3.' },
      { type: 'script_src', value: '/d3.min' }
    ]
  },
  {
    name: 'GSAP',
    category: 'library',
    icon: '🎬',
    color: '#F0FFF4',
    textColor: '#166534',
    website: 'https://greensock.com/gsap',
    detect: [
      { type: 'global', value: 'gsap' },
      { type: 'global', value: 'TweenMax' },
      { type: 'global', value: 'TweenLite' }
    ]
  },
  {
    name: 'Socket.io',
    category: 'library',
    icon: '🔌',
    color: '#F0FFF4',
    textColor: '#166534',
    website: 'https://socket.io',
    detect: [
      { type: 'global', value: 'io' },
      { type: 'script_src', value: 'socket.io' }
    ]
  },
  {
    name: 'Moment.js',
    category: 'library',
    icon: '⏰',
    color: '#FEF9C3',
    textColor: '#854D0E',
    website: 'https://momentjs.com',
    detect: [
      { type: 'global', value: 'moment' },
      { type: 'script_src', value: 'moment.' }
    ]
  },
  {
    name: 'Axios',
    category: 'library',
    icon: '📡',
    color: '#EFF6FF',
    textColor: '#1D4ED8',
    website: 'https://axios-http.com',
    detect: [
      { type: 'global', value: 'axios' },
      { type: 'script_src', value: 'axios.' }
    ]
  },
  {
    name: 'Swiper',
    category: 'library',
    icon: '🎠',
    color: '#EFF6FF',
    textColor: '#1D4ED8',
    website: 'https://swiperjs.com',
    detect: [
      { type: 'global', value: 'Swiper' },
      { type: 'script_src', value: 'swiper' }
    ]
  },
  {
    name: 'Lottie',
    category: 'library',
    icon: '🎞️',
    color: '#F5F3FF',
    textColor: '#6D28D9',
    website: 'https://airbnb.io/lottie',
    detect: [
      { type: 'global', value: 'lottie' },
      { type: 'script_src', value: 'lottie' }
    ]
  },
  {
    name: 'Pixi.js',
    category: 'library',
    icon: '🎮',
    color: '#FFF1F2',
    textColor: '#E11D48',
    website: 'https://pixijs.com',
    detect: [
      { type: 'global', value: 'PIXI' }
    ]
  },
  {
    name: 'Stimulus',
    category: 'library',
    icon: '⚡',
    color: '#F0FFF4',
    textColor: '#166534',
    website: 'https://stimulus.hotwired.dev',
    detect: [
      { type: 'global', value: 'Stimulus' },
      { type: 'html_attr', attr: 'data-controller' }
    ]
  },

  // ─── CSS FRAMEWORKS & UI ─────────────────────────────────────────────
  {
    name: 'Tailwind CSS',
    category: 'library',
    icon: '🌊',
    color: '#E0F2FE',
    textColor: '#0369A1',
    website: 'https://tailwindcss.com',
    detect: [
      { type: 'html_class_prefix', value: 'tw-' },
      { type: 'html_class_prefix', value: 'text-sm' },
      { type: 'script_src', value: 'tailwindcss.com' },
      { type: 'link_href', value: 'tailwind' }
    ]
  },
  {
    name: 'Bootstrap',
    category: 'library',
    icon: '🅱️',
    color: '#F5F3FF',
    textColor: '#7C3AED',
    website: 'https://getbootstrap.com',
    detect: [
      { type: 'global', value: 'bootstrap' },
      { type: 'script_src', value: '/bootstrap.' },
      { type: 'link_href', value: '/bootstrap.' },
      { type: 'script_src', value: 'bootstrap.min.js' }
    ]
  },
  {
    name: 'Material UI',
    category: 'library',
    icon: '🎨',
    color: '#EFF6FF',
    textColor: '#0369A1',
    website: 'https://mui.com',
    detect: [
      { type: 'html_attr', attr: 'data-joy-color-scheme' },
      { type: 'html_class_prefix', value: 'MuiBox' },
      { type: 'html_class_prefix', value: 'MuiButton' }
    ]
  },
  {
    name: 'Ant Design',
    category: 'library',
    icon: '🐜',
    color: '#FFF1F2',
    textColor: '#E11D48',
    website: 'https://ant.design',
    detect: [
      { type: 'html_class_prefix', value: 'ant-' },
      { type: 'global', value: 'antd' }
    ]
  },
  {
    name: 'Chakra UI',
    category: 'library',
    icon: '💠',
    color: '#E0F2FE',
    textColor: '#075985',
    website: 'https://chakra-ui.com',
    detect: [
      { type: 'html_class_prefix', value: 'chakra-' }
    ]
  },
  {
    name: 'Bulma',
    category: 'library',
    icon: '💪',
    color: '#F0FFF4',
    textColor: '#166534',
    website: 'https://bulma.io',
    detect: [
      { type: 'link_href', value: 'bulma' },
      { type: 'script_src', value: 'bulma' },
      { type: 'html_class_prefix', value: 'is-primary' }
    ]
  },
  {
    name: 'Foundation',
    category: 'library',
    icon: '🏗️',
    color: '#FEF9C3',
    textColor: '#854D0E',
    website: 'https://get.foundation',
    detect: [
      { type: 'global', value: 'Foundation' },
      { type: 'link_href', value: 'foundation.' }
    ]
  },

  // ─── CMS ─────────────────────────────────────────────────────────────
  {
    name: 'WordPress',
    category: 'cms',
    icon: '🔵',
    color: '#EBF5FB',
    textColor: '#21759B',
    website: 'https://wordpress.org',
    detect: [
      { type: 'script_src', value: '/wp-content/' },
      { type: 'script_src', value: '/wp-includes/' },
      { type: 'link_href', value: '/wp-content/' },
      { type: 'meta_name', name: 'generator', value: 'WordPress' },
      { type: 'global', value: 'wp' },
      { type: 'cookie', value: 'wordpress_' },
      { type: 'link_rel', value: 'https://api.w.org/' },
      { type: 'link_rel', value: 'EditURI' },
      { type: 'link_rel', value: 'wlwmanifest' }
    ]
  },
  {
    name: 'Webflow',
    category: 'cms',
    icon: '🌊',
    color: '#EEF2FF',
    textColor: '#3730A3',
    website: 'https://webflow.com',
    detect: [
      { type: 'global', value: 'Webflow' },
      { type: 'html_attr', attr: 'data-wf-page' },
      { type: 'html_attr', attr: 'data-wf-site' },
      { type: 'script_src', value: 'assets.website-files.com' },
      { type: 'script_src', value: '.webflow.io' }
    ]
  },
  {
    name: 'Squarespace',
    category: 'cms',
    icon: '⬛',
    color: '#F9FAFB',
    textColor: '#111827',
    website: 'https://squarespace.com',
    detect: [
      { type: 'global', value: 'Squarespace' },
      { type: 'script_src', value: 'squarespace.com' },
      { type: 'html_attr', attr: 'data-squarespace-type' }
    ]
  },
  {
    name: 'Wix',
    category: 'cms',
    icon: '🟡',
    color: '#FFFBEB',
    textColor: '#92400E',
    website: 'https://wix.com',
    detect: [
      { type: 'global', value: 'wixBiSession' },
      { type: 'global', value: 'wixPerformanceMeasurements' },
      { type: 'script_src', value: 'static.wixstatic.com' }
    ]
  },
  {
    name: 'Drupal',
    category: 'cms',
    icon: '💧',
    color: '#E0F2FE',
    textColor: '#005B99',
    website: 'https://drupal.org',
    detect: [
      { type: 'global', value: 'Drupal' },
      { type: 'meta_name', name: 'generator', value: 'Drupal' },
      { type: 'script_src', value: '/sites/default/files/' },
      { type: 'html_attr', attr: 'data-drupal-link-system-path' }
    ]
  },
  {
    name: 'Joomla',
    category: 'cms',
    icon: '🟣',
    color: '#F5F3FF',
    textColor: '#5B21B6',
    website: 'https://joomla.org',
    detect: [
      { type: 'global', value: 'Joomla' },
      { type: 'meta_name', name: 'generator', value: 'Joomla' },
      { type: 'script_src', value: '/media/jui/js/' }
    ]
  },
  {
    name: 'Ghost',
    category: 'cms',
    icon: '👻',
    color: '#F9FAFB',
    textColor: '#374151',
    website: 'https://ghost.org',
    detect: [
      { type: 'global', value: 'ghost' },
      { type: 'meta_name', name: 'generator', value: 'Ghost' },
      { type: 'script_src', value: '/ghost/' }
    ]
  },
  {
    name: 'Contentful',
    category: 'cms',
    icon: '📦',
    color: '#EFF6FF',
    textColor: '#1D4ED8',
    website: 'https://contentful.com',
    detect: [
      { type: 'global', value: 'contentful' },
      { type: 'script_src', value: 'ctfassets.net' }
    ]
  },
  {
    name: 'Sanity',
    category: 'cms',
    icon: '🧠',
    color: '#FFF1F2',
    textColor: '#E11D48',
    website: 'https://sanity.io',
    detect: [
      { type: 'global', value: '__sanity' },
      { type: 'script_src', value: 'cdn.sanity.io' }
    ]
  },
  {
    name: 'Strapi',
    category: 'cms',
    icon: '🍭',
    color: '#F5F3FF',
    textColor: '#6D28D9',
    website: 'https://strapi.io',
    detect: [
      { type: 'global', value: 'strapi' },
      { type: 'script_src', value: 'strapi' }
    ]
  },

  // ─── E-COMMERCE ──────────────────────────────────────────────────────
  {
    name: 'Shopify',
    category: 'ecommerce',
    icon: '🛍️',
    color: '#F0FFF4',
    textColor: '#276749',
    website: 'https://shopify.com',
    detect: [
      { type: 'global', value: 'Shopify' },
      { type: 'global', value: 'ShopifyAnalytics' },
      { type: 'script_src', value: '.myshopify.com/' },
      { type: 'script_src', value: '/cdn.shopify.com/' },
      { type: 'link_href', value: 'shopify' },
      { type: 'meta_name', name: 'shopify-checkout-api-token', value: '' }
    ]
  },
  {
    name: 'WooCommerce',
    category: 'ecommerce',
    icon: '🛒',
    color: '#F5F3FF',
    textColor: '#7C3AED',
    website: 'https://woocommerce.com',
    detect: [
      { type: 'global', value: 'woocommerce_params' },
      { type: 'global', value: 'wc_cart_fragments_params' },
      { type: 'cookie', value: 'woocommerce_' },
      { type: 'script_src', value: '/woocommerce/' }
    ]
  },
  {
    name: 'Magento',
    category: 'ecommerce',
    icon: '🔶',
    color: '#FFF7ED',
    textColor: '#C2410C',
    website: 'https://magento.com',
    detect: [
      { type: 'global', value: 'Magento' },
      { type: 'global', value: 'FORM_KEY' },
      { type: 'cookie', value: 'MAGE_' }
    ]
  },
  {
    name: 'BigCommerce',
    category: 'ecommerce',
    icon: '🏪',
    color: '#ECFDF5',
    textColor: '#065F46',
    website: 'https://bigcommerce.com',
    detect: [
      { type: 'global', value: 'BCData' },
      { type: 'script_src', value: 'bigcommerce.com' }
    ]
  },
  {
    name: 'PrestaShop',
    category: 'ecommerce',
    icon: '🌐',
    color: '#EFF6FF',
    textColor: '#1D4ED8',
    website: 'https://prestashop.com',
    detect: [
      { type: 'global', value: 'prestashop' },
      { type: 'cookie', value: 'PrestaShop-' }
    ]
  },
  {
    name: 'OpenCart',
    category: 'ecommerce',
    icon: '🛺',
    color: '#EFF6FF',
    textColor: '#1E40AF',
    website: 'https://opencart.com',
    detect: [
      { type: 'global', value: 'opencart' },
      { type: 'script_src', value: '/catalog/view/javascript/' }
    ]
  },

  // ─── ANALYTICS & MONITORING ──────────────────────────────────────────
  {
    name: 'Google Analytics',
    category: 'analytics',
    icon: '📊',
    color: '#FFF7ED',
    textColor: '#C2410C',
    website: 'https://analytics.google.com',
    detect: [
      { type: 'global', value: 'gtag' },
      { type: 'global', value: 'ga' },
      { type: 'script_src', value: 'google-analytics.com' },
      { type: 'script_src', value: 'googletagmanager.com' }
    ]
  },
  {
    name: 'Hotjar',
    category: 'analytics',
    icon: '🔥',
    color: '#FFF1F2',
    textColor: '#BE123C',
    website: 'https://hotjar.com',
    detect: [
      { type: 'global', value: 'hj' },
      { type: 'global', value: '_hjSettings' },
      { type: 'script_src', value: 'hotjar.com' }
    ]
  },
  {
    name: 'Mixpanel',
    category: 'analytics',
    icon: '📈',
    color: '#EFF6FF',
    textColor: '#1D4ED8',
    website: 'https://mixpanel.com',
    detect: [
      { type: 'global', value: 'mixpanel' },
      { type: 'script_src', value: 'mixpanel.com' }
    ]
  },
  {
    name: 'Segment',
    category: 'analytics',
    icon: '🔗',
    color: '#F0FFF4',
    textColor: '#166534',
    website: 'https://segment.com',
    detect: [
      { type: 'script_src', value: 'cdn.segment.com' }
    ]
  },
  {
    name: 'Amplitude',
    category: 'analytics',
    icon: '📉',
    color: '#EFF6FF',
    textColor: '#1E40AF',
    website: 'https://amplitude.com',
    detect: [
      { type: 'global', value: 'amplitude' },
      { type: 'script_src', value: 'cdn.amplitude.com' }
    ]
  },
  {
    name: 'PostHog',
    category: 'analytics',
    icon: '🦔',
    color: '#FFF7ED',
    textColor: '#C2410C',
    website: 'https://posthog.com',
    detect: [
      { type: 'global', value: 'posthog' },
      { type: 'script_src', value: 'app.posthog.com' },
      { type: 'script_src', value: 'us.i.posthog.com' }
    ]
  },
  {
    name: 'Microsoft Clarity',
    category: 'analytics',
    icon: '🔍',
    color: '#EFF6FF',
    textColor: '#1D4ED8',
    website: 'https://clarity.microsoft.com',
    detect: [
      { type: 'global', value: 'clarity' },
      { type: 'script_src', value: 'clarity.ms' }
    ]
  },
  {
    name: 'Plausible',
    category: 'analytics',
    icon: '📐',
    color: '#F0FFF4',
    textColor: '#166534',
    website: 'https://plausible.io',
    detect: [
      { type: 'global', value: 'plausible' },
      { type: 'script_src', value: 'plausible.io' }
    ]
  },
  {
    name: 'Heap',
    category: 'analytics',
    icon: '📦',
    color: '#F5F3FF',
    textColor: '#6D28D9',
    website: 'https://heap.io',
    detect: [
      { type: 'global', value: 'heap' },
      { type: 'global', value: '_heap' },
      { type: 'script_src', value: 'cdn.heapanalytics.com' }
    ]
  },
  {
    name: 'FullStory',
    category: 'analytics',
    icon: '🎥',
    color: '#FFF7ED',
    textColor: '#C2410C',
    website: 'https://fullstory.com',
    detect: [
      { type: 'global', value: 'FS' },
      { type: 'global', value: '_fs_debug' },
      { type: 'script_src', value: 'fullstory.com' }
    ]
  },
  {
    name: 'Sentry',
    category: 'analytics',
    icon: '🚨',
    color: '#FFF1F2',
    textColor: '#BE123C',
    website: 'https://sentry.io',
    detect: [
      { type: 'global', value: 'Sentry' },
      { type: 'script_src', value: 'browser.sentry-cdn.com' },
      { type: 'script_src', value: 'js.sentry-cdn.com' }
    ]
  },
  {
    name: 'LogRocket',
    category: 'analytics',
    icon: '🚀',
    color: '#F5F3FF',
    textColor: '#7C3AED',
    website: 'https://logrocket.com',
    detect: [
      { type: 'global', value: 'LogRocket' },
      { type: 'script_src', value: 'cdn.logrocket.io' }
    ]
  },
  {
    name: 'Datadog RUM',
    category: 'analytics',
    icon: '🐕',
    color: '#FFF7ED',
    textColor: '#C2410C',
    website: 'https://datadoghq.com',
    detect: [
      { type: 'global', value: 'DD_RUM' },
      { type: 'script_src', value: 'datadoghq-browser-agent.com' }
    ]
  },

  // ─── CUSTOMER SUPPORT / CHAT ─────────────────────────────────────────
  {
    name: 'Intercom',
    category: 'analytics',
    icon: '💬',
    color: '#EFF6FF',
    textColor: '#1D4ED8',
    website: 'https://intercom.com',
    detect: [
      { type: 'global', value: 'Intercom' },
      { type: 'script_src', value: 'widget.intercom.io' },
      { type: 'script_src', value: 'js.intercomcdn.com' }
    ]
  },
  {
    name: 'Zendesk',
    category: 'analytics',
    icon: '🎧',
    color: '#ECFDF5',
    textColor: '#065F46',
    website: 'https://zendesk.com',
    detect: [
      { type: 'global', value: 'zE' },
      { type: 'script_src', value: 'static.zdassets.com' }
    ]
  },
  {
    name: 'HubSpot',
    category: 'analytics',
    icon: '🟠',
    color: '#FFF7ED',
    textColor: '#C2410C',
    website: 'https://hubspot.com',
    detect: [
      { type: 'global', value: '_hsq' },
      { type: 'script_src', value: 'js.hs-scripts.com' },
      { type: 'script_src', value: 'js.hubspot.com' },
      { type: 'cookie', value: '__hstc' }
    ]
  },
  {
    name: 'Crisp',
    category: 'analytics',
    icon: '💬',
    color: '#EEF2FF',
    textColor: '#4338CA',
    website: 'https://crisp.chat',
    detect: [
      { type: 'global', value: '$crisp' },
      { type: 'global', value: 'CRISP_WEBSITE_ID' }
    ]
  },

  // ─── HOSTING ─────────────────────────────────────────────────────────
  {
    name: 'Vercel',
    category: 'hosting',
    icon: '▲',
    color: '#F3F4F6',
    textColor: '#111827',
    website: 'https://vercel.com',
    detect: [
      { type: 'script_src', value: '.vercel.app' },
      { type: 'global', value: '__VERCEL_INSIGHTS_ID' },
      { type: 'script_src', value: 'vercel-insights' },
      { type: 'script_src', value: '_vercel/insights' }
    ]
  },
  {
    name: 'Netlify',
    category: 'hosting',
    icon: '🌐',
    color: '#ECFDF5',
    textColor: '#065F46',
    website: 'https://netlify.com',
    detect: [
      { type: 'script_src', value: '.netlify.app' },
      { type: 'script_src', value: 'netlify.com' },
      { type: 'html_attr', attr: 'data-netlify' }
    ]
  },
  {
    name: 'Firebase Hosting',
    category: 'hosting',
    icon: '🔥',
    color: '#FFF7ED',
    textColor: '#C2410C',
    website: 'https://firebase.google.com',
    detect: [
      { type: 'script_src', value: 'firebaseapp.com' },
      { type: 'script_src', value: 'web.app' }
    ]
  },
  {
    name: 'GitHub Pages',
    category: 'hosting',
    icon: '🐙',
    color: '#F3F4F6',
    textColor: '#111827',
    website: 'https://pages.github.com',
    detect: [
      { type: 'script_src', value: '.github.io' },
      { type: 'link_href', value: '.github.io' }
    ]
  },
  {
    name: 'Cloudflare Pages',
    category: 'hosting',
    icon: '☁️',
    color: '#FFF7ED',
    textColor: '#C2410C',
    website: 'https://pages.cloudflare.com',
    detect: [
      { type: 'script_src', value: '.pages.dev' },
      { type: 'link_href', value: '.pages.dev' }
    ]
  },
  {
    name: 'Heroku',
    category: 'hosting',
    icon: '💜',
    color: '#F5F3FF',
    textColor: '#6D28D9',
    website: 'https://heroku.com',
    detect: [
      { type: 'script_src', value: '.herokuapp.com' },
      { type: 'link_href', value: '.herokuapp.com' }
    ]
  },
  {
    name: 'Render',
    category: 'hosting',
    icon: '🟢',
    color: '#ECFDF5',
    textColor: '#065F46',
    website: 'https://render.com',
    detect: [
      { type: 'script_src', value: '.onrender.com' },
      { type: 'link_href', value: '.onrender.com' }
    ]
  },
  {
    name: 'Railway',
    category: 'hosting',
    icon: '🚂',
    color: '#F5F3FF',
    textColor: '#7C3AED',
    website: 'https://railway.app',
    detect: [
      { type: 'script_src', value: '.railway.app' },
      { type: 'link_href', value: '.railway.app' }
    ]
  },
  {
    name: 'Fly.io',
    category: 'hosting',
    icon: '✈️',
    color: '#EFF6FF',
    textColor: '#1D4ED8',
    website: 'https://fly.io',
    detect: [
      { type: 'script_src', value: '.fly.dev' },
      { type: 'link_href', value: '.fly.dev' }
    ]
  },
  {
    name: 'AWS',
    category: 'hosting',
    icon: '☁️',
    color: '#FFF7ED',
    textColor: '#C2410C',
    website: 'https://aws.amazon.com',
    detect: [
      { type: 'script_src', value: 'amazonaws.com' },
      { type: 'script_src', value: 'cloudfront.net' },
      { type: 'link_href', value: 'amazonaws.com' }
    ]
  },
  {
    name: 'Google Cloud',
    category: 'hosting',
    icon: '☁️',
    color: '#EFF6FF',
    textColor: '#1D4ED8',
    website: 'https://cloud.google.com',
    detect: [
      { type: 'script_src', value: 'storage.googleapis.com' },
      { type: 'script_src', value: '.run.app' }
    ]
  },

  // ─── CDN ─────────────────────────────────────────────────────────────
  {
    name: 'Cloudflare',
    category: 'cdn',
    icon: '☁️',
    color: '#FFF7ED',
    textColor: '#C2410C',
    website: 'https://cloudflare.com',
    detect: [
      { type: 'global', value: '__cfBeacon' },
      { type: 'global', value: 'cf_chl_opt' },
      { type: 'script_src', value: 'cloudflareinsights.com' }
    ]
  },
  {
    name: 'jsDelivr',
    category: 'cdn',
    icon: '📦',
    color: '#EFF6FF',
    textColor: '#1D4ED8',
    website: 'https://jsdelivr.com',
    detect: [
      { type: 'script_src', value: 'cdn.jsdelivr.net' },
      { type: 'link_href', value: 'cdn.jsdelivr.net' }
    ]
  },
  {
    name: 'cdnjs',
    category: 'cdn',
    icon: '📦',
    color: '#F0FFF4',
    textColor: '#166534',
    website: 'https://cdnjs.com',
    detect: [
      { type: 'script_src', value: 'cdnjs.cloudflare.com' },
      { type: 'link_href', value: 'cdnjs.cloudflare.com' }
    ]
  },
  {
    name: 'unpkg',
    category: 'cdn',
    icon: '📦',
    color: '#FEF9C3',
    textColor: '#854D0E',
    website: 'https://unpkg.com',
    detect: [
      { type: 'script_src', value: 'unpkg.com' },
      { type: 'link_href', value: 'unpkg.com' }
    ]
  },

  // ─── BUILD TOOLS ─────────────────────────────────────────────────────
  {
    name: 'Vite',
    category: 'build-tool',
    icon: '⚡',
    color: '#FFF7ED',
    textColor: '#B45309',
    website: 'https://vitejs.dev',
    detect: [
      { type: 'script_src', value: '/@vite/' },
      { type: 'script_src', value: '@vite/client' },
      { type: 'global', value: '__vite_is_modern_browser' }
    ]
  },
  {
    name: 'Webpack',
    category: 'build-tool',
    icon: '📦',
    color: '#EFF6FF',
    textColor: '#1D4ED8',
    website: 'https://webpack.js.org',
    detect: [
      { type: 'global', value: '__webpack_require__' },
      { type: 'global', value: 'webpackJsonp' },
      { type: 'global', value: 'webpackChunk' }
    ]
  },
  {
    name: 'Turbopack',
    category: 'build-tool',
    icon: '🚀',
    color: '#F5F3FF',
    textColor: '#6D28D9',
    website: 'https://turbo.build',
    detect: [
      { type: 'global', value: '__turbopack__' },
      { type: 'global', value: '__turbopack_require__' }
    ]
  },
  {
    name: 'Parcel',
    category: 'build-tool',
    icon: '📦',
    color: '#ECFDF5',
    textColor: '#065F46',
    website: 'https://parceljs.org',
    detect: [
      { type: 'global', value: 'parcelRequire' }
    ]
  },

  // ─── PAYMENTS ────────────────────────────────────────────────────────
  {
    name: 'Stripe',
    category: 'payment',
    icon: '💳',
    color: '#EFF6FF',
    textColor: '#1D4ED8',
    website: 'https://stripe.com',
    detect: [
      { type: 'global', value: 'Stripe' },
      { type: 'script_src', value: 'js.stripe.com' }
    ]
  },
  {
    name: 'PayPal',
    category: 'payment',
    icon: '🅿️',
    color: '#EFF6FF',
    textColor: '#003087',
    website: 'https://paypal.com',
    detect: [
      { type: 'global', value: 'paypal' },
      { type: 'script_src', value: 'paypal.com/sdk' },
      { type: 'script_src', value: 'paypalobjects.com' }
    ]
  },
  {
    name: 'Paddle',
    category: 'payment',
    icon: '🛶',
    color: '#ECFDF5',
    textColor: '#065F46',
    website: 'https://paddle.com',
    detect: [
      { type: 'global', value: 'Paddle' },
      { type: 'script_src', value: 'cdn.paddle.com' }
    ]
  },
  {
    name: 'Square',
    category: 'payment',
    icon: '⬜',
    color: '#F9FAFB',
    textColor: '#111827',
    website: 'https://squareup.com',
    detect: [
      { type: 'global', value: 'Square' },
      { type: 'script_src', value: 'web.squarecdn.com' }
    ]
  },

  // ─── AUTH & IDENTITY ─────────────────────────────────────────────────
  {
    name: 'Auth0',
    category: 'auth',
    icon: '🔐',
    color: '#FFF1F2',
    textColor: '#BE123C',
    website: 'https://auth0.com',
    detect: [
      { type: 'global', value: 'auth0' },
      { type: 'script_src', value: 'cdn.auth0.com' }
    ]
  },
  {
    name: 'Clerk',
    category: 'auth',
    icon: '🔑',
    color: '#F5F3FF',
    textColor: '#7C3AED',
    website: 'https://clerk.com',
    detect: [
      { type: 'global', value: 'Clerk' },
      { type: 'script_src', value: 'clerk.dev' },
      { type: 'script_src', value: 'clerk.accounts.dev' }
    ]
  },
  {
    name: 'NextAuth.js',
    category: 'auth',
    icon: '🔒',
    color: '#F3F4F6',
    textColor: '#374151',
    website: 'https://next-auth.js.org',
    detect: [
      { type: 'script_src', value: '/api/auth/' },
      { type: 'element_id', value: '__NEXT_AUTH__' }
    ]
  },

  // ─── MAPS ────────────────────────────────────────────────────────────
  {
    name: 'Google Maps',
    category: 'maps',
    icon: '🗺️',
    color: '#FFF7ED',
    textColor: '#C2410C',
    website: 'https://maps.google.com',
    detect: [
      { type: 'global', value: 'google' },
      { type: 'script_src', value: 'maps.googleapis.com' }
    ]
  },
  {
    name: 'Mapbox',
    category: 'maps',
    icon: '📍',
    color: '#F0FFF4',
    textColor: '#166534',
    website: 'https://mapbox.com',
    detect: [
      { type: 'global', value: 'mapboxgl' },
      { type: 'script_src', value: 'api.mapbox.com' }
    ]
  },
  {
    name: 'Leaflet',
    category: 'maps',
    icon: '🍃',
    color: '#F0FFF4',
    textColor: '#166534',
    website: 'https://leafletjs.com',
    detect: [
      { type: 'global', value: 'L' },
      { type: 'script_src', value: 'leaflet' }
    ]
  },

  // ─── VIDEO ───────────────────────────────────────────────────────────
  {
    name: 'Vimeo',
    category: 'video',
    icon: '🎬',
    color: '#EFF6FF',
    textColor: '#1D4ED8',
    website: 'https://vimeo.com',
    detect: [
      { type: 'global', value: 'Vimeo' },
      { type: 'script_src', value: 'player.vimeo.com' }
    ]
  },
  {
    name: 'Mux',
    category: 'video',
    icon: '🎞️',
    color: '#F5F3FF',
    textColor: '#6D28D9',
    website: 'https://mux.com',
    detect: [
      { type: 'global', value: 'mux' },
      { type: 'script_src', value: 'cdn.mux.com' }
    ]
  },
  {
    name: 'YouTube Embed',
    category: 'video',
    icon: '▶️',
    color: '#FFF1F2',
    textColor: '#BE123C',
    website: 'https://youtube.com',
    detect: [
      { type: 'html_attr', attr: 'data-youtube-id' },
      { type: 'script_src', value: 'youtube.com/iframe_api' },
      { type: 'script_src', value: 'youtube-nocookie.com' }
    ]
  },

  // ─── DATABASE & BaaS ─────────────────────────────────────────────────
  {
    name: 'Firebase',
    category: 'database',
    icon: '🔥',
    color: '#FFF7ED',
    textColor: '#C2410C',
    website: 'https://firebase.google.com',
    detect: [
      { type: 'global', value: 'firebase' },
      { type: 'global', value: '__FIREBASE_DEFAULTS__' },
      { type: 'script_src', value: 'firebase.googleapis.com' }
    ]
  },
  {
    name: 'Supabase',
    category: 'database',
    icon: '⚡',
    color: '#F0FFF4',
    textColor: '#166534',
    website: 'https://supabase.com',
    detect: [
      { type: 'global', value: 'supabase' },
      { type: 'script_src', value: 'supabase.co' }
    ]
  },
  {
    name: 'Appwrite',
    category: 'database',
    icon: '✍️',
    color: '#FFF1F2',
    textColor: '#E11D48',
    website: 'https://appwrite.io',
    detect: [
      { type: 'global', value: 'Appwrite' },
      { type: 'script_src', value: 'appwrite.io' }
    ]
  },

  // ─── LANGUAGE / BACKEND ──────────────────────────────────────────────
  {
    name: 'PHP',
    category: 'language',
    icon: '🐘',
    color: '#EFF6FF',
    textColor: '#4F46E5',
    website: 'https://php.net',
    detect: [
      { type: 'cookie', value: 'PHPSESSID' },
      { type: 'script_src', value: '.php' }
    ]
  },

  // ─── SECURITY ────────────────────────────────────────────────────────
  {
    name: 'reCAPTCHA',
    category: 'security',
    icon: '🤖',
    color: '#EFF6FF',
    textColor: '#1D4ED8',
    website: 'https://google.com/recaptcha',
    detect: [
      { type: 'global', value: 'grecaptcha' },
      { type: 'script_src', value: 'recaptcha/api.js' }
    ]
  },
  {
    name: 'hCaptcha',
    category: 'security',
    icon: '🔒',
    color: '#FEF9C3',
    textColor: '#854D0E',
    website: 'https://hcaptcha.com',
    detect: [
      { type: 'global', value: 'hcaptcha' },
      { type: 'script_src', value: 'hcaptcha.com' }
    ]
  },
  {
    name: 'Turnstile',
    category: 'security',
    icon: '🛡️',
    color: '#FFF7ED',
    textColor: '#C2410C',
    website: 'https://developers.cloudflare.com/turnstile',
    detect: [
      { type: 'global', value: 'turnstile' },
      { type: 'script_src', value: 'challenges.cloudflare.com/turnstile' }
    ]
  },

];

// Expose for use in detector
if (typeof module !== 'undefined') module.exports = SIGNATURES;
