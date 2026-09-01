// ==========================================================================
// REGINALDO RODRIGUES NUTRICIONISTA — SCRIPT INTERATIVO & RESPONSIVO
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. MENU MOBILE COM ANIMAÇÃO HAMBURGUER EM 'X' ---
  const burger = document.getElementById('burger');
  const navWrapper = document.getElementById('navWrapper');

  if (burger && navWrapper) {
    burger.addEventListener('click', () => {
      const isActive = navWrapper.classList.toggle('active');
      burger.classList.toggle('active', isActive);
      burger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    navWrapper.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
      link.addEventListener('click', () => {
        navWrapper.classList.remove('active');
        burger.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // --- 2. CARROSSEL DE AVALIAÇÕES COM ROLAGEM HORIZONTAL E AUTO-PLAY ---
  const track = document.getElementById('reviewsTrack');
  const prevBtn = document.getElementById('revPrevBtn');
  const nextBtn = document.getElementById('revNextBtn');
  const dotsContainer = document.getElementById('reviewsDots');

  if (track) {
    const cards = track.querySelectorAll('.review-card');
    
    // Create dots
    cards.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = 'carousel-dot' + (idx === 0 ? ' active' : '');
      dot.addEventListener('click', () => {
        const cardWidth = cards[0].offsetWidth + 24;
        track.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
      });
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.carousel-dot');

    function updateDots() {
      const cardWidth = cards[0].offsetWidth + 24;
      const activeIdx = Math.round(track.scrollLeft / cardWidth);
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === activeIdx);
      });
    }

    track.addEventListener('scroll', updateDots, { passive: true });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const cardWidth = cards[0].offsetWidth + 24;
        track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const cardWidth = cards[0].offsetWidth + 24;
        track.scrollBy({ left: cardWidth, behavior: 'smooth' });
      });
    }

    // Auto scroll every 5s
    let autoScrollInterval = setInterval(() => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      const cardWidth = cards[0].offsetWidth + 24;
      if (track.scrollLeft >= maxScroll - 10) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 5000);

    track.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
    track.addEventListener('touchstart', () => clearInterval(autoScrollInterval), { passive: true });
  }

});
