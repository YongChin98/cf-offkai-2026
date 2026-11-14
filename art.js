/* Niji Line: hand-built vector art. Characters, train and roundel are all authored here. */
const INK = '#15133b';
const STRIPES = ['#ff6048', '#ffd23f', '#3ddfa5', '#33c6f4', '#a08aff', '#ff6aa6'];

const MEMBERS = [
  {
    id: 'sora', en: 'Tokino Sora', jp: 'ときのそら', bg: '#33c6f4',
    hair: '#5ad9ff', hairD: '#1e9fd1', hairL: '#d6f6ff', eye: '#2c5bff', eyeL: '#8fd0ff',
    outfit: '#15133b', outfit2: '#ffffff', accent: '#ffd23f',
    style: 'twin', fringe: 'part', acc: 'headphones', cloth: 'jacket', mouth: 'open',
    role: 'hololive Generation 0', when: 'Tue and Fri, 21:00', debut: 'Mar 2023',
    line: 'One more run. Okay, three more.'
  },
  {
    id: 'iofi', en: 'Airani Iofifteen', jp: 'アイラニ・イオフィフティーン', bg: '#ffd23f',
    hair: '#ff9a3c', hairD: '#d9661a', hairL: '#ffd9a8', eye: '#e8365a', eyeL: '#ffb3c0',
    outfit: '#f6f8fc', outfit2: '#e2362f', accent: '#e2362f',
    style: 'long', fringe: 'blunt', acc: 'fox', cloth: 'sailor', mouth: 'smile',
    role: 'hololive AREA15', when: 'Wed 22:30, Sat 23:00', debut: 'Oct 2022',
    line: 'Leave the lights on. I mean it.'
  },
  {
    id: 'baelz', en: 'Hakos Baelz', jp: 'ハコス・ベールズ', bg: '#a08aff',
    hair: '#8a6bff', hairD: '#5a3fd0', hairL: '#d4c8ff', eye: '#ffd23f', eyeL: '#fff0a8',
    outfit: '#2b2862', outfit2: '#a08aff', accent: '#ffd23f',
    style: 'bob', fringe: 'part', acc: 'horns', cloth: 'hoodie', mouth: 'smirk',
    role: 'hololive -Promise-', when: 'Mon 21:00, Sun 20:00', debut: 'Jun 2023',
    line: 'Skill issue. Mine, today.'
  },
  {
    id: 'hajime', en: 'Todoroki Hajime', jp: '轟はじめ', bg: '#ff6aa6',
    hair: '#ff7eb0', hairD: '#d93d82', hairL: '#ffc9df', eye: '#f08a00', eyeL: '#ffd28a',
    outfit: '#ffd23f', outfit2: '#ffffff', accent: '#33c6f4',
    style: 'pony', fringe: 'part', acc: 'cat', cloth: 'sailor', mouth: 'open',
    role: 'ReGLOSS', when: 'Thu, 19:00', debut: 'Jan 2024',
    line: 'Ten minutes. Dinner. Go.'
  }
];

