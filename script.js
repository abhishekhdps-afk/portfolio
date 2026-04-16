/* ============================================
   ABHISHEKH PORTFOLIO — script.js
   ============================================ */

// ---- Custom Cursor ----
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  trail.style.left = e.clientX + 'px';
  trail.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .hobby-card, .skill-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
    trail.style.width = '60px';
    trail.style.height = '60px';
    trail.style.borderColor = 'rgba(0,255,136,0.6)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    trail.style.width = '36px';
    trail.style.height = '36px';
    trail.style.borderColor = 'rgba(0,255,136,0.5)';
  });
});

// ---- Navbar scroll effect ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ---- Mobile Menu ----
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  menuBtn.innerHTML = mobileMenu.classList.contains('open') ? '✕' : '&#9776;';
});

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  menuBtn.innerHTML = '&#9776;';
}

// ---- Scroll Reveal ----
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ---- Counter Animation ----
function animateCount(el, target, duration = 1400) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      const target = +e.target.dataset.target;
      animateCount(e.target, target);
      statsObserver.unobserve(e.target);
    }
  }),
  { threshold: 0.6 }
);
document.querySelectorAll('.stat-num').forEach(el => statsObserver.observe(el));

// ---- Music Visualizer (Canvas) ----
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
const bars = 48;
let animRunning = false;
let animFrame;
const heights = Array.from({ length: bars }, () => Math.random() * 40 + 10);
const targets = Array.from({ length: bars }, () => Math.random() * 60 + 8);
let hovered = false;

function lerp(a, b, t) { return a + (b - a) * t; }

function drawVisualizer() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const w = canvas.width / bars;
  for (let i = 0; i < bars; i++) {
    heights[i] = lerp(heights[i], targets[i], 0.08);
    if (Math.abs(heights[i] - targets[i]) < 1) {
      targets[i] = hovered
        ? Math.random() * 70 + 10
        : Math.random() * 20 + 5;
    }
    const h = heights[i];
    const x = i * w + w * 0.15;
    const y = (canvas.height - h) / 2;
    const alpha = 0.5 + (h / 80) * 0.5;
    const hue = 150 + (i / bars) * 80;
    ctx.fillStyle = `hsla(${hue}, 100%, 65%, ${alpha})`;
    ctx.beginPath();
    ctx.roundRect(x, y, w * 0.7, h, 3);
    ctx.fill();
  }
  animFrame = requestAnimationFrame(drawVisualizer);
}

canvas.addEventListener('mouseenter', () => { hovered = true; });
canvas.addEventListener('mouseleave', () => { hovered = false; });

// Start visualizer when in view
const visObserver = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting && !animRunning) {
      animRunning = true;
      drawVisualizer();
    } else if (!e.isIntersecting && animRunning) {
      cancelAnimationFrame(animFrame);
      animRunning = false;
    }
  }),
  { threshold: 0.3 }
);
visObserver.observe(canvas);

// ---- Contact Form ----
function sendMessage() {
  const name = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const msg = document.getElementById('cMsg').value.trim();
  const success = document.getElementById('formSuccess');

  if (!name || !email || !msg) {
    alert('Please fill in all fields!');
    return;
  }
  success.style.display = 'block';
  document.getElementById('cName').value = '';
  document.getElementById('cEmail').value = '';
  document.getElementById('cMsg').value = '';
  setTimeout(() => { success.style.display = 'none'; }, 4000);
}

// ---- Hero parallax subtle effect ----
window.addEventListener('scroll', () => {
  const heroText = document.querySelector('.hero-bg-text');
  if (heroText) {
    const scroll = window.scrollY;
    heroText.style.transform = `translateY(calc(-50% + ${scroll * 0.2}px))`;
  }
});

// ---- Active nav link highlight on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
});

console.log('%c ABK Portfolio 🚀 ', 'background:#00ff88;color:#080a0f;font-weight:bold;font-size:16px;padding:8px 16px;border-radius:4px;');
console.log('%c Built with ❤️ by Abhishekh | UPES Dehradun', 'color:#6b7a8d;font-size:12px;');