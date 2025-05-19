const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('expanded');

    cards.forEach(other => {
      if (other !== card) {
        other.classList.remove('expanded');
      }
    });
  });
});
