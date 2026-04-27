// content/detector.js

(function () {
  if (window.__stacksnap_ran) return;
  window.__stacksnap_ran = true;

  // Version readers keyed by tech name
  const VERSION_READERS = {
    'React':       () => window.React?.version,
    'Vue.js':      () => window.Vue?.version,
    'Angular':     () => document.querySelector('[ng-version]')?.getAttribute('ng-version'),
    'jQuery':      () => window.jQuery?.fn?.jquery,
    'Bootstrap':   () => window.bootstrap?.Tooltip?.VERSION,
    'Ember.js':    () => window.Ember?.VERSION,
    'Backbone.js': () => window.Backbone?.VERSION,
    'Lodash':      () => window._?.VERSION,
    'Moment.js':   () => window.moment?.version,
    'Axios':       () => window.axios?.VERSION,
    'GSAP':        () => window.gsap?.version,
    'Three.js':    () => window.THREE?.REVISION ? `r${window.THREE.REVISION}` : undefined,
    'Alpine.js':   () => window.Alpine?.version,
    'Svelte':      () => window.__svelte?.v?.join('.'),
    'Nuxt.js':     () => window.__NUXT__?.config?.app?.buildId ? undefined : undefined,
    'Swiper':      () => window.Swiper?.prototype?.params ? undefined : undefined,
    'Preact':      () => window.preact?.version,
    'D3.js':       () => window.d3?.version,
    'Chart.js':    () => window.Chart?.version,
  };

  function getVersion(name) {
    try {
      return VERSION_READERS[name]?.() || null;
    } catch {
      return null;
    }
  }

  function countMatches(sig) {
    let count = 0;
    for (const rule of sig.detect) {
      if (testRule(rule)) count++;
    }
    return count;
  }

  function getConfidence(matchCount, totalRules) {
    if (matchCount >= 3 || (totalRules >= 2 && matchCount / totalRules >= 0.6)) return 'confirmed';
    if (matchCount === 2) return 'likely';
    return 'possible';
  }

  function detect() {
    const results = [];

    for (const sig of SIGNATURES) {
      const matchCount = countMatches(sig);
      if (matchCount === 0) continue;

      results.push({
        name:       sig.name,
        category:   sig.category,
        icon:       sig.icon,
        color:      sig.color,
        textColor:  sig.textColor,
        website:    sig.website,
        version:    getVersion(sig.name),
        confidence: getConfidence(matchCount, sig.detect.length),
        matchCount
      });
    }

    return results;
  }

  function testRule(rule) {
    try {
      switch (rule.type) {

        case 'global': {
          return typeof window[rule.value] !== 'undefined';
        }

        case 'global_path': {
          const parts = rule.value.split('.');
          let obj = window;
          for (const part of parts) {
            if (typeof obj[part] === 'undefined') return false;
            obj = obj[part];
          }
          return true;
        }

        case 'script_src': {
          const needle = rule.value.toLowerCase();
          const scripts = document.querySelectorAll('script[src]');
          for (const s of scripts) {
            if (s.src && s.src.toLowerCase().includes(needle)) return true;
          }
          // Also scan every network resource the page loaded (catches dynamic imports, CDN scripts, etc.)
          if (window.performance?.getEntriesByType) {
            for (const entry of performance.getEntriesByType('resource')) {
              if (entry.name && entry.name.toLowerCase().includes(needle)) return true;
            }
          }
          return false;
        }

        case 'link_href': {
          const needle = rule.value.toLowerCase();
          const links = document.querySelectorAll('link[href]');
          for (const l of links) {
            if (l.href && l.href.toLowerCase().includes(needle)) return true;
          }
          // Also catch stylesheets loaded via JS
          if (window.performance?.getEntriesByType) {
            for (const entry of performance.getEntriesByType('resource')) {
              if (entry.name && entry.name.toLowerCase().includes(needle)) return true;
            }
          }
          return false;
        }

        case 'link_rel': {
          const links = document.querySelectorAll('link[rel]');
          for (const l of links) {
            const rel = l.getAttribute('rel') || '';
            for (const token of rel.split(/\s+/)) {
              if (token.toLowerCase() === rule.value.toLowerCase()) return true;
            }
          }
          return false;
        }

        case 'meta_name': {
          if (rule.value === '') {
            return !!document.querySelector(`meta[name="${rule.name}"], meta[property="${rule.name}"]`);
          }
          const meta = document.querySelector(`meta[name="${rule.name}"]`);
          if (!meta) return false;
          return meta.getAttribute('content')?.toLowerCase().includes(rule.value.toLowerCase()) || false;
        }

        case 'html_attr': {
          return !!document.querySelector(`[${rule.attr}]`);
        }

        case 'html_class_prefix': {
          const all = document.querySelectorAll('[class]');
          for (const el of all) {
            const cls = el.className;
            if (typeof cls === 'string' && cls.includes(rule.value)) return true;
          }
          return false;
        }

        case 'element_id': {
          return !!document.getElementById(rule.value);
        }

        case 'cookie': {
          return document.cookie.toLowerCase().includes(rule.value.toLowerCase());
        }

        case 'head_comment': {
          const html = document.documentElement.innerHTML;
          return html.toLowerCase().includes(('<!--' + rule.value).toLowerCase());
        }

        case 'input_name': {
          return !!document.querySelector(`input[name="${rule.value}"]`);
        }

        default:
          return false;
      }
    } catch (e) {
      return false;
    }
  }

  const detected = detect();

  chrome.storage.local.set({
    [`stacksnap_${window.location.hostname}`]: {
      url: window.location.href,
      hostname: window.location.hostname,
      detected,
      scannedAt: Date.now()
    }
  });

  chrome.runtime.sendMessage({
    type: 'STACKSNAP_RESULT',
    payload: {
      url: window.location.href,
      hostname: window.location.hostname,
      detected,
      scannedAt: Date.now()
    }
  }).catch(() => {});

})();
