/**
 * PM OS — Shared Navbar Component
 * Theme-aware: adapts to light/dark mode using CSS variables from the page.
 * Include via: <script src="/resources/navbar.js"></script>
 */
(function () {
  'use strict';

  /* ── Config ── */
  const NAV_LINKS = [
    { label: 'Action Tracker', href: '/tracker', aliases: ['/', '/dashboard'] },
    { label: '1:1 Check-in', href: '/sync' },
    { label: 'Backlogs', href: '/backlog' },
    { label: 'Explorer', href: '/docs' },
  ];

  const AVATAR_INITIALS = 'PM';
  const AVATAR_IMAGE = ''; /* Replace with your own avatar path, e.g. '/resources/profile.jpg' */

  /* ── Determine active link ── */
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  function isActive(link) {
    if (currentPath === link.href) return true;
    if (link.aliases && link.aliases.includes(currentPath)) return true;
    return false;
  }

  /* ── Inject CSS ── */
  const style = document.createElement('style');
  style.textContent = `
    /* ─── PM OS Navbar — Theme-Aware ─── */
    .velyo-nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 200;
      height: 56px;
      background: var(--surface, #fafafc);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border, #dcdce8);
      font-family: 'Google Sans', 'Google Sans Text', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      transition: background 0.2s, border-color 0.2s;
    }
    /* Seamless navbar on homepage */
    .page-home .velyo-nav {
      background: transparent;
      border-bottom-color: transparent;
      backdrop-filter: none;
      -webkit-backdrop-filter: none;
    }
    .velyo-nav * { box-sizing: border-box; margin: 0; padding: 0; }
    .velyo-nav-inner {
      max-width: 100%;
      height: 56px;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      align-items: center;
      gap: 32px;
    }

    /* Logo */
    .velyo-nav-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      flex-shrink: 0;
    }
    .velyo-nav-logo img {
      width: 28px;
      height: 28px;
      object-fit: contain;
      transition: opacity 0.15s;
    }
    .velyo-nav-logo:hover img { opacity: 0.8; }
    .velyo-nav-logo-text {
      font-family: 'Google Sans', 'Inter', -apple-system, sans-serif;
      font-size: 18px;
      font-weight: 700;
      color: var(--text, #e8eaed);
      letter-spacing: -0.3px;
    }
    .velyo-nav-logo:hover .velyo-nav-logo-text { opacity: 0.8; }

    /* Center links */
    .velyo-nav-links {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      height: 56px;
      flex: 1;
    }
    .velyo-nav-link {
      position: relative;
      display: flex;
      align-items: center;
      height: 56px;
      padding: 0 16px;
      font-size: 14px;
      font-weight: 500;
      color: var(--text, #1c1c2e);
      text-decoration: none;
      transition: color 0.15s;
      white-space: nowrap;
    }
    .velyo-nav-link:hover { color: var(--blue, #6c5ce7); }
    .velyo-nav-link.active {
      color: var(--text, #1c1c2e);
      font-weight: 600;
    }
    .velyo-nav-link.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 16px;
      right: 16px;
      height: 2px;
      background: var(--blue, #6c5ce7);
      border-radius: 1px 1px 0 0;
    }

    /* Right section */
    .velyo-nav-right {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 20px;
    }

    /* Search trigger button (magnifying glass only) */
    .velyo-nav-search-trigger {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--border, #dcdce8);
      background: transparent;
      color: var(--text-secondary, #52526e);
      border-radius: 50%;
      cursor: pointer;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
      flex-shrink: 0;
    }
    .velyo-nav-search-trigger:hover {
      background: var(--surface-dim, #f2f2f8);
      color: var(--text, #1c1c2e);
    }
    .velyo-nav-search-trigger svg { width: 18px; height: 18px; }

    /* Search overlay — centered floating bar */
    .velyo-search-overlay {
      position: fixed;
      inset: 0;
      z-index: 500;
      background: rgba(0,0,0,0.4);
      display: none;
      align-items: flex-start;
      justify-content: center;
      padding-top: 120px;
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
    }
    .velyo-search-overlay.visible { display: flex; }
    .velyo-search-panel {
      width: 560px;
      max-width: 92vw;
      background: var(--surface, #fafafc);
      border: 1px solid var(--border, #dcdce8);
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
      animation: search-appear 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    @keyframes search-appear {
      from { opacity: 0; transform: translateY(-12px) scale(0.97); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    .velyo-search-panel-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      border-bottom: 1px solid var(--border-light, var(--border, #e8eaed));
    }
    .velyo-search-panel-icon {
      width: 20px;
      height: 20px;
      color: var(--text-muted, #9aa0a6);
      flex-shrink: 0;
    }
    .velyo-search-panel input {
      flex: 1;
      border: none;
      background: transparent;
      color: var(--text, #202124);
      font-size: 16px;
      font-family: inherit;
      outline: none;
    }
    .velyo-search-panel input::placeholder { color: var(--text-muted, #9aa0a6); }
    .velyo-search-panel-hint {
      font-size: 12px;
      color: var(--text-muted, #9aa0a6);
      padding: 2px 8px;
      background: var(--surface-dim, #f8f9fa);
      border-radius: 4px;
      flex-shrink: 0;
    }

    /* Search results inside overlay panel */
    .velyo-nav-search-results {
      max-height: 320px;
      overflow-y: auto;
      padding: 8px;
      display: none;
    }
    .velyo-nav-search-results.visible { display: block; }
    .velyo-search-result {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      border-radius: 10px;
      color: var(--text-secondary, #52526e);
      text-decoration: none;
      font-size: 14px;
      transition: background 0.1s;
    }
    .velyo-search-result:hover,
    .velyo-search-result.highlighted { background: var(--blue-bg, rgba(108,92,231,0.08)); color: var(--blue, #6c5ce7); }
    .velyo-search-result-icon {
      width: 16px;
      height: 16px;
      color: var(--text-muted, #9090a5);
      flex-shrink: 0;
    }
    .velyo-search-no-results {
      padding: 16px;
      color: var(--text-muted, #9090a5);
      font-size: 14px;
      text-align: center;
    }

    /* Theme toggle button */
    .velyo-nav-theme-btn {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--border, #dcdce8);
      background: transparent;
      color: var(--text-secondary, #52526e);
      border-radius: 50%;
      cursor: pointer;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
      flex-shrink: 0;
    }
    .velyo-nav-theme-btn:hover {
      background: var(--surface-dim, #f2f2f8);
      color: var(--text, #1c1c2e);
    }
    .velyo-nav-theme-btn svg { width: 18px; height: 18px; }
    .velyo-nav-theme-btn .icon-moon { display: none; }
    [data-theme="dark"] .velyo-nav-theme-btn .icon-sun { display: none; }
    [data-theme="dark"] .velyo-nav-theme-btn .icon-moon { display: block; }

    /* Avatar */
    .velyo-nav-avatar {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: linear-gradient(135deg, #3B82F6, #6366F1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
      color: #fff;
      cursor: pointer;
      flex-shrink: 0;
      overflow: hidden;
      transition: box-shadow 0.15s;
      position: relative;
    }
    .velyo-nav-avatar:hover { box-shadow: 0 0 0 2px var(--blue, #6c5ce7); }
    .velyo-nav-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }

    /* Avatar dropdown */
    .velyo-nav-avatar-menu {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      width: 200px;
      background: var(--surface, #fafafc);
      border: 1px solid var(--border, #dcdce8);
      border-radius: 16px;
      padding: 8px;
      display: none;
      box-shadow: var(--shadow-md, 0 1px 2px rgba(60,64,67,0.3), 0 2px 6px 2px rgba(60,64,67,0.15));
      z-index: 300;
    }
    .velyo-nav-avatar-menu.visible { display: block; }
    .velyo-avatar-menu-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      border-radius: 10px;
      color: var(--text-secondary, #52526e);
      font-size: 13px;
      cursor: pointer;
      border: none;
      background: none;
      width: 100%;
      font-family: inherit;
      text-decoration: none;
      transition: background 0.1s;
    }
    .velyo-avatar-menu-item:hover { background: var(--blue-bg, rgba(108,92,231,0.08)); color: var(--blue, #6c5ce7); }
    .velyo-avatar-menu-item svg { width: 16px; height: 16px; flex-shrink: 0; }
    .velyo-avatar-menu-divider { border: none; border-top: 1px solid var(--border, #dcdce8); margin: 4px 0; }

    /* Responsive */
    @media (max-width: 768px) {
      .velyo-nav-inner { padding: 0 12px; gap: 12px; }
      .velyo-nav-link { padding: 0 8px; font-size: 13px; }
    }
    @media (max-width: 560px) {
      .velyo-nav-links { overflow-x: auto; -webkit-overflow-scrolling: touch; }
    }
  `;
  document.head.appendChild(style);

  /* ── Build HTML ── */
  const nav = document.createElement('nav');
  nav.className = 'velyo-nav';

  // SVG icons
  const searchSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
  const pageSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>';
  const homeSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>';

  // Links HTML
  const linksHtml = NAV_LINKS.map(link => {
    const cls = isActive(link) ? 'velyo-nav-link active' : 'velyo-nav-link';
    return `<a href="${link.href}" class="${cls}">${link.label}</a>`;
  }).join('');

  // Avatar content (with fallback to initials if image fails)
  const avatarContent = AVATAR_IMAGE
    ? `<img src="${AVATAR_IMAGE}" alt="Profile" onerror="this.style.display='none';this.parentElement.textContent='${AVATAR_INITIALS}'">`
    : AVATAR_INITIALS;

  nav.innerHTML = `
    <div class="velyo-nav-inner">
      <a href="/home" class="velyo-nav-logo">
        <!-- Replace with your own logo: <img src="/resources/logo.png" alt="PM OS"> -->
        <span class="velyo-nav-logo-text">PM OS</span>
      </a>
      <div class="velyo-nav-links">${linksHtml}</div>
      <div class="velyo-nav-right">
        <button class="velyo-nav-search-trigger" id="velyo-search-trigger" title="Search (⌘K)">
          ${searchSvg}
        </button>
        <button class="velyo-nav-theme-btn" id="velyo-theme-toggle" title="Toggle dark mode">
          <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
        </button>
        <div class="velyo-nav-avatar" id="velyo-avatar" title="Menu">
          ${avatarContent}
          <div class="velyo-nav-avatar-menu" id="velyo-avatar-menu">
            <a href="/home" class="velyo-avatar-menu-item">${homeSvg} Home</a>
            <hr class="velyo-avatar-menu-divider">
            <!-- Add your own menu items here -->
          </div>
        </div>
      </div>
    </div>
  `;

  /* ── Insert into DOM ── */
  const oldNav = document.querySelector('.global-nav') || document.querySelector('nav:not(.velyo-nav)');
  if (oldNav) {
    document.body.insertBefore(nav, oldNav);
    oldNav.remove();
  } else {
    document.body.insertBefore(nav, document.body.firstChild);
  }

  // Remove old sidebar if present
  const oldSidebar = document.getElementById('sidebar');
  const oldOverlay = document.getElementById('sidebar-overlay');
  if (oldSidebar) oldSidebar.remove();
  if (oldOverlay) oldOverlay.remove();

  /* ── Theme toggle ── */
  const themeToggle = document.getElementById('velyo-theme-toggle');
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  });

  /* ── Search overlay ── */
  const searchOverlay = document.createElement('div');
  searchOverlay.className = 'velyo-search-overlay';
  searchOverlay.id = 'velyo-search-overlay';
  searchOverlay.innerHTML = `
    <div class="velyo-search-panel">
      <div class="velyo-search-panel-header">
        <div class="velyo-search-panel-icon">${searchSvg}</div>
        <input type="text" placeholder="Search pages and items..." id="velyo-search-input" autocomplete="off">
        <span class="velyo-search-panel-hint">ESC</span>
      </div>
      <div class="velyo-nav-search-results" id="velyo-search-results"></div>
    </div>
  `;
  document.body.appendChild(searchOverlay);

  const searchTrigger = document.getElementById('velyo-search-trigger');
  const searchInput = document.getElementById('velyo-search-input');
  const searchResults = document.getElementById('velyo-search-results');
  let highlightedIdx = -1;

  function openSearch() {
    searchOverlay.classList.add('visible');
    setTimeout(() => searchInput.focus(), 50);
  }
  function closeSearch() {
    searchOverlay.classList.remove('visible');
    searchInput.value = '';
    searchResults.classList.remove('visible');
    highlightedIdx = -1;
  }

  searchTrigger.addEventListener('click', openSearch);
  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) closeSearch();
  });

  const searchablePages = [
    { label: 'Action Tracker', href: '/tracker', keywords: 'action tracker tasks todo' },
    { label: '1:1 Check-in', href: '/sync', keywords: 'sync one on one check-in checkin hub manager' },
    { label: 'Backlogs', href: '/backlog', keywords: 'backlog ideas product' },
    { label: 'Explorer', href: '/docs', keywords: 'explorer docs documents markdown files viewer editor' },
    { label: 'Home', href: '/home', keywords: 'home landing workspace' },
  ];

  function renderSearchResults(query) {
    if (!query.trim()) {
      searchResults.classList.remove('visible');
      return;
    }
    const q = query.toLowerCase();
    const matches = searchablePages.filter(p =>
      p.label.toLowerCase().includes(q) || p.keywords.includes(q)
    );

    const pageMatches = [];
    document.querySelectorAll('.task-name, .point-topic, .backlog-name, h3, h4').forEach(el => {
      const text = el.textContent.trim();
      if (text.toLowerCase().includes(q) && text.length < 100) {
        if (!pageMatches.find(m => m.label === text)) {
          pageMatches.push({ label: text, href: '#', keywords: '', isPageItem: true });
        }
      }
    });

    const allMatches = [...matches, ...pageMatches.slice(0, 5)];

    if (allMatches.length === 0) {
      searchResults.innerHTML = '<div class="velyo-search-no-results">No results</div>';
    } else {
      searchResults.innerHTML = allMatches.map((m, i) => {
        const icon = m.isPageItem
          ? '<svg class="velyo-search-result-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>'
          : `<span class="velyo-search-result-icon">${pageSvg}</span>`;
        return `<a href="${m.href}" class="velyo-search-result${i === highlightedIdx ? ' highlighted' : ''}" data-idx="${i}">${icon} ${m.label}</a>`;
      }).join('');
    }
    highlightedIdx = -1;
    searchResults.classList.add('visible');
  }

  searchInput.addEventListener('input', (e) => renderSearchResults(e.target.value));
  searchInput.addEventListener('keydown', (e) => {
    const items = searchResults.querySelectorAll('.velyo-search-result');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      highlightedIdx = Math.min(highlightedIdx + 1, items.length - 1);
      items.forEach((it, i) => it.classList.toggle('highlighted', i === highlightedIdx));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      highlightedIdx = Math.max(highlightedIdx - 1, 0);
      items.forEach((it, i) => it.classList.toggle('highlighted', i === highlightedIdx));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const active = items[highlightedIdx] || items[0];
      if (active && active.href && active.href !== '#') {
        window.location.href = active.href;
      } else if (active) {
        const text = active.textContent.trim();
        const el = [...document.querySelectorAll('.task-name, .point-topic, .backlog-name, h3, h4')]
          .find(n => n.textContent.trim() === text);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.style.outline = '2px solid var(--blue, #1a73e8)';
          el.style.outlineOffset = '4px';
          el.style.borderRadius = '4px';
          setTimeout(() => { el.style.outline = ''; el.style.outlineOffset = ''; }, 2000);
        }
        closeSearch();
      }
    } else if (e.key === 'Escape') {
      closeSearch();
    }
  });

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (searchOverlay.classList.contains('visible')) {
        closeSearch();
      } else {
        openSearch();
      }
    }
  });

  /* ── Avatar dropdown ── */
  const avatar = document.getElementById('velyo-avatar');
  const avatarMenu = document.getElementById('velyo-avatar-menu');

  avatar.addEventListener('click', (e) => {
    e.stopPropagation();
    avatarMenu.classList.toggle('visible');
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#velyo-avatar')) {
      avatarMenu.classList.remove('visible');
    }
  });

  /* ── Ensure body has correct padding ── */
  document.body.style.paddingTop = '56px';

})();
