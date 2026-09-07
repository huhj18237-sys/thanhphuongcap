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

document.querySelector('#quoteForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Website enquiry from ${data.get('name')}`);
  const body = encodeURIComponent(`Name / Company: ${data.get('name')}\nEmail: ${data.get('email')}\nProduct: ${data.get('type')}\n\nProject details:\n${data.get('message')}`);
  window.location.href = `mailto:thanhphuongcap76@gmail.com?subject=${subject}&body=${body}`;
  const note = document.querySelector('#formNote');
  if (note) note.textContent = 'Your email app is opening with the enquiry pre-filled.';
});

window.addEventListener('scroll', () => {
  document.querySelector('.site-header')?.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });
