(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHtml = (value = '') => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
  const pageNames = { '/': 'Trang chủ', '/san-pham': 'Sản phẩm', '/nang-luc': 'Năng lực', '/quy-trinh': 'Quy trình', '/gioi-thieu': 'Giới thiệu' };
  const panelMeta = {
    overview: ['TỔNG QUAN', 'Quản lý website'], products: ['SẢN PHẨM', 'Danh sách sản phẩm'], content: ['NỘI DUNG TRANG', 'Chỉnh sửa nội dung'], sections: ['KHỐI NỘI DUNG', 'Nội dung bổ sung'], settings: ['THÔNG TIN CHUNG', 'Cài đặt website'], password: ['BẢO MẬT', 'Đổi mật khẩu']
  };
  let password = sessionStorage.getItem('tpcAdminPassword') || '';
  let content = null;
  let dirty = false;
  let editingProductId = null;
  let editingSectionId = null;
  let productDraft = null;
  let sectionDraft = null;
  let toastTimer;

  function toast(message, isError = false) {
    const element = $('#toast');
    element.textContent = message;
    element.classList.toggle('is-error', isError);
    element.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => element.classList.remove('is-visible'), 3200);
  }

  function markDirty() {
    dirty = true;
    $('#save-state').textContent = 'Chưa lưu';
    $('#save-state').classList.add('is-dirty');
  }

  function markSaved() {
    dirty = false;
    $('#save-state').textContent = 'Đã đồng bộ';
    $('#save-state').classList.remove('is-dirty');
  }

  async function api(url, options = {}) {
    const headers = { ...(options.headers || {}) };
    if (password) headers.Authorization = `Bearer ${password}`;
    const response = await fetch(url, { ...options, headers, cache: 'no-store' });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || 'Đã có lỗi xảy ra.');
    return data;
  }

  async function authenticate(candidate) {
    password = candidate;
    await api('/api/auth', { method: 'POST' });
    sessionStorage.setItem('tpcAdminPassword', password);
    content = await api('/api/content');
    $('#login-screen').hidden = true;
    $('#admin-app').hidden = false;
    renderAll();
  }

  function renderAll() {
    renderStats();
    renderProducts();
    renderContentFields();
    renderSections();
    renderSettings();
  }

  function renderStats() {
    $('#stat-products').textContent = content.products.filter((item) => item.published !== false).length;
    $('#stat-fields').textContent = content.pageFields.length;
    $('#stat-sections').textContent = content.customSections.length;
  }

  function renderProducts() {
    const list = $('#product-list');
    if (!content.products.length) {
      list.innerHTML = '<div class="empty-state">Chưa có sản phẩm. Bấm “Thêm sản phẩm” để bắt đầu.</div>';
      return;
    }
    list.innerHTML = content.products.map((product) => `<article class="product-admin-card">
      <div class="product-admin-image"><img src="${escapeHtml(product.images?.[0] || '/assets/editorial/product-hero.jpg')}" alt=""><span class="status-pill${product.published === false ? ' is-hidden' : ''}">${product.published === false ? 'Đang ẩn' : 'Đang hiển thị'}</span></div>
      <div class="product-admin-body"><small>${escapeHtml(product.code || '')}</small><h3>${escapeHtml(product.name)}</h3><p>${escapeHtml(product.summary)}</p><div class="card-actions"><button type="button" data-edit-product="${escapeHtml(product.id)}">Chỉnh sửa</button><button class="danger" type="button" data-delete-product="${escapeHtml(product.id)}">Xóa</button></div></div>
    </article>`).join('');
    $$('[data-edit-product]', list).forEach((button) => button.addEventListener('click', () => openProduct(button.dataset.editProduct)));
    $$('[data-delete-product]', list).forEach((button) => button.addEventListener('click', () => deleteProduct(button.dataset.deleteProduct)));
  }

  function slugify(value) {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function openProduct(id = null) {
    editingProductId = id;
    const existing = content.products.find((item) => item.id === id);
    productDraft = existing ? structuredClone(existing) : { id: crypto.randomUUID(), slug: '', code: `${String(content.products.length + 1).padStart(2, '0')} / NEW`, name: '', summary: '', description: '', features: [], images: [], featured: false, published: true };
    $('#product-dialog-title').textContent = existing ? `Sửa ${existing.name}` : 'Thêm sản phẩm';
    $('#product-form-body').innerHTML = `<div class="form-grid"><label>Tên sản phẩm<input id="product-name-input" value="${escapeHtml(productDraft.name)}" required></label><label>Đường dẫn sạch<input id="product-slug-input" value="${escapeHtml(productDraft.slug)}" placeholder="non-luoi-trai" required></label></div>
      <div class="form-grid"><label>Mã / nhóm sản phẩm<input id="product-code-input" value="${escapeHtml(productDraft.code)}"></label><label>Trạng thái<select id="product-published-input"><option value="true"${productDraft.published !== false ? ' selected' : ''}>Hiển thị</option><option value="false"${productDraft.published === false ? ' selected' : ''}>Ẩn</option></select></label></div>
      <label>Mô tả ngắn<textarea id="product-summary-input" rows="3" required>${escapeHtml(productDraft.summary)}</textarea></label>
      <label>Thông tin chi tiết<textarea id="product-description-input" rows="5">${escapeHtml(productDraft.description)}</textarea></label>
      <label>Đặc điểm nổi bật<textarea id="product-features-input" rows="4" placeholder="Mỗi dòng là một đặc điểm">${escapeHtml((productDraft.features || []).join('\n'))}</textarea></label>
      <div class="gallery-editor"><div><strong>Bộ ảnh sản phẩm</strong><p class="hint">Dán URL hoặc bấm tải ảnh. Chỉ cần chọn một trong hai cách.</p></div><div id="gallery-rows"></div><button class="secondary-button" id="add-gallery-image" type="button">+ Thêm ảnh</button></div>`;
    renderGalleryRows();
    $('#add-gallery-image').addEventListener('click', () => { productDraft.images.push(''); renderGalleryRows(); });
    const nameInput = $('#product-name-input');
    nameInput.addEventListener('input', () => { if (!editingProductId && !$('#product-slug-input').dataset.touched) $('#product-slug-input').value = slugify(nameInput.value); });
    $('#product-slug-input').addEventListener('input', (event) => { event.target.dataset.touched = 'true'; });
    $('#product-dialog').showModal();
  }

  function renderGalleryRows() {
    const rows = $('#gallery-rows');
    if (!productDraft.images.length) rows.innerHTML = '<p class="hint">Chưa có ảnh. Nên thêm ít nhất một ảnh đại diện.</p>';
    else rows.innerHTML = productDraft.images.map((url, index) => `<div class="gallery-row"><img src="${escapeHtml(url || '/assets/editorial/product-hero.jpg')}" alt=""><input class="gallery-url" type="text" value="${escapeHtml(url)}" placeholder="https://... hoặc /assets/..."><label class="upload-button">Tải ảnh<input type="file" accept="image/*"></label><button class="remove-image" type="button" aria-label="Xóa ảnh">×</button></div>`).join('');
    $$('.gallery-row', rows).forEach((row, index) => {
      $('.gallery-url', row).addEventListener('input', (event) => { productDraft.images[index] = event.target.value.trim(); $('img', row).src = productDraft.images[index] || '/assets/editorial/product-hero.jpg'; });
      $('input[type="file"]', row).addEventListener('change', async (event) => {
        const file = event.target.files[0]; if (!file) return;
        try { productDraft.images[index] = await uploadImage(file, row); renderGalleryRows(); } catch (error) { toast(error.message, true); }
      });
      $('.remove-image', row).addEventListener('click', () => { productDraft.images.splice(index, 1); renderGalleryRows(); });
    });
  }

  function collectProductDraft() {
    productDraft.name = $('#product-name-input').value.trim();
    productDraft.slug = slugify($('#product-slug-input').value);
    productDraft.code = $('#product-code-input').value.trim();
    productDraft.published = $('#product-published-input').value === 'true';
    productDraft.summary = $('#product-summary-input').value.trim();
    productDraft.description = $('#product-description-input').value.trim();
    productDraft.features = $('#product-features-input').value.split('\n').map((item) => item.trim()).filter(Boolean);
    productDraft.images = productDraft.images.map((item) => item.trim()).filter(Boolean);
    if (!productDraft.name || !productDraft.slug || !productDraft.summary) throw new Error('Vui lòng điền tên, đường dẫn và mô tả ngắn.');
    if (content.products.some((item) => item.slug === productDraft.slug && item.id !== productDraft.id)) throw new Error('Đường dẫn sản phẩm này đã tồn tại.');
  }

  function deleteProduct(id) {
    const product = content.products.find((item) => item.id === id);
    if (!product || !confirm(`Xóa sản phẩm “${product.name}”? Thao tác sẽ được áp dụng sau khi lưu.`)) return;
    content.products = content.products.filter((item) => item.id !== id);
    markDirty(); renderProducts(); renderStats(); toast('Đã đưa sản phẩm vào danh sách xóa.');
  }

  function renderContentFields() {
    const filter = $('#page-filter').value;
    const fields = content.pageFields.filter((field) => filter === 'all' || field.page === filter);
    $('#content-fields').innerHTML = fields.map((field) => `<article class="content-field-card" data-field-id="${escapeHtml(field.id)}"><div class="content-field-head"><div><strong>${escapeHtml(field.label)}</strong><br><span>${escapeHtml(pageNames[field.page] || field.page)}</span></div><span>${field.type === 'image' ? 'Ảnh' : 'Văn bản'}</span></div><div class="content-field-control"><label>${field.type === 'image' ? 'URL ảnh hoặc tải file' : 'Nội dung'}${field.type === 'image' ? `<div class="image-input-row"><input class="field-value" type="text" value="${escapeHtml(field.value)}"><label class="upload-button">Tải ảnh<input class="field-upload" type="file" accept="image/*"></label></div>` : `<textarea class="field-value" rows="${field.type === 'html' ? 3 : 2}">${escapeHtml(field.value)}</textarea>`}</label><label class="toggle-label"><input class="field-hidden" type="checkbox"${field.hidden ? ' checked' : ''}> Ẩn nội dung này</label></div></article>`).join('');
    $$('.content-field-card').forEach((card) => {
      const field = content.pageFields.find((item) => item.id === card.dataset.fieldId);
      $('.field-value', card).addEventListener('input', (event) => { field.value = event.target.value; markDirty(); });
      $('.field-hidden', card).addEventListener('change', (event) => { field.hidden = event.target.checked; markDirty(); });
      const upload = $('.field-upload', card);
      if (upload) upload.addEventListener('change', async (event) => {
        const file = event.target.files[0]; if (!file) return;
        try { field.value = await uploadImage(file, card); $('.field-value', card).value = field.value; markDirty(); } catch (error) { toast(error.message, true); }
      });
    });
  }

  function renderSections() {
    const list = $('#section-list');
    if (!content.customSections.length) { list.innerHTML = '<div class="empty-state">Chưa có khối nội dung bổ sung.</div>'; return; }
    list.innerHTML = content.customSections.map((section) => `<article class="section-admin-card"><div><span class="section-page">${escapeHtml(pageNames[section.page] || section.page)}</span><h3>${escapeHtml(section.title)}</h3><p>${escapeHtml(section.body)}</p></div><div class="card-actions"><button type="button" data-edit-section="${escapeHtml(section.id)}">Chỉnh sửa</button><button class="danger" type="button" data-delete-section="${escapeHtml(section.id)}">Xóa</button></div></article>`).join('');
    $$('[data-edit-section]', list).forEach((button) => button.addEventListener('click', () => openSection(button.dataset.editSection)));
    $$('[data-delete-section]', list).forEach((button) => button.addEventListener('click', () => deleteSection(button.dataset.deleteSection)));
  }

  function openSection(id = null) {
    editingSectionId = id;
    const existing = content.customSections.find((item) => item.id === id);
    sectionDraft = existing ? structuredClone(existing) : { id: crypto.randomUUID(), page: '/', kicker: 'Nội dung mới', title: '', body: '', image: '', published: true };
    $('#section-dialog-title').textContent = existing ? `Sửa ${existing.title}` : 'Thêm khối nội dung';
    $('#section-form-body').innerHTML = `<div class="form-grid"><label>Hiển thị tại trang<select id="section-page-input">${Object.entries(pageNames).map(([value, label]) => `<option value="${value}"${sectionDraft.page === value ? ' selected' : ''}>${label}</option>`).join('')}</select></label><label>Trạng thái<select id="section-published-input"><option value="true"${sectionDraft.published !== false ? ' selected' : ''}>Hiển thị</option><option value="false"${sectionDraft.published === false ? ' selected' : ''}>Ẩn</option></select></label></div><label>Nhãn nhỏ<input id="section-kicker-input" value="${escapeHtml(sectionDraft.kicker)}"></label><label>Tiêu đề<input id="section-title-input" value="${escapeHtml(sectionDraft.title)}" required></label><label>Nội dung<textarea id="section-body-input" rows="6" required>${escapeHtml(sectionDraft.body)}</textarea></label><label>Ảnh (URL hoặc tải file)<div class="image-input-row"><input id="section-image-input" type="text" value="${escapeHtml(sectionDraft.image)}"><label class="upload-button">Tải ảnh<input id="section-image-upload" type="file" accept="image/*"></label></div></label>`;
    $('#section-image-upload').addEventListener('change', async (event) => { const file = event.target.files[0]; if (!file) return; try { sectionDraft.image = await uploadImage(file, $('#section-form-body')); $('#section-image-input').value = sectionDraft.image; } catch (error) { toast(error.message, true); } });
    $('#section-dialog').showModal();
  }

  function deleteSection(id) {
    const section = content.customSections.find((item) => item.id === id);
    if (!section || !confirm(`Xóa khối “${section.title}”?`)) return;
    content.customSections = content.customSections.filter((item) => item.id !== id);
    markDirty(); renderSections(); renderStats();
  }

  function renderSettings() {
    $$('[data-site-field]').forEach((input) => {
      const value = content.site[input.dataset.siteField];
      if (input.type === 'checkbox') input.checked = value !== false;
      else input.value = value || '';
    });
  }

  function bindSettings() {
    $$('[data-site-field]').forEach((input) => {
      const eventName = input.type === 'checkbox' ? 'change' : 'input';
      input.addEventListener(eventName, () => { content.site[input.dataset.siteField] = input.type === 'checkbox' ? input.checked : input.value; markDirty(); });
    });
    $$('[data-upload-target]').forEach((input) => input.addEventListener('change', async (event) => {
      const file = event.target.files[0]; if (!file) return;
      try { content.site.logo = await uploadImage(file, input.closest('label')); $('[data-site-field="logo"]').value = content.site.logo; markDirty(); } catch (error) { toast(error.message, true); }
    }));
  }

  async function uploadImage(file, context) {
    if (!file.type.startsWith('image/')) throw new Error('Vui lòng chọn đúng file ảnh.');
    if (file.size > 3 * 1024 * 1024) throw new Error('Ảnh phải nhỏ hơn 3 MB.');
    context?.classList?.add('is-uploading');
    const data = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result).split(',')[1]); reader.onerror = reject; reader.readAsDataURL(file); });
    try {
      const result = await api('/api/upload', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fileName: file.name, contentType: file.type, data }) });
      toast('Tải ảnh lên thành công.');
      return result.url;
    } finally { context?.classList?.remove('is-uploading'); }
  }

  async function saveAll() {
    const button = $('#save-button');
    button.disabled = true; button.firstChild.textContent = 'Đang lưu ';
    try { content = await api('/api/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(content) }); markSaved(); renderAll(); toast('Đã lưu và đồng bộ website thành công.'); }
    catch (error) { toast(error.message, true); }
    finally { button.disabled = false; button.firstChild.textContent = 'Lưu & đồng bộ '; }
  }

  $('#login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); $('#login-message').textContent = '';
    const button = event.currentTarget.querySelector('button'); button.disabled = true;
    try { await authenticate($('#admin-password').value); } catch (error) { $('#login-message').textContent = error.message; password = ''; sessionStorage.removeItem('tpcAdminPassword'); }
    finally { button.disabled = false; }
  });
  $$('.nav-item').forEach((button) => button.addEventListener('click', () => {
    const panel = button.dataset.panel;
    $$('.nav-item').forEach((item) => item.classList.toggle('is-active', item === button));
    $$('.admin-panel').forEach((item) => item.classList.toggle('is-active', item.dataset.panelView === panel));
    $('#panel-eyebrow').textContent = panelMeta[panel][0]; $('#panel-title').textContent = panelMeta[panel][1];
  }));
  $('#add-product').addEventListener('click', () => openProduct());
  $('#add-section').addEventListener('click', () => openSection());
  $('#page-filter').addEventListener('change', renderContentFields);
  $('#save-button').addEventListener('click', saveAll);
  $('#logout-button').addEventListener('click', () => { sessionStorage.removeItem('tpcAdminPassword'); location.reload(); });
  $('#change-password-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const currentPassword = $('#current-password').value;
    const newPassword = $('#new-password').value;
    const confirmPassword = $('#confirm-password').value;
    const message = $('#password-message');
    const button = event.currentTarget.querySelector('button[type="submit"]');
    message.textContent = '';
    message.className = 'password-message';
    if (currentPassword !== password) { message.textContent = 'Mật khẩu hiện tại không đúng.'; message.classList.add('is-error'); return; }
    if (newPassword.length < 10) { message.textContent = 'Mật khẩu mới phải có ít nhất 10 ký tự.'; message.classList.add('is-error'); return; }
    if (newPassword !== confirmPassword) { message.textContent = 'Hai lần nhập mật khẩu mới chưa khớp.'; message.classList.add('is-error'); return; }
    if (newPassword === currentPassword) { message.textContent = 'Mật khẩu mới phải khác mật khẩu hiện tại.'; message.classList.add('is-error'); return; }
    button.disabled = true;
    try {
      await api('/api/change-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ newPassword }) });
      password = newPassword;
      sessionStorage.setItem('tpcAdminPassword', password);
      event.currentTarget.reset();
      message.textContent = 'Đổi mật khẩu thành công. Mật khẩu mới đã có hiệu lực.';
      message.classList.add('is-success');
      toast('Đổi mật khẩu quản trị thành công.');
    } catch (error) { message.textContent = error.message; message.classList.add('is-error'); }
    finally { button.disabled = false; }
  });
  $$('[data-close-dialog]').forEach((button) => button.addEventListener('click', () => document.getElementById(button.dataset.closeDialog).close()));
  $('#product-form').addEventListener('submit', (event) => {
    event.preventDefault();
    try { collectProductDraft(); const index = content.products.findIndex((item) => item.id === productDraft.id); if (index >= 0) content.products[index] = productDraft; else content.products.push(productDraft); $('#product-dialog').close(); markDirty(); renderProducts(); renderStats(); toast('Đã cập nhật sản phẩm. Bấm Lưu & đồng bộ để xuất bản.'); } catch (error) { toast(error.message, true); }
  });
  $('#section-form').addEventListener('submit', (event) => {
    event.preventDefault();
    sectionDraft.page = $('#section-page-input').value; sectionDraft.published = $('#section-published-input').value === 'true'; sectionDraft.kicker = $('#section-kicker-input').value.trim(); sectionDraft.title = $('#section-title-input').value.trim(); sectionDraft.body = $('#section-body-input').value.trim(); sectionDraft.image = $('#section-image-input').value.trim();
    if (!sectionDraft.title || !sectionDraft.body) return toast('Vui lòng điền tiêu đề và nội dung.', true);
    const index = content.customSections.findIndex((item) => item.id === sectionDraft.id); if (index >= 0) content.customSections[index] = sectionDraft; else content.customSections.push(sectionDraft);
    $('#section-dialog').close(); markDirty(); renderSections(); renderStats(); toast('Đã cập nhật khối nội dung.');
  });
  window.addEventListener('beforeunload', (event) => { if (dirty) { event.preventDefault(); event.returnValue = ''; } });
  bindSettings();
  if (password) authenticate(password).catch(() => { password = ''; sessionStorage.removeItem('tpcAdminPassword'); });
})();
