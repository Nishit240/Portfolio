const carousel = document.querySelector('.services-carousel');
const cards = document.querySelectorAll('.service-card');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const dotsContainer = document.querySelector('.services-pagination .dots');

let currentIndex = 0;
const visibleCards = 4;
const totalCards = cards.length;

// Create pagination dots dynamically
function createDots() {
    dotsContainer.innerHTML = '';
    const totalDots = totalCards - visibleCards + 1; // number of positions
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('span');
        if (i === 0) dot.classList.add('active-dot');
        dot.addEventListener('click', () => goToIndex(i));
        dotsContainer.appendChild(dot);
    }
}

// Update carousel position
function updateCarousel() {
    const cardWidth = cards[0].offsetWidth + 16; // width + gap
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

// Up/Down buttons inside section
const upBtn = document.querySelector('.services-vertical-nav .up');
const downBtn = document.querySelector('.services-vertical-nav .down');

upBtn.addEventListener('click', () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) aboutSection.scrollIntoView({behavior: 'smooth'});
});

downBtn.addEventListener('click', () => {
    // leave blank for now
});

// Event listeners
prevBtn.addEventListener('click', prevCard);
nextBtn.addEventListener('click', nextCard);

// Initialize
createDots();
updateCarousel();
