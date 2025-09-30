document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.services-carousel');
  const glassBox = document.querySelector('.glass-box');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  // Button scroll amount
  const scrollAmount = 200; // adjust per card width

  // Prev/Next Buttons
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      glassBox.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      glassBox.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  // Drag/trackpad scroll
  let isDown = false;
  let startX;
  let scrollLeft;

  glassBox.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - glassBox.offsetLeft;
    scrollLeft = glassBox.scrollLeft;
    glassBox.style.cursor = 'grabbing';
  });

  glassBox.addEventListener('mouseleave', () => {
    isDown = false;
    glassBox.style.cursor = 'grab';
  });
  glassBox.addEventListener('mouseup', () => {
    isDown = false;
    glassBox.style.cursor = 'grab';
  });
  glassBox.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - glassBox.offsetLeft;
    const walk = (x - startX) * 2; // speed multiplier
    glassBox.scrollLeft = scrollLeft - walk;
  });

  // Touch events for mobile
  glassBox.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - glassBox.offsetLeft;
    scrollLeft = glassBox.scrollLeft;
  });

  glassBox.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - glassBox.offsetLeft;
    const walk = (x - startX) * 2;
    glassBox.scrollLeft = scrollLeft - walk;
  });
});
