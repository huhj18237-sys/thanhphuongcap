const contactMarkup = `
  <a class="contact-icon zalo" href="https://zalo.me/0906607633" target="_blank" rel="noreferrer" aria-label="Liên hệ Zalo" title="Zalo">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#fff" d="M5 4h14a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3h-6.1L8 20v-3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z"/><text x="12" y="13.2" fill="#1688ff" font-size="6.2" font-family="Arial,sans-serif" font-weight="800" text-anchor="middle">Zalo</text></svg>
  </a>
  <a class="contact-icon gmail" href="mailto:thanhphuongcap76@gmail.com" aria-label="Gửi Gmail" title="Gmail">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 6.5 12 13l8.5-6.5" fill="none" stroke="#EA4335" stroke-width="2.5"/><path d="M3.5 6.5v11h4V9.6" fill="none" stroke="#4285F4" stroke-width="2.5"/><path d="M20.5 6.5v11h-4V9.6" fill="none" stroke="#34A853" stroke-width="2.5"/><path d="M3.5 6.5 7 9.2" stroke="#FBBC04" stroke-width="2.5"/></svg>
  </a>
  <a class="contact-icon whatsapp" href="https://wa.me/84906607633?text=Xin%20ch%C3%A0o%20TH%C3%80NH%20PH%C6%AF%E1%BB%A2NG%20CAP%2C%20t%C3%B4i%20mu%E1%BB%91n%20%C4%91%C6%B0%E1%BB%A3c%20t%C6%B0%20v%E1%BA%A5n." target="_blank" rel="noreferrer" aria-label="Liên hệ WhatsApp" title="WhatsApp">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 11.7a8.1 8.1 0 0 1-11.9 7.1L4 20.2l1.4-4.3a8.1 8.1 0 1 1 15-4.2Z" fill="none" stroke="#fff" stroke-width="1.6"/><path d="M8.8 7.8c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.5l.8 1.9c.1.3 0 .5-.2.8l-.7.8c.8 1.5 1.9 2.6 3.5 3.3l.8-.9c.2-.3.5-.3.8-.2l1.9.9c.3.1.4.3.4.6-.1 1.2-.8 2.1-2 2.3-1.2.2-3.4-.5-5.4-2.2-1.7-1.5-2.8-3.6-2.9-5 0-1 .5-1.8 1.2-2.3Z" fill="#fff"/></svg>
  </a>
  <a class="contact-icon phone" href="tel:+84906607633" aria-label="Gọi số di động" title="0906 607 633">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.1 3.2 10 8 8.2 9.6c1.1 2.7 3.2 4.8 5.8 5.9l1.7-1.9 4.8 2.9c-.8 3.1-2.8 4.6-5.7 4C8.9 19.3 4.2 14.6 3 8.7c-.6-2.9 1-4.8 4.1-5.5Z" fill="none" stroke="#fff" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </a>`;

document.querySelectorAll('.contact-actions,.footer-social').forEach((dock) => {
  dock.innerHTML = contactMarkup;
  if (dock.classList.contains('footer-social')) {
    dock.querySelectorAll('.contact-icon').forEach((item) => {
      item.classList.replace('contact-icon', 'footer-social-icon');
    });
  }
});

