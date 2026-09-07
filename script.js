const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('mobile-open', !open);
  });
}

document.querySelectorAll('.desktop-nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('mobile-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const currentPage = document.body.dataset.page || window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.desktop-nav a[data-page]').forEach((link) => {
  if (link.dataset.page === currentPage) link.classList.add('is-current');
});

const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
progressBar.setAttribute('aria-hidden', 'true');
document.body.prepend(progressBar);
const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
};
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

document.querySelector('#quoteForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Yêu cầu báo giá nón từ ${data.get('name')}`);
  const body = encodeURIComponent(`Họ tên / Công ty: ${data.get('name')}\nEmail: ${data.get('email')}\nDòng nón: ${data.get('type')}\n\nMô tả yêu cầu:\n${data.get('message')}`);
  window.location.href = `mailto:thanhphuongcap76@gmail.com?subject=${subject}&body=${body}`;
  const note = document.querySelector('#formNote');
  if (note) note.textContent = 'Ứng dụng email đang mở với nội dung yêu cầu đã được điền sẵn.';
});

window.addEventListener('scroll', () => {
  document.querySelector('.site-header')?.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// Subtle cursor depth on the hero image for a tactile, premium feel.
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  heroVisual.addEventListener('pointermove', (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroVisual.style.setProperty('--tilt-x', `${x * 2.2}deg`);
    heroVisual.style.setProperty('--tilt-y', `${y * -2.2}deg`);
  });
  heroVisual.addEventListener('pointerleave', () => {
    heroVisual.style.setProperty('--tilt-x', '0deg');
    heroVisual.style.setProperty('--tilt-y', '0deg');
  });
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('[data-tilt]').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${y * -3.2}deg) rotateY(${x * 3.2}deg) translateY(-7px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('transform');
    });
  });
}
