/* =============================================
   main.js - Muhammad Awais Personal Brand
   Shared scripts for all pages
============================================= */

// ---- NAVBAR SCROLL EFFECT ----
(function () {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ---- ACTIVE NAV LINK ----
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === 'index.html' && href === './') || href === './' + path) {
      link.classList.add('active');
    }
  });
})();

// ---- MOBILE DRAWER ----
(function () {
  const hamburger = document.querySelector('.nav-hamburger');
  const drawer = document.querySelector('.mobile-drawer');
  if (!hamburger || !drawer) return;

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    drawer.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  drawer.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

// ---- SCROLL REVEAL ----
(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

// ---- FAQ ACCORDION ----
(function () {
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();

// ---- SKILL BAR ANIMATION ----
(function () {
  const skills = document.querySelectorAll('.skill-fill');
  if (!skills.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  skills.forEach(s => observer.observe(s));
})();

// ---- PORTFOLIO FILTER ----
(function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      portfolioItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => { item.style.display = 'none'; }, 300);
        }
      });
    });
  });
})();

// ---- COUNTER ANIMATION ----
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 2000;
  const step = 16;
  const increment = target / (duration / step);
  let current = 0;

  const timer = setInterval(() => {
    current = Math.min(current + increment, target);
    el.textContent = prefix + (Number.isInteger(target) ? Math.round(current) : current.toFixed(1)) + suffix;
    if (current >= target) clearInterval(timer);
  }, step);
}

(function () {
  const counters = document.querySelectorAll('[data-target]');
  if (!counters.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
})();

// ---- COOKIE CONSENT ----
(function () {
  const consent = document.querySelector('.cookie-consent');
  if (!consent) return;
  if (localStorage.getItem('cookieConsent')) return;

  setTimeout(() => consent.classList.add('show'), 1500);

  const accept = consent.querySelector('.cookie-accept');
  const decline = consent.querySelector('.cookie-decline');

  const hide = () => {
    consent.classList.remove('show');
    setTimeout(() => consent.remove(), 500);
  };

  if (accept) accept.addEventListener('click', () => { localStorage.setItem('cookieConsent', 'true'); hide(); });
  if (decline) decline.addEventListener('click', hide);
})();

// ---- CONTACT FORM ----
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = form.querySelector('.btn-primary');
    const orig = btn.innerHTML;
    btn.innerHTML = '✓ Message Sent! I\'ll reply within 24 hours.';
    btn.style.background = 'linear-gradient(135deg, #14A800, #1ec800)';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 4000);
  });
})();

// ---- SMOOTH HOVER PARALLAX on hero card ----
(function () {
  const card = document.querySelector('.hero-card');
  if (!card) return;
  card.closest('.hero-visual') && card.closest('.hero-visual').addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    card.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-10px)`;
  });
  card.closest('.hero-visual') && card.closest('.hero-visual').addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
})();

// ---- LEAD FORM ----
(function () {
  const leadForm = document.getElementById('leadForm');
  if (!leadForm) return;
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = leadForm.querySelector('button');
    btn.textContent = '✓ Subscribed!';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = 'Get Free Tips'; btn.disabled = false; leadForm.reset(); }, 3000);
  });
})();
