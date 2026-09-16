import { list, put } from '@vercel/blob';
import defaultContent from '../data/default-content.json' with { type: 'json' };

const CONTENT_PATH = 'cms/content.json';

export function cloneDefaultContent() {
  return structuredClone(defaultContent);
}

function normalizeContent(content) {
  const savedFields = Array.isArray(content.pageFields) ? content.pageFields : [];
  const savedFieldsById = new Map(savedFields.map((field) => [field.id, field]));
  const defaultFieldIds = new Set(defaultContent.pageFields.map((field) => field.id));
  const pageFields = defaultContent.pageFields
    .map((field) => {
      const saved = savedFieldsById.get(field.id);
      return saved ? { ...field, value: saved.value ?? field.value, hidden: saved.hidden === true } : { ...field };
    })
    .concat(savedFields.filter((field) => !defaultFieldIds.has(field.id)));
  const requestedHomeProducts = Array.isArray(content.homeProductIds) ? content.homeProductIds : [];
  const validProductIds = new Set((Array.isArray(content.products) ? content.products : defaultContent.products).map((product) => product.id));
  const homeProductIds = [...new Set(requestedHomeProducts.filter((id) => validProductIds.has(id)))];
  for (const id of defaultContent.homeProductIds) {
    if (homeProductIds.length >= 5) break;
    if (validProductIds.has(id) && !homeProductIds.includes(id)) homeProductIds.push(id);
  }

  return {
    ...cloneDefaultContent(),
    ...content,
    site: { ...defaultContent.site, ...(content.site || {}) },
    homeProductIds,
    pageFields,
    customSections: Array.isArray(content.customSections) ? content.customSections : [],
    products: Array.isArray(content.products) ? content.products : cloneDefaultContent().products
  };
}

export async function readContent() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return cloneDefaultContent();

  const result = await list({ prefix: CONTENT_PATH, limit: 10 });
  const blob = result.blobs.find((item) => item.pathname === CONTENT_PATH);
  if (!blob) return cloneDefaultContent();

  const response = await fetch(`${blob.url}?v=${Date.now()}`, { cache: 'no-store' });
  if (!response.ok) throw new Error('Không thể đọc dữ liệu website.');
  return normalizeContent(await response.json());
}

export async function writeContent(content) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('Kho dữ liệu chưa được kết nối.');
  }

  const normalized = {
    ...normalizeContent(content),
    version: Number(content.version || 1),
    updatedAt: new Date().toISOString()
  };

  await put(CONTENT_PATH, JSON.stringify(normalized, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json; charset=utf-8'
  });

  return normalized;
}
