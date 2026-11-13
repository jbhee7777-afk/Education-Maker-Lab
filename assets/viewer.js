/* 활동지 보기 화면 (index.html 안에서도, sheet.html에서도 같은 코드를 씀)
   XViewer.mount(root, { home }) : root 안에 도구 막대와 A4 쪽들을 그림.
   주소의 #<활동지 id> 로 활동지를 고름. home 이 있으면 「← 키트」가 그 주소로 돌아감. */
(function () {
  const $ = XK.$, $$ = XK.$$;
  const SUF = /-(low|mid|high)$/;
  const EXTRA = [{ low: 'cipher-mid', mid: 'cipher-mid', high: 'cipher-high' }, { low: 'letter-low', mid: 'letter', high: 'letter' }];
  const find = (id) => SHEETS.find(s => s.id === id);
  function family(s) {
    const m = {};
    if (SUF.test(s.id)) { const b = s.id.replace(SUF, ''); SHEETS.forEach(x => { if (SUF.test(x.id) && x.id.replace(SUF, '') === b) x.grades.forEach(g => { if (!m[g]) m[g] = x.id; }); }); m[s.id.match(SUF)[1]] = s.id; }
    EXTRA.forEach(e => { if (Object.values(e).includes(s.id)) for (const g in e) if (!m[g]) m[g] = e[g]; });
    s.grades.forEach(g => { m[g] = m[g] || s.id; });
    return m;
  }
  function mount(root, opt = {}) {
    root.innerHTML = `<div class="sbar wrap">
      <a class="btn sm" id="v-back" href="${opt.home ? '#' + opt.home() : 'index.html'}">← 키트</a>
      <h1 id="st">활동지</h1>
      <div class="seg" id="gseg" role="group" aria-label="학년군"><button data-g="low">저학년</button><button data-g="mid">중학년</button><button data-g="high">고학년</button></div>
      <select id="other" aria-label="다른 활동지 고르기" class="btn sm" style="max-width:230px"></select>
      <button class="btn sm" id="b-new" hidden>새 문제로 바꾸기</button>
      <button class="btn sm" id="b-ans" hidden>정답 보기</button>
      <a class="btn sm gold" id="b-pdf" target="_blank" rel="noopener">PDF 열기</a>
      <button class="btn sm red" id="b-print">인쇄하기</button>
      <div class="info" id="info"></div>
    </div><main id="pages" class="wrap"></main>`;
    let seed = 1225, ans = false, curId = null, G = XK.store.get('grade', 'mid');
    const cur = () => find(curId) || SHEETS[0];
    const fit = () => $$('.pagebox', root).forEach(b => { const p = b.firstElementChild; p.style.transform = ''; const k = Math.min(1, b.clientWidth / p.offsetWidth); p.style.transform = k < 1 ? `scale(${k})` : ''; b.style.height = (p.offsetHeight * k) + 'px'; });
    function gradeUI(s, keep) {
      const fam = family(s);
      if (!keep) { if (SUF.test(s.id)) G = s.id.match(SUF)[1]; else if (!fam[G]) G = s.grades[0]; }
      $$('#gseg button', root).forEach(b => { const g = b.dataset.g; b.setAttribute('aria-pressed', g === G); b.disabled = !fam[g]; b.style.opacity = fam[g] ? 1 : .35; b.style.cursor = fam[g] ? '' : 'not-allowed'; b.title = fam[g] ? '' : '이 활동지는 ' + XK.GRADES[g] + '용이 없어요'; });
      const groups = {}; SHEETS.filter(x => x.grades.includes(G)).forEach(x => { (groups[x.cat] = groups[x.cat] || []).push(x); });
      $('#other', root).innerHTML = `<option value="">${XK.GRADES[G]} 다른 활동지…</option>` + Object.keys(SH.CAT).filter(c => groups[c]).map(c => `<optgroup label="${SH.CAT[c]}">${groups[c].map(x => `<option value="${x.id}" ${x.id === s.id ? 'selected' : ''}>${x.title}</option>`).join('')}</optgroup>`).join('');
    }
    $$('#gseg button', root).forEach(b => b.onclick = () => {
      const s = cur(), fam = family(s), g = b.dataset.g; if (!fam[g]) return; G = g; XK.store.set('grade', g);
      if (fam[g] && fam[g] !== s.id) { location.hash = fam[g]; return; }
      gradeUI(s, true);
      if (fam[g] === s.id) { $('#info', root).textContent = `「${s.title}」은(는) ${SH.gname(s.grades)} 활동지라 ${XK.GRADES[g]}도 그대로 쓰면 돼요.`; return; }
    });
    $('#other', root).onchange = (e) => { if (e.target.value) location.hash = e.target.value; };
    function render() {
      const s = cur(); document.title = s.title + ' · 크리스마스 활동지'; $('#st', root).textContent = s.title;
      if (opt.home) $('#v-back', root).href = '#' + opt.home();
      const pages = s.gen({ r: XK.rng(seed), seed, ans });
      $('#pages', root).innerHTML = pages.map(p => `<div class="pagebox ${/class="page land/.test(p) ? 'land' : ''}">${p}</div>`).join('');
      $('#b-pdf', root).href = 'print/' + encodeURIComponent(SH.pdfName(s, ans && s.answers));
      $('#b-new', root).hidden = !s.random; $('#b-ans', root).hidden = !s.answers; $('#b-ans', root).textContent = ans ? '정답 숨기기' : '정답 보기';
      $('#info', root).textContent = `${pages.length}쪽 · A4 · ${SH.gname(s.grades)}${s.paper ? ' · 추천 용지: ' + s.paper : ''} · 인쇄 버튼이 안 되면 「PDF 열기」나 학년별 PDF 묶음을 이용하세요.`;
      gradeUI(s);
      requestAnimationFrame(fit);
    }
    $('#b-new', root).onclick = () => { seed = Math.floor(Math.random() * 1e9); render(); };
    $('#b-ans', root).onclick = () => { ans = !ans; render(); };
    $('#b-print', root).onclick = () => { window.print(); };
    addEventListener('resize', fit);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    return {
      open(id) { if (id !== curId) { ans = false; seed = 1225; } curId = id; render(); },
      rerender(sd, a) { seed = sd; ans = !!a; render(); },
      fit,
    };
  }
  window.XViewer = { mount, find };
})();