function avatar(m, opt = {}) {
  const S = `stroke="${INK}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"`;
  const skin = '#ffe4d6', skinD = '#f4c3ab';
  const mir = x => `<g transform="translate(400 0) scale(-1 1)">${x}</g>`;
  const both = x => x + mir(x);

  /* back hair */
  let back = '', tails = '';
  switch (m.style) {
    case 'long':
      back = `<path d="M92 215C80 110 140 66 200 66C260 66 320 110 308 215C314 310 326 410 304 492L96 492C74 410 86 310 92 215Z" fill="${m.hair}" ${S}/>
        <path d="M118 330C112 390 118 440 130 478M282 330C288 390 282 440 270 478" fill="none" stroke="${m.hairD}" stroke-width="5" stroke-linecap="round" opacity=".7"/>`;
      break;
    case 'twin':
      back = `<path d="M96 215C92 110 140 70 200 70C260 70 308 110 304 215C300 250 290 270 285 275L115 275C110 270 100 250 96 215Z" fill="${m.hair}" ${S}/>`;
      tails = both(`<path d="M106 190C38 215 20 330 44 456C78 414 102 334 122 252Z" fill="${m.hair}" ${S}/>
        <path d="M70 300C64 350 66 396 74 424" fill="none" stroke="${m.hairD}" stroke-width="5" stroke-linecap="round" opacity=".7"/>
        <circle cx="110" cy="196" r="15" fill="${m.accent}" ${S}/>`);
      break;
    case 'bob':
      back = `<path d="M94 215C88 105 140 68 200 68C260 68 312 105 306 215C310 290 304 335 286 354L114 354C96 335 90 290 94 215Z" fill="${m.hair}" ${S}/>`;
      break;
    case 'pony':
      back = `<path d="M98 210C94 112 140 74 200 74C260 74 306 112 302 210C300 240 292 258 286 262L114 262C108 258 100 240 98 210Z" fill="${m.hair}" ${S}/>`;
      tails = `<path d="M282 142C376 118 402 252 354 376C342 414 320 444 298 460C312 402 300 330 284 236Z" fill="${m.hair}" ${S}/>
        <path d="M352 220C358 280 348 330 330 372" fill="none" stroke="${m.hairD}" stroke-width="5" stroke-linecap="round" opacity=".7"/>
        <circle cx="288" cy="152" r="16" fill="${m.accent}" ${S}/>`;
      break;
    default:
      back = `<path d="M98 210C94 112 140 74 200 74C260 74 306 112 302 210C300 240 292 258 286 262L114 262C108 258 100 240 98 210Z" fill="${m.hair}" ${S}/>`;
  }

  /* body */
  let body = `<path d="M172 318L172 400Q200 418 228 400L228 318Z" fill="${skinD}" ${S}/>
    <path d="M52 520C52 440 110 396 172 392Q200 412 228 392C290 396 348 440 348 520Z" fill="${m.outfit}" ${S}/>`;
  if (m.cloth === 'sailor') {
    body += `<path d="M120 414L200 506L280 414L228 392Q200 412 172 392Z" fill="${m.outfit2}" ${S}/>
      <path d="M186 440L200 486L214 440Z" fill="${m.accent}" ${S}/>`;
  } else if (m.cloth === 'hoodie') {
    body += `<path d="M118 424Q200 480 282 424" fill="none" ${S}/>
      <path d="M176 458L172 510M224 458L228 510" fill="none" stroke="${m.outfit2}" stroke-width="6" stroke-linecap="round"/>`;
  } else {
    body += `<path d="M172 392L196 470L150 520M228 392L204 470L250 520" fill="none" ${S}/>
      <path d="M172 392L200 450L228 392Q200 412 172 392Z" fill="${m.outfit2}" ${S}/>`;
  }

  /* head */
  const ears = `<ellipse cx="108" cy="258" rx="11" ry="17" fill="${skin}" ${S}/><ellipse cx="292" cy="258" rx="11" ry="17" fill="${skin}" ${S}/>`;
  const face = `<path d="M110 215C110 140 150 100 200 100C250 100 290 140 290 215C290 275 255 330 200 340C145 330 110 275 110 215Z" fill="${skin}" ${S}/>
    <path d="M114 206C150 224 250 224 286 206L286 190C250 210 150 210 114 190Z" fill="${skinD}" opacity=".55"/>`;

  /* eyes */
  const eyeL = `<ellipse cx="153" cy="260" rx="21" ry="28" fill="${m.eye}" stroke="${INK}" stroke-width="3"/>
    <ellipse cx="153" cy="274" rx="14" ry="12" fill="${m.eyeL}" opacity=".75"/>
    <ellipse cx="153" cy="258" rx="9" ry="14" fill="${INK}"/>
    <circle cx="145" cy="247" r="7" fill="#fff"/><circle cx="162" cy="273" r="3.6" fill="#fff"/>
    <path d="M126 248C133 227 176 223 182 246" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
    <path d="M127 250L116 243" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
    <path d="M134 220Q153 209 172 217" fill="none" stroke="${m.hairD}" stroke-width="4.5" stroke-linecap="round"/>`;
  const eyes = both(eyeL);
  const blush = `<ellipse cx="128" cy="292" rx="16" ry="8" fill="#ff8fa8" opacity=".55"/><ellipse cx="272" cy="292" rx="16" ry="8" fill="#ff8fa8" opacity=".55"/>`;
  const nose = `<path d="M197 291Q200 295 204 292" fill="none" stroke="#d58e74" stroke-width="3" stroke-linecap="round"/>`;
  let mouth;
  if (m.mouth === 'open') mouth = `<path d="M184 304Q200 334 216 304Z" fill="#ff6f86" ${S}/><path d="M184 304L192 304L188 313Z" fill="#fff" stroke="${INK}" stroke-width="2"/>`;
  else if (m.mouth === 'smirk') mouth = `<path d="M186 308Q200 312 216 302" fill="none" ${S}/><path d="M216 302L220 296" fill="none" ${S}/>`;
  else mouth = `<path d="M186 306Q200 321 214 306" fill="none" ${S}/>`;

  /* front hair */
  let fringe;
  if (m.fringe === 'blunt') {
    fringe = `<path d="M102 218C94 120 150 84 200 84C250 84 306 120 298 218L290 204C284 178 264 170 242 172C226 176 212 176 200 173C188 176 174 176 158 172C136 170 116 178 110 204Z" fill="${m.hair}" ${S}/>`;
  } else {
    fringe = `<path d="M104 218C98 130 150 86 200 86C250 86 302 130 296 218C284 178 262 162 240 150C236 176 226 196 208 206C200 182 190 166 168 150C148 176 126 192 104 218Z" fill="${m.hair}" ${S}/>`;
  }
  fringe += `<path d="M150 112C176 100 208 100 240 112" fill="none" stroke="${m.hairL}" stroke-width="9" stroke-linecap="round" opacity=".85"/>`;
  let sides = '';
  if (m.style === 'long') sides = both(`<path d="M106 226C92 302 98 392 122 456C134 396 136 320 148 266Z" fill="${m.hair}" ${S}/>`);
  if (m.style === 'bob') sides = both(`<path d="M102 226C96 288 100 334 114 350L144 350C140 304 142 274 148 252Z" fill="${m.hair}" ${S}/>`);

  /* accessories */
  let accBack = '', accFront = '';
  if (m.acc === 'cat') accBack = both(`<path d="M116 142L116 52L192 102Z" fill="${m.hair}" ${S}/><path d="M130 118L130 80L164 100Z" fill="#ffb3d1"/>`);
  if (m.acc === 'fox') accBack = both(`<path d="M114 150L104 28L198 102Z" fill="${m.hair}" ${S}/><path d="M126 120L120 62L168 100Z" fill="#fff4e0"/><path d="M104 28L110 58L128 46Z" fill="#fff" ${S}/>`);
  if (m.acc === 'horns') accBack = both(`<path d="M134 104C108 78 106 44 140 30C132 54 142 72 164 90Z" fill="#fff0a8" ${S}/>`);
  if (m.acc === 'halo') accBack = `<ellipse cx="200" cy="56" rx="72" ry="16" fill="none" stroke="#ffd23f" stroke-width="9"/><ellipse cx="200" cy="56" rx="72" ry="16" fill="none" stroke="${INK}" stroke-width="2" opacity=".5"/>`;
  if (m.acc === 'headphones') accFront = `<path d="M102 222C92 92 308 92 298 222" fill="none" stroke="${INK}" stroke-width="15" stroke-linecap="round"/><path d="M102 222C92 92 308 92 298 222" fill="none" stroke="${m.accent}" stroke-width="7" stroke-linecap="round"/>`
    + both(`<rect x="84" y="206" width="30" height="66" rx="13" fill="${m.accent}" ${S}/><rect x="90" y="220" width="8" height="38" rx="4" fill="${INK}" opacity=".3"/>`);
  /* hair clip star for everyone but headphones, for a little personal mark */
  const mark = m.acc === 'headphones' ? '' : `<path d="M264 126l5 11 12 1-9 8 3 12-11-6-11 6 3-12-9-8 12-1z" fill="${m.accent}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`;

  const vb = opt.crop ? '60 40 280 258' : '0 0 400 520';
  return `<svg class="avatar" viewBox="${vb}" role="img" aria-label="${opt.label || (m.en + ', illustrated portrait')}" xmlns="http://www.w3.org/2000/svg">
    ${accBack.includes('ellipse cx="200" cy="56"') ? accBack : ''}${tails}${back}${body}${ears}${face}${accBack.includes('ellipse cx="200" cy="56"') ? '' : accBack}${eyes}${blush}${nose}${mouth}${sides}${fringe}${accFront}${mark}</svg>`;
}

