// 인쇄용 PDF 만들기:  node grade2/tools/build-pdf.js
// grade2/print/ 에 활동지별 PDF, 정답 PDF, 전체 묶음 PDF를 만든다. (playwright 필요)
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
(async () => {
  const root = path.resolve(__dirname, '..'), out = path.join(root, 'print');
  fs.mkdirSync(out, { recursive: true });
  for (const f of fs.readdirSync(out)) if (f.endsWith('.pdf')) fs.unlinkSync(path.join(out, f));
  const b = await chromium.launch();
  const make = async (ans, hash, name) => {
    const pg = await b.newPage();
    await pg.goto('file://' + path.join(root, 'index.html') + (ans ? '?ans=1' : '') + '#' + encodeURIComponent(hash));
    await pg.evaluate(() => Promise.all([document.fonts.ready, ...[...document.images].map(im => im.complete ? 0 : new Promise(r => { im.onload = im.onerror = r; }))]));
    await pg.pdf({ path: path.join(out, name), preferCSSPageSize: true, printBackground: true });
    await pg.close();
  };
  const pg = await b.newPage();
  await pg.goto('file://' + path.join(root, 'index.html'));
  const list = await pg.evaluate(() => G2.SHEETS.map(s => ({ id: s.id, answers: s.answers, name: G2.pdfName(s), ans: G2.pdfName(s, true) })));
  await pg.close();
  for (const s of list) { await make(false, s.id, s.name); if (s.answers) await make(true, s.id, s.ans); }
  await make(false, 'all', '전체 활동지 묶음.pdf');
  await make(true, 'all', '전체 정답 묶음.pdf');
  await b.close();
  console.log('PDF', fs.readdirSync(out).length, '개');
})();
