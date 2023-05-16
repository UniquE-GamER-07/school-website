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


window.onmouseup = () =>{
  track.dataset.mouseDownAt = "0";
}

window.onmousedown = e =>{
  track.dataset.mouseDownAt = e.clientX;
}


window.onmousemove = e =>{
  if(track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth/2;
  
  const percentage = (mouseDelta/maxDelta) * 100;

  track.style.transform = 'translate(${percentage}%, -50%)';
}
