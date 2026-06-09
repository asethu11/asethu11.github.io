// Shared behaviors for long-form article / case-study pages.
// JS counterpart to /design-system/article.css. Drives three things, each
// guarded so a page can opt out simply by omitting the markup:
//   1. the sticky reading-progress rail
//   2. the light/dark theme toggle + "optimized for light mode" toast
//   3. TOC active-link scrollspy
//
// Load once, at the end of <body>:  <script src="/design-system/article.js"></script>
// If the page defines window.updateImages (theme-aware image swapping), the
// theme toggle calls it after switching so artwork tracks the forced theme.
(function () {
  'use strict';

  // ---- Reading-progress rail ----
  function initReadingProgress() {
    var fill = document.querySelector('.reading-progress-fill');
    if (!fill) return;
    var track = document.querySelector('.reading-progress');
    var tocWrapper = document.querySelector('.toc-wrapper');
    var tocNav = document.querySelector('.toc-nav');

    function updateTrackBounds() {
      if (!track || !tocWrapper || !tocNav) return;
      var wrapperRect = tocWrapper.getBoundingClientRect();
      var navRect = tocNav.getBoundingClientRect();
      track.style.top = (navRect.top - wrapperRect.top) + 'px';
      track.style.height = navRect.height + 'px';
    }

    function updateProgress() {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 98 : 0;
      fill.style.height = progress + '%';
    }

    updateTrackBounds();
    updateProgress();
    document.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', function () { updateTrackBounds(); updateProgress(); });
  }

  // ---- Toast + light/dark theme toggle ----
  function initThemeToggle() {
    var toast = document.querySelector('.toast');
    var toastSwitch = document.getElementById('toast-switch-light');
    var toastDismiss = document.getElementById('toast-dismiss');
    var themeToggle = document.getElementById('theme-toggle');

    function prefersDark() {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    function applyForcedTheme(theme) {
      document.documentElement.classList.remove('force-light', 'force-dark');
      if (theme === 'light') document.documentElement.classList.add('force-light');
      else if (theme === 'dark') document.documentElement.classList.add('force-dark');
      if (theme) {
        sessionStorage.setItem('forcedTheme', theme);
        sessionStorage.setItem('lightModeToastDismissed', '1');
      } else {
        sessionStorage.removeItem('forcedTheme');
      }
      if (typeof window.updateImages === 'function') window.updateImages();
      updateToggleLabel();
      if (toast) toast.classList.remove('show');
    }

    function dismissToast() {
      sessionStorage.setItem('lightModeToastDismissed', '1');
      if (toast) toast.classList.remove('show');
    }

    function updateToggleLabel() {
      if (!themeToggle) return;
      var isForcedLight = document.documentElement.classList.contains('force-light');
      var isForcedDark = document.documentElement.classList.contains('force-dark');
      var isDark = isForcedDark || (!isForcedLight && prefersDark());
      themeToggle.textContent = isDark ? 'Switch to light' : 'Switch to dark';
      themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    }

    function toggleTheme() {
      var isForcedLight = document.documentElement.classList.contains('force-light');
      var isForcedDark = document.documentElement.classList.contains('force-dark');
      var target = isForcedLight ? 'dark' : isForcedDark ? 'light' : (prefersDark() ? 'light' : 'dark');
      if (!document.startViewTransition) { applyForcedTheme(target); return; }
      var t = document.startViewTransition(function () { applyForcedTheme(target); });
      t.ready.then(function () {
        document.documentElement.animate(
          { clipPath: ['inset(0 0 100% 0)', 'inset(0)'] },
          { pseudoElement: '::view-transition-new(root)', duration: 600, easing: 'ease-in-out' }
        );
      });
    }

    function showToastIfNeeded() {
      if (!toast) return;
      var dismissed = sessionStorage.getItem('lightModeToastDismissed') === '1';
      var forcedLight = document.documentElement.classList.contains('force-light');
      var forcedDark = document.documentElement.classList.contains('force-dark');
      if (prefersDark() && !dismissed && !forcedLight && !forcedDark) toast.classList.add('show');
    }

    if (toastSwitch) toastSwitch.addEventListener('click', function () { applyForcedTheme('light'); });
    if (toastDismiss) toastDismiss.addEventListener('click', dismissToast);
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

    var storedTheme = sessionStorage.getItem('forcedTheme');
    if (storedTheme === 'light' || storedTheme === 'dark') applyForcedTheme(storedTheme);
    else updateToggleLabel();
    showToastIfNeeded();
  }

  // ---- TOC active-link scrollspy ----
  function initTocScrollspy() {
    var tocLinks = document.querySelectorAll('.toc-list a');
    if (!tocLinks.length) return;

    // Resolve each section from the link's own href, so this works whether the
    // target id lives on an <h2> or a wrapping <section>. Only sections that are
    // actually in the TOC get tracked.
    var sections = [];
    Array.prototype.forEach.call(tocLinks, function (link) {
      var href = link.getAttribute('href') || '';
      if (href.charAt(0) === '#' && href.length > 1) {
        var el = document.getElementById(href.slice(1));
        if (el) sections.push(el);
      }
    });
    if (!sections.length) return;

    var lastScrollY = window.scrollY;

    function updateActiveLink() {
      var currentScrollY = window.scrollY;
      var scrollingUp = currentScrollY < lastScrollY;
      lastScrollY = currentScrollY;

      // Directional hysteresis: a slightly higher trigger line when scrolling
      // down than up, so the active item doesn't flicker around boundaries.
      var threshold = scrollingUp ? 0.20 : 0.25;
      var scrollPos = currentScrollY + (window.innerHeight * threshold);
      var current = null;

      for (var i = 0; i < sections.length; i++) {
        var top = sections[i].offsetTop;
        var nextTop = sections[i + 1] ? sections[i + 1].offsetTop : Infinity;
        if (scrollPos >= top && scrollPos < nextTop) { current = sections[i]; break; }
      }
      if (!current) {
        var last = sections[sections.length - 1];
        if (scrollPos >= last.offsetTop) current = last;
      }
      if (!current) return;

      var id = current.getAttribute('id');
      Array.prototype.forEach.call(tocLinks, function (l) { l.classList.remove('active'); });
      var active = document.querySelector('.toc-list a[href="#' + id + '"]');
      if (active) active.classList.add('active');
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
  }

  function init() {
    initReadingProgress();
    initThemeToggle();
    initTocScrollspy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
