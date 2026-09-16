(() => {
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const slug = decodeURIComponent(pathParts[pathParts.length - 1] || new URLSearchParams(window.location.search).get('slug') || '');
  const loading = document.getElementById('product-loading');
  const shell = document.getElementById('product-detail');
  const notFound = document.getElementById('product-not-found');
  const lightbox = document.getElementById('product-lightbox');
  let currentImage = '';

  function showNotFound() {
    loading.hidden = true;
    shell.hidden = true;
    notFound.hidden = false;
  }

  function selectImage(url, name, button) {
    currentImage = url;
    const image = document.querySelector('#product-main-image img');
    image.src = url;
    image.alt = name;
    document.querySelectorAll('.product-thumbnail').forEach((item) => item.classList.toggle('is-active', item === button));
  }

  function render(content) {
    const product = (content.products || []).find((item) => item.slug === slug && item.published !== false);
    if (!product) return showNotFound();
    const images = product.images?.length ? product.images : ['/assets/editorial/product-hero.jpg'];
    document.title = `${product.name} | THÀNH PHƯỢNG CAP`;
    document.querySelector('meta[name="description"]').content = product.summary;
    document.getElementById('product-breadcrumb-name').textContent = product.name;
    document.getElementById('product-code').textContent = product.code;
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-summary').textContent = product.summary;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-features').innerHTML = (product.features || []).map((item) => `<li>${item.replaceAll('<', '&lt;')}</li>`).join('');
    const thumbs = document.getElementById('product-thumbnails');
    thumbs.innerHTML = '';
    images.forEach((url, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `product-thumbnail${index === 0 ? ' is-active' : ''}`;
      button.setAttribute('aria-label', `Xem ảnh ${index + 1} của ${product.name}`);
      button.innerHTML = `<img src="${url}" alt="${product.name} - ảnh ${index + 1}">`;
      button.addEventListener('click', () => selectImage(url, product.name, button));
      thumbs.appendChild(button);
    });
    selectImage(images[0], product.name, thumbs.firstElementChild);
    loading.hidden = true;
    shell.hidden = false;
  }

  document.getElementById('product-main-image').addEventListener('click', () => {
    if (!currentImage) return;
    const image = lightbox.querySelector('img');
    image.src = currentImage;
    image.alt = document.getElementById('product-name').textContent;
    lightbox.showModal();
  });
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });

  if (window.siteContent) render(window.siteContent);
  else document.addEventListener('cms:ready', (event) => render(event.detail), { once: true });
  document.addEventListener('cms:error', showNotFound, { once: true });
})();
