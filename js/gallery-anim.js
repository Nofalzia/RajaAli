document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContentLoaded event fired');
    // Original video popup
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

  // New video popup
  const videoThumbnails = document.querySelectorAll('.vids');
  const videoPlayerNew = document.getElementById('video-player-new');
  const videoPopupNew = document.querySelector('.video-popup-new');
  const closePopupButtonNew = document.getElementById('close-popup-new');

  // Hide the new video popup initially (add this line)
  videoPopupNew.style.display = 'none';

  videoThumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', () => {
      const mediaSrc = thumbnail.querySelector('video').getAttribute('data-src');
      if (mediaSrc) {
        // Set the new video source
        videoPlayerNew.src = mediaSrc;
        videoPlayerNew.style.display = 'block';

        // Programmatically play the new video
        videoPlayerNew.play().catch((error) => {
          // Autoplay was prevented, you can handle this here
          console.error('Autoplay prevented:', error);
        });

        // Show the new video popup
        videoPopupNew.style.display = 'flex';
      }
    });
  });

  closePopupButtonNew.addEventListener('click', () => {
    // Hide the new video popup, pause the new video, and reset the source
    videoPopupNew.style.display = 'none';
    videoPlayerNew.pause();
    videoPlayerNew.src = '';
  });
});

// JavaScript code to rotate the sentences
const sentenceContainer = document.getElementById("changing-sentence");
const sentences = sentenceContainer.getElementsByTagName("span");
let currentSentenceIndex = 0;

function rotateSentence() {
  sentences[currentSentenceIndex].style.display = "none";
  currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
  sentences[currentSentenceIndex].style.display = "inline";
}

// Hide all sentences except the first one initially
for (let i = 1; i < sentences.length; i++) {
  sentences[i].style.display = "none";
}

// Change sentence every 3.5 seconds (3500 milliseconds)
setInterval(rotateSentence, 3500);
