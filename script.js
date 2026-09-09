const gmailComposeUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=thanhphuongcap76%40gmail.com';
const contactMarkup = `
  <a class="contact-icon zalo" href="https://zalo.me/0906607633" target="_blank" rel="noreferrer" aria-label="Liên hệ Zalo" title="Zalo">
    <span class="zalo-mark" aria-hidden="true" data-i18n-ignore>Zalo</span>
  </a>
  <a class="contact-icon gmail" href="${gmailComposeUrl}" target="_blank" rel="noreferrer" aria-label="Mở Gmail để gửi thư" title="Gmail">
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
document.querySelectorAll('.footer-bottom > a').forEach((link) => link.remove());

const mapDestination = encodeURIComponent('12B Tân Thới Nhất 1, Tổ 1, Khu phố 1, Phường Đông Hưng Thuận, TP. Hồ Chí Minh');
document.querySelectorAll('.footer-contact').forEach((contact) => {
  contact.innerHTML = `<span class="footer-label">Liên hệ trực tiếp</span>
    <a class="footer-contact-row" href="${gmailComposeUrl}" target="_blank" rel="noreferrer" aria-label="Mở Gmail để gửi thư đến THÀNH PHƯỢNG CAP">
      <span class="footer-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3.5 6.5h17v11h-17zM4 7l8 6 8-6"/></svg></span><span><small>Email</small>thanhphuongcap76@gmail.com</span>
    </a>
    <a class="footer-contact-row" href="tel:+84906607633" aria-label="Gọi THÀNH PHƯỢNG CAP theo số 0906 607 633">
      <span class="footer-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7.1 3.2 10 8 8.2 9.6c1.1 2.7 3.2 4.8 5.8 5.9l1.7-1.9 4.8 2.9c-.8 3.1-2.8 4.6-5.7 4C8.9 19.3 4.2 14.6 3 8.7c-.6-2.9 1-4.8 4.1-5.5Z"/></svg></span><span><small>Gọi ngay</small>0906 607 633</span>
    </a>
    <a class="footer-contact-row" href="https://www.google.com/maps/search/?api=1&amp;query=${mapDestination}" target="_blank" rel="noreferrer" aria-label="Tìm địa chỉ THÀNH PHƯỢNG CAP trên Google Maps">
      <span class="footer-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z"/><circle cx="12" cy="10" r="2.2"/></svg></span><span><small>Chỉ đường Google Maps</small>12B Tân Thới Nhất 1, Tổ 1, Khu phố 1,<br />Phường Đông Hưng Thuận, TP. Hồ Chí Minh</span>
    </a>`;
});

// Keep the newly added catalogue lines translated even before the next dictionary build.
const productLocaleAdditions = {
  en: {
    'Khám phá 15 dòng nón': 'Explore 15 hat lines', 'Mười lăm form khác biệt.': 'Fifteen distinctive forms.',
    'Nón tai bèo': 'Boonie hat', 'Vành mềm, che nắng tốt và mang tinh thần dã ngoại hiện đại cho chiến dịch ngoài trời.': 'A soft brim with reliable sun coverage and a modern outdoor spirit.', 'Ripstop nhẹ, nhanh khô': 'Lightweight quick-dry ripstop', 'Dây giữ và khóa điều chỉnh': 'Chin cord and adjustable toggle', 'Khoen thoáng khí chống ẩm': 'Breathable moisture-resistant eyelets',
    'Nón thủy thủ': 'Sailor cap', 'Phom đứng gọn gàng, viền phối tinh tế cho đồng phục dịch vụ, thời trang và quà tặng.': 'A crisp silhouette with refined piping for service uniforms, fashion and gifts.', 'Cotton twill giữ phom': 'Shape-holding cotton twill', 'Viền piping theo màu thương hiệu': 'Piping matched to your brand', 'Khóa bên hông hoàn thiện': 'Finished side fastening',
    'Nón safari': 'Safari hat', 'Vẻ phóng khoáng, vành vừa phải và dải băng đồng màu cho bộ sưu tập du lịch hoặc resort.': 'A relaxed profile with a balanced brim and tonal band for travel or resort collections.', 'Cotton brushed mềm tay': 'Soft brushed cotton', 'Dải băng dệt hoặc da': 'Woven or leather band', 'Thêu tên thương hiệu tinh gọn': 'Refined brand-name embroidery'
  },
  ja: {
    'Khám phá 15 dòng nón': '15種類の帽子を見る', 'Mười lăm form khác biệt.': '個性豊かな15のフォルム。', 'Nón tai bèo': 'ブーニーハット', 'Vành mềm, che nắng tốt và mang tinh thần dã ngoại hiện đại cho chiến dịch ngoài trời.': '柔らかなつばで日差しを防ぐ、現代的なアウトドアスタイル。', 'Ripstop nhẹ, nhanh khô': '軽量速乾リップストップ', 'Dây giữ và khóa điều chỉnh': 'あご紐と調整ストッパー', 'Khoen thoáng khí chống ẩm': '通気性のある防湿アイレット',
    'Nón thủy thủ': 'セーラーキャップ', 'Phom đứng gọn gàng, viền phối tinh tế cho đồng phục dịch vụ, thời trang và quà tặng.': '端正なシルエットと上品なパイピング。制服やギフトに。', 'Cotton twill giữ phom': '形を保つコットンツイル', 'Viền piping theo màu thương hiệu': 'ブランドカラーのパイピング', 'Khóa bên hông hoàn thiện': 'サイド留め具',
    'Nón safari': 'サファリハット', 'Vẻ phóng khoáng, vành vừa phải và dải băng đồng màu cho bộ sưu tập du lịch hoặc resort.': '程よいつばと同色バンドを備えた、旅やリゾート向けの軽やかな形。', 'Cotton brushed mềm tay': '柔らかなブラッシュドコットン', 'Dải băng dệt hoặc da': '織りまたはレザーバンド', 'Thêu tên thương hiệu tinh gọn': '端正なブランド刺繍'
  },
  ko: {
    'Khám phá 15 dòng nón': '15가지 모자 라인 보기', 'Mười lăm form khác biệt.': '개성 있는 15가지 형태.', 'Nón tai bèo': '부니햇', 'Vành mềm, che nắng tốt và mang tinh thần dã ngoại hiện đại cho chiến dịch ngoài trời.': '부드러운 챙과 뛰어난 차양, 현대적인 아웃도어 감성.', 'Ripstop nhẹ, nhanh khô': '가볍고 빠르게 마르는 립스톱', 'Dây giữ và khóa điều chỉnh': '턱끈과 조절 토글', 'Khoen thoáng khí chống ẩm': '통기성 방습 아일릿',
    'Nón thủy thủ': '세일러 캡', 'Phom đứng gọn gàng, viền phối tinh tế cho đồng phục dịch vụ, thời trang và quà tặng.': '정돈된 실루엣과 섬세한 파이핑으로 유니폼과 선물에 어울립니다.', 'Cotton twill giữ phom': '형태를 잡는 코튼 트윌', 'Viền piping theo màu thương hiệu': '브랜드 컬러 파이핑', 'Khóa bên hông hoàn thiện': '완성도 높은 사이드 잠금',
    'Nón safari': '사파리 햇', 'Vẻ phóng khoáng, vành vừa phải và dải băng đồng màu cho bộ sưu tập du lịch hoặc resort.': '여행과 리조트 컬렉션을 위한 여유로운 형태와 톤온톤 밴드.', 'Cotton brushed mềm tay': '부드러운 브러시드 코튼', 'Dải băng dệt hoặc da': '직조 또는 가죽 밴드', 'Thêu tên thương hiệu tinh gọn': '정제된 브랜드 자수'
  },
  fr: {
    'Khám phá 15 dòng nón': 'Découvrir 15 lignes de chapeaux', 'Mười lăm form khác biệt.': 'Quinze formes distinctives.', 'Nón tai bèo': 'Chapeau boonie', 'Vành mềm, che nắng tốt và mang tinh thần dã ngoại hiện đại cho chiến dịch ngoài trời.': 'Un bord souple, une bonne protection solaire et un esprit outdoor moderne.', 'Ripstop nhẹ, nhanh khô': 'Ripstop léger à séchage rapide', 'Dây giữ và khóa điều chỉnh': 'Cordon et réglage ajustable', 'Khoen thoáng khí chống ẩm': 'Œillets respirants anti-humidité',
    'Nón thủy thủ': 'Casquette marin', 'Phom đứng gọn gàng, viền phối tinh tế cho đồng phục dịch vụ, thời trang và quà tặng.': 'Une silhouette nette aux finitions raffinées pour uniformes, mode et cadeaux.', 'Cotton twill giữ phom': 'Coton twill qui garde sa forme', 'Viền piping theo màu thương hiệu': 'Passepoil aux couleurs de la marque', 'Khóa bên hông hoàn thiện': 'Fermeture latérale soignée',
    'Nón safari': 'Chapeau safari', 'Vẻ phóng khoáng, vành vừa phải và dải băng đồng màu cho bộ sưu tập du lịch hoặc resort.': 'Une allure libre, un bord équilibré et un bandeau ton sur ton pour le voyage ou le resort.', 'Cotton brushed mềm tay': 'Coton brossé doux', 'Dải băng dệt hoặc da': 'Bande tissée ou cuir', 'Thêu tên thương hiệu tinh gọn': 'Broderie de marque épurée'
  },
  zh: {
    'Khám phá 15 dòng nón': '探索15条帽子系列', 'Mười lăm form khác biệt.': '十五种独特版型。', 'Nón tai bèo': '奔尼帽', 'Vành mềm, che nắng tốt và mang tinh thần dã ngoại hiện đại cho chiến dịch ngoài trời.': '柔软帽檐，遮阳出色，呈现现代户外风格。', 'Ripstop nhẹ, nhanh khô': '轻量速干防撕裂面料', 'Dây giữ và khóa điều chỉnh': '下巴绳与可调节扣', 'Khoen thoáng khí chống ẩm': '透气防潮气眼',
    'Nón thủy thủ': '水手帽', 'Phom đứng gọn gàng, viền phối tinh tế cho đồng phục dịch vụ, thời trang và quà tặng.': '利落版型与精致滚边，适合服务制服、时装与礼赠。', 'Cotton twill giữ phom': '挺括棉斜纹', 'Viền piping theo màu thương hiệu': '品牌色滚边', 'Khóa bên hông hoàn thiện': '精致侧面扣件',
    'Nón safari': '探险帽', 'Vẻ phóng khoáng, vành vừa phải và dải băng đồng màu cho bộ sưu tập du lịch hoặc resort.': '轻松廓形、中等帽檐与同色帽带，适合旅行与度假系列。', 'Cotton brushed mềm tay': '柔软磨毛棉', 'Dải băng dệt hoặc da': '织带或皮革帽带', 'Thêu tên thương hiệu tinh gọn': '简洁品牌刺绣'
  }
};
Object.entries(productLocaleAdditions).forEach(([locale, additions]) => Object.assign(window.TPC_I18N?.[locale] || {}, additions));

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
  const body = encodeURIComponent(`Họ tên / Công ty: ${data.get('name')}\nEmail: ${data.get('email')}\nSố điện thoại: ${data.get('phone')}\nDòng nón: ${data.get('type')}\n\nMô tả yêu cầu:\n${data.get('message')}`);
  const mailHref = `mailto:thanhphuongcap76@gmail.com?subject=${subject}&body=${body}`;
  const note = document.querySelector('#formNote');
  const button = form.querySelector('button[type="submit"]');
  const buttonContent = button.innerHTML;
  const localize = (message) => window.TPC_I18N?.[normalizeLocale(document.documentElement.lang)]?.[message] || message;
  button.disabled = true;
  button.textContent = localize('Đang gửi yêu cầu...');
  note?.classList.remove('is-success', 'is-error');
  try {
    const response = await fetch('https://formsubmit.co/ajax/thanhphuongcap76@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: data.get('name'),
        email: data.get('email'),
        phone: data.get('phone'),
        type: data.get('type'),
        message: data.get('message') || 'Khách hàng chưa nhập mô tả.',
        _subject: `Yêu cầu báo giá mới từ ${data.get('name')}`,
        _template: 'table',
        _url: 'https://thanhphuongcap.vercel.app/#bao-gia'
      })
    });
    const result = await response.json();
    if (!response.ok || String(result.success) !== 'true') throw new Error(result.message || 'Submission failed');
    if (note) {
      note.textContent = localize('Yêu cầu đã được gửi thành công. Chúng tôi sẽ liên hệ lại với bạn sớm.');
      note.classList.add('is-success');
    }
    form.reset();
  } catch (error) {
    console.error('Quote submission failed', error);
    if (note) {
      note.innerHTML = `${localize('Chưa thể gửi trực tiếp. Ứng dụng email đang được mở để bạn gửi yêu cầu.')} <a href="${mailHref}">Mở lại email</a>`;
      note.classList.add('is-error');
    }
    window.location.href = mailHref;
  } finally {
    button.disabled = false;
    button.innerHTML = buttonContent;
  }
});

const updateStickyHeader = () => {
  document.querySelector('.site-header')?.classList.toggle('scrolled', window.scrollY > 10);
};
window.addEventListener('scroll', updateStickyHeader, { passive: true });
updateStickyHeader();

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
