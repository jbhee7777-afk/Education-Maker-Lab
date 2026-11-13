/* 활동지 공통 도우미 */
(function () {
  const S = window.SHEETS = [];
  const { art, artG, NAMES } = XArt;
  const H = window.SH = {};
  H.CAT = { color: '컬러링', make: '만들기', play: '놀이·퍼즐', write: '글쓰기·마음 나눔', song: '노래' };
  H.reg = (o) => { o.type = 'sheet'; o.url = 'sheet.html#' + o.id; S.push(o); };
  H.pdfName = (s, ans) => `[${s.grades.length === 3 ? '전학년' : s.grades.map(g => XK.GRADES[g]).join('·')}] ${s.title.replace(/[\\/:*?"<>|]/g, '')}${ans ? ' (정답)' : ''}.pdf`;
  H.gname = (gs) => gs.length === 3 ? '전 학년' : gs.map(g => XK.GRADES[g]).join('·');
  /* 한 쪽 만들기 */
  H.page = (s, o) => `<section class="page ${o.land ? 'land' : ''}">
    <header class="ph"><div class="ic">${art(o.icon || s.icon || 'star')}</div><div class="tt"><h1>${o.title || s.title}</h1><p>${o.sub || ''}</p></div>
    ${o.noname ? '' : '<div class="nm"><i></i>학년 <i></i>반<br>이름 <i class="w"></i></div>'}</header>
    <div class="stripe"></div>
    <div class="pb">${o.body}</div>
    ${o.tip ? `<div class="tip"><b>${o.tipLabel || '도움말'}</b>${o.tip}</div>` : ''}
    <footer class="pf"><span>크리스마스 활동 키트</span><span>${H.gname(s.grades)} · ${H.CAT[s.cat] || ''}</span></footer></section>`;
  H.svg = (w, h, inner, extra = '') => `<svg class="sv" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" ${extra}>${inner}</svg>`;
  H.txt = (x, y, s, size = 5, o = {}) => `<text x="${x}" y="${y}" font-size="${size}" text-anchor="${o.a || 'middle'}" fill="${o.fill || '#2b2320'}" ${o.rot ? `transform="rotate(${o.rot} ${x} ${y})"` : ''} ${o.extra || ''} dominant-baseline="${o.base || 'central'}">${s}</text>`;
  H.flakes = (r, w, h, n = 14) => XK.range(n, () => { const x = r() * w, y = r() * h, q = 1 + r() * 1.6; return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${q.toFixed(1)}" fill="#fff" stroke="#432" stroke-width=".5"/>`; }).join('');
  H.shadow = (name, size) => art(name, { size, shadow: true });
  H.shadowG = (name, x, y, size) => artG(name, x, y, size, { shadow: true });
  H.full = (file, h) => `<div style="flex:1;min-height:0;display:flex;align-items:center;justify-content:center"><img src="${XArt.page(file)}" alt="" style="max-width:100%;max-height:${h ? h + 'mm' : '100%'};width:auto;height:auto;object-fit:contain"></div>`;
  H.ICONS = NAMES; H.CORE = XArt.CORE;
  H.lines = (n) => `<div class="lines" style="flex:none;height:${n * 10}mm"></div>`;
  H.steps = (list, cls = '') => `<div class="steps ${cls}">${list.map((s, i) => `<div class="st">${s[0] || ''}<p><b>${i + 1}</b>${s[1]}</p></div>`).join('')}</div>`;
})();
