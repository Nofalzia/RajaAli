document.addEventListener('DOMContentLoaded', function () {
  const video = document.querySelector('.background-video video');
  const videoPoster = document.getElementById('video-poster');

  // Load and play the video
  function loadAndPlayVideo() {
    if (!video || video.src) return; // Prevent reloading if already loaded

    const dataSrc = video.getAttribute('data-src');
    if (dataSrc) {
      const source = document.createElement('source');
      source.src = dataSrc;
      source.type = 'video/mp4';
      video.appendChild(source);
      video.load();
      video.play().catch(() => {}); // Avoid autoplay errors
      video.removeAttribute('data-src');
      if (videoPoster) videoPoster.style.display = 'none';
    }
  }

  // Scroll-based trigger
  window.addEventListener('scroll', function () {
    const videoWrapper = document.getElementById('video-wrapper');
    if (!videoWrapper) return;

    const videoOffsetTop = videoWrapper.offsetTop;
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;

    if (scrollY + windowHeight > videoOffsetTop && !video.src) {
      loadAndPlayVideo();
    }
  });

  // Poster click trigger
  if (videoPoster) {
    videoPoster.addEventListener('click', loadAndPlayVideo);
  }
});
