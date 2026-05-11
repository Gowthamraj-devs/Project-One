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

// ===== TIME-SLOT MENU TABS =====
const tabs   = document.querySelectorAll('.time-tab');
const panels = document.querySelectorAll('.time-panel');

function activateTab(tab) {
  tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
  panels.forEach(p => p.classList.remove('active'));
  tab.classList.add('active');
  tab.setAttribute('aria-selected', 'true');
  document.getElementById(tab.dataset.target).classList.add('active');
}

tabs.forEach(tab => tab.addEventListener('click', () => activateTab(tab)));

// Auto-select tab based on current time of day
(function autoTab() {
  const now  = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  // Morning  07:00 – 10:30
  // Afternoon 12:30 – 16:00
  // Night    18:30 – 22:00
  let targetId;
  if      (mins >= 420  && mins < 630)  targetId = 'tab-morning';
  else if (mins >= 750  && mins < 960)  targetId = 'tab-afternoon';
  else if (mins >= 1110 && mins < 1320) targetId = 'tab-dinner';
  else if (mins < 420 || mins >= 1320)  targetId = 'tab-morning';   // before morning / after night → show morning
  else                                  targetId = 'tab-afternoon';  // gaps between sessions
  const autoTabEl = document.getElementById(targetId);
  if (autoTabEl) activateTab(autoTabEl);
})();
