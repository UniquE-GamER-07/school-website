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

window.onmousedown = e =>{
  track.dataset.mouseDownAt = e.clientX;
}

window.onmousemove = e =>{
  if(track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

        Math.min(nextPercentage, 0);
        Math.max(nextPercentage, 100);

  track.dataset.percentage = nextPercentage;

  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards"});
  


window.onmouseup = () =>{
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
}

  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, {duration: 1200, fill: "forwards"});
  }
}