const mapDestination = encodeURIComponent('12B Tân Thới Nhất 1, Tổ 1, Khu phố 1, Phường Đông Hưng Thuận, TP. Hồ Chí Minh');
document.querySelectorAll('.footer-contact').forEach((contact) => {
  contact.innerHTML = `<span class="footer-label">Liên hệ trực tiếp</span>
    <a class="footer-contact-row" href="mailto:thanhphuongcap76@gmail.com" aria-label="Gửi email đến THÀNH PHƯỢNG CAP">
      <span class="footer-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3.5 6.5h17v11h-17zM4 7l8 6 8-6"/></svg></span><span><small>Email</small>thanhphuongcap76@gmail.com</span>
    </a>
    <a class="footer-contact-row" href="tel:+84906607633" aria-label="Gọi THÀNH PHƯỢNG CAP theo số 0906 607 633">
      <span class="footer-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7.1 3.2 10 8 8.2 9.6c1.1 2.7 3.2 4.8 5.8 5.9l1.7-1.9 4.8 2.9c-.8 3.1-2.8 4.6-5.7 4C8.9 19.3 4.2 14.6 3 8.7c-.6-2.9 1-4.8 4.1-5.5Z"/></svg></span><span><small>Gọi ngay</small>0906 607 633</span>
    </a>
    <a class="footer-contact-row" href="https://www.google.com/maps/dir/?api=1&amp;destination=${mapDestination}" target="_blank" rel="noreferrer" aria-label="Mở chỉ đường đến THÀNH PHƯỢNG CAP trên Google Maps">
      <span class="footer-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z"/><circle cx="12" cy="10" r="2.2"/></svg></span><span><small>Chỉ đường Google Maps</small>12B Tân Thới Nhất 1, Tổ 1, Khu phố 1,<br />Phường Đông Hưng Thuận, TP. Hồ Chí Minh</span>
    </a>`;
});

const localeOptions = [
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'fr', label: 'Français' },
  { code: 'zh', label: '中文' }
];
const flagMarkup = (locale) => ({
  vi: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#da251d"/><path d="m15 4 1.4 4.2h4.4l-3.6 2.6 1.4 4.2-3.6-2.6-3.6 2.6 1.4-4.2-3.6-2.6h4.4Z" fill="#ffdf00"/></svg>',
  en: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#173a74"/><path d="M0 0 30 20M30 0 0 20" stroke="#fff" stroke-width="5"/><path d="M0 0 30 20M30 0 0 20" stroke="#cf142b" stroke-width="2"/><path d="M15 0v20M0 10h30" stroke="#fff" stroke-width="7"/><path d="M15 0v20M0 10h30" stroke="#cf142b" stroke-width="4"/></svg>',
  ja: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#fff"/><circle cx="15" cy="10" r="5.4" fill="#bc002d"/></svg>',
  ko: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#fff"/><path d="M15 5a5 5 0 1 1-4.3 7.5A2.5 2.5 0 0 1 15 10a2.5 2.5 0 0 0 0-5Z" fill="#cd2e3a"/><path d="M15 15a5 5 0 1 1 4.3-7.5A2.5 2.5 0 0 1 15 10a2.5 2.5 0 0 0 0 5Z" fill="#0047a0"/><g stroke="#111" stroke-width="1"><path d="m5 4 3 2m-4 0 3 2m15 4 3 2m-4 0 3 2"/></g></svg>',
  fr: '<svg viewBox="0 0 30 20"><path fill="#002395" d="M0 0h10v20H0z"/><path fill="#fff" d="M10 0h10v20H10z"/><path fill="#ed2939" d="M20 0h10v20H20z"/></svg>',
  zh: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#de2910"/><path d="m6 3 1.1 3.2h3.4L7.7 8.1l1.1 3.2L6 9.3l-2.8 2 1.1-3.2-2.8-1.9h3.4Z" fill="#ffde00"/></svg>'
}[locale]);

const languageSwitcher = document.createElement('div');
languageSwitcher.className = 'language-switcher';
languageSwitcher.dataset.i18nIgnore = '';
languageSwitcher.innerHTML = `<button class="language-button" type="button" aria-expanded="false" aria-label="Chọn ngôn ngữ"><span class="flag">${flagMarkup('vi')}</span><span class="language-code">VI</span><span class="chevron"></span></button><div class="language-menu" role="menu">${localeOptions.map((locale) => `<button class="language-option" type="button" role="menuitem" data-locale="${locale.code}"><span class="flag">${flagMarkup(locale.code)}</span><span>${locale.label}</span><span class="check">✓</span></button>`).join('')}</div>`;
document.querySelector('.site-header .contact-actions')?.after(languageSwitcher);

