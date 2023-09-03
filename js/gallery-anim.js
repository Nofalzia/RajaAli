document.addEventListener('DOMContentLoaded', function () {
  const thumbnails = document.querySelectorAll('.thumbnail');
  const videoPlayer = document.getElementById('video-player');
  const videoPopup = document.querySelector('.video-popup');
  const closePopupButton = document.getElementById('close-popup');
  
  // Hide the video player initially
  videoPlayer.style.display = 'none';
  
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', () => {
      const mediaFileName = thumbnail.getAttribute('data-media');
      if (mediaFileName.endsWith('.mp4')) {
        // If the clicked thumbnail is a video, set the video source
        const videoSource = `assets/${mediaFileName}`;
        videoPlayer.src = videoSource;
        videoPlayer.style.display = 'block';
        
        // Programmatically play the video
        videoPlayer.play().catch((error) => {
          // Autoplay was prevented, you can handle this here
          console.error('Autoplay prevented:', error);
        });

            // Show the video popup
            videoPopup.style.display = 'flex';
          }
        });
      });
      
      closePopupButton.addEventListener('click', () => {
        videoPopup.style.display = 'none';
        videoPlayer.pause();
        videoPlayer.src = '';
      });
      
    });