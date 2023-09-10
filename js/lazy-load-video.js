document.addEventListener('DOMContentLoaded', function () {
    const video = document.querySelector('.background-video video');
    const videoPoster = document.getElementById('video-poster');
  
    // Function to load and play the video
    function loadAndPlayVideo() {
      if (video.canPlayType && video.canPlayType('video/mp4').replace(/no/, '')) {
        const videoSource = video.querySelector('source').getAttribute('src');
        video.src = videoSource;
        video.load();
        video.play();
        videoPoster.style.display = 'none'; // Hide the poster image when the video starts
      }
    }
  
    // Add an event listener to load the video when it comes into the viewport
    window.addEventListener('scroll', function () {
      const videoWrapper = document.getElementById('video-wrapper');
      const videoOffsetTop = videoWrapper.offsetTop;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
  
      // Load the video when it's near the viewport
      if (scrollY + windowHeight > videoOffsetTop && !video.getAttribute('src')) {
        loadAndPlayVideo();
      }
    });
  
    // Load the video when the user clicks the poster image
    videoPoster.addEventListener('click', loadAndPlayVideo);
  });
  