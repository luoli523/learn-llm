document.addEventListener('DOMContentLoaded', function () {
  // Derive _static base URL from an existing static asset link
  var staticBase = (function () {
    var el = document.querySelector('link[href*="/_static/"], script[src*="/_static/"]');
    if (!el) return '_static';
    var href = el.href || el.src;
    return href.split('/_static/')[0] + '/_static';
  })();

  // ── Inject modal ──
  var overlay = document.createElement('div');
  overlay.id = 'guige-modal-overlay';
  overlay.innerHTML =
    '<div id="guige-modal-box">' +
      '<button id="guige-close-btn" title="关闭">✕</button>' +
      '<video id="guige-video" controls>' +
        '<source src="' + staticBase + '/guige-song.mp4" type="video/mp4">' +
      '</video>' +
    '</div>';
  document.body.appendChild(overlay);

  var video = document.getElementById('guige-video');

  function closeModal() {
    overlay.style.display = 'none';
    video.pause();
  }

  document.getElementById('guige-close-btn').addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  // ── Inject header button ──
  var container = document.querySelector('.article-header-buttons');
  if (!container) return;

  var btn = document.createElement('button');
  btn.className = 'guige-song-btn';
  btn.setAttribute('aria-label', '听首歌');
  btn.innerHTML = '🎵';

  btn.addEventListener('click', function () {
    overlay.style.display = 'flex';
    video.play();
  });

  container.insertBefore(btn, container.firstChild);
});