const footer = document.querySelector('.site-footer');
if (footer) {
  const footerServices = [
    'Nón thiết kế theo yêu cầu',
    'Thêu logo chính xác',
    'Private label trọn gói',
    'Sản xuất linh hoạt',
    'Giao hàng trong & ngoài nước'
  ];
  const footerMarquee = document.createElement('div');
  footerMarquee.className = 'footer-marquee';
  footerMarquee.setAttribute('aria-label', 'Dịch vụ nổi bật');
  footerMarquee.innerHTML = `<div class="footer-marquee-track" aria-hidden="true">${[...footerServices, ...footerServices].map((service) => `<span>${service}</span><b>✦</b>`).join('')}</div>`;
  footer.prepend(footerMarquee);
  footer.addEventListener('pointermove', (event) => {
    const rect = footer.getBoundingClientRect();
    footer.style.setProperty('--footer-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    footer.style.setProperty('--footer-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
  });
}

const quickContact = document.createElement('div');
quickContact.className = 'quick-contact';
quickContact.innerHTML = `<div class="quick-contact-panel" aria-label="Liên hệ nhanh">${contactMarkup}</div><button class="quick-contact-toggle" type="button" aria-expanded="false" aria-label="Mở liên hệ nhanh"><span aria-hidden="true">+</span></button>`;
document.body.append(quickContact);

const quickContactToggle = quickContact.querySelector('.quick-contact-toggle');
const closeQuickContact = () => {
  quickContact.classList.remove('is-open');
  quickContactToggle.setAttribute('aria-expanded', 'false');
};
quickContactToggle.addEventListener('click', () => {
  const open = quickContact.classList.toggle('is-open');
  quickContactToggle.setAttribute('aria-expanded', String(open));
});
document.addEventListener('click', (event) => {
  if (!quickContact.contains(event.target)) closeQuickContact();
});

const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.type = 'button';
backToTop.setAttribute('aria-label', 'Lên đầu trang');
backToTop.innerHTML = '<span aria-hidden="true">↑</span>';
document.body.append(backToTop);
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const sourceText = new WeakMap();
const sourceAttributes = new WeakMap();
const sourceDocumentTitle = document.title;
const sourceDescription = document.querySelector('meta[name="description"]')?.content || '';
const translatableAttributes = ['aria-label', 'title', 'placeholder', 'alt'];
const normalizeLocale = (value = '') => {
  const code = value.toLowerCase();
  if (code.startsWith('zh')) return 'zh';
  return localeOptions.some((item) => code.startsWith(item.code)) ? localeOptions.find((item) => code.startsWith(item.code)).code : 'vi';
};

const rememberSourceContent = () => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.textContent.trim() || node.parentElement?.closest('script,style,noscript,[data-i18n-ignore]')) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  while (walker.nextNode()) sourceText.set(walker.currentNode, walker.currentNode.textContent);
  document.querySelectorAll(translatableAttributes.map((attr) => `[${attr}]`).join(',')).forEach((element) => {
    if (element.closest('[data-i18n-ignore]')) return;
    const values = {};
    translatableAttributes.forEach((attribute) => {
      if (element.hasAttribute(attribute)) values[attribute] = element.getAttribute(attribute);
    });
    sourceAttributes.set(element, values);
  });
};

const translateText = (original, dictionary) => {
  const value = original.trim();
  const translated = dictionary?.[value];
  return translated ? original.replace(value, translated) : original;
};

const applyLocale = (requestedLocale) => {
  const locale = normalizeLocale(requestedLocale);
  const dictionary = window.TPC_I18N?.[locale] || {};
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) { return sourceText.has(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT; }
  });
  while (walker.nextNode()) walker.currentNode.textContent = translateText(sourceText.get(walker.currentNode), dictionary);
  document.querySelectorAll(translatableAttributes.map((attr) => `[${attr}]`).join(',')).forEach((element) => {
    const values = sourceAttributes.get(element);
    if (!values) return;
    Object.entries(values).forEach(([attribute, original]) => element.setAttribute(attribute, dictionary[original] || original));
  });
  const localeData = localeOptions.find((item) => item.code === locale);
  languageSwitcher.querySelector('.language-button .flag').innerHTML = flagMarkup(localeData.code);
  languageSwitcher.querySelector('.language-code').textContent = locale.toUpperCase();
  languageSwitcher.querySelectorAll('.language-option').forEach((option) => option.classList.toggle('is-active', option.dataset.locale === locale));
  document.documentElement.lang = locale === 'zh' ? 'zh-CN' : locale;
  document.title = dictionary[sourceDocumentTitle] || sourceDocumentTitle;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = dictionary[sourceDescription] || sourceDescription;
  localStorage.setItem('tpc-language', locale);
};

