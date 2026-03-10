/**
 * Copy-to-clipboard for code blocks.
 * Injects a ghost-style button into each <pre> that contains <code>.
 * Button appears on hover (via CSS in pymdownx.css).
 */
(function () {
  var ICON_COPY = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
  var ICON_CHECK = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  document.querySelectorAll('pre > code').forEach(function (codeEl) {
    var pre = codeEl.parentElement;
    // Skip if already has a copy button (e.g., re-run)
    if (pre.querySelector('.copy-code-btn')) return;

    // Wrap pre in a relative container if not already wrapped
    var wrapper = pre.closest('.highlight') || pre.parentElement;
    if (getComputedStyle(wrapper).position === 'static') {
      wrapper.style.position = 'relative';
    }

    var btn = document.createElement('button');
    btn.className = 'copy-code-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Copy code');
    btn.innerHTML = ICON_COPY;

    btn.addEventListener('click', function () {
      var text = codeEl.textContent;
      navigator.clipboard.writeText(text).then(function () {
        btn.innerHTML = ICON_CHECK;
        btn.classList.add('copied');
        setTimeout(function () {
          btn.innerHTML = ICON_COPY;
          btn.classList.remove('copied');
        }, 2000);
      }).catch(function () {
        // Clipboard API unavailable (e.g., non-secure context)
      });
    });

    // Insert button into the wrapper (not the pre, to avoid scroll issues)
    wrapper.appendChild(btn);
  });
})();
