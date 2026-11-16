/* 국어 1~4단원 */
(function () {
  const { reg, page, act, svg, txt, lines, draw, q, mk, img } = G2;
  const leaf = (t, on) => `<div style="border:.5mm solid #444;border-radius:0 62% 0 62%;height:15mm;display:flex;align-items:center;justify-content:center;font-family:var(--fd);font-size:11.5pt;background:${on || '#fff'}">${t}</div>`;
  const face = (cap) => `<div style="text-align:center;font-size:10.5pt;line-height:1.3">${svg(60, 50, '<circle cx="30" cy="25" r="22" fill="#fff" stroke="#444" stroke-width="1"/><path d="M12 12 L8 2 L20 8 M48 12 L52 2 L40 8" fill="#fff" stroke="#444" stroke-width="1"/>', 'style="height:40mm;width:auto;display:block;margin:0 auto"')}${cap}</div>`;

  /* ── 1단원 ── */
  reg({
    id: 'kor1-poem', subj: 'kor', unit: '1단원 장면을 상상하며', unitShort: '1단원', title: '시 속 장면을 그려요', mode: '40',
    desc: '시 「낙엽 편지」를 읽고 흉내 내는 말을 찾고, 떠오르는 장면을 그려요. 뒷면은 흉내 내는 말 색칠과 시 바꿔 쓰기.',
    gen({ ans }) {
      const M = mk(ans);
      const hl = (t) => ans ? `<span style="border:.5mm solid #e03131;border-radius:99mm;padding:0 1.5mm">${t}</span>` : t;
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '시를 소리 내어 읽고, 머릿속에 떠오르는 장면을 그려 보세요.',
        body: act(1, '시를 두 번 읽어요. 한 번은 작게, 한 번은 실감 나게!', 3, `<div class="row"><div class="poem" style="flex:1.25"><h3>낙엽 편지</h3>${hl('바스락바스락')}<br>낙엽이 말을 걸어요.<br><br>${hl('빙글빙글')} 춤추며<br>내 어깨에 ${hl('톡')},<br><br>"가을이 왔어!"<br>노란 편지 한 장<br><br>${hl('살랑살랑')} 바람이<br>배달하고 갔어요.</div>
          <div class="col" style="justify-content:center;gap:3.5mm">
          <div class="hd" style="font-size:12.5pt">❷ 시를 읽고 답해요 <span class="sm" style="color:#888">(7분)</span></div>
          ${q('①', `시에서 <b>흉내 내는 말</b>을 모두 찾아 ○표 하세요. (4개)`)}
          ${q('②', `'노란 편지'는 무엇일까요?<br>${M.ul('낙엽', 40)}`)}
          ${q('③', `편지를 배달한 것은 누구인가요?<br>${M.ul('바람', 40)}`)}
          ${q('④', `낙엽이 어깨에 떨어지는 모습을 나타낸 말은?<br>${M.ul('톡', 40)}`)}
          </div></div>`)
          + act(3, '시를 읽고 떠오르는 장면을 그리고 색칠해요.', 10, draw('낙엽은 어떤 색일까요? 나는 어디에 서 있을까요?'), true),
        tip: '읽기 → 찾기 → 그리기 순서로 진행합니다. 그림을 다 그린 어린이는 짝에게 「내 그림 속 낙엽은 ~하고 있어」 하고 설명하게 해 주세요.'
      });
      const snd = ['멍멍', '쨍그랑', '딩동', '꼬끼오', '야옹', '따르릉'], shp = ['빙글빙글', '엉금엉금', '반짝반짝', '깡충깡충', '뒤뚱뒤뚱', '살랑살랑'];
      const order = [0, 6, 7, 1, 8, 2, 3, 9, 10, 4, 5, 11], all = snd.concat(shp);
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '흉내 내는 말을 쓰면 글이 더 재미있고 실감 나요.',
        body: act(4, '낙엽을 색칠해요. 소리를 흉내 내는 말은 빨강, 모양을 흉내 내는 말은 노랑!', 7, `<div class="g4">${order.map(i => leaf(all[i], ans ? (i < 6 ? '#ffc9c9' : '#fff3bf') : '')).join('')}</div>`)
          + act(5, '보기에서 알맞은 흉내 내는 말을 골라 써요.', 6, `<div class="chips">${['깡충깡충', '반짝반짝', '엉금엉금', '딩동', '뒤뚱뒤뚱'].map(t => `<span class="chip">${t}</span>`).join('')}</div>
            <div class="g2" style="row-gap:3mm;margin-top:1mm">
            ${q('①', `토끼가 ${M.bl('깡충깡충', 30)} 뛰어요.`)}${q('②', `밤하늘에 별이 ${M.bl('반짝반짝', 30)} 빛나요.`)}
            ${q('③', `거북이가 ${M.bl('엉금엉금', 30)} 기어가요.`)}${q('④', `초인종이 ${M.bl('딩동', 30)} 울려요.`)}
            ${q('⑤', `오리가 ${M.bl('뒤뚱뒤뚱', 30)} 걸어요.`)}</div>`)
          + act(6, '나도 시인! 「눈송이 편지」로 바꿔 써요.', 7, `<div class="row fill"><div class="poem" style="font-size:15.5pt;line-height:2.3;flex:1.5;display:flex;flex-direction:column;justify-content:center"><div><h3>눈송이 편지</h3><span class="ul" style="min-width:42mm"></span><br>눈송이가 말을 걸어요.<br><span class="ul" style="min-width:36mm"></span> 춤추며<br>내 <span class="ul" style="min-width:22mm"></span>에 톡,<br>"<span class="ul" style="min-width:26mm"></span>이 왔어!"<br>하얀 편지 한 장</div></div>${draw('내 시에 어울리는 그림')}</div>`, true),
        tip: '「더 해 보기」 교실에서 들리는 소리, 보이는 모습을 흉내 내는 말로 3개 더 찾아 낙엽 옆에 써 보게 하세요.'
      });
      return [p1, p2];
    }
  });

  reg({
    id: 'kor1-story', subj: 'kor', unit: '1단원 장면을 상상하며', unitShort: '1단원', title: '이야기 속 인물의 마음', mode: '40', answers: false,
    desc: '이야기 「도토리 한 알」을 읽고 인물의 표정과 마음을 상상해요. 뒷면은 뒷이야기 네 컷 만화 그리기.',
    gen() {
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '인물의 모습과 행동을 떠올리며 이야기를 읽어 보세요.',
        body: act(1, '이야기를 읽어요.', 5, `<div class="story"><h3>도토리 한 알</h3>다람쥐 토리는 숲에서 커다란 도토리를 한 알 주웠어요. "와, 아껴 두었다가 겨울에 먹어야지!" 토리는 신이 나서 폴짝폴짝 뛰었어요. 그런데 집에 가는 길에 훌쩍훌쩍 우는 아기 새를 만났어요. "배가 고픈데 먹을 것이 하나도 없어." 토리는 도토리를 꼭 쥐고 한참 망설였어요. 그러다 도토리를 반으로 쪼개어 아기 새에게 내밀었어요. "우리 같이 먹자!" 아기 새가 활짝 웃었어요. 토리의 마음도 햇살처럼 따뜻해졌어요.</div>`)
          + act(2, '토리의 표정을 그리고, 어울리는 마음에 ○표 해요.', 8, `<div class="g3">${[['도토리를 주웠을 때', '신나요 · 무서워요'], ['도토리를 쥐고 망설일 때', '고민돼요 · 심심해요'], ['아기 새가 웃었을 때', '화나요 · 뿌듯해요']].map(([a, b]) => face(`<b style="font-family:var(--fd);font-weight:400">${a}</b><br>${b}`)).join('')}</div>`)
          + act(3, '내가 토리라면 어떻게 했을까요? 그 까닭도 써요.', 7, `<div class="row fill"><div class="col" style="flex:1.5"><div class="sm">나라면</div>${lines(0, true)}</div>${draw('그 장면을 그림으로 그려요')}</div>`, true),
        tip: '표정을 그리기 전에 「토리처럼 폴짝폴짝」, 「도토리를 꼭 쥐고 망설이는 모습」을 몸으로 흉내 내 보면 장면을 더 잘 떠올려요.'
      });
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '이야기의 다음 장면을 상상해서 네 컷 만화로 그려요.',
        body: act(4, '뒷이야기 네 컷 만화: 다음 날, 토리와 아기 새에게 어떤 일이 생겼을까요?', 14, `<div class="g2" style="flex:1;grid-template-rows:1fr 1fr">${['다음 날 아침,', '그때 갑자기', '그래서 둘은', '마지막에는'].map((t, i) => `<div class="draw"><small>${i + 1}. ${t}</small></div>`).join('')}</div>`, true)
          + act(5, '인물에게 하고 싶은 말을 써요.', 6, `<div class="row" style="height:36mm"><div class="box"><span class="hd">토리에게</span></div><div class="box"><span class="hd">아기 새에게</span></div></div>`),
        tip: '말풍선과 흉내 내는 말(폴짝폴짝, 훌쩍훌쩍)을 넣으면 만화가 더 실감 난다고 알려 주세요. 완성한 만화는 모둠에서 돌려 읽습니다.'
      });
      return [p1, p2];
    }
  });

  /* ── 2단원 ── */
  reg({
    id: 'kor2-words', subj: 'kor', unit: '2단원 서로 존중해요', unitShort: '2단원', title: '존중하는 말 비밀 낱말', mode: '40',
    desc: '듣는 사람을 존중하는 말풍선만 색칠하면 비밀 낱말이 나와요. 뒷면은 잘 듣는 귀 ○×와 칭찬 쿠폰 만들기.',
    gen({ ans }) {
      const M = mk(ans);
      const B = [['넌 그것도 못 해?', '나', 0], ['네 생각은 어때?', '고', 1], ['도와줘서 고마워.', '운', 1], ['저리 가!', '빨', 0], ['미안해, 내가 실수했어.', '말', 1], ['내 말만 들어!', '안', 0],
      ['시끄러워!', '리', 0], ['천천히 해도 괜찮아.', '을', 1], ['너랑 안 놀아.', '돼', 0], ['네 말을 끝까지 들을게.', '써', 1], ['우리 같이 하자!', '요', 1], ['빨리빨리 좀 해!', '쿵', 0]];
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '같은 말이라도 어떻게 하느냐에 따라 듣는 사람의 기분이 달라져요.',
        body: act(1, '듣는 사람을 존중하는 말풍선만 좋아하는 색으로 칠해요. 아닌 말에는 ×표!', 8, `<div class="g3" style="row-gap:5mm;padding-bottom:2mm">${B.map(([t, k, o]) => `<div class="bub ${M.on(o)}"><span class="k">${k}</span>${t}</div>`).join('')}</div>
            <div class="tint" style="text-align:center">색칠한 말풍선의 작은 글자를 차례대로 모으면? ${'고운말을써요'.split('').map(c => M.bl(c, 9)).join('')}</div>`)
          + act(2, '속상한 말을 존중하는 말로 바꿔 써요.', 12, `<div class="col" style="gap:3mm;flex:1;justify-content:space-around">${[['(복도에서) "야, 비켜!"', '예) 잠깐 지나가도 될까?'], ['(모르는 문제를 묻는 친구에게) "그것도 몰라?"', '예) 내가 알려 줄까?'], ['(친구 그림을 보고) "네 그림 이상해."', '예) 색을 알록달록하게 칠했구나!']].map(([a, b], i) => `<div class="row" style="align-items:center"><div class="bub" style="flex:1">${a}</div><div style="flex:none;font-family:var(--fd);font-size:16pt;color:var(--c)">➜</div><div class="bub" style="flex:1.3;min-height:34mm">${M.a(b)}</div></div>`).join('')}</div>`, true),
        tip: '활동 2는 정해진 답이 없습니다. 바꾼 말을 짝과 실제로 주고받아 보고 「어떤 말이 더 기분 좋았는지」 이야기하게 해 주세요.'
      });
      const L = [['친구가 말할 때 친구를 바라봐요.', 1], ['친구 말이 끝나기 전에 끼어들어요.', 0], ['고개를 끄덕이며 들어요.', 1], ['딴짓을 하면서 들어요.', 0], ['궁금한 것은 끝까지 듣고 나서 물어요.', 1], ['친구의 기분을 생각하며 대답해요.', 1]];
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '잘 듣는 것도 친구를 존중하는 방법이에요.',
        body: act(3, '잘 듣는 귀를 찾아라! 존중하며 듣는 모습이면 ○, 아니면 ×에 색칠해요.', 6, `<div class="g2" style="row-gap:2.5mm">${L.map(([t, v]) => `<div class="row" style="align-items:center;gap:2mm"><div style="flex:1;font-size:11.5pt;line-height:1.3">${t}</div>${M.ox(v)}</div>`).join('')}</div>`)
          + act(4, '칭찬 쿠폰 만들기: 친구의 좋은 점을 쓰고 색칠한 뒤, 오려서 전해 주세요.', 14, `<div class="col" style="flex:1;gap:3mm">${[['star', '칭찬 쿠폰'], ['mitten', '고마워 쿠폰'], ['cocoa', '응원 쿠폰']].map(([m, t]) => `<div class="cut" style="flex:1;display:flex;gap:4mm;align-items:center"><img src="${img(m)}" style="height:30mm;width:auto"><div style="flex:1"><div class="hd" style="font-size:15pt">${t}</div><div class="sm" style="line-height:2.3"><span class="ul" style="min-width:34mm"></span>에게<br>너는 <span class="ul" style="min-width:95mm"></span><br><span class="ul" style="min-width:112mm"></span><span style="float:right"><span class="ul" style="min-width:26mm"></span>(이)가</span></div></div></div>`).join('')}</div>`, true),
        tip: '쿠폰은 「친절하게 말해 줘서」, 「내 이야기를 끝까지 들어 줘서」처럼 구체적인 행동을 쓰도록 안내해 주세요. 받지 못하는 어린이가 없도록 짝·모둠 안에서 주고받게 합니다.'
      });
      return [p1, p2];
    }
  });

  reg({
    id: 'kor2-board', subj: 'kor', unit: '2단원 서로 존중해요', unitShort: '2단원', title: '고운 말 말판 놀이', mode: '40', pair: true, answers: false, need: '클립, 연필, 말(지우개 조각)',
    desc: '짝과 돌림판을 돌려 도착한 칸의 상황에 어울리는 고운 말을 해요. 뒷면은 고운 말 나무 꾸미기.',
    gen() {
      const C = ['출발', '친구가 운동장에서 넘어졌어요.', '친구가 지우개를 빌려주었어요.', '★ 짝에게 칭찬 한마디!', '내가 친구 발을 밟았어요.', '친구가 자기 그림을 보여 줘요.', '친구가 발표하다가 틀렸어요.', '♥ 앞으로 2칸', '친구와 하고 싶은 놀이가 달라요.', '친구가 울고 있어요.', '친구가 급식 줄에 끼어들었어요.', '★ 짝과 하이파이브!', '친구가 내 물건을 말없이 가져갔어요.', '친구가 달리기에서 1등을 했어요.', '◆ 뒤로 2칸', '모둠에서 내 생각과 친구 생각이 달라요.', '친구가 새 안경을 쓰고 왔어요.', '친구가 놀이에 끼워 달라고 해요.', '★ 선생님께 감사 인사!', '내가 약속 시간에 늦었어요.', '친구가 도와주겠다는데, 혼자 하고 싶어요.', '누가 친구 이름으로 놀리는 것을 봤어요.', '♥ 한 번 더!', '친구가 내 연필을 떨어뜨렸어요.', '새 친구가 전학을 왔어요.', '◆ 한 번 쉬기', '친구가 어려운 문제를 물어봐요.', '오늘은 친구의 생일이에요.', '★ 다 같이 "고마워!"', '도착'];
      const p1 = page(this, {
        side: '앞면', min: 25, sub: '짝과 함께! 도착한 칸의 상황에서 어떤 말을 하면 좋을지 실제로 말해 보세요.',
        body: `<div class="row" style="flex:none;align-items:center">${G2.spinner(['1', '2', '3', '1', '2', '3'], 30)}<div class="tint sm" style="flex:4"><b class="hd">놀이 방법</b><br>① 가위바위보로 순서를 정하고, 돌림판을 돌려 나온 수만큼 가요.<br>② 도착한 칸의 상황을 읽고, 듣는 사람을 존중하는 말을 짝에게 해요.<br>③ 짝이 "기분 좋은 말이야!" 하면 그 칸에 머물고, 말을 못 하면 한 칸 뒤로 가요.<br>④ ★은 미션을 하고, ♥·◆은 적힌 대로 움직여요. 먼저 도착하면 승리!</div></div>` + G2.board(C, 5),
        tip: '시작 전에 한두 칸을 함께 해 보며 「정답은 여러 가지」임을 알려 주세요. 돌림판 대신 주사위(4~6은 3을 빼기)를 써도 됩니다.'
      });
      const leaves = [[38, 40], [70, 22], [108, 20], [142, 36], [56, 62], [124, 62], [90, 46]];
      const p2 = page(this, {
        side: '뒷면', min: 15, sub: '놀이를 하며 듣거나 말한 고운 말을 모아 나무를 꾸며요.',
        body: act(1, '고운 말 나무: 잎마다 고운 말을 쓰고 색칠해요.', 10, svg(180, 128, `<path d="M82 126 C86 100 84 86 80 76 L100 76 C96 86 94 100 98 126Z" fill="#fff" stroke="#444" stroke-width="1"/><path d="M20 126 H160" stroke="#444" stroke-width="1"/>` + leaves.map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="26" ry="13" fill="#fff" stroke="#444" stroke-width="1" transform="rotate(${[-12, -5, 6, 12, 5, -6, 0][i]} ${x} ${y})"/>`).join('') + txt(90, 46, '예) 괜찮아?', 5.5, { fill: '#aaa' })), true)
          + act(2, '오늘 들은 말 가운데 가장 기분 좋았던 말은?', 3, lines(1))
          + act(3, '내일부터 내가 꼭 쓰고 싶은 고운 말 두 가지', 2, lines(2)),
        tip: '완성한 나무는 교실 뒤에 붙여 「우리 반 고운 말 숲」으로 전시하면 좋습니다.'
      });
      return [p1, p2];
    }
  });

  /* ── 3단원 ── */
  reg({
    id: 'kor3-find', subj: 'kor', unit: '3단원 내용을 살펴요', unitShort: '3단원', title: '글 속 보물찾기', mode: '40', seed: 31,
    desc: '설명하는 글 「겨울잠을 자는 동물」을 읽고 중요한 내용을 찾아요. 뒷면은 낱말 찾기 퍼즐과 그림으로 정리하기.',
    gen({ ans, r }) {
      const M = mk(ans);
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '글을 읽을 때는 「무엇을 설명하는지」를 먼저 찾아요.',
        body: act(1, '글을 읽으며 동물 이름에 ○표, 겨울잠 자는 곳에 밑줄을 그어요.', 6, `<div class="story" style="font-size:13.5pt;line-height:1.85"><h3>${ans ? '<span class="ans">예) 겨울잠을 자는 동물</span>' : '제목: <span class="ul" style="min-width:70mm"></span>'}</h3>추운 겨울이 오면 동물들은 먹이를 구하기 어려워져요. 그래서 어떤 동물들은 겨울잠을 자요. 곰은 가을에 먹이를 많이 먹어 두고, 굴속에서 겨울잠을 자요. 개구리는 땅속으로 들어가 꼼짝하지 않고 봄을 기다려요. 다람쥐는 겨울잠을 자다가 가끔 깨어나 모아 둔 도토리를 먹어요. 따뜻한 봄이 오면 동물들은 잠에서 깨어나 다시 활동해요.</div>`)
          + act(2, '중요한 내용을 찾아요.', 9, `<div class="col fill" style="justify-content:space-around">${q('①', `이 글은 무엇을 설명하나요? ${M.ul('겨울잠을 자는 동물', 70)}`)}
            ${q('②', `동물들이 겨울잠을 자는 까닭은 무엇인가요?<br>겨울에는 ${M.ul('먹이를 구하기 어려워서', 90)}`)}
            ${q('③', '동물과 겨울을 보내는 모습을 선으로 이어요.')}
            ${G2.match(['곰', '개구리', '다람쥐'], ['먹이를 많이 먹어 두고 굴속에서 자요.', '땅속에서 꼼짝하지 않고 봄을 기다려요.', '가끔 깨어나 모아 둔 도토리를 먹어요.'], [1, 2, 0], ans, { rh: 11, lw: 40, rw: 104 })}
            ${q('④', `'활동해요'와 뜻이 비슷한 말에 ○표 하세요. &nbsp; <span class="chip ${M.on(0)}">잠들어요</span> <span class="chip ${M.on(1)}">움직여요</span> <span class="chip ${M.on(0)}">숨어요</span>`)}</div>`, true)
          + act(3, '글에 어울리는 제목을 지어 글 위 빈칸에 쓰고, 그렇게 지은 까닭을 써요.', 5, lines(3)),
        tip: '활동 1에서 표시한 낱말(곰·개구리·다람쥐, 굴속·땅속)이 곧 「중요한 내용」임을 짚어 주세요.'
      });
      const W = ['겨울잠', '도토리', '개구리', '다람쥐', '먹이', '굴속', '땅속', '곰'];
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '글에서 찾은 중요한 낱말과 내용을 다시 정리해요.',
        body: `<div class="row" style="flex:none;height:106mm">${act(4, '낱말 찾기 (→, ↓)', 8, G2.wordsearch(W, 8, r, ans), true)}
          <div class="col" style="flex:.8"><div class="tint sm"><b class="hd">숨은 낱말 8개</b><br>찾으면 □에 ✓표 해요.<div class="g2" style="font-family:var(--fd);font-size:12pt;margin-top:1mm">${W.map(w => `<span>□ ${w}</span>`).join('')}</div></div>
          <div class="hd" style="font-size:12.5pt">❺ 맞으면 ○, 틀리면 × <span class="sm" style="color:#888">(4분)</span></div>
          ${[['곰은 땅속에서 겨울잠을 자요.', 0], ['다람쥐는 겨울잠을 자다가 가끔 깨요.', 1], ['봄이 오면 동물들은 잠에서 깨어나요.', 1]].map(([t, v]) => `<div class="row sm" style="align-items:center;gap:1mm"><div style="flex:1">${t}</div>${M.ox(v)}</div>`).join('')}</div></div>`
          + act(6, '세 동물이 겨울을 보내는 모습을 그림으로 정리해요.', 8, `<div class="g3" style="flex:1">${['곰', '개구리', '다람쥐'].map(t => draw(t)).join('')}</div>`, true),
        tip: '「더 해 보기」 겨울잠을 자는 다른 동물(뱀, 박쥐, 고슴도치 등)을 책이나 영상에서 찾아 한 문장으로 설명해 보게 하세요.'
      });
      return [p1, p2];
    }
  });

  reg({
    id: 'kor3-color', subj: 'kor', unit: '3단원 내용을 살펴요', unitShort: '3단원', title: '읽고 색칠하는 설명서', mode: '40', pair: true, need: '색연필',
    desc: '설명하는 글을 꼼꼼히 읽고 글의 내용대로 그림을 색칠하고 그려 넣어요. 뒷면은 내가 쓴 설명을 짝이 그림으로 그리기.',
    gen({ ans }) {
      const M = mk(ans), c = (col) => ans ? col : '#fff';
      const flower = (x, col) => `<path d="M${x} 96 V84" stroke="#444" stroke-width="1"/>${[0, 72, 144, 216, 288].map(a => `<circle cx="${x + 4 * Math.cos(a * Math.PI / 180)}" cy="${80 + 4 * Math.sin(a * Math.PI / 180)}" r="3.2" fill="${c(col)}" stroke="#444" stroke-width=".7"/>`).join('')}<circle cx="${x}" cy="80" r="2" fill="#fff" stroke="#444" stroke-width=".7"/>`;
      const scene = svg(186, 100, `<path d="M0 96 H186" stroke="#444" stroke-width="1"/>
        <circle cx="22" cy="18" r="9" fill="${c('#ffe066')}" stroke="#444" stroke-width="1"/>${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<path d="M${22 + 12 * Math.cos(a * Math.PI / 180)} ${18 + 12 * Math.sin(a * Math.PI / 180)} L${22 + 16 * Math.cos(a * Math.PI / 180)} ${18 + 16 * Math.sin(a * Math.PI / 180)}" stroke="#444" stroke-width="1"/>`).join('')}
        <path d="M150 20 a7 7 0 0 1 12-4 a8 8 0 0 1 14 5 a6 6 0 0 1-2 11 h-24 a6 6 0 0 1 0-12Z" fill="#fff" stroke="#444" stroke-width="1"/>
        <rect x="112" y="24" width="10" height="20" fill="#fff" stroke="#444" stroke-width="1"/>${ans ? '<path d="M117 22 q-6-6 0-10 q6-4 0-9" fill="none" stroke="#868e96" stroke-width="3"/>' : ''}
        <path d="M66 52 L100 22 L134 52Z" fill="${c('#ff8787')}" stroke="#444" stroke-width="1"/><rect x="72" y="52" width="56" height="44" fill="#fff" stroke="#444" stroke-width="1"/>
        <rect x="93" y="68" width="14" height="28" fill="${c('#b08968')}" stroke="#444" stroke-width="1"/><circle cx="104" cy="83" r="1" fill="#444"/>
        <rect x="76" y="58" width="12" height="12" fill="${c('#a5d8ff')}" stroke="#444" stroke-width="1"/><rect x="112" y="58" width="12" height="12" fill="${c('#a5d8ff')}" stroke="#444" stroke-width="1"/><path d="M82 58v12M76 64h12M118 58v12M112 64h12" stroke="#444" stroke-width=".7"/>
        <path d="M34 96 V62 H42 V96" fill="#fff" stroke="#444" stroke-width="1"/><path d="M38 66 c-22 2-26-22-12-28 c-2-14 16-20 22-10 c12-6 24 6 16 18 c8 10-6 24-26 20Z" fill="${c('#8ce99a')}" stroke="#444" stroke-width="1"/>
        ${ans ? [[26, 46], [40, 38], [52, 52]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.5" fill="#ff922b" stroke="#444" stroke-width=".7"/>`).join('') : ''}
        ${flower(142, '#fcc2d7')}${flower(158, '#ffe066')}${flower(174, '#fcc2d7')}`);
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '글의 내용을 하나도 빠뜨리지 않고 읽어야 그림을 완성할 수 있어요.',
        body: act(1, '글을 읽고, 글의 내용대로 색칠하고 빠진 것은 그려 넣어요.', 14, `<div class="story" style="font-size:13.5pt;line-height:1.8"><h3>토리네 집</h3>토리네 집을 소개할게요. 토리네 집 지붕은 빨간색이에요. 문은 갈색이고, 창문 두 개는 모두 하늘색이에요. 집 옆에는 큰 감나무가 있어요. 감나무 잎은 초록색이고, 주황색 감이 세 개 달려 있어요. 마당에는 꽃이 세 송이 피었는데, 가운데 꽃만 노란색이고 양쪽 꽃은 분홍색이에요. 하늘에는 노란 해가 떠 있고, 굴뚝에서는 회색 연기가 모락모락 피어올라요.</div>${scene}`, true)
          + act(2, '글의 내용과 같으면 ○, 다르면 ×에 색칠해요.', 6, `<div class="g2" style="row-gap:2mm">${[['지붕은 파란색이에요.', 0], ['감은 세 개 달려 있어요.', 1], ['꽃은 모두 노란색이에요.', 0], ['굴뚝에서 연기가 나요.', 1]].map(([t, v]) => `<div class="row" style="align-items:center"><div style="flex:1">${t}</div>${M.ox(v)}</div>`).join('')}</div>`),
        tip: '그려 넣어야 하는 것은 감 세 개와 굴뚝 연기입니다. 다 한 뒤 짝과 그림을 바꿔 보며 글과 다른 곳을 찾아 주게 하세요.'
      });
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '이번에는 내가 설명하는 글을 쓰고, 짝이 그 글만 읽고 그림을 그려요.',
        body: act(3, '내가 좋아하는 물건 하나를 떠올려 설명하는 글을 써요. (그림은 그리지 않아요!)', 9, `<div class="tint sm">무엇인가요? → 어떤 모양인가요? → 무슨 색인가요? → 어디에 쓰나요? 차례로 쓰면 쉬워요.</div>${lines(0, true)}`, true)
          + act(4, '짝과 활동지를 바꿔요. 짝의 글을 읽고 그 물건을 그려요.', 8, draw('그린 사람: (            )'), true)
          + act(5, '활동지를 돌려받고 확인해요.', 3, `<div class="row sm" style="align-items:center"><div style="flex:2">짝의 그림이 내가 생각한 물건과 얼마나 닮았나요? 별을 색칠해요.</div><div style="font-size:22pt;letter-spacing:2mm;flex:1;text-align:center">☆☆☆☆☆</div></div>${q('→', `더 자세히 쓰면 좋았을 내용: <span class="ul" style="min-width:90mm"></span>`)}`),
        tip: '설명이 자세할수록 그림이 정확해진다는 점을 마무리에서 짚어 주세요. 짝 활동이 어려우면 활동 4를 「내 글을 보고 내가 그리기」로 바꿔도 됩니다.'
      });
      return [p1, p2];
    }
  });

  /* ── 4단원 ── */
  reg({
    id: 'kor4-letter', subj: 'kor', unit: '4단원 마음을 전해요', unitShort: '4단원', title: '마음을 전하는 편지', mode: '40',
    desc: '상황에 어울리는 마음을 찾고, 편지의 짜임을 살펴본 뒤 색칠 편지지에 마음을 전하는 편지를 써요.',
    gen({ ans }) {
      const M = mk(ans);
      const part = (n, t) => `<span style="font-family:var(--fd);color:var(--c)">${n}</span> ${t}`;
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '고마운 마음, 미안한 마음, 축하하는 마음… 마음은 표현해야 전해져요.',
        body: act(1, '어떤 마음을 전하면 좋을까요? 선으로 이어요.', 5, G2.match(['친구가 준비물을 빌려주었어요.', '친구의 색연필을 부러뜨렸어요.', '동생이 줄넘기 대회에서 상을 받았어요.', '짝이 감기에 걸려 결석했어요.'], ['고마운 마음', '미안한 마음', '축하하는 마음', '걱정하는 마음'], [2, 3, 0, 1], ans, { rh: 10.5, lw: 96, rw: 50, fs: 4.8, fs2: 5.2 }))
          + act(2, '민준이의 편지를 읽고, 번호에 알맞은 이름을 보기에서 찾아 써요.', 10, `<div class="chips">${['받을 사람', '첫인사', '전하고 싶은 말', '끝인사', '쓴 날짜', '쓴 사람'].map(t => `<span class="chip">${t}</span>`).join('')}</div>
            <div class="row"><div class="box" style="flex:1.5;font-family:var(--fh);font-size:16pt;line-height:1.62">${part('①', '할머니께')}<br>${part('②', '할머니, 안녕하세요? 저 민준이에요.')}<br>${part('③', '지난 주말에 맛있는 고구마를 보내 주셔서 감사합니다. 가족이 모두 둘러앉아 맛있게 먹었어요.')}<br>${part('④', '날씨가 추워졌어요. 감기 조심하세요.')}<div style="text-align:right">${part('⑤', '11월 20일')}<br>${part('⑥', '손자 민준 올림')}</div></div>
            <div class="col" style="justify-content:space-between">${['받을 사람', '첫인사', '전하고 싶은 말', '끝인사', '쓴 날짜', '쓴 사람'].map((t, i) => `<div>${'①②③④⑤⑥'[i]} ${M.bl(t, 40)}</div>`).join('')}</div></div>
            ${q('★', `민준이는 할머니께 어떤 마음을 전했나요? ${M.ul('고마운 마음', 50)}`)}`)
          + act(3, '나는 누구에게 어떤 마음을 전할까요? 뒷면에 쓰기 전에 계획해요.', 5, `<table class="t"><tr><th style="width:26%">누구에게</th><th style="width:26%">어떤 마음</th><th>있었던 일</th></tr><tr><td style="height:52mm"></td><td></td><td></td></tr></table>`),
        tip: '활동 3에서 「있었던 일」을 구체적으로 떠올리게 하면 뒷면 편지가 훨씬 풍성해집니다.'
      });
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '받을 사람 → 첫인사 → 전하고 싶은 말 → 끝인사 → 쓴 날짜 → 쓴 사람',
        body: `<div style="flex:1;min-height:0;position:relative;display:flex">${svg(186, 236, G2.frame(186, 236, 'heart'), 'style="position:absolute;inset:0;width:100%;height:100%" preserveAspectRatio="none"')}
          <div style="position:relative;flex:1;margin:13mm 14mm 12mm;display:flex;flex-direction:column"><div style="font-family:var(--fd);font-size:13pt;height:10mm"><span class="ul" style="min-width:45mm"></span> 에게(께)</div>${lines(0, true)}<div style="display:flex;justify-content:space-between;align-items:flex-end;height:22mm"><img src="${img('fox')}" style="height:21mm"><div style="font-family:var(--fd);font-size:12pt;text-align:right;line-height:2.1"><span class="ul" style="min-width:12mm"></span>월 <span class="ul" style="min-width:12mm"></span>일<br><span class="ul" style="min-width:40mm"></span> 씀(올림)</div></div></div></div>`,
        tip: '테두리의 하트를 색칠해 꾸미고, 가위로 오려 실제로 전하게 해 주세요. 어른께는 「께」, 「올림」을 쓴다는 점도 알려 주세요.'
      });
      return [p1, p2];
    }
  });

  reg({
    id: 'kor4-notes', subj: 'kor', unit: '4단원 마음을 전해요', unitShort: '4단원', title: '마음 쪽지 우체통', mode: '40', answers: false, need: '가위, 색연필',
    desc: '마음을 나타내는 낱말을 색칠하고 내 마음을 문장으로 써요. 뒷면의 마음 쪽지 네 장을 오려 친구와 가족에게 전해요.',
    gen() {
      const W = ['기뻐요', '고마워요', '미안해요', '속상해요', '설레요', '뿌듯해요', '걱정돼요', '화나요', '신나요', '부끄러워요', '슬퍼요', '행복해요', '자랑스러워요', '서운해요', '무서워요', '편안해요'];
      const p1 = page(this, {
        side: '앞면', min: 20, sub: '내 마음에 꼭 맞는 낱말을 찾으면 마음을 더 잘 전할 수 있어요.',
        body: act(1, '마음 낱말 창고: 이번 주에 내가 느낀 마음을 모두 찾아 색칠해요.', 5, `<div class="g4">${W.map(w => `<div style="border:.5mm solid #444;border-radius:99mm;text-align:center;font-family:var(--fd);font-size:12pt;padding:1.6mm 0">${w}</div>`).join('')}</div>`)
          + act(2, '색칠한 낱말 가운데 세 개를 골라 문장으로 써요.', 9, `<div class="tint sm">예) 나는 <b>줄넘기를 열 번 넘었을</b> 때 <b>뿌듯했어요</b>.</div>${[1, 2, 3].map(() => `<div style="line-height:2.5">나는 <span class="ul" style="min-width:86mm"></span> 때 <span class="ul" style="min-width:46mm"></span>.</div>`).join('')}`)
          + act(3, '오늘 내 마음 날씨를 그리고, 그 까닭을 써요.', 6, `<div class="row" style="flex:1">${draw('맑음? 흐림? 비? 무지개?')}<div class="col" style="flex:1.3"><div class="sm">오늘 내 마음 날씨는 <span class="ul" style="min-width:30mm"></span>이에요.<br>왜냐하면</div>${lines(0, true)}</div></div>`, true),
        tip: '모르는 마음 낱말은 「언제 그런 마음이 드는지」 친구들의 경험으로 설명하게 하면 좋습니다.'
      });
      const N = [['fox', '고마워요', '에게 고마운 마음을 전해요.'], ['bunny', '미안해요', '에게 미안한 마음을 전해요.'], ['star', '축하해요', '에게 축하하는 마음을 전해요.'], ['polarbear', '힘내요', '에게 응원하는 마음을 전해요.']];
      const p2 = page(this, {
        side: '뒷면', min: 20, sub: '쪽지를 쓰고 색칠한 다음, 점선을 따라 오려서 전해 주세요.',
        body: `<div class="g2" style="flex:1;grid-template-rows:1fr 1fr;gap:4mm">${N.map(([m, t, s]) => `<div class="cut" style="display:flex;flex-direction:column"><div style="display:flex;align-items:center;gap:2mm"><img src="${img(m)}" style="height:22mm"><div><div class="hd" style="font-size:17pt">${t}</div><div class="sm"><span class="ul" style="min-width:24mm"></span>${s.replace('에게 ', '에게<br>')}</div></div></div>${lines(0, true)}<div class="sm" style="text-align:right;margin-top:1.5mm"><span class="ul" style="min-width:26mm"></span>(이)가</div></div>`).join('')}</div>`,
        tip: '교실에 「마음 우체통」 상자를 두고 쪽지를 넣게 한 뒤, 하교 전에 배달해 주세요. 네 장 가운데 두 장만 골라 써도 좋습니다.'
      });
      return [p1, p2];
    }
  });
})();
