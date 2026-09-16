import crypto from 'node:crypto';
import { put } from '@vercel/blob';
import { isAuthorized, parseJsonBody } from '../lib/auth.js';

const MAX_BYTES = 3 * 1024 * 1024;

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store, max-age=0');
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Phương thức không được hỗ trợ.' });
  }
  if (!isAuthorized(request)) return response.status(401).json({ error: 'Mật khẩu quản trị không đúng.' });
  if (!process.env.BLOB_READ_WRITE_TOKEN) return response.status(503).json({ error: 'Kho ảnh chưa được kết nối.' });

  try {
    const { fileName = 'image', contentType = '', data = '' } = parseJsonBody(request);
    if (!contentType.startsWith('image/')) return response.status(400).json({ error: 'Chỉ chấp nhận file ảnh.' });

    const buffer = Buffer.from(data, 'base64');
    if (!buffer.length || buffer.length > MAX_BYTES) {
      return response.status(400).json({ error: 'Ảnh phải nhỏ hơn 3 MB.' });
    }

    const safeName = String(fileName).toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '') || 'image';
    const pathname = `uploads/${Date.now()}-${crypto.randomBytes(4).toString('hex')}-${safeName}`;
    const blob = await put(pathname, buffer, { access: 'public', contentType, addRandomSuffix: false });
    return response.status(201).json({ url: blob.url, pathname: blob.pathname });
  } catch (error) {
    return response.status(500).json({ error: error.message || 'Không thể tải ảnh lên.' });
  }
}
