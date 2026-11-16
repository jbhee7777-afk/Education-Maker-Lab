/* 창체 · 범교과: 영상 20분 + 활동지 20분 */
(function () {
  const { reg, page, act, svg, txt, lines, draw, q, mk, img, itm, range, shuffle } = G2;
  /* 영상 본 직후 공통 칸 */
  const memo = (n = 1) => act(n, '영상을 보고 기억에 남는 낱말이나 장면 세 가지를 써요.', 4, `<div class="g3">${[1, 2, 3].map(i => `<div class="box" style="height:17mm;padding:1mm 2.5mm"><span class="hd">${i}</span></div>`).join('')}</div>`);
  const oxList = (L, M, cols = 1) => `<div class="${cols === 2 ? 'g2' : 'col'}" style="row-gap:2mm;gap:2mm 5mm">${L.map(([t, v]) => `<div class="row" style="align-items:center;gap:2mm"><div style="flex:1;font-size:11.5pt;line-height:1.35">${t}</div>${M.ox(v)}</div>`).join('')}</div>`;
  const order = (L, M) => `<div class="g2" style="gap:2mm 4mm">${L.map(([t, n]) => `<div style="display:flex;align-items:center;gap:2mm;border:.45mm solid #555;border-radius:3mm;padding:1.5mm 2.5mm;font-size:11.5pt;line-height:1.35">${M.bl(n, 9)}<span style="flex:1">${t}</span></div>`).join('')}</div>`;
  /* 벽 미로 */
  const maze = (cols, rows, r, ans, a = '출발', b = '도착') => {
    const W = range(rows, () => range(cols, () => [1, 1])), seen = range(rows, () => Array(cols).fill(0)), par = {};
    const st = [[0, 0]]; seen[0][0] = 1;
    while (st.length) {
      const [x, y] = st[st.length - 1];
      const nb = shuffle([[1, 0], [-1, 0], [0, 1], [0, -1]], r).map(([dx, dy]) => [x + dx, y + dy]).filter(([p, q2]) => p >= 0 && q2 >= 0 && p < cols && q2 < rows && !seen[q2][p]);
      if (!nb.length) { st.pop(); continue; }
      const [nx, ny] = nb[0]; seen[ny][nx] = 1; par[nx + ',' + ny] = [x, y];
      if (nx > x) W[y][x][0] = 0; else if (nx < x) W[ny][nx][0] = 0; else if (ny > y) W[y][x][1] = 0; else W[ny][nx][1] = 0;
      st.push([nx, ny]);
    }
    const c = 10; let s = `<path d="M0 0H${cols * c}V${rows * c}H0Z" fill="#fff" stroke="none"/>`, d = '';
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) { if (W[y][x][0] && x < cols - 1) d += `M${(x + 1) * c} ${y * c}v${c}`; if (W[y][x][1] && y < rows - 1) d += `M${x * c} ${(y + 1) * c}h${c}`; }
    d += `M0 ${c}V${rows * c}H${cols * c}V0H0 M${cols * c} ${rows * c - c}`;
    let sol = ''; if (ans) { let p = [cols - 1, rows - 1]; const pts = []; while (p) { pts.push(p); p = par[p.join(',')]; } sol = `<polyline points="${pts.map(([x, y]) => `${x * c + c / 2},${y * c + c / 2}`).join(' ')}" fill="none" stroke="#e03131" stroke-width="1.6" stroke-linejoin="round"/>`; }
    return svg(cols * c + 4, rows * c + 12, `<g transform="translate(2 6)">${s}${sol}<path d="${d}" fill="none" stroke="#333" stroke-width="1.3" stroke-linecap="round"/><path d="M0 0v${c}" stroke="#fff" stroke-width="2"/><path d="M${cols * c} ${rows * c - c}v${c}" stroke="#fff" stroke-width="2.4"/></g>${txt(3, 2.6, '▼ ' + a, 4, { a: 'start', fill: '#9c36b5' })}${txt(cols * c + 2, rows * c + 9.6, b + ' ▶', 4, { a: 'end', fill: '#9c36b5' })}`);
  };
  const V = (o) => reg(Object.assign({ subj: 'cre', mode: 'video' }, o));
  const vtip = (kw, extra = '') => `<b style="margin:0 1mm 0 0">추천 영상 검색어</b>${kw} — 20분 안팎의 영상을 골라 길이와 내용을 미리 확인해 주세요. ${extra}`;

  /* 1 교통안전 */
  V({
    id: 'cre-traffic', unit: '안전 · 교통안전', unitShort: '안전', title: '서다 · 보다 · 걷다 교통안전',
    desc: '교통안전 영상을 본 뒤 횡단보도 건너는 순서와 ○× 퀴즈로 정리해요. 뒷면은 신호등 색칠과 우리 동네 안전 지도 그리기.',
    gen({ ans }) {
      const M = mk(ans);
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '영상을 본 다음에 풀어요. 길을 건널 때는 서다 · 보다 · 걷다!',
        body: memo() + act(2, '횡단보도를 건너는 차례대로 번호를 써요.', 5, order([['차가 완전히 멈췄는지 확인하고, 뛰지 않고 걸어서 건너요.', 3], ['횡단보도 앞에서 우선 멈춰 서요.', 1], ['건너는 동안에도 차가 오는지 계속 살펴요.', 4], ['왼쪽, 오른쪽을 잘 살펴보아요.', 2]], M))
          + act(3, '안전한 행동이면 ○, 위험한 행동이면 ×에 색칠해요.', 6, oxList([['초록불이 깜빡이면 얼른 뛰어서 건너요.', 0], ['세워 둔 차 뒤나 차 사이에서 놀지 않아요.', 1], ['길을 걸을 때는 휴대 전화를 보지 않아요.', 1], ['자전거나 킥보드를 탈 때는 안전모를 꼭 써요.', 1], ['횡단보도에서는 자전거에서 내려 끌고 건너요.', 1], ['비 오는 날에는 어두운색 옷을 입는 것이 안전해요.', 0]], M))
          + act(4, '위험한 행동 하나를 골라 안전한 행동으로 고쳐 쓰고, 그 모습을 그려요.', 5, `<div class="row fill"><div class="col" style="flex:1.2">${ans ? `<div class="ans sm">예) 초록불이 깜빡이면 멈춰서 다음 신호를 기다려요. / 비 오는 날에는 밝은색 옷을 입어요.</div>` : ''}${lines(0, true)}</div>${draw('안전하게 행동하는 내 모습')}</div>`, true),
        tip: vtip('「어린이 교통안전 서다 보다 걷다」, 「초등 저학년 보행 안전」 (도로교통공단·경찰청 어린이 교육 영상, 학교안전교육 7대 표준안 자료)')
      });
      const light = (x, on) => `<rect x="${x}" y="6" width="26" height="54" rx="5" fill="#fff" stroke="#444" stroke-width="1.4"/><circle cx="${x + 13}" cy="20" r="9.5" fill="${ans && on === 0 ? '#ff8787' : '#fff'}" stroke="#444" stroke-width="1"/><circle cx="${x + 13}" cy="46" r="9.5" fill="${ans && on === 1 ? '#69db7c' : '#fff'}" stroke="#444" stroke-width="1"/><path d="M${x + 13} 60v26" stroke="#444" stroke-width="3"/><circle cx="${x + 13}" cy="16" r="2.3" fill="#444"/><path d="M${x + 13} 19v6 M${x + 9} 21h8 M${x + 13} 25l-3 4 M${x + 13} 25l3 4" stroke="#444" stroke-width="1.3" fill="none"/><circle cx="${x + 13}" cy="41.5" r="2.3" fill="#444"/><path d="M${x + 13} 44.5v5 M${x + 9} 46l8 2 M${x + 13} 49.5l-4 4 M${x + 13} 49.5l4 3" stroke="#444" stroke-width="1.3" fill="none"/>`;
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '우리 동네에서 안전하게 다니려면 어디를 조심해야 할까요?',
        body: `<div class="row" style="flex:none;height:62mm">${act(5, '보행 신호등을 색칠해요.', 4, svg(110, 90, light(14, 0) + light(70, 1) + txt(27, 88, '멈춰요', 5) + txt(83, 88, '건너요', 5)), true)}
            <div class="tint sm" style="flex:1.2;display:flex;flex-direction:column;justify-content:center;gap:1.5mm"><b class="hd">알맞은 색을 써요</b><div>멈춰야 하는 신호: ${M.bl('빨간', 16)}불</div><div>건널 수 있는 신호: ${M.bl('초록', 16)}불</div><div>초록불이 깜빡이면: ${M.ul('건너지 않고 기다려요', 44)}</div></div></div>`
          + act(6, '우리 집에서 학교까지 가는 길을 그리고, 조심할 곳에 ⚠ 표시를 해요.', 12, draw('횡단보도, 신호등, 골목길, 주차장 입구, 공사장 등을 넣어 보세요.'), true)
          + act(7, '나의 교통안전 약속 한 줄', 3, lines(1)),
        tip: '지도는 정확하지 않아도 됩니다. 「어디가 왜 위험한지」를 짝에게 설명하는 것이 목표입니다.'
      });
      return [p1, p2];
    }
  });

  /* 2 화재·지진 */
  V({
    id: 'cre-fire', unit: '안전 · 재난안전', unitShort: '안전', title: '불이야! 흔들려요! 대피 작전', seed: 119,
    desc: '화재·지진 대피 영상을 본 뒤 대피 순서와 ○× 퀴즈로 정리해요. 뒷면은 비상구를 찾아가는 대피 미로와 119 신고 연습.',
    gen({ ans, r }) {
      const M = mk(ans);
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '영상을 본 다음에 풀어요. 미리 알아 두면 진짜 위험할 때 몸이 먼저 움직여요.',
        body: memo() + act(2, '불이 났을 때 대피하는 차례대로 번호를 써요.', 5, order([['젖은 수건이나 옷소매로 코와 입을 막아요.', 2], ['"불이야!" 하고 크게 외쳐 둘레에 알려요.', 1], ['안전한 곳으로 나온 뒤 119에 신고해요.', 4], ['몸을 낮추고 계단으로 빠르게 대피해요.', 3]], M))
          + act(3, '지진이 났어요! 알맞은 행동이면 ○, 아니면 ×에 색칠해요.', 6, oxList([['흔들리는 동안에는 책상 아래로 들어가 머리를 보호해요.', 1], ['흔들리는 동안 곧바로 밖으로 뛰어나가요.', 0], ['흔들림이 멈추면 엘리베이터를 타고 내려가요.', 0], ['흔들림이 멈추면 계단으로 운동장처럼 넓은 곳에 대피해요.', 1], ['대피할 때는 가방이나 방석으로 머리를 보호해요.', 1]], M))
          + act(4, '우리 교실에서 운동장까지 대피하는 길을 간단한 지도로 그려요.', 5, draw('교실 → 복도 → 계단 → 현관 → 운동장 (화살표로 표시해요)'), true),
        tip: vtip('「어린이 화재 대피 요령」, 「초등 지진 대피 방법」 (소방청·행정안전부 국민안전교육 영상, 학교안전교육 7대 표준안 자료)')
      });
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '연기를 피해 비상구까지! 몸을 낮추고 침착하게 길을 찾아요.',
        body: act(5, '대피 미로: 교실에서 출발해 비상구까지 가는 길을 찾아요.', 9, maze(17, 10, r, ans, '교실', '비상구'), true)
          + act(6, '119 신고 연습: 빈칸을 채워 신고하는 말을 완성하고, 짝과 역할놀이를 해요.', 8, `<div class="tint" style="font-size:12.5pt;line-height:2.4">"${M.ul('불', 18)}이 났어요! 여기는 <span class="ul" style="min-width:52mm"></span>초등학교예요.<br>주소는 <span class="ul" style="min-width:110mm"></span>이에요.<br>제 이름은 <span class="ul" style="min-width:36mm"></span>이고, 다친 사람은 <span class="ul" style="min-width:30mm"></span>."</div>`)
          + `<div class="tint sm" style="text-align:center;flex:none">불이 나면 ${M.bl('119', 16)} · 장난 전화는 절대 안 돼요!</div>`,
        tip: '신고 연습에서는 「무슨 일 → 어디 → 누구」 순서로 또박또박 말하는 것을 칭찬해 주세요. 학교 주소는 칠판에 적어 주면 좋습니다.'
      });
      return [p1, p2];
    }
  });

  /* 3 친구 사랑 */
  V({
    id: 'cre-friend', unit: '인성 · 학교폭력 예방', unitShort: '인성', title: '장난일까, 폭력일까? 친구 사랑',
    desc: '학교폭력 예방 영상을 본 뒤 장난과 폭력을 구별하고 도움을 구하는 방법을 정리해요. 뒷면은 다섯 손가락 약속과 힘이 되는 말.',
    gen({ ans }) {
      const M = mk(ans);
      const L = [['친구가 싫다고 하는데도 계속 별명을 불러요.', 1], ['서로 웃으며 잡기 놀이를 해요.', 0], ['한 친구만 빼고 놀자고 다른 친구들에게 말해요.', 1], ['친구의 물건을 허락 없이 숨기고 돌려주지 않아요.', 1], ['친구가 "그만해"라고 하자 바로 멈추고 사과해요.', 0], ['단체 대화방에서 친구를 놀리는 글을 올려요.', 1]];
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '영상을 본 다음에 풀어요. 나는 재미있어도 친구가 괴로우면 장난이 아니에요.',
        body: memo() + act(2, '장난일까요, 폭력일까요? 알맞은 쪽에 ○표 해요.', 7, `<div class="col" style="gap:2mm">${L.map(([t, v]) => `<div class="row" style="align-items:center;gap:2mm"><div style="flex:1;font-size:11.5pt;line-height:1.35">${t}</div><span class="chip ${M.on(!v)}">장난</span><span class="chip ${M.on(v)}">폭력</span></div>`).join('')}</div>`)
          + act(3, '괴롭힘을 당하거나 보았을 때 할 수 있는 일을 완성해요.', 5, `<div class="tint" style="line-height:2.3">① "${M.ul('멈춰', 22)}!" 또는 "하지 마!" 하고 분명하게 말해요.<br>② ${M.ul('선생님', 26)}이나 부모님처럼 믿을 수 있는 어른께 알려요.<br>③ 학교폭력 신고 전화 ${M.bl('117', 16)}에 도움을 구할 수 있어요.</div>`)
          + act(4, '어른께 알리는 것은 고자질이 아니에요. 왜 그럴까요?', 4, `<div class="row fill"><div class="col" style="flex:1.2">${ans ? '<div class="ans sm">예) 친구와 나를 안전하게 지키기 위한 행동이기 때문이에요.</div>' : ''}${lines(0, true)}</div>${draw('사이좋게 지내는 우리 반 모습')}</div>`, true),
        tip: vtip('「초등 저학년 학교폭력 예방 교육」, 「장난과 폭력의 차이」 (교육부·푸른나무재단 어울림 프로그램 영상)')
      });
      const hand = `<rect x="34" y="52" width="54" height="52" rx="16" fill="#fff" stroke="#444" stroke-width="1.4"/>${[[36, 18, 0], [49, 8, 0], [62, 6, 0], [75, 12, 0]].map(([x, y]) => `<rect x="${x}" y="${y}" width="11" height="52" rx="5.5" fill="#fff" stroke="#444" stroke-width="1.4"/>`).join('')}<rect x="8" y="60" width="38" height="12" rx="6" fill="#fff" stroke="#444" stroke-width="1.4" transform="rotate(28 27 66)"/><rect x="36" y="56" width="50" height="20" fill="#fff"/>`;
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '사이좋은 우리 반을 만드는 다섯 손가락 약속을 정해요.',
        body: `<div class="row fill">${act(5, '다섯 손가락 약속: 손을 색칠하고 약속 다섯 가지를 써요.', 11, `<div class="row fill" style="align-items:center">${svg(100, 110, hand, 'style="flex:.8;height:100%"')}<div class="col" style="flex:1.2;justify-content:space-around;align-self:stretch">${['엄지', '검지', '중지', '약지', '새끼'].map(t => `<div style="display:flex;gap:2mm;align-items:flex-end;height:12mm"><span class="chip">${t}</span><span style="flex:1;border-bottom:.45mm solid #555"></span></div>`).join('')}</div></div>`, true)}</div>`
          + act(6, '친구에게 힘이 되는 말을 말풍선에 써요.', 7, `<div class="g2" style="row-gap:5mm;padding-bottom:3mm">${['친구가 혼자 있을 때', '친구가 놀림을 받았을 때', '친구가 실수해서 속상해할 때', '친구가 용기 내어 도와 달라고 할 때'].map(t => `<div class="bub" style="min-height:24mm;align-items:flex-start"><span style="font-family:var(--fd);font-size:10pt;color:#888">${t}</span></div>`).join('')}</div>`),
        tip: '약속 예: 고운 말 쓰기, 싫다고 하면 멈추기, 혼자 있는 친구에게 말 걸기. 완성한 손은 오려서 「약속 나무」로 모아 붙일 수 있습니다.'
      });
      return [p1, p2];
    }
  });

  /* 4 환경 */
  V({
    id: 'cre-env', unit: '환경 · 지속가능발전', unitShort: '환경', title: '지구를 지키는 분리배출 박사',
    desc: '환경 영상을 본 뒤 쓰레기를 알맞게 나누어 버리는 방법을 정리해요. 뒷면은 지구 지킴이 실천 빙고와 지구 꾸미기.',
    gen({ ans }) {
      const M = mk(ans);
      const I = [['📦', '택배 상자', 1], ['🧴', '샴푸 통', 2], ['🥫', '참치 캔', 3], ['🫙', '잼 유리병', 4], ['🧻', '쓰고 난 휴지', 5], ['📰', '신문지', 1], ['🥤', '플라스틱 컵', 2], ['📓', '다 쓴 공책', 1], ['🍗', '닭 뼈', 5], ['🥫', '옥수수 캔', 3]];
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '영상을 본 다음에 풀어요. 쓰레기도 잘 나누어 버리면 다시 쓸 수 있는 자원이 돼요.',
        body: memo() + act(2, '어디에 버릴까요? 물건 아래 □에 알맞은 번호를 써요.', 8, `<div class="g5" style="font-family:var(--fd);font-size:11pt;text-align:center">${['① 종이', '② 플라스틱', '③ 캔', '④ 유리병', '⑤ 일반 쓰레기'].map(t => `<div class="tint" style="padding:1.2mm">${t}</div>`).join('')}</div><div class="g5 fill" style="grid-auto-rows:1fr">${I.map(([e, t, n]) => `<div class="itm"><span class="ic">${e}</span>${t}${M.bl(n, 9)}</div>`).join('')}</div>`, true)
          + act(3, '분리배출 네 가지 약속을 완성해요.', 5, `<div class="chips" style="margin-bottom:1mm">${['섞지', '비우고', '분리', '헹구고'].map(t => `<span class="chip">${t}</span>`).join('')}</div><div class="g2" style="row-gap:2.5mm"><div>① 내용물을 ${M.bl('비우고', 22)}</div><div>② 물로 ${M.bl('헹구고', 22)}</div><div>③ 상표, 뚜껑은 ${M.bl('분리', 22)}하고</div><div>④ 종류별로 ${M.bl('섞지', 22)} 않아요</div></div>`),
        tip: vtip('「초등 분리배출 방법」, 「쓰레기는 어디로 갈까」 (환경부·환경교육포털 어린이 영상, EBS 환경 영상)', '분리배출 기준은 지역마다 조금 다를 수 있습니다.')
      });
      const B = ['양치할 때 컵 쓰기', '급식 남기지 않기', '안 쓰는 전등 끄기', '장바구니 쓰기', '이면지 쓰기', '가까운 곳은 걸어가기', '물건 아껴 쓰기', '분리배출 하기', '일회용 컵 안 쓰기'];
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '지구를 위해 내가 할 수 있는 일은 생각보다 많아요.',
        body: `<div class="row" style="flex:none;height:92mm">${act(4, '지구 지킴이 빙고: 이번 주에 실천한 칸을 색칠해요.', 5, `<div style="display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:repeat(3,1fr);gap:1.5mm;flex:1">${B.map(t => `<div class="itm" style="font-size:11pt">${t}</div>`).join('')}</div>`, true)}
            ${act(5, '지구를 색칠해요.', 5, svg(100, 100, `<circle cx="50" cy="50" r="42" fill="${ans ? '#a5d8ff' : '#fff'}" stroke="#444" stroke-width="1.6"/><path d="M28 22 c8-6 20-4 24 2 c4 6-2 10-8 12 c-6 2-4 10-12 10 c-8 0-12-8-10-14 c1-4 3-8 6-10Z M58 46 c8-4 20 0 22 8 c2 8-4 18-12 20 c-8 2-12-6-12-12 c0-6-2-12 2-16Z M24 62 c4-2 10 0 12 6 c2 6-2 12-6 12 c-4 0-8-6-8-10 c0-4 0-6 2-8Z" fill="${ans ? '#8ce99a' : '#fff'}" stroke="#444" stroke-width="1.2"/><path d="M40 52 q3 3 6 0 M56 36 h.1 M38 40h.1" stroke="#444" stroke-width="2" stroke-linecap="round" fill="none"/>`), true)}</div>`
          + act(6, '지구에게 하고 싶은 말과 나의 실천 약속을 써서 포스터를 완성해요.', 10, `<div class="row fill">${draw('지구를 지키는 내 모습을 그려요')}<div class="col" style="flex:1"><div class="hd">지구야,</div>${lines(0, true)}<div class="hd">나의 약속:</div>${lines(2)}</div></div>`, true),
        tip: '빙고는 일주일 동안 집에서 이어서 실천하게 하고 다음 주에 확인해도 좋습니다.'
      });
      return [p1, p2];
    }
  });

  /* 5 디지털 */
  V({
    id: 'cre-digital', unit: '정보통신 윤리', unitShort: '디지털', title: '똑똑하고 안전한 스마트폰 생활',
    desc: '디지털 예절·개인 정보 보호 영상을 본 뒤 ○× 퀴즈와 개인 정보 자물쇠로 정리해요. 뒷면은 우리 집 스마트폰 약속 카드.',
    gen({ ans }) {
      const M = mk(ans);
      const P = [['집 주소', 1], ['좋아하는 색', 0], ['전화번호', 1], ['비밀번호', 1], ['좋아하는 음식', 0], ['내 얼굴 사진', 1], ['학교와 반 이름', 1], ['좋아하는 동물', 0]];
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '영상을 본 다음에 풀어요. 스마트폰은 잘 쓰면 도구, 잘못 쓰면 위험이 돼요.',
        body: memo() + act(2, '바른 사용이면 ○, 아니면 ×에 색칠해요.', 6, oxList([['정해진 시간만 쓰고 스스로 꺼요.', 1], ['걸으면서 스마트폰을 봐요.', 0], ['모르는 사람이 보낸 링크는 누르지 않아요.', 1], ['친구 사진을 허락 없이 올려요.', 0], ['기분 나쁜 댓글 대신 고운 말을 써요.', 1], ['잠자기 바로 전까지 누워서 영상을 봐요.', 0]], M, 2))
          + act(3, '꼭 지켜야 할 개인 정보는 무엇일까요? 개인 정보가 담긴 자물쇠만 색칠해요.', 6, `<div class="g4 fill" style="grid-auto-rows:1fr">${P.map(([t, v]) => `<div class="itm" style="background:${ans && v ? '#eebefa' : '#fff'}">${svg(30, 26, '<path d="M9 12V8a6 6 0 0 1 12 0v4" fill="none" stroke="#444" stroke-width="2"/><rect x="5" y="12" width="20" height="13" rx="2.5" fill="none" stroke="#444" stroke-width="1.5"/>', 'style="height:11mm"')}${t}</div>`).join('')}</div>`, true)
          + act(4, '모르는 사람이 온라인에서 이름과 주소를 물어보면 어떻게 할까요?', 4, (ans ? '<div class="ans sm">예) 알려 주지 않고, 부모님이나 선생님께 바로 말씀드려요.</div>' : '') + lines(1)),
        tip: vtip('「초등 저학년 디지털 시민 교육」, 「어린이 개인정보 보호」, 「스마트폰 바르게 사용하기」 (개인정보보호위원회·스마트쉼센터 어린이 영상)')
      });
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '가족과 함께 지킬 약속을 정하고, 화면 없이도 즐거운 놀이를 찾아봐요.',
        body: act(5, '우리 집 스마트폰 약속 카드: 약속을 쓰고 꾸민 뒤 집에 붙여요.', 10, `<div class="cut" style="display:flex;gap:4mm;align-items:center;padding:4mm"><img src="${img('teddy')}" style="height:38mm"><div style="flex:1;font-size:12.5pt;line-height:2.4"><div class="hd" style="font-size:16pt;line-height:1.4">스마트폰 약속</div>① 하루에 <span class="bl"></span>분만 써요.<br>② <span class="ul" style="min-width:56mm"></span>에서는 쓰지 않아요.<br>③ <span class="ul" style="min-width:86mm"></span><br><span style="float:right;font-size:11pt">약속한 사람 <span class="ul" style="min-width:26mm"></span> · 가족 확인 <span class="ul" style="min-width:20mm"></span></span></div></div>`)
          + act(6, '스마트폰 없이도 재미있는 놀이 네 가지를 그림으로 그려요.', 10, `<div class="g4 fill">${range(4, i => draw(i + 1 + '')).join('')}</div>`, true),
        tip: '약속 카드는 가정으로 보내 가족과 함께 숫자를 정하게 하면 실천으로 이어집니다.'
      });
      return [p1, p2];
    }
  });

  /* 6 건강 */
  V({
    id: 'cre-health', unit: '건강 · 보건', unitShort: '건강', title: '뽀득뽀득 손 씻기 대작전',
    desc: '올바른 손 씻기 영상을 본 뒤 여섯 단계 순서를 정리해요. 뒷면은 세균 몬스터 그리기와 일주일 건강 습관 점검표.',
    gen({ ans }) {
      const M = mk(ans);
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '영상을 본 다음에 풀어요. 비누로 30초 이상! 손 씻기는 가장 쉬운 건강 지킴이예요.',
        body: memo() + act(2, '올바른 손 씻기 여섯 단계: 차례대로 번호를 써요.', 6, order([['손등과 손바닥을 마주 대고 문질러요.', 2], ['손바닥과 손바닥을 마주 대고 문질러요.', 1], ['엄지손가락을 다른 손으로 돌려 가며 문질러요.', 5], ['손깍지를 끼고 손가락 사이를 문질러요.', 3], ['손톱 밑을 손바닥에 대고 문질러요.', 6], ['손가락을 마주 잡고 문질러요.', 4]], M))
          + act(3, '손은 언제 씻어야 할까요? 꼭 씻어야 할 때를 모두 색칠해요.', 5, `<div class="g4 fill" style="grid-auto-rows:1fr">${[['🍚', '밥 먹기 전', 1], ['🚽', '화장실 다녀온 뒤', 1], ['⚽', '밖에서 놀고 온 뒤', 1], ['🤧', '기침·재채기한 뒤', 1], ['📖', '책 읽는 중간', 0], ['🐶', '동물을 만진 뒤', 1], ['😴', '잠자는 중간', 0], ['🏠', '집에 돌아온 뒤', 1]].map(([e, t, v]) => itm(e, t, '', ans && v ? 'background:#eebefa' : '')).join('')}</div>`, true)
          + act(4, '손을 씻는 동안 부르면 좋은 노래(약 30초)를 정해요.', 2, `<div class="tint">나는 <span class="ul" style="min-width:70mm"></span>을(를) 부르며 씻을 거예요.</div>`),
        tip: vtip('「올바른 손 씻기 6단계」, 「어린이 감염병 예방 수칙」 (질병관리청 어린이 영상)', '영상 뒤 실제로 세면대에서 6단계를 해 보면 좋습니다.')
      });
      const H = ['비누로 손 씻기', '하루 세 번 이 닦기', '채소 반찬 먹기', '물 자주 마시기', '밖에서 뛰어놀기', '일찍 잠자리에 들기'];
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '눈에 보이지 않는 세균을 상상해서 그리고, 건강 습관을 점검해요.',
        body: act(5, '내 손에 숨어 있던 세균 몬스터를 상상해서 그리고, 이름과 약점을 써요.', 10, `<div class="row fill">${draw('세균 몬스터')}<div class="col" style="flex:.8;justify-content:space-around"><div>이름: <span class="ul" style="min-width:44mm"></span></div><div>좋아하는 곳:<br><span class="ul" style="min-width:60mm"></span></div><div>약점: ${M.ul('비누와 물', 44)}</div><div>물리치는 방법:<br><span class="ul" style="min-width:60mm"></span></div></div></div>`, true)
          + act(6, '일주일 건강 습관 점검표: 실천한 날에 ○표 해요.', 10, `<table class="t"><tr><th style="width:34%">건강 습관</th>${'월화수목금토일'.split('').map(d => `<th>${d}</th>`).join('')}</tr>${H.map(h => `<tr><th style="font-size:10.5pt">${h}</th>${'<td></td>'.repeat(7)}</tr>`).join('')}</table>`),
        tip: '점검표는 일주일 뒤에 다시 걷어 ○가 많은 습관과 적은 습관을 함께 이야기해 보세요.'
      });
      return [p1, p2];
    }
  });

  /* 7 진로 */
  V({
    id: 'cre-career', unit: '진로', unitShort: '진로', title: '꿈을 찾는 직업 탐험대',
    desc: '직업 소개 영상을 본 뒤 직업 수수께끼를 풀고 내가 좋아하는 것·잘하는 것을 찾아요. 뒷면은 미래 명함과 일하는 내 모습.',
    gen({ ans }) {
      const M = mk(ans);
      const J = [['👩‍🍳', '요리사'], ['👨‍🚀', '우주 비행사'], ['🧑‍⚕️', '수의사'], ['👩‍🎨', '화가'], ['🧑‍💻', '프로그래머'], ['👨‍🌾', '농부'], ['🧑‍✈️', '비행기 조종사'], ['🧑‍🏫', '선생님']];
      const R = [['아픈 동물을 치료해요.', 3], ['컴퓨터 프로그램과 게임을 만들어요.', 5], ['곡식과 채소를 길러요.', 6], ['맛있는 음식을 만들어요.', 1], ['우주선을 타고 우주를 탐험해요.', 2], ['그림을 그려 사람들에게 보여 줘요.', 4]];
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '영상을 본 다음에 풀어요. 세상에는 수많은 직업이 있고, 모두 소중한 일이에요.',
        body: memo() + act(2, '직업 수수께끼: 하는 일을 읽고 알맞은 직업의 번호를 써요.', 7, `<div class="g4">${J.map(([e, t], i) => itm(e, `${i + 1}. ${t}`, '', 'padding:1mm')).join('')}</div><div class="g2" style="row-gap:1.5mm">${R.map(([t, n]) => `<div style="display:flex;align-items:center;gap:1.5mm;font-size:11pt">${M.bl(n, 9)}<span style="flex:1">${t}</span></div>`).join('')}</div>`)
          + act(3, '나를 살펴봐요.', 9, `<div class="g2 fill"><div class="box"><span class="hd">내가 좋아하는 것 세 가지</span></div><div class="box"><span class="hd">내가 잘하는 것 세 가지</span></div></div><div class="tint">그래서 내가 해 보고 싶은 일은 <span class="ul" style="min-width:76mm"></span>이에요.</div>`, true),
        tip: vtip('「초등 저학년 직업 탐색」, 「어린이 직업 소개」 (주니어 커리어넷, EBS 진로 영상)', '직업 이름보다 「무엇을 좋아하는가」에 초점을 맞춰 주세요.')
      });
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '20년 뒤의 나는 어떤 일을 하고 있을까요? 미래 명함을 만들어요.',
        body: act(4, '미래의 내 명함을 만들고 꾸며요.', 8, `<div class="cut" style="height:62mm;display:flex;gap:4mm;padding:4mm"><div class="draw" style="flex:.6"><small>내 얼굴</small></div><div style="flex:1;display:flex;flex-direction:column;justify-content:space-around;font-size:12.5pt"><div>이름: <span class="ul" style="min-width:60mm"></span></div><div>하는 일: <span class="ul" style="min-width:54mm"></span></div><div>일하는 곳: <span class="ul" style="min-width:50mm"></span></div><div>나의 한마디: "<span class="ul" style="min-width:58mm"></span>"</div></div></div>`)
          + act(5, '그 일을 하고 있는 미래의 내 모습을 그리고 색칠해요.', 9, draw(''), true)
          + act(6, '꿈을 이루려고 지금부터 할 수 있는 일', 3, lines(1)),
        tip: '명함을 오려 서로 주고받으며 「안녕하세요, 저는 ○○ 일을 하는 ○○○입니다」 하고 인사하는 놀이로 마무리해 보세요.'
      });
      return [p1, p2];
    }
  });

  /* 8 독도 */
  V({
    id: 'cre-dokdo', unit: '독도 교육', unitShort: '독도', title: '우리 땅 독도 지킴이',
    desc: '독도 영상을 본 뒤 독도 퀴즈로 정리해요. 뒷면은 독도 색칠하기와 독도 지킴이 임명장.',
    gen({ ans }) {
      const M = mk(ans);
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '영상을 본 다음에 풀어요. 독도는 우리나라 동쪽 끝에 있는 아름다운 섬이에요.',
        body: memo() + act(2, '독도 퀴즈: 보기에서 알맞은 말을 골라 써요.', 8, `<div class="chips">${['동해', '동도', '서도', '울릉도', '10', '괭이갈매기'].map(t => `<span class="chip">${t}</span>`).join('')}</div><div class="col fill" style="justify-content:space-around;font-size:12pt">
            ${q('①', `독도는 우리나라의 동쪽 바다인 ${M.bl('동해', 22)}에 있어요.`)}
            ${q('②', `독도는 큰 섬 두 개, ${M.bl('동도', 20)}와 ${M.bl('서도', 20)} 그리고 작은 바위섬들로 이루어져 있어요.`)}
            ${q('③', `독도에서 가장 가까운 우리나라 섬은 ${M.bl('울릉도', 24)}예요.`)}
            ${q('④', `독도의 날은 ${M.bl('10', 12)}월 25일이에요.`)}
            ${q('⑤', `독도에는 "야옹" 하고 고양이처럼 우는 새, ${M.bl('괭이갈매기', 34)}가 많이 살아요.`)}</div>`, true)
          + act(3, '독도가 소중한 까닭을 내 생각으로 써요.', 5, lines(2)),
        tip: vtip('「초등 저학년 독도 교육」, 「독도는 우리 땅 애니메이션」 (교육부 독도 교육 자료, 동북아역사재단 독도 영상)')
      });
      const dok = `<path d="M0 78 q12-6 24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 V110 H0Z" fill="${ans ? '#a5d8ff' : '#fff'}" stroke="#444" stroke-width="1"/>
        <path d="M22 80 L30 54 L38 48 L44 30 L52 26 L58 38 L66 42 L72 60 L80 80Z" fill="${ans ? '#c9a27e' : '#fff'}" stroke="#444" stroke-width="1.3" stroke-linejoin="round"/><path d="M44 30 L48 44 L42 56 M58 38 L56 52 L62 64" fill="none" stroke="#444" stroke-width=".8"/>
        <path d="M100 80 L106 58 L116 50 L124 40 L136 44 L146 38 L154 54 L162 62 L168 80Z" fill="${ans ? '#c9a27e' : '#fff'}" stroke="#444" stroke-width="1.3" stroke-linejoin="round"/><path d="M124 40 L126 56 L118 66 M146 38 L144 56 L150 68" fill="none" stroke="#444" stroke-width=".8"/>
        <path d="M134 44 v-12 h9 v5 h-9" fill="#fff" stroke="#444" stroke-width=".9"/>
        ${[[70, 18], [92, 28], [112, 14], [20, 30]].map(([x, y]) => `<path d="M${x} ${y} q5-6 9 0 q4-6 9 0" fill="none" stroke="#444" stroke-width="1.1" stroke-linecap="round"/>`).join('')}
        <circle cx="168" cy="16" r="8" fill="${ans ? '#ffe066' : '#fff'}" stroke="#444" stroke-width="1"/>${txt(50, 90, '서도', 5)}${txt(134, 90, '동도', 5)}
        <path d="M10 98 q6-4 12 0 M60 102 q6-4 12 0 M150 100 q6-4 12 0" fill="none" stroke="#444" stroke-width=".8"/>`;
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '독도를 멋지게 색칠하고, 독도 지킴이가 되어 보세요.',
        body: act(4, '독도를 색칠해요. 바다, 하늘, 갈매기, 태극기도 꾸며 보세요.', 12, svg(186, 110, dok), true)
          + act(5, '독도 지킴이 임명장', 8, `<div class="cut" style="text-align:center;padding:4mm;font-size:12.5pt;line-height:2.2"><div class="hd" style="font-size:18pt;line-height:1.4">독도 지킴이 임명장</div>2학년 <span class="ul" style="min-width:20mm"></span>반 <span class="ul" style="min-width:36mm"></span><br>위 어린이는 우리 땅 독도를 사랑하고 아끼며,<br>독도에 대해 <span class="ul" style="min-width:70mm"></span> 것을 약속합니다.</div>`),
        tip: '색칠하면서 「독도는 우리 땅」 노래를 들려주면 분위기가 살아납니다. 약속 예: 더 알아볼, 친구들에게 알려 줄.'
      });
      return [p1, p2];
    }
  });

  /* 9 다문화 */
  V({
    id: 'cre-multi', unit: '다문화 · 세계시민', unitShort: '다문화', title: '달라서 더 좋은 우리',
    desc: '다문화 이해 영상을 본 뒤 세계 여러 나라 인사말을 잇고 ○× 퀴즈로 정리해요. 뒷면은 친구와 나의 같은 점·다른 점 찾기.',
    gen({ ans }) {
      const M = mk(ans);
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '영상을 본 다음에 풀어요. 생김새와 말, 음식은 달라도 우리는 모두 소중한 친구예요.',
        body: memo() + act(2, '세계 여러 나라의 "안녕하세요": 나라와 인사말을 선으로 이어요.', 7, G2.match(['미국', '중국', '일본', '프랑스', '베트남', '인도'], ['헬로 (Hello)', '니하오', '곤니치와', '봉주르', '신짜오', '나마스테'], [3, 0, 5, 1, 4, 2], ans, { rh: 10, lw: 46, rw: 70, fs2: 5.2 }))
          + act(3, '서로 존중하는 행동이면 ○, 아니면 ×에 색칠해요.', 5, oxList([['친구네 나라 음식을 "이상해"라고 놀려요.', 0], ['친구의 이름을 정확하게 불러 주려고 노력해요.', 1], ['말이 서툰 친구의 이야기를 끝까지 기다려 들어요.', 1], ['나와 생김새가 다르다고 같이 놀지 않아요.', 0]], M))
          + act(4, '내가 알고 있는 다른 나라의 음식이나 놀이, 옷을 하나 골라 그리고 소개해요.', 4, `<div class="row fill">${draw('')}<div class="col" style="flex:1.1"><div><span class="ul" style="min-width:30mm"></span> 나라의 <span class="ul" style="min-width:34mm"></span></div>${lines(0, true)}</div></div>`, true),
        tip: vtip('「초등 저학년 다문화 이해 교육」, 「세계 여러 나라 인사말」 (다문화교육포털·EBS 세계시민 영상)', '인사말은 직접 소리 내어 따라 해 보세요.')
      });
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '좋아하는 음식·놀이·색, 잘하는 것을 짝과 서로 물어보세요. 다른 점은 틀린 것이 아니에요!',
        body: act(5, '짝과 나: 가운데에는 같은 점, 양쪽에는 서로 다른 점을 써요.', 12, svg(186, 104, `<ellipse cx="68" cy="54" rx="64" ry="46" fill="none" stroke="#444" stroke-width="1.2"/><ellipse cx="118" cy="54" rx="64" ry="46" fill="none" stroke="#444" stroke-width="1.2"/>${txt(34, 14, '나', 7, { fill: '#9c36b5' })}${txt(152, 14, '짝', 7, { fill: '#9c36b5' })}${txt(93, 22, '같은 점', 5.5, { fill: '#9c36b5' })}`), true)
          + act(6, '세계의 친구에게 보내는 그림엽서: 우리나라의 자랑거리를 그려 소개해요.', 8, `<div class="row" style="height:66mm">${draw('우리나라 자랑거리 (한글, 한복, 김치, 태권도 …)')}<div class="col cut" style="flex:.8"><div class="sm">세계의 친구에게</div>${lines(0, true)}<div class="sm" style="text-align:right">대한민국에서 <span class="ul" style="min-width:24mm"></span></div></div></div>`),
        tip: '「다르다」와 「틀리다」의 뜻을 구별해 쓰도록 짚어 주세요.'
      });
      return [p1, p2];
    }
  });

  /* 10 만능 */
  V({
    id: 'cre-any', unit: '어떤 영상에도', unitShort: '공통', title: '만능 영상 감상 활동지 3·2·1', answers: false,
    desc: '주제와 상관없이 어떤 영상에도 쓸 수 있는 감상 활동지. 새로 안 것 3가지, 기억에 남는 장면 2가지, 궁금한 것 1가지를 정리해요.',
    gen() {
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '영상을 집중해서 본 다음, 3·2·1로 정리해요.',
        body: `<div class="tint" style="flex:none;font-size:12.5pt">오늘 본 영상의 제목(주제): <span class="ul" style="min-width:100mm"></span></div>`
          + act(3, '새로 알게 된 것 세 가지', 7, `<div class="col" style="gap:0">${[1, 2, 3].map(i => `<div style="display:flex;gap:2mm;align-items:flex-end;height:12mm"><span class="hd">${i}</span><span style="flex:1;border-bottom:.45mm solid #555"></span></div>`).join('')}</div>`)
          + act(2, '기억에 남는 장면 두 가지를 그려요.', 8, `<div class="g2 fill">${draw('장면 1')}${draw('장면 2')}</div>`, true)
          + act(1, '더 궁금한 것 한 가지', 3, lines(1))
          + `<div class="tint" style="flex:none;text-align:center">이 영상에 별점을 준다면? <span style="font-size:20pt;letter-spacing:2mm">☆☆☆☆☆</span></div>`,
        tip: '어떤 영상에도 쓸 수 있습니다. 영상을 보기 전에 활동지를 먼저 훑어보게 하면 더 집중해서 봅니다.'
      });
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '영상 내용으로 퀴즈를 내고, 내 생활과 이어 봐요.',
        body: act(4, '내가 내는 퀴즈: 영상 내용으로 ○× 퀴즈 두 개를 만들어 짝에게 내요.', 7, `<div class="col" style="gap:2mm">${[1, 2].map(i => `<div class="box" style="display:flex;align-items:center;gap:2mm;height:19mm"><span class="hd">${i}</span><span style="flex:1"></span><span class="ox"><i>○</i><i>×</i></span></div>`).join('')}</div>`)
          + act(5, '영상 속 인물(또는 주인공)에게 하고 싶은 말', 4, `<div class="bub" style="min-height:26mm;margin-bottom:3mm"></div>`)
          + act(6, '오늘 배운 것을 실천하는 내 모습을 그리고, 다짐을 써요.', 9, `<div class="row fill">${draw('실천하는 내 모습')}<div class="col" style="flex:.9"><div class="hd">나의 다짐</div>${lines(0, true)}</div></div>`, true),
        tip: '창체 자율·동아리·진로 활동, 범교과(안전·인성·환경·통일·경제 등) 영상 수업에 두루 쓸 수 있습니다.'
      });
      return [p1, p2];
    }
  });
})();
