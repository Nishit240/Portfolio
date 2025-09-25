const illustration = document.querySelector('.hero-illustration');
const wrapper = document.querySelector('.illustration-wrapper');
const glow = document.querySelector('.glow');

wrapper.addEventListener('mousemove', (e) => {
  const rect = wrapper.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * 50;
  const rotateY = ((x - centerX) / centerX) * 50;

  illustration.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

  const glowX = ((centerX - x) / centerX) * 50;
  const glowY = ((centerY - y) / centerY) * 50;
  glow.style.transform = `translate(calc(-50% + ${glowX}px), calc(-50% + ${glowY}px))`;
});

wrapper.addEventListener('mouseleave', () => {
  illustration.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  glow.style.transform = 'translate(-50%, -50%)';
});