rememberSourceContent();
const initialLocale = normalizeLocale(localStorage.getItem('tpc-language') || 'vi');
applyLocale(initialLocale);

const languageButton = languageSwitcher.querySelector('.language-button');
languageButton.addEventListener('click', () => {
  const open = languageSwitcher.classList.toggle('is-open');
  languageButton.setAttribute('aria-expanded', String(open));
});
languageSwitcher.querySelectorAll('.language-option').forEach((option) => option.addEventListener('click', () => {
  applyLocale(option.dataset.locale);
  languageSwitcher.classList.remove('is-open');
  languageButton.setAttribute('aria-expanded', 'false');
}));
document.addEventListener('click', (event) => {
  if (!languageSwitcher.contains(event.target)) {
    languageSwitcher.classList.remove('is-open');
    languageButton.setAttribute('aria-expanded', 'false');
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    languageSwitcher.classList.remove('is-open');
    languageButton.setAttribute('aria-expanded', 'false');
    closeQuickContact();
  }
});

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

document.querySelector('#quoteForm')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const subject = encodeURIComponent(`Yêu cầu báo giá nón từ ${data.get('name')}`);
  const body = encodeURIComponent(`Họ tên / Công ty: ${data.get('name')}\nEmail: ${data.get('email')}\nDòng nón: ${data.get('type')}\n\nMô tả yêu cầu:\n${data.get('message')}`);
  const note = document.querySelector('#formNote');
  const button = form.querySelector('button[type="submit"]');
  const buttonContent = button.innerHTML;
  const localize = (message) => window.TPC_I18N?.[normalizeLocale(document.documentElement.lang)]?.[message] || message;
  button.disabled = true;
  button.textContent = localize('Đang gửi yêu cầu...');
  note?.classList.remove('is-success', 'is-error');
  try {
    const response = await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(data.entries()))
    });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.message || 'Submission failed');
    if (note) {
      note.textContent = localize('Yêu cầu đã được gửi thành công. Chúng tôi sẽ liên hệ lại với bạn sớm.');
      note.classList.add('is-success');
    }
    form.reset();
  } catch (error) {
    console.error('Quote submission failed', error);
    if (note) {
      note.textContent = localize('Chưa thể gửi trực tiếp. Ứng dụng email đang được mở để bạn gửi yêu cầu.');
      note.classList.add('is-error');
    }
    window.location.href = `mailto:thanhphuongcap76@gmail.com?subject=${subject}&body=${body}`;
  } finally {
    button.disabled = false;
    button.innerHTML = buttonContent;
  }
});

window.addEventListener('scroll', () => {
  document.querySelector('.site-header')?.classList.toggle('scrolled', window.scrollY > 10);
  backToTop.classList.toggle('is-visible', window.scrollY > 520);
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

  document.querySelectorAll('.button,.header-cta').forEach((button) => {
    button.classList.add('magnetic');
    button.addEventListener('pointermove', (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.08}px,${y * 0.12}px)`;
    });
    button.addEventListener('pointerleave', () => button.style.removeProperty('transform'));
  });

  const parallaxFrames = [...document.querySelectorAll('.image-frame:not(.hero-image)')];
  let parallaxTicking = false;
  const updateParallax = () => {
    parallaxFrames.forEach((frame) => {
      const rect = frame.getBoundingClientRect();
      const distance = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      frame.style.setProperty('--parallax-y', `${Math.max(-24, Math.min(24, distance * -24))}px`);
    });
    parallaxTicking = false;
  };
  window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
      requestAnimationFrame(updateParallax);
      parallaxTicking = true;
    }
  }, { passive: true });
  updateParallax();
}

const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    heroVideo.pause();
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) heroVideo.pause();
    else if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) heroVideo.play().catch(() => {});
  });
}
