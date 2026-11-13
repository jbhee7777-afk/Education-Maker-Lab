/* 공통 도구: 난수, 효과음, 눈 내리기, 상단바, 모둠 점수판 */
(function () {
  const K = {};
  K.GRADES = { low: '저학년', mid: '중학년', high: '고학년' };
  K.GRADE_SUB = { low: '1~2학년', mid: '3~4학년', high: '5~6학년' };
  K.rng = (seed) => { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
  K.shuffle = (arr, r = Math.random) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  K.pick = (arr, r = Math.random) => arr[Math.floor(r() * arr.length)];
  K.range = (n, f = i => i) => Array.from({ length: n }, (_, i) => f(i));
  K.$ = (s, el = document) => el.querySelector(s);
  K.$$ = (s, el = document) => [...el.querySelectorAll(s)];
  K.el = (tag, attrs = {}, html = '') => { const e = document.createElement(tag); for (const k in attrs) { if (k === 'class') e.className = attrs[k]; else if (k.startsWith('on')) e.addEventListener(k.slice(2), attrs[k]); else e.setAttribute(k, attrs[k]); } e.innerHTML = html; return e; };
  K.store = { get(k, d) { try { const v = localStorage.getItem('xk_' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem('xk_' + k, JSON.stringify(v)); } catch (e) { } } };

  /* 학년군: 주소 #low/#mid/#high 또는 마지막 선택 */
  K.grade = () => { const h = (location.hash || '').replace('#', '').split('-')[0]; if (K.GRADES[h]) { K.store.set('grade', h); return h; } return K.store.get('grade', 'mid'); };
  K.setGrade = (g) => { K.store.set('grade', g); try { history.replaceState(null, '', '#' + g); } catch (e) { location.hash = g; } };

  /* 효과음 (Web Audio) */
  let ctx; K.muted = K.store.get('muted', false);
  K.audio = () => { if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { } } if (ctx && ctx.state === 'suspended') ctx.resume(); return ctx; };
  K.tone = (freq, t0 = 0, dur = .25, type = 'triangle', vol = .18) => {
    const c = K.audio(); if (!c || K.muted) return;
    const o = c.createOscillator(), g = c.createGain(), t = c.currentTime + t0;
    o.type = type; o.frequency.value = freq; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .015); g.gain.exponentialRampToValueAtTime(.001, t + dur);
    o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + .02);
  };
  const SFX = {
    ok: () => [[784, 0], [988, .09], [1319, .18]].forEach(([f, t]) => K.tone(f, t, .3)),
    no: () => [[220, 0], [175, .14]].forEach(([f, t]) => K.tone(f, t, .28, 'sawtooth', .1)),
    pop: () => K.tone(880, 0, .08, 'sine', .15),
    tick: () => K.tone(1200, 0, .04, 'square', .05),
    bell: () => [[1568, 0], [2093, .0], [1568, .22], [2093, .22]].forEach(([f, t]) => K.tone(f, t, .5, 'sine', .1)),
    win: () => [523, 659, 784, 1047, 784, 1047, 1319].forEach((f, i) => K.tone(f, i * .11, .35)),
    boo: () => [[196, 0], [185, .2], [165, .4]].forEach(([f, t]) => K.tone(f, t, .35, 'sawtooth', .09)),
  };
  K.sfx = (n) => { try { SFX[n] && SFX[n](); } catch (e) { } };

  /* 눈 내리기 / 색종이 */
  let cv, cx2, parts = [], raf;
  function loop() {
    cx2.clearRect(0, 0, cv.width, cv.height);
    parts = parts.filter(p => p.y < cv.height + 20 && p.life !== 0);
    for (const p of parts) {
      p.x += p.vx + Math.sin((p.y + p.s) / 40) * .4; p.y += p.vy; if (p.g) p.vy += p.g; if (p.life > 0) p.life--;
      cx2.fillStyle = p.c; cx2.globalAlpha = p.a;
      if (p.sq) { cx2.save(); cx2.translate(p.x, p.y); cx2.rotate(p.y / 20); cx2.fillRect(-p.r, -p.r / 2, p.r * 2, p.r); cx2.restore(); }
      else { cx2.beginPath(); cx2.arc(p.x, p.y, p.r, 0, 6.3); cx2.fill(); }
    }
    cx2.globalAlpha = 1;
    if (K._snowing && parts.length < 90 && Math.random() < .3) parts.push({ x: Math.random() * cv.width, y: -8, vx: 0, vy: .6 + Math.random() * 1.2, r: 1.5 + Math.random() * 3.5, c: '#fff', a: .35 + Math.random() * .5, s: Math.random() * 200 });
    raf = (parts.length || K._snowing) ? requestAnimationFrame(loop) : 0;
  }
  function canvas() {
    if (!cv) { cv = K.el('canvas', { id: 'snow' }); document.body.appendChild(cv); cx2 = cv.getContext('2d'); const rs = () => { cv.width = innerWidth; cv.height = innerHeight; }; rs(); addEventListener('resize', rs); }
    if (!raf) raf = requestAnimationFrame(loop);
  }
  const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  K.snow = (on = true) => { if (still()) return; K._snowing = on; if (on) canvas(); };
  K.confetti = () => {
    if (still()) return; canvas();
    const cs = ['#d93a3a', '#f6b93b', '#2e9e5b', '#62b3f2', '#fff'];
    for (let i = 0; i < 140; i++) parts.push({ x: cv.width / 2 + (Math.random() - .5) * 200, y: cv.height * .45, vx: (Math.random() - .5) * 16, vy: -6 - Math.random() * 12, g: .35, r: 5 + Math.random() * 5, c: K.pick(cs), a: 1, sq: 1, s: 0, life: 160 });
  };

  /* 상단바: K.topbar({title, icon, grades:true, onGrade}) */
  K.topbar = (o) => {
    const root = o.root || '../';
    const bar = K.el('header', { class: 'topbar wrap' });
    bar.style.width = '100%';
    bar.innerHTML = `<a class="btn sm" href="${root}index.html" aria-label="키트 처음으로">← 키트</a>
      <h1>${o.icon ? XArt.art(o.icon) : ''}<span>${o.title}</span></h1>
      ${o.grades ? `<div class="seg" role="group" aria-label="학년군">${Object.keys(K.GRADES).map(g => `<button data-g="${g}">${K.GRADES[g]}</button>`).join('')}</div>` : ''}
      <button class="btn sm" id="xk-mute" aria-label="소리 켜기/끄기"></button>
      <button class="btn sm" id="xk-fs">전체화면</button>`;
    document.body.prepend(bar);
    const mb = K.$('#xk-mute', bar); const mt = () => mb.textContent = K.muted ? '소리 꺼짐' : '소리 켜짐'; mt();
    mb.onclick = () => { K.muted = !K.muted; K.store.set('muted', K.muted); mt(); K.sfx('pop'); };
    K.$('#xk-fs', bar).onclick = () => { const d = document; try { (d.fullscreenElement ? d.exitFullscreen() : d.documentElement.requestFullscreen()).catch(() => { }); } catch (e) { } };
    if (o.grades) {
      const g0 = K.grade(); const bs = K.$$('.seg button', bar);
      const mark = (g) => bs.forEach(b => b.setAttribute('aria-pressed', b.dataset.g === g));
      mark(g0); bs.forEach(b => b.onclick = () => { K.setGrade(b.dataset.g); mark(b.dataset.g); K.sfx('pop'); o.onGrade && o.onGrade(b.dataset.g); });
    }
    return bar;
  };

  /* 모둠 점수판 */
  const TC = ['#d93a3a', '#3f7fd6', '#2e9e5b', '#f6b93b', '#9b59b6', '#f2793c'];
  K.teams = (host, n = K.store.get('teams', 4)) => {
    const T = { n, scores: K.range(6, () => 0), turn: 0 };
    const draw = () => {
      host.innerHTML = K.range(T.n, i => `<div class="team ${i === T.turn ? 'turn' : ''}" data-i="${i}"><span class="dot" style="background:${TC[i]}"></span>${i + 1}모둠 <button data-d="-1" aria-label="${i + 1}모둠 점수 빼기">−</button><b>${T.scores[i]}</b><button data-d="1" aria-label="${i + 1}모둠 점수 더하기">+</button></div>`).join('') +
        `<div class="team"><button data-n="-1" aria-label="모둠 줄이기">−</button>모둠 수<button data-n="1" aria-label="모둠 늘리기">+</button></div>`;
    };
    host.classList.add('teams');
    host.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) { const t = e.target.closest('.team[data-i]'); if (t) { T.turn = +t.dataset.i; draw(); } return; }
      if (b.dataset.n) { T.n = Math.max(1, Math.min(6, T.n + +b.dataset.n)); K.store.set('teams', T.n); T.turn %= T.n; }
      else { const i = +b.closest('.team').dataset.i; T.scores[i] += +b.dataset.d; K.sfx('pop'); }
      draw();
    });
    T.add = (pts, i = T.turn) => { T.scores[i] += pts; draw(); };
    T.next = () => { T.turn = (T.turn + 1) % T.n; draw(); };
    T.draw = draw; draw(); return T;
  };
  K.modal = (html, onClose) => {
    const m = K.el('div', { class: 'modal' }, `<div class="box pop">${html}</div>`);
    m.close = () => { m.remove(); onClose && onClose(); };
    m.addEventListener('click', e => { if (e.target === m || e.target.closest('[data-close]')) m.close(); });
    document.body.appendChild(m); return m;
  };
  /* 초 단위 타이머 */
  K.timer = (el, sec, onEnd) => {
    let left = sec, id; const show = () => el.textContent = left;
    const T = { start() { T.stop(); show(); id = setInterval(() => { left--; show(); if (left <= 5 && left > 0) K.sfx('tick'); if (left <= 0) { T.stop(); K.sfx('bell'); onEnd && onEnd(); } }, 1000); }, stop() { clearInterval(id); }, reset(s = sec) { left = s; show(); } };
    show(); return T;
  };
  window.XK = K;
})();
