document.addEventListener('DOMContentLoaded', function () {
  // ── Resolve _static base URL ──
  var staticBase = (function () {
    var el = document.querySelector('link[href*="/_static/"], script[src*="/_static/"]');
    if (!el) return '_static';
    var href = el.href || el.src;
    return href.split('/_static/')[0] + '/_static';
  })();

  // ── Avatar: click to lightbox ──
  var logoImg = document.querySelector('.navbar-brand.logo img');
  if (logoImg) {
    var lightbox = document.createElement('div');
    lightbox.id = 'avatar-lightbox';
    lightbox.innerHTML = '<img src="' + staticBase + '/avatar.jpg" alt="鬼哥">';
    document.body.appendChild(lightbox);

    logoImg.addEventListener('click', function (e) {
      e.preventDefault();
      lightbox.style.display = 'flex';
    });
    lightbox.addEventListener('click', function () {
      lightbox.style.display = 'none';
    });
  }

  // ── Floating video player ──
  var player = document.createElement('div');
  player.id = 'guige-player';
  player.innerHTML =
    '<div id="guige-player-bar">' +
      '<span>🎵 看累了听首歌</span>' +
      '<button id="guige-player-close" title="关闭">✕</button>' +
    '</div>' +
    '<video id="guige-video" controls>' +
      '<source src="' + staticBase + '/guige-song.mp4" type="video/mp4">' +
    '</video>';
  document.body.appendChild(player);

  var video = document.getElementById('guige-video');

  document.getElementById('guige-player-close').addEventListener('click', function () {
    player.style.display = 'none';
    video.pause();
  });

  // ── Drag the floating player ──
  var bar = document.getElementById('guige-player-bar');
  var drag = { active: false, startX: 0, startY: 0, origRight: 24, origBottom: 24 };

  bar.addEventListener('mousedown', function (e) {
    drag.active = true;
    drag.startX = e.clientX;
    drag.startY = e.clientY;
    drag.origRight = parseInt(player.style.right || 24);
    drag.origBottom = parseInt(player.style.bottom || 24);
    e.preventDefault();
  });
  document.addEventListener('mousemove', function (e) {
    if (!drag.active) return;
    var dx = e.clientX - drag.startX;
    var dy = e.clientY - drag.startY;
    player.style.right = (drag.origRight - dx) + 'px';
    player.style.bottom = (drag.origBottom - dy) + 'px';
  });
  document.addEventListener('mouseup', function () { drag.active = false; });

  // ── Music button in header ──
  var container = document.querySelector('.article-header-buttons');
  if (!container) return;

  var btn = document.createElement('button');
  btn.className = 'guige-song-btn';
  btn.setAttribute('aria-label', '听首歌');
  btn.innerHTML = '🎵';
  btn.addEventListener('click', function () {
    player.style.display = 'block';
    video.play();
  });
  container.insertBefore(btn, container.firstChild);
});
