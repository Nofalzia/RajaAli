document.addEventListener('DOMContentLoaded', function () {
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
        if (mediaFileName && mediaFileName.endsWith('.mp4')) {
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

  // Hide the new video popup initially
  if(videoPopupNew) videoPopupNew.style.display = 'none';

  videoThumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', () => {
      const videoEl = thumbnail.querySelector('video');
      const mediaSrc = videoEl ? videoEl.getAttribute('data-src') : null;
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

  if (closePopupButtonNew) {
    closePopupButtonNew.addEventListener('click', () => {
      // Hide the new video popup, pause the new video, and reset the source
      videoPopupNew.style.display = 'none';
      videoPlayerNew.pause();
      videoPlayerNew.src = '';
    });
  }
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
const sentenceInterval = setInterval(rotateSentence, 3500);

// Stop interval when loader finishes
document.addEventListener("DOMContentLoaded", function () {
    const video = document.querySelector(".background-video video");
    if (video) {
        // Assume loaded quickly or watch state
        video.addEventListener("play", () => clearInterval(sentenceInterval));
    } else {
        setTimeout(() => clearInterval(sentenceInterval), 3000);
    }
});

// --- Carousel Logic for Stills --- 
document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById('stills-track');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentSlideIndex = 0;

  if (track && prevBtn && nextBtn) {
    const updateCarouselPosition = () => {
      const item = track.querySelector('.carousel-item');
      if (!item) return;
      
      const itemWidth = item.offsetWidth;
      const gap = 20; // Matches flex gap in CSS
      track.style.transform = `translateX(-${currentSlideIndex * (itemWidth + gap)}px)`;
    };

    nextBtn.addEventListener('click', () => {
      const items = track.querySelectorAll('.carousel-item');
      const itemsPerView = window.innerWidth > 900 ? 3 : 1;
      
      if (currentSlideIndex < items.length - itemsPerView) {
        currentSlideIndex++;
        updateCarouselPosition();
      } else {
        currentSlideIndex = 0;
        updateCarouselPosition();
      }
    });

    prevBtn.addEventListener('click', () => {
      const items = track.querySelectorAll('.carousel-item');
      const itemsPerView = window.innerWidth > 900 ? 3 : 1;
      
      if (currentSlideIndex > 0) {
        currentSlideIndex--;
        updateCarouselPosition();
      } else {
        currentSlideIndex = items.length - itemsPerView;
        updateCarouselPosition();
      }
    });

    window.addEventListener('resize', () => {
      const items = track.querySelectorAll('.carousel-item');
      const itemsPerView = window.innerWidth > 900 ? 3 : 1;
      if (currentSlideIndex > items.length - itemsPerView) {
          currentSlideIndex = Math.max(0, items.length - itemsPerView);
      }
      updateCarouselPosition();
    });
  }
});
