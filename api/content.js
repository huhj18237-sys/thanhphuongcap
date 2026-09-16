import { isAuthorized, parseJsonBody } from '../lib/auth.js';
import { readContent, writeContent } from '../lib/store.js';

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store, max-age=0');

  if (request.method === 'GET') {
    try {
      return response.status(200).json(await readContent());
    } catch (error) {
      return response.status(500).json({ error: error.message || 'Không thể tải dữ liệu.' });
    }
  }

  if (request.method === 'PUT') {
    if (!isAuthorized(request)) return response.status(401).json({ error: 'Mật khẩu quản trị không đúng.' });

    try {
      const content = parseJsonBody(request);
      if (!content.site || !Array.isArray(content.products) || !Array.isArray(content.pageFields) || !Array.isArray(content.customSections)) {
        return response.status(400).json({ error: 'Dữ liệu không đúng cấu trúc.' });
      }
      return response.status(200).json(await writeContent(content));
    } catch (error) {
      return response.status(500).json({ error: error.message || 'Không thể lưu dữ liệu.' });
    }
  }

  response.setHeader('Allow', 'GET, PUT');
  return response.status(405).json({ error: 'Phương thức không được hỗ trợ.' });
}
