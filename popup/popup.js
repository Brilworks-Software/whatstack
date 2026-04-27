// popup/popup.js

const CATEGORY_ORDER = [
  'framework', 'library', 'cms', 'ecommerce', 'analytics',
  'hosting', 'cdn', 'build-tool', 'payment', 'auth',
  'maps', 'video', 'database', 'language', 'security'
];

const CATEGORY_LABELS = {
  framework:    'Frameworks',
  library:      'Libraries & UI',
  cms:          'CMS',
  ecommerce:    'E-Commerce',
  analytics:    'Analytics & Marketing',
  hosting:      'Hosting',
  cdn:          'CDN',
  'build-tool': 'Build Tools',
  payment:      'Payments',
  auth:         'Auth & Identity',
  maps:         'Maps',
  video:        'Video',
  database:     'Database & BaaS',
  language:     'Language / Backend',
  security:     'Security'
};

const CONFIDENCE_LABELS = {
  confirmed: 'Confirmed',
  likely:    'Likely',
  possible:  'Possible'
};

let currentResults = [];
let activeFilter   = 'all';
let searchQuery    = '';

function mergeResults(domResults, hdrResults) {
  const merged = [...(domResults || [])];
  const byName = new Map(merged.map(r => [r.name, r]));

  for (const h of (hdrResults || [])) {
    if (byName.has(h.name)) {
      byName.get(h.name).confidence = 'confirmed';
      byName.get(h.name).fromHeaders = true; // Mark as also found in headers
    } else {
      merged.push(h);
      byName.set(h.name, h);
    }
  }
  return merged;
}

async function loadMerged(domKey, hdrKey) {
  const [domStore, hdrStore] = await Promise.all([
    chrome.storage.local.get(domKey),
    chrome.storage.local.get(hdrKey)
  ]);
  const dom = domStore[domKey]?.detected ?? null;
  const hdr = hdrStore[hdrKey] ?? [];
  return { dom, hdr };
}

async function init() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab || !tab.url || tab.url.startsWith('chrome://') || tab.url.startsWith('edge://')) {
    showState('error');
    return;
  }

  const hostname = new URL(tab.url).hostname;
  document.getElementById('siteUrl').textContent = hostname;
  
  const domKey = `stacksnap_${hostname}`;
  const hdrKey = `stacksnap_hdrs_${hostname}`;

  let { dom, hdr } = await loadMerged(domKey, hdrKey);

  // If we have ANY data (DOM or HDR), show it immediately
  if (dom !== null || hdr.length > 0) {
    showResults(mergeResults(dom, hdr));
  } else {
    showState('scanning');
  }

  // Always trigger a re-scan request to ensure fresh data
  try {
    // 1. Tell existing content script to re-scan
    chrome.tabs.sendMessage(tab.id, { type: 'STACKSNAP_RESCAN' }).catch(() => {
        // 2. If no script is there, inject it
        return chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['data/signatures.js', 'content/detector.js']
        });
    });

    // Wait and update if new results come in
    await pollForResult(domKey, 3000);
    const updated = await loadMerged(domKey, hdrKey);
    showResults(mergeResults(updated.dom, updated.hdr));
  } catch (e) {
    if (currentResults.length === 0) showState('error');
  }

  // ─── Listeners ─────────────────────────────────────────────────────────────
  
  document.getElementById('refreshBtn').addEventListener('click', async () => {
    const [t] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (t) {
      await chrome.storage.local.remove([domKey, hdrKey]);
      chrome.tabs.reload(t.id);
      window.close();
    }
  });

  document.getElementById('copyBtn').addEventListener('click', () => copyAsMarkdown());

  document.getElementById('searchInput').addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderFilterTabs();
    renderList();
  });
}

function pollForResult(key, timeout) {
  return new Promise((resolve) => {
    const start = Date.now();
    const interval = setInterval(async () => {
      const result = await chrome.storage.local.get(key);
      if (result[key] || Date.now() - start > timeout) {
        clearInterval(interval);
        resolve();
      }
    }, 200);
  });
}

function showResults(detected) {
  currentResults = detected || [];

  if (!currentResults.length) {
    // If we're still waiting (it's very early), don't show empty yet
    return;
  }

  showState('results');
  renderFilterTabs();
  renderList();
}

