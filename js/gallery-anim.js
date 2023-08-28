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

// Smooth scrolling behavior
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("nav ul li a");
  navLinks.forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

// Video Carousel (Auto-slide)
const carouselTrack = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.carousel-slide'));
let currentIndex = 0;

function updateCarousel() {
  carouselTrack.style.transform = `translateX(-${currentIndex * 33.33}%)`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
}

setInterval(nextSlide, 5000); // Auto-slide every 5 seconds