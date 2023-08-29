// Autoplay the videos on page load
videos.forEach((video) => {
  video.play();
});

// Pause videos when they leave the viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting && !isPlaying[index]) {
      let video = entry.target;
      video.play();
      isPlaying[index] = true;
    } else if (!entry.isIntersecting && isPlaying[index] && !videoWrappers[index].classList.contains('expanded')) {
      let video = entry.target;
      video.pause();
      isPlaying[index] = false;
    }
  });
});

videos.forEach((video) => {
  observer.observe(video);
});

const lazyVideos = document.querySelectorAll('video[data-src]');

const lazyLoad = target => {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const video = entry.target;
        video.src = video.getAttribute('data-src');
        video.removeAttribute('data-src');
        observer.disconnect();
      }
    });
  });

  io.observe(target);
};

lazyVideos.forEach(lazyLoad);