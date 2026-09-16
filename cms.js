(() => {
  const normalizePath = (value) => {
    const path = (value || '/').replace(/\/index\.html$/, '/').replace(/\.html$/, '').replace(/\/$/, '');
    return path || '/';
  };

  const escapeHtml = (value = '') => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const productUrl = (product) => `/san-pham/${encodeURIComponent(product.slug)}`;

  function applySiteSettings(site) {
    if (!site) return;
    document.querySelectorAll('.brand strong').forEach((element) => { element.textContent = site.name; });
    document.querySelectorAll('.brand-logo').forEach((image) => {
      if (site.logo) image.src = site.logo;
      image.alt = `Logo ${site.name}`;
    });
    document.querySelectorAll('.footer-tagline').forEach((element) => { element.textContent = site.tagline; });
    document.querySelectorAll('a[href^="mailto:"]').forEach((link) => { link.href = `mailto:${site.email}`; });
    document.querySelectorAll('a[href^="tel:"]').forEach((link) => { link.href = `tel:${site.phoneInternational}`; });
    document.querySelectorAll('a[href*="zalo.me/"]').forEach((link) => { link.href = `https://zalo.me/${site.zalo}`; });

    document.querySelectorAll('.footer-contact-row').forEach((row) => {
      const label = row.querySelector('small')?.textContent?.toLowerCase() || '';
      const value = row.querySelector('span:last-child');
      if (!value) return;
      if (label.includes('email')) value.lastChild.textContent = site.email;
      if (label.includes('gọi')) value.lastChild.textContent = site.phone;
      if (label.includes('địa')) value.lastChild.textContent = site.address;
    });
  }

  function applyPageFields(fields, path) {
    fields.filter((field) => normalizePath(field.page) === path).forEach((field) => {
      let element;
      try { element = document.querySelector(field.selector); } catch { return; }
      if (!element) return;
      element.hidden = Boolean(field.hidden);
      if (field.hidden) return;
      if (field.type === 'image' && element instanceof HTMLImageElement) element.src = field.value;
      else if (field.type === 'html') element.innerHTML = field.value;
      else element.textContent = field.value;
    });
  }

  function renderCatalog(products) {
    const container = document.querySelector('.editorial-catalog');
    if (!container) return;
    const published = products.filter((product) => product.published !== false);
    container.innerHTML = published.map((product, index) => {
      const features = (product.features || []).map((item) => `<li>${escapeHtml(item)}</li>`).join('');
      const image = product.images?.[0] || '/assets/editorial/product-hero.jpg';
      const classes = ['product-story', 'reveal', index % 7 === 0 ? 'featured' : ''].filter(Boolean).join(' ');
      return `<article class="${classes}" id="${escapeHtml(product.slug)}">
        <a class="product-story-hit" href="${productUrl(product)}" aria-label="Xem chi tiết ${escapeHtml(product.name)}"></a>
        <div class="product-story-media"><img src="${escapeHtml(image)}" alt="${escapeHtml(product.name)}" loading="lazy"></div>
        <div class="product-story-copy"><span>${escapeHtml(product.code)}</span><h3>${escapeHtml(product.name)}</h3><p>${escapeHtml(product.summary)}</p><ul>${features}</ul><a href="${productUrl(product)}">Xem thông tin và ảnh <span aria-hidden="true">↗</span></a></div>
      </article>`;
    }).join('');
  }

  function renderHomeProducts(products) {
    const published = products.filter((product) => product.published !== false).slice(0, 5);
    document.querySelectorAll('.product-rail-track').forEach((track) => {
      if (!published.length) return;
      const cards = published.map((product, index) => `<a class="product-rail-card product-rail-cap" href="${productUrl(product)}"><span>${String(index + 1).padStart(2, '0')}</span><strong>${escapeHtml(product.name)}</strong><small>${escapeHtml(product.features?.[0] || 'Xem chi tiết')}</small></a>`).join('');
      track.innerHTML = cards + cards.replaceAll('<a ', '<a aria-hidden="true" tabindex="-1" ');
    });

    document.querySelectorAll('.collection-grid .collection-tile').forEach((tile, index) => {
      const product = published[index];
      if (!product) {
        tile.hidden = true;
        return;
      }
      tile.hidden = false;
      const title = tile.querySelector('h3');
      const link = tile.querySelector('a');
      if (title) title.textContent = product.name;
      if (link) link.href = productUrl(product);
      if (product.images?.[0]) tile.style.backgroundImage = `linear-gradient(180deg,rgba(8,15,40,.06),rgba(8,15,40,.84)),url("${product.images[0]}")`;
    });

    document.querySelectorAll('.capability-card').forEach((card, index) => {
      const product = published[index];
      if (!product) return;
      const title = card.querySelector('h3');
      const copy = card.querySelector('p');
      const link = card.querySelector('a');
      if (title) title.textContent = product.name;
      if (copy) copy.textContent = product.summary;
      if (link) link.href = productUrl(product);
    });
  }

  function renderCustomSections(sections, path) {
    const main = document.querySelector('main');
    if (!main) return;
    main.querySelectorAll('[data-cms-custom-section]').forEach((element) => element.remove());
    sections.filter((section) => normalizePath(section.page) === path && section.published !== false).forEach((section) => {
      const wrapper = document.createElement('section');
      wrapper.className = 'cms-custom-section section-pad';
      wrapper.dataset.cmsCustomSection = section.id;
      const image = section.image ? `<div class="cms-custom-image"><img src="${escapeHtml(section.image)}" alt="${escapeHtml(section.title)}" loading="lazy"></div>` : '';
      wrapper.innerHTML = `<div class="cms-custom-inner">${image}<div class="cms-custom-copy"><span class="section-kicker">${escapeHtml(section.kicker || 'Nội dung mới')}</span><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.body)}</p></div></div>`;
      main.appendChild(wrapper);
    });
  }

  async function initCms() {
    try {
      const response = await fetch('/api/content', { cache: 'no-store' });
      if (!response.ok) throw new Error('Không thể tải dữ liệu website.');
      const content = await response.json();
      const path = normalizePath(window.location.pathname);
      window.siteContent = content;
      applySiteSettings(content.site);
      applyPageFields(content.pageFields || [], path);
      if (path === '/san-pham') renderCatalog(content.products || []);
      if (path === '/') renderHomeProducts(content.products || []);
      renderCustomSections(content.customSections || [], path);
      document.dispatchEvent(new CustomEvent('cms:ready', { detail: content }));
    } catch (error) {
      console.warn(error.message);
      document.dispatchEvent(new CustomEvent('cms:error', { detail: error }));
    }
  }

  initCms();
})();
