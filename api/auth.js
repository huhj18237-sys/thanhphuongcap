import { isAuthorized } from '../lib/auth.js';

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store, max-age=0');
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Phương thức không được hỗ trợ.' });
  }
  if (!(await isAuthorized(request))) return response.status(401).json({ error: 'Mật khẩu quản trị không đúng.' });
  return response.status(200).json({ ok: true });
}
