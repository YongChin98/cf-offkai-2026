(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const safe = fn => { try { fn(); } catch (e) { console.error(e); } };
  document.documentElement.classList.add('js');

  const scroller = window.lineScroll;
  const view = $('#stage');
  const go = x => scroller && scroller.go(x);
  const byId = Object.fromEntries(MEMBERS.map(m => [m.id, m]));
  /* ---------- authored art into the page ---------- */
  safe(() => {
    $$('[data-icon]').forEach(el => { el.innerHTML = icon(el.dataset.icon, +el.dataset.size || 22); });
    $$('[data-perk]').forEach(el => { el.insertAdjacentHTML('afterbegin', icon('check', 20)); });
    $$('[data-deco]').forEach(el => { el.innerHTML = el.dataset.deco === 'sparkle' ? sparkle() : heartPair(); });
  });

  /* ---------- talent icons: bear, palette, dice, penguin. One flat ink colour, cut-outs show the card behind ---------- */
  /* shapes are drawn clockwise (fill) or anticlockwise (cut-out) so a single nonzero path does the subtracting */
  const el = (cx, cy, rx, ry, cut) => `M${cx - rx} ${cy}A${rx} ${ry} 0 1 ${cut ? 0 : 1} ${cx + rx} ${cy}A${rx} ${ry} 0 1 ${cut ? 0 : 1} ${cx - rx} ${cy}Z`;
  const rr = (x, y, w, h, r) => `M${x + r} ${y}H${x + w - r}A${r} ${r} 0 0 1 ${x + w} ${y + r}V${y + h - r}A${r} ${r} 0 0 1 ${x + w - r} ${y + h}H${x + r}A${r} ${r} 0 0 1 ${x} ${y + h - r}V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}Z`;
  const mono = (d, g, extra) => `<svg viewBox="0 0 120 120" aria-hidden="true"><g${g ? ` transform="${g}"` : ''}><path d="${d}" fill="#101014"/>${extra || ''}</g></svg>`;
  const line = d => `<path d="${d}" fill="none" stroke="#101014" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>`;
  const ICON = {
    sora: () => mono(
      el(25, 36, 14, 14) + el(95, 36, 14, 14) + el(25, 36, 6.5, 6.5, 1) + el(95, 36, 6.5, 6.5, 1)
      + el(60, 68, 49, 43)
      + el(60, 83, 14, 10.5, 1) + el(60, 78, 5.5, 4)
      + el(25, 82, 7, 4.5, 1) + el(95, 82, 7, 4.5, 1),
      '', line('M60 82v3M52.5 85.5q3.8 4 7.5 0q3.8 4 7.5 0')),
    iofi: () => mono('M60 10C30 10 6 32 6 60c0 30 24 50 52 50 14 0 18-10 11-18-6-8 1-18 13-18h18c13 0 17-12 15-21C112 30 90 10 60 10Z'
      + el(33, 82, 9, 9) + el(33, 44, 9, 9) + el(60, 30, 9, 9) + el(88, 44, 9, 9) + el(62, 62, 8, 8)), /* blob runs anticlockwise, so its holes are clockwise */
    baelz: () => mono(rr(14, 14, 92, 92, 20) + el(38, 38, 8, 8, 1) + el(82, 38, 8, 8, 1) + el(60, 60, 8, 8, 1) + el(38, 82, 8, 8, 1) + el(82, 82, 8, 8, 1), 'rotate(10 60 60)'),
    mela: () => mono(rr(32, 42, 50, 70, 16) + rr(46, 26, 22, 18, 4) + 'M68 30L98 24V32L68 38Z' + el(57, 54, 5, 5, 1) + 'M42 70V90H72V70Z',
      '', '<path d="M46 35Q20 35 20 66" fill="none" stroke="#101014" stroke-width="6" stroke-linecap="round"/>'),
    sopia: () => mono(rr(44, 44, 32, 32, 7) + rr(4, 49, 34, 22, 3) + rr(82, 49, 34, 22, 3) + 'M36 57H46V63H36Z' + 'M74 57H84V63H74Z' + el(60, 24, 8, 8)
      + el(60, 60, 5.5, 5.5, 1) + 'M12 53V67H14.6V53Z' + 'M20 53V67H22.6V53Z' + 'M28 53V67H30.6V53Z' + 'M90 53V67H92.6V53Z' + 'M98 53V67H100.6V53Z' + 'M106 53V67H108.6V53Z',
      'rotate(-20 60 60)', '<path d="M60 44V30" fill="none" stroke="#101014" stroke-width="5" stroke-linecap="round"/>'),
    tsuzuri: () => mono(rr(8, 26, 104, 72, 12) + 'M16 36L16 45L60 80L104 45L104 36L60 70Z'),
    kyoko: () => mono('M14 48H52L96 22V98L52 72H14Z' + 'M26 72H40V96H26Z',
      'translate(-6 0)', line('M104 44Q114 60 104 76') + line('M108 32Q124 60 108 88')),
    hajime: () => mono(
      el(60, 66, 43, 46) + el(17, 80, 8, 15) + el(103, 80, 8, 15) + el(44, 112, 13, 6.5) + el(76, 112, 13, 6.5)
      + el(60, 87, 29, 23, 1) + 'M54 54L60 62L66 54Z'
      + el(26, 62, 6, 4, 1) + el(94, 62, 6, 4, 1)
      + el(60, 22, 5, 7) + el(51, 25, 4.5, 6.5) + el(69, 25, 4.5, 6.5))
  };

  /* ---------- lineup: the four talents at hololive Meet SUPER KARAOKE PARTY ---------- */
  const LINEUP = [
    { id: 'sora', unit: 'hololive Generation 0', bg: '#7fe9ff' },
    { id: 'iofi', unit: 'hololive AREA15', bg: '#ff8cc3' },
    { id: 'baelz', unit: 'hololive -Promise-', bg: '#b997ff' },
    { id: 'hajime', unit: 'ReGLOSS', bg: '#ffe14a' },
    { id: 'mela', name: 'Achichi Mela', unit: 'ASOBI★MAWARI-TAI!', bg: '#ffffff' },
    { id: 'sopia', name: 'Sorashina Sopia', unit: 'ASOBI★MAWARI-TAI!', bg: '#7fe9ff' },
    { id: 'tsuzuri', name: 'Suzuna Tsuzuri', unit: 'ASOBI★MAWARI-TAI!', bg: '#ff8cc3' },
    { id: 'kyoko', name: 'Hyakuto Kyoko', unit: 'ASOBI★MAWARI-TAI!', bg: '#ffe14a' }
  ];
  /* top row: the main event talents; bottom row: the ASOBI★MAWARI-TAI! members */
  const card = (t, i) => {
    const name = t.name || byId[t.id].en;
    return `<li class="frame" style="--c:${t.bg}">
      <div class="frame-in"><div class="g-art" role="img" aria-label="${name} icon">${ICON[t.id](t.bg)}</div></div>${heartPair(i > 1)}
      <div class="plate" style="--n:${name.length};--u:${t.unit.length}"><h3>${name}</h3><p>${t.unit}</p></div></li>`;
  };
  safe(() => {
    $('#lineup').innerHTML = LINEUP.slice(0, 4).map(card).join('');
    $('#lineup2').innerHTML = LINEUP.slice(4).map(card).join('');
  });

  /* ---------- guest performers: 2 DJs, 2 dancers (placeholder names, drawn here) ---------- */
  const dj = `<svg viewBox="0 0 120 120" aria-hidden="true"><path d="M30 64a30 30 0 0 1 60 0" fill="none" stroke="#101014" stroke-width="9" stroke-linecap="round"/><rect x="20" y="58" width="16" height="30" rx="8" fill="#ff4fa0" stroke="#fff" stroke-width="4"/><rect x="84" y="58" width="16" height="30" rx="8" fill="#ff4fa0" stroke="#fff" stroke-width="4"/><circle cx="60" cy="86" r="26" fill="#101014"/><circle cx="60" cy="86" r="19" fill="none" stroke="#7a30f8" stroke-width="2"/><circle cx="60" cy="86" r="12" fill="none" stroke="#7a30f8" stroke-width="2"/><circle cx="60" cy="86" r="6" fill="#ffd23c"/></svg>`;
  const dancer = `<svg viewBox="0 0 120 120" aria-hidden="true"><g fill="none" stroke="#101014" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"><path d="M60 46L58 76L40 104M58 76L80 100"/><path d="M59 54L34 36M59 54L88 22"/></g><circle cx="60" cy="32" r="12" fill="#ffd23c" stroke="#101014" stroke-width="5"/><path d="M92 10l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#ff4fa0" stroke="#fff" stroke-width="2"/></svg>`;
  const GUESTS = [
    { name: 'DJ Kohaku', role: 'DJ', note: 'hololive and anisong remixes', art: dj, bg: '#7fe9ff' },
    { name: 'DJ Mirai', role: 'DJ', note: 'J-pop and club edits', art: dj, bg: '#ffe14a' },
    { name: 'Rina', role: 'Dancer', note: 'Idol choreography', art: dancer, bg: '#ff8cc3' },
    { name: 'Hana', role: 'Dancer', note: 'Dance cover', art: dancer, bg: '#b997ff' }
  ];
  safe(() => {
    $('#guestList').innerHTML = GUESTS.map((g, i) => `<li class="frame gframe" style="--c:${g.bg}">
      <div class="frame-in"><div class="g-art">${g.art}</div></div>${heartPair(i > 1)}
      <div class="plate"><h3>${g.name}</h3><p>${g.role}<br>${g.note}</p></div></li>`).join('');
  });

  /* ---------- good to know ---------- */
  const FAQ = [
    ['Is this an official hololive event?', 'No. It is a fan-organised meetup, not affiliated with COVER Corp. We follow their fan creation guidelines.'],
    ['Can I buy a ticket at the door?', 'No. Entry is by registration and payment only, capped at 200 guests.'],
    ['Where is the venue?', 'Millennium Ballroom at Tribeca Serviced Hotel by Millennium. <a class="map-link" href="https://maps.app.goo.gl/WSB4JB5aYCrnsVKD7" target="_blank" rel="noopener">Open in Google Maps</a> for directions.'],
    ['Is food included?', 'Yes: light bites and soft drinks. Dietary needs, including halal, are part of the caterer planning.'],
    ['When will the gate open?', 'Doors open at 7:00 PM for ticket check and lanyards. The programme starts at 7:30 PM, so arrive early to avoid the queue.']
  ];
  safe(() => {
    $('#bubbles').innerHTML = FAQ.map(b =>
      `<li class="qa"><h3>${b[0]}</h3><p>${b[1]}</p></li>`).join('');
  });

  /* ---------- run of show, Friday 18 Dec 2026, Malaysia time ---------- */
  const START = Date.UTC(2026, 11, 18, 11, 0); /* 19:00 MYT */
  const SHOW = [
    [0, '19:00', 'Doors open, ticket check, lanyards', 'Entry', '#ffe14a'],
    [30, '19:30', 'Opening, house rules, safety notice', 'Stage', '#ff8cc3'],
    [40, '19:40', 'Mingling: food, drinks, photos', 'Social', '#ffffff'],
    [80, '20:20', 'Performance 1', 'Stage', '#ff8cc3'],
    [95, '20:35', 'Performance 2', 'Stage', '#ff8cc3'],
    [110, '20:50', 'Lucky draw', 'Draw', '#ffe14a'],
    [130, '21:10', 'DJ party: DJ Kohaku', 'DJ', '#28dcff'],
    [145, '21:25', 'Dance performance: Rina and Hana', 'Dance', '#b997ff'],
    [160, '21:40', 'DJ party: DJ Mirai', 'DJ', '#28dcff'],
    [175, '21:55', 'Closing, group photo, Karaoke Party reminder', 'Stage', '#ff8cc3'],
    [200, '22:20', 'Free mingling and photos', 'Social', '#ffffff'],
    [240, '23:00', 'Event ends. See you at Comic Fiesta tomorrow!', 'End', '#ffe14a']
  ];
  safe(() => {
    $('#departures').innerHTML = SHOW.map((s, i) =>
      `<li class="dep" data-i="${i}" style="--c:${s[4]}"><span class="t">${s[1]}</span><span class="n">${s[2]}</span><span class="h"><i></i>${s[3]}</span></li>`).join('');
  });

  function fmtEta(ms) {
    const s = Math.floor(ms / 1000), d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60);
    const pad = n => String(n).padStart(2, '0');
    return `<b>${d}</b><i>d</i> <b>${pad(h)}</b><i>h</i> <b>${pad(m)}</b><i>m</i>`;
  }
  function updateBoard() {
    const now = Date.now(), rel = (now - START) / 60000;
    const rows = $$('.dep');
    rows.forEach(el => { el.classList.remove('is-next', 'is-live'); const n = $('.n', el); n.removeAttribute('data-flag'); });
    const eta = $('#boardEta'), head = $('.board-head');
    if (rel < 0) {
      if (rows[0]) { rows[0].classList.add('is-next'); $('.n', rows[0]).dataset.flag = 'Next'; }
      eta.innerHTML = fmtEta(START - now);
    } else if (rel <= 240) {
      let idx = 0; SHOW.forEach((s, i) => { if (rel >= s[0]) idx = i; });
      if (rows[idx]) { rows[idx].classList.add('is-live'); $('.n', rows[idx]).dataset.flag = 'Now'; }
      head.textContent = 'Happening now';
      eta.textContent = SHOW[idx][2];
    } else {
      head.textContent = 'Thanks for coming';
      eta.textContent = 'See you at Comic Fiesta';
    }
  }
  safe(() => { updateBoard(); setInterval(updateBoard, 15000); });

  /* ---------- clock (Malaysia time) ---------- */
  safe(() => {
    let ticks = '';
    for (let i = 0; i < 60; i++) {
      const a = i * 6 * Math.PI / 180, big = i % 5 === 0, r1 = big ? 78 : 86, r2 = 92;
      ticks += `<line x1="${100 + Math.sin(a) * r1}" y1="${100 - Math.cos(a) * r1}" x2="${100 + Math.sin(a) * r2}" y2="${100 - Math.cos(a) * r2}" stroke="#101014" stroke-width="${big ? 4 : 1.6}" stroke-linecap="round"/>`;
    }
    $('#clock').innerHTML = `<svg viewBox="0 0 200 200" width="100%" height="100%" aria-hidden="true">
      <circle cx="100" cy="100" r="97" fill="#fff" stroke="#28dcff" stroke-width="6"/>${ticks}
      <text x="100" y="64" text-anchor="middle" font-family="Montserrat, sans-serif" font-style="italic" font-weight="900" font-size="14" letter-spacing="1" fill="#101014">MYT</text>
      <line id="hH" x1="100" y1="108" x2="100" y2="58" stroke="#101014" stroke-width="7" stroke-linecap="round"/>
      <line id="hM" x1="100" y1="112" x2="100" y2="30" stroke="#101014" stroke-width="5" stroke-linecap="round"/>
      <g id="hS"><line x1="100" y1="120" x2="100" y2="22" stroke="#ff4fa0" stroke-width="2.4" stroke-linecap="round"/><circle cx="100" cy="42" r="7" fill="#ff4fa0"/></g>
      <circle cx="100" cy="100" r="5" fill="#ff4fa0"/></svg>`;
    const hH = $('#hH'), hM = $('#hM'), hS = $('#hS');
    const set = () => {
      const j = new Date(Date.now() + 8 * 3600e3), h = j.getUTCHours() % 12, m = j.getUTCMinutes(), s = j.getUTCSeconds();
      hH.setAttribute('transform', `rotate(${h * 30 + m / 2} 100 100)`);
      hM.setAttribute('transform', `rotate(${m * 6 + s / 10} 100 100)`);
      hS.setAttribute('transform', `rotate(${s * 6} 100 100)`);
    };
    set(); setInterval(set, 1000);
  });

  /* ---------- route bar and active section ---------- */
  const panels = $$('.panel');
  const ticks = $('#railTicks'), nowEl = $('#railNow');
  ticks.innerHTML = panels.map(() => '<li></li>').join('');
  const routeList = $('#routeList'), fill = $('#routeFill');
  let offsets = [], active = -1;

  routeList.innerHTML = panels.map((p, i) =>
    `<li data-i="${i}"><button type="button" aria-label="Go to ${p.dataset.name}"><span>${p.dataset.name}</span></button></li>`).join('');
  routeList.addEventListener('click', e => {
    const li = e.target.closest('li'); if (li && offsets[+li.dataset.i]) go(offsets[+li.dataset.i].left);
  });
  document.addEventListener('click', e => {
    const a = e.target.closest('a[data-go], a.rail-title'); if (!a) return;
    const id = a.dataset.go || 'departure';
    const i = panels.findIndex(p => p.id === id);
    if (i >= 0) { e.preventDefault(); go(offsets[i].left); }
  });

  const vert = () => matchMedia('(max-width: 800px)').matches;
  const pos = () => vert() ? view.scrollTop : view.scrollLeft;
  const span = () => vert() ? view.clientHeight : view.clientWidth;
  const total = () => vert() ? view.scrollHeight : view.scrollWidth;
  function measure() {
    offsets = panels.map(p => vert() ? ({ left: p.offsetTop, width: p.offsetHeight }) : ({ left: p.offsetLeft, width: p.offsetWidth }));
    const max = Math.max(1, total() - span());
    $$('#routeList li').forEach((li, i) => { li.style.left = clamp(offsets[i].left / max, 0, 1) * 100 + '%'; });
    update();
  }
  function update() {
    if (!offsets.length) return;
    const x = pos(), vw = span();
    const max = Math.max(1, total() - vw);
    const frac = clamp(x / max, 0, 1);
    const lineW = $('.route-line').clientWidth;
    fill.style.width = Math.max(0, frac * lineW) + 'px';
    $$('#routeList li').forEach(li => {
      const cx = parseFloat(li.style.left) / 100 * lineW;
      $('button', li).classList.toggle('quaver', frac > 0 && cx <= frac * lineW + 0.5);
    });
    const probe = x + vw * .35;
    let a = 0;
    offsets.forEach((o, i) => { if (probe >= o.left) a = i; });
    if (a !== active) {
      active = a;
      $$('#routeList button').forEach((b, i) => { if (i === a) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); });
      try { history.replaceState(null, '', '#' + panels[a].id); } catch (_) {}
      document.title = `${panels[a].dataset.name} | hololive SUPER Karaoke Pre-Offkai`;
      document.body.dataset.panel = panels[a].id;
      nowEl.textContent = String(a + 1).padStart(2, '0');
      $$('li', ticks).forEach((t, k) => t.classList.toggle('on', k === a));
    }
  }
  view.addEventListener('scroll', update, { passive: true });
  addEventListener('resize', measure);

  /* ---------- boot ---------- */
  safe(() => $('#joinBtn').addEventListener('click', e => e.preventDefault()));
  measure();
  addEventListener('load', () => {
    measure();
    const i = panels.findIndex(p => p.id === location.hash.slice(1));
    if (i > 0) { if (vert()) view.scrollTop = offsets[i].left; else view.scrollLeft = offsets[i].left; }
    update();
    requestAnimationFrame(() => document.documentElement.classList.add('ready'));
  });
  document.fonts && document.fonts.ready.then(measure);
  /* never leave content hidden if the load event is slow */
  setTimeout(() => document.documentElement.classList.add('ready'), 1500);
})();
