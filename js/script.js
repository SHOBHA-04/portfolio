/* ==========================================================================
   Portfolio – Shobha Bharti
   Vanilla JavaScript only. Sections:
   1. Theme toggle   2. Mobile menu   3. Active nav link   4. Scroll reveal
   5. Hide links with no URL   6. Profile photo   7. Footer year
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- 1. Theme toggle ---------- */
  var themeBtn = document.getElementById('theme-toggle');

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeBtn) {
      themeBtn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }

  function hasSavedTheme() {
    try {
      var t = localStorage.getItem('theme');
      return t === 'light' || t === 'dark';
    } catch (e) {
      return false;
    }
  }

  // Sync the button state with the theme set in <head>
  setTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(next);
      try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked: ignore */ }
    });
  }

  // If the visitor never chose a theme, follow system changes
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onSystemChange = function (e) {
      if (!hasSavedTheme()) { setTheme(e.matches ? 'dark' : 'light'); }
    };
    if (mq.addEventListener) { mq.addEventListener('change', onSystemChange); }
    else if (mq.addListener) { mq.addListener(onSystemChange); }
  }

  /* ---------- 2. Mobile menu ---------- */
  var menuBtn = document.getElementById('menu-toggle');
  var nav = document.getElementById('site-nav');

  function setMenu(open) {
    if (!menuBtn || !nav) { return; }
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      setMenu(!nav.classList.contains('open'));
    });

    // Close after a link is clicked
    nav.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('a')) { setMenu(false); }
    });

    // Close with Escape and return focus to the button
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        setMenu(false);
        menuBtn.focus();
      }
    });

    // Close when clicking outside
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !menuBtn.contains(e.target)) {
        setMenu(false);
      }
    });

    // Reset when the window becomes wide
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900) { setMenu(false); }
    });
  }

  /* ---------- 3. Highlight the nav link of the visible section ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('a[data-nav]'));

  function setActive(id) {
    navLinks.forEach(function (link) {
      if (link.getAttribute('href') === '#' + id) { link.setAttribute('aria-current', 'true'); }
      else { link.removeAttribute('aria-current'); }
    });
  }

  var sections = navLinks
    .map(function (link) { return document.getElementById(link.getAttribute('href').slice(1)); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { setActive(entry.target.id); }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { navObserver.observe(s); });

    // Make sure the last section is highlighted when scrolled to the very bottom
    window.addEventListener('scroll', function () {
      var atBottom = window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 4;
      if (atBottom) { setActive(sections[sections.length - 1].id); }
    }, { passive: true });
  }
  setActive('home');

  /* ---------- 4. Fade-in on scroll ---------- */
  var revealItems = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(function (el) { el.classList.add('visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- 5. Hide links that have no URL yet ---------- */
  // Any <a data-optional> with an empty href (or just "#") is hidden.
  Array.prototype.slice.call(document.querySelectorAll('a[data-optional]')).forEach(function (link) {
    var href = (link.getAttribute('href') || '').trim();
    if (href === '' || href === '#') { link.hidden = true; }
  });

  // Hide a whole button row if every link inside it is hidden
  Array.prototype.slice.call(document.querySelectorAll('.project-links')).forEach(function (row) {
    var anyVisible = Array.prototype.slice.call(row.querySelectorAll('a')).some(function (a) { return !a.hidden; });
    if (!anyVisible) { row.hidden = true; }
  });

  /* ---------- 6. Profile photo (optional) ---------- */
  // Shows the photo only if assets/images/profile.jpg exists; otherwise the "SB" initials stay.
  var avatarImg = document.getElementById('avatar-img');
  var avatarInitials = document.getElementById('avatar-initials');

  if (avatarImg && avatarImg.getAttribute('data-src')) {
    var probe = new Image();
    probe.onload = function () {
      avatarImg.src = probe.src;
      avatarImg.hidden = false;
      if (avatarInitials) { avatarInitials.hidden = true; }
    };
    probe.src = avatarImg.getAttribute('data-src');
  }

  /* ---------- 7. Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
})();
