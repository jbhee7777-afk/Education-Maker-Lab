/* 통합: 계절 · 인물 */
(function () {
  const { reg, page, act, svg, txt, lines, draw, q, mk, img, itm } = G2;
  const tree = `<path d="M44 118 C47 96 47 84 45 70 L30 48 M45 70 L46 40 M46 62 L64 42 M38 58 L24 60 M56 51 L70 54 M46 48 L36 30 M46 44 L56 26" fill="none" stroke="#444" stroke-width="2.2" stroke-linecap="round"/><path d="M52 118 C50 98 50 86 51 74" fill="none" stroke="#444" stroke-width="2.2" stroke-linecap="round"/><path d="M14 118 H82" stroke="#444" stroke-width="1.4"/>`;
  const doll = `<circle cx="40" cy="16" r="11" fill="#fff" stroke="#444" stroke-width="1.2"/><path d="M36 13.5h.1M44 13.5h.1" stroke="#444" stroke-width="2.2" stroke-linecap="round"/><path d="M36 19q4 3 8 0" fill="none" stroke="#444" stroke-width="1"/><path d="M36 27v4 L18 52 l5 5 L33 46 V78 L30 112 h8 L40 84 L42 112 h8 L47 78 V46 L57 57 l5-5 L44 31 v-4" fill="#fff" stroke="#444" stroke-width="1.2" stroke-linejoin="round" stroke-dasharray="2.5 1.8"/>`;
  const SC = { 봄: '#fcc2d7', 여름: '#b2f2bb', 가을: '#ffd8a8', 겨울: '#a5d8ff' };

  reg({
    id: 'tong-season-tree', subj: 'tong', unit: '계절', unitShort: '계절', title: '사계절 나무와 수수께끼', mode: '40',
    desc: '같은 나무가 봄·여름·가을·겨울에 어떻게 달라지는지 그리고 색칠해요. 뒷면은 계절 수수께끼와 계절 분류 색칠.',
    gen({ ans }) {
      const M = mk(ans);
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '한 그루의 나무도 계절마다 모습이 달라져요. 나무와 둘레의 모습을 계절에 맞게 꾸며 보세요.',
        body: act(1, '사계절 나무를 그리고 색칠해요. (꽃, 잎, 열매, 눈, 하늘, 동물도 좋아요!)', 15, `<div class="g2 fill" style="grid-template-rows:1fr 1fr">${['봄', '여름', '가을', '겨울'].map(s => `<div class="draw" style="display:flex;align-items:flex-end;justify-content:center;border-style:solid;border-color:#444"><small style="font-size:14pt;color:var(--c)">${s}</small>${svg(96, 122, tree, 'style="height:96%;width:auto"')}</div>`).join('')}</div>`, true)
          + act(2, '계절마다 떠오르는 낱말을 두 개씩 써요.', 5, `<div class="g4">${['봄', '여름', '가을', '겨울'].map(s => `<div class="tint" style="padding:1.5mm 3mm"><b class="hd">${s}</b><div style="height:15mm;background:repeating-linear-gradient(transparent 0 7mm,#999 7mm 7.3mm)"></div></div>`).join('')}</div>`),
        tip: '그리기 전에 「우리 학교 운동장 나무는 지금 어떤 모습일까?」 하고 창밖을 함께 살펴보면 좋습니다.'
      });
      const R = [['나는 여름에 써요. 손으로 흔들면 시원한 바람이 나와요.', '부채'], ['나는 겨울에 하늘에서 내려요. 하얗고 차가워요. 뭉치면 사람도 만들 수 있어요.', '눈'], ['가을이 되면 나는 빨갛고 노랗게 옷을 갈아입어요.', '단풍(나뭇잎)'], ['봄이 오면 나는 땅을 뚫고 쏙 올라와요. 작고 연한 초록색이에요.', '새싹'], ['나는 여름에 나무에 붙어 "맴맴" 하고 울어요.', '매미'], ['나는 겨울에 손에 끼는 따뜻한 옷이에요.', '장갑']];
      const I = [['🌸', '벚꽃', '봄'], ['🍉', '수박', '여름'], ['⛄', '눈사람', '겨울'], ['🍁', '단풍', '가을'], ['🧤', '장갑', '겨울'], ['🌱', '새싹', '봄'], ['🌰', '밤 줍기', '가을'], ['🏖️', '물놀이', '여름'], ['🛷', '썰매', '겨울'], ['🦋', '나비', '봄'], ['🍧', '팥빙수', '여름'], ['🌾', '벼 베기', '가을'], ['☔', '장마', '여름'], ['🌷', '튤립', '봄'], ['🍠', '군고구마', '겨울'], ['🍂', '낙엽', '가을']];
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '계절마다 날씨도, 자연의 모습도, 우리의 생활도 달라져요.',
        body: act(3, '계절 수수께끼: 나는 누구일까요?', 9, `<div class="g2">${R.map(([t, v], i) => `<div class="box" style="display:flex;align-items:center;gap:2mm;padding:1.5mm 3mm"><div class="sm" style="flex:1">${'①②③④⑤⑥'[i]} ${t}</div>${M.bl(v, 24)}</div>`).join('')}</div>`)
          + act(4, '어느 계절일까요? 계절 색으로 칸을 색칠해요.', 8, G2.legend([['봄', '분홍', SC.봄], ['여름', '초록', SC.여름], ['가을', '주황', SC.가을], ['겨울', '파랑', SC.겨울]]) + `<div class="g4 fill" style="grid-auto-rows:1fr">${I.map(([e, t, s]) => itm(e, t, '', ans ? `background:${SC[s]}` : '')).join('')}</div>`, true)
          + act(5, '내가 수수께끼 내기: 계절 수수께끼를 하나 만들어 짝에게 내요.', 3, lines(2)),
        tip: '활동 4에서 「사과는 가을? 딸기는 봄?」처럼 의견이 갈리는 것은 까닭을 말하게 하고 모두 인정해 주세요.'
      });
      return [p1, p2];
    }
  });

  reg({
    id: 'tong-season-life', subj: 'tong', unit: '계절', unitShort: '계절', title: '계절 옷장과 낱말 찾기', mode: '40', seed: 44,
    desc: '여름의 나와 겨울의 나에게 어울리는 옷을 그려 입혀요. 뒷면은 계절 낱말 찾기와 내가 좋아하는 계절 소개.',
    gen({ ans, r }) {
      const M = mk(ans);
      const C = [['반바지', 0], ['목도리', 1], ['샌들', 0], ['털모자', 1], ['선풍기', 0], ['난로', 1], ['밀짚모자', 0], ['두꺼운 점퍼', 1], ['부채', 0], ['손난로', 1], ['수영복', 0], ['털장갑', 1]];
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '날씨에 맞는 옷차림을 하면 건강하게 지낼 수 있어요.',
        body: act(1, '여름의 나, 겨울의 나: 계절에 어울리는 옷과 물건을 그리고 색칠해요.', 14, `<div class="g2 fill">${[['여름의 나', '더운 날, 무엇을 입고 무엇을 들까요?'], ['겨울의 나', '추운 날, 무엇을 입고 무엇을 쓸까요?']].map(([t, s]) => `<div class="draw" style="display:flex;align-items:center;justify-content:center;border-style:solid;border-color:#444"><small><b style="font-size:13pt;color:var(--c);font-weight:400">${t}</b><br>${s}</small>${svg(80, 116, doll, 'style="height:80%;max-width:86%;margin-top:9mm"')}</div>`).join('')}</div>`, true)
          + act(2, '여름에 쓰는 것은 초록, 겨울에 쓰는 것은 파랑으로 색칠해요.', 6, `<div class="g6">${C.map(([t, w]) => `<div style="border:.5mm solid #444;border-radius:3mm;text-align:center;font-family:var(--fd);font-size:11pt;padding:1.8mm 0;background:${ans ? (w ? SC.겨울 : SC.여름) : '#fff'}">${t}</div>`).join('')}</div>`),
        tip: '인형 그림은 점선 위에 옷을 덧그리도록 만든 것입니다. 머리 모양과 표정도 자유롭게 그리게 해 주세요.'
      });
      const W = ['눈사람', '물놀이', '개나리', '잠자리', '고드름', '단풍', '새싹', '수박', '썰매', '장마'];
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '숨은 계절 낱말을 찾고, 내가 가장 좋아하는 계절을 소개해요.',
        body: `<div class="row" style="flex:none;height:112mm">${act(3, '계절 낱말 찾기 (→, ↓)', 9, G2.wordsearch(W, 9, r, ans), true)}<div class="col" style="flex:.62"><div class="tint sm"><b class="hd">숨은 낱말 10개</b><br>찾은 낱말은 계절 색으로 칠해요.<div style="font-family:var(--fd);font-size:12pt;line-height:1.75;margin-top:1mm">${W.map(w => `□ ${w}`).join('<br>')}</div></div><div class="sm" style="color:#777">봄 분홍 · 여름 초록<br>가을 주황 · 겨울 파랑</div></div></div>`
          + act(4, '내가 가장 좋아하는 계절을 그림과 글로 소개해요.', 11, `<div class="row fill">${draw('그 계절의 내 모습')}<div class="col" style="flex:1.2"><div style="line-height:2.2">내가 가장 좋아하는 계절은 <span class="ul" style="min-width:24mm"></span>이에요.<br>왜냐하면</div>${lines(0, true)}</div></div>`, true),
        tip: '낱말 계절: 봄(개나리, 새싹) · 여름(물놀이, 수박, 장마) · 가을(잠자리, 단풍) · 겨울(눈사람, 고드름, 썰매). 잠자리는 여름·가을 모두 인정해 주세요.'
      });
      return [p1, p2];
    }
  });

  reg({
    id: 'tong-season-bingo', subj: 'tong', unit: '계절', unitShort: '계절', title: '사계절 빙고와 겨울나기', mode: '40', pair: true,
    desc: '계절 낱말로 빙고 놀이를 해요. 뒷면은 동물·식물·사람의 겨울나기 잇기와 눈 결정 꾸미기.',
    gen({ ans }) {
      const M = mk(ans);
      const bank = ['벚꽃', '새싹', '개나리', '나비', '황사', '소풍', '수박', '장마', '매미', '물놀이', '부채', '팥빙수', '단풍', '낙엽', '추석', '잠자리', '허수아비', '밤', '눈사람', '썰매', '장갑', '고드름', '김장', '군고구마'];
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '선생님이 부르는 낱말이나 수수께끼의 답을 찾아 ○표! 한 줄이 되면 "빙고!"',
        body: act(1, '낱말 24개 가운데 16개를 골라 빙고 칸에 써요. 계절마다 골고루 고르면 유리해요.', 6, `<div class="g6" style="gap:1.5mm">${bank.map((b, i) => `<div style="border:.4mm solid #666;border-radius:99mm;text-align:center;font-family:var(--fd);font-size:11pt;padding:.6mm 0;background:${Object.values(SC)[Math.floor(i / 6)]}55">${b}</div>`).join('')}</div>`)
          + act(2, '사계절 빙고', 14, `<div class="fill" style="display:flex;justify-content:center"><div style="display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,1fr);border:.8mm solid #444;border-radius:4mm;overflow:hidden;height:100%;aspect-ratio:1.12">${G2.range(16, () => '<div style="border:.3mm solid #777"></div>').join('')}</div></div>`, true)
          + `<div class="tint sm" style="text-align:center">내가 만든 빙고 줄: <span class="bl"></span>줄 &nbsp;·&nbsp; 두 번째 판은 짝과 번갈아 「계절 수수께끼」를 내며 해 보세요.</div>`,
        tip: '낱말을 그대로 부르기보다 「여름에 맴맴 우는 곤충」처럼 수수께끼로 부르면 복습 효과가 커집니다. 3줄 빙고까지 진행해 보세요.'
      });
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '추운 겨울을 나기 위해 동물도, 식물도, 사람도 저마다 준비를 해요.',
        body: act(3, '누가 어떻게 겨울을 날까요? 선으로 이어요.', 7, G2.match(['곰', '제비', '다람쥐', '나무', '사람'], ['먹이를 많이 먹고 굴속에서 겨울잠을 자요.', '따뜻한 남쪽 나라로 날아가요.', '도토리를 모아 두어요.', '잎을 떨어뜨리고 겨울눈을 만들어요.', '김장을 하고 두꺼운 옷을 꺼내요.'], [3, 0, 4, 1, 2], ans, { rh: 10.5, lw: 36, rw: 112 }))
          + act(4, '우리 집 겨울 준비: 해 본 것에 ✓표 하고, 하나를 더 써요.', 4, `<div class="g3 sm">${['두꺼운 이불 꺼내기', '겨울옷 꺼내기', '김장하기', '난방 기구 꺼내기', '창문 틈 막기', '<span class="ul" style="min-width:36mm"></span>'].map(t => `<div>□ ${t}</div>`).join('')}</div>`)
          + act(5, '눈 결정 꾸미기: 눈 결정은 여섯 갈래 모양이에요. 무늬를 그려 넣고 색칠해요.', 9, `<div class="row fill" style="align-items:center"><div style="text-align:center"><img src="${img('snowflake')}" style="height:92mm"></div>${G2.svg(100, 100, G2.range(6, i => `<path d="M50 50 L${(50 + 44 * Math.cos(i * Math.PI / 3 - Math.PI / 2)).toFixed(1)} ${(50 + 44 * Math.sin(i * Math.PI / 3 - Math.PI / 2)).toFixed(1)}" stroke="#444" stroke-width="1.6" stroke-linecap="round"/>`).join('') + '<circle cx="50" cy="50" r="4" fill="#fff" stroke="#444" stroke-width="1.2"/>' + txt(50, 97, '갈래마다 똑같은 무늬를 그려요', 4, { fill: '#888' }), 'style="height:100mm;flex:1"')}</div>`, true),
        tip: '활동 5는 여섯 갈래에 같은 무늬를 반복해 그리는 활동입니다. 오려서 창문에 붙이면 겨울 교실 꾸미기가 됩니다.'
      });
      return [p1, p2];
    }
  });

  reg({
    id: 'tong-person-hero', subj: 'tong', unit: '인물', unitShort: '인물', title: '본받고 싶은 인물 탐구', mode: '40',
    desc: '세종대왕, 이순신, 유관순 등 인물과 한 일을 잇고, 내가 본받고 싶은 인물 카드와 기념우표를 만들어요.',
    gen({ ans }) {
      const P = ['세종대왕', '이순신', '유관순', '장영실', '방정환', '허준'];
      const Dd = ['백성을 위해 한글(훈민정음)을 만들었어요.', '거북선을 이끌고 바다에서 나라를 지켰어요.', '나라를 되찾으려고 독립 만세 운동에 앞장섰어요.', '스스로 시각을 알려 주는 물시계를 만들었어요.', '어린이를 사랑하여 어린이날을 만들었어요.', '아픈 사람들을 위해 의학 책 「동의보감」을 썼어요.'];
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '인물이 어떤 일을 했는지 알아보고, 본받고 싶은 점을 찾아보세요.',
        body: act(1, '인물과 인물이 한 일을 선으로 이어요.', 7, G2.match(P, Dd, [2, 4, 0, 5, 1, 3], ans, { rh: 10.5, lw: 40, rw: 116 }))
          + act(2, '내가 본받고 싶은 인물 카드를 만들어요. (위 인물이 아니어도 좋아요. 가족, 이웃, 책 속 인물도!)', 13, `<div class="row fill"><div class="draw" style="flex:.8"><small>인물의 모습을 그려요</small></div><div class="col" style="flex:1.2;justify-content:space-around"><div>이름: <span class="ul" style="min-width:60mm"></span></div><div>한 일:</div>${lines(2)}<div>본받고 싶은 점:</div>${lines(2)}<div class="sm">어울리는 낱말에 ○표: 용기 · 끈기 · 사랑 · 지혜 · 정직 · 나눔 · 도전</div></div></div>`, true),
        tip: '인물은 위인만이 아니라 부모님, 선생님, 이웃처럼 가까운 사람도 좋다는 점을 꼭 알려 주세요.'
      });
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '훌륭한 인물을 기억하려고 우표나 동전에 그 모습을 담기도 해요.',
        body: act(3, '내가 고른 인물의 기념우표를 디자인하고 색칠해요.', 12, `<div class="fill" style="display:flex;justify-content:center"><div style="height:100%;aspect-ratio:.82;border:1.6mm dotted #444;border-radius:2mm;padding:3mm;display:flex"><div style="flex:1;border:.5mm solid #444;position:relative;display:flex;flex-direction:column;justify-content:flex-end;padding:2mm 3mm"><span style="position:absolute;right:3mm;top:1mm;font-family:var(--fd);font-size:16pt">2학년</span><div style="font-family:var(--fd);font-size:11pt;color:#888;border-top:.4mm solid #999;padding-top:1mm">인물 이름: </div></div></div></div>`, true)
          + act(4, '인물을 본받아 내가 실천할 일 세 가지', 8, `<div class="col" style="gap:1mm">${['학교에서', '집에서', '친구에게'].map(t => `<div style="display:flex;align-items:flex-end;gap:2mm;height:11mm"><span class="chip">${t}</span><span style="flex:1;border-bottom:.45mm solid #555"></span></div>`).join('')}</div>`),
        tip: '완성한 우표를 오려 큰 종이에 모아 붙이면 「우리 반 인물 우표첩」이 됩니다.'
      });
      return [p1, p2];
    }
  });

  reg({
    id: 'tong-person-thanks', subj: 'tong', unit: '인물', unitShort: '인물', title: '우리 곁의 고마운 사람들', mode: '40',
    desc: '우리 생활을 도와주는 주변 인물이 하는 일을 알아보고, 고마운 분께 드릴 감사 상장을 만들어요.',
    gen({ ans }) {
      const M = mk(ans);
      const J = [['🚒', '소방관', '불을 끄고 위험에 빠진 사람을 구해요.'], ['👮', '경찰관', '동네의 안전을 지키고 길 잃은 사람을 도와요.'], ['🩺', '의사·간호사', '아픈 사람을 치료하고 돌보아요.'], ['🍚', '급식 조리사', '맛있고 건강한 급식을 만들어요.'], ['🧹', '환경미화원', '거리를 깨끗하게 청소해요.'], ['📦', '택배 기사', '물건을 집 앞까지 날라다 주어요.'], ['🚌', '버스 기사', '사람들을 가고 싶은 곳에 안전하게 태워다 주어요.'], ['🏫', '배움터 지킴이', '학교 앞과 교문에서 우리의 안전을 살펴요.']];
      const ord = [4, 0, 6, 2, 7, 1, 5, 3];
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '우리가 편안하게 지낼 수 있는 것은 저마다의 자리에서 애쓰는 분들 덕분이에요.',
        body: act(1, '누구일까요? 하는 일을 읽고 알맞은 사람의 번호를 써요.', 9, `<div class="g4">${J.map(([e, t], i) => itm(e, `${i + 1}. ${t}`, '', 'padding:1.5mm'))  .join('')}</div><div class="g2" style="row-gap:1.5mm">${ord.map(i => `<div style="display:flex;align-items:center;gap:1.5mm;font-size:11pt;line-height:1.3">${M.bl(i + 1, 9)}<span style="flex:1">${J[i][2]}</span></div>`).join('')}</div>`)
          + act(2, '이번 주에 내가 만난 고마운 사람을 떠올려요.', 6, `<table class="t"><tr><th style="width:30%">누구</th><th>나에게 해 준 일</th><th style="width:26%">내 마음</th></tr>${'<tr><td style="height:11mm"></td><td></td><td></td></tr>'.repeat(3)}</table>`)
          + act(3, '그분이 일하는 모습을 그려요.', 5, draw(''), true),
        tip: '활동 2는 가족, 친구, 학교에서 일하시는 분 등 누구든 좋습니다. 뒷면 상장을 드릴 분을 여기서 고르게 해 주세요.'
      });
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '고마운 마음을 담아 세상에 하나뿐인 상장을 만들어 전해요.',
        body: `<div style="flex:1;min-height:0;position:relative;display:flex">${svg(186, 236, G2.frame(186, 236, 'star'), 'style="position:absolute;inset:0;width:100%;height:100%" preserveAspectRatio="none"')}
          <div style="position:relative;flex:1;margin:15mm 17mm 13mm;display:flex;flex-direction:column;align-items:center;gap:3mm"><div style="font-family:var(--fd);font-size:34pt;letter-spacing:4mm;color:var(--c)">감사 상장</div><div style="align-self:flex-start;font-family:var(--fd);font-size:14pt">상 이름: <span class="ul" style="min-width:70mm"></span> 상</div><div style="align-self:flex-end;font-family:var(--fd);font-size:14pt">받는 분: <span class="ul" style="min-width:50mm"></span></div>
          <div style="align-self:stretch;font-size:13pt;line-height:1.6;margin-top:2mm">위 분은 <span style="color:#999">(어떤 일을 해 주셨는지 써요)</span></div><div class="lines grow" style="align-self:stretch"></div><div style="font-size:13pt">고마운 마음을 담아 이 상장을 드립니다.</div>
          <div style="display:flex;align-items:flex-end;justify-content:space-between;align-self:stretch"><img src="${img('teddy')}" style="height:24mm"><div style="font-family:var(--fd);font-size:13pt;text-align:right;line-height:2"><span class="ul" style="min-width:12mm"></span>년 <span class="ul" style="min-width:10mm"></span>월 <span class="ul" style="min-width:10mm"></span>일<br>2학년 <span class="ul" style="min-width:34mm"></span> 드림</div></div></div></div>`,
        tip: '상 이름은 「언제나 든든한 상」, 「맛있는 급식 상」처럼 재미있게 짓도록 해 주세요. 테두리의 별을 색칠해 꾸민 뒤 직접 전해 드립니다.'
      });
      return [p1, p2];
    }
  });

  reg({
    id: 'tong-person-me', subj: 'tong', unit: '인물', unitShort: '인물', title: '미래의 나, 내가 주인공', mode: '40', answers: false,
    desc: '내 강점을 찾아 색칠하고 미래의 나를 인터뷰해요. 뒷면에는 내가 주인공인 책(위인전) 표지를 만들어요.',
    gen() {
      const S = ['끈기', '용기', '친절', '호기심', '배려', '정직', '성실', '유머', '책임감', '창의력', '협동', '도전'];
      const star = '<path d="M50 6 L61 37 94 38 68 58 77 90 50 71 23 90 32 58 6 38 39 37Z" fill="#fff" stroke="#444" stroke-width="2.4" stroke-linejoin="round"/>';
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '훌륭한 인물들도 처음에는 여러분 같은 어린이였어요. 나의 좋은 점부터 찾아볼까요?',
        body: act(1, '나의 강점 별: 나에게 있는 좋은 점을 찾아 별을 색칠해요. (세 개 이상!)', 6, `<div class="g6">${S.map(t => `<div style="position:relative;text-align:center">${svg(100, 96, star, 'style="width:100%;display:block"')}<span style="position:absolute;left:0;right:0;top:40%;font-family:var(--fd);font-size:10.5pt">${t}</span></div>`).join('')}</div>`)
          + act(2, '미래의 나를 인터뷰해요. 어른이 된 내가 되어 대답을 써요.', 14, `<div class="col fill" style="justify-content:space-around">${['지금 어떤 일을 하고 계신가요?', '그 일을 하게 된 까닭은 무엇인가요?', '어릴 때 무엇을 열심히 하셨나요?', '2학년 어린이들에게 한마디 해 주세요.'].map(t => `<div><div class="hd">기자: ${t}</div><div style="display:flex;gap:2mm;align-items:flex-end;height:14mm"><span style="font-family:var(--fd)">나:</span><span style="flex:1;border-bottom:.45mm solid #555"></span></div></div>`).join('')}</div>`, true),
        tip: '강점 낱말의 뜻을 모르는 어린이를 위해 「끈기: 포기하지 않고 끝까지 하는 것」처럼 짧게 풀이해 주세요.'
      });
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '훗날 나에 대한 책이 나온다면 어떤 책일까요? 표지를 만들어요.',
        body: `<div class="fill" style="display:flex;justify-content:center"><div style="height:100%;aspect-ratio:.74;border:.9mm solid #444;border-radius:2mm 5mm 5mm 2mm;border-left-width:4mm;padding:5mm;display:flex;flex-direction:column;gap:3mm"><div style="font-family:var(--fd);font-size:11pt;color:#888">책 제목 (예: 동물을 사랑한 수의사 ○○○)</div><div style="height:22mm;border-bottom:.5mm solid #555"></div><div class="draw"><small>표지 그림: 미래의 내 모습을 그리고 색칠해요</small></div><div style="display:flex;justify-content:space-between;font-family:var(--fd);font-size:12pt"><span>글·그림 <span class="ul" style="min-width:36mm"></span></span><span style="color:#888">2학년 출판사</span></div></div></div>
          <div class="tint" style="flex:none">이 책을 한 문장으로 소개하면? <span class="ul" style="min-width:104mm"></span></div>`,
        tip: '완성한 표지를 칠판에 붙여 「우리 반 미래 도서관」을 열고, 읽고 싶은 책에 붙임 딱지를 붙이는 활동으로 이어 갈 수 있습니다.'
      });
      return [p1, p2];
    }
  });
})();