function roundel(size = 64) {
  const arcs = [38, 32, 26, 20, 14, 8].map((r, i) =>
    `<path d="M${50 - r} 50A${r} ${r} 0 0 1 ${50 + r} 50" fill="none" stroke="${STRIPES[i]}" stroke-width="6"/>`).join('');
  return `<svg class="roundel" width="${size}" height="${size}" viewBox="0 0 100 100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="#f6f8fc" stroke="${INK}" stroke-width="6"/>${arcs}
    <rect x="2" y="44" width="96" height="16" fill="${INK}"/>
    <text x="50" y="56.5" text-anchor="middle" font-family="Big Shoulders Display, sans-serif" font-weight="900" font-size="15" letter-spacing="1.5" fill="#fff">KL</text></svg>`;
}

/* A two-car commuter set. Cast members ride in the windows. */
function trainSVG() {
  const W = 640, H = 210;
  const stripe = x0 => STRIPES.map((c, i) => `<rect x="${x0}" y="${128 + i * 5}" width="600" height="5" fill="${c}"/>`).join('');
  const windows = (x0, riders) => riders.map((m, i) => {
    const x = x0 + 40 + i * 150;
    const id = `w${x0}_${i}`;
    const inner = m
      ? `<rect x="${x}" y="46" width="130" height="78" fill="${m.bg}"/>
         <svg x="${x}" y="40" width="130" height="90" viewBox="60 40 280 258" preserveAspectRatio="xMidYMax slice">${avatarInner(m)}</svg>`
      : `<rect x="${x}" y="46" width="130" height="78" fill="#bfe9fb"/><circle cx="${x + 94}" cy="72" r="14" fill="#ffd23f"/><path d="M${x} 124L${x + 40} 92L${x + 70} 112L${x + 100} 88L${x + 130} 124Z" fill="#7fd6b3"/>`;
    return `<clipPath id="${id}"><rect x="${x}" y="46" width="130" height="78" rx="14"/></clipPath>
      <g clip-path="url(#${id})">${inner}</g>
      <rect x="${x}" y="46" width="130" height="78" rx="14" fill="none" stroke="${INK}" stroke-width="5"/>`;
  }).join('');

  const car = (x0, riders, head) => {
    const bodyPath = head
      ? `M${x0 + 10} 30Q${x0 + 10} 18 ${x0 + 30} 18H${x0 + 470}C${x0 + 550} 18 ${x0 + 600} 66 ${x0 + 614} 140V172Q${x0 + 614} 182 ${x0 + 604} 182H${x0 + 30}Q${x0 + 10} 182 ${x0 + 10} 170Z`
      : `M${x0 + 10} 30Q${x0 + 10} 18 ${x0 + 30} 18H${x0 + 594}Q${x0 + 614} 18 ${x0 + 614} 30V170Q${x0 + 614} 182 ${x0 + 594} 182H${x0 + 30}Q${x0 + 10} 182 ${x0 + 10} 170Z`;
    return `<path d="${bodyPath}" fill="#f6f8fc" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      ${stripe(x0 + 14)}
      ${windows(x0, riders)}
      ${head ? '' : `<rect x="${x0 + 580}" y="40" width="22" height="100" rx="6" fill="#dfe6f2" stroke="${INK}" stroke-width="4"/>`}
      <rect x="${x0 + 60}" y="182" width="120" height="14" rx="6" fill="${INK}"/><rect x="${x0 + 440}" y="182" width="120" height="14" rx="6" fill="${INK}"/>
      <circle cx="${x0 + 90}" cy="198" r="9" fill="${INK}"/><circle cx="${x0 + 150}" cy="198" r="9" fill="${INK}"/>
      <circle cx="${x0 + 470}" cy="198" r="9" fill="${INK}"/><circle cx="${x0 + 530}" cy="198" r="9" fill="${INK}"/>`;
  };
  const [a, b, c, d, e] = MEMBERS;
  return `<svg class="train-svg" viewBox="0 0 ${W * 2 + 20} ${H}" role="img" aria-label="A two-car train with five illustrated fans riding in its windows" xmlns="http://www.w3.org/2000/svg">
    ${car(0, [a, b, c], false)}
    <rect x="${W - 6}" y="70" width="32" height="90" rx="8" fill="#2b2862" stroke="${INK}" stroke-width="4"/>
    ${car(W + 20, [null, d, e], true)}</svg>`;
}

