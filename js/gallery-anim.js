const track = document.getElementById("image-track");
const heading = document.getElementById("Heading");

var trackRect = track.getBoundingClientRect();
var headingRect = heading.getBoundingClientRect();

if (
  trackRect.bottom > headingRect.top &&
  trackRect.right > headingRect.left &&
  trackRect.top < headingRect.bottom &&
  trackRect.left < headingRect.right
) {
  heading.classList.add("selected");
  console.log("nofal");
}

const handleOnDown = (e) => (track.dataset.mouseDownAt = e.clientX);

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = (e) => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translate(${nextPercentage}%, -50%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("image")) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

/* -- Adding touch event listeners -- */

window.onmousedown = (e) => handleOnDown(e);

window.ontouchstart = (e) => handleOnDown(e.touches[0]);

window.onmouseup = (e) => handleOnUp(e);

window.ontouchend = (e) => handleOnUp(e.touches[0]);

window.onmousemove = (e) => handleOnMove(e);

window.ontouchmove = (e) => handleOnMove(e.touches[0]);


const videos = document.querySelectorAll('.vids video');
const videoWrappers = document.querySelectorAll('.vids');

videos.forEach((video, index) => {
  video.addEventListener('mouseover', () => {
    video.play();
  });

  video.addEventListener('mouseout', () => {
    video.pause();
    video.currentTime = 0;
  });

  videoWrappers[index].addEventListener('click', () => {
    if (!videoWrappers[index].classList.contains('expanded')) {
      // Expand the video
      videoWrappers[index].classList.add('expanded');
      video.play();
      
      // Hide other videos
      videoWrappers.forEach((wrapper, i) => {
        if (i !== index) {
          wrapper.style.display = 'none';
        }
      });
    } else {
      // Shrink the video
      videoWrappers[index].classList.remove('expanded');
      video.pause();
      video.currentTime = 0;
      
      // Show other videos
      videoWrappers.forEach((wrapper) => {
        wrapper.style.display = 'block';
      });
    }
  });

  video.pause();
});
