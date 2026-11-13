/* 크리스마스 일러스트 라이브러리
   그림은 Figma AI로 생성한 일러스트를 잘라 만든 파일입니다.
   assets/img/c/<이름>.png = 컬러 스티커,  assets/img/l/<이름>.png = 색칠용 선 그림
   art(name, {line, size})           → <img> 태그 문자열
   artG(name, x, y, size, {line,flip,rot,shadow}) → SVG 안에 넣는 <image> 태그 문자열 */
(function () {
  const ME = (document.currentScript && document.currentScript.src) || '';
  const BASE = ME ? ME.replace(/art\.js(\?.*)?$/, '') : 'assets/';
  const LABEL = {
    santa: '산타', rudolph: '루돌프', snowman: '눈사람', tree: '트리', gift: '선물', ginger: '진저맨', penguin: '펭귄', stocking: '양말', bell: '종', cane: '지팡이 사탕',
    ornament: '오너먼트', star: '별', snowflake: '눈꽃', elf: '엘프', mitten: '장갑', candle: '촛불', wreath: '리스', cocoa: '코코아', hat: '산타 모자', holly: '호랑가시',
    polarbear: '북극곰', ginghouse: '과자 집', sleigh: '썰매', cookies: '쿠키', nutcracker: '호두까기 인형', teddy: '곰 인형', globe: '스노우볼', angel: '천사', owl: '부엉이', fox: '여우',
    bunny: '토끼', lights: '전구', train: '기차', presents: '선물 더미', poinsettia: '포인세티아', signpost: '북극 표지판', letter: '편지', horse: '흔들목마', candy: '사탕', hedgehog: '고슴도치',
  };
  const NAMES = Object.keys(LABEL);
  /* 원래 20종(퍼즐·카드처럼 개수를 맞춰야 하는 곳에서 사용) */
  const CORE = NAMES.slice(0, 20);
  const src = (n, line) => `${BASE}img/${line ? 'l' : 'c'}/${LABEL[n] ? n : 'star'}.png`;
  const esc = (s) => String(s).replace(/"/g, '&quot;');

  function art(name, o = {}) {
    const sz = o.size ? `width="${o.size}" height="${o.size}"` : '';
    const st = `object-fit:contain;${o.shadow ? 'filter:brightness(0) opacity(.85);' : ''}${o.style || ''}`;
    return `<img class="art ${o.cls || ''}" src="${src(name, o.line)}" alt="${esc(LABEL[name] || '')}" ${sz} style="${st}" draggable="false">`;
  }
  function artG(name, x, y, size, o = {}) {
    let t = `translate(${(+x).toFixed(2)} ${(+y).toFixed(2)})`;
    if (o.rot) t += ` rotate(${o.rot} ${size / 2} ${size / 2})`;
    if (o.flip) t += ` translate(${size} 0) scale(-1 1)`;
    const f = o.shadow ? ' style="filter:brightness(0) opacity(.85)"' : '';
    return `<image href="${src(name, o.line)}" x="0" y="0" width="${size}" height="${size}" preserveAspectRatio="xMidYMid meet" transform="${t}"${f}/>`;
  }
  /* 전면 그림 (컬러링 페이지·배경) */
  const page = (n) => `${BASE}img/page/${n}`;
  const img = (p) => `${BASE}img/${p}`;
  const thauma = (n) => `${BASE}img/t/${n}.png`;
  const starPts = (cx, cy, R, r, n = 5, rot = -90) => {
    const p = [];
    for (let i = 0; i < n * 2; i++) { const a = (rot + i * 180 / n) * Math.PI / 180, q = i % 2 ? r : R; p.push((cx + q * Math.cos(a)).toFixed(1) + ',' + (cy + q * Math.sin(a)).toFixed(1)); }
    return p.join(' ');
  };
  /* 미리 불러오기 (인쇄 전 모든 그림이 준비되도록) */
  const preload = (line) => Promise.all(NAMES.map(n => new Promise(r => { const i = new Image(); i.onload = i.onerror = r; i.src = src(n, line); })));
  window.XArt = { art, artG, NAMES, CORE, label: n => LABEL[n] || '?', src, page, img, thauma, starPts, preload, O: '#432' };
})();
