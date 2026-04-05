/**
 * Silverbit Studio — mobile nav + small UX helpers
 */
(function () {
  'use strict';

  function initNavToggle() {
    var toggles = document.querySelectorAll('[data-nav-toggle]');
    toggles.forEach(function (btn) {
      var panelId = btn.getAttribute('aria-controls');
      if (!panelId) return;
      var panel = document.getElementById(panelId);
      if (!panel) return;
      btn.addEventListener('click', function () {
        var isHidden = panel.classList.contains('hidden');
        if (isHidden) {
          panel.classList.remove('hidden');
          btn.setAttribute('aria-expanded', 'true');
        } else {
          panel.classList.add('hidden');
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavToggle);
  } else {
    initNavToggle();
  }
})();
