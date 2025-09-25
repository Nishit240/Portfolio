const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // toggles dropdown
});

const scrollDown = document.querySelector('.down-arrow');

  scrollDown.addEventListener('click', () => {
    const aboutSection = document.getElementById('about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
  });

// Up/Down buttons inside section
const upBtn = document.querySelector('.services-vertical-nav .up');
const downBtn = document.querySelector('.services-vertical-nav .down');

upBtn.addEventListener('click', () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) aboutSection.scrollIntoView({behavior: 'smooth'});
});

downBtn.addEventListener('click', () => {
    const aboutSection = document.getElementById('projects');
    if (aboutSection) aboutSection.scrollIntoView({behavior: 'smooth'});
    // leave blank for now
});

// Event listeners
prevBtn.addEventListener('click', prevCard);
nextBtn.addEventListener('click', nextCard);

