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

  const SCENES = {
    low: [['snowman', '눈사람과 친구들', '큰 칸이 많아 크레파스로 칠하기 좋아요.'], ['rudolph', '선물 더미 속 루돌프', '코는 빨갛게, 선물 상자는 알록달록하게!'], ['penguins', '스케이트 타는 펭귄들', '넘어진 펭귄의 표정도 살려 칠해 보세요.'], ['gingerhouse', '과자 집 마을', '사탕과 아이싱 무늬를 알록달록하게!']],
    mid: [['sleigh', '산타의 밤하늘 비행', '밤하늘은 진한 색, 창문은 밝은 노랑으로 칠하면 불빛이 반짝여요.'], ['train', '선물 싣고 칙칙폭폭', '기차 칸마다 다른 색을 정해 보세요.'], ['forest', '숲속 동물들의 트리 꾸미기', '동물마다 털 색을 다르게 칠해 보세요.'], ['hanok', '한옥 마당의 눈사람', '한복의 색동 무늬와 감나무의 주황 감을 살려 보세요.']],
    high: [['livingroom', '크리스마스이브 거실', '벽난로 불빛이 닿는 곳은 밝게, 먼 곳은 어둡게 칠해 보세요.'], ['elves', '엘프들의 장난감 공장', '색연필로 섬세하게! 엘프마다 다른 옷 색을 정해 보세요.'], ['market', '크리스마스 마켓의 밤', '전구 불빛을 노랑·주황으로 반짝이게 칠해 보세요.'], ['glass', '스테인드글라스 창문', '칸마다 밝은 색을 넣으면 빛이 비치는 유리처럼 보여요.']],
  };
  G3.forEach(g => reg({
    id: 'scene-' + g, title: '크리스마스 장면 컬러링', cat: 'color', grades: [g], icon: 'tree',
    desc: { low: '큼직한 선의 장면 4종: 눈사람 친구들, 루돌프, 스케이트 펭귄, 과자 집.', mid: '장면 4종: 산타 비행, 선물 기차, 숲속 동물 트리, 한옥 마당 눈사람.', high: '섬세한 장면 4종: 이브의 거실, 엘프 공장, 크리스마스 마켓, 스테인드글라스.' }[g],
    gen() { return SCENES[g].map(([f, t, tip]) => page(this, { title: t, sub: tip, body: SH.full(f + '.png') })); }
  }));

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
    id: 'pixel-' + g, title: { low: '숫자 픽셀 컬러링', mid: '곱셈 픽셀 컬러링', high: '코딩 픽셀 아트' }[g], cat: 'color', grades: [g], icon: 'gift', answers: true, random: g === 'mid',
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
  const DOTSET = { low: [['bell', 1], ['star', 1], ['stocking', 1]], mid: [['tree', 2], ['ginger', 5], ['mitten', 3]] };
  const dotSheet = (g) => reg({
    id: 'dots-' + g, title: g === 'low' ? '점 잇기 (1부터 차례로)' : '뛰어 세기 점 잇기', cat: 'play', grades: [g], icon: 'star',
    desc: g === 'low' ? '1부터 차례로 이으면 종·별·양말이 나타나요. 다 이으면 색칠까지!' : '2씩, 5씩, 3씩 뛰어 세며 이으면 트리·진저맨·장갑이 나타나요.',
    gen() {
      return DOTSET[g].map(([n, step], k) => {
        const D = window.DOTS[n], boxW = 160, boxH = 190, sc = Math.min(boxW / D.w, boxH / D.h), w = D.w * sc, h = D.h * sc, x0 = (186 - w) / 2, y0 = 4;
        let s2 = `<image href="${XArt.img('dots/' + n + '.png')}" x="${x0}" y="${y0}" width="${w}" height="${h}"/>`;
        D.pts.forEach(([fx, fy], i) => {
          const x = x0 + fx * w, y = y0 + fy * h, cx = x0 + D.cx * w, cy = y0 + D.cy * h, dd = Math.hypot(x - cx, y - cy) || 1;
          const lx = x + (x - cx) / dd * 5.2, ly = y + (y - cy) / dd * 5.2;
          s2 += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${i ? 1.2 : 1.8}" fill="${i ? '#432' : '#d93a3a'}"/>` + txt(lx.toFixed(1), ly.toFixed(1), (i + 1) * step, 4.2, { fill: i ? '#2b2320' : '#d93a3a' });
        });
        return page(this, { title: `${this.title} ${k + 1}`, sub: step === 1 ? '빨간 점 1부터 숫자 순서대로 선을 이어요. 마지막 점은 1번과 이어요. 다 이으면 예쁘게 색칠해요!' : `${step}씩 뛰어 세기: ${step}, ${step * 2}, ${step * 3}… 순서대로 이어요. 마지막 점은 처음 점과 이어요.`, body: svg(186, boxH + 8, s2) + `<div class="q">무엇이 나타났나요? <span style="display:inline-block;border-bottom:.4mm solid #432;width:60mm"></span></div>` });
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

  /* ───────── 숨은그림찾기 (장면 속에 숨은 물건) ───────── */
  const HIDSET = { low: [['gingerhouse', '과자 집 마을'], ['rudolph', '선물 더미 속 루돌프']], mid: [['sleigh', '산타의 밤하늘 비행'], ['forest', '숲속 동물들의 트리 꾸미기']], high: [['livingroom', '크리스마스이브 거실'], ['market', '크리스마스 마켓의 밤']] };
  const ispy = (g) => reg({
    id: 'ispy-' + g, title: '크리스마스 숨은그림찾기', cat: 'play', grades: [g], icon: 'gift', answers: true,
    desc: { low: '그림 속에 숨은 물건 6개를 찾아요. 2장면.', mid: '그림 속에 숨은 물건 8개를 찾아요. 2장면.', high: '복잡한 그림 속에 숨은 물건 10개를 찾아요. 2장면.' }[g],
    gen(c) {
      return HIDSET[g].map(([f, t]) => {
        const D = window.HIDDEN[f], H2 = 196, w = H2 * D.w / D.h, x0 = (186 - w) / 2;
        const marks = c.ans ? D.spots.map(([x, y, r]) => `<circle cx="${(x0 + x * w).toFixed(1)}" cy="${(y * H2).toFixed(1)}" r="${Math.max(5, r * w * 1.3).toFixed(1)}" fill="none" stroke="#d93a3a" stroke-width="1.1"/>`).join('') : '';
        const legend = `<div style="display:flex;gap:2mm;flex-wrap:wrap;justify-content:center;flex:none">${D.spots.map(([, , , n]) => `<div style="border:.4mm solid #432;border-radius:3mm;padding:1mm 2mm;display:flex;align-items:center;gap:1mm;background:#fffdf5">${art(n, { line: true, size: 40 })}<span style="font-family:var(--f-display);font-size:11pt">${XArt.label(n)} ☐</span></div>`).join('')}</div>`;
        return page(this, { title: `숨은그림찾기: ${t}`, sub: `그림 속에 아래 물건 ${D.spots.length}개가 숨어 있어요. 찾으면 ○표 하고 아래 칸에 ✔ 하세요. 물건은 기울어지거나 거꾸로 숨어 있기도 해요!`, body: svg(186, H2, `<image href="${XArt.img('hidden/' + f + '.png')}" x="${x0.toFixed(1)}" y="0" width="${w.toFixed(1)}" height="${H2}"/>` + marks, `style="flex:none;height:${H2}mm"`) + legend });
      });
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

  /* ───────── 암호 ───────── */
  const RID = [['산타 할아버지가 가장 싫어하는 면은?', '울면'], ['세상에서 가장 추운 바다는?', '썰렁해'], ['눈이 녹으면 무엇이 될까?', '봄'], ['눈사람의 반대말은?', '일어선사람'], ['겨울에 가장 많이 쓰는 끈은?', '따끈따끈'], ['산타가 굴뚝에서 하는 말은?', '아이고좁다'], ['루돌프가 길을 잃지 않는 까닭은?', '코가내비게이션'], ['트리가 미용실을 무서워하는 까닭은?', '가지치기'], ['오리가 얼면?', '언덕'], ['소가 웃는 소리는?', '우하하'], ['세상에서 가장 큰 코는?', '멕시코'], ['물고기의 반대말은?', '불고기'], ['세상에서 가장 빠른 닭은?', '후다닥'], ['왕이 넘어지면?', '킹콩']];
  reg({
    id: 'cipher-mid', title: '그림 암호 수수께끼', cat: 'play', grades: ['low', 'mid'], icon: 'elf', random: true, answers: true,
    desc: '그림 암호표를 보고 넌센스 수수께끼의 답을 풀어요.',
    gen(c) {
      const r = c.r; let qs = [], syl = new Set();
      for (const q of shuffle(RID, r)) { const s2 = new Set([...syl, ...q[1]]); if (s2.size <= 16 && qs.length < 3) { qs.push(q); syl = s2; } }
      const all = shuffle([...syl, ...shuffle([...'눈별밤종솔달'].filter(x => !syl.has(x)), r)].slice(0, 18), r), ics = shuffle(ICONS, r), key = {}; all.forEach((ch, i) => key[ch] = ics[i]);
      const keyT = `<div style="display:grid;grid-template-columns:repeat(9,1fr);gap:1.5mm;flex:none">${all.map(ch => `<div style="border:.4mm solid #432;border-radius:2.5mm;text-align:center;padding:1mm 0;background:#fffdf5">${art(key[ch], { size: 40 })}<div style="font-family:var(--f-display);font-size:14pt;line-height:1.2">${ch}</div></div>`).join('')}</div>`;
      const qh = qs.map(([q, a], i) => `<div class="box" style="flex:none"><div class="q">${i + 1}. ${q}</div><div style="display:flex;gap:2mm;margin-top:2mm;flex-wrap:wrap">${[...a].map(ch => `<div style="text-align:center">${art(key[ch], { size: 40 })}<div style="border:.5mm solid #432;border-radius:2mm;width:14mm;height:13mm;margin-top:1mm;font-family:var(--f-display);font-size:17pt;line-height:13mm" class="ans">${c.ans ? ch : ''}</div></div>`).join('')}</div></div>`).join('');
      return [page(this, { sub: '엘프들이 남긴 그림 암호! 암호표에서 그림을 찾아 글자로 바꾸면 수수께끼의 답이 나와요.', body: `<div class="q">암호표</div>${keyT}${qh}` })];
    }
  });
  const MSG = ['오늘의비밀임무', '친구세명에게칭찬하기', '선생님께메리크리스마스외치기', '짝과하이파이브하고웃기', '캐럴한소절흥얼거리기', '짝의좋은점세가지말하기', '급식실에서감사인사하기', '친구자리정리도와주기', '가족에게사랑한다고말하기', '교실쓰레기세개줍기'];
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

  /* ───────── 다른 그림 찾기 (한 장면 속에서 달라진 곳) ───────── */
  const DIFFSET = { low: [['snowman', '눈사람과 친구들'], ['rudolph', '선물 더미 속 루돌프'], ['penguins', '스케이트 타는 펭귄들']], mid: [['train', '선물 싣고 칙칙폭폭'], ['forest', '숲속 동물들의 트리 꾸미기'], ['hanok', '한옥 마당의 눈사람']], high: [['market', '크리스마스 마켓의 밤'], ['elves', '엘프들의 장난감 공장'], ['livingroom', '크리스마스이브 거실']] };
  G3.forEach(g => reg({
    id: 'diff-' + g, title: '다른 그림 찾기', cat: 'play', grades: [g], icon: 'snowman', answers: true,
    desc: `한 장면 속에서 달라진 곳을 찾아요(${{ low: '5~6', mid: '7', high: '10' }[g]}군데). 그림 3장, 다 찾으면 색칠까지!`,
    gen(c) {
      return DIFFSET[g].map(([f, t]) => {
        const D = window.DIFF[f], n = D.spots.length, w = 91, h = w * D.h / D.w;
        const im = (k, x) => `<image href="${XArt.img('diff/' + f + '-' + k + '.png')}" x="${x}" y="0" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet"/><rect x="${x}" y="0" width="${w}" height="${h}" rx="2" fill="none" stroke="#432" stroke-width=".8"/>`;
        const marks = c.ans ? D.spots.map(([x, y, r]) => `<circle cx="${(95 + x * w).toFixed(1)}" cy="${(y * h).toFixed(1)}" r="${Math.max(4, r * w * 1.35).toFixed(1)}" fill="none" stroke="#d93a3a" stroke-width="1"/>`).join('') : '';
        return page(this, { title: `다른 그림 찾기: ${t}`, sub: `왼쪽 그림과 오른쪽 그림에서 다른 곳 ${n}군데를 찾아 오른쪽 그림에 ○표 하세요. 다 찾으면 왼쪽 그림을 색칠해요.`,
          body: svg(186, h, im('a', 0) + im('b', 95) + marks, `style="flex:none;height:${h}mm"`) + `<div class="q" style="text-align:center">찾은 개수: ${range(n, () => '☐').join(' ')}</div>`,
          tip: g === 'low' ? '눈송이·별 같은 작은 그림, 칠해진 곳, 사라진 것을 잘 살펴보세요.' : '없어진 것, 새로 생긴 것, 까맣게 칠해진 곳이 섞여 있어요. 그림을 반으로 나누어 차례로 비교하면 빨리 찾을 수 있어요.' });
      });
    }
  }));

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
    id: 'math-mid', title: '산타 마을 수학 문장제', cat: 'play', grades: ['mid'], icon: 'stocking', answers: true,
    desc: '선물 가게(덧셈·뺄셈), 장난감 공장(곱셈·나눗셈), 달력과 시계 문장제 3쪽 18문제.',
    gen(c) {
      const items = [['cane', '지팡이 사탕', 300], ['ornament', '오너먼트', 800], ['stocking', '양말', 1200], ['cocoa', '코코아', 1500], ['mitten', '장갑', 2500], ['wreath', '리스', 4000]];
      const shop = `<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:2mm;flex:none">${items.map(([n, l, p]) => `<div style="border:.5mm solid #432;border-radius:3mm;text-align:center;padding:1.5mm;background:#fffdf5">${art(n, { size: 70 }).replace('<svg', '<svg style="margin:0 auto"')}<div style="font-size:10pt">${l}</div><div style="font-family:var(--f-display);color:#b52a2a">${p.toLocaleString()}원</div></div>`).join('')}</div>`;
      const Q = [['지팡이 사탕 4개의 값은 얼마인가요?', '1,200원'], ['장갑 1켤레와 코코아 2잔을 사면 모두 얼마인가요?', '5,500원'], ['5,000원을 내고 양말 1켤레와 오너먼트 3개를 샀어요. 거스름돈은 얼마인가요?', '1,400원'], ['리스 1개 값으로 오너먼트를 몇 개 살 수 있나요?', '5개'], ['10,000원으로 장갑 3켤레를 살 수 있나요? 살 수 있다면 얼마가 남나요?', '살 수 있다, 2,500원'], ['나에게 10,000원이 있다면? 사고 싶은 것을 정하고 식으로 나타내 보세요.', '(자유롭게)']];
      const Q2 = [['엘프 한 명이 하루에 장난감을 8개 만들어요. 엘프 6명이 하루에 만드는 장난감은 모두 몇 개인가요?', '48개'], ['곰 인형 42개를 상자 7개에 똑같이 나누어 담으면 한 상자에 몇 개씩 담을 수 있나요?', '6개'], ['썰매 한 대에 선물 자루가 9개씩 실려 있어요. 썰매 4대에 실린 선물 자루는 모두 몇 개인가요?', '36개'], ['사탕 56개를 엘프 8명이 똑같이 나누어 가지면 한 명이 몇 개씩 가지나요?', '7개'], ['순록 한 마리의 다리는 4개예요. 순록 9마리의 다리는 모두 몇 개인가요?', '36개'], ['공장 이야기로 곱셈이나 나눗셈 문제를 직접 만들고 짝과 바꿔 풀어 보세요.', '(자유롭게)']];
      const Q3 = [['오늘이 12월 18일이에요. 크리스마스(12월 25일)까지 며칠 남았나요?', '7일'], ['12월 1일부터 하루에 한 칸씩 어드벤트 달력을 열면, 12월 24일까지 모두 몇 칸을 열까요?', '24칸'], ['캐럴 공연이 오후 2시 30분에 시작해서 45분 동안 했어요. 공연이 끝난 시각은?', '오후 3시 15분'], ['산타가 밤 11시에 출발해서 3시간 뒤에 돌아왔어요. 돌아온 시각은?', '새벽 2시'], ['쿠키를 굽는 데 25분, 식히는 데 15분 걸려요. 모두 몇 분 걸리나요?', '40분'], ['크리스마스(12월 25일)에서 일주일 뒤는 몇 월 며칠인가요?', '1월 1일']];
      return [page(this, { title: '산타 마을 선물 가게', sub: '엘프들이 가게를 열었어요. 가격표를 잘 보고 문제를 풀어 주세요.', body: shop + qa(Q, c.ans) }),
        page(this, { title: '엘프 장난감 공장', icon: 'elf', sub: '장난감 공장에서 일어난 일이에요. 곱셈과 나눗셈으로 풀어 보세요.', body: `<div style="display:flex;justify-content:center;gap:4mm;flex:none">${['elf', 'teddy', 'train', 'presents', 'sleigh'].map(n => art(n, { size: 70 })).join('')}</div>` + qa(Q2, c.ans) }),
        page(this, { title: '크리스마스 달력과 시계', icon: 'candle', sub: '날짜와 시각을 계산해 보세요. 달력을 그려 보거나 시계를 떠올리면 쉬워요.', body: `<div style="display:flex;justify-content:center;gap:4mm;flex:none">${['candle', 'cookies', 'santa', 'bell', 'tree'].map(n => art(n, { size: 70 })).join('')}</div>` + qa(Q3, c.ans) })];
    }
  });
  const PARTY = [
    { n: 4, chars: ['penguin', 'rudolph', 'fox', 'polarbear'], clues: ['펭귄은 맨 왼쪽 1번 자리에 앉았어요.', '여우는 루돌프의 바로 오른쪽에 앉았어요.', '북극곰은 펭귄 바로 옆자리가 아니에요.'], ans: ['penguin', 'rudolph', 'fox', 'polarbear'] },
    { n: 5, chars: ['bunny', 'polarbear', 'rudolph', 'penguin', 'fox'], clues: ['토끼는 가운데 3번 자리에 앉았어요.', '북극곰은 토끼의 바로 왼쪽에 앉았어요.', '루돌프와 펭귄은 서로 바로 옆자리예요.', '펭귄은 루돌프보다 오른쪽에 앉았어요.', '여우는 양 끝 자리 중 하나에 앉았어요.'], ans: ['fox', 'polarbear', 'bunny', 'rudolph', 'penguin'] },
  ];
  reg({
    id: 'party-logic', title: '파티 자리 배치 추리', cat: 'play', grades: ['mid', 'high'], icon: 'presents', answers: true,
    desc: '단서를 읽고 동물 친구 카드를 오려 파티 자리에 앉혀 보는 추리 퍼즐. 4자리(쉬움)·5자리(어려움).',
    gen(c) {
      return PARTY.map((P, k) => {
        const sw = P.n === 4 ? 42 : 34, gap = (186 - sw * P.n) / (P.n + 1);
        let tb = `<rect x="4" y="8" width="178" height="22" rx="11" fill="#fff" stroke="#432" stroke-width=".8"/>` + ['cookies', 'cocoa', 'presents', 'candle', 'cookies'].map((n2, i) => artG(n2, 18 + i * 34, 4, 26)).join('');
        tb += range(P.n, i => { const x = gap + i * (sw + gap); return `<rect x="${x}" y="38" width="${sw}" height="${sw + 8}" rx="4" fill="#fffdf5" stroke="#432" stroke-width=".8" stroke-dasharray="3 1.5"/>${txt(x + sw / 2, 34, (i + 1) + '번 자리', 4.6, { fill: '#b52a2a' })}` + (c.ans ? artG(P.ans[i], x + 3, 41, sw - 6) + txt(x + sw / 2, 38 + sw + 4, XArt.label(P.ans[i]), 4) : ''); }).join('');
        const cards = `<div class="h3">✂ 친구 카드 — 오려서 자리에 올려 보며 추리해요</div><div style="display:flex;gap:3mm;flex:none;justify-content:center">${P.chars.map(n2 => `<div style="border:.5mm dashed #8a7a70;border-radius:3mm;padding:1.5mm;text-align:center;width:${P.n === 4 ? 36 : 30}mm">${art(n2, { size: 92 })}<div style="font-family:var(--f-display);font-size:12pt">${XArt.label(n2)}</div></div>`).join('')}</div>`;
        const clues = `<div class="box" style="flex:none;background:#fffdf5"><div class="h3">단서 카드</div><ol class="ol" style="font-size:12.5pt">${P.clues.map(q => `<li>${q}</li>`).join('')}</ol></div>`;
        return page(this, { title: `파티 자리 배치 추리 ${k + 1} (${P.n === 4 ? '쉬움' : '어려움'})`, sub: `크리스마스 파티에 동물 친구 ${P.n}명이 나란히 앉았어요. 단서를 모두 만족하는 자리를 찾아 카드를 붙이세요.`,
          body: svg(186, 38 + sw + 12, tb, `style="flex:none;height:${38 + sw + 12}mm"`) + clues + cards + `<div class="q">내가 정답을 찾은 방법</div><div class="lines"></div>`,
          tip: '확실한 단서(자리 번호가 나온 것)부터 카드를 올려 보세요. 카드를 이리저리 옮겨 보다 단서와 어긋나면 다시 옮기면 돼요.' });
      });
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
  /* 문제가 한 쪽뿐인 퍼즐은 서로 다른 문제로 3쪽 */
  const MULTI = { 'words-low': 3, 'words-mid': 3, 'words-high': 3, 'cipher-mid': 3, 'cipher-high': 3, 'shadow-low': 3, 'pattern-low': 3, 'count-low': 3 };
  SHEETS.forEach(sh => {
    const n = MULTI[sh.id]; if (!n) return; const g1 = sh.gen;
    sh.gen = function (c) { return range(n, i => g1.call(this, { ...c, r: XK.rng(c.seed + i * 7919), seed: c.seed + i * 7919 })).flat(); };
    sh.desc = sh.desc.replace(/\.$/, '') + ` (서로 다른 문제 ${n}쪽)`;
  });
})();
