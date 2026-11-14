/* Click sparks: a few random music notes fly out from the pointer. */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const NOTES = ['♪', '♫', '♩', '♬', '𝄞'];
  const COLORS = ['#28dcff', '#ff4fa0', '#b997ff', '#ffffff', '#ffe14a'];
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const layer = document.createElement('div');
  layer.setAttribute('aria-hidden', 'true');
  layer.style.cssText = 'position:fixed;inset:0;z-index:9999;pointer-events:none;overflow:hidden';
  document.body.appendChild(layer);

  function burst(x, y) {
    const n = 5 + Math.floor(Math.random() * 4);
    for (let i = 0; i < n; i++) {
      const el = document.createElement('span');
      const size = 18 + Math.random() * 18;
      el.textContent = pick(NOTES);
      el.style.cssText = `position:absolute;left:${x}px;top:${y}px;font:900 ${size}px/1 "Zen Kaku Gothic New",Montserrat,sans-serif;color:${pick(COLORS)};` +
        'text-shadow:1.5px 1.5px 0 #101014,-1.5px -1.5px 0 #101014,1.5px -1.5px 0 #101014,-1.5px 1.5px 0 #101014,3px 3px 0 #101014;will-change:transform,opacity;margin:-.5em 0 0 -.4em';
      layer.appendChild(el);
      const ang = Math.random() * Math.PI * 2, dist = 40 + Math.random() * 70;
      const dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist - 24;
      const rot = (Math.random() - .5) * 90;
      el.animate([
        { transform: 'translate(0,0) scale(.3) rotate(0deg)', opacity: 1 },
        { transform: `translate(${dx * .6}px,${dy * .6}px) scale(1.1) rotate(${rot * .6}deg)`, opacity: 1, offset: .45 },
        { transform: `translate(${dx}px,${dy + 36}px) scale(.8) rotate(${rot}deg)`, opacity: 0 }
      ], { duration: 650 + Math.random() * 300, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'forwards' }).onfinish = () => el.remove();
    }
  }
  addEventListener('pointerdown', e => { if (e.button === 0 || e.pointerType !== 'mouse') burst(e.clientX, e.clientY); }, { passive: true, capture: true });
})();
