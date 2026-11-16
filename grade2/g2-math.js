/* 수학 1~3단원 */
(function () {
  const { reg, page, act, svg, txt, lines, draw, q, mk, img, range, shuffle, pick } = G2;
  /* 수 모형 */
  const blocks = (th, h, t, o) => {
    let x = 1, s = '';
    for (let i = 0; i < th; i++) { s += `<path d="M${x} 12h13v13h-13z M${x} 12l4-4h13l-4 4 M${x + 13} 25l4-4v-13" fill="#fff" stroke="#444" stroke-width=".6"/><path d="M${x + 4.3} 12v13M${x + 8.6} 12v13M${x} 16.3h13M${x} 20.6h13" stroke="#aaa" stroke-width=".3"/>`; x += 19; }
    for (let i = 0; i < h; i++) { s += `<rect x="${x}" y="13" width="12" height="12" fill="#fff" stroke="#444" stroke-width=".6"/><path d="M${x + 4} 13v12M${x + 8} 13v12M${x} 17h12M${x} 21h12" stroke="#aaa" stroke-width=".3"/>`; x += 14; }
    for (let i = 0; i < t; i++) { s += `<rect x="${x}" y="13" width="2.6" height="12" fill="#fff" stroke="#444" stroke-width=".5"/><path d="M${x} 16h2.6M${x} 19h2.6M${x} 22h2.6" stroke="#aaa" stroke-width=".3"/>`; x += 4.2; }
    for (let i = 0; i < o; i++) { s += `<rect x="${x + Math.floor(i / 3) * 3.6}" y="${22.4 - (i % 3) * 3.6}" width="2.6" height="2.6" fill="#fff" stroke="#444" stroke-width=".5"/>`; }
    return svg(96, 30, s, 'style="width:100%;height:19mm"');
  };
  const stone = (v, hide, M) => `<div style="flex:1;height:13mm;border:.5mm solid #444;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--fd);font-size:13pt;background:${hide ? '#fff' : 'var(--t)'}">${hide ? M.a(v) : v}</div>`;
  const lock = (n) => `<svg viewBox="0 0 30 34" style="width:11mm;height:12.5mm;flex:none"><path d="M8 15V10a7 7 0 0 1 14 0v5" fill="none" stroke="#444" stroke-width="2.4"/><rect x="3" y="15" width="24" height="17" rx="3" fill="#fff" stroke="#444" stroke-width="1.6"/><text x="15" y="24.5" font-size="11" text-anchor="middle" dominant-baseline="central" font-family="Jua,sans-serif">${n}</text></svg>`;

  /* ── 1단원 네 자리 수 ── */
  reg({
    id: 'math1-detective', subj: 'math', unit: '1단원 네 자리 수', unitShort: '1단원', title: '네 자리 수 탐정', mode: '40',
    desc: '수 모형을 보고 수를 쓰고 읽은 뒤, 단서를 풀어 금고 비밀번호를 찾아요. 뒷면에서는 나만의 금고 문제도 만들어요.',
    gen({ ans }) {
      const M = mk(ans);
      const B = [[2, 3, 1, 5, '이천삼백십오'], [1, 0, 4, 2, '천사십이'], [3, 2, 0, 6, '삼천이백육']];
      const P = [['4070', '사천칠십', '#ffc9c9'], ['4700', '사천칠백', '#ffec99'], ['4007', '사천칠', '#b2f2bb'], ['7040', '칠천사십', '#a5d8ff'], ['7400', '칠천사백', '#eebefa'], ['7004', '칠천사', '#ffd8a8']];
      const ro = [3, 0, 5, 1, 4, 2];
      const card = (t, col) => `<div style="border:.5mm solid #444;border-radius:3mm;text-align:center;font-family:var(--fd);font-size:17pt;padding:3.2mm 0;background:${ans ? col : '#fff'}">${t}</div>`;
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '1000이 몇 개, 100이 몇 개, 10이 몇 개, 1이 몇 개인지 살펴보세요.',
        body: act(1, '수 모형이 나타내는 수를 쓰고 읽어요.', 7, `<div class="g3">${B.map(b => `<div class="box" style="padding:2mm">${blocks(b[0], b[1], b[2], b[3])}<div class="sm" style="line-height:2.3">쓰기 ${M.bl('' + b[0] + b[1] + b[2] + b[3], 30)}<br>읽기 ${M.bl(b[4], 30)}</div></div>`).join('')}</div>`)
          + act(2, '색칠한 숫자가 나타내는 수는 얼마일까요?', 6, `<div class="g4">${[['3', '5', '28', '500'], ['', '7', '104', '7000'], ['62', '9', '3', '90'], ['418', '6', '', '6']].map(([a, b, c, v]) => `<div class="tint" style="text-align:center;padding:2mm"><div style="font-family:var(--fd);font-size:19pt;letter-spacing:.5mm">${a}<span style="background:#ffd43b;border-radius:1.5mm;padding:0 1mm">${b}</span>${c}</div>${M.bl(v, 26)}</div>`).join('')}</div>`)
          + act(3, '수와 읽은 말이 짝이 되도록 같은 색으로 칠해요. (여섯 가지 색)', 7, `<div class="col fill" style="justify-content:space-around"><div class="g3">${P.map(p => card(p[0], p[2])).join('')}</div><div class="g3">${ro.map(i => card(P[i][1], P[i][2])).join('')}</div><div class="tint sm">자리에 숫자가 없으면 0을 써요. 0이 있는 자리는 읽지 않아요. &nbsp;예) 4007 → 사천칠</div></div>`, true),
        tip: '활동 3은 0의 위치에 따라 수가 달라지는 것을 확인하는 활동입니다. 헷갈리는 어린이는 자릿값 표(천·백·십·일)에 숫자를 옮겨 쓰게 해 주세요.'
      });
      const S = [['A', '천의 자리 숫자는 2<br>백의 자리 숫자는 0<br>십의 자리 숫자는 7<br>일의 자리 숫자는 4', '2074'], ['B', '1000이 5개<br>100이 3개<br>1이 9개인 수', '5309'], ['C', '<br>육천팔백십이', '6812'], ['D', '<br>3000 + 400 + 50 + 6', '3456']];
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '단서를 읽고 금고의 비밀번호 네 자리를 찾아 주세요, 탐정님!',
        body: act(4, '단서를 풀어 금고 비밀번호를 써요.', 9, `<div class="g4">${S.map(([n, c, v]) => `<div class="box" style="padding:2mm;display:flex;flex-direction:column;align-items:center;gap:1.5mm">${lock(n)}<div class="sm" style="text-align:center;flex:1;line-height:1.5">${c}</div><div style="display:flex;gap:1mm">${v.split('').map(d => M.bl(d, 8)).join('')}</div></div>`).join('')}</div>
            <div class="row" style="align-items:center"><div class="box" style="flex:2.2;display:flex;gap:3mm;align-items:center">${lock('E')}<div class="sm"><b class="hd">도전!</b> 천의 자리 숫자는 8이에요. 백의 자리 숫자는 천의 자리 숫자보다 3 작아요. 십의 자리 숫자는 0이고, 일의 자리 숫자는 백의 자리 숫자와 같아요.</div><div style="display:flex;gap:1mm;flex:none">${'8505'.split('').map(d => M.bl(d, 8)).join('')}</div></div>
            <div class="tint sm" style="line-height:2.2">가장 큰 번호 ${M.bl('8505', 22)}<br>가장 작은 번호 ${M.bl('2074', 22)}</div></div>`)
          + act(5, '나만의 금고 문제를 만들고 금고를 꾸며요. 짝과 바꿔 풀어요.', 11, `<div class="row fill"><div class="col" style="flex:1.2"><div class="sm">비밀번호를 정하고(짝에게는 비밀!), 단서를 써요.</div><div class="tint sm" style="line-height:2.5">천의 자리 숫자는 <span class="ul" style="min-width:60mm"></span><br>백의 자리 숫자는 <span class="ul" style="min-width:60mm"></span><br>십의 자리 숫자는 <span class="ul" style="min-width:60mm"></span><br>일의 자리 숫자는 <span class="ul" style="min-width:60mm"></span></div><div class="sm">짝이 찾은 번호: <span class="bl"></span><span class="bl"></span><span class="bl"></span><span class="bl"></span> &nbsp;맞았나요? ( ○ / × )</div></div>
            <div class="draw" style="display:flex;align-items:center;justify-content:center"><small>금고를 멋지게 색칠하고 꾸며요</small>${svg(80, 80, '<rect x="8" y="10" width="64" height="60" rx="6" fill="#fff" stroke="#444" stroke-width="1.5"/><rect x="14" y="16" width="52" height="48" rx="3" fill="#fff" stroke="#444" stroke-width="1"/><circle cx="40" cy="40" r="11" fill="#fff" stroke="#444" stroke-width="1.2"/><path d="M40 29v22M29 40h22M32 32l16 16M48 32l-16 16" stroke="#444" stroke-width="1"/><circle cx="40" cy="40" r="3" fill="#fff" stroke="#444"/><rect x="16" y="70" width="8" height="5" fill="#fff" stroke="#444"/><rect x="56" y="70" width="8" height="5" fill="#fff" stroke="#444"/>', 'style="width:55%;height:auto"')}</div></div>`, true),
        tip: '활동 5는 「3보다 2 큰 수」처럼 조금 꼬아 낸 단서도 환영해 주세요. 문제를 내는 과정이 가장 좋은 복습입니다.'
      });
      return [p1, p2];
    }
  });

  reg({
    id: 'math1-jump', subj: 'math', unit: '1단원 네 자리 수', unitShort: '1단원', title: '뛰어 세기 징검다리', mode: '40', pair: true, need: '클립, 연필',
    desc: '1000·100·10·1씩 뛰어 세며 징검다리를 건너요. 뒷면은 크기 비교, 수 카드로 큰 수 만들기, 짝과 하는 「큰 수 대결」.',
    gen({ ans }) {
      const M = mk(ans);
      const R = [['1000씩 뛰어 세기', [2300, 3300, 4300, 5300, 6300, 7300], [2, 3, 5], 0], ['100씩 뛰어 세기', [4150, 4250, 4350, 4450, 4550, 4650], [2, 4, 5], 0], ['', [6970, 6980, 6990, 7000, 7010, 7020], [2, 3, 5], '10'], ['', [3997, 3998, 3999, 4000, 4001, 4002], [2, 3, 4], '1'], ['', [9500, 9400, 9300, 9200, 9100, 9000], [2, 3, 5], '100']];
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '어느 자리 숫자가 변하는지 보면 몇씩 뛰어 세었는지 알 수 있어요.',
        body: act(1, '빈 징검다리에 알맞은 수를 써요. 아래 세 줄은 몇씩 뛰어 세었는지도 써요.', 12, `<div class="col fill" style="justify-content:space-around">${R.map(([t, vs, hid, k], i) => `<div><div class="sm hd">${t || `${M.bl(k, 16)}씩 ${i === 4 ? '거꾸로 ' : ''}뛰어 세기`}</div><div class="row" style="gap:2mm;align-items:center">${vs.map((v, j) => stone(v, hid.includes(j), M)).join('<span style="flex:none;color:#888">→</span>')}</div></div>`).join('')}</div>`, true)
          + act(2, '뛰어 세기로 풀어요.', 8, `${q('①', `돼지 저금통에 2500원이 있어요. 하루에 1000원씩 4일 동안 더 넣으면 모두 ${M.bl('6500', 22)}원이 돼요.`)}
            ${q('②', `색종이가 3850장 있어요. 100장씩 3번 더 사 오면 모두 ${M.bl('4150', 22)}장이 돼요.`)}
            ${q('③', `지금 줄넘기 기록은 1996번이에요. 10번씩 2번 더 넘으면 ${M.bl('2016', 22)}번이 돼요.`)}`),
        tip: '10씩·1씩 뛰어 세다가 백의 자리·천의 자리가 바뀌는 곳(6990→7000, 3999→4000)을 특히 짚어 주세요.'
      });
      const C = [[3456, 3465], [7001, 6999], [5820, 5802], [2099, 2100], [9010, 9100], [1234, 987], [6050, 6005], [8888, 8898]];
      const game = (who) => `<div><table class="t"><tr><th style="width:20%">${who}</th><th>천</th><th>백</th><th>십</th><th>일</th><th style="width:20%">승리 ○</th></tr>${[1, 2, 3, 4].map(n => `<tr><th>${n}판</th><td style="height:13.5mm"></td><td></td><td></td><td></td><td></td></tr>`).join('')}</table></div>`;
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '높은 자리 숫자부터 차례로 비교해요.',
        body: act(3, '더 큰 수 쪽으로 입을 벌리게 ○ 안에 &gt; 또는 &lt;를 써요.', 5, `<div class="g4" style="row-gap:2mm">${C.map(([a, b]) => `<div style="display:flex;align-items:center;justify-content:center;gap:1.5mm;font-family:var(--fd);font-size:12.5pt">${a}<span style="width:8mm;height:8mm;border:.45mm solid #555;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;color:#e03131">${ans ? (a > b ? '&gt;' : '&lt;') : ''}</span>${b}</div>`).join('')}</div>`)
          + act(4, '수 카드 4장을 한 번씩만 써서 네 자리 수를 만들어요.', 5, `<div class="g2">${[[[3, 7, 1, 5], '7531', '1357'], [[4, 0, 8, 2], '8420', '2048']].map(([cs, a, b]) => `<div class="tint"><div style="display:flex;gap:2mm;justify-content:center">${cs.map(c => `<span style="width:10mm;height:12mm;border:.5mm solid #444;border-radius:2mm;background:#fff;display:inline-flex;align-items:center;justify-content:center;font-family:var(--fd);font-size:16pt">${c}</span>`).join('')}</div><div class="sm" style="line-height:2.3;text-align:center">가장 큰 수 ${M.bl(a, 20)}<br>가장 작은 수 ${M.bl(b, 20)}</div></div>`).join('')}</div><div class="sm" style="color:#777;text-align:center">※ 0은 천의 자리에 올 수 없어요.</div>`)
          + act(5, '짝 놀이 「큰 수 대결」', 10, `<div class="row" style="align-items:center">${G2.spinner(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], 34)}<div class="tint sm" style="flex:4">① 번갈아 돌림판을 돌려요. 나온 숫자를 천·백·십·일 가운데 <b>한 칸</b>에 써요.<br>② 한번 쓴 숫자는 옮길 수 없어요. (천의 자리에 0이 오면 세 자리 수!)<br>③ 네 칸을 다 채우면 수를 읽고, 더 큰 수를 만든 사람이 이겨요.<br>④ 네 판을 해서 더 많이 이긴 사람이 「큰 수 왕」!</div></div><div class="row fill" style="align-items:start">${game('나')}${game('짝')}</div>`, true),
        tip: '「큰 수 대결」에서는 큰 숫자를 높은 자리에 써야 유리하다는 것을 놀이 뒤에 어린이들의 말로 정리해 주세요. 「작은 수 대결」로 바꿔 한 번 더 해도 좋습니다.'
      });
      return [p1, p2];
    }
  });

  reg({
    id: 'math1-mosaic', subj: 'math', unit: '1단원 네 자리 수', unitShort: '1단원', title: '네 자리 수 모자이크', mode: '40', seed: 12, need: '색연필(하늘·초록·갈색·빨강)',
    desc: '수의 크기를 비교해 칸을 색칠하면 숨은 그림이 나타나요. 뒷면은 수 수수께끼와 나만의 번호판 꾸미기.',
    gen({ ans, r }) {
      const M = mk(ans);
      const PAT = ['SSSSSSSSSSSS', 'SSSSSSBSSSSS', 'SSSSSBGGSSSS', 'SSSSSBGGGSSS', 'SSSRRBRRRSSS', 'SSRRRRRRRRSS', 'SRRRRRRRRRRS', 'SRRRRRRRRRRS', 'SRRRRRRRRRRS', 'SRRRRRRRRRRS', 'SSRRRRRRRRSS', 'SSSRRSSRRSSS'];
      const COL = { S: ['하늘', '#d0ebff'], G: ['초록', '#8ce99a'], B: ['갈색', '#c9a27e'], R: ['빨강', '#ff8787'] };
      const RNG = { S: [1000, 2999], G: [3001, 4999], B: [5001, 6999], R: [7001, 9999] };
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '칸에 적힌 수가 어느 범위에 들어가는지 보고 색칠해 보세요. 무엇이 나타날까요?',
        body: G2.legend([['3000보다 작은 수', '하늘색', COL.S[1]], ['3000보다 크고 5000보다 작은 수', '초록', COL.G[1]], ['5000보다 크고 7000보다 작은 수', '갈색', COL.B[1]], ['7000보다 큰 수', '빨강', COL.R[1]]])
          + G2.mosaic(PAT, COL, (ch) => { const [a, b] = RNG[ch]; return a + Math.floor(r() * (b - a + 1)); }, ans, 15, 4.6)
          + `<div class="tint sm" style="text-align:center">완성한 그림은 무엇인가요? ${M.ul('사과', 40)}</div>`,
        tip: '색칠 전에 3000·5000·7000을 기준으로 천의 자리 숫자를 먼저 본다는 것을 함께 확인해 주세요. 약 20분이 걸립니다.'
      });
      const Q = [['나는 4999보다 1 큰 수예요.', '5000'], ['나는 1000이 3개, 10이 8개인 수예요.', '3080'], ['나는 6000보다 크고 6010보다 작아요. 일의 자리 숫자는 5예요.', '6005'], ['나는 2750에서 100씩 3번 뛰어 센 수예요.', '3050']];
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '수가 낸 수수께끼를 풀고, 나만의 네 자리 수를 소개해요.',
        body: act(1, '나는 어떤 수일까요?', 8, `<div class="g2">${Q.map(([t, v], i) => `<div class="box" style="display:flex;align-items:center;gap:2mm"><div class="sm" style="flex:1">${'①②③④'[i]} ${t}</div>${M.bl(v, 22)}</div>`).join('')}</div>`)
          + act(2, '내가 좋아하는 네 자리 수로 번호판을 꾸미고 색칠해요.', 5, `<div style="border:1.2mm solid #444;border-radius:5mm;height:34mm;display:flex;align-items:center;justify-content:center;gap:5mm;position:relative"><span style="position:absolute;left:4mm;top:2mm;font-family:var(--fd);font-size:10pt;color:#888">2학년</span>${[1, 2, 3, 4].map(() => '<span style="width:24mm;height:24mm;border:.5mm dashed #999;border-radius:3mm"></span>').join('')}</div>`)
          + act(3, '내 수를 소개해요.', 7, `<div class="col fill" style="justify-content:space-around;font-size:12pt">
            <div>읽기: <span class="ul" style="min-width:70mm"></span></div>
            <div>내 수는 1000이 <span class="bl"></span>개, 100이 <span class="bl"></span>개, 10이 <span class="bl"></span>개, 1이 <span class="bl"></span>개인 수예요.</div>
            <div>내 수보다 100 큰 수: <span class="bl" style="min-width:24mm"></span> &nbsp; 내 수보다 1000 작은 수: <span class="bl" style="min-width:24mm"></span></div>
            <div>내 수에서 10씩 뛰어 세기: <span class="bl" style="min-width:22mm"></span> → <span class="bl" style="min-width:22mm"></span> → <span class="bl" style="min-width:22mm"></span></div>
            <div>이 수를 고른 까닭: <span class="ul" style="min-width:120mm"></span></div>
            <div>짝의 수 <span class="bl" style="min-width:24mm"></span> 와 비교하면, 더 큰 수는 <span class="bl" style="min-width:24mm"></span> 이에요.</div></div>`, true),
        tip: '「더 해 보기」 모둠 친구들의 번호판을 모아 작은 수부터 차례로 줄을 세워 보게 하세요.'
      });
      return [p1, p2];
    }
  });

  /* ── 2단원 곱셈구구 ── */
  const FACTS = []; for (let a = 2; a <= 9; a++) for (let b = 2; b <= 9; b++) FACTS.push([a, b, a * b]);
  reg({
    id: 'math2-pixel', subj: 'math', unit: '2단원 곱셈구구', unitShort: '2단원', title: '곱셈구구 픽셀 색칠', mode: '40', seed: 22, need: '색연필(노랑·빨강·파랑·주황)',
    desc: '곱셈구구의 답에 따라 칸을 색칠하면 숨은 그림이 나타나요. 뒷면은 곱셈표 완성하기와 답이 같은 풍선 색칠.',
    gen({ ans, r }) {
      const M = mk(ans);
      const PAT = ['.....R.....', '....RRR....', '....RRR....', '...YYYYY...', '...YBBBY...', '...YBBBY...', '...YYYYY...', '...YYYYY...', '..RYYYYYR..', '.RRYYYYYRR.', '.RR.OOO.RR.', '....OOO....', '.....O.....'];
      const COL = { Y: ['노랑', '#ffe066'], R: ['빨강', '#ff8787'], B: ['파랑', '#74c0fc'], O: ['주황', '#ffa94d'] };
      const RNG = { Y: [10, 24], R: [25, 42], B: [45, 56], O: [63, 81] };
      const cell = (ch) => {
        if (ch === '.') { const n = 2 + Math.floor(r() * 8), z = r() < .35 ? 0 : 1; return r() < .5 ? `${z}×${n}` : `${n}×${z}`; }
        const f = pick(FACTS.filter(f => f[2] >= RNG[ch][0] && f[2] <= RNG[ch][1]), r); return `${f[0]}×${f[1]}`;
      };
      const p1 = page(this, {
        side: '앞면', min: 22, sub: '곱셈구구의 답을 구하고, 답이 들어가는 범위의 색으로 칠해요. 답이 0~9이면 칠하지 않아요.',
        body: G2.legend([['답이 10~24', '노랑', COL.Y[1]], ['답이 25~42', '빨강', COL.R[1]], ['답이 45~56', '파랑', COL.B[1]], ['답이 63~81', '주황', COL.O[1]]])
          + G2.mosaic(PAT, COL, cell, ans, 14, 4.7)
          + `<div class="tint sm" style="text-align:center">완성한 그림은 무엇인가요? ${M.ul('로켓(우주선)', 46)}</div>`,
        tip: '칸에 답을 작게 써 놓고 색칠하면 실수가 줄어듭니다. 1단과 0의 곱(답이 0~9)은 칠하지 않는 칸입니다.'
      });
      const rowsT = [3, 4, 6, 7, 8, 9], colsT = [2, 3, 4, 5, 6, 7, 8, 9];
      const BAL = [[12, '2×6'], [18, '3×6'], [24, '4×6'], [36, '6×6'], [24, '3×8'], [12, '3×4'], [36, '4×9'], [18, '2×9'], [12, '6×2'], [24, '8×3'], [18, '9×2'], [36, '9×4'], [18, '6×3'], [12, '4×3'], [24, '6×4']];
      const BC = { 12: '#ffe066', 18: '#ff8787', 24: '#74c0fc', 36: '#8ce99a' };
      const p2 = page(this, {
        side: '뒷면', min: 18, sub: '곱셈표에서 가로와 세로가 만나는 칸에 두 수의 곱을 써요.',
        body: act(1, '곱셈표의 빈칸을 채워요.', 9, `<table class="t"><tr><th>×</th>${colsT.map(c => `<th>${c}</th>`).join('')}</tr>${rowsT.map(a => `<tr><th>${a}</th>${colsT.map(b => { const hide = r() < .55; return `<td>${hide ? M.a(a * b) : a * b}</td>`; }).join('')}</tr>`).join('')}</table>`)
          + act(2, '답이 같은 풍선끼리 같은 색으로 칠해요. (답이 12, 18, 24, 36인 풍선)', 9, svg(186, 96, BAL.map(([v, t], i) => { const x = 14 + (i % 8) * 22.5 + (i >= 8 ? 11 : 0), y = i < 8 ? 22 : 62; return `<path d="M${x} ${y + 15} q-3 8 0 ${i < 8 ? 16 : 14}" fill="none" stroke="#666" stroke-width=".6"/><ellipse cx="${x}" cy="${y}" rx="10" ry="13" fill="${ans ? BC[v] : '#fff'}" stroke="#444" stroke-width=".8"/><path d="M${x - 2} ${y + 15.5}h4l-2-3z" fill="#fff" stroke="#444" stroke-width=".6"/>${txt(x, y, t, 6.2)}`; }).join('')), true)
          + `<div class="tint sm" style="text-align:center">곱하는 두 수의 순서를 바꾸어도 곱은 같아요. &nbsp; 3×8 = 8×3 = ${M.bl('24', 14)}</div>`,
        tip: '「더 해 보기」 답이 16이 되는 곱셈식(2×8, 4×4, 8×2)을 모두 찾아보게 하세요.'
      });
      return [p1, p2];
    }
  });

  reg({
    id: 'math2-maze', subj: 'math', unit: '2단원 곱셈구구', unitShort: '2단원', title: '곱셈구구 미로 탈출', mode: '40', seed: 5,
    desc: '6·7·8·9단의 수만 따라가며 미로 네 개를 탈출해요. 뒷면은 간식 파티 문장제와 곱셈식 만들기.',
    gen({ ans, r }) {
      const M = mk(ans);
      const maze = (n) => `<div class="col" style="gap:1mm"><div class="hd" style="font-size:12.5pt;display:flex;justify-content:space-between"><span>▶ 출발</span><span>${n}단의 수만 따라가요</span></div>${G2.multMaze(n, 6, 6, r, ans)}<div class="hd" style="font-size:12.5pt;text-align:right">도착 ★</div></div>`;
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '왼쪽 위에서 출발해 오른쪽 아래까지! 길은 가로·세로로만 이어져요. 지나간 칸은 색칠해요.',
        body: `<div class="g2 fill" style="gap:4mm 8mm;align-content:space-around">${[6, 7, 8, 9].map(maze).join('')}</div>`,
        tip: '「6단의 수」는 6×1부터 6×9까지의 답입니다. 막히면 그 단을 작게 소리 내어 외우며 찾아보게 해 주세요.'
      });
      const W = [['사탕이 한 봉지에 6개씩 들어 있어요. 4봉지에는 모두 몇 개일까요?', '6×4=24', '24개'], ['세발자전거가 7대 있어요. 바퀴는 모두 몇 개일까요?', '3×7=21', '21개'], ['친구들이 한 줄에 8명씩 3줄로 섰어요. 모두 몇 명일까요?', '8×3=24', '24명'], ['문어 한 마리의 다리는 8개예요. 문어 5마리의 다리는 모두 몇 개일까요?', '8×5=40', '40개'], ['빈 접시가 5개 있어요. 접시에 놓인 쿠키는 모두 몇 개일까요?', '0×5=0', '0개']];
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '「몇 개씩 몇 묶음」인지 찾으면 곱셈식을 세울 수 있어요.',
        body: act(1, '간식 파티 문제: 곱셈식을 쓰고 답을 구해요.', 11, `<div class="col" style="gap:4.5mm;padding:1.5mm 0">${W.map(([t, f, a], i) => `<div class="row" style="align-items:center;gap:2mm"><div style="flex:1;font-size:11.5pt;line-height:1.35"><b class="hd">${'①②③④⑤'[i]}</b> ${t}</div><div style="flex:none;font-size:11pt">식 ${M.bl(f, 34)} 답 ${M.bl(a, 18)}</div></div>`).join('')}</div>`)
          + act(2, '답이 되는 곱셈식을 모두 찾아 써요. (2단~9단)', 5, `<div class="g2"><div class="tint" style="min-height:22mm"><b class="hd">답이 24</b> ${M.a('3×8, 8×3, 4×6, 6×4')}</div><div class="tint" style="min-height:22mm"><b class="hd">답이 36</b> ${M.a('4×9, 9×4, 6×6')}</div></div>`)
          + act(3, '내가 만드는 곱셈 문제: 문제를 쓰고 그림으로 나타내요.', 4, `<div class="row fill">${`<div class="col" style="flex:1.4">${lines(0, true)}<div class="sm">식 <span class="bl" style="min-width:34mm"></span> 답 <span class="bl" style="min-width:18mm"></span></div></div>`}${draw('그림')}</div>`, true),
        tip: '⑤는 0의 곱을 묻는 문제입니다. 「0개씩 5접시」임을 그림으로 확인해 주세요.'
      });
      return [p1, p2];
    }
  });

  reg({
    id: 'math2-game', subj: 'math', unit: '2단원 곱셈구구', unitShort: '2단원', title: '곱셈 땅따먹기와 빙고', mode: '40', pair: true, answers: false, seed: 9, need: '클립, 연필, 색연필 2색',
    desc: '짝과 돌림판을 두 번 돌려 곱을 구하고 땅을 차지해요. 뒷면은 선생님이 부르는 곱셈식으로 하는 곱셈 빙고.',
    gen({ r }) {
      const all = [...new Set(FACTS.map(f => f[2]))].sort((a, b) => a - b);
      const cells = shuffle(all.concat([12, 18, 24, 36, 16]), r);
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '짝과 함께! 돌림판을 두 번 돌려 나온 두 수를 곱해요.',
        body: `<div class="row" style="flex:none;align-items:center">${G2.spinner(['2', '3', '4', '5', '6', '7', '8', '9'], 36)}<div class="tint sm" style="flex:4"><b class="hd">놀이 방법</b><br>① 서로 다른 색 색연필을 하나씩 골라요.<br>② 돌림판을 두 번 돌려 나온 두 수로 곱셈식을 말해요. 예) "6 곱하기 7은 42!"<br>③ 답이 맞으면 그 수가 적힌 땅 한 칸을 내 색으로 칠해요. (이미 칠해졌거나 틀리면 차례가 넘어가요.)<br>④ 땅이 모두 칠해지거나 시간이 끝났을 때 땅이 더 많은 사람이 이겨요.</div></div>`
          + `<div class="fill" style="display:flex;justify-content:center">${svg(122, 122, cells.map((v, i) => `<rect x="${1 + (i % 6) * 20}" y="${1 + Math.floor(i / 6) * 20}" width="20" height="20" rx="3" fill="#fff" stroke="#444" stroke-width=".6"/>${txt(11 + (i % 6) * 20, 11.4 + Math.floor(i / 6) * 20, v, 8.5)}`).join(''))}</div>`
          + `<div class="tint sm" style="text-align:center">내 땅 <span class="bl"></span>칸 &nbsp; 짝의 땅 <span class="bl"></span>칸 &nbsp; 이긴 사람: <span class="ul" style="min-width:30mm"></span></div>`,
        tip: '짝이 말한 답이 맞는지 서로 확인하게 하고, 다툼이 생기면 곱셈표로 확인합니다. 10분 놀이 → 짝 바꿔 한 판 더 하면 20분입니다.'
      });
      const bank = [12, 14, 16, 18, 21, 24, 27, 28, 32, 35, 36, 42, 45, 48, 49, 54, 56, 63, 72, 81];
      const bingo = (n) => `<div class="col"><div class="hd" style="text-align:center">${n}번째 판</div><div style="display:grid;grid-template-columns:repeat(4,1fr);border:.6mm solid #444;border-radius:3mm;overflow:hidden;aspect-ratio:1">${range(16, () => '<div style="border:.3mm solid #777"></div>').join('')}</div></div>`;
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '선생님이 부르는 곱셈식의 답을 찾아 ○표! 가로·세로·대각선 한 줄이 먼저 되면 "빙고!"',
        body: act(1, '아래 수 20개 가운데 16개를 골라 빙고 칸에 마음대로 써요.', 4, `<div class="chips">${bank.map(b => `<span class="chip">${b}</span>`).join('')}</div>`)
          + act(2, '곱셈 빙고! (두 판)', 12, `<div class="row">${bingo('첫')}${bingo('두')}</div>`)
          + act(3, '놀이를 마치고', 4, `<div class="col" style="gap:3mm"><div>오늘 바로바로 답이 나온 곱셈식: <span class="bl" style="min-width:26mm"></span> <span class="bl" style="min-width:26mm"></span> <span class="bl" style="min-width:26mm"></span></div><div>아직 헷갈리는 곱셈식: <span class="bl" style="min-width:26mm"></span> <span class="bl" style="min-width:26mm"></span> <span class="bl" style="min-width:26mm"></span> </div></div>`)
          + act(4, '헷갈리는 곱셈식 하나를 골라 그림으로 그려 기억해요.', 0, `<div class="row fill">${draw('예) 7×8 → 7개씩 8묶음')}${draw('곱셈식: ')}</div>`, true),
        tip: '<b style="margin:0">부르는 곱셈식</b>(섞어서 부르세요): 3×4, 2×7, 4×4, 6×3, 7×3, 8×3, 9×3, 4×7, 8×4, 5×7, 6×6, 7×6, 9×5, 6×8, 7×7, 9×6, 8×7, 7×9, 9×8, 9×9'
      });
      return [p1, p2];
    }
  });

  reg({
    id: 'math2-cipher', subj: 'math', unit: '2단원 곱셈구구', unitShort: '2단원', title: '곱셈 암호 수수께끼', mode: '40',
    desc: '곱셈구구의 답을 암호표에서 찾아 글자로 바꾸면 수수께끼의 답이 나와요. 뒷면에서는 나만의 암호도 만들어요.',
    gen({ ans }) {
      const KEY = [[12, '그'], [16, '과'], [18, '자'], [20, '나'], [21, '달'], [24, '하'], [27, '레'], [28, '복'], [32, '아'], [35, '림'], [36, '무'], [42, '걸'], [45, '도'], [48, '킹'], [54, '콩'], [56, '치'], [63, '우'], [64, '별'], [72, '천'], [81, '숭']];
      const keyT = `<table class="t" style="table-layout:fixed">${[0, 10].map(o => `<tr>${KEY.slice(o, o + 10).map(k => `<th style="height:7mm;font-size:11pt">${k[0]}</th>`).join('')}</tr><tr>${KEY.slice(o, o + 10).map(k => `<td style="font-family:var(--fd);font-size:14pt">${k[1]}</td>`).join('')}</tr>`).join('')}</table>`;
      const rid = (n, qz, fs, word) => `<div class="box" style="display:flex;align-items:center;gap:3mm;padding:2mm 3mm"><div style="flex:1;font-size:11.5pt;line-height:1.35"><b class="hd">${n}</b> ${qz}</div><div style="display:flex;gap:1.5mm;flex:none">${fs.map((f, i) => `<div style="text-align:center;font-family:var(--fd);font-size:11pt;line-height:1.3">${f}<br><span class="bl" style="min-width:11mm;height:7mm;line-height:6mm;font-size:10pt">${ans ? eval(f.replace('×', '*')) : ''}</span><br><span class="bl" style="min-width:11mm;height:9.5mm;line-height:8.5mm;font-size:14pt;margin-top:.8mm;border-width:.7mm">${ans ? word[i] : ''}</span></div>`).join('')}</div></div>`;
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '곱셈식의 답을 구하고(위 칸), 암호표에서 그 수의 글자를 찾아 써요(아래 칸).',
        body: `<div class="hd" style="font-size:13pt">암호표</div>${keyT}<div class="col fill" style="justify-content:space-around">`
          + rid('①', '아침에는 길고 낮에는 짧아지는 것은?', ['3×4', '5×7', '2×9'], '그림자')
          + rid('②', '닦으면 닦을수록 더러워지는 것은?', ['6×7', '3×9'], '걸레')
          + rid('③', '이가 아픈 사람들이 가는 곳은?', ['7×8', '4×4'], '치과')
          + rid('④', '소가 웃으면 어떤 소리가 날까요?', ['7×9', '4×6', '3×8'], '우하하')
          + rid('⑤', '세상에서 가장 뜨거운 과일은? (힌트: 1000도!)', ['8×9', '5×9', '4×7', '9×9', '4×8'], '천도복숭아')
          + rid('⑥', '왕이 "쿵" 하고 넘어지면?', ['6×8', '6×9'], '킹콩') + '</div>',
        tip: '수수께끼 답을 먼저 짐작해도 좋지만, 반드시 곱셈식으로 확인하게 해 주세요.'
      });
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '수수께끼 두 개를 더 풀고, 친구에게 낼 암호 문제를 만들어요.',
        body: `<div class="hd" style="font-size:13pt">암호표</div>${keyT}`
          + rid('⑦', '겨울에는 옷을 벗고 여름에는 옷을 입는 것은?', ['4×5', '6×6'], '나무')
          + rid('⑧', '밤이 되면 뜨고, 날마다 모양이 바뀌는 것은?', ['3×7'], '달')
          + act(1, '암호표의 글자로 낱말을 만들고, 글자마다 곱셈식을 써서 암호 문제를 내요.', 12, `<div class="tint sm">예) 「과자」 → 과는 16이니까 2×8, 자는 18이니까 3×6 &nbsp;➜&nbsp; 문제: 2×8, 3×6</div>
            <div class="g2 fill">${[1, 2].map(n => `<div class="box col" style="justify-content:space-around"><div class="hd">암호 문제 ${n}</div><div class="sm">곱셈식: <span class="ul" style="min-width:58mm"></span></div><div class="sm">힌트: <span class="ul" style="min-width:64mm"></span></div><div class="sm">짝이 푼 답: <span class="ul" style="min-width:36mm"></span> ( ○ / × )</div></div>`).join('')}</div>`, true),
        tip: '암호표로 만들 수 있는 낱말 예: 그림, 하나, 복도, 치아, 콩나무, 복숭아, 우레… 표에 없는 글자는 쓸 수 없어서 낱말을 궁리하는 것도 재미 요소입니다.'
      });
      return [p1, p2];
    }
  });

  /* ── 3단원 길이 재기 ── */
  reg({
    id: 'math3-animals', subj: 'math', unit: '3단원 길이 재기', unitShort: '3단원', title: '동물 운동회 길이 재기', mode: '40',
    desc: 'm와 cm를 바꾸어 쓰고, 동물들의 멀리뛰기 기록으로 길이의 합과 차를 구해요. 뒷면은 알맞은 단위 고르기와 리본 색칠.',
    gen({ ans }) {
      const M = mk(ans);
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '100cm는 1m와 같아요. 1m를 「1 미터」라고 읽어요.',
        body: act(1, '□ 안에 알맞은 수를 써요.', 5, `<div class="g3" style="row-gap:2.5mm;font-size:12pt">
            <div>2m = ${M.bl('200')}cm</div><div>300cm = ${M.bl('3', 10)}m</div><div>1m 50cm = ${M.bl('150')}cm</div>
            <div>240cm = ${M.bl('2', 9)}m ${M.bl('40', 10)}cm</div><div>3m 5cm = ${M.bl('305')}cm</div><div>408cm = ${M.bl('4', 9)}m ${M.bl('8', 10)}cm</div></div>`)
          + act(2, '동물 멀리뛰기 대회 기록표를 완성하고 물음에 답해요.', 7, `<table class="t"><tr><th>동물</th><th>개구리</th><th>토끼</th><th>여우</th><th>캥거루</th></tr><tr><th>기록</th><td>1m 20cm</td><td>2m 35cm</td><td>${M.a('3m 10cm')}</td><td>${M.a('5m 42cm')}</td></tr><tr><th>cm로</th><td>${M.a('120cm')}</td><td>${M.a('235cm')}</td><td>310cm</td><td>542cm</td></tr></table>
            ${q('①', `가장 멀리 뛴 동물은 ${M.ul('캥거루', 30)}예요.`)}
            ${q('②', `개구리와 토끼의 기록을 더하면 ${M.bl('3', 9)}m ${M.bl('55', 10)}cm예요.`)}
            ${q('③', `캥거루는 여우보다 ${M.bl('2', 9)}m ${M.bl('32', 10)}cm 더 멀리 뛰었어요.`)}`)
          + act(3, '길이의 합과 차를 구해요. m는 m끼리, cm는 cm끼리!', 8, `<div class="g2 fill" style="align-content:space-around;font-size:12pt">
            <div>2m 30cm + 1m 45cm = ${M.bl('3', 9)}m ${M.bl('75', 10)}cm</div><div>4m 12cm + 3m 6cm = ${M.bl('7', 9)}m ${M.bl('18', 10)}cm</div>
            <div>5m 68cm − 2m 25cm = ${M.bl('3', 9)}m ${M.bl('43', 10)}cm</div><div>7m 90cm − 4m 50cm = ${M.bl('3', 9)}m ${M.bl('40', 10)}cm</div>
            <div>3m 24cm + 2m 51cm = ${M.bl('5', 9)}m ${M.bl('75', 10)}cm</div><div>1m 7cm + 6m 80cm = ${M.bl('7', 9)}m ${M.bl('87', 10)}cm</div>
            <div>8m 49cm − 5m 16cm = ${M.bl('3', 9)}m ${M.bl('33', 10)}cm</div><div>9m 75cm − 3m 70cm = ${M.bl('6', 9)}m ${M.bl('5', 10)}cm</div></div>`, true),
        tip: '기록표에서 「3m 5cm = 305cm」처럼 십의 자리에 0이 들어가는 경우를 다시 짚어 주세요.'
      });
      const U = [['연필의 길이', '약 15', 0], ['교실 문의 높이', '약 2', 1], ['지우개의 길이', '약 5', 0], ['버스의 길이', '약 11', 1], ['어른의 키', '약 170', 0], ['줄넘기 줄의 길이', '약 2', 1], ['내 한 뼘의 길이', '약 13', 0], ['운동장 긴 쪽의 길이', '약 80', 1]];
      const RB = [['1m 50cm', 150], ['230cm', 230], ['3m 20cm', 320], ['410cm', 410]];
      const ruler = svg(186, 78, RB.map(([t, v], i) => `${txt(0, 8 + i * 15, '가나다라'[i] + '  ' + t, 4.6, { a: 'start' })}<rect x="30" y="${3 + i * 15}" width="${v * .3}" height="10" fill="${ans ? '#ffc9c9' : 'none'}" stroke="none"/><rect x="30" y="${3 + i * 15}" width="150" height="10" fill="none" stroke="#444" stroke-width=".5"/>${range(49, k => `<path d="M${30 + (k + 1) * 3} ${3 + i * 15}v${(k + 1) % 10 ? 2 : 10}" stroke="${(k + 1) % 10 ? '#bbb' : '#888'}" stroke-width=".3"/>`).join('')}`).join('') + range(6, k => txt(30 + k * 30, 70, k + 'm', 4.6)).join('') + txt(105, 76, '작은 눈금 한 칸은 10cm', 3.6, { fill: '#888' }));
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '긴 길이는 m로, 짧은 길이는 cm로 나타내면 편리해요.',
        body: act(4, '알맞은 단위에 ○표 해요.', 7, `<div class="g2" style="row-gap:2mm">${U.map(([t, n, m]) => `<div class="row" style="align-items:center;gap:2mm;font-size:11.5pt"><div style="flex:1">${t}는 ${n}</div><span class="chip ${M.on(!m)}">cm</span><span class="chip ${M.on(m)}">m</span></div>`).join('')}</div>`)
          + act(5, '리본을 길이만큼 색칠해요.', 9, ruler, true)
          + act(6, '리본을 짧은 것부터 차례로 써요.', 4, `<div class="tint" style="text-align:center;font-size:12.5pt">${['가', '나', '다', '라'].map(t => M.bl(t, 16)).join(' → ')}</div>`),
        tip: '활동 5는 cm를 「몇 m 몇 cm」로 바꾸어야 색칠할 수 있습니다. 자 눈금 읽기를 어려워하면 1m 칸을 먼저 세게 해 주세요.'
      });
      return [p1, p2];
    }
  });

  reg({
    id: 'math3-explore', subj: 'math', unit: '3단원 길이 재기', unitShort: '3단원', title: '교실 길이 탐험대', mode: '40', pair: true, answers: false, need: '줄자(또는 1m 자)',
    desc: '내 몸의 길이를 재어 「몸 자」를 만들고, 교실 속 물건의 길이를 어림한 뒤 줄자로 재어 확인하는 활동형 수업.',
    gen() {
      const row = (t) => `<tr><th style="width:34%">${t}</th><td></td><td></td></tr>`;
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '먼저 눈으로 어림하고, 그다음 줄자로 재어 확인해요. 짝과 서로 도와주세요.',
        body: act(1, '내 몸의 자: 어림한 뒤 짝과 줄자로 재어요.', 9, `<table class="t"><tr><th>내 몸</th><th>어림한 길이</th><th>잰 길이</th></tr>${row('한 뼘')}${row('한 걸음')}${row('양팔을 벌린 길이')}${row('내 키')}</table>`)
          + act(2, '1m 탐험: 교실에서 찾아 쓰고, 재어서 확인해요.', 11, `<table class="t"><tr><th style="width:26%"></th><th>찾은 물건</th><th style="width:22%">어림한 길이</th><th style="width:22%">잰 길이</th></tr>${['1m보다 짧은 것', '1m보다 짧은 것', '약 1m인 것', '약 1m인 것', '1m보다 긴 것', '1m보다 긴 것'].map(t => `<tr><th>${t}</th><td></td><td></td><td></td></tr>`).join('')}</table>
            <div class="tint sm fill" style="display:flex;align-items:center">줄자를 쓸 때는 ① 한쪽 끝을 눈금 0에 맞추고 ② 줄자를 곧게 펴고 ③ 다른 쪽 끝의 눈금을 읽어요.</div>`, true),
        tip: '모둠마다 줄자 1개면 충분합니다. 돌아다니는 활동이므로 시작 전에 이동 규칙(걷기, 한 물건에 한 모둠)을 정해 주세요.'
      });
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '누가 가장 비슷하게 어림할까요? 어림한 길이와 잰 길이의 차가 작을수록 「어림 왕」!',
        body: act(3, '어림 왕 대회', 11, `<table class="t"><tr><th style="width:30%">잴 것</th><th>어림한 길이</th><th>잰 길이</th><th style="width:18%">차</th></tr>${['칠판의 긴 쪽', '교실 문의 폭', '내 책상의 긴 쪽', '사물함의 높이', '내가 고른 것: '].map(t => `<tr><th style="${t.includes(':') ? 'text-align:left' : ''}">${t}</th><td></td><td></td><td></td></tr>`).join('')}</table>`)
          + act(4, '알게 된 것을 정리해요.', 5, `<div class="tint" style="line-height:2.4">1m는 내 걸음으로 약 <span class="bl"></span>걸음, 내 뼘으로 약 <span class="bl"></span>뼘이에요.<br>우리 교실에서 가장 긴 것은 <span class="ul" style="min-width:40mm"></span>(이)고, 길이는 약 <span class="bl" style="min-width:30mm"></span>예요.</div>`)
          + act(5, '내 키와 길이가 비슷한 물건을 찾아 나와 나란히 그려요.', 4, draw('나  /  내 키와 비슷한 물건'), true),
        tip: '「차」는 큰 수에서 작은 수를 빼어 구합니다(받아내림이 필요하면 cm로만 어림하게 하거나 교사가 도와주세요).'
      });
      return [p1, p2];
    }
  });

  /* ── 종합 ── */
  reg({
    id: 'math-escape', subj: 'math', unit: '1~3단원 종합', unitShort: '종합', title: '수학 방탈출: 잠긴 간식 상자', mode: '40',
    desc: '네 자리 수·곱셈구구·길이 재기 문제를 풀어 자물쇠 번호 네 자리를 찾는 방탈출 활동지. 1~3단원을 한 번에 복습해요.',
    gen({ ans }) {
      const M = mk(ans);
      const key = (n, t, v) => `<div class="tint" style="display:flex;align-items:center;gap:3mm;flex:none">${lock(n)}<div style="flex:1" class="sm">${t}</div><div style="font-family:var(--fd);flex:none">${n}번 열쇠 ${M.bl(v, 12)}</div></div>`;
      const p1 = page(this, {
        side: '앞면', min: 22, sub: '큰일이에요! 우리 반 간식 상자가 자물쇠로 잠겼어요. 열쇠 번호 네 개를 찾아 주세요.',
        body: act(1, '첫 번째 열쇠: 네 자리 수', 7, `<div class="g3 fill" style="font-size:12.5pt;align-items:center">
            <div><b class="hd">가</b> 3000 + 500 + 8<br>= ${M.bl('3508', 24)}</div>
            <div><b class="hd">나</b> 100이 36개인 수<br>= ${M.bl('3600', 24)}</div>
            <div><b class="hd">다</b> 3590보다 100 작은 수<br>= ${M.bl('3490', 24)}</div></div>
            ${key(1, '가, 나, 다 가운데 <b>가장 큰 수</b>의 <b>백의 자리 숫자</b>가 첫 번째 열쇠예요.', '6')}`, true)
          + act(2, '두 번째 열쇠: 곱셈구구', 7, `<div class="g3 fill" style="font-size:14pt;font-family:var(--fd);text-align:center;align-content:space-around">
            <div>6 × ${M.bl('7', 12)} = 42</div><div>${M.bl('7', 12)} × 9 = 63</div><div>8 × ${M.bl('7', 12)} = 56</div><div>4 × ${M.bl('7', 12)} = 28</div><div>${M.bl('7', 12)} × 5 = 35</div><div>${M.bl('7', 12)} × ${M.bl('7', 12)} = 49</div></div>
            ${key(2, '□ 안에 <b>똑같이 들어가는 수</b>가 두 번째 열쇠예요.', '7')}`, true)
          + act(3, '세 번째 열쇠: 길이 재기', 8, `<div class="g2 fill" style="font-size:12.5pt;align-items:center"><div><b class="hd">가</b> 2m 35cm + 1m 40cm<br>= ${M.bl('3', 10)}m ${M.bl('75', 12)}cm</div><div><b class="hd">나</b> 6m 80cm − 2m 30cm<br>= ${M.bl('4', 10)}m ${M.bl('50', 12)}cm</div></div>
            ${key(3, '가와 나 가운데 <b>더 긴 길이</b>는 □m 50cm예요. □가 세 번째 열쇠예요.', '4')}`, true),
        tip: '모둠이 함께 풀어도 좋습니다. 열쇠 번호는 뒷면의 자물쇠에 옮겨 적습니다.'
      });
      const p2 = page(this, {
        side: '뒷면', min: 18, sub: '조금만 더! 마지막 열쇠를 찾으면 간식 상자가 열려요.',
        body: act(4, '네 번째 열쇠: 문제 해결', 8, `<div class="row"><div class="col" style="flex:1.5;justify-content:space-around"><div style="font-size:12.5pt">쿠키가 한 접시에 8개씩 7접시 있어요. 그 가운데 54개를 친구들과 나누어 먹었어요. 남은 쿠키는 몇 개일까요?</div><div style="font-size:12.5pt;line-height:2.3">처음 쿠키: 8 × 7 = ${M.bl('56', 14)}개<br>남은 쿠키: ${M.bl('56', 14)} − 54 = ${M.bl('2', 12)}개</div></div>${draw('그림을 그려 풀어도 좋아요', 'min-height:48mm')}</div>
            ${key(4, '<b>남은 쿠키의 수</b>가 네 번째 열쇠예요.', '2')}`)
          + act(5, '자물쇠를 열어라!', 10, `<div class="row fill"><div class="col" style="align-items:center;justify-content:space-around;flex:1.1"><div style="display:flex;gap:2mm">${'6742'.split('').map(d => `<span class="bl" style="min-width:15mm;height:18mm;line-height:17mm;font-size:24pt;border-width:.8mm">${ans ? d : ''}</span>`).join('')}</div><div class="sm" style="text-align:center">비밀번호를 읽어 보세요:<br>${M.ul('육천칠백사십이', 60)}</div><div class="tint sm">확인! 네 숫자를 모두 더하면 <b>19</b>가 되어야 상자가 열려요.</div><div class="sm" style="text-align:center">비밀번호보다 1000 큰 수 ${M.bl('7742', 22)}<br><span style="display:inline-block;height:2mm"></span><br>비밀번호보다 100 작은 수 ${M.bl('6642', 22)}</div></div>${draw('상자가 열렸어요! 안에 들어 있던 간식을 그리고 색칠해요.')}</div>`, true),
        tip: '합이 19가 아니면 어느 열쇠가 틀렸는지 모둠에서 되짚어 보게 하세요. 실제 작은 간식이나 칭찬 도장을 「상자」에 넣어 두면 몰입이 커집니다.'
      });
      return [p1, p2];
    }
  });
})();
