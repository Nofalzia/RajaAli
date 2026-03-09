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

// --- MODERN 3D CAROUSEL LOGIC ---
document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById('stills-track');
  if (!track) return;

  const items = Array.from(track.querySelectorAll('.card-carousel-item'));
  const prevBtn = document.querySelector('.card-carousel-container .prev-btn');
  const nextBtn = document.querySelector('.card-carousel-container .next-btn');
  const dots = Array.from(document.querySelectorAll('#stills-pagination .dot'));

  let currentIndex = 0;
  const totalItems = items.length;

  function updateCarousel() {
    items.forEach((item, index) => {
      // Remove all state classes
      item.classList.remove('active', 'prev', 'next', 'hidden-left', 'hidden-right');

      if (index === currentIndex) {
        item.classList.add('active');
      } else if (index === (currentIndex - 1 + totalItems) % totalItems) {
        item.classList.add('prev');
      } else if (index === (currentIndex + 1) % totalItems) {
        item.classList.add('next');
      } else {
        // Determine whether to hide left or right based on shortest path
        let diff = (index - currentIndex + totalItems) % totalItems;
        if (diff > totalItems / 2) {
          item.classList.add('hidden-left');
        } else {
          item.classList.add('hidden-right');
        }
      }
    });

    // Update pagination dots
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function goNext() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel();
  }

  function goPrev() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel();
  }

  // Button Listeners
  if (nextBtn) nextBtn.addEventListener('click', goNext);
  if (prevBtn) prevBtn.addEventListener('click', goPrev);

  // Pagination Dot Listeners
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });
  });

  // Click on side cards to bring them to center
  items.forEach((item, index) => {
    item.addEventListener('click', () => {
       if (item.classList.contains('prev') || item.classList.contains('next')) {
          currentIndex = index;
          updateCarousel();
       }
    });
  });

  // --- SWIPE GESTURE SUPPORT (MOBILE) ---
  let startX = 0;
  let endX = 0;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', () => {
    if (startX - endX > 50) {
      goNext(); // Swiped left
    } else if (endX - startX > 50) {
      goPrev(); // Swiped right
    }
  });

  // Initialize the carousel
  updateCarousel();
});

