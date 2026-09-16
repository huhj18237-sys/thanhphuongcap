import { isAuthorized, parseJsonBody, writeAdminPassword } from '../lib/auth.js';

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store, max-age=0');
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Phương thức không được hỗ trợ.' });
  }
  if (!(await isAuthorized(request))) return response.status(401).json({ error: 'Mật khẩu hiện tại không đúng.' });

  try {
    const { newPassword = '' } = parseJsonBody(request);
    if (typeof newPassword !== 'string' || newPassword.length < 10) {
      return response.status(400).json({ error: 'Mật khẩu mới phải có ít nhất 10 ký tự.' });
    }
    if (newPassword.length > 128) return response.status(400).json({ error: 'Mật khẩu mới không được quá 128 ký tự.' });
    const updatedAt = await writeAdminPassword(newPassword);
    return response.status(200).json({ ok: true, updatedAt });
  } catch (error) {
    return response.status(500).json({ error: error.message || 'Không thể đổi mật khẩu.' });
  }
}
