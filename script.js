// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== FADE-UP ON SCROLL =====
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// Hero fades in on load
document.querySelector('#hero .fade-up').classList.add('visible');

// ===== MENU CARD MODALS (Zoom open / close) =====

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('closing');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden'; // prevent bg scroll
  // Scroll modal body to top
  const body = modal.querySelector('.mc-modal-body');
  if (body) body.scrollTop = 0;
}

function closeModal(modal) {
  modal.classList.add('closing');
  modal.classList.remove('open');
  document.body.style.overflow = '';
  // Remove closing class after animation
  setTimeout(() => {
    modal.classList.remove('closing');
  }, 380);
}

// Tab buttons → open modal
document.querySelectorAll('.time-tab[data-modal]').forEach(btn => {
  btn.addEventListener('click', () => {
    openModal(btn.dataset.modal);
  });
});

// Close on backdrop click
document.querySelectorAll('.mc-backdrop').forEach(backdrop => {
  backdrop.addEventListener('click', () => {
    closeModal(backdrop.closest('.mc-modal'));
  });
});

// Close on × button click
document.querySelectorAll('.mc-close').forEach(btn => {
  btn.addEventListener('click', () => {
    closeModal(btn.closest('.mc-modal'));
  });
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const openModal = document.querySelector('.mc-modal.open');
    if (openModal) closeModal(openModal);
  }
});
