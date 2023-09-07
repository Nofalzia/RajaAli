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

    document.addEventListener('DOMContentLoaded', function () {
      const videoThumbnails = document.querySelectorAll('.vids');
      const videoPlayer = document.getElementById('video-player-new'); // Unique ID for the new video player
      const videoPopup = document.querySelector('.video-popup-new'); // Unique class for the new video popup
      const closePopupButton = document.getElementById('close-popup-new'); // Unique ID for the close button in the new gallery
    
      // Hide the new video player initially
      videoPlayer.style.display = 'none';
    
      videoThumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener('click', () => {
          const mediaSrc = thumbnail.querySelector('video').getAttribute('data-src');
          if (mediaSrc) {
            // Set the new video source
            videoPlayer.src = mediaSrc;
            videoPlayer.style.display = 'block';
    
            // Programmatically play the new video
            videoPlayer.play().catch((error) => {
              // Autoplay was prevented, you can handle this here
              console.error('Autoplay prevented:', error);
            });
    
            // Show the new video popup
            videoPopup.style.display = 'flex';
          }
        });
      });
    
      closePopupButton.addEventListener('click', () => {
        // Hide the new video popup, pause the new video, and reset the source
        videoPopup.style.display = 'none';
        videoPlayer.pause();
        videoPlayer.src = '';
      });
    });
    