function getFiltered() {
  return currentResults.filter(r => {
    const matchesCat = activeFilter === 'all' || r.category === activeFilter;
    const matchesSearch = !searchQuery ||
      r.name.toLowerCase().includes(searchQuery) ||
      r.category.toLowerCase().includes(searchQuery) ||
      (r.version && r.version.toLowerCase().includes(searchQuery));
    return matchesCat && matchesSearch;
  });
}

function renderFilterTabs() {
  const tabs = document.getElementById('filterTabs');
  const filtered = getFiltered();

  const categories = [...new Set(currentResults.map(r => r.category))]
    .sort((a, b) => CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b));

  tabs.innerHTML = '';

  const allCount = searchQuery ? filtered.length : currentResults.length;
  const allTab = document.createElement('button');
  allTab.className = `filter-tab ${activeFilter === 'all' ? 'active' : ''}`;
  allTab.textContent = `All (${allCount})`;
  allTab.onclick = () => { activeFilter = 'all'; renderFilterTabs(); renderList(); };
  tabs.appendChild(allTab);

  for (const cat of categories) {
    const count = searchQuery
      ? currentResults.filter(r => r.category === cat && (r.name.toLowerCase().includes(searchQuery) || r.category.toLowerCase().includes(searchQuery))).length
      : currentResults.filter(r => r.category === cat).length;
    if (count === 0) continue;

    const btn = document.createElement('button');
    btn.className = `filter-tab ${activeFilter === cat ? 'active' : ''}`;
    btn.textContent = `${CATEGORY_LABELS[cat] || cat} (${count})`;
    btn.onclick = () => { activeFilter = cat; renderFilterTabs(); renderList(); };
    tabs.appendChild(btn);
  }
}

function renderList() {
  const list = document.getElementById('resultsList');
  const filtered = getFiltered();

  if (!filtered.length) {
    list.innerHTML = `<div class="no-search-results">No results for "<strong>${escapeHtml(searchQuery)}</strong>"</div>`;
    return;
  }

  const grouped = {};
  for (const item of filtered) {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  }

  const sortedCats = Object.keys(grouped).sort(
    (a, b) => CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b)
  );

  list.innerHTML = sortedCats.map(cat => `
    <div class="category-header">${CATEGORY_LABELS[cat] || cat}</div>
    ${grouped[cat].map(item => {
      const verTag = item.version ? `<span class="version-tag">v${item.version}</span>` : '';
      const srcBadge = item.fromHeaders ? `<span class="source-badge" title="Detected from HTTP response headers">HDR</span>` : '';
      const conf = item.confidence || 'possible';
      return `
        <div class="result-item">
          <div class="result-icon" style="background:${item.color}">${item.icon}</div>
          <div class="result-main">
            <div class="result-row">
              <span class="result-name">${escapeHtml(item.name)}</span>
              ${verTag}
              ${srcBadge}
            </div>
            <span class="result-category">${CATEGORY_LABELS[item.category] || item.category}</span>
          </div>
          <div class="result-meta">
            <span class="confidence-dot ${conf}" title="${CONFIDENCE_LABELS[conf] || conf}"></span>
            <a class="result-link" href="${item.website}" target="_blank">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg></a>
          </div>
        </div>
      `;
    }).join('')}
  `).join('');
}

function copyAsMarkdown() {
  const lines = [`# Tech Stack for ${document.getElementById('siteUrl').textContent}`, ''];
  const byCat = {};
  for (const r of currentResults) {
    if (!byCat[r.category]) byCat[r.category] = [];
    byCat[r.category].push(r);
  }
  const sortedCats = Object.keys(byCat).sort((a, b) => CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b));
  for (const cat of sortedCats) {
    lines.push(`### ${CATEGORY_LABELS[cat] || cat}`);
    for (const r of byCat[cat]) {
      const ver = r.version ? ` \`${r.version}\`` : '';
      const conf = r.confidence === 'confirmed' ? ' ✓' : '';
      lines.push(`- ${r.icon} **${r.name}**${ver}${conf}`);
    }
    lines.push('');
  }
  navigator.clipboard.writeText(lines.join('\n'));
  showToast('Copied to clipboard');
}

function showState(state) {
  document.getElementById('stateScanning').style.display = state === 'scanning' ? 'flex'  : 'none';
  document.getElementById('stateResults').style.display  = state === 'results'  ? 'block' : 'none';
  document.getElementById('stateEmpty').style.display    = state === 'empty'    ? 'flex'  : 'none';
  document.getElementById('stateError').style.display    = state === 'error'    ? 'flex'  : 'none';
}

function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

function escapeHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

init();
