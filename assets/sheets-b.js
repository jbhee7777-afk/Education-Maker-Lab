/* 활동지 B: 만들기 도안 · 종이접기 · 글쓰기 · 놀이 카드 · 노래 */
(function () {
  const { reg, page, svg, txt, lines, steps } = SH;
  const { art, artG, label, starPts } = XArt;
  const { range } = XK;
  const G3 = ['low', 'mid', 'high'];
  const L = 'fill="#fff" stroke="#432" stroke-width="1" stroke-linejoin="round" stroke-linecap="round"';
  const CUT = 'fill="none" stroke="#d93a3a" stroke-width="1"';
  const FOLD = 'fill="none" stroke="#432" stroke-width=".5" stroke-dasharray="2.5 1.5"';
  const blank = (w) => `<span style="display:inline-block;border-bottom:.4mm solid #432;width:${w}mm"></span>`;
  const legend = `<div style="display:flex;gap:6mm;font-size:9.5pt;flex:none;align-items:center"><span><svg width="40" height="8"><path d="M0 4h40" stroke="#432" stroke-width="2"/></svg> 오리는 선</span><span><svg width="40" height="8"><path d="M0 4h40" stroke="#432" stroke-width="1.5" stroke-dasharray="6 4"/></svg> 접는 선</span><span><svg width="40" height="8"><path d="M0 4h40" stroke="#d93a3a" stroke-width="2.5"/></svg> 칼집(가위집) 내는 선</span></div>`;
  const KIND = ['먼저 인사하기', '친구 칭찬 한 가지', '교실 쓰레기 3개 줍기', '고마운 사람에게 쪽지 쓰기', '급식 골고루 먹기', '친구 이야기 끝까지 듣기', '가족 안아 주기', '친구 책상 정리 돕기', '「고마워」 다섯 번 말하기', '혼자 있는 친구에게 말 걸기', '실내화 가지런히 놓기', '선생님께 감사 인사', '양보 한 번 하기', '집안일 한 가지 돕기', '웃는 얼굴로 하루 보내기', '필요한 친구에게 빌려주기', '친구의 좋은 점 찾아 말하기', '뒷사람 위해 문 잡아 주기', '동생·후배 도와주기', '고운 말만 쓰기', '내 물건 스스로 챙기기', '가족에게 사랑한다고 말하기', '크리스마스 카드 쓰기', '나 자신 칭찬하기'];

  /* ───────── 만들기 ───────── */
  const D3 = [['tree', '입체 트리', 'tree', [860, 1046], '스스로 서는 트리'], ['snowman', '입체 눈사람', 'snowman', [860, 1032], '스스로 서는 눈사람'], ['star', '입체 별 오너먼트', 'star', [928, 930], '실을 달아 거는 별'], ['bauble', '입체 공 오너먼트', 'ornament', [748, 922], '실을 달아 거는 공 장식']];
  reg({
    id: 'craft3d', title: '끼워 만드는 입체 장식', cat: 'make', grades: G3, icon: 'tree', paper: '도화지',
    desc: '똑같은 그림 두 장을 열십자로 끼우면 입체가 돼요. 세우는 트리·눈사람, 거는 별·공 오너먼트 4종.',
    gen() {
      return D3.map(([f, t, ic, [iw, ih], kind]) => {
        const h = Math.min(120, 86 * ih / iw), w = h * iw / ih, top = 6;
        const copy = (cx, fromTop, lab) => `<image href="${XArt.img('d3/' + f + '.png')}" x="${(cx - w / 2).toFixed(2)}" y="${top}" width="${w.toFixed(2)}" height="${h.toFixed(2)}" preserveAspectRatio="none"/>` +
          `<path d="M${cx} ${fromTop ? top - 2 : top + h + 2} V${(top + h / 2).toFixed(2)}" stroke="#d93a3a" stroke-width="1.6"/><circle cx="${cx}" cy="${(top + h / 2).toFixed(2)}" r="1.4" fill="#d93a3a"/>` +
          txt(cx, top + h + 8, lab, 5.2, { fill: '#b52a2a' }) + txt(cx, top + h + 15, fromTop ? '빨간 선: 위에서 가운데까지 자르기' : '빨간 선: 아래에서 가운데까지 자르기', 3.8, { fill: '#555' });
        const body = legend + svg(186, top + h + 20, copy(47, true, '가') + copy(139, false, '나'), `style="flex:none;height:${top + h + 20}mm"`) + SH.steps([
          ['', '그림 두 장을 색칠해요. 앞뒤가 다 보이니 <strong>뒷면도</strong> 칠하면 더 예뻐요.'],
          ['', '바깥 테두리를 따라 오리고, 빨간 선을 가위로 잘라요. 가위 날로 한 번 더 살짝 잘라 <strong>종이 두께만큼 틈</strong>을 내요.'],
          ['', `「가」를 거꾸로 들고 「나」의 틈에 위에서부터 끼워 내려요. 두 장이 열십자(+)가 되면 완성! ${kind.includes('거는') ? '꼭대기에 구멍을 뚫어 실을 달아요.' : '책상 위에 세워 보세요.'}`],
        ]);
        return page(this, { title: `${t} (${kind})`, icon: ic, sub: '두 장의 그림은 완전히 똑같고, 빨간 선은 정확히 가운데에 있어요. 「가」는 위쪽 절반, 「나」는 아래쪽 절반을 잘라 서로 끼워요.', body, tip: '도화지(180g 이상)에 인쇄해야 쓰러지지 않아요. 크기를 141%로 확대 복사하면 교실 장식용 큰 트리가 돼요.' });
      });
    }
  });
  reg({
    id: 'wish-ornaments', title: '소원 오너먼트', cat: 'make', grades: G3, icon: 'ornament',
    desc: '귀여운 테두리 오너먼트 4종에 소원·고마운 사람·새해 다짐·친구에게 한마디를 적어 트리에 걸어요.',
    gen() {
      const W = 172, H = W * 1280 / 960, x0 = (186 - W) / 2;
      const L = [['나의 소원', .25, .19], ['올해 고마운 사람', .75, .2], ['새해 다짐', .25, .735], ['친구에게 한마디', .75, .765]];
      const s2 = `<image href="${XArt.page('wishorn.png')}" x="${x0}" y="0" width="${W}" height="${H}"/>` + L.map(([t, fx, fy]) => txt(x0 + fx * W, fy * H, t, 5.4, { fill: '#b52a2a' })).join('');
      return [page(this, { sub: '오너먼트 가운데 빈칸에 글을 쓰고, 테두리 그림을 색칠한 뒤 오려요. 고리에 구멍을 뚫어 끈을 달면 완성!', body: svg(186, H, s2, `style="flex:1;min-height:0"`), tip: '교실 트리나 창문에 모두의 오너먼트를 걸어 「우리 반 소원 트리」를 만들어 보세요.' })];
    }
  });
  reg({
    id: 'santa-beard', title: '산타 수염 카운트다운', cat: 'make', grades: ['low', 'mid'], icon: 'santa',
    desc: '12월 1일부터 하루에 솜 하나씩! 수염이 다 차면 크리스마스가 와요. 해외 교실의 인기 달력.',
    gen() {
      let s = artG('santa', 38, 0, 110, { line: true, sw: 3.2 }) + `<path d="M20 96 Q4 214 93 226 Q182 214 166 96" ${L} fill="none" stroke-width="1.2"/>`, n = 1;
      [[5, 118], [6, 138], [5, 158], [4, 178], [3, 198], [1, 215]].forEach(([c, y]) => range(c, i => { const x = 93 + (i - (c - 1) / 2) * 21; s += `<circle cx="${x}" cy="${y}" r="9" ${L} stroke-width=".7"/>${txt(x, y + .4, n++, 6.2, { fill: '#b52a2a' })}`; }));
      return [page(this, { sub: '오늘 날짜의 동그라미에 솜(또는 흰 스티커)을 붙여요. 24까지 채우면 산타 수염 완성!', body: svg(186, 232, s), tip: '솜이 없으면 흰 색종이를 구겨 붙이거나 흰 크레파스로 칠해도 좋아요. 12월 중순에 시작한다면 지난 날짜는 한꺼번에 붙이고 시작하세요.' })];
    }
  });
  reg({
    id: 'headband', title: '루돌프 머리띠', cat: 'make', grades: ['low', 'mid'], icon: 'rudolph', paper: '도화지',
    desc: '뿔 2개와 띠를 오려 붙이면 루돌프 변신 완료. 캐럴 율동·사진 촬영 소품으로!',
    gen() {
      const band = (y, t) => `<rect x="1" y="${y}" width="184" height="26" rx="2" ${L}/><rect x="1" y="${y}" width="14" height="26" fill="#eee" stroke="#432" stroke-width=".5"/>${txt(8, y + 13, '풀칠', 3.2, { rot: -90 })}${['holly', 'star', 'snowflake', 'cane', 'bell', 'star', 'holly', 'snowflake'].map((n, i) => artG(n, 22 + i * 20, y + 3, 20, { line: true })).join('')}${txt(180, y + 13, t, 3.6, { rot: -90 })}`;
      const s = `<image href="${XArt.page('antlers.png')}" x="13" y="0" width="160" height="120" preserveAspectRatio="xMidYMid meet"/>` + txt(93, 122, '뿔 2개 · 귀 2개 · 빨간 코 1개', 4.2, { fill: '#777' }) + band(130, '가') + band(160, '나') + band(190, '다');
      return [page(this, { sub: '① 색칠 → ② 오리기 → ③ 띠 「가·나·다」를 이어 머리둘레에 맞게 붙이기 → ④ 뿔과 귀를 띠 안쪽에 붙이기', body: svg(186, 218, s), tip: '빨간 코는 양면테이프로 코에 살짝! 뿔 뒤에 빨대를 붙이면 처지지 않아요.' })];
    }
  });
  const cube = (faces) => {
    const a = 43, x0 = 7, y0 = 12, P = [[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]]; let s = '';
    const tab = (x1, y1, x2, y2, nx, ny) => `<path d="M${x1} ${y1} L${x1 + (x2 - x1) * .15 + nx * 7} ${y1 + (y2 - y1) * .15 + ny * 7} L${x1 + (x2 - x1) * .85 + nx * 7} ${y1 + (y2 - y1) * .85 + ny * 7} L${x2} ${y2}" fill="#eee" stroke="#432" stroke-width=".8"/>`;
    const X = (c) => x0 + c * a, Y = (r) => y0 + r * a;
    s += tab(X(1), Y(0), X(2), Y(0), 0, -1) + tab(X(1), Y(0), X(1), Y(1), -1, 0) + tab(X(2), Y(0), X(2), Y(1), 1, 0) + tab(X(1), Y(2), X(1), Y(3), -1, 0) + tab(X(2), Y(2), X(2), Y(3), 1, 0) + tab(X(1), Y(3), X(2), Y(3), 0, 1) + tab(X(0), Y(1), X(0), Y(2), -1, 0);
    const NUM = [1, 2, 3, 5, 4, 6];
    P.forEach(([c, r], i) => { const [ic, t] = faces[NUM[i] - 1]; s += `<rect x="${X(c)}" y="${Y(r)}" width="${a}" height="${a}" fill="#fff" stroke="#432" stroke-width=".5" stroke-dasharray="2.5 1.5"/>` + artG(ic, X(c) + a / 2 - 9, Y(r) + 4, 20, { line: true }) + t.split('\n').map((q, k) => txt(X(c) + a / 2, Y(r) + 29 + k * 5.6, q, 4.4)).join('') + `<circle cx="${X(c) + 7}" cy="${Y(r) + 7}" r="5.2" fill="#d93a3a"/>` + txt(X(c) + 7, Y(r) + 7.4, NUM[i], 7, { fill: '#fff' }); });
    s += `<path d="M${X(1)} ${Y(0)} H${X(2)} M${X(1)} ${Y(3)} H${X(2)} M${X(0)} ${Y(1)} H${X(1)} M${X(2)} ${Y(1)} H${X(4)} V${Y(2)} H${X(2)} M${X(0)} ${Y(2)} H${X(1)} M${X(0)} ${Y(1)} V${Y(2)} M${X(1)} ${Y(0)} V${Y(1)} M${X(2)} ${Y(0)} V${Y(1)} M${X(1)} ${Y(2)} V${Y(3)} M${X(2)} ${Y(2)} V${Y(3)}" fill="none" stroke="#432" stroke-width="1"/>`;
    return svg(186, 152, s);
  };
  reg({
    id: 'mission-cube', title: '미션 주사위 말판 놀이', cat: 'make', grades: G3, icon: 'gift', paper: '도화지',
    desc: '숫자와 미션이 함께 적힌 주사위 2종 + 말판. 나온 숫자만큼 가고, 윗면의 미션도 해요!',
    gen() {
      const A = [['santa', '산타처럼\n「호호호!」'], ['rudolph', '루돌프 코\n만지며 「반짝!」'], ['snowman', '눈사람처럼\n3초 얼음'], ['bell', '캐럴\n한 소절'], ['mitten', '옆 친구와\n하이파이브'], ['tree', '트리처럼\n반짝 춤']];
      const B = [['gift', '받고 싶은\n선물은?'], ['candle', '올해 고마운\n사람은?'], ['snowflake', '겨울에 좋아\n하는 것은?'], ['santa', '산타에게\n묻고 싶은 것?'], ['stocking', '내가 산타라면\n무슨 선물을?'], ['star', '새해에 하고\n싶은 일은?']];
      const dice = [[A, '미션 주사위 ① 몸 놀이', '숫자만큼 말을 옮기고, 윗면에 나온 몸 미션을 해요.'], [B, '미션 주사위 ② 마음 나누기', '숫자만큼 말을 옮기고, 윗면의 질문에 대답해요.']].map(([f, t, sb]) => page(this, { title: t, noname: true, sub: sb + ' 색칠 → 굵은 선 오리기 → 점선 접기 → 회색 날개에 풀칠해 붙이기.', body: legend + cube(f), tip: '마주 보는 면의 숫자를 더하면 7이 되는 진짜 주사위 배치예요. 도화지에 인쇄해야 잘 굴러가요.' }));
      const cols = 6, rows = 5, cw = 30, ch = 29, SPC = { 5: ['gift', '선물 칸\n2칸 앞으로'], 11: ['snowman', '눈사람 칸\n한 번 쉬기'], 16: ['rudolph', '루돌프 칸\n한 번 더!'], 21: ['gift', '선물 칸\n2칸 앞으로'], 25: ['snowman', '눈사람 칸\n한 번 쉬기'], 27: ['rudolph', '루돌프 칸\n한 번 더!'] };
      const tint = ['#ffe9e6', '#e2f4e8', '#fff3cf'], deco = ['star', 'bell', 'holly', 'cane', 'snowflake', 'ornament', 'mitten', 'candle'];
      let b2 = '';
      range(cols * rows, i => {
        const row = Math.floor(i / cols), c0 = i % cols, col = row % 2 ? cols - 1 - c0 : c0, x = 3 + col * cw, y = 3 + (rows - 1 - row) * ch, sp = SPC[i];
        b2 += `<rect x="${x + 1}" y="${y + 1}" width="${cw - 2}" height="${ch - 2}" rx="6" fill="${i === 0 ? '#e2f4e8' : i === 29 ? '#ffe08a' : sp ? '#fff' : tint[i % 3]}" stroke="#432" stroke-width="${sp ? 1.3 : .8}"/>`;
        if (i === 0) b2 += artG('santa', x + 6, y + 2, 18) + txt(x + 15, y + 23, '출발', 4.6);
        else if (i === 29) b2 += artG('tree', x + 6, y + 2, 18) + txt(x + 15, y + 23, '도착!', 4.6);
        else if (sp) b2 += artG(sp[0], x + 2, y + 6, 12) + sp[1].split('\n').map((q, k) => txt(x + 20.5, y + 11 + k * 5, q, 3.5)).join('') + txt(x + 5.5, y + 5.5, i, 3.6, { fill: '#b52a2a' });
        else b2 += txt(x + 6, y + 6.5, i, 4, { fill: '#b52a2a' }) + artG(deco[i % deco.length], x + 9, y + 8, 13, { line: true });
      });
      const tok = ['santa', 'rudolph', 'snowman', 'penguin'].map((n2, i) => `<g transform="translate(${10 + i * 44} 0)"><circle cx="15" cy="15" r="14" fill="#fff" stroke="#432" stroke-width=".7" stroke-dasharray="2 1.2"/>${artG(n2, 4, 4, 22)}</g>`).join('');
      const board = page(this, { title: '미션 주사위 말판', noname: true, sub: '① 주사위를 굴려 나온 숫자만큼 가요. ② 주사위 윗면의 미션을 해요(못 하면 한 칸 뒤로!). ③ 그림 칸에 서면 그 칸의 규칙을 따라요. ④ 트리에 먼저 도착하면 승리!', body: svg(186, 151, b2, 'style="flex:none;height:151mm"') + `<div class="q">✂ 말 — 오려서 지우개에 붙여 세워요</div>` + svg(186, 30, tok, 'style="flex:none;height:30mm"'), tip: '모둠마다 주사위 하나와 말판 하나면 돼요. 「몸 놀이」 주사위와 「마음 나누기」 주사위를 번갈아 써도 재미있어요.' });
      return [...dice, board];
    }
  });
  reg({
    id: 'thaumatrope', title: '빙글빙글 착시 장난감 (소마트로프)', cat: 'make', grades: G3, icon: 'snowman', paper: '도화지',
    desc: '앞뒤 그림이 하나로 합쳐 보이는 착시 장난감. 큰 원 4쌍: 스노우볼 속 눈사람, 굴뚝 속 산타, 트리 꾸미기, 선물 가득 양말.',
    gen() {
      const R = 38, T = XArt.thauma, LL = (n) => XArt.src(n, true);
      const im = (href, x, y, w, h) => `<image href="${href}" x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${w.toFixed(2)}" height="${h.toFixed(2)}" preserveAspectRatio="none"/>`;
      const PAIRS = [
        ['스노우볼 속 눈사람', (cx, cy) => im(T('globe'), cx - 25.9, cy - 33, 51.8, 66), (cx, cy) => im(T('snowman'), cx - 12.7, cy - 22, 25.3, 32)],
        ['굴뚝 속 산타', (cx, cy) => im(T('chimney'), cx - 27, cy - 8, 54, 45), (cx, cy) => `<svg x="${(cx - 20.5).toFixed(2)}" y="${(cy - 29.2).toFixed(2)}" width="40" height="26.4" viewBox="0 0 766 506" preserveAspectRatio="none"><image href="${T('santa')}" width="766" height="872"/></svg>`],
        ['트리 꾸미기', (cx, cy) => im(T('baretree'), cx - 27.3, cy - 34, 54.5, 68), (cx, cy) => { const x0 = cx - 27.3, y0 = cy - 34; return im(LL('star'), cx - 8, y0 - 6, 16, 16) + [[.44, .25, 'ornament'], [.58, .34, 'bell'], [.37, .45, 'ornament'], [.63, .55, 'candy'], [.3, .63, 'bell'], [.52, .66, 'ornament'], [.7, .74, 'ornament'], [.4, .79, 'cane']].map(([fx, fy, n]) => im(LL(n), x0 + fx * 54.5 - 5.5, y0 + fy * 68 - 5.5, 11, 11)).join(''); }],
        ['선물 가득 양말', (cx, cy) => im(LL('stocking'), cx - 23, cy - 22, 46, 60), (cx, cy) => im(LL('cane'), cx - 19, cy - 33, 13, 19) + im(LL('gift'), cx - 8, cy - 31, 17, 17) + im(LL('teddy'), cx + 7, cy - 30, 14, 16)],
      ];
      const pair = (cy, [t, A, B]) => `<circle cx="${93 - R}" cy="${cy}" r="${R}" fill="#fff" stroke="#432" stroke-width="1"/><circle cx="${93 + R}" cy="${cy}" r="${R}" fill="#fff" stroke="#432" stroke-width="1"/>` +
        `<clipPath id="ca${cy}"><circle cx="${93 - R}" cy="${cy}" r="${R - .6}"/></clipPath><clipPath id="cb${cy}"><circle cx="${93 + R}" cy="${cy}" r="${R - .6}"/></clipPath>` +
        `<g clip-path="url(#ca${cy})">${A(93 - R, cy)}</g><g clip-path="url(#cb${cy})">${B(93 + R, cy)}</g><path d="M93 ${cy - 12} v24" ${FOLD}/>` + txt(8, cy, t, 4.8, { fill: '#1c6146', rot: -90 }) + txt(93 - R, cy + R + 4.5, '앞면', 3.8, { fill: '#777' }) + txt(93 + R, cy + R + 4.5, '뒷면', 3.8, { fill: '#777' });
      const how = `<div class="tip" style="background:#f3fbf6;border-color:#bfe6cd"><b style="color:#1c6146">만드는 법</b> ① 색칠하고 두 원을 붙은 채로 오려요 → ② 가운데 점선을 접어 두 그림이 등을 맞대게 해요 → ③ 사이에 빨대(나무젓가락)를 세로로 끼우고 풀로 붙여요 → ④ 빨대를 두 손바닥 사이에 끼우고 빠르게 비벼 돌려요!</div>`;
      return [0, 1].map(k => page(this, { title: `빙글빙글 착시 장난감 ${k + 1}`, sub: '빠르게 돌리면 앞면과 뒷면 그림이 하나로 합쳐져요. 두 그림은 서로 딱 맞는 자리에 그려져 있으니 위치를 바꾸지 말고 그대로 오려요.', body: svg(186, 172, pair(43, PAIRS[k * 2]) + pair(128, PAIRS[k * 2 + 1]), 'style="flex:none;height:172mm"') + how, tipLabel: '왜 그럴까?', tip: '우리 눈은 방금 본 모습을 아주 잠깐(약 1/16초) 기억해요. 두 그림이 빠르게 번갈아 보이면 뇌가 하나로 합쳐 버리지요. 이것을 「잔상」이라고 하고, 만화 영화도 같은 원리예요.' }));
    }
  });
  reg({
    id: 'popup-card', title: '불쑥! 팝업 카드', cat: 'make', grades: ['mid', 'high'], icon: 'gift', paper: '도화지',
    desc: '가위집 세 번으로 만드는 계단 팝업 카드. 트리·선물·눈사람 붙임 조각 포함.',
    gen() {
      const tabs = [[30, 16], [80, 24], [130, 12]];
      let s = `<rect x="1" y="1" width="184" height="130" rx="2" ${L}/><path d="M1 66 H185" ${FOLD}/>${txt(93, 12, '안쪽 면 (윗부분: 배경을 그려요)', 3.8, { fill: '#999' })}${txt(93, 124, '아랫부분: 눈밭·인사말을 써요', 3.8, { fill: '#999' })}`;
      tabs.forEach(([x, l], i) => { s += `<path d="M${x} ${66 - l} V${66 + l} M${x + 26} ${66 - l} V${66 + l}" ${CUT} stroke-width="1.4"/><path d="M${x} ${66 - l} h26 M${x} ${66 + l} h26" ${FOLD}/>${txt(x + 13, 66 + l / 2, '붙이는 곳', 3)}`; });
      s += artG('tree', 4, 138, 52, { line: true, sw: 3.6 }) + artG('gift', 66, 146, 40, { line: true, sw: 4 }) + artG('snowman', 114, 138, 50, { line: true, sw: 3.6 }) + artG('star', 164, 150, 22, { line: true, sw: 5 });
      return [page(this, { sub: '① 붙임 조각을 색칠해 오려요 → ② 카드를 반으로 접고 빨간 선 6개를 자르기 → ③ 펼쳐서 잘린 띠를 안쪽으로 밀어 계단 만들기 → ④ 계단 앞면에 조각 붙이기', body: legend + svg(186, 194, s), tip: '겉표지는 색도화지를 반 접어 덧붙이면 뒤가 뚫려 보이지 않아요. 가위집 길이가 다르면 앞뒤로 입체감이 생깁니다.' })];
    }
  });
  reg({
    id: 'snowglobe', title: '내가 스노우글로브 속에 산다면', cat: 'write', grades: G3, icon: 'snowman',
    desc: '스노우글로브 안의 내 모습을 그리고 상상 글을 써요. 미국 교실의 대표 겨울 글쓰기!',
    gen() {
      const s = `<circle cx="93" cy="76" r="72" ${L} stroke-width="1.4"/><path d="M42 132 H144 L156 160 H30Z" ${L} stroke-width="1.4"/><path d="M40 146 h106" stroke="#432" stroke-width=".6"/><path d="M34 112 Q70 96 100 110 T152 108" fill="none" stroke="#bfb1a5" stroke-width=".6" stroke-dasharray="2 2"/>${txt(93, 152, '이름:                    ', 5)}`;
      return [page(this, { sub: '유리구슬 안에 갇혔다고 상상해 보세요. 무엇이 보이나요? 누가 구슬을 흔들면 어떤 일이 벌어질까요?', body: svg(186, 164, s, 'style="flex:none;height:150mm"') + `<div class="q">내가 스노우글로브 속에 산다면…</div><div class="lines"></div>`, tip: '저학년은 그림 + 한두 문장, 고학년은 오감(보이는 것·들리는 것·느낌)을 넣어 한 문단으로. 얼굴 사진을 오려 붙이면 훨씬 재미있어요.' })];
    }
  });
  reg({
    id: 'kind-chain', title: '친절 종이 고리 달력', cat: 'make', grades: G3, icon: 'wreath',
    desc: '24가지 친절 미션이 적힌 종이 고리. 하루에 하나씩 떼어 실천하면 크리스마스가 와요.',
    gen() {
      return range(2, p => { let s = ''; range(12, i => { const n = p * 12 + i, y = 1 + i * 19; s += `<rect x="1" y="${y}" width="184" height="18" fill="#fff" stroke="#432" stroke-width=".6" stroke-dasharray="3 1.5"/><rect x="1" y="${y}" width="12" height="18" fill="#eee" stroke="none"/>${txt(7, y + 9, '풀', 3.4)}<circle cx="26" cy="${y + 9}" r="7" ${L} stroke-width=".7"/>${txt(26, y + 9.3, n + 1, 6, { fill: '#b52a2a' })}${txt(40, y + 9.3, KIND[n], 6.4, { a: 'start' })}${artG(XArt.NAMES[n % 20], 166, y + 2, 14, { line: true, sw: 6 })}`; }); return page(this, { title: `친절 종이 고리 달력 (${p + 1}/2)`, sub: '띠를 오려 색칠하고, 24번부터 1번까지 고리로 이어 걸어요. 매일 하나씩 떼어 미션 실천!', body: svg(186, 230, s) }); });
    }
  });
  reg({
    id: 'kind-calendar', title: '친절 어드벤트 달력', cat: 'write', grades: G3, icon: 'candle',
    desc: '12월 1일~24일, 하루 한 가지 친절 미션. 실천한 칸을 색칠해요. (영미권 「Kindness Advent」)',
    gen() {
      let s = ''; range(24, i => { const x = 1 + (i % 4) * 46.2, y = 1 + Math.floor(i / 4) * 37.5, w = KIND[i].length > 9 ? [KIND[i].slice(0, KIND[i].lastIndexOf(' ', 9) > 0 ? KIND[i].lastIndexOf(' ', 9) : 8), KIND[i].slice((KIND[i].lastIndexOf(' ', 9) > 0 ? KIND[i].lastIndexOf(' ', 9) : 8)).trim()] : [KIND[i]]; s += `<rect x="${x}" y="${y}" width="44" height="35.5" rx="4" ${L} stroke-width=".8"/><circle cx="${x + 9}" cy="${y + 9}" r="6.5" ${L} stroke-width=".7"/>${txt(x + 9, y + 9.3, i + 1, 5.6, { fill: '#b52a2a' })}${artG(XArt.NAMES[(i * 7) % 20], x + 28, y + 2, 13, { line: true, sw: 6 })}${w.map((q, k) => txt(x + 22, y + 22 + k * 5.4 + (w.length === 1 ? 2.5 : 0), q, 4.2)).join('')}`; });
      return [page(this, { sub: '오늘 날짜의 미션을 실천하고 그 칸을 예쁘게 색칠해요. 24칸이 모두 채워지면 내 마음이 가장 큰 선물!', body: svg(186, 226, s) })];
    }
  });
  reg({
    id: 'coupons', title: '마음 선물 쿠폰북', cat: 'make', grades: G3, icon: 'stocking',
    desc: '돈 안 드는 최고의 선물! 가족·친구에게 주는 쿠폰 8장.',
    gen() {
      const C = [['mitten', '안마 10분'], ['cocoa', '설거지 돕기'], ['bell', '심부름 1회'], ['star', '방 청소'], ['gift', '소원 한 가지'], ['santa', '안아 주기 무제한'], ['snowman', '함께 놀기 30분'], ['ornament', '자유 쿠폰:']];
      const s = C.map(([ic, t], i) => { const x = 1 + (i % 2) * 93, y = 1 + Math.floor(i / 2) * 57; return `<rect x="${x}" y="${y}" width="91" height="55" rx="5" fill="#fff" stroke="#432" stroke-width=".8" stroke-dasharray="3 1.5"/><rect x="${x + 3}" y="${y + 3}" width="85" height="49" rx="3" fill="none" stroke="#d93a3a" stroke-width=".6"/>${artG(ic, x + 6, y + 8, 26, { line: true, sw: 4.5 })}${txt(x + 60, y + 13, '크리스마스 쿠폰', 3.6, { fill: '#b52a2a' })}${txt(x + 60, y + 24, t, 6.6)}${txt(x + 36, y + 37, '받는 사람', 3.2, { a: 'start', fill: '#777' })}<path d="M${x + 52} ${y + 39} h32 M${x + 52} ${y + 47} h32" stroke="#432" stroke-width=".3"/>${txt(x + 36, y + 45, '주는 사람', 3.2, { a: 'start', fill: '#777' })}`; }).join('');
      return [page(this, { noname: true, sub: '색칠해서 오린 뒤 왼쪽을 스테이플러로 찍으면 쿠폰북 완성. 마지막 장은 내가 정하는 자유 쿠폰!', body: svg(186, 230, s) })];
    }
  });
  reg({
    id: 'bookmarks', title: '컬러링 책갈피', cat: 'make', grades: G3, icon: 'holly', paper: '도화지',
    desc: '색칠해서 쓰는 책갈피 4종. 겨울방학 독서 선물로 좋아요.',
    gen() {
      const s = ['santa', 'rudolph', 'tree', 'penguin'].map((n, i) => { const x = 2 + i * 46.5; return `<rect x="${x}" y="1" width="42" height="200" rx="6" ${L}/><circle cx="${x + 21}" cy="10" r="3" ${L}/>${artG(n, x + 3, 18, 36, { line: true, sw: 4 })}${range(5, k => `<polygon points="${starPts(x + 21 + (k % 2 ? 9 : -9), 70 + k * 15, 5, 2.2)}" ${L} stroke-width=".5"/>`).join('')}${artG(XArt.NAMES[8 + i * 2], x + 8, 142, 26, { line: true, sw: 5 })}<path d="M${x + 6} 190 h30" stroke="#432" stroke-width=".4"/>${txt(x + 21, 180, '겨울에 읽은 책', 3.4, { fill: '#777' })}`; }).join('');
      return [page(this, { noname: true, sub: '색칠 → 오리기 → 구멍에 리본 끈 달기. 아래 줄에는 겨울에 읽고 싶은 책 제목을 써요.', body: svg(186, 204, s) })];
    }
  });
  reg({
    id: 'finger-puppets', title: '손가락 인형 극장', cat: 'make', grades: ['low', 'mid'], icon: 'penguin', paper: '도화지',
    desc: '띠를 손가락에 감아 끼우는 인형 4종. 짝과 즉흥 인형극을 해 봐요.',
    gen() {
      const s = ['santa', 'rudolph', 'snowman', 'penguin', 'elf', 'ginger'].map((n, i) => { const x = 4 + (i % 2) * 93, y = 2 + Math.floor(i / 2) * 76; return `<circle cx="${x + 42}" cy="${y + 28}" r="27" ${L} stroke-dasharray="3 1.5" stroke-width=".7"/>${artG(n, x + 20, y + 6, 44, { line: true, sw: 3.8 })}<rect x="${x + 2}" y="${y + 54}" width="80" height="13" ${L} stroke-width=".7" stroke-dasharray="3 1.5"/><rect x="${x + 2}" y="${y + 54}" width="10" height="13" fill="#eee" stroke="none"/>${txt(x + 7, y + 60.5, '풀', 3.2)}`; }).join('');
      return [page(this, { noname: true, sub: '색칠해서 동그라미째 오리고, 아래 띠를 손가락 굵기에 맞게 말아 붙여요. 「산타와 루돌프의 대화」를 지어 공연해요!', body: svg(186, 230, s) })];
    }
  });
  reg({
    id: 'certificate', title: '착한 어린이 인증서', cat: 'write', grades: G3, icon: 'bell',
    desc: '산타 마을에서 온 인증서. 선생님이 칭찬할 점을 적어 한 명씩 수여해요. 친구끼리 써 줘도 좋아요.',
    gen() {
      const s = `<rect x="2" y="2" width="182" height="232" rx="6" fill="#fffdf5" stroke="#d93a3a" stroke-width="2"/><rect x="7" y="7" width="172" height="222" rx="4" fill="none" stroke="#2e9e5b" stroke-width=".8" stroke-dasharray="1 2.4" stroke-linecap="round"/>
        ${[[8, 8, 0], [150, 8, 0], [8, 200, 0], [150, 200, 0]].map(([x, y]) => artG('holly', x, y, 28)).join('')}
        ${txt(93, 34, '착한 어린이 인증서', 15, { fill: '#b52a2a' })}${txt(93, 48, 'CERTIFICATE OF KINDNESS', 4, { fill: '#2e9e5b', extra: 'letter-spacing="1.2"' })}
        ${txt(52, 72, '이름', 6, { fill: '#777' })}<path d="M64 76 h78" stroke="#432" stroke-width=".5"/>
        ${txt(93, 94, '위 어린이는 올 한 해 동안', 6)}
        <rect x="26" y="102" width="134" height="34" rx="4" fill="#fff" stroke="#bfb1a5" stroke-width=".5" stroke-dasharray="2 1.5"/>${txt(93, 108, '칭찬할 점', 3.4, { fill: '#aaa' })}
        ${txt(93, 148, '하여 친구와 가족을 기쁘게 하였으므로', 6)}${txt(93, 159, '산타 마을의 이름으로 이 증서를 드립니다.', 6)}
        ${txt(93, 178, '12월 25일', 6.4)}${artG('santa', 24, 186, 40)}${artG('rudolph', 122, 186, 40)}${txt(93, 200, '산타클로스', 7.4)}
        <circle cx="93" cy="214" r="9" fill="none" stroke="#d93a3a" stroke-width="1"/>${txt(93, 214.3, '산타', 4.6, { fill: '#d93a3a' })}`;
      return [`<section class="page"><div class="pb">${svg(186, 236, s)}</div><footer class="pf"><span>크리스마스 활동 키트</span><span>전 학년 · 인증서</span></footer></section>`];
    }
  });
  reg({
    id: 'snow-dressup', title: '눈사람 옷 입히기', cat: 'make', grades: ['low', 'mid'], icon: 'snowman', paper: '도화지',
    desc: '모자·목도리·장갑·코·단추를 골라 오려 붙여 나만의 눈사람을 꾸며요.',
    gen() { return [page(this, { sub: '오른쪽 조각들을 색칠하고 오려서 왼쪽 눈사람에게 입혀 주세요. 어떤 눈사람이 될까요?', body: SH.full('snowdoll.png'), tip: '조각을 바로 붙이지 말고 여러 번 바꿔 입혀 본 뒤 마음에 드는 모습으로 붙여요. 짝과 조각을 바꿔 써도 좋아요.' })]; }
  });
  reg({
    id: 'gift-tags', title: '선물 이름표 만들기', cat: 'make', grades: G3, icon: 'gift',
    desc: '귀여운 그림이 있는 선물 이름표(태그) 8종. 색칠하고 이름을 써서 선물에 달아요.',
    gen() { return [page(this, { noname: true, sub: '색칠하고 오린 뒤, 빈칸에 「받는 사람」과 「주는 사람」 이름을 써요. 구멍에 끈을 끼워 선물에 달아요.', body: SH.full('tags.png'), tip: '마음 선물 쿠폰북이나 직접 만든 카드와 함께 쓰면 좋아요.' })]; }
  });
  reg({
    id: 'card-covers', title: '크리스마스 카드 표지 컬러링', cat: 'color', grades: G3, icon: 'letter',
    desc: '굴뚝 산타, 눈사람 가족, 눈 오는 집, 선물 든 순록 — 카드 앞면 그림 4종.',
    gen() { return [page(this, { noname: true, sub: '마음에 드는 그림을 색칠해서 오리고, 반으로 접은 색도화지 앞면에 붙이면 카드가 돼요. 안쪽에는 고마운 마음을 적어요.', body: SH.full('cards.png'), tip: '「산타에게 보내는 편지」 활동지와 이어서 하면 좋아요.' })]; }
  });
  reg({
    id: 'paper-ornaments', title: '오려 거는 종이 오너먼트', cat: 'make', grades: G3, icon: 'ornament', paper: '도화지',
    desc: '공·물방울·종·과자 집·별·장갑 모양 오너먼트 6종. 색칠해서 오려 트리에 걸어요.',
    gen() { return [page(this, { noname: true, sub: '색칠하고 바깥선을 따라 오린 뒤, 고리에 구멍을 뚫어 끈을 달아요. 뒷면에 이름을 쓰면 우리 반 트리 장식이 돼요.', body: SH.full('ornacut.png'), tip: '반짝이 풀이나 스팽글을 붙이면 훨씬 화려해져요.' })]; }
  });
  reg({
    id: 'cookie-design', title: '나만의 쿠키 꾸미기', cat: 'color', grades: ['low', 'mid'], icon: 'ginger',
    desc: '진저맨·별·트리·양말·종·장갑 쿠키에 아이싱 무늬를 디자인해요.',
    gen() { return [page(this, { sub: '쿠키 제빵사가 되어 볼까요? 빈 쿠키에 아이싱 무늬, 단추, 표정을 그려 넣고 맛있게 색칠해요.', body: SH.full('cookies.png'), tip: '완성한 쿠키에 이름과 가격을 붙여 「교실 쿠키 가게」 놀이로 이어 가 보세요.' })]; }
  });

  /* ───────── 종이접기 ───────── */
  const R = '#ffc9c4', W = '#ffffff', Gc = '#bfe6cd', Bc = '#e3c3a4';
  const D = (inner) => svg(60, 50, `<g stroke="#432" stroke-width=".7" stroke-linejoin="round" stroke-linecap="round">${inner}</g>`);
  const dash = (d) => `<path d="${d}" fill="none" stroke-dasharray="2 1.4" stroke-width=".55"/>`;
  const mtn = (d) => `<path d="${d}" fill="none" stroke-dasharray="3 1 .6 1" stroke-width=".55" stroke="#d93a3a"/>`;
  const arrow = (d) => `<path d="${d}" fill="none" stroke="#d93a3a" stroke-width=".9" marker-end="url(#ah)"/>`;
  const defs = `<svg width="0" height="0" style="position:absolute"><defs><marker id="ah" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10Z" fill="#d93a3a"/></marker></defs></svg>`;
  const ORIPHOTO = { 'ori-hat': ['santa', '산타 모자를 접어 얼굴을 붙이면 산타 완성!'], 'ori-reindeer': ['reindeer', '갈색 색종이 한 장이면 루돌프 얼굴!'], 'ori-bookmark': ['bookmark', '책 모서리에 쏙 끼우는 루돌프 책갈피'], 'ori-tree': ['tree', '세모 세 개를 겹친 트리'], 'snowflake-cut': ['snowflake', '펼치면 여섯 갈래 눈꽃'] };
  const oriPage = (self, o) => { const [ph, cap] = ORIPHOTO[self.id] || ['tree', '']; return page(self, { ...o, body: defs + `<div style="display:flex;gap:5mm;align-items:center;flex:none;background:#fffdf8;border:.4mm solid #ead9bf;border-radius:4mm;padding:2.5mm"><img src="${XArt.img('ori/' + ph + '.jpg')}" alt="" style="height:36mm;width:auto;border-radius:3mm;background:#fff"><div style="display:flex;flex-direction:column;gap:2mm"><div class="h3" style="font-size:15pt">완성하면 이런 모습!</div><div style="font-size:11pt">${cap}</div><div style="display:flex;gap:4mm;font-size:9.5pt;flex-wrap:wrap"><span>┄┄ 골짜기 접기(앞으로)</span><span style="color:#d93a3a">─·─ 산 접기(뒤로)</span><span style="color:#d93a3a">→ 접는 방향</span></div></div></div>` + steps(o.st, o.cls || '') + (o.extra || '') }); };
  reg({
    id: 'ori-hat', title: '종이접기: 산타 모자', cat: 'ori', grades: ['low', 'mid'], icon: 'hat', paper: '빨간 색종이',
    desc: '세 번만 접으면 완성! 얼굴을 그려 붙이면 산타 카드가 돼요.',
    gen() {
      const st = [
        [D(`<rect x="10" y="5" width="40" height="40" fill="${R}"/>${dash('M10 37 H50')}${arrow('M30 47 Q38 42 30 35')}`), '빨간 면이 보이게 놓고, 아래를 손가락 한 마디만큼 위로 접어요.'],
        [D(`<rect x="10" y="5" width="40" height="32" fill="${R}"/><rect x="10" y="29" width="40" height="8" fill="${W}"/>${mtn('M30 5 L10 37 M30 5 L50 37')}${arrow('M14 9 Q8 16 12 24')}${arrow('M46 9 Q52 16 48 24')}`), '흰 띠가 생겼어요. 위쪽 두 모서리를 빨간 선을 따라 「뒤로」 접어요.'],
        [D(`<path d="M30 5 L10 37 L50 37Z" fill="${R}"/><path d="M15 29 L45 29 L50 37 L10 37Z" fill="${W}"/>`), '세모 모자가 되었어요!'],
        [D(`<path d="M24 14 L10 37 L50 37 L36 14Z" fill="${R}"/><path d="M24 14 L36 14 L44 22Z" fill="#ffaaa3"/><path d="M15 29 L45 29 L50 37 L10 37Z" fill="${W}"/><circle cx="45" cy="23" r="4" fill="${W}"/>`), '꼭대기를 옆으로 살짝 접고, 솜이나 흰 종이로 방울을 붙여요.'],
        [D(`<path d="M24 6 L12 26 L48 26 L36 6Z" fill="${R}"/><path d="M16 19 L44 19 L48 26 L12 26Z" fill="${W}"/><circle cx="42" cy="10" r="3.5" fill="${W}"/><path d="M15 26 Q15 46 30 47 Q45 46 45 26Z" fill="#ffe3cf"/><path d="M15 32 Q30 54 45 32 Q30 40 15 32Z" fill="${W}"/><circle cx="24" cy="31" r="1.2" fill="#432"/><circle cx="36" cy="31" r="1.2" fill="#432"/><circle cx="30" cy="35" r="2" fill="#ff8a80"/>`), '모자 아래에 얼굴과 수염을 그려 붙이면 산타 완성!'],
        [D(`${artG('santa', 15, 8, 30)}${txt(30, 44, '메리 크리스마스!', 4)}`), '카드에 붙이고 인사말을 써요.'],
      ];
      return [oriPage(this, { sub: '준비물: 빨간 색종이 1장(뒷면이 흰색), 풀, 솜 조금. 선을 손톱으로 꾹꾹 눌러 접어요.', st, tip: '색종이를 1/4 크기로 잘라 접으면 손가락 인형용 꼬마 모자가 돼요.' })];
    }
  });
  reg({
    id: 'ori-reindeer', title: '종이접기: 루돌프 얼굴', cat: 'ori', grades: ['low', 'mid'], icon: 'rudolph', paper: '갈색 색종이',
    desc: '강아지 접기를 응용한 루돌프. 빨간 코 스티커가 포인트!',
    gen() {
      const st = [
        [D(`<path d="M30 3 L54 25 L30 47 L6 25Z" fill="${Bc}"/>${dash('M6 25 H54')}${arrow('M36 6 Q44 22 36 42')}`), '마름모로 놓고 위 꼭짓점을 아래 꼭짓점에 맞춰 반으로 접어요.'],
        [D(`<path d="M6 10 L54 10 L30 40Z" fill="${Bc}"/>${dash('M20 10 L10 15 M40 10 L50 15')}${arrow('M7 7 Q4 16 11 20')}${arrow('M53 7 Q56 16 49 20')}`), '양쪽 귀퉁이를 비스듬히 아래로 접어 귀를 만들어요.'],
        [D(`<path d="M20 10 L40 10 L50 15 L30 40 L10 15Z" fill="${Bc}"/><path d="M20 10 L10 15 L11.6 21.2Z M40 10 L50 15 L48.4 21.2Z" fill="#c9a17a"/>${dash('M25.2 34 H34.8')}${arrow('M30 44 Q36 40 31 35')}`), '아래 뾰족한 끝을 조금 위로 접어 코 자리를 만들어요.'],
        [D(`<path d="M20 10 L40 10 L50 15 L34.8 34 L25.2 34 L10 15Z" fill="${Bc}"/><path d="M20 10 L10 15 L11.6 21.2Z M40 10 L50 15 L48.4 21.2Z" fill="#c9a17a"/><circle cx="30" cy="32" r="4" fill="#ef3b36"/><circle cx="24" cy="21" r="1.6" fill="#432"/><circle cx="36" cy="21" r="1.6" fill="#432"/><path d="M24 10 Q20 4 14 2 M22 6 Q18 6 16 8 M36 10 Q40 4 46 2 M38 6 Q42 6 44 8" fill="none" stroke-width="1.6"/>`), '눈을 그리고 빨간 코를 붙여요. 뿔은 그리거나 나뭇가지 모양 종이를 붙여요.'],
      ];
      return [oriPage(this, { sub: '준비물: 갈색 색종이 1장, 빨간 동그라미 스티커(또는 색종이), 사인펜.', st, cls: 'c2', tip: '여러 마리를 접어 줄에 붙이면 「산타 썰매 끄는 순록 가랜드」가 됩니다. 한 마리만 빨간 코!' })];
    }
  });
  reg({
    id: 'ori-bookmark', title: '종이접기: 루돌프 모서리 책갈피', cat: 'ori', grades: ['mid', 'high'], icon: 'rudolph', paper: '색종이',
    desc: '책 모서리에 쏙 끼우는 포켓 책갈피. 뿔과 코를 달면 책을 무는 루돌프!',
    gen() {
      const st = [
        [D(`<path d="M30 3 L54 25 L30 47 L6 25Z" fill="${Bc}"/>${dash('M6 25 H54')}${arrow('M36 44 Q46 28 36 8')}`), '마름모로 놓고 아래 꼭짓점을 위로 올려 반으로 접어요.'],
        [D(`<path d="M6 38 L54 38 L30 14Z" fill="${Bc}"/>${dash('M30 38 L18 26 M30 38 L42 26')}${arrow('M8 41 Q10 24 26 14')}${arrow('M52 41 Q50 24 34 14')}`), '양쪽 끝을 꼭대기에 맞춰 접었다가 다시 펴요(접은 자국 내기).'],
        [D(`<path d="M6 38 L54 38 L30 14Z" fill="${Bc}"/>${dash('M18 26 H42')}${arrow('M33 12 Q40 24 32 35')}${txt(30, 46, '윗장 한 장만!', 3.6, { fill: '#d93a3a' })}`), '꼭대기의 「윗장 한 장만」 아래 변 가운데로 내려 접어요.'],
        [D(`<path d="M6 38 L54 38 L30 14Z" fill="${Bc}"/><path d="M18 26 L42 26 L30 38Z" fill="#c9a17a"/>${dash('M30 38 L18 26 M30 38 L42 26')}${arrow('M8 41 Q8 22 24 16')}${arrow('M52 41 Q52 22 36 16')}`), '양쪽 끝을 다시 꼭대기로 올려 접어요.'],
        [D(`<path d="M30 38 L42 26 L30 14 L18 26Z" fill="${Bc}"/><path d="M18 26 L42 26 L30 38Z" fill="#c9a17a"/>${arrow('M24 16 Q30 22 27 30')}${arrow('M36 16 Q30 22 33 30')}`), '올린 두 끝을 방금 내려 접은 세모 주머니 속으로 밀어 넣어요.'],
        [D(`<path d="M30 44 L46 28 L30 12 L14 28Z" fill="${Bc}"/><path d="M14 28 L46 28 L30 44Z" fill="#c9a17a"/><circle cx="30" cy="40" r="3.6" fill="#ef3b36"/><circle cx="25" cy="33" r="1.5" fill="#432"/><circle cx="35" cy="33" r="1.5" fill="#432"/><path d="M22 20 Q16 12 10 10 M18 15 Q13 16 11 19 M38 20 Q44 12 50 10 M42 15 Q47 16 49 19" fill="none" stroke-width="1.8"/>`), '주머니 쪽에 얼굴을 그리고 뿔을 붙이면 완성. 책 모서리에 끼워요!'],
      ];
      return [oriPage(this, { sub: '준비물: 색종이 1장(15cm), 꾸미기 재료. 5번의 「끼워 넣기」가 핵심이에요.', st, tip: '같은 방법으로 흰 종이는 눈사람, 빨간 종이는 산타, 초록 종이는 트리 책갈피가 됩니다.' })];
    }
  });
  reg({
    id: 'ori-tree', title: '종이접기: 3단 트리', cat: 'ori', grades: G3, icon: 'tree', paper: '초록 색종이',
    desc: '크기가 다른 세모 3개를 겹쳐 만드는 트리. 카드·게시판 꾸미기에 좋아요.',
    gen() {
      const tri = (x, y, w, c = Gc) => `<path d="M${x} ${y} L${x + w / 2} ${y + w / 2} L${x - w / 2} ${y + w / 2}Z" fill="${c}"/>`;
      const st = [
        [D(`<rect x="4" y="12" width="26" height="26" fill="${Gc}"/><rect x="34" y="18" width="20" height="20" fill="${Gc}"/><rect x="40" y="2" width="14" height="14" fill="${Gc}"/>${txt(17, 44, '큰 것', 3.4)}${txt(44, 44, '중간·작은 것', 3.4)}`), '초록 색종이로 큰·중간·작은 정사각형 3장을 준비해요(15cm, 12cm, 9cm).'],
        [D(`<rect x="12" y="5" width="36" height="36" fill="${Gc}"/>${dash('M12 5 L48 41')}${arrow('M16 38 Q28 34 44 9')}`), '세 장 모두 대각선으로 반 접어 세모를 만들어요.'],
        [D(`<path d="M6 38 L54 38 L30 14Z" fill="${Gc}"/>${dash('M30 14 V38')}${arrow('M10 36 Q30 24 50 36')}`), '한 번 더 반으로 접어 작은 세모로 만들어요.'],
        [D(`${tri(30, 24, 40)}${tri(30, 13, 30, '#a5dbb9')}${tri(30, 4, 20, '#8fd0a8')}`), '큰 세모 위에 중간, 작은 세모를 차례로 겹쳐 끼우고 풀로 붙여요.'],
        [D(`${tri(30, 22, 36)}${tri(30, 13, 28, '#a5dbb9')}${tri(30, 6, 20, '#8fd0a8')}<rect x="26" y="40" width="8" height="7" fill="${Bc}"/><polygon points="${starPts(30, 6, 4.4, 2)}" fill="#ffd54f"/><circle cx="24" cy="30" r="1.6" fill="#ef5350"/><circle cx="35" cy="35" r="1.6" fill="#42a5f5"/><circle cx="31" cy="22" r="1.6" fill="#ffd54f"/>`), '갈색 줄기와 별을 붙이고 스티커로 장식해요.'],
        [D(`${artG('tree', 6, 8, 34)}${artG('gift', 38, 26, 16)}`), '카드에 붙이거나 줄에 달아 장식해요!'],
      ];
      return [oriPage(this, { sub: '준비물: 초록 색종이, 갈색·노란 색종이 조금, 풀, 스티커.', st })];
    }
  });
  reg({
    id: 'snowflake-cut', title: '접어 오리는 여섯 갈래 눈꽃', cat: 'ori', grades: ['mid', 'high'], icon: 'snowflake', paper: '얇은 종이·색종이',
    desc: '진짜 눈 결정처럼 6갈래로! 접는 법과 무늬 본 6종. 「눈 결정은 왜 육각형일까?」 과학 이야기 포함.',
    gen() {
      const st = [
        [D(`<rect x="12" y="5" width="36" height="36" fill="${W}"/>${dash('M12 5 L48 41')}${arrow('M16 38 Q28 34 44 9')}`), '정사각형 종이를 대각선으로 반 접어요.'],
        [D(`<path d="M6 38 L54 38 L30 14Z" fill="${W}"/>${dash('M30 14 V38')}${arrow('M10 36 Q30 24 50 36')}`), '한 번 더 반으로 접어요. (직각인 쪽이 종이의 한가운데!)'],
        [D(`<path d="M30 46 L8 24 L52 24Z" fill="${W}"/>${dash('M30 46 L24.1 24 M30 46 L35.9 24')}${arrow('M46 22 Q36 14 28 22')}${arrow('M14 22 Q24 12 33 20')}${txt(30, 8, '3등분', 3.6, { fill: '#d93a3a' })}`), '가운데 꼭짓점을 아래로 두고, 3등분이 되게 오른쪽·왼쪽을 차례로 겹쳐 접어요.'],
        [D(`<path d="M30 46 L22 14 L28 20 L32 12 L38 18Z" fill="${W}"/><path d="M18 22 H42" stroke="#d93a3a" stroke-width="1"/>${txt(46, 22, '자르기', 3.4, { fill: '#d93a3a', a: 'start' })}`), '들쭉날쭉한 윗부분을 가위로 반듯하게 잘라 내요.'],
        [D(`<path d="M30 46 L24 22 L36 22Z" fill="${W}"/><path d="M26 30 l4 3 l-3 3Z M35 28 l-4 2 l5 4Z M27 22 l3 5 l3 -5Z" fill="#bbb"/>`), '양옆과 위를 세모·반달 모양으로 오려 내요. (접힌 양옆을 모두 잘라 버리면 흩어져요!)'],
        [D(artG('snowflake', 10, 5, 40)), '살살 펼치면 여섯 갈래 눈꽃 완성!'],
      ];
      const wedge = (i) => { const cuts = [['M-9 20 l8 6 l-6 6Z', 'M11 30 l-8 3 l7 6Z', 'M-5 0 l5 9 l5 -9Z'], ['M-13 8 a7 7 0 0 0 4 13Z', 'M12 14 a7 7 0 0 1 -4 12Z', 'M-6 34 a5 5 0 0 0 3 9Z', 'M-16 0 L0 12 L16 0Z'], ['M-12 12 l10 2 l-7 8Z', 'M10 22 l-9 0 l6 9Z', 'M-5 36 l5 2 l-3 6Z', 'M-16 0 Q0 16 16 0Z'], ['M14 6 l-10 4 l8 6Z', 'M-10 20 l9 -3 l-6 11Z', 'M7 32 l-6 0 l4 8Z', 'M-8 0 l4 7 l4 -7 l4 7 l4 -7Z'], ['M-14 6 l8 8 l-5 2Z', 'M-9 24 a6 6 0 0 0 4 11Z', 'M13 10 l-8 10 l6 4Z', 'M6 34 l-5 4 l3 5Z'], ['M-11 16 l9 -6 l-4 14Z', 'M11 16 l-9 8 l5 8Z', 'M-16 0 L-6 0 L0 8 L6 0 L16 0 L0 14Z']][i]; return `<g transform="translate(${16 + i * 30.8} 2)"><clipPath id="wc${i}"><path d="M0 60 L-16 0 L16 0Z"/></clipPath><path d="M0 60 L-16 0 L16 0Z" fill="#fff" stroke="#432" stroke-width=".7"/><g clip-path="url(#wc${i})" fill="#bbb" stroke="#432" stroke-width=".4">${cuts.map(d => `<path d="${d}"/>`).join('')}</g>${txt(0, 66, i + 1 + '번', 4)}</g>`; };
      const extra = `<div class="h3">무늬 본 — 회색 부분을 오려 내요 (5번 단계에서 따라 그리기)</div>` + svg(186, 70, range(6, wedge).join(''), 'style="flex:none;height:36mm"');
      return [oriPage(this, { sub: '준비물: 정사각형 종이(얇을수록 잘 잘려요), 가위, 연필. 커피 필터를 쓰면 접기가 훨씬 쉬워요.', st, extra, tipLabel: '과학 한 스푼', tip: '진짜 눈 결정은 물 분자가 육각형으로 손을 잡고 얼기 때문에 언제나 6갈래예요. 그래서 4갈래·8갈래가 아니라 「3등분 접기」로 6갈래를 만드는 거랍니다.' })];
    }
  });

  /* ───────── 글쓰기 · 마음 나눔 ───────── */
  reg({
    id: 'letter-low', title: '산타 할아버지께 (그림 편지)', cat: 'write', grades: ['low'], icon: 'santa',
    desc: '그림 칸 + 큰 줄 편지지. 「제가 잘한 일」을 먼저 떠올려요.',
    gen() { return [page(this, { sub: '올해 내가 잘한 일을 떠올리고, 산타 할아버지께 하고 싶은 말을 써요.', body: `<div class="q">산타 할아버지께</div><div class="grid2" style="flex:none;height:78mm"><div class="box"><span style="font-family:var(--f-display)">올해 내가 잘한 일 (그림)</span></div><div class="box"><span style="font-family:var(--f-display)">받고 싶은 선물 (그림)</span></div></div><div class="lines" style="background:repeating-linear-gradient(transparent 0 13.6mm,#bfb1a5 13.6mm 14mm)"></div><div class="q" style="text-align:right">${blank(40)} 올림</div>` })]; }
  });
  reg({
    id: 'letter', title: '산타에게 보내는 편지', cat: 'write', grades: ['mid', 'high'], icon: 'santa',
    desc: '편지 형식(받는 사람–첫인사–하고 싶은 말–끝인사–쓴 날짜–쓴 사람)을 갖춘 편지지.',
    gen() { return [page(this, { sub: '편지의 형식을 갖추어 써요. 올해 뿌듯했던 일, 고마운 사람, 나누고 싶은 선물 이야기를 담아 보세요.', body: `<div class="q">${blank(50)} 께</div><div class="lines"></div><div class="q" style="text-align:right">20${blank(10)}년 12월 ${blank(10)}일 &nbsp; ${blank(40)} 올림</div><div style="display:flex;justify-content:space-between;flex:none">${['holly', 'cane', 'stocking', 'gift', 'bell', 'star', 'candle', 'mitten'].map(n => art(n, { size: 50, line: true, sw: 6 })).join('')}</div>`, tip: '핀란드 로바니에미의 산타 마을에는 해마다 전 세계 어린이들의 편지가 수십만 통 도착한대요. 영어 한 문장(Dear Santa, …)을 넣어 보는 것도 좋아요.' })]; }
  });
  reg({
    id: 'elf-apply', title: '산타 공장 엘프 지원서', cat: 'write', grades: ['mid', 'high'], icon: 'elf',
    desc: '「내가 엘프가 된다면?」 자기소개·특기·포부를 쓰는 유쾌한 설득 글쓰기.',
    gen() {
      const row = (t, h) => `<tr><th style="width:26%">${t}</th><td style="height:${h}mm"></td></tr>`;
      return [page(this, { sub: '산타 마을에서 새 엘프를 뽑는대요! 내가 뽑혀야 하는 까닭이 잘 드러나게 지원서를 써 보세요.', body: `<div style="display:flex;gap:4mm;flex:none"><div class="box" style="width:42mm;height:52mm;text-align:center;font-size:9.5pt;color:#777">엘프가 된<br>내 모습<br>(그림)</div><table class="t" style="flex:1">${row('엘프 이름', 11)}${row('나이 / 사는 곳', 11)}${row('지원 부서', 11)}<tr><td colspan="2" style="font-size:9.5pt;text-align:left">☐ 장난감 제작부 ☐ 포장부 ☐ 순록 돌봄부 ☐ 썰매 정비부 ☐ 편지 답장부 ☐ 쿠키 굽기부</td></tr></table></div><table class="t">${row('나의 특기 3가지', 24)}${row('이 부서에 지원한 까닭', 34)}${row('올해 내가 한 착한 일', 28)}${row('산타에게 하는 약속', 24)}</table><div class="q" style="text-align:right">지원자 ${blank(40)} (서명)</div>`, tip: '짝과 「면접관–지원자」 역할 놀이로 이어 가면 말하기 활동이 됩니다. 면접 질문: 「썰매가 고장 나면 어떻게 하겠습니까?」' })];
    }
  });
  reg({
    id: 'wish-three', title: '세 가지 선물', cat: 'write', grades: ['low', 'mid'], icon: 'gift',
    desc: '갖고 싶은 것 · 필요한 것 · 나누고 싶은 것. 선물의 의미를 넓혀 보는 활동.',
    gen() {
      const b = (ic, t, s) => `<div class="box" style="flex:1;display:flex;gap:4mm"><div style="width:44mm;flex:none;text-align:center">${art(ic, { size: 120, line: true, sw: 4 })}<div style="font-family:var(--f-display);font-size:14pt;color:#b52a2a">${t}</div><div style="font-size:9pt;color:#777">${s}</div></div><div style="flex:1;display:flex;flex-direction:column"><div style="flex:1;border:.4mm dashed #bfb1a5;border-radius:3mm;font-size:9pt;color:#aaa;padding:1mm 2mm">그림</div><div class="lines" style="flex:none;height:20mm"></div></div></div>`;
      return [page(this, { sub: '선물은 받는 것만이 아니에요. 세 가지 선물을 그림과 글로 나타내 보세요.', body: b('gift', '갖고 싶은 것', '내가 받고 싶은 선물') + b('mitten', '필요한 것', '나에게 꼭 필요한 것') + b('candle', '나누고 싶은 것', '누구에게, 무엇을 주고 싶나요?') })];
    }
  });
  reg({
    id: 'world-xmas', title: '세계의 크리스마스 여행', cat: 'write', grades: ['mid', 'high'], icon: 'ornament', answers: true,
    desc: '일본의 치킨, 아이슬란드의 장난꾸러기 13명, 롤러스케이트 타고 가는 성탄 미사… 읽기 자료와 확인 퀴즈.',
    gen(c) {
      const F = [['일본', '1970년대의 한 광고가 큰 인기를 끈 뒤로, 크리스마스에 프라이드치킨을 먹는 문화가 생겼어요. 몇 주 전부터 예약할 정도!'], ['호주', '남반구라서 12월이 한여름이에요. 해변에서 수영복 차림으로 바비큐를 하며 크리스마스를 보내기도 해요.'], ['아이슬란드', '「율 라드」라는 장난꾸러기 요정 13명이 크리스마스 13일 전부터 하루에 한 명씩 찾아와요. 창가에 둔 신발에 선물을, 말썽꾸러기에게는 썩은 감자를 넣는대요.'], ['베네수엘라', '수도 카라카스에서는 크리스마스 새벽 미사에 롤러스케이트를 타고 가는 전통이 있어요.'], ['우크라이나', '트리를 거미줄 모양으로 장식해요. 가난한 가족의 트리를 거미가 밤새 꾸며 주었다는 옛이야기에서 왔어요.'], ['필리핀', '별 모양 등불 「파롤」을 집집이 걸어요. 9월부터 캐럴이 울려 퍼질 만큼 세계에서 가장 긴 크리스마스 철을 보내요.'], ['독일', '12월 1일부터 하루에 한 칸씩 여는 「어드벤트 달력」과 크리스마스 마켓의 고향이에요.'], ['멕시코', '「포사다」 기간에 별 모양 피냐타를 막대기로 터뜨려 사탕을 나눠 가져요.'], ['스웨덴', '예블레라는 도시는 해마다 짚으로 집채만 한 염소를 세워요. 1966년부터 이어진 전통이에요.'], ['에티오피아', '달력이 달라서 1월 7일에 「겐나」라는 크리스마스를 지내요.'], ['이탈리아', '1월 6일 전날 밤, 빗자루를 탄 마녀 할머니 「베파나」가 양말에 사탕을 넣어 준대요.'], ['캐나다', '산타에게 보내는 편지 전용 우편번호가 있어요. 바로 H0H 0H0 (호호호)!']];
      const WI = { 일본: 'japan', 호주: 'australia', 아이슬란드: 'iceland', 베네수엘라: 'venezuela', 우크라이나: 'ukraine', 필리핀: 'philippines', 독일: 'germany', 멕시코: 'mexico', 스웨덴: 'sweden', 에티오피아: 'ethiopia', 이탈리아: 'italy', 캐나다: 'canada' };
      const p1 = page(this, { sub: '나라마다 크리스마스를 보내는 모습이 달라요. 그림을 보며 읽고, 가장 신기한 것에 ★표 하세요.', body: `<div class="cards" style="grid-template-columns:1fr 1fr;flex:1;align-content:space-between;gap:2.2mm">${F.map(([n, t]) => `<div style="border:.4mm solid #d9c9b5;border-radius:3mm;padding:1.4mm 2mm;font-size:9pt;line-height:1.38;background:#fffdf8;display:flex;gap:2mm;align-items:center"><img src="${XArt.img('w/' + WI[n] + '.png')}" alt="" style="width:17mm;height:17mm;object-fit:contain;flex:none"><div><b style="font-family:var(--f-display);font-weight:400;font-size:12pt;color:#b52a2a">${n}</b> ${t}</div></div>`).join('')}</div>` });
      const Q = [['12월이 한여름이라 해변에서 크리스마스를 보내기도 하는 나라는?', '호주'], ['아이슬란드의 장난꾸러기 요정 「율 라드」는 모두 몇 명인가요?', '13명'], ['우크라이나에서 트리를 거미줄 모양으로 장식하게 된 까닭은?', '거미가 가난한 가족의 트리를 꾸며 주었다는 옛이야기'], ['필리핀의 별 모양 등불 이름은?', '파롤'], ['에티오피아의 크리스마스는 몇 월 며칠인가요?', '1월 7일'], ['캐나다의 산타 전용 우편번호가 H0H 0H0인 까닭을 짐작해 써 보세요.', '산타의 웃음소리 「호호호」']];
      const p2 = page(this, { title: '세계의 크리스마스 퀴즈 & 내 생각', sub: '읽기 자료를 떠올리며 답해요.', body: Q.map(([q, a], i) => `<div style="flex:none"><b style="font-family:var(--f-display);font-weight:400;color:#b52a2a">${i + 1}.</b> ${q}<div class="ans" style="border-bottom:.4mm solid #bfb1a5;height:8mm;padding-left:4mm">${c.ans ? a : ''}</div></div>`).join('') + `<div class="q">가장 가 보고 싶은 나라의 크리스마스와 그 까닭</div><div class="lines"></div><div class="q">우리나라(우리 집)만의 크리스마스 모습을 외국 친구에게 소개한다면?</div><div class="lines"></div>`, tip: '모둠별로 한 나라씩 맡아 「1분 여행 가이드」 발표를 하거나, 세계 지도에 스티커를 붙이며 읽으면 사회 수업과 연결됩니다.' });
      return [p1, p2];
    }
  });

  /* ───────── 카드 모양 공통 ───────── */
  const card4 = (list) => `<div class="cards" style="grid-template-columns:1fr 1fr;flex:1">${list.map(([ic, t, mat, how, why]) => `<div class="box" style="display:flex;flex-direction:column;gap:2mm;font-size:11.5pt;line-height:1.5"><div style="display:flex;align-items:center;gap:2mm">${art(ic, { size: 60 })}<div style="font-family:var(--f-display);font-size:13.5pt;color:#b52a2a;line-height:1.15">${t}</div></div><div><b style="font-family:var(--f-display);font-weight:400;color:#1c6146">준비물</b> ${mat}</div><div><b style="font-family:var(--f-display);font-weight:400;color:#1c6146">방법</b> ${how}</div><div style="margin-top:auto;background:#fff6dc;border-radius:2mm;padding:1mm 2mm"><b style="font-family:var(--f-display);font-weight:400;color:#b06a00">${why[0]}</b> ${why[1]}</div></div>`).join('')}</div>`;

  /* ───────── 놀이 카드 ───────── */
  reg({
    id: 'play-cards', title: '교실 놀이 카드 12선', cat: 'play', grades: G3, icon: 'mitten',
    desc: '종이 눈싸움, 랩 공 선물 풀기, 스무고개, 방울 찾기… 교실 자리에서 바로 하는 놀이 12가지.',
    gen() {
      const P = [
        ['snowflake', '종이 눈싸움 질문 놀이', '이면지, 펜', '종이에 질문을 써서 구겨 눈덩이를 만들어요. 자리에서 30초 동안 살살 던지기! 「그만」 하면 가까운 눈덩이를 펴서 질문에 답해요.', ['학년 팁', '저: 「좋아하는 겨울 간식?」 / 고: 단원 복습 퀴즈']],
        ['gift', '랩 공 선물 풀기', '랩으로 겹겹이 싼 공(사이사이 사탕·스티커), 주사위', '모둠이 둘러앉아 한 명은 랩을 풀고 옆 사람은 주사위를 굴려요. 6이 나오면 공이 다음 사람에게! 풀려나온 선물은 내 것.', ['더 재미있게', '장갑을 끼고 풀면 난이도 상승!']],
        ['presents', '선물 포장 2인 1조', '상자, 신문지, 테이프, 리본', '짝과 나란히 앉아 한 사람은 오른손만, 다른 사람은 왼손만 써서 상자를 포장해요. 3분 뒤 「가장 예쁜 포장」 투표!', ['더 재미있게', '말하지 않고 하기 규칙을 넣어 보세요']],
        ['rudolph', '루돌프 코 옮기기', '빨간 색종이 동그라미, 빨대, 접시 2개', '빨대로 숨을 들이마셔 빨간 코를 붙인 채 옆 접시로 옮겨요. 1분 동안 가장 많이 옮긴 사람은?', ['학년 팁', '빨대는 한 사람이 하나씩! 고: 젓가락으로 옮기기']],
        ['cane', '지팡이 사탕 낚시', '모루로 만든 갈고리 여러 개, 종이컵', '책상 가장자리에 걸쳐 둔 갈고리를 내 갈고리로 걸어 컵에 옮겨요. 30초 동안 몇 개?', ['안전', '모루 끝은 둥글게 말아 두세요']],
        ['elf', '산타 가라사대', '없음', '「산타 가라사대 ~」가 붙은 말만 따라 해요. 「산타 가라사대 루돌프 뿔!」 「썰매 타!」(← 따라 하면 탈락)', ['더 재미있게', '탈락한 친구가 다음 진행자가 돼요']],
        ['stocking', '양말 속 물건 맞히기', '큰 양말, 작은 물건 6가지', '양말 속에 손을 넣어 만져 보고 물건 이름을 맞혀요. 솔방울, 방울, 지우개, 리본, 사탕…', ['국어 연계', '만진 느낌을 꾸며 주는 말로 말해 보기']],
        ['snowman', '자리에서 눈사람 얼음 댄스', '캐럴 음원', '자리에 서서 캐럴에 맞춰 춤추다가 음악이 멈추면 눈사람처럼 얼음! 움직이면 앉아서 「심사 위원 엘프」가 돼요.', ['더 재미있게', '「산타 포즈로 얼음」처럼 포즈를 정해 주세요']],
        ['tree', '30초 컵 트리 쌓기', '모둠마다 종이컵 10개', '모둠 책상에서 30초 안에 컵으로 4-3-2-1 트리를 쌓아요. 무너지면 처음부터! 성공하면 한 손으로 도전.', ['학년 팁', '저: 6개(3-2-1) / 고: 한 손만 쓰기']],
        ['holly', '눈 감고 루돌프 코 붙이기', '칠판에 그린 루돌프, 빨간 동그라미 스티커', '눈을 감고 제자리에서 세 바퀴 돈 뒤 칠판의 루돌프 얼굴에 코를 붙여요. 가장 가깝게 붙인 사람이 승리!', ['안전', '친구가 칠판 앞까지 손을 잡고 안내해요']],
        ['gift', '선물 상자 스무고개', '상자, 상자에 숨길 물건', '선생님이 상자에 숨긴 물건을 「예/아니요」 질문 20번 안에 맞혀요. 「먹을 수 있나요?」 「겨울에 쓰나요?」', ['더 재미있게', '모둠이 돌아가며 질문하고 정답 모둠에 점수']],
        ['bell', '방울을 찾아라', '방울 하나', '한 명이 복도에 나간 사이 교실에 방울을 숨겨요. 들어와 찾는 동안 가까우면 크게, 멀면 작게 「징글벨」을 흥얼거려요.', ['진행 팁', '숨기는 곳은 손이 닿는 교실 안으로 정해요']],
      ];
      return range(3, p => page(this, { title: `교실 놀이 카드 (${p + 1}/3)`, noname: true, sub: '넓은 공간 없이 교실 자리에서 할 수 있는 놀이만 모았어요. 전자칠판의 「타이머」, 「돌림판」, 「모둠 점수판」과 함께 쓰면 진행이 쉬워요.', body: card4(P.slice(p * 4, p * 4 + 4)) }));
    }
  });
  reg({
    id: 'left-right', title: '왼쪽·오른쪽 선물 돌리기 이야기', cat: 'play', grades: G3, icon: 'gift',
    desc: '이야기 속에 「왼쪽」, 「오른쪽」이 나올 때마다 선물을 옆으로! 영미권 파티의 고전 놀이를 우리말 창작 이야기로.',
    gen() {
      const story = '크리스마스이브, 산타는 [오른쪽] 장화를 신다가 깜짝 놀랐어요. [왼쪽] 장화가 보이지 않았거든요! "루돌프, 내 [왼쪽] 장화 못 봤니?" 루돌프는 고개를 [오른쪽]으로 갸웃, 다시 [왼쪽]으로 갸웃했어요. "썰매 [오른쪽] 자리에 있지 않을까요?" 산타는 썰매로 달려가 [오른쪽] 자리를 살폈지만, 거기엔 먹다 [남은] 쿠키뿐이었어요. 그때 [왼쪽] 창고에서 달그락 소리가 났어요. 꼬마 엘프가 [왼쪽] 장화 속에 사탕을 가득 채우고 있었지 뭐예요! "산타 할아버지, 양말인 줄 알았어요!" 산타는 껄껄 웃으며 [왼쪽] 장화를 신고, [오른쪽] 손에 고삐를 쥐었어요. "자, 출발! 첫 번째 집은 [오른쪽]으로 돌아 세 번째 굴뚝이다!" 그런데 루돌프가 그만 [왼쪽]으로 돌아 버렸어요. "아니, [오른쪽]! [오른쪽]이라니까!" 썰매는 [왼쪽]으로 빙글, [오른쪽]으로 빙글, 하늘에서 춤을 추었지요. 겨우 지붕에 내린 산타는 굴뚝의 [왼쪽] 벽과 [오른쪽] 벽 사이에 배가 꽉 끼고 말았어요. 엘프가 [왼쪽] 다리를, 루돌프가 [오른쪽] 다리를 잡아당기자 뽕! 하고 빠졌답니다. 산타는 트리 [오른쪽]에 선물을 내려놓고, 접시에 [남은] 우유를 마신 다음, [왼쪽] 눈을 찡긋하며 말했어요. "지금 선물을 들고 있는 친구, 메리 크리스마스!"';
      const html = story.replace(/\[(왼쪽|오른쪽)\]/g, (m, w) => `<b style="font-family:var(--f-display);font-weight:400;color:${w === '왼쪽' ? '#1c6146' : '#b52a2a'};border-bottom:.5mm solid currentColor">${w}</b>`).replace(/\[남은\]/g, '남은');
      return [page(this, { noname: true, sub: '놀이법: 둥글게 앉아 선물(사탕 주머니) 1~3개를 들고 시작해요. 선생님이 이야기를 읽다가 「왼쪽」이 나오면 왼쪽 사람에게, 「오른쪽」이 나오면 오른쪽 사람에게 넘겨요. 이야기가 끝났을 때 선물을 든 사람이 주인!', body: `<div class="box" style="flex:1;font-size:15.5pt;line-height:1.95;background:#fffdf8">${html}</div>`, tip: '「남은」은 함정 낱말이에요(오른쪽 영어 right/left의 말장난을 우리말로 살렸어요). 속아서 넘기면 다 함께 웃고 넘어가요. 빠르기를 점점 올리면 더 재미있어요. 「왼쪽」 11번, 「오른쪽」 12번이 나옵니다.' })];
    }
  });

  /* ───────── 노래 활동지 ───────── */
  reg({
    id: 'song-rewrite', title: '캐럴 노랫말 바꿔 부르기', cat: 'song', grades: ['mid', 'high'], icon: 'bell',
    desc: '징글벨 가락에 우리 반 이야기를 담아 개사해요. 글자 수 맞추기 칸 포함.',
    gen() {
      const row = (n, ex) => `<tr><td style="width:36%;font-size:10pt;text-align:left">${ex}</td><td><div style="display:flex;gap:1mm;justify-content:center">${range(n, () => '<span style="width:7.6mm;height:9mm;border:.4mm solid #8a7a70;border-radius:1.5mm;display:inline-block"></span>').join('')}</div></td></tr>`;
      return [page(this, { sub: '「징글벨」 후렴 가락에 맞춰 노랫말을 바꿔요. 한 칸에 한 글자! 원래 글자 수와 맞추면 부르기 쉬워요.', body: `<table class="t"><tr><th>보기 (우리 반 버전)</th><th>내가 바꾼 노랫말 (칸 수 = 음표 수)</th></tr>${row(6, '우리 반 우리 반')}${row(5, '신나는 우리')}${row(9, '함께 웃고 함께 노는 반')}${row(6, '최고의 우리 반')}${row(6, '우리 반 우리 반')}${row(5, '다정한 우리')}${row(9, '서로 돕고 아껴 주는 반')}${row(5, '우리 반 최고')}</table><div class="q">제목: ${blank(80)}</div><div class="q">어울리는 율동이나 손뼉 치기를 그림·글로 계획해요</div><div class="box" style="flex:1"></div>`, tip: '주제 예시: 우리 반 자랑, 겨울방학 계획, 급식 메뉴 찬양가, 선생님께 드리는 노래. 완성되면 전자칠판 「캐럴 노래방」의 징글벨 반주에 맞춰 발표해요.' })];
    }
  });
  const CUPMOVE = { 짝: ['clap', '손뼉 치기', '두 손을 마주쳐 「짝!」', '#d93a3a'], 탁: ['pat', '책상 치기', '양손바닥으로 책상을 「탁!」', '#2e9e5b'], 쿵: ['tap', '컵 내려치기', '컵을 잡고 책상에 「쿵!」', '#3f7fd6'], 들: ['lift', '컵 들기', '컵을 위로 번쩍 「들!」', '#e0702e'], 쓱: ['pass', '컵 넘기기', '컵을 오른쪽 친구 앞으로 「쓱」', '#8e44ad'], 쉿: ['rest', '쉬기', '손을 멈추고 마음속으로 「쉿」', '#8a7a70'] };
  const CUPPAT = { 가: ['짝', '짝', '쿵', '쉿'], 나: ['탁', '탁', '짝', '쉿'], 다: ['들', '쿵', '짝', '쉿'], 라: ['들', '쿵', '쓱', '쉿'] };
  const JBL = [['Jin-gle bells', '징글 벨스'], ['jin-gle bells', '징글 벨스'], ['jin-gle all the', '징글 올 더'], ['way', '웨이~'], ['Oh what fun it', '오 왓 펀 잇'], ['is to ride in a', '이즈 투 라이드 인 어'], ['one-horse o-pen', '원 홀스 오픈'], ['sleigh, hey!', '슬레이 헤이!']];
  const CUPPLAN = { low: '가가가나가가가나', mid: '가가다나가가다나', high: '가다가다라라라라' };
  const cupImg = (k, h) => `<img src="${XArt.img('cup/' + CUPMOVE[k][0] + '.jpg')}" alt="" style="height:${h}mm;max-width:100%;object-fit:contain;display:block;margin:0 auto">`;
  const beat = (k, n, h = 15) => `<div style="flex:1;border:.6mm solid ${CUPMOVE[k][3]};border-radius:3mm;background:${CUPMOVE[k][3]}14;padding:1mm;text-align:center;min-width:0"><div style="font-size:8pt;color:#777">${n}박</div>${cupImg(k, h)}<div style="font-family:var(--f-display);font-size:17pt;line-height:1.1;color:${CUPMOVE[k][3]}">${k}</div></div>`;
  G3.forEach(g => reg({
    id: 'cup-' + g, title: '징글벨 컵타 악보', cat: 'song', grades: [g], icon: 'cocoa',
    desc: { low: '손뼉·책상·컵 내려치기 3동작으로 하는 쉬운 컵타. 동작 사진 카드와 그림 악보.', mid: '컵 들기까지 4동작. 동작 사진 카드와 징글벨 그림 악보.', high: '컵을 옆 친구에게 넘기는 돌림 컵타까지! 동작 사진 카드와 그림 악보.' }[g],
    gen() {
      const plan = CUPPLAN[g], pats = [...new Set(plan)], moves = [...new Set(pats.flatMap(x => CUPPAT[x]))];
      const cards = `<div style="display:grid;grid-template-columns:repeat(${moves.length > 4 ? 3 : moves.length},1fr);gap:3mm;flex:none">${moves.map(k => `<div style="border:.6mm solid ${CUPMOVE[k][3]};border-radius:4mm;padding:2mm;text-align:center;background:#fff">${cupImg(k, 30)}<div style="font-family:var(--f-display);font-size:24pt;line-height:1.1;color:${CUPMOVE[k][3]}">${k}</div><div style="font-family:var(--f-display);font-size:11pt">${CUPMOVE[k][1]}</div><div style="font-size:9pt;color:#555">${CUPMOVE[k][2]}</div></div>`).join('')}</div>`;
      const patRows = pats.map(x => `<div style="display:flex;gap:2mm;align-items:stretch;flex:none"><div style="width:14mm;flex:none;display:flex;align-items:center;justify-content:center;font-family:var(--f-display);font-size:16pt;color:#fff;background:#1c6146;border-radius:3mm">${x}</div>${CUPPAT[x].map((k, i) => beat(k, i + 1, 13)).join('')}</div>`).join('');
      const p1 = page(this, { title: '컵타 동작 익히기', sub: '종이컵을 엎어 놓고 시작해요. 먼저 사진을 보며 동작을 하나씩 따라 해 보세요.', body: cards + `<div class="h3">리듬 패턴 연습 — 「하나, 둘, 셋, 넷」 세며 천천히!</div>` + patRows, tip: '입으로 「짝 짝 쿵 쉿」을 소리 내며 따라 하면 금방 외워져요. 처음에는 아주 느리게, 익숙해지면 점점 빠르게!' });
      const rows = JBL.map(([en, ko], i) => { const x = plan[i]; return `<div style="display:flex;gap:2mm;align-items:stretch;flex:none"><div style="width:40mm;flex:none;display:flex;flex-direction:column;justify-content:center;border-left:1.2mm solid #d93a3a;padding-left:2mm"><div style="font-family:var(--f-display);font-size:12.5pt;line-height:1.2">${en}</div><div style="font-size:9.5pt;color:#777">${ko}</div><div style="font-size:8.5pt;color:#1c6146">${i + 1}마디 · 패턴 ${x}</div></div>${CUPPAT[x].map((k, j) => beat(k, j + 1, 11)).join('')}</div>`; }).join('');
      const p2 = page(this, { title: '징글벨 컵타 악보', sub: '한 줄이 한 마디(4박)예요. 왼쪽 가사를 부르며 오른쪽 동작을 차례로 해요. 8마디를 두 번 되풀이하면 후렴이 끝나요.', body: rows, tip: g === 'high' ? '「쓱」에서 컵을 오른쪽 친구 앞으로 넘기고, 왼쪽 친구가 넘긴 컵을 받아 다음 동작을 이어 가요. 둥글게 앉아 하면 컵이 한 바퀴 돌아요!' : '전자칠판 「캐럴 노래방」의 징글벨 반주를 느리게(빠르기 90) 틀어 놓고 연습해 보세요.' });
      return [p1, p2];
    }
  }));
})();
