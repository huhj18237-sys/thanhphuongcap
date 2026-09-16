import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const content = JSON.parse(fs.readFileSync(path.join(root, 'data/default-content.json'), 'utf8'));
const errors = [];
const slugs = new Set();

for (const product of content.products) {
  if (!product.id || !product.name || !product.slug || !product.summary) errors.push(`Sản phẩm thiếu trường bắt buộc: ${product.id || product.name || 'không tên'}`);
  if (slugs.has(product.slug)) errors.push(`Trùng đường dẫn sản phẩm: ${product.slug}`);
  slugs.add(product.slug);
  for (const image of product.images || []) {
    if (image.startsWith('/')) {
      const file = path.join(root, image.slice(1));
      if (!fs.existsSync(file)) errors.push(`Thiếu ảnh: ${image}`);
    }
  }
}

if (!Array.isArray(content.homeProductIds) || content.homeProductIds.length !== 5) errors.push('Trang chủ phải có đúng 5 sản phẩm nổi bật.');
for (const productId of content.homeProductIds || []) {
  if (!content.products.some((product) => product.id === productId)) errors.push(`Sản phẩm trang chủ không tồn tại: ${productId}`);
}
if (new Set(content.homeProductIds || []).size !== (content.homeProductIds || []).length) errors.push('Danh sách sản phẩm trang chủ bị trùng.');

for (const file of ['index.html', 'san-pham.html', 'nang-luc.html', 'quy-trinh.html', 'gioi-thieu.html', 'lien-he.html']) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const badLinks = [...source.matchAll(/(?:href|data-page)="([^"]+\.html[^\"]*)"/g)].map((match) => match[1]);
  if (badLinks.length) errors.push(`${file} còn liên kết .html: ${badLinks.join(', ')}`);
  const hashLinks = [...source.matchAll(/href="([^"]*#[^"]*)"/g)].map((match) => match[1]);
  if (hashLinks.length) errors.push(`${file} còn liên kết chứa #: ${hashLinks.join(', ')}`);
  if (!source.includes('cms.js')) errors.push(`${file} chưa kết nối CMS.`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`OK: ${content.products.length} sản phẩm, ${content.pageFields.length} trường nội dung, URL công khai không còn .html.`);
