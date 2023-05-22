document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.fadeIn').forEach(function(element) {
    element.classList.add('show');
  });
  document.querySelectorAll('.fadeIn-2').forEach(function(element) {
    element.classList.add('show');
  });
  document.querySelectorAll('.animation').forEach(function(element) {
    element.classList.add('play');
  });
});

const sections = document.querySelectorAll('.parallax');

function parallaxScroll() {
  sections.forEach(section => {
    const scrollPosition = window.pageYOffset;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionBottom = sectionTop + sectionHeight;
    const sectionSpeed = section.dataset.speed || 0.5;
    const translateValue = (scrollPosition - sectionTop) * sectionSpeed;
    
    if (scrollPosition + window.innerHeight > sectionTop && scrollPosition < sectionBottom) {
      section.querySelector('.parallax__content').style.transform = `translate(-50%, calc(-50% + ${translateValue}px))`;
    }
  });
}

window.addEventListener('scroll', () => {
  requestAnimationFrame(parallaxScroll);
});

window.addEventListener('load', () => {
  parallaxScroll();
});


const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

