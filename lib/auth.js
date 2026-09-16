import crypto from 'node:crypto';

export function isAuthorized(request) {
  const expected = process.env.ADMIN_PASSWORD || '';
  const header = request.headers.authorization || '';
  const supplied = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!expected || !supplied) return false;

  const left = Buffer.from(expected);
  const right = Buffer.from(supplied);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

export function parseJsonBody(request) {
  if (typeof request.body === 'string') return JSON.parse(request.body);
  return request.body || {};
}
