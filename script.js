/* DSH Desktop Editions — shared theme-toggle logic.
   Both pages reference this file. It is language-neutral: the aria-label
   text is read from the button's data-label-* attributes so the same script
   serves index.html and index_zh.html. */
(function () {
  'use strict';

  var KEY = 'dsh-theme';
  var root = document.documentElement;
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;

  function currentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  /* The aria-label names the action the button performs. If we're currently
     in light mode, clicking switches to dark, so announce "dark mode"; and
     vice-versa. */
  function applyLabel(isDark) {
    var label = isDark ? btn.getAttribute('data-label-light') : btn.getAttribute('data-label-dark');
    if (label) btn.setAttribute('aria-label', label);
  }

  function applyTheme(theme, persist) {
    root.setAttribute('data-theme', theme);
    if (persist) {
      try {
        localStorage.setItem(KEY, theme);
      } catch (e) {
        /* localStorage unavailable — theme still applies for this session */
      }
    }
    applyLabel(theme === 'dark');
  }

  btn.addEventListener('click', function () {
    applyTheme(currentTheme() === 'dark' ? 'light' : 'dark', true);
  });

  /* keep the aria-label in sync with whatever theme the inline head script set */
  applyLabel(currentTheme() === 'dark');
})();
