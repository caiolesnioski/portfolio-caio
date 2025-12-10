// Script léger pour la page veille : smooth scroll (compensation si besoin) et amélioration accessibilité.

document.addEventListener('DOMContentLoaded', function () {
  // Smooth scroll au clic sur "Lire plus" (id="lire-plus")
  const lireBtn = document.getElementById('lire-plus');
  if (lireBtn) {
    lireBtn.addEventListener('click', function (e) {
      // anchor behaviour fallback : on va scroller vers #reponse
      const target = document.getElementById('reponse');
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // focus pour accessibilité
        setTimeout(() => {
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }, 600);
      }
    });
  }

  // Rend les cartes focusables pour keyboard users
  document.querySelectorAll('.article-card').forEach(card => {
    card.setAttribute('tabindex', '0');
  });
});