import crypto from 'node:crypto';
import { list, put } from '@vercel/blob';

const AUTH_PATH = 'cms/admin-auth.json';

function safeEqual(leftValue, rightValue) {
  const left = Buffer.from(leftValue || '');
  const right = Buffer.from(rightValue || '');
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function passwordDigest(password) {
  const pepper = process.env.ADMIN_PASSWORD || '';
  if (!pepper) return '';
  return crypto.createHmac('sha256', pepper).update(password).digest('hex');
}

async function readStoredCredential() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  const result = await list({ prefix: AUTH_PATH, limit: 10 });
  const blob = result.blobs.find((item) => item.pathname === AUTH_PATH);
  if (!blob) return null;
  const response = await fetch(`${blob.url}?v=${Date.now()}`, { cache: 'no-store' });
  if (!response.ok) throw new Error('Không thể đọc thông tin đăng nhập.');
  return response.json();
}

export async function isAuthorized(request) {
  const bootstrapPassword = process.env.ADMIN_PASSWORD || '';
  const header = request.headers.authorization || '';
  const supplied = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!bootstrapPassword || !supplied) return false;

  const stored = await readStoredCredential();
  if (stored?.digest) return safeEqual(passwordDigest(supplied), stored.digest);
  return safeEqual(supplied, bootstrapPassword);
}

export async function writeAdminPassword(password) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error('Kho dữ liệu chưa được kết nối.');
  const credential = {
    version: 1,
    digest: passwordDigest(password),
    updatedAt: new Date().toISOString()
  };
  await put(AUTH_PATH, JSON.stringify(credential), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json; charset=utf-8'
  });
  return credential.updatedAt;
}

export function parseJsonBody(request) {
  if (typeof request.body === 'string') return JSON.parse(request.body);
  return request.body || {};
}
