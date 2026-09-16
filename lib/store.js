import { list, put } from '@vercel/blob';
import defaultContent from '../data/default-content.json' with { type: 'json' };

const CONTENT_PATH = 'cms/content.json';

export function cloneDefaultContent() {
  return structuredClone(defaultContent);
}

export async function readContent() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return cloneDefaultContent();

  const result = await list({ prefix: CONTENT_PATH, limit: 10 });
  const blob = result.blobs.find((item) => item.pathname === CONTENT_PATH);
  if (!blob) return cloneDefaultContent();

  const response = await fetch(`${blob.url}?v=${Date.now()}`, { cache: 'no-store' });
  if (!response.ok) throw new Error('Không thể đọc dữ liệu website.');
  return response.json();
}

export async function writeContent(content) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('Kho dữ liệu chưa được kết nối.');
  }

  const normalized = {
    ...content,
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
