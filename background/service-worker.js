// background/service-worker.js

// ─── Header-based tech signatures ────────────────────────────────────────────
// Each entry: header (lowercase), contains (substring, '' = just check existence),
//             optional ver (regex to extract version string from header value)
const HEADER_SIGS = [
  // x-powered-by
  { name: 'PHP',          category: 'language',  icon: '🐘', color: '#EFF6FF', website: 'https://php.net',                      header: 'x-powered-by',  contains: 'php',          ver: /php\/([\d.]+)/i },
  { name: 'Express.js',   category: 'framework', icon: '🟢', color: '#F0FFF4', website: 'https://expressjs.com',                 header: 'x-powered-by',  contains: 'express'       },
  { name: 'Next.js',      category: 'framework', icon: '▲',  color: '#E5E7EB', website: 'https://nextjs.org',                   header: 'x-powered-by',  contains: 'next.js'       },
  { name: 'ASP.NET',      category: 'framework', icon: '🟣', color: '#F5F3FF', website: 'https://dotnet.microsoft.com',          header: 'x-powered-by',  contains: 'asp.net',      ver: /asp\.net\s+\(?([\d.]+)/i },
  { name: 'Nuxt.js',      category: 'framework', icon: '🟢', color: '#E8F5E9', website: 'https://nuxt.com',                     header: 'x-powered-by',  contains: 'nuxt'          },

  // server software
  { name: 'Nginx',         category: 'language',  icon: '🟩', color: '#F0FFF4', website: 'https://nginx.org',             header: 'server', contains: 'nginx',          ver: /nginx\/([\d.]+)/i },
  { name: 'Apache',        category: 'language',  icon: '🪶', color: '#FFF1F2', website: 'https://httpd.apache.org',      header: 'server', contains: 'apache',         ver: /apache\/([\d.]+)/i },
  { name: 'Microsoft IIS', category: 'language',  icon: '🪟', color: '#EFF6FF', website: 'https://iis.net',              header: 'server', contains: 'microsoft-iis',  ver: /microsoft-iis\/([\d.]+)/i },
  { name: 'LiteSpeed',     category: 'language',  icon: '⚡', color: '#FEF9C3', website: 'https://litespeedtech.com',    header: 'server', contains: 'litespeed'       },
  { name: 'OpenResty',     category: 'language',  icon: '🌐', color: '#F0FFF4', website: 'https://openresty.org',        header: 'server', contains: 'openresty'       },
  { name: 'Caddy',         category: 'language',  icon: '🦉', color: '#ECFDF5', website: 'https://caddyserver.com',      header: 'server', contains: 'caddy',          ver: /caddy\/([\d.]+)/i },
  { name: 'Gunicorn',      category: 'language',  icon: '🦄', color: '#ECFDF5', website: 'https://gunicorn.org',         header: 'server', contains: 'gunicorn'        },
  { name: 'Unicorn',       category: 'language',  icon: '🦄', color: '#ECFDF5', website: 'https://unicorn.bogomips.org', header: 'server', contains: 'unicorn'         },
  { name: 'WEBrick',       category: 'language',  icon: '💎', color: '#FFF1F2', website: 'https://ruby-doc.org',         header: 'server', contains: 'webrick'         },

  // CMS-specific headers
  { name: 'WordPress', category: 'cms', icon: '🔵', color: '#EBF5FB', website: 'https://wordpress.org',  header: 'link',                  contains: 'api.w.org'  },
  { name: 'WordPress', category: 'cms', icon: '🔵', color: '#EBF5FB', website: 'https://wordpress.org',  header: 'x-pingback',            contains: ''           },
  { name: 'WordPress', category: 'cms', icon: '🔵', color: '#EBF5FB', website: 'https://wordpress.org',  header: 'x-powered-by',          contains: 'wordpress'  },
  { name: 'Drupal',    category: 'cms', icon: '💧', color: '#E0F2FE', website: 'https://drupal.org',     header: 'x-drupal-cache',        contains: ''           },
  { name: 'Drupal',    category: 'cms', icon: '💧', color: '#E0F2FE', website: 'https://drupal.org',     header: 'x-drupal-dynamic-cache', contains: ''          },
  { name: 'Drupal',    category: 'cms', icon: '💧', color: '#E0F2FE', website: 'https://drupal.org',     header: 'x-generator',           contains: 'drupal',    ver: /drupal\s+([\d.]+)/i },
  { name: 'Joomla',    category: 'cms', icon: '🟣', color: '#F5F3FF', website: 'https://joomla.org',     header: 'x-content-encoded-by',  contains: 'joomla'     },
  { name: 'Ghost',     category: 'cms', icon: '👻', color: '#F9FAFB', website: 'https://ghost.org',      header: 'x-powered-by',          contains: 'ghost'      },

  // Hosting platforms
  { name: 'Vercel',       category: 'hosting', icon: '▲',  color: '#F3F4F6', website: 'https://vercel.com',       header: 'x-vercel-cache',         contains: '' },
  { name: 'Vercel',       category: 'hosting', icon: '▲',  color: '#F3F4F6', website: 'https://vercel.com',       header: 'x-vercel-id',            contains: '' },
  { name: 'Netlify',      category: 'hosting', icon: '🌐', color: '#ECFDF5', website: 'https://netlify.com',      header: 'x-nf-request-id',        contains: '' },
  { name: 'Netlify',      category: 'hosting', icon: '🌐', color: '#ECFDF5', website: 'https://netlify.com',      header: 'x-nf-cache-status',      contains: '' },
  { name: 'Heroku',       category: 'hosting', icon: '💜', color: '#F5F3FF', website: 'https://heroku.com',       header: 'via',                    contains: 'vegur' },
  { name: 'Fly.io',       category: 'hosting', icon: '✈️', color: '#EFF6FF', website: 'https://fly.io',           header: 'fly-request-id',         contains: '' },
  { name: 'Render',       category: 'hosting', icon: '🟢', color: '#ECFDF5', website: 'https://render.com',       header: 'x-render-origin-server', contains: '' },
  { name: 'GitHub Pages', category: 'hosting', icon: '🐙', color: '#F3F4F6', website: 'https://pages.github.com', header: 'x-github-request-id',   contains: '' },
  { name: 'Railway',      category: 'hosting', icon: '🚂', color: '#F5F3FF', website: 'https://railway.app',      header: 'x-railway-request-id',  contains: '' },

  // CDN
  { name: 'Cloudflare',     category: 'cdn', icon: '☁️', color: '#FFF7ED', website: 'https://cloudflare.com',            header: 'cf-ray',               contains: '' },
  { name: 'AWS CloudFront', category: 'cdn', icon: '☁️', color: '#FFF7ED', website: 'https://aws.amazon.com/cloudfront', header: 'x-amz-cf-id',          contains: '' },
  { name: 'Fastly',         category: 'cdn', icon: '⚡', color: '#FFF1F2', website: 'https://fastly.com',                header: 'x-fastly-request-id',  contains: '' },
  { name: 'Varnish',        category: 'cdn', icon: '🧊', color: '#EFF6FF', website: 'https://varnish-cache.org',         header: 'x-varnish',            contains: '' },
  { name: 'Akamai',         category: 'cdn', icon: '🌐', color: '#EFF6FF', website: 'https://akamai.com',                header: 'x-check-cacheable',    contains: '' },
  { name: 'Akamai',         category: 'cdn', icon: '🌐', color: '#EFF6FF', website: 'https://akamai.com',                header: 'x-akamai-transformed', contains: '' },

  // E-commerce
  { name: 'Shopify',  category: 'ecommerce', icon: '🛍️', color: '#F0FFF4', website: 'https://shopify.com', header: 'x-shopify-stage',         contains: '' },
  { name: 'Shopify',  category: 'ecommerce', icon: '🛍️', color: '#F0FFF4', website: 'https://shopify.com', header: 'x-sorting-hat-podid',     contains: '' },
  { name: 'Magento',  category: 'ecommerce', icon: '🔶', color: '#FFF7ED', website: 'https://magento.com', header: 'x-magento-tags',           contains: '' },
  { name: 'Magento',  category: 'ecommerce', icon: '🔶', color: '#FFF7ED', website: 'https://magento.com', header: 'x-magento-cache-control',  contains: '' },
];

// ─── Header analysis ─────────────────────────────────────────────────────────
function detectFromHeaders(responseHeaders) {
  const headerMap = {};
  for (const h of responseHeaders) {
    headerMap[h.name.toLowerCase()] = h.value;
  }

  const detected = [];
  const seen = new Set();

  for (const sig of HEADER_SIGS) {
    const val = headerMap[sig.header];
    if (val === undefined) continue;
    if (sig.contains && !val.toLowerCase().includes(sig.contains)) continue;
    if (seen.has(sig.name)) continue;
    seen.add(sig.name);

    let version = null;
    if (sig.ver) {
      const m = val.match(sig.ver);
      version = m ? m[1] : null;
    }

    detected.push({
      name:       sig.name,
      category:   sig.category,
      icon:       sig.icon,
      color:      sig.color,
      website:    sig.website,
      version,
      confidence: 'confirmed',
      matchCount: 1,
      fromHeaders: true
    });
  }

  return detected;
}

// ─── Capture response headers for every main-frame request ───────────────────
chrome.webRequest.onHeadersReceived.addListener(
  (details) => {
    if (details.type !== 'main_frame') return;
    try {
      const hostname = new URL(details.url).hostname;
      const headerDetected = detectFromHeaders(details.responseHeaders || []);
      chrome.storage.local.set({ [`stacksnap_hdrs_${hostname}`]: headerDetected });
    } catch (e) {}
  },
  { urls: ['<all_urls>'], types: ['main_frame'] },
  ['responseHeaders']
);

// ─── Content-script results: merge with headers and update badge ──────────────
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'STACKSNAP_RESULT') {
    handleDomResult(message.payload, sender.tab?.id);
  }
  return false;
});

async function handleDomResult(payload, tabId) {
  const hostname = new URL(payload.url).hostname;
  chrome.storage.local.set({ [`stacksnap_${hostname}`]: payload });

  // Combine DOM + header results to get accurate badge count
  const hdrStore = await chrome.storage.local.get(`stacksnap_hdrs_${hostname}`);
  const hdrResults = hdrStore[`stacksnap_hdrs_${hostname}`] ?? [];
  const domNames = new Set(payload.detected.map(r => r.name));
  const uniqueFromHeaders = hdrResults.filter(r => !domNames.has(r.name));
  const total = payload.detected.length + uniqueFromHeaders.length;

  if (tabId != null) {
    chrome.action.setBadgeText({ text: total > 0 ? String(total) : '', tabId });
    chrome.action.setBadgeBackgroundColor({ color: '#2563EB', tabId });
  }
}

// ─── Clear stale data on navigation ──────────────────────────────────────────
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading' && tab.url) {
    try {
      const hostname = new URL(tab.url).hostname;
      chrome.storage.local.remove([`stacksnap_${hostname}`, `stacksnap_hdrs_${hostname}`]);
      chrome.action.setBadgeText({ text: '', tabId });
    } catch (e) {}
  }
});
