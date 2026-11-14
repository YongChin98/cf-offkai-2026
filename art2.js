/* Poster-inspired art, drawn here: bubble logo, hearts, sparkles, mic. */

const HEART = 'M12 21C12 21 3 15.2 3 8.8A4.7 4.7 0 0 1 12 6.4 4.7 4.7 0 0 1 21 8.8C21 15.2 12 21 12 21Z';
const STAR4 = 'M12 1.5L14.6 9.4L22.5 12L14.6 14.6L12 22.5L9.4 14.6L1.5 12L9.4 9.4Z';

/* a pink heart overlapping a yellow one, outlined in white and blue like the poster's frame accents */
function heartPair(flip) {
  const mic = (hx, hy, rot, head, body) => `<g transform="rotate(${rot} ${hx} ${hy})">
      <rect x="${hx - 2.6}" y="${hy + 4}" width="5.2" height="15" rx="2.6" fill="${body}" stroke="#101014" stroke-width="2.4" stroke-linejoin="round"/>
      <circle cx="${hx}" cy="${hy}" r="6.2" fill="${head}" stroke="#101014" stroke-width="2.4"/>
      <path d="M${hx - 4.4} ${hy - 1.4}h8.8M${hx - 3.6} ${hy + 1.6}h7.2" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".85"/></g>`;
  return `<svg class="heartpair" viewBox="0 0 44 40" aria-hidden="true" ${flip ? 'style="transform:scaleX(-1)"' : ''} xmlns="http://www.w3.org/2000/svg">
    ${mic(13, 11, -28, '#28dcff', '#101014')}${mic(30, 11, 28, '#ff4fa0', '#7a30f8')}</svg>`;
}
function heartOne(color) {
  return `<svg class="heart" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="${HEART}" fill="${color || '#ff6fae'}" stroke="#fff" stroke-width="2" stroke-linejoin="round"/></svg>`;
}
function sparkle(color) {
  return `<svg class="sparkle" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="${STAR4}" fill="${color || '#28dcff'}" stroke="#101014" stroke-width="1.8" stroke-linejoin="round"/></svg>`;
}

/* starburst with a microphone, drawn at (x, y) inside the logo */
function micBurst(x, y, rot) {
  const spikes = Array.from({ length: 12 }, (_, i) => {
    const a = i * Math.PI / 6, r = i % 2 ? 40 : 56;
    return `${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`;
  }).join(' ');
  return `<g transform="translate(${x} ${y}) rotate(${rot})">
    <polygon points="${spikes}" fill="#ffd23c" stroke="#3a3fd8" stroke-width="5" stroke-linejoin="round"/>
    <g transform="rotate(35)"><rect x="-9" y="-30" width="18" height="30" rx="9" fill="#fff" stroke="#14207a" stroke-width="4"/>
      <path d="M-9 -18h18M-9 -10h18" stroke="#14207a" stroke-width="2.5"/>
      <rect x="-5" y="-2" width="10" height="26" rx="5" fill="#3a74ee" stroke="#14207a" stroke-width="4"/></g></g>`;
}

/* "PRE-OFFKAI" in bubbly layered lettering, with the hololive SUPER Karaoke pill above */
function logoSVG() {
  const letters = 'PRE-OFFKAI'.split('');
  const cols = [['#8cf0ff', '#18a9e8'], ['#a9c8ff', '#3a74ee'], ['#fff09a', '#ffb21f'], ['#ffb3d6', '#ff4f9d'], ['#ffc48a', '#ff6f2c'],
    ['#ffa6cc', '#f2468f'], ['#fff09a', '#ffb21f'], ['#8cf0ff', '#18a9e8'], ['#c8b6ff', '#7a52f0'], ['#ffb3d6', '#ff4f9d']];
  const defs = cols.map((c, i) => `<linearGradient id="lg${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset=".55" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient>`).join('')
    + `<linearGradient id="lgSub" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff9cc9"/><stop offset=".5" stop-color="#ffe66b"/><stop offset="1" stop-color="#ff9cc9"/></linearGradient>`;
  const dy = [0, -9, 5, -2, 7, -7, 5, -5, 8, -3], rot = [-4, 3, -2, 0, -3, 4, -3, 3, -4, 3];
  const layer = (attrs, fillFn) => `<text x="40" y="214" font-family="'Titan One','Arial Black',sans-serif" font-size="150" textLength="840" lengthAdjust="spacingAndGlyphs" ${attrs}>${
    letters.map((l, i) => `<tspan rotate="${rot[i]}" dy="${dy[i] - (i ? dy[i - 1] : 0)}"${fillFn ? ` fill="${fillFn(i)}"` : ''}>${l}</tspan>`).join('')}</text>`;
  const sub = (attrs, fill) => `<text x="460" y="318" text-anchor="middle" font-family="'Titan One','Arial Black',sans-serif" font-size="62" ${attrs} ${fill ? `fill="${fill}"` : 'fill="none"'}>FAN MEETUP IN KL!</text>`;
  return `<svg viewBox="-20 -6 960 356" overflow="visible" role="img" aria-label="hololive SUPER Karaoke Pre-Offkai" xmlns="http://www.w3.org/2000/svg">
    <defs>${defs}</defs>
    <rect x="236" y="4" width="448" height="58" rx="29" fill="#fff" stroke="#2f7be0" stroke-width="4"/>
    <text x="460" y="44" text-anchor="middle" font-family="Montserrat, sans-serif" font-style="italic" font-weight="800" font-size="27" fill="#1d63d6">hololive SUPER Karaoke</text>
    ${micBurst(52, 106, -12)}${micBurst(868, 106, 12)}
    <g transform="translate(0 10)">${layer('fill="none" stroke="#10196e" stroke-width="32" stroke-linejoin="round"')}</g>
    ${layer('fill="none" stroke="#3a3fd8" stroke-width="26" stroke-linejoin="round"')}
    ${layer('fill="none" stroke="#fff" stroke-width="12" stroke-linejoin="round"')}
    ${layer('stroke="none"', i => `url(#lg${i})`)}
    <g>${sub('stroke="#10196e" stroke-width="16" stroke-linejoin="round"')}${sub('stroke="#3a3fd8" stroke-width="12" stroke-linejoin="round"')}${sub('stroke="#fff" stroke-width="6" stroke-linejoin="round"')}${sub('stroke="none"', 'url(#lgSub)')}</g>
  </svg>`;
}
