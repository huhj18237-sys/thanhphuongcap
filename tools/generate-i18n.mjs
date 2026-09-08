import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const files = ['index.html', 'nang-luc.html', 'san-pham.html', 'quy-trinh.html', 'gioi-thieu.html'];
const extraStrings = [
  'Liên hệ Zalo', 'Gửi Gmail', 'Liên hệ WhatsApp', 'Gọi số di động',
  'Ứng dụng email đang mở với nội dung yêu cầu đã được điền sẵn.'
];
const decodeEntities = (value) => value
  .replaceAll('&amp;', '&').replaceAll('&nbsp;', ' ').replaceAll('&#39;', "'")
  .replaceAll('&quot;', '"').replaceAll('&lt;', '<').replaceAll('&gt;', '>');
const strings = new Set(extraStrings);

for (const file of files) {
  const html = await fs.readFile(path.join(root, file), 'utf8');
  for (const match of html.matchAll(/>([^<>]+)</g)) {
    const value = decodeEntities(match[1]).trim();
    if (value && /[\p{L}]/u.test(value)) strings.add(value.replace(/\s+/g, ' '));
  }
  for (const match of html.matchAll(/(?:content|placeholder|title|aria-label|alt)="([^"]+)"/g)) {
    const value = decodeEntities(match[1]).trim();
    if (value && /[\p{L}]/u.test(value) && !/^https?:/i.test(value)) strings.add(value.replace(/\s+/g, ' '));
  }
}

const sources = [...strings];
const languageTargets = { en: 'en', ja: 'ja', ko: 'ko', fr: 'fr', zh: 'zh-CN' };
const result = { vi: {} };

const translateBatch = async (texts, target) => {
  const separator = '\n🔷🔷TPC🔷🔷\n';
  const protectedText = texts.join(separator).replaceAll('THÀNH PHƯỢNG CAP', 'TPCBRANDTOKEN');
  const url = new URL('https://translate.googleapis.com/translate_a/single');
  url.searchParams.set('client', 'gtx');
  url.searchParams.set('sl', 'vi');
  url.searchParams.set('tl', target);
  url.searchParams.set('dt', 't');
  url.searchParams.set('q', protectedText);
  const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!response.ok) throw new Error(`Translation HTTP ${response.status}`);
  const payload = await response.json();
  const translated = payload[0].map((segment) => segment[0]).join('').replace(/TPCBRANDTOKEN|TPCブランドトークン|TPC브랜드토큰|TPCB品牌代币/gu, 'THÀNH PHƯỢNG CAP');
  const parts = translated.split(/\s*🔷🔷\s*TPC\s*🔷🔷\s*/u);
  if (parts.length !== texts.length) throw new Error(`Translation batch mismatch: ${parts.length}/${texts.length}`);
  return parts.map((part) => part.trim());
};

for (const [locale, target] of Object.entries(languageTargets)) {
  result[locale] = {};
  for (let index = 0; index < sources.length; index += 24) {
    const batch = sources.slice(index, index + 24);
    let translated;
    for (let attempt = 1; attempt <= 4; attempt += 1) {
      try {
        translated = await translateBatch(batch, target);
        break;
      } catch (error) {
        if (attempt === 4) throw error;
        await new Promise((resolve) => setTimeout(resolve, attempt * 1800));
      }
    }
    batch.forEach((source, offset) => { result[locale][source] = translated[offset]; });
    console.log(`${locale}: ${index + batch.length}/${sources.length}`);
    await new Promise((resolve) => setTimeout(resolve, 350));
  }
}

const output = `/* Generated local translations: no runtime translation service required. */\nwindow.TPC_I18N = ${JSON.stringify(result, null, 2)};\n`;
await fs.writeFile(path.join(root, 'i18n-data.js'), output, 'utf8');
console.log(`Generated ${sources.length} source strings for ${Object.keys(languageTargets).length} locales.`);