/* avatar body without the outer <svg> so it can nest inside a train window */
function avatarInner(m) {
  return avatar(m, { crop: true }).replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
}

/* simple 24px icon set, one stroke weight */
const ICON = {
  arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  chat: '<path d="M4 5h16v11H11l-5 4v-4H4z"/><path d="M8 10h8M8 13h5"/>',
  play: '<rect x="3" y="5" width="18" height="14" rx="4"/><path d="M10 9l5 3-5 3z"/>',
  x: '<path d="M5 5l14 14M19 5L5 19"/>',
  pin: '<path d="M12 21s-6-6-6-11a6 6 0 0 1 12 0c0 5-6 11-6 11z"/><circle cx="12" cy="10" r="2"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.500-7 10-7 10z"/>',
  clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>'
};
function icon(name, size = 22) {
  return `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[name]}</svg>`;
}

/* the event lanyard: the doorgift every guest receives */
function lanyardSVG() {
  const bars = Array.from({ length: 22 }, (_, i) => `<rect x="${88 + i * 6.2}" y="494" width="${i % 3 ? 2 : 4}" height="26" fill="${INK}"/>`).join('');
  const stripe = STRIPES.map((c, i) => `<rect x="62" y="${296 + i * 7}" width="216" height="7" fill="${c}"/>`).join('');
  return `<svg viewBox="0 0 340 600" width="100%" height="100%" preserveAspectRatio="xMidYMin meet" xmlns="http://www.w3.org/2000/svg">
    <defs><path id="sL" d="M62 -10L160 252"/><path id="sR" d="M278 -10L180 252"/></defs>
    <path d="M40 -10H86L184 262H138Z" fill="#33c6f4" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M300 -10H254L156 262H202Z" fill="#ff6048" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <rect x="144" y="244" width="52" height="30" rx="8" fill="#dfe6f2" stroke="${INK}" stroke-width="5"/>
    <rect x="62" y="274" width="216" height="258" rx="20" fill="#f6f8fc" stroke="${INK}" stroke-width="6"/>
    <rect x="152" y="262" width="36" height="18" rx="9" fill="#2b2862" stroke="${INK}" stroke-width="4"/>
    ${stripe}
    <text x="170" y="368" text-anchor="middle" font-family="Big Shoulders Display, sans-serif" font-weight="900" font-size="46" fill="${INK}">PRE-OFFKAI</text>
    <text x="170" y="392" text-anchor="middle" font-family="Zen Kaku Gothic New, sans-serif" font-weight="700" font-size="13" fill="${INK}">hololive SUPER Karaoke</text>
    <text x="170" y="440" text-anchor="middle" font-family="Big Shoulders Display, sans-serif" font-weight="900" font-size="40" fill="#ff6048">18.12.2026</text>
    <text x="170" y="466" text-anchor="middle" font-family="Zen Kaku Gothic New, sans-serif" font-weight="700" font-size="13" fill="${INK}">Millennium Ballroom</text>
    ${bars}</svg>`;
}
