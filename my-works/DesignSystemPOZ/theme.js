/* Point One Zero — site behavior (shared by all /pointonezero/ pages)
   - Theme: respects OS by default, manual toggle persists in localStorage.
     The pre-paint <html data-theme> is set by a tiny inline <head> script on
     each page (flash-free); this file wires the toggle button, keeps the page
     in sync with OS changes (until the user picks manually), and runs the
     mobile-nav hamburger. */
(function () {
  var root = document.documentElement;
  var KEY = 'pozTheme';
  var mq = window.matchMedia('(prefers-color-scheme: dark)');

  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function effective() { return root.getAttribute('data-theme') || (mq.matches ? 'dark' : 'light'); }

  function syncToggles() {
    var dark = effective() === 'dark';
    document.querySelectorAll('.theme-toggle, [data-theme-toggle]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
      btn.setAttribute('title', dark ? 'Switch to light' : 'Switch to dark');
    });
  }

  function setTheme(t, persist) {
    root.setAttribute('data-theme', t);
    if (persist) { try { localStorage.setItem(KEY, t); } catch (e) {} }
    syncToggles();
  }

  // Follow OS changes only while the user hasn't made a manual choice.
  mq.addEventListener('change', function (e) {
    if (!stored()) { root.setAttribute('data-theme', e.matches ? 'dark' : 'light'); syncToggles(); }
  });

  function wire() {
    document.querySelectorAll('.theme-toggle, [data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setTheme(effective() === 'dark' ? 'light' : 'dark', true);
      });
    });

    // Mobile nav: toggle `.nav-open` on the nearest <nav> (or [data-nav]).
    document.querySelectorAll('.nav-toggle, [data-nav-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var nav = btn.closest('nav') || document.querySelector('nav') || document.querySelector('[data-nav]');
        if (!nav) return;
        var open = nav.classList.toggle('nav-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });

    // Close the mobile nav when a link inside it is tapped.
    document.querySelectorAll('nav.nav-open, nav').forEach(function (nav) {
      nav.addEventListener('click', function (e) {
        if (e.target.closest('a') && nav.classList.contains('nav-open')) nav.classList.remove('nav-open');
      });
    });

    syncToggles();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire);
  else wire();
})();
