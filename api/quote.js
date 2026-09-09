const RECIPIENT = 'thanhphuongcap76@gmail.com';

module.exports = async function quoteHandler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name = '', email = '', type = '', message = '', website = '' } = request.body || {};
  if (website) return response.status(200).json({ success: true });

  const cleanName = String(name).trim().slice(0, 120);
  const cleanEmail = String(email).trim().slice(0, 180);
  const cleanType = String(type).trim().slice(0, 120);
  const cleanMessage = String(message).trim().slice(0, 5000);
  if (!cleanName || !/^\S+@\S+\.\S+$/.test(cleanEmail)) {
    return response.status(400).json({ success: false, message: 'Invalid contact information' });
  }

  try {
    const mailResponse = await fetch(`https://formsubmit.co/ajax/${RECIPIENT}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        'Họ tên / Công ty': cleanName,
        Email: cleanEmail,
        'Dòng nón quan tâm': cleanType,
        'Mô tả yêu cầu': cleanMessage || 'Khách hàng chưa nhập mô tả.',
        _subject: `Yêu cầu báo giá mới từ ${cleanName}`,
        _template: 'table',
        _url: 'https://thanhphuongcap.vercel.app/#bao-gia'
      })
    });
    const payload = await mailResponse.json().catch(() => ({}));
    if (!mailResponse.ok || payload.success === false) {
      return response.status(502).json({ success: false, message: payload.message || 'Email provider rejected the request' });
    }
    return response.status(200).json({ success: true });
  } catch (error) {
    return response.status(502).json({ success: false, message: 'Email service unavailable' });
  }
};
