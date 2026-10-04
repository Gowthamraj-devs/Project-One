// ===== NAVBAR SCROLL & SCROLL PROGRESS BAR =====
const navbar = document.getElementById('navbar');
const progressBar = document.getElementById('progressBar');
const backToTopBtn = document.getElementById('backToTop');
const heroBgImg = document.getElementById('heroBgImg');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  
  // Navbar Scrolled Class
  if (navbar) {
    navbar.classList.toggle('scrolled', scrollTop > 40);
  }

  // Scroll Progress Bar
  if (progressBar && docHeight > 0) {
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${scrollPercent}%`;
  }

  // Back To Top Visibility
  if (backToTopBtn) {
    backToTopBtn.classList.toggle('visible', scrollTop > 500);
  }

  // Subtle Parallax Effect on Hero Image
  if (heroBgImg && scrollTop < window.innerHeight) {
    heroBgImg.style.transform = `scale(1.05) translateY(${scrollTop * 0.25}px)`;
  }

  // ScrollSpy Active Link Update
  updateActiveNavLink();
});

// Back to Top Click
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });
}

// ===== SCROLLSPY (ACTIVE NAV LINK HIGHLIGHTING) =====
const sections = document.querySelectorAll('section[id], header[id]');
function updateActiveNavLink() {
  const scrollPosition = window.scrollY + 200;
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });
}

// ===== FADE-UP ON SCROLL (INTERSECTION OBSERVER) =====
const fadeEls = document.querySelectorAll('.fade-up');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => fadeObserver.observe(el));

// Hero content visible immediately on load
const heroContent = document.querySelector('#hero .fade-up');
if (heroContent) heroContent.classList.add('visible');

// ===== ANIMATED COUNTERS FOR STATS =====
const statNumbers = document.querySelectorAll('.stat-num[data-target]');
let animatedStats = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !animatedStats) {
      animatedStats = true;
      statNumbers.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        const decimal = parseInt(stat.getAttribute('data-decimal')) || 0;
        const suffix = stat.getAttribute('data-suffix') || '';
        const duration = 2000; // ms
        const steps = 60;
        const stepTime = duration / steps;
        let current = 0;
        const increment = target / steps;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          stat.textContent = `${current.toFixed(decimal)}${suffix}`;
        }, stepTime);
      });
    }
  });
}, { threshold: 0.5 });

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) statsObserver.observe(statsGrid);

// ===== MENU CATEGORY FILTER TABS =====
const filterBtns = document.querySelectorAll('.menu-cat-btn');
const menuListItems = document.querySelectorAll('.menu-list-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.getAttribute('data-category');

    menuListItems.forEach(item => {
      const itemCats = item.getAttribute('data-category');
      if (cat === 'all' || (itemCats && itemCats.includes(cat))) {
        item.classList.remove('hidden');
        item.style.animation = 'fadeIn 0.4s ease forwards';
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// ===== PHYSICAL MENU CARD MODALS (LUNCH / DINNER) =====
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('closing');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  const body = modal.querySelector('.mc-modal-body');
  if (body) body.scrollTop = 0;
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.add('closing');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  setTimeout(() => {
    modal.classList.remove('closing');
  }, 380);
}

// Tab buttons trigger physical menu modals
document.querySelectorAll('.time-tab[data-modal]').forEach(btn => {
  btn.addEventListener('click', () => {
    openModal(btn.dataset.modal);
  });
});

// Modal Close Triggers
document.querySelectorAll('.mc-backdrop').forEach(backdrop => {
  backdrop.addEventListener('click', () => {
    closeModal(backdrop.closest('.mc-modal'));
  });
});

document.querySelectorAll('.mc-close').forEach(btn => {
  btn.addEventListener('click', () => {
    closeModal(btn.closest('.mc-modal'));
  });
});

// ===== PHOTO GALLERY LIGHTBOX =====
const galleryItems = document.querySelectorAll('.gallery-item');
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxBackdrop = document.getElementById('lightboxBackdrop');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentGalleryIndex = 0;

function openLightbox(index) {
  if (index < 0 || index >= galleryItems.length) return;
  currentGalleryIndex = index;
  const item = galleryItems[currentGalleryIndex];
  const src = item.getAttribute('data-src');
  const caption = item.getAttribute('data-caption');

  if (lightboxImg) lightboxImg.src = src;
  if (lightboxCaption) lightboxCaption.textContent = caption;
  if (lightboxModal) {
    lightboxModal.classList.add('open');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  if (lightboxModal) {
    lightboxModal.classList.remove('open');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => openLightbox(index));
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

if (lightboxPrev) {
  lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    openLightbox((currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length);
  });
}

if (lightboxNext) {
  lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    openLightbox((currentGalleryIndex + 1) % galleryItems.length);
  });
}

// Global Keyboard Handler for Modals and Lightbox
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close menu modals if open
    const openMenuModal = document.querySelector('.mc-modal.open');
    if (openMenuModal) closeModal(openMenuModal);

    // Close lightbox if open
    if (lightboxModal && lightboxModal.classList.contains('open')) {
      closeLightbox();
    }
  }

  // Lightbox arrow navigation
  if (lightboxModal && lightboxModal.classList.contains('open')) {
    if (e.key === 'ArrowLeft') {
      openLightbox((currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length);
    } else if (e.key === 'ArrowRight') {
      openLightbox((currentGalleryIndex + 1) % galleryItems.length);
    }
  }
});
