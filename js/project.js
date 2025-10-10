
function showTab(category, btn) {
  // 1) Active tab styling
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');

  // 2) Show / hide project cards
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    const catAttr = card.getAttribute('data-category') || '';
    // allow multiple categories space-separated (e.g. "web ml")
    const categories = catAttr.split(/\s+/).map(s => s.trim()).filter(Boolean);

    // if 'all' or the card has the category, show it
    if (category === 'all' || categories.includes(category)) {
      card.style.display = 'block';
      // optional: reset opacity/transform for a simple reveal
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    } else {
      card.style.display = 'none';
      card.style.opacity = '0';
      card.style.transform = 'translateY(8px)';
    }
  });
}

// Optional: ensure initial state on page load
document.addEventListener('DOMContentLoaded', () => {
  showTab('all', document.querySelector('.tab[data-cat="all"]'));
});