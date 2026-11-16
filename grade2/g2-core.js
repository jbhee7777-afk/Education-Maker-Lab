/* 2학년 2학기 복습 활동지 — 공통 도구 */
(function () {
  const G = window.G2 = { SHEETS: [] };
  G.SUBJ = {
    kor: { name: '국어', mas: 'fox', note: '1~4단원 · 읽고, 상상하고, 마음을 전해요' },
    math: { name: '수학', mas: 'owl', note: '1~3단원 · 네 자리 수, 곱셈구구, 길이 재기' },
    tong: { name: '통합', mas: 'bunny', note: '계절 · 인물' },
    cre: { name: '창체·범교과', mas: 'teddy', note: '영상 20분 + 활동지 20분' },
  };
  G.rng = (seed) => { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
  G.shuffle = (arr, r) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  G.pick = (arr, r) => arr[Math.floor(r() * arr.length)];
  G.range = (n, f = i => i) => Array.from({ length: n }, (_, i) => f(i));
  G.reg = (o) => { o.answers = o.answers !== false; G.SHEETS.push(o); };
  G.find = (id) => G.SHEETS.find(s => s.id === id);
  G.pdfName = (s, ans) => `[${G.SUBJ[s.subj].name}${s.unitShort ? ' ' + s.unitShort : ''}] ${s.title.replace(/[\\/:*?"<>|]/g, '')}${ans ? ' (정답)' : ''}.pdf`;
  G.img = (n) => `../assets/img/l/${n}.png`;

  /* 한 쪽 */
  G.page = (s, o) => `<section class="page ${s.subj}">
    <header class="ph"><img class="mas" src="${G.img(o.mas || G.SUBJ[s.subj].mas)}" alt="">
      <div class="tt"><span class="un">${G.SUBJ[s.subj].name}${s.unit ? ' · ' + s.unit : ''}</span><span class="side">${o.side}</span><h1>${o.title || s.title}</h1><p>${o.sub || ''}</p></div>
      <div class="nm">2학년 <i></i>반 <i></i>번<br>이름 <i class="w"></i></div></header>
    <div class="bar"></div>
    <div class="pb">${o.body}</div>
    ${o.tip ? `<div class="tip"><b>선생님께</b>${o.tip}</div>` : ''}
    <footer class="pf"><span>2학년 2학기 복습 활동지 · ${s.title}</span><span>${o.side}${o.min ? ' · 약 ' + o.min + '분' : ''}</span></footer></section>`;
  /* 활동 블록 */
  G.act = (n, title, min, html, grow) => `<div class="act ${grow ? 'grow' : ''}"><div class="ah"><b>${n}</b><span>${title}</span>${min ? `<em>${min}분</em>` : ''}</div><div class="ab">${html}</div></div>`;
  G.svg = (w, h, inner, extra = '') => `<svg class="sv" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" ${extra}>${inner}</svg>`;
  G.txt = (x, y, s, size = 5, o = {}) => `<text x="${x}" y="${y}" font-size="${size}" text-anchor="${o.a || 'middle'}" fill="${o.fill || '#26252c'}" class="${o.cls || ''}" dominant-baseline="central">${s}</text>`;
  G.lines = (n, grow) => `<div class="lines ${grow ? 'grow' : ''}" style="${grow ? '' : `height:${n * 11}mm`}"></div>`;
  G.draw = (label, style = '') => `<div class="draw" style="${style}"><small>${label || ''}</small></div>`;
  /* 답 칸: 정답 보기일 때만 빨간 글씨 */
  G.mk = (ans) => ({
    bl: (a, w = 14) => `<span class="bl" style="min-width:${w}mm">${ans ? a : ''}</span>`,
    ul: (a, w = 24) => `<span class="ul" style="min-width:${w}mm">${ans ? a : ''}</span>`,
    a: (t) => ans ? `<span class="ans">${t}</span>` : '',
    ox: (v) => `<span class="ox"><i class="${ans && v ? 'on' : ''}">○</i><i class="${ans && !v ? 'on' : ''}">×</i></span>`,
    on: (v) => ans && v ? 'on' : '',
  });
  G.q = (n, html) => `<div class="q"><b>${n}</b><div>${html}</div></div>`;
  G.itm = (ic, label, a, style = '') => `<div class="itm" style="${style}">${ic ? `<span class="ic">${ic}</span>` : ''}${label}${a ? `<span class="a">${a}</span>` : ''}</div>`;

  /* 낱말 찾기: 가로(→)·세로(↓)로 숨김 */
  const FILL = '가나다라마바사아자차카타파하고노도로모보소오조초구누두루무부수우주추기니디리미비시이지치강산들물빛별솔밤콩'.split('');
  G.wordsearch = (words, n, r, ans) => {
    const g = G.range(n, () => Array(n).fill('')), hit = G.range(n, () => Array(n).fill(0));
    words.slice().sort((a, b) => b.length - a.length).forEach((w, wi) => {
      for (let t = 0; t < 400; t++) {
        const d = r() < .5, x = Math.floor(r() * (d ? n - w.length + 1 : n)), y = Math.floor(r() * (d ? n : n - w.length + 1));
        let ok = true; for (let i = 0; i < w.length; i++) { const c = g[y + (d ? 0 : i)][x + (d ? i : 0)]; if (c && c !== w[i]) ok = false; }
        if (!ok) continue;
        for (let i = 0; i < w.length; i++) { g[y + (d ? 0 : i)][x + (d ? i : 0)] = w[i]; hit[y + (d ? 0 : i)][x + (d ? i : 0)] = 1; }
        return;
      }
    });
    const used = new Set(words.join(''));
    const pool = FILL.filter(c => !used.has(c));
    const c = 12;
    return G.svg(n * c + 2, n * c + 2, g.map((row, y) => row.map((ch, x) => `<rect x="${1 + x * c}" y="${1 + y * c}" width="${c}" height="${c}" fill="${ans && hit[y][x] ? '#ffd8d8' : '#fff'}" stroke="#555" stroke-width=".35"/>${G.txt(1 + x * c + c / 2, 1 + y * c + c / 2 + .3, ch || G.pick(pool, r), 6.6)}`).join('')).join('') + `<rect x="1" y="1" width="${n * c}" height="${n * c}" rx="2" fill="none" stroke="#333" stroke-width="1"/>`);
  };

  /* 곱셈 미로: n단의 수만 따라가는 한 줄 길 */
  G.multMaze = (n, cols, rows, r, ans) => {
    let path;
    for (let t = 0; t < 3000 && !path; t++) {
      const seen = new Set(['0,0']), p = [[0, 0]];
      while (true) {
        const [x, y] = p[p.length - 1];
        if (x === cols - 1 && y === rows - 1) { if (p.length >= cols + rows + 3) path = p; break; }
        const opts = [[1, 0], [0, 1], [-1, 0], [0, -1]].map(([dx, dy]) => [x + dx, y + dy]).filter(([a, b]) => a >= 0 && b >= 0 && a < cols && b < rows && !seen.has(a + ',' + b)
          && [[1, 0], [0, 1], [-1, 0], [0, -1]].every(([dx, dy]) => (a + dx === x && b + dy === y) || !seen.has((a + dx) + ',' + (b + dy))));
        if (!opts.length) break;
        const nx = G.pick(opts, r); seen.add(nx[0] + ',' + nx[1]); p.push(nx);
      }
    }
    const on = new Set(path.map(p => p.join(',')));
    const c = 16; let s = '';
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      let v; if (on.has(x + ',' + y)) v = n * (1 + Math.floor(r() * 9)); else { do { v = 2 + Math.floor(r() * (n * 9 - 1)); } while (v % n === 0); }
      s += `<rect x="${1 + x * c}" y="${1 + y * c}" width="${c}" height="${c}" rx="3" fill="${ans && on.has(x + ',' + y) ? '#ffd8d8' : '#fff'}" stroke="#555" stroke-width=".5"/>${G.txt(1 + x * c + c / 2, 1 + y * c + c / 2 + .4, v, 7.2)}`;
    }
    return G.svg(cols * c + 2, rows * c + 2, s);
  };

  /* 색칠 모자이크: pat 글자마다 색, cell(ch) 가 칸에 쓸 문제 */
  G.mosaic = (pat, colors, cell, ans, c = 14, fs = 5) => {
    const rows = pat.length, cols = pat[0].length; let s = '';
    pat.forEach((row, y) => [...row].forEach((ch, x) => {
      s += `<rect x="${1 + x * c}" y="${1 + y * c}" width="${c}" height="${c}" fill="${ans && colors[ch] ? colors[ch][1] : '#fff'}" stroke="#666" stroke-width=".35"/>${G.txt(1 + x * c + c / 2, 1 + y * c + c / 2 + .3, cell(ch, x, y), fs)}`;
    }));
    return G.svg(cols * c + 2, rows * c + 2, s + `<rect x="1" y="1" width="${cols * c}" height="${rows * c}" fill="none" stroke="#333" stroke-width="1"/>`);
  };
  G.legend = (list) => `<div class="chips">${list.map(([t, name, col]) => `<span class="chip" style="gap:1.5mm"><i style="width:5mm;height:5mm;border-radius:50%;background:${col};border:.3mm solid #555;display:inline-block"></i>${t} → ${name}</span>`).join('')}</div>`;

  /* 연필·클립 돌림판 */
  G.spinner = (labels, size = 34) => {
    const n = labels.length, R = 46; let s = '';
    for (let i = 0; i < n; i++) {
      const a0 = (i / n) * 2 * Math.PI - Math.PI / 2, a1 = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2, am = (a0 + a1) / 2;
      s += `<path d="M50 50 L${(50 + R * Math.cos(a0)).toFixed(1)} ${(50 + R * Math.sin(a0)).toFixed(1)} A${R} ${R} 0 0 1 ${(50 + R * Math.cos(a1)).toFixed(1)} ${(50 + R * Math.sin(a1)).toFixed(1)}Z" fill="${i % 2 ? '#fff' : '#f1f3f5'}" stroke="#444" stroke-width="1"/>${G.txt((50 + R * .66 * Math.cos(am)).toFixed(1), (50 + R * .66 * Math.sin(am)).toFixed(1), labels[i], 13)}`;
    }
    return `<div style="flex:none;width:${size}mm;text-align:center;font-size:8pt;line-height:1.25;color:#666">${G.svg(100, 100, s + '<circle cx="50" cy="50" r="3" fill="#444"/>', `style="width:${size}mm;height:${size}mm;display:block"`)}클립을 연필 끝에 걸고<br>손가락으로 톡!</div>`;
  };

  /* 말판: 뱀처럼 이어지는 길 */
  G.board = (cells, cols) => {
    const rows = Math.ceil(cells.length / cols); let h = '';
    cells.forEach((t, i) => {
      const rr = Math.floor(i / cols), cc = rr % 2 ? cols - 1 - (i % cols) : i % cols;
      const cls = i === 0 || i === cells.length - 1 ? 'se' : (/^[★♥◆]/.test(t) ? 'sp' : '');
      h += `<div class="c ${cls}" style="grid-row:${rr + 1};grid-column:${cc + 1}">${cls === 'se' ? '' : `<i>${i}</i>`}${t}</div>`;
    });
    return `<div class="board" style="grid-template-columns:repeat(${cols},1fr);grid-template-rows:repeat(${rows},1fr)">${h}</div>`;
  };

  /* 선으로 잇기: 왼쪽·오른쪽 낱말 + 점 */
  G.match = (left, right, order, ans, o = {}) => {
    const n = left.length, rh = o.rh || 13, W = 186, lw = o.lw || 62, rw = o.rw || 78, H = n * rh; let s = '';
    for (let i = 0; i < n; i++) {
      const y = i * rh + rh / 2;
      s += `<rect x="0" y="${y - rh / 2 + 1}" width="${lw}" height="${rh - 2}" rx="3" fill="#fff" stroke="#555" stroke-width=".45"/>${G.txt(lw / 2, y + .3, left[i], o.fs || 5.2)}<circle cx="${lw + 4}" cy="${y}" r="1.3" fill="#333"/>`;
      s += `<rect x="${W - rw}" y="${y - rh / 2 + 1}" width="${rw}" height="${rh - 2}" rx="3" fill="#fff" stroke="#555" stroke-width=".45"/>${G.txt(W - rw / 2, y + .3, right[order[i]], o.fs2 || o.fs || 4.6)}<circle cx="${W - rw - 4}" cy="${y}" r="1.3" fill="#333"/>`;
      if (ans) s += `<line x1="${lw + 4}" y1="${order.indexOf(i) >= 0 ? i * rh + rh / 2 : y}" x2="${W - rw - 4}" y2="${order.indexOf(i) * rh + rh / 2}" stroke="#e03131" stroke-width=".8"/>`;
    }
    return G.svg(W, H, s, `style="flex:none;height:${H}mm"`);
  };
  /* 꾸밈 테두리 (색칠용) */
  G.frame = (w, h, kind = 'leaf') => {
    let s = `<rect x="2" y="2" width="${w - 4}" height="${h - 4}" rx="6" fill="none" stroke="#444" stroke-width="1"/><rect x="9" y="9" width="${w - 18}" height="${h - 18}" rx="4" fill="none" stroke="#444" stroke-width=".6"/>`;
    const shape = (x, y, i) => kind === 'star'
      ? `<path transform="translate(${x} ${y}) scale(.34)" d="M0-9 L2.6-2.8 9-2.8 3.8 1.4 5.8 8 0 4 -5.8 8 -3.8 1.4 -9-2.8 -2.6-2.8Z" fill="#fff" stroke="#444" stroke-width="2"/>`
      : kind === 'heart' ? `<path transform="translate(${x} ${y}) scale(.3)" d="M0 8 C-14-2 -8-12 0-5 C8-12 14-2 0 8Z" fill="#fff" stroke="#444" stroke-width="2.4"/>`
        : `<path transform="translate(${x} ${y}) rotate(${i * 47}) scale(.3)" d="M0-10 C8-6 8 6 0 10 C-8 6 -8-6 0-10Z M0-10 L0 10" fill="#fff" stroke="#444" stroke-width="2.4"/>`;
    let i = 0;
    for (let x = 14; x <= w - 14; x += 12) { s += shape(x, 5.5, i++) + shape(x, h - 5.5, i++); }
    for (let y = 16; y <= h - 16; y += 12) { s += shape(5.5, y, i++) + shape(w - 5.5, y, i++); }
    return s;
  };
})();
