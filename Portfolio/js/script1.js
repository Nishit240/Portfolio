document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.services-carousel');
  const cards = document.querySelectorAll('.service-card');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const dotsContainer = document.querySelector('.services-pagination .dots');

  let currentIndex = 0;
  const visibleCards = 4;
  const totalCards = cards.length;

  function createDots() {
      dotsContainer.innerHTML = '';
      const totalDots = Math.max(totalCards - visibleCards + 1, 1);
      for (let i = 0; i < totalDots; i++) {
          const dot = document.createElement('span');
          if (i === 0) dot.classList.add('active-dot');
          dot.addEventListener('click', () => goToIndex(i));
          dotsContainer.appendChild(dot);
      }
  }

  function updateCarousel() {
      const style = window.getComputedStyle(cards[0]);
      const gap = parseInt(style.marginRight) || 16; // fallback to 16px
      const cardWidth = cards[0].offsetWidth + gap;
      carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

      const dots = dotsContainer.querySelectorAll('span');
      dots.forEach((dot, i) => dot.classList.toggle('active-dot', i === currentIndex));
  }

  function prevCard() {
      currentIndex = Math.max(currentIndex - 1, 0);
      updateCarousel();
  }

  function nextCard() {
      currentIndex = Math.min(currentIndex + 1, totalCards - visibleCards);
      updateCarousel();
  }

  function goToIndex(index) {
      currentIndex = index;
      updateCarousel();
  }

  prevBtn.addEventListener('click', prevCard);
  nextBtn.addEventListener('click', nextCard);

  createDots();
  updateCarousel();
});
