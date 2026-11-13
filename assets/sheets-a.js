/* 활동지 A: 컬러링 · 퍼즐 · 놀이판 */
(function () {
  const { reg, page, svg, txt, flakes, shadowG, ICONS, lines } = SH;
  const { art, artG, label, starPts } = XArt;
  const { range, shuffle, pick } = XK;
  const G3 = ['low', 'mid', 'high'], GN = { low: '저학년', mid: '중학년', high: '고학년' };
  const f1 = (n) => (+n).toFixed(1);

  /* ───────── 컬러링 ───────── */
  reg({
    id: 'coloring-low', title: '크리스마스 친구들 컬러링', cat: 'color', grades: ['low'], icon: 'santa',
    desc: '큼직한 캐릭터 8종을 색칠하고 이름도 따라 써요.',
    gen() {
      return ['santa', 'rudolph', 'snowman', 'tree', 'ginger', 'penguin', 'elf', 'gift'].map((n, i) => {
        const r = XK.rng(i + 7), others = shuffle(ICONS.filter(x => x !== n), r);
        const body = svg(186, 232, `${flakes(r, 186, 170, 18)}
          <path d="M0 186 Q50 172 96 184 T186 178 L186 232 L0 232Z" fill="#fff" stroke="#432" stroke-width="1"/>
          ${artG(n, 20, 14, 146, { line: true, sw: 2.6 })}
          ${artG(others[0], 4, 150, 34, { line: true, sw: 4, rot: -10 })}${artG(others[1], 148, 148, 34, { line: true, sw: 4, rot: 10 })}
          <text x="93" y="212" font-size="26" text-anchor="middle" fill="none" stroke="#777" stroke-width=".55" stroke-dasharray="1.6 1.1">${label(n)}</text>`);
        return page(this, { icon: n, title: `${label(n)} 색칠하기`, sub: '좋아하는 색으로 칠하고, 아래 글자를 따라 써 보세요.', body });
      });
    }
  });

  reg({
    id: 'coloring-scene', title: '크리스마스 장면 컬러링', cat: 'color', grades: G3, icon: 'tree',
    desc: '한 장 가득 그려진 크리스마스 장면 5종. 쉬운 그림(저학년)부터 섬세한 그림(고학년)까지.',
    gen() {
      return [['snowman', '눈사람과 친구들', '저학년', '큰 칸이 많아 크레파스로 칠하기 좋아요.'], ['gingerhouse', '과자 집 마을', '저·중학년', '사탕과 아이싱 무늬를 알록달록하게!'], ['sleigh', '산타의 밤하늘 비행', '중학년', '밤하늘은 진한 색, 창문은 밝은 노랑으로 칠하면 불빛이 반짝여요.'], ['livingroom', '크리스마스이브 거실', '중·고학년', '벽난로 불빛이 닿는 곳은 밝게, 먼 곳은 어둡게 칠해 보세요.'], ['elves', '엘프들의 장난감 공장', '고학년', '색연필로 섬세하게! 엘프마다 다른 옷 색을 정해 보세요.']]
        .map(([f, t, g, tip]) => page(this, { title: t, sub: `${g} 추천 · ${tip}`, body: SH.full(f + '.png') }));
    }
  });

  reg({
    id: 'mandala', title: '크리스마스 만다라 컬러링', cat: 'color', grades: ['mid', 'high'], icon: 'snowflake',
    desc: '사탕·종·오너먼트와 순록·눈꽃이 어우러진 만다라 2종. 집중·차분 활동에 좋아요.',
    gen() {
      return [['mandala', '사탕과 종 만다라'], ['mandala2', '순록과 눈꽃 만다라']].map(([f, t]) => page(this, { title: t, sub: '안쪽에서 바깥쪽으로, 같은 모양은 같은 색으로 칠하면 더 멋져요.', body: SH.full(f + '.png'), tip: '캐럴을 잔잔하게 틀어 두고 10분 「조용한 색칠 시간」으로 운영해 보세요. 완성작은 오려서 창문에 붙이면 눈꽃 전시가 됩니다.' }));
    }
  });

  /* 픽셀 그림 */
  const PX = {
    tree: ['.......YY.......', '.......YY.......', '.......GG.......', '......GGGG......', '......GRGG......', '.....GGGGGG.....', '.....GGGYGG.....', '....GGGGGGGG....', '....GRGGGGGG....', '...GGGGGGLGGG...', '...GGYGGGGGGG...', '..GGGGGGGRGGG...', '..GGGLGGGGGGGG..', '.GGGGGGGGGGGGGG.', '.......BB.......', '.......BB.......'],
    gift: ['................', '....YY....YY....', '...YYYY..YYYY...', '...YY.YYYY.YY...', '....YYYYYYYY....', '..RRRRRYYRRRRR..', '..RRRRRYYRRRRR..', '..YYYYYYYYYYYY..', '...RRRRYYRRRR...', '...RRRRYYRRRR...', '...RRRRYYRRRR...', '...RRRRYYRRRR...', '...RRRRYYRRRR...', '...RRRRYYRRRR...', '...RRRRYYRRRR...', '................'],
    santa: ['................', '......RRRR......', '.....RRRRRR.WW..', '....RRRRRRRRWW..', '....RRRRRRRR....', '...WWWWWWWWWW...', '...WWWWWWWWWW...', '...SSSSSSSSSS...', '...SKSSSSSSKS...', '...SSSSRRSSSS...', '...WWWWWWWWWW...', '...WWWWWWWWWW...', '....WWWWWWWW....', '.....WWWWWW.....', '......WWWW......', '................'],
    rudolph: ['..B..B....B..B..', '..B..B....B..B..', '..BBBB....BBBB..', '....B......B....', '....BBBBBBBB....', '...BBBBBBBBBB...', '..BBBBBBBBBBBB..', '..BBWKBBBBWKBB..', '..BBKKBBBBKKBB..', '..BBBBBBBBBBBB..', '...BBBSSSSBBB...', '...BBSSRRSSBB...', '....BSSRRSSB....', '....BSSSSSSB....', '.....BBBBBB.....', '................'],
  };
  const PC = { '.': ['하늘색', '#cfe8fb'], G: ['초록색', '#35b36a'], R: ['빨간색', '#e53935'], Y: ['노란색', '#ffd54f'], B: ['갈색', '#a8683f'], W: ['흰색(그대로)', '#ffffff'], K: ['검은색', '#333333'], S: ['살구색', '#ffd9b8'], L: ['파란색', '#42a5f5'] };
  const pxGrid = (rows, cell, cellText, ans, x0 = 0, y0 = 0) => {
    let s = '';
    rows.forEach((row, y) => [...row.padEnd(16, '.')].slice(0, 16).forEach((ch, x) => {
      s += `<rect x="${x0 + x * cell}" y="${y0 + y * cell}" width="${cell}" height="${cell}" fill="${ans ? PC[ch][1] : '#fff'}" stroke="#8a7a70" stroke-width=".3"/>`;
      const t = cellText(ch, x, y); if (t && !ans) s += txt(x0 + x * cell + cell / 2, y0 + y * cell + cell / 2, t, t.length > 3 ? 2.9 : t.length > 2 ? 3.4 : 4.4, { fill: '#555' });
    }));
    return s + `<rect x="${x0}" y="${y0}" width="${cell * 16}" height="${cell * 16}" fill="none" stroke="#432" stroke-width=".9"/>`;
  };
  const pxKey = (used, labelOf) => `<div class="cards" style="grid-template-columns:repeat(4,1fr);flex:none">${used.map(ch => `<div style="display:flex;align-items:center;gap:2mm;font-size:10pt"><span style="width:7mm;height:7mm;border:.4mm solid #432;border-radius:1.5mm;background:${PC[ch][1]};flex:none"></span><span><b style="font-family:var(--f-display);font-weight:400">${labelOf(ch)}</b> → ${PC[ch][0]}</span></div>`).join('')}</div>`;
  const pxSheet = (g) => reg({
    id: 'pixel-' + g, title: { low: '숫자 픽셀 컬러링', mid: '곱셈 픽셀 컬러링', high: '코딩 픽셀 아트' }[g], cat: g === 'high' ? 'stem' : 'color', grades: [g], icon: 'gift', answers: true, random: g === 'mid',
    desc: { low: '숫자에 맞는 색을 칠하면 숨은 그림이 나타나요.', mid: '곱셈을 풀고 답에 맞는 색을 칠하면 그림 완성! 문제는 매번 바뀌어요.', high: '「하3 초2…」 같은 줄 코드를 읽고 칸을 칠하는 언플러그드 코딩.' }[g],
    gen(c) {
      const designs = { low: ['tree', 'gift'], mid: ['santa', 'rudolph'], high: ['tree', 'santa', 'rudolph'] }[g];
      return designs.map((d, di) => {
        const rows = PX[d], used = [...new Set(rows.join(''))], r = XK.rng(c.seed + di * 99);
        if (g === 'low') {
          const num = {}; used.forEach((ch, i) => num[ch] = String(i + 1));
          return page(this, { sub: '칸 안의 숫자를 보고 약속한 색으로 칠해요. 어떤 그림이 숨어 있을까요?', body: pxKey(used, ch => num[ch]) + svg(186, 186, pxGrid(rows, 11.5, ch => num[ch], c.ans, 1, 1)) });
        }
        if (g === 'mid') {
          const pool = shuffle([12, 16, 18, 24, 27, 28, 32, 35, 36, 42, 45, 48, 54, 56, 63, 72], r), ansOf = {}; used.forEach((ch, i) => ansOf[ch] = [pool[i * 2], pool[i * 2 + 1]]);
          const expr = (v) => { const fs = []; for (let a = 2; a <= 9; a++) if (v % a === 0 && v / a >= 2 && v / a <= 9) fs.push(`${a}×${v / a}`); return pick(fs, r); };
          return page(this, { sub: '곱셈의 답을 구하고, 답에 맞는 색으로 칠해요.', body: pxKey(used, ch => ansOf[ch].sort((a, b) => a - b).join(', ')) + svg(186, 186, pxGrid(rows, 11.5, ch => expr(pick(ansOf[ch], r)), c.ans, 1, 1)) });
        }
        const code = { '.': '하', G: '초', R: '빨', Y: '노', B: '갈', W: '흰', K: '검', S: '살', L: '파' };
        const rl = rows.map(row => { const out = []; [...row].forEach(ch => { const l = out[out.length - 1]; if (l && l[0] === ch) l[1]++; else out.push([ch, 1]); }); return out.map(([ch, n]) => code[ch] + n).join(' '); });
        const body = pxKey(used, ch => code[ch]) + svg(186, 190, pxGrid(rows, 6.4, () => '', c.ans, 0, 12) + range(16, i => txt(i * 6.4 + 3.2, 7, i + 1, 3.4, { fill: '#888' })).join('') +
          rl.map((t, y) => txt(106, 12 + y * 6.4 + 3.2, `${String(y + 1).padStart(2, ' ')}줄  ${t}`, 3.7, { a: 'start' })).join('') +
          txt(0, 126, '줄 코드 읽는 법: 「하3 초2 하3」 = 왼쪽부터 하늘색 3칸, 초록색 2칸, 하늘색 3칸', 4.2, { a: 'start', fill: '#1c6146' }) +
          txt(0, 136, '도전! 아래 빈 격자에 내 그림을 그리고, 친구가 풀 수 있게 줄 코드를 써 보세요.', 4.2, { a: 'start', fill: '#1c6146' }) +
          range(8, y => range(8, x => `<rect x="${x * 6}" y="${141 + y * 6}" width="6" height="6" fill="#fff" stroke="#8a7a70" stroke-width=".3"/>`).join('') + `<path d="M54 ${146.5 + y * 6} H186" stroke="#bfb1a5" stroke-width=".3"/>`).join(''));
        return page(this, { title: `코딩 픽셀 아트 ${di + 1}`, sub: '컴퓨터는 그림을 「색 + 칸 수」 코드로 기억해요(런 길이 압축). 코드를 읽고 칠해 보세요.', body });
      });
    }
  });
  G3.forEach(pxSheet);

  /* 대칭 그리기 */
  const SYM = [
    ['트리', [[10, 2], [8, 6], [9, 6], [6, 11], [8, 11], [4, 17], [9, 17], [9, 20], [10, 20]]],
    ['별과 선물', [[10, 1], [8.5, 4], [5, 4.5], [7.5, 7], [7, 10.5], [10, 9], [10, 12], [4, 12], [4, 15], [5, 15], [5, 20], [10, 20]]],
    ['눈꽃 결정', [[10, 1], [9, 3], [7, 2], [8, 5], [9, 5], [9, 8], [5, 5], [5, 3], [3, 4], [4, 6], [2, 7], [4, 8], [7, 9.5], [3, 11], [7, 12.5], [4, 14], [2, 15], [4, 16], [3, 18], [5, 19], [5, 17], [9, 14], [9, 17], [8, 17], [7, 20], [9, 19], [10, 21]]],
  ];
  reg({
    id: 'symmetry', title: '반쪽 그림 대칭 완성', cat: 'color', grades: ['mid', 'high'], icon: 'star', answers: true,
    desc: '대칭축을 기준으로 반쪽을 그려 트리·별·눈꽃을 완성해요. (수학 「선대칭」 연계)',
    gen(c) {
      return SYM.map(([nm, pts], i) => {
        const u = 8.8, ox = 5, oy = 4; let s = '';
        for (let x = 0; x <= 20; x++) s += `<path d="M${ox + x * u} ${oy} V${oy + 22 * u}" stroke="#cdbfb2" stroke-width=".25"/>`;
        for (let y = 0; y <= 22; y++) s += `<path d="M${ox} ${oy + y * u} H${ox + 20 * u}" stroke="#cdbfb2" stroke-width=".25"/>`;
        const P = (a) => a.map(([x, y]) => `${f1(ox + x * u)},${f1(oy + y * u)}`).join(' ');
        s += `<path d="M${ox + 10 * u} ${oy - 3} V${oy + 22 * u + 3}" stroke="#d93a3a" stroke-width=".8" stroke-dasharray="3 2"/><polyline points="${P(pts)}" fill="none" stroke="#432" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round"/>`;
        if (c.ans) s += `<polyline points="${P(pts.map(([x, y]) => [20 - x, y]))}" fill="none" stroke="#d93a3a" stroke-width="1.1" stroke-linejoin="round"/>`;
        return page(this, { title: `반쪽 그림 대칭 완성 ${i + 1}: ${nm}`, sub: '빨간 점선이 대칭축이에요. 꼭짓점의 칸 수를 세어 반대쪽에 점을 찍고 자로 이어요. 완성하면 색칠!', body: svg(186, 202, s) });
      });
    }
  });

  reg({
    id: 'sweater', title: '못난이 스웨터 디자인 대회', cat: 'color', grades: G3, icon: 'mitten',
    desc: '세상에서 가장 요란한 크리스마스 스웨터를 디자인해요. 해외 교실의 인기 활동 「Ugly Sweater Day」!',
    gen() {
      const body = SH.full('sweater.png', 150) +
        `<div class="q">무늬 아이디어 — 따라 그리거나 나만의 무늬를 만들어요</div><div style="display:flex;justify-content:space-between;flex:none">${['tree', 'snowflake', 'rudolph', 'star', 'cane', 'holly', 'bell', 'gift', 'poinsettia'].map(n => art(n, { line: true, size: 66 })).join('')}</div>
        <div class="q">내 스웨터의 이름: <span style="display:inline-block;border-bottom:.4mm solid #432;width:110mm"></span></div>`;
      return [page(this, { sub: '줄무늬, 지그재그, 방울, 반짝이… 화려할수록 좋아요! 가로줄로 나뉜 칸마다 다른 무늬를 넣어 보세요.', body, tip: '완성 후 「가장 요란한 상」, 「가장 따뜻해 보이는 상」 등을 투표로 뽑아 보세요. 색종이·솜·스팽글을 붙이면 더 재미있어요.' })];
    }
  });

  reg({
    id: 'zentangle', title: '젠탱글 오너먼트', cat: 'color', grades: ['high'], icon: 'ornament',
    desc: '칸마다 다른 반복 무늬를 채워 넣는 집중 드로잉. 무늬 견본 포함.',
    gen() {
      const pats = [
        (x, y) => range(7, i => `<path d="M${x} ${y + 3 + i * 3.4} h26"/>`).join(''),
        (x, y) => range(5, i => `<path d="M${x} ${y + 4 + i * 5} l3.25 -3 l3.25 3 l3.25 -3 l3.25 3 l3.25 -3 l3.25 3 l3.25 -3 l3.25 3"/>`).join(''),
        (x, y) => range(4, j => range(4, i => `<circle cx="${x + 3.5 + i * 6.3}" cy="${y + 3.5 + j * 6.3}" r="2"/>`).join('')).join(''),
        (x, y) => range(4, j => range(5, i => `<path d="M${x + i * 6.5 - (j % 2 ? 3.25 : 0)} ${y + 6.5 + j * 6.5} a3.25 3.25 0 0 1 6.5 0"/>`).join('')).join(''),
        (x, y) => range(5, i => `<path d="M${x + 4 + i * 4.6} ${y} v26 M${x} ${y + 4 + i * 4.6} h26"/>`).join(''),
        (x, y) => range(3, j => range(3, i => `<path d="M${x + 4.3 + i * 8.7} ${y + 1 + j * 8.7} l3.5 3.5 l-3.5 3.5 l-3.5 -3.5Z"/>`).join('')).join(''),
        (x, y) => range(4, i => `<path d="M${x} ${y + 3 + i * 6.5} q3.25 4 6.5 0 t6.5 0 t6.5 0 t6.5 0"/>`).join(''),
      ];
      let s = pats.map((f, i) => `<clipPath id="zp${i}"><rect x="${i * 26.5}" y="0" width="24" height="24" rx="2"/></clipPath><g clip-path="url(#zp${i})" fill="none" stroke="#432" stroke-width=".6">${f(i * 26.5 - 1, -1)}</g><rect x="${i * 26.5}" y="0" width="24" height="24" rx="2" fill="none" stroke="#432" stroke-width=".8"/>`).join('');
      const body = `<div class="q">무늬 견본</div>` + svg(186, 25, s, 'style="flex:none;height:26mm"') + SH.full('zentangle.png');
      return [page(this, { sub: '오너먼트의 칸마다 서로 다른 무늬를 채워요. 검은 펜 한 자루면 충분! 선은 천천히, 촘촘하게.', body, tip: '「잘못 그린 선은 없다」가 젠탱글의 규칙이에요. 완성 후 오려서 끈을 달면 교실 트리 장식이 됩니다.' })];
    }
  });

  reg({
    id: 'agamograph', title: '두 얼굴 그림 (아가모그래프)', cat: 'make', grades: ['mid', 'high'], icon: 'rudolph', paper: '도화지(두꺼운 종이)',
    desc: '왼쪽에서 보면 산타, 오른쪽에서 보면 루돌프! 병풍처럼 접으면 그림이 바뀌는 신기한 착시 작품.',
    gen() {
      return [['santa', 'rudolph'], ['tree', 'snowman']].map(([a, b], pi) => {
        const n = 8, sw = 11, W = n * sw, top = 4; let s = '';
        for (let j = 0; j < n * 2; j++) {
          const nm = j % 2 ? b : a, k = Math.floor(j / 2), x = 5 + j * sw;
          s += `<clipPath id="ag${pi}_${j}"><rect x="${x}" y="${top}" width="${sw}" height="112"/></clipPath><g clip-path="url(#ag${pi}_${j})">${artG(nm, x - k * sw, top + 12, W, { line: true, sw: 3.4 })}</g>`;
          s += txt(x + sw / 2, top + 108, j % 2 ? '나' : '가', 3.6, { fill: '#999' });
          if (j) s += `<path d="M${x} ${top} v112" stroke="#432" stroke-width=".35" stroke-dasharray="${j % 2 ? '1 1.2' : '3 1.5'}"/>`;
        }
        s += `<rect x="5" y="${top}" width="${W * 2}" height="112" fill="none" stroke="#432" stroke-width=".9"/>`;
        const zig = (x, y) => `<path d="M${x} ${y + 12} l8 -10 l8 10 l8 -10 l8 10 l8 -10 l8 10" fill="none" stroke="#432" stroke-width="1" stroke-linejoin="round"/>`;
        const body = svg(186, 120, s, 'style="flex:none;height:150mm"') + SH.steps([
          [svg(60, 26, `<rect x="6" y="4" width="48" height="18" fill="#fff" stroke="#432" stroke-width=".8"/>${range(7, i => `<path d="M${12 + i * 6} 4 v18" stroke="#432" stroke-width=".4" stroke-dasharray="1.5 1"/>`).join('')}`), '「가」 칸은 그림 하나, 「나」 칸은 다른 그림이에요. 먼저 색칠하고 바깥 테두리를 오려요.'],
          [svg(60, 26, zig(6, 6)), '세로 점선을 따라 산·골짜기로 번갈아 접어 병풍(아코디언) 모양을 만들어요.'],
          [svg(60, 26, `${zig(6, 6)}<path d="M4 4 l10 6 M56 4 l-10 6" stroke="#d93a3a" stroke-width="1"/>${txt(6, 23, '왼쪽', 3.6)}${txt(54, 23, '오른쪽', 3.6)}`), '도화지에 붙여 세우고 왼쪽·오른쪽에서 번갈아 보세요. 그림이 바뀌어요!'],
        ]);
        return page(this, { title: `두 얼굴 그림 ${pi + 1}: ${label(a)} ↔ ${label(b)}`, sub: '보는 방향에 따라 그림이 달라지는 「아가모그래프」. 두 그림을 서로 다른 색 계열로 칠하면 효과가 커요.', body, tip: '접은 선이 정확할수록 잘 보여요. 자를 대고 볼펜 뒤로 한 번 눌러 준 뒤 접으면 깔끔합니다.' });
      });
    }
  });

  /* 점 잇기 */
  const DOT = {
    star: XArt.starPts(93, 98, 84, 36).split(' ').map(p => p.split(',').map(Number)),
    tree: [[93, 8], [116, 48], [104, 48], [130, 92], [114, 92], [146, 142], [104, 142], [104, 170], [82, 170], [82, 142], [40, 142], [72, 92], [56, 92], [82, 48], [70, 48]],
    bell: [[93, 14], [112, 20], [126, 36], [132, 60], [134, 90], [140, 114], [154, 134], [160, 146], [112, 146], [108, 160], [93, 166], [78, 160], [74, 146], [26, 146], [32, 134], [46, 114], [52, 90], [54, 60], [60, 36], [74, 20]],
  };
  const dotSheet = (g) => reg({
    id: 'dots-' + g, title: g === 'low' ? '점 잇기 (1부터 차례로)' : '뛰어 세기 점 잇기', cat: 'play', grades: [g], icon: 'star',
    desc: g === 'low' ? '1부터 차례로 이으면 별·트리·종이 나타나요.' : '2씩, 5씩, 3씩 뛰어 세며 점을 이어요.',
    gen() {
      return ['star', 'tree', 'bell'].map((k, i) => {
        const base = DOT[k], sub = g === 'low' ? (k === 'star' ? 2 : 1) : (k === 'bell' ? 2 : 3), pts = [];
        base.forEach((p, j) => { const q = base[(j + 1) % base.length]; for (let t = 0; t < sub; t++) pts.push([p[0] + (q[0] - p[0]) * t / sub, p[1] + (q[1] - p[1]) * t / sub]); });
        const step = g === 'low' ? 1 : [2, 5, 3][i]; const cx = 93, cy = 95;
        const s = pts.map(([x, y], j) => { const d = Math.hypot(x - cx, y - cy) || 1, lx = x + (x - cx) / d * 5.5, ly = y + (y - cy) / d * 5.5; return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${j ? 1 : 1.6}" fill="${j ? '#432' : '#d93a3a'}"/>${txt(f1(lx), f1(ly), (j + 1) * step, 3.6)}`; }).join('');
        return page(this, { title: `${this.title} ${i + 1}`, sub: g === 'low' ? '빨간 점 1부터 시작! 숫자 순서대로 선을 긋고, 완성한 그림을 예쁘게 꾸며요.' : `${step}씩 뛰어 세기: ${step}, ${step * 2}, ${step * 3}… 순서대로 이어요. 마지막 점은 처음 점과 이어요.`, body: svg(186, 190, s) + `<div class="q">무엇이 나타났나요? <span style="display:inline-block;border-bottom:.4mm solid #432;width:60mm"></span></div>` });
      });
    }
  });
  dotSheet('low'); dotSheet('mid');

  /* ───────── 미로 ───────── */
  function maze(w, h, r) {
    const R = range(h, () => range(w, () => 1)), D = range(h, () => range(w, () => 1)), seen = range(h, () => range(w, () => 0));
    const st = [[0, 0]]; seen[0][0] = 1;
    while (st.length) {
      const [x, y] = st[st.length - 1];
      const nb = shuffle([[1, 0], [-1, 0], [0, 1], [0, -1]], r).filter(([dx, dy]) => { const a = x + dx, b = y + dy; return a >= 0 && b >= 0 && a < w && b < h && !seen[b][a]; });
      if (!nb.length) { st.pop(); continue; }
      const [dx, dy] = nb[0], a = x + dx, b = y + dy;
      if (dx === 1) R[y][x] = 0; if (dx === -1) R[y][a] = 0; if (dy === 1) D[y][x] = 0; if (dy === -1) D[b][x] = 0;
      seen[b][a] = 1; st.push([a, b]);
    }
    const prev = {}, q = [[0, 0]]; prev['0,0'] = null;
    while (q.length) {
      const [x, y] = q.shift(); if (x === w - 1 && y === h - 1) break;
      [[1, 0, () => !R[y][x]], [-1, 0, () => x > 0 && !R[y][x - 1]], [0, 1, () => !D[y][x]], [0, -1, () => y > 0 && !D[y - 1][x]]].forEach(([dx, dy, ok]) => { const a = x + dx, b = y + dy, k = a + ',' + b; if (a >= 0 && b >= 0 && a < w && b < h && ok() && !(k in prev)) { prev[k] = [x, y]; q.push([a, b]); } });
    }
    const path = []; let cur = [w - 1, h - 1]; while (cur) { path.push(cur); cur = prev[cur.join(',')]; }
    return { R, D, path };
  }
  const mazeSheet = (g) => reg({
    id: 'maze-' + g, title: '산타의 선물 배달 미로', cat: 'play', grades: [g], icon: 'santa', random: true, answers: true,
    desc: `${{ low: '넓은 길', mid: '조금 복잡한 길', high: '빽빽한 길' }[g]} 미로 2쪽. 누를 때마다 새 미로가 만들어져요.`,
    gen(c) {
      const [w, h] = { low: [8, 10], mid: [14, 17], high: [21, 26] }[g];
      return range(2, (p) => {
        const r = XK.rng(c.seed + p * 7 + w), m = maze(w, h, r), cs = 156 / w, ox = 15, oy = 3; let d = '';
        for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
          if (m.R[y][x] && !(x === w - 1 && y === h - 1)) d += `M${f1(ox + (x + 1) * cs)} ${f1(oy + y * cs)}v${f1(cs)}`;
          if (m.D[y][x]) d += `M${f1(ox + x * cs)} ${f1(oy + (y + 1) * cs)}h${f1(cs)}`;
        }
        d += `M${ox} ${oy}h${f1(w * cs)}M${ox} ${f1(oy + cs)}V${f1(oy + h * cs)}`;
        const isz = Math.min(15, cs * 1.4), ends = shuffle(['gift', 'tree', 'stocking'], r)[0];
        const s = `<path d="${d}" fill="none" stroke="#432" stroke-width="${g === 'high' ? .9 : 1.3}" stroke-linecap="round"/>` +
          (c.ans ? `<polyline points="${m.path.map(([x, y]) => `${f1(ox + (x + .5) * cs)},${f1(oy + (y + .5) * cs)}`).join(' ')}" fill="none" stroke="#d93a3a" stroke-width="1.2" stroke-linejoin="round"/>` : '') +
          artG(p ? 'rudolph' : 'santa', 0, oy + cs / 2 - isz / 2, isz) + artG(ends, 186 - isz, oy + (h - .5) * cs - isz / 2, isz);
        return page(this, { title: `${p ? '루돌프' : '산타'}의 선물 배달 미로`, icon: p ? 'rudolph' : 'santa', sub: `${p ? '루돌프' : '산타'}가 ${label(ends)}까지 갈 수 있게 길을 찾아 주세요. 벽을 넘으면 안 돼요!`, body: svg(186, oy * 2 + h * cs, s) });
      });
    }
  });
  G3.forEach(mazeSheet);

  /* ───────── 숨은 그림 세기 ───────── */
  const ispy = (g) => reg({
    id: 'ispy-' + g, title: g === 'high' ? '찾아 세고 그래프 그리기' : '찾아라! 크리스마스 숨은 그림 세기', cat: 'play', grades: [g], icon: 'gift', random: true, answers: true,
    desc: { low: '흩어진 그림을 종류별로 세어 숫자로 써요.', mid: '더 많고 더 작은 그림! 세어 보고 합계도 구해요.', high: '그림을 세어 표로 정리하고 막대그래프로 나타내요. (수학 자료 정리 연계)' }[g],
    gen(c) {
      const r = c.r, [k, mx, cols, rows, H] = { low: [5, 5, 7, 6, 170], mid: [6, 9, 10, 9, 176], high: [6, 12, 11, 8, 128] }[g];
      const kinds = shuffle(ICONS, r).slice(0, k), counts = kinds.map(() => 2 + Math.floor(r() * (mx - 1)));
      const cw = 186 / cols, ch = H / rows, sz = Math.min(cw, ch) * .92, cells = shuffle(range(cols * rows), r); let s = `<rect x=".5" y=".5" width="185" height="${H - 1}" rx="5" fill="#f3fbf6" stroke="#432" stroke-width=".9"/>`, ci = 0;
      kinds.forEach((n, i) => range(counts[i], () => { const cell = cells[ci++], x = (cell % cols) * cw + (cw - sz) / 2 + (r() - .5) * (cw - sz + 1), y = Math.floor(cell / cols) * ch + (ch - sz) / 2 + (r() - .5) * (ch - sz + 1); s += artG(n, f1(x), f1(y), sz, { sw: 5, rot: Math.round((r() - .5) * 50) }); }));
      const tb = `<table class="t"><tr>${kinds.map(n => `<th style="width:${100 / (k + (g !== 'low' ? 1 : 0))}%">${art(n, { size: 44 })}</th>`).join('')}${g !== 'low' ? '<th>모두</th>' : ''}</tr><tr>${kinds.map((n, i) => `<td style="height:11mm"><span class="ans">${c.ans ? counts[i] : ''}</span> 개</td>`).join('')}${g !== 'low' ? `<td><span class="ans">${c.ans ? counts.reduce((a, b) => a + b) : ''}</span> 개</td>` : ''}</tr></table>`;
      let graph = '';
      if (g === 'high') {
        let q = ''; for (let y = 0; y <= 12; y++) q += `<path d="M14 ${52 - y * 4} H180" stroke="#8a7a70" stroke-width="${y % 2 ? .15 : .3}"/>` + (y % 2 ? '' : txt(10, 52 - y * 4, y, 3.2));
        kinds.forEach((n, i) => { const x = 22 + i * 27; q += artG(n, x, 53.5, 10) + `<path d="M${x - 4} 4 V52 M${x + 14} 4 V52" stroke="#8a7a70" stroke-width=".15"/>` + (c.ans ? `<rect x="${x}" y="${52 - counts[i] * 4}" width="10" height="${counts[i] * 4}" fill="#f77b72" stroke="#432" stroke-width=".4"/>` : ''); });
        graph = `<div class="q">막대그래프로 나타내기 <span style="font-size:10pt;color:#777">(개)</span></div>` + svg(186, 65, q + `<path d="M14 4 V52 H180" fill="none" stroke="#432" stroke-width=".7"/>`, 'style="flex:none;height:62mm"');
      }
      return [page(this, { sub: g === 'high' ? '그림을 종류별로 세어 표를 채우고, 막대그래프를 그려 가장 많은 것과 적은 것을 찾아요.' : '같은 그림을 모두 찾아 몇 개인지 세어 보세요. 센 것은 ○표 하면 헷갈리지 않아요.', body: svg(186, H, s, `style="flex:none;height:${H}mm"`) + tb + graph })];
    }
  });
  G3.forEach(ispy);

  /* ───────── 낱말 찾기 ───────── */
  const WORDS = ['산타', '루돌프', '눈사람', '트리', '선물', '썰매', '양말', '캐럴', '굴뚝', '장갑', '종소리', '촛불', '눈꽃', '엘프', '진저맨', '코코아', '목도리', '겨울', '카드', '케이크', '펭귄', '북극', '순록', '장식', '리본', '소원', '사랑', '나눔', '크리스마스', '산타마을', '눈썰매', '호두까기', '지팡이사탕', '벽난로', '함박눈', '고드름'];
  const FILL = '가나다라마바사아자차카타파하거너더러머버서어저고노도로모보소오조구누두루무부수우주기니디리미비시이지눈별밤달꿈빛종솔';
  const wsSheet = (g) => reg({
    id: 'words-' + g, title: '크리스마스 낱말 찾기', cat: 'play', grades: [g], icon: 'bell', random: true, answers: true,
    desc: { low: '가로·세로로 숨은 낱말 6개 찾기.', mid: '가로·세로·대각선으로 숨은 낱말 10개 찾기.', high: '거꾸로 쓰인 낱말까지! 14개를 찾고 남은 글자로 문장 만들기.' }[g],
    gen(c) {
      const r = c.r, [n, cnt, dirs] = { low: [7, 6, [[1, 0], [0, 1]]], mid: [9, 10, [[1, 0], [0, 1], [1, 1]]], high: [11, 14, [[1, 0], [0, 1], [1, 1], [-1, 0], [0, -1], [1, -1]]] }[g];
      const grid = range(n, () => range(n, () => '')), mark = range(n, () => range(n, () => 0)), placed = [];
      for (const w of shuffle(WORDS.filter(w => g === 'low' ? w.length <= 3 : true), r)) {
        if (placed.length >= cnt) break;
        for (let t = 0; t < 80; t++) {
          const [dx, dy] = pick(dirs, r), x = Math.floor(r() * n), y = Math.floor(r() * n), ex = x + dx * (w.length - 1), ey = y + dy * (w.length - 1);
          if (ex < 0 || ey < 0 || ex >= n || ey >= n) continue;
          if ([...w].every((ch, i) => { const v = grid[y + dy * i][x + dx * i]; return !v || v === ch; })) { [...w].forEach((ch, i) => { grid[y + dy * i][x + dx * i] = ch; mark[y + dy * i][x + dx * i] = 1; }); placed.push(w); break; }
        }
      }
      const cs = Math.min(186 / n, 16); let s = '';
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) s += `<rect x="${x * cs}" y="${y * cs}" width="${cs}" height="${cs}" fill="${c.ans && mark[y][x] ? '#ffe08a' : '#fff'}" stroke="#bfb1a5" stroke-width=".3"/>` + txt(x * cs + cs / 2, y * cs + cs / 2 + .3, grid[y][x] || FILL[Math.floor(r() * FILL.length)], cs * .52);
      s += `<rect x="0" y="0" width="${n * cs}" height="${n * cs}" rx="1" fill="none" stroke="#432" stroke-width="1"/>`;
      const list = `<div class="q">찾을 낱말 (찾으면 ✔)</div><div style="display:flex;flex-wrap:wrap;gap:2.5mm;flex:none">${placed.map(w => `<span style="border:.4mm solid #432;border-radius:99px;padding:.6mm 3.5mm;font-family:var(--f-display);font-size:12pt">☐ ${w}</span>`).join('')}</div>`;
      return [page(this, { sub: { low: '낱말은 가로(→)나 세로(↓)로 숨어 있어요. 찾으면 색연필로 묶어요.', mid: '낱말은 가로(→), 세로(↓), 대각선(↘)으로 숨어 있어요.', high: '낱말은 여덟 방향 중 어디로든, 거꾸로도 숨어 있어요. 다 찾은 뒤 낱말 3개로 짧은 글을 지어 보세요.' }[g], body: svg(n * cs, n * cs, s, `style="flex:none;height:${g === 'high' ? 150 : 176}mm"`) + list + (g === 'high' ? `<div class="q">낱말 3개로 짧은 글 짓기</div>${lines(2)}` : '') })];
    }
  });
  G3.forEach(wsSheet);

  /* ───────── 스도쿠 ───────── */
  function sudoku(n, br, bc, holes, r) {
    const ok = (g, y, x, v) => { for (let i = 0; i < n; i++) if (g[y][i] === v || g[i][x] === v) return false; const by = y - y % br, bx = x - x % bc; for (let j = 0; j < br; j++) for (let i = 0; i < bc; i++) if (g[by + j][bx + i] === v) return false; return true; };
    const fill = (g) => { for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (!g[y][x]) { for (const v of shuffle(range(n, i => i + 1), r)) if (ok(g, y, x, v)) { g[y][x] = v; if (fill(g)) return true; g[y][x] = 0; } return false; } return true; };
    const count = (g, lim = 2) => { for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (!g[y][x]) { let c = 0; for (let v = 1; v <= n; v++) if (ok(g, y, x, v)) { g[y][x] = v; c += count(g, lim - c); g[y][x] = 0; if (c >= lim) break; } return c; } return 1; };
    const sol = range(n, () => range(n, () => 0)); fill(sol);
    const puz = sol.map(row => row.slice()); let removed = 0;
    for (const cell of shuffle(range(n * n), r)) { if (removed >= holes) break; const y = Math.floor(cell / n), x = cell % n, v = puz[y][x]; puz[y][x] = 0; if (count(puz.map(row => row.slice())) === 1) removed++; else puz[y][x] = v; }
    return { sol, puz };
  }
  const sdSheet = (g) => reg({
    id: 'sudoku-' + g, title: { low: '그림 스도쿠 4×4', mid: '크리스마스 스도쿠 6×6', high: '크리스마스 스도쿠 9×9' }[g], cat: 'play', grades: [g], icon: 'ornament', random: true, answers: true,
    desc: { low: '가로줄·세로줄·굵은 상자에 그림이 한 번씩만! 그림 조각을 오려 붙여요.', mid: '그림 6종이 한 번씩만 들어가는 6×6 스도쿠 2문제.', high: '진짜 9×9 스도쿠에 도전! 풀이가 하나뿐인지 컴퓨터가 확인한 문제예요.' }[g],
    gen(c) {
      const r = c.r, [n, br, bc, holes, num] = { low: [4, 2, 2, 8, 2], mid: [6, 2, 3, 20, 2], high: [9, 3, 3, 46, 1] }[g];
      const ics = shuffle(['tree', 'star', 'gift', 'bell', 'snowman', 'santa', 'rudolph', 'ginger', 'stocking'], r).slice(0, n);
      const one = (x0, y0, size) => {
        const { sol, puz } = sudoku(n, br, bc, holes, r), cs = size / n; let s = '';
        for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
          s += `<rect x="${x0 + x * cs}" y="${y0 + y * cs}" width="${cs}" height="${cs}" fill="${puz[y][x] ? '#fff7e6' : '#fff'}" stroke="#8a7a70" stroke-width=".3"/>`;
          const v = puz[y][x] || (c.ans ? sol[y][x] : 0); if (!v) continue;
          s += g === 'high' ? txt(x0 + x * cs + cs / 2, y0 + y * cs + cs / 2 + .4, v, cs * .6, { fill: puz[y][x] ? '#2b2320' : '#d93a3a' }) : artG(ics[v - 1], x0 + x * cs + cs * .1, y0 + y * cs + cs * .1, cs * .8, { sw: 5 }) + (puz[y][x] ? '' : `<circle cx="${x0 + x * cs + cs * .86}" cy="${y0 + y * cs + cs * .14}" r="1.4" fill="#d93a3a"/>`);
        }
        for (let i = 0; i <= n; i++) { if (i % br === 0) s += `<path d="M${x0} ${y0 + i * cs} h${size}" stroke="#432" stroke-width="1.2"/>`; if (i % bc === 0) s += `<path d="M${x0 + i * cs} ${y0} v${size}" stroke="#432" stroke-width="1.2"/>`; }
        return s;
      };
      let body;
      if (g === 'high') body = svg(186, 186, one(3, 3, 180)) + `<div class="q">규칙: 가로줄, 세로줄, 굵은 3×3 상자에 1~9가 한 번씩만 들어가요.</div>`;
      else {
        const sz = g === 'low' ? 84 : 100; body = svg(186, sz * 2 + 14, one((186 - sz) / 2, 2, sz) + one((186 - sz) / 2, sz + 12, sz));
        body += `<div class="q">${g === 'low' ? '✂ 그림 조각 — 오려서 빈칸에 붙여요 (그려도 좋아요)' : '빈칸에 들어갈 그림의 번호를 쓰거나 간단히 그려요'}</div><div style="display:flex;gap:1.5mm;flex-wrap:wrap;flex:none;justify-content:center">${g === 'low' ? range(8, i => `<span style="border:.4mm dashed #8a7a70;width:17mm;height:17mm;display:inline-flex;align-items:center;justify-content:center">${art(ics[i % 4], { size: 54 })}</span>`).join('') : ics.map((n2, i) => `<span style="display:inline-flex;align-items:center;gap:1mm;font-family:var(--f-display);font-size:13pt">${i + 1}${art(n2, { size: 44 })}</span>`).join('&nbsp;&nbsp;')}</div>`;
      }
      return [page(this, { sub: g === 'high' ? '숫자가 이미 많이 들어간 줄이나 상자부터 살펴보세요.' : '가로줄, 세로줄, 굵은 선 상자 안에 같은 그림이 두 번 나오면 안 돼요.', body })];
    }
  });
  G3.forEach(sdSheet);

  /* ───────── 암호 ───────── */
  const RID = [['산타 할아버지가 가장 싫어하는 면은?', '울면'], ['세상에서 가장 추운 바다는?', '썰렁해'], ['눈이 녹으면 무엇이 될까?', '봄'], ['눈사람의 반대말은?', '일어선사람'], ['겨울에 가장 많이 쓰는 끈은?', '따끈따끈'], ['산타가 굴뚝에서 하는 말은?', '아이고좁다'], ['루돌프가 길을 잃지 않는 까닭은?', '코가내비게이션'], ['트리가 미용실을 무서워하는 까닭은?', '가지치기']];
  reg({
    id: 'cipher-mid', title: '그림 암호 수수께끼', cat: 'play', grades: ['low', 'mid'], icon: 'elf', random: true, answers: true,
    desc: '그림 암호표를 보고 넌센스 수수께끼의 답을 풀어요.',
    gen(c) {
      const r = c.r; let qs = [], syl = new Set();
      for (const q of shuffle(RID, r)) { const s2 = new Set([...syl, ...q[1]]); if (s2.size <= 16 && qs.length < 4) { qs.push(q); syl = s2; } }
      const all = shuffle([...syl, ...shuffle([...'눈별밤종솔달'].filter(x => !syl.has(x)), r)].slice(0, 18), r), ics = shuffle(ICONS, r), key = {}; all.forEach((ch, i) => key[ch] = ics[i]);
      const keyT = `<div style="display:grid;grid-template-columns:repeat(9,1fr);gap:1.5mm;flex:none">${all.map(ch => `<div style="border:.4mm solid #432;border-radius:2.5mm;text-align:center;padding:1mm 0;background:#fffdf5">${art(key[ch], { size: 40 })}<div style="font-family:var(--f-display);font-size:14pt;line-height:1.2">${ch}</div></div>`).join('')}</div>`;
      const qh = qs.map(([q, a], i) => `<div class="box" style="flex:none"><div class="q">${i + 1}. ${q}</div><div style="display:flex;gap:2mm;margin-top:2mm;flex-wrap:wrap">${[...a].map(ch => `<div style="text-align:center">${art(key[ch], { size: 40 })}<div style="border:.5mm solid #432;border-radius:2mm;width:14mm;height:13mm;margin-top:1mm;font-family:var(--f-display);font-size:17pt;line-height:13mm" class="ans">${c.ans ? ch : ''}</div></div>`).join('')}</div></div>`).join('');
      return [page(this, { sub: '엘프들이 남긴 그림 암호! 암호표에서 그림을 찾아 글자로 바꾸면 수수께끼의 답이 나와요.', body: `<div class="q">암호표</div>${keyT}${qh}` })];
    }
  });
  const MSG = ['오늘의비밀임무', '친구세명에게칭찬하기', '선생님께메리크리스마스외치기', '짝과하이파이브하고웃기', '캐럴한소절흥얼거리기'];
  reg({
    id: 'cipher-high', title: '좌표 암호: 비밀 임무 해독', cat: 'play', grades: ['high'], icon: 'elf', random: true, answers: true,
    desc: '(가로, 세로) 좌표로 글자를 찾아 산타의 비밀 임무를 해독하고, 나만의 암호문도 만들어요.',
    gen(c) {
      const r = c.r, ms = [MSG[0], ...shuffle(MSG.slice(1), r).slice(0, 3)], syl = [...new Set(ms.join(''))];
      const cells = shuffle([...syl, ...shuffle([...FILL].filter(x => !syl.includes(x)), r)].slice(0, 49), r), pos = {}; cells.forEach((ch, i) => pos[ch] = [i % 7, Math.floor(i / 7)]);
      const cs = 15, L = 'ABCDEFG'; let s = '';
      cells.forEach((ch, i) => { const x = i % 7, y = Math.floor(i / 7); s += `<rect x="${12 + x * cs}" y="${10 + y * cs}" width="${cs}" height="${cs}" fill="#fff" stroke="#8a7a70" stroke-width=".3"/>` + txt(12 + x * cs + cs / 2, 10 + y * cs + cs / 2, ch, 7.5); });
      range(7, i => { s += txt(12 + i * cs + cs / 2, 5, L[i], 5.5, { fill: '#d93a3a' }) + txt(6, 10 + i * cs + cs / 2, i + 1, 5.5, { fill: '#1c6146' }); });
      s += `<rect x="12" y="10" width="${cs * 7}" height="${cs * 7}" fill="none" stroke="#432" stroke-width="1"/>`;
      const qh = ms.map((m, i) => `<div class="box" style="flex:none;padding:2mm 3mm"><div style="font-family:var(--f-display);font-size:10.5pt;color:#555;letter-spacing:.02em">${i ? '임무 ' + i : '제목'} ▸ ${[...m].map(ch => L[pos[ch][0]] + (pos[ch][1] + 1)).join(' · ')}</div><div style="border-bottom:.4mm solid #432;height:8.5mm;font-size:14pt" class="ans">${c.ans ? m : ''}</div></div>`).join('');
      return [page(this, { sub: '암호 「C4」는 가로 C, 세로 4가 만나는 칸의 글자예요. 임무를 해독해서 오늘 안에 몰래 수행해 보세요!', body: `<div style="display:flex;gap:4mm;flex:none;align-items:flex-start">${svg(120, 118, s, 'style="width:118mm;flex:none"')}<div class="box" style="flex:1;font-size:10pt"><div class="q">나만의 암호문</div>친구에게 보낼 짧은 말을 좌표 암호로 써 보세요.<div class="lines" style="height:60mm;flex:none"></div></div></div>${qh}` })];
    }
  });

  /* ───────── 다른 그림 찾기 ───────── */
  const diffScene = (items, r0, mark) => {
    const r = XK.rng(r0);
    return `<rect x=".5" y=".5" width="185" height="103" rx="4" fill="#fff" stroke="#432" stroke-width=".9"/>${flakes(r, 186, 60, 10)}<path d="M0.5 78 Q50 66 96 76 T185.5 72" fill="none" stroke="#432" stroke-width=".7"/>` +
      items.filter(i => !i.gone).map(i => artG(i.n, i.x, i.y, i.s, { line: true, sw: 4, flip: i.flip, rot: i.rot })).join('') +
      (mark ? items.filter(i => i.d).map(i => `<circle cx="${i.x + i.s0 / 2}" cy="${i.y + i.s0 / 2}" r="${i.s0 * .62}" fill="none" stroke="#d93a3a" stroke-width="1"/>`).join('') : '');
  };
  const diffSheet = (g) => reg({
    id: 'diff-' + g, title: '다른 그림 찾기', cat: 'play', grades: [g], icon: 'snowman', random: true, answers: true,
    desc: `위아래 그림에서 다른 곳 ${{ low: 5, mid: 7, high: 10 }[g]}군데 찾기. 찾은 뒤에는 색칠까지!`,
    gen(c) {
      const r = c.r, nd = { low: 5, mid: 7, high: 10 }[g], cols = g === 'low' ? 5 : g === 'mid' ? 6 : 7, rows = g === 'high' ? 3 : 2, cw = 180 / cols, ch = 96 / rows;
      const asym = ['santa', 'stocking', 'cane', 'hat', 'cocoa', 'snowman', 'elf', 'penguin'];
      const A = range(cols * rows, i => { const s = Math.min(cw, ch) * (.7 + r() * .22); return { n: pick(ICONS, r), x: +f1(3 + (i % cols) * cw + (cw - s) / 2 + (r() - .5) * 3), y: +f1(4 + Math.floor(i / cols) * ch + (ch - s) / 2 + (r() - .5) * 3), s, s0: s, rot: 0 }; });
      const B = A.map(o => ({ ...o }));
      shuffle(range(B.length), r).slice(0, nd).forEach((idx, j) => {
        const o = B[idx]; o.d = 1; const kind = j % 5;
        if (kind === 0) o.n = pick(ICONS.filter(x => x !== o.n), r);
        else if (kind === 1) o.gone = 1;
        else if (kind === 2) { o.x += o.s * .2; o.y += o.s * .2; o.s *= .6; }
        else if (kind === 3) { if (asym.includes(o.n)) o.flip = 1; else o.n = pick(asym, r), o.flip = 1; }
        else o.rot = 180;
      });
      const seed2 = c.seed + 5;
      return [page(this, { sub: `두 그림에서 서로 다른 곳 ${nd}군데를 찾아 아래 그림에 ○표 하세요.`, body: svg(186, 104, diffScene(A, seed2)) + svg(186, 104, diffScene(B, seed2, c.ans)) + `<div class="q" style="text-align:center">찾은 개수: ${range(nd, () => '☐').join(' ')}</div>` })];
    }
  });
  G3.forEach(diffSheet);

  /* ───────── 빙고 ───────── */
  const BW = ['산타', '루돌프', '눈사람', '트리', '선물', '썰매', '양말', '캐럴', '굴뚝', '장갑', '종', '촛불', '눈꽃', '엘프', '진저맨', '코코아', '목도리', '카드', '케이크', '펭귄', '북극', '별', '리본', '소원', '리스', '오너먼트', '지팡이 사탕', '벽난로', '함박눈', '고드름'];
  const bingo = (g) => reg({
    id: 'bingo-' + g, title: { low: '그림 빙고 3×3', mid: '그림 빙고 4×4', high: '낱말 빙고 5×5' }[g], cat: 'play', grades: [g], icon: 'bell', random: true,
    desc: { low: '모두 다른 그림 빙고판 30장. 전자칠판 「빙고 뽑기」와 함께 써요.', mid: '모두 다른 4×4 그림 빙고판 28장. 전자칠판 「빙고 뽑기」와 함께!', high: '낱말 30개 중 25개를 골라 직접 채우는 5×5 빙고판.' }[g],
    gen(c) {
      if (g === 'high') {
        const grid = svg(150, 150, range(25, i => `<rect x="${(i % 5) * 30}" y="${Math.floor(i / 5) * 30}" width="30" height="30" fill="${i === 12 ? '#ffe9e6' : '#fff'}" stroke="#432" stroke-width=".8"/>`).join('') + artG('star', 64, 64, 22), 'style="flex:none;height:150mm"');
        return [page(this, { sub: '아래 낱말 30개 중 24개를 골라 마음대로 적어요. 가운데는 자유 칸! 선생님(전자칠판)이 부르는 낱말에 ○표, 3줄이면 「메리 빙고!」', body: grid + `<div class="q">낱말 창고</div><div style="display:flex;flex-wrap:wrap;gap:1.6mm;flex:none">${BW.map(w => `<span style="border:.4mm solid #8a7a70;border-radius:99px;padding:.2mm 3mm;font-size:11pt">${w}</span>`).join('')}</div>` })];
      }
      const n = g === 'low' ? 3 : 4, per = g === 'low' ? 6 : 4, pagesN = g === 'low' ? 5 : 7, r = c.r;
      return range(pagesN, (p) => {
        const W = g === 'low' ? 86 : 88, cs = W / n, Hc = W + 12; let s = '';
        range(per, (k) => {
          const x0 = (k % 2) * 98 + 2, y0 = Math.floor(k / 2) * (g === 'low' ? 76 : 114) + 1, card = shuffle(ICONS, r).slice(0, n * n), sc = g === 'low' ? .78 : 1;
          s += `<g transform="translate(${x0} ${y0}) scale(${sc})"><rect x="0" y="0" width="${W}" height="${Hc}" rx="4" fill="#fff" stroke="#432" stroke-width="1" stroke-dasharray="3 1.5"/>${txt(W / 2, 6.5, `메리 빙고!  ${p * per + k + 1}번`, 5, { fill: '#b52a2a' })}` +
            card.map((nm, i) => `<rect x="${(i % n) * cs + .0}" y="${12 + Math.floor(i / n) * cs}" width="${cs}" height="${cs}" fill="none" stroke="#432" stroke-width=".6"/>` + artG(nm, (i % n) * cs + cs * .12, 12 + Math.floor(i / n) * cs + cs * .12, cs * .76, { sw: 5 })).join('') + '</g>';
        });
        return page(this, { title: `${this.title} (${p + 1}/${pagesN})`, noname: true, sub: '점선을 따라 오려 한 장씩 나눠요. 불린 그림에 바둑돌이나 지우개 가루를 올리면 여러 번 쓸 수 있어요.', body: svg(196, 232, s) });
      });
    }
  });
  G3.forEach(bingo);

  /* ───────── 저학년 기초 활동 ───────── */
  reg({
    id: 'shadow-low', title: '그림자 짝 찾기', cat: 'play', grades: ['low'], icon: 'penguin', random: true,
    desc: '캐릭터와 그림자를 선으로 이어요.',
    gen(c) {
      const r = c.r, ic = shuffle(ICONS, r).slice(0, 6), sh = shuffle(ic, r); let s = '';
      ic.forEach((n, i) => { const y = 2 + i * 38; s += artG(n, 8, y, 33) + `<circle cx="52" cy="${y + 16.5}" r="1.8" fill="#d93a3a"/>` + `<circle cx="134" cy="${y + 16.5}" r="1.8" fill="#d93a3a"/>` + shadowG(sh[i], 145, y, 33); });
      return [page(this, { sub: '왼쪽 친구의 그림자는 어디 있을까요? 빨간 점끼리 선으로 이어 주세요.', body: svg(186, 230, s) })];
    }
  });
  reg({
    id: 'pattern-low', title: '규칙 찾아 이어 그리기', cat: 'play', grades: ['low'], icon: 'cane', random: true,
    desc: '반복되는 그림 규칙을 찾아 빈칸을 채워요. (수학 「규칙 찾기」 연계)',
    gen(c) {
      const r = c.r, pats = ['AB', 'AAB', 'ABB', 'ABC', 'AABB', 'ABAC']; let s = '';
      pats.forEach((p, i) => { const ic = shuffle(ICONS, r), y = 2 + i * 37; range(8, j => { const x = 2 + j * 23; s += `<rect x="${x}" y="${y}" width="21" height="30" rx="4" fill="${j >= 6 ? '#fff7e6' : '#fff'}" stroke="#432" stroke-width="${j >= 6 ? 1 : .5}" ${j >= 6 ? 'stroke-dasharray="2.5 1.5"' : ''}/>` + (j < 6 || c.ans ? artG(ic[p.charCodeAt(j % p.length) - 65], x + 1.5, y + 6, 18, { sw: 5 }) : txt(x + 10.5, y + 15, '?', 12, { fill: '#e5b96a' })); }); });
      return [page(this, { answers: true, sub: '그림이 놓인 규칙을 찾아 「?」 칸에 들어갈 그림을 그려요. 그리기 어려우면 이름을 써도 좋아요.', body: svg(186, 224, s) })];
    }, answers: true
  });
  reg({
    id: 'count-low', title: '선물 덧셈·뺄셈', cat: 'play', grades: ['low'], icon: 'gift', random: true, answers: true,
    desc: '그림을 세어 덧셈·뺄셈을 해요. 누를 때마다 새 문제!',
    gen(c) {
      const r = c.r; let s = '';
      range(7, i => {
        const add = i < 4, a = add ? 1 + Math.floor(r() * 5) : 4 + Math.floor(r() * 5), b = add ? 1 + Math.floor(r() * 4) : 1 + Math.floor(r() * (a - 1)), n = pick(ICONS, r), y = 2 + i * 32;
        s += `<rect x="1" y="${y}" width="184" height="28" rx="5" fill="#fff" stroke="#bfb1a5" stroke-width=".5"/>`;
        range(a, j => { s += artG(n, 4 + j * 11.5, y + 8, 11, { sw: 5 }) + (!add && j >= a - b ? `<path d="M${4 + j * 11.5} ${y + 19} l11 -11" stroke="#d93a3a" stroke-width="1.2"/>` : ''); });
        if (add) range(b, j => { s += artG(n, 76 + j * 11.5, y + 8, 11, { sw: 5 }); });
        if (add) s += txt(69, y + 14, '+', 9);
        s += txt(150, y + 14, `${a} ${add ? '+' : '−'} ${b} =`, 8, { a: 'end' }) + `<rect x="154" y="${y + 5}" width="24" height="18" rx="3" fill="#fff" stroke="#432" stroke-width=".8"/>` + (c.ans ? txt(166, y + 14.5, add ? a + b : a - b, 10, { fill: '#d93a3a' }) : '');
      });
      return [page(this, { sub: '그림을 하나씩 세어 보고 빈칸에 답을 써요. 빨간 줄이 그어진 그림은 「빼는」 그림이에요.', body: svg(186, 226, s) })];
    }
  });
  reg({
    id: 'trace-low', title: '산타 길 따라 긋기', cat: 'play', grades: ['low'], icon: 'hat',
    desc: '점선을 따라 곧은 선·뾰족 선·물결 선을 그어요. 1학년 운필 연습용.',
    gen() {
      const pairs = [['santa', 'gift'], ['rudolph', 'tree'], ['snowman', 'mitten'], ['penguin', 'cocoa'], ['elf', 'stocking'], ['ginger', 'cane']];
      const paths = ['M36 Y H150', 'M36 Y ' + range(6, i => `l9.5 ${i % 2 ? 14 : -14} l9.5 ${i % 2 ? -14 : 14}`).join(' '), 'M36 Y ' + range(6, i => `q9.5 ${i % 2 ? 18 : -18} 19 0`).join(' '), 'M36 Y ' + range(6, i => `v${i % 2 ? 12 : -12} h9.5 v${i % 2 ? -12 : 12} h9.5`).join(' '), 'M36 Y ' + range(4, () => 'c14 -22 26 22 14 0 c-6 -12 6 -12 14.5 0').join(' '), 'M36 Y ' + range(3, () => 'q9.5 -22 19 0 q9.5 22 19 0').join(' ')];
      const s = pairs.map(([a, b], i) => { const y = 20 + i * 37; return artG(a, 2, y - 15, 30) + artG(b, 154, y - 15, 30) + `<path d="${paths[i].replace('Y', y)}" fill="none" stroke="#8a7a70" stroke-width="1.6" stroke-dasharray="1 4" stroke-linecap="round"/>`; }).join('');
      return [page(this, { sub: '왼쪽 친구가 오른쪽까지 갈 수 있게 점선을 따라 천천히 선을 그어요. 색연필 여러 색으로 여러 번!', body: svg(186, 226, s) })];
    }
  });

  /* ───────── 주사위 그리기 ───────── */
  reg({
    id: 'roll-draw', title: '주사위 굴려 그리기', cat: 'play', grades: ['low', 'mid'], icon: 'snowman',
    desc: '주사위 눈에 따라 눈사람·괴짜 산타가 완성되는 그리기 놀이. 짝과 번갈아 굴려요.',
    gen() {
      const die = (n) => { const P = { 1: [[5, 5]], 2: [[2.5, 2.5], [7.5, 7.5]], 3: [[2.5, 2.5], [5, 5], [7.5, 7.5]], 4: [[2.5, 2.5], [7.5, 2.5], [2.5, 7.5], [7.5, 7.5]], 5: [[2.5, 2.5], [7.5, 2.5], [5, 5], [2.5, 7.5], [7.5, 7.5]], 6: [[2.5, 2.2], [7.5, 2.2], [2.5, 5], [7.5, 5], [2.5, 7.8], [7.5, 7.8]] }[n]; return `<svg viewBox="0 0 10 10" width="26" height="26" style="vertical-align:middle"><rect x=".4" y=".4" width="9.2" height="9.2" rx="2" fill="#fff" stroke="#432" stroke-width=".6"/>${P.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1" fill="#d93a3a"/>`).join('')}</svg>`; };
      const t1 = ['몸통(큰 동그라미 2개)', '눈과 당근 코', '모자', '목도리', '나뭇가지 팔', '단추와 웃는 입'];
      const p1 = page(this, { title: '주사위 굴려 눈사람 그리기', sub: '주사위를 굴려 나온 눈의 부분을 그려요. 이미 그린 것이 나오면 다음 사람 차례! 먼저 완성하면 승리. (몸통을 먼저 그려야 다른 것을 그릴 수 있어요)', body: `<table class="t"><tr>${t1.map((t, i) => `<td style="width:16.6%">${die(i + 1)}<br>${t}</td>`).join('')}</tr></table><div class="grid2" style="flex:1"><div class="box"><span class="q">나의 눈사람</span></div><div class="box"><span class="q">짝의 눈사람</span></div></div>` });
      const cols = [['모자', ['뾰족 고깔', '요리사 모자', '왕관', '헬멧', '꽃 화분', '문어 모자']], ['눈', ['별 모양 눈', '선글라스', '윙크', '눈 세 개', '하트 눈', '졸린 눈']], ['수염', ['구불구불', '세모 수염', '땋은 수염', '구름 수염', '아주 짧게', '무지개 수염']], ['옷 무늬', ['물방울', '줄무늬', '별무늬', '체크', '꽃무늬', '번개무늬']]];
      const p2 = page(this, { title: '주사위 굴려 괴짜 산타 그리기', icon: 'santa', sub: '주사위를 네 번 굴려 모자·눈·수염·옷 무늬를 정하고, 세상에 하나뿐인 산타를 그려요.', body: `<table class="t"><tr><th></th>${range(6, i => `<th>${die(i + 1)}</th>`).join('')}</tr>${cols.map(([h, v]) => `<tr><th>${h}</th>${v.map(x => `<td>${x}</td>`).join('')}</tr>`).join('')}</table><div class="box" style="flex:1"><span class="q">나의 괴짜 산타</span></div><div class="q">산타의 이름: <span style="display:inline-block;border-bottom:.4mm solid #432;width:70mm"></span></div>` });
      return [p1, p2];
    }
  });
  reg({
    id: 'roll-story', title: '주사위 이야기 만들기', cat: 'write', grades: ['mid', 'high'], icon: 'cocoa',
    desc: '주사위 세 번으로 주인공·장소·사건을 뽑아 엉뚱한 크리스마스 이야기를 써요.',
    gen() {
      const T = [['주인공', ['길 잃은 꼬마 엘프', '코가 파란 순록', '녹기 싫은 눈사람', '휴가 중인 산타', '말하는 진저맨', '트리 꼭대기의 별']], ['장소', ['우리 학교 급식실', '북극 선물 공장', '눈 덮인 놀이터', '구름 위 썰매 정류장', '한밤중의 편의점', '거대한 선물 상자 속']], ['사건', ['선물이 모두 사라졌다', '썰매가 고장 났다', '시간이 멈췄다', '몸이 손톱만큼 작아졌다', '비밀 지도를 발견했다', '초대장이 잘못 배달됐다']]];
      return [page(this, { sub: '주사위를 세 번 굴려 나온 재료로 이야기를 지어요. 처음–가운데–끝이 드러나게!', body: `<table class="t"><tr><th>주사위</th>${T.map(t => `<th>${t[0]}</th>`).join('')}</tr>${range(6, i => `<tr><th>${i + 1}</th>${T.map(t => `<td>${t[1][i]}</td>`).join('')}</tr>`).join('')}</table><div class="q">제목: <span style="display:inline-block;border-bottom:.4mm solid #432;width:120mm"></span></div><div class="lines"></div>`, tip: '모둠에서 한 문장씩 이어 쓰는 「릴레이 이야기」로 바꿔도 좋아요. 완성작은 전자칠판 타이머를 켜고 1분 낭독회!' })];
    }
  });

  /* ───────── 수학 ───────── */
  const qa = (list, ans) => list.map(([q, a], i) => `<div class="box" style="flex:none;padding:2mm 3mm"><b style="font-family:var(--f-display);font-weight:400;color:#b52a2a">${i + 1}.</b> ${q}<div style="display:flex;justify-content:flex-end;align-items:flex-end;gap:2mm;min-height:${ans ? 7 : 15}mm"><span style="font-size:9.5pt;color:#777">답</span><span class="ans" style="border-bottom:.4mm solid #432;min-width:50mm;text-align:center;font-size:12pt">${ans ? a : '&nbsp;'}</span></div></div>`).join('');
  reg({
    id: 'math-mid', title: '산타 마을 선물 가게', cat: 'play', grades: ['mid'], icon: 'stocking', answers: true,
    desc: '가격표를 보고 푸는 덧셈·뺄셈·곱셈·나눗셈 문장제 6문제.',
    gen(c) {
      const items = [['cane', '지팡이 사탕', 300], ['ornament', '오너먼트', 800], ['stocking', '양말', 1200], ['cocoa', '코코아', 1500], ['mitten', '장갑', 2500], ['wreath', '리스', 4000]];
      const shop = `<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:2mm;flex:none">${items.map(([n, l, p]) => `<div style="border:.5mm solid #432;border-radius:3mm;text-align:center;padding:1.5mm;background:#fffdf5">${art(n, { size: 70 }).replace('<svg', '<svg style="margin:0 auto"')}<div style="font-size:10pt">${l}</div><div style="font-family:var(--f-display);color:#b52a2a">${p.toLocaleString()}원</div></div>`).join('')}</div>`;
      const Q = [['지팡이 사탕 4개의 값은 얼마인가요?', '1,200원'], ['장갑 1켤레와 코코아 2잔을 사면 모두 얼마인가요?', '5,500원'], ['5,000원을 내고 양말 1켤레와 오너먼트 3개를 샀어요. 거스름돈은 얼마인가요?', '1,400원'], ['리스 1개 값으로 오너먼트를 몇 개 살 수 있나요?', '5개'], ['10,000원으로 장갑 3켤레를 살 수 있나요? 살 수 있다면 얼마가 남나요?', '살 수 있다, 2,500원'], ['나에게 10,000원이 있다면? 사고 싶은 것을 정하고 식으로 나타내 보세요.', '(자유롭게)']];
      return [page(this, { sub: '엘프들이 가게를 열었어요. 가격표를 잘 보고 문제를 풀어 주세요.', body: shop + qa(Q, c.ans) })];
    }
  });
  reg({
    id: 'math-high', title: '산타의 배달 작전 수학', cat: 'play', grades: ['high'], icon: 'santa', answers: true,
    desc: '속력·분수·평균·소수 나눗셈·비율·부피까지, 5~6학년 수학 종합 문장제 8문제.',
    gen(c) {
      const Q = [['썰매는 1시간에 240km를 날아요. 같은 빠르기로 3시간 30분 동안 날면 몇 km를 가나요?', '840km'], ['선물 360개 가운데 <sup>3</sup>⁄<sub>8</sub>이 장난감이에요. 장난감은 몇 개인가요?', '135개'], ['순록 네 마리의 몸무게가 92kg, 88kg, 95kg, 85kg이에요. 평균 몸무게는 몇 kg인가요?', '90kg'], ['선물 하나를 묶는 데 리본이 0.75m 필요해요. 리본 12m로 선물을 몇 개 묶을 수 있나요?', '16개'], ['우리 반 25명 가운데 23명이 「착한 어린이 명단」에 올랐어요. 명단에 오른 학생은 전체의 몇 %인가요?', '92%'], ['굴뚝 안쪽은 가로 0.6m, 세로 0.5m, 높이 4m인 직육면체 모양이에요. 굴뚝 안쪽의 부피는 몇 m³인가요?', '1.2m³'], ['엘프 6명이 8일 걸려 끝내는 일이 있어요. 모든 엘프가 같은 빠르기로 일한다면 엘프 12명은 며칠 만에 끝낼까요?', '4일'], ['도전! 산타가 1초에 3집씩 배달한다면 1분에는 몇 집, 1시간에는 몇 집을 배달할 수 있나요?', '180집, 10,800집']];
      return [page(this, { sub: '크리스마스이브, 산타 본부의 계산 담당이 되어 주세요. 식을 쓰고 답을 구해요.', body: qa(Q, c.ans) })];
    }
  });
  reg({
    id: 'logic-high', title: '논리 퍼즐: 누가 무엇을 포장했을까?', cat: 'play', grades: ['high'], icon: 'elf', answers: true,
    desc: '단서 5개로 엘프 4명의 선물과 포장지 색을 추리하는 격자 논리 퍼즐.',
    gen(c) {
      const E = ['루미', '토토', '콩이', '별이'], Gf = ['로봇', '인형', '책', '자전거'], Cl = ['빨강', '초록', '금색', '파랑'], sol = { 루미: ['책', '초록'], 토토: ['로봇', '빨강'], 콩이: ['자전거', '파랑'], 별이: ['인형', '금색'] };
      const clues = ['토토는 로봇을 포장했어요.', '책은 초록 포장지로 쌌어요.', '별이는 금색 포장지를 썼어요.', '콩이는 인형도 책도 포장하지 않았어요.', '자전거는 빨강 포장지로 싸지 않았어요.'];
      const tb = `<table class="t"><tr><th rowspan="2"></th><th colspan="4">선물</th><th colspan="4">포장지</th></tr><tr>${[...Gf, ...Cl].map(x => `<th>${x}</th>`).join('')}</tr>${E.map(e => `<tr><th>${e}</th>${[...Gf, ...Cl].map(x => `<td style="height:11mm;width:10%" class="ans">${c.ans ? (sol[e].includes(x) ? '○' : '×') : ''}</td>`).join('')}</tr>`).join('')}</table>`;
      return [page(this, { sub: '엘프 네 명이 서로 다른 선물을 서로 다른 색 포장지로 쌌어요. 단서를 읽고 표에 ○, ×를 표시하며 추리해요.', body: `<div class="box" style="flex:none"><div class="q">단서</div><ol class="ol">${clues.map(x => `<li>${x}</li>`).join('')}</ol></div>${tb}<div class="q">추리 결과</div><table class="t"><tr><th>엘프</th>${E.map(e => `<th>${e}</th>`).join('')}</tr><tr><th>선물</th>${E.map(e => `<td style="height:10mm" class="ans">${c.ans ? sol[e][0] : ''}</td>`).join('')}</tr><tr><th>포장지</th>${E.map(e => `<td style="height:10mm" class="ans">${c.ans ? sol[e][1] : ''}</td>`).join('')}</tr></table><div class="q">어떤 순서로 알아냈는지 설명해 보세요.</div><div class="lines"></div>`, tip: '확실한 단서(1, 3번)부터 ○표 하고, 같은 줄·같은 칸의 나머지에 ×표를 하면 실마리가 풀려요.' })];
    }
  });

  /* ───────── 말판 놀이 ───────── */
  reg({
    id: 'boardgame', title: '썰매 경주 주사위 말판', cat: 'play', grades: G3, icon: 'gift',
    desc: '2~4명이 즐기는 주사위 말판. 「캐럴 한 소절」 같은 미션 칸이 숨어 있어요. 말은 오려서 사용!',
    gen() {
      const ev = { 3: '앞으로\n2칸', 6: '캐럴\n한 소절!', 9: '한 번\n쉬기', 12: '짝과\n하이파이브', 15: '뒤로\n3칸', 18: '산타 웃음\n호호호!', 21: '앞으로\n3칸', 24: '루돌프\n흉내 내기', 27: '처음으로…\n는 농담!\n앞으로 1칸', 30: '뒤로\n2칸', 33: '모두에게\n메리 크리스마스!' };
      const cols = 6, rows = 6, cw = 30, ch = 30; let s = '';
      range(36, i => {
        const row = Math.floor(i / cols), c0 = i % cols, col = row % 2 ? cols - 1 - c0 : c0, x = 3 + col * cw, y = 3 + (rows - 1 - row) * ch, e = ev[i];
        s += `<rect x="${x + 1}" y="${y + 1}" width="${cw - 2}" height="${ch - 2}" rx="6" fill="${i === 0 ? '#e2f4e8' : i === 35 ? '#ffe9a8' : e ? '#ffe9e6' : '#fff'}" stroke="#432" stroke-width=".9"/>`;
        if (i === 0) s += artG('santa', x + 6, y + 3, 18) + txt(x + 15, y + 25, '출발', 4.5);
        else if (i === 35) s += artG('tree', x + 6, y + 3, 18) + txt(x + 15, y + 25, '도착!', 4.5);
        else { s += txt(x + 6, y + 6.5, i, 4, { fill: '#b52a2a' }); if (e) e.split('\n').forEach((t, k, a) => { s += txt(x + 15, y + 17 + (k - (a.length - 1) / 2) * 5, t, 3.9); }); }
      });
      const tok = ['santa', 'rudolph', 'snowman', 'penguin'].map((n, i) => `<g transform="translate(${10 + i * 44} 0)"><circle cx="15" cy="15" r="14" fill="#fff" stroke="#432" stroke-width=".7" stroke-dasharray="2 1.2"/>${artG(n, 4, 4, 22)}</g>`).join('');
      return [page(this, { noname: true, sub: '주사위를 굴려 나온 수만큼 이동! 분홍 칸에 서면 미션을 해요. 트리에 먼저 도착하면 승리.', body: svg(186, 186, s) + `<div class="q">✂ 말 — 오려서 지우개에 붙여 세워요</div>` + svg(186, 30, tok, 'style="flex:none;height:30mm"') })];
    }
  });
})();
