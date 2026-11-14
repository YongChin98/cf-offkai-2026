/* Horizontal scroll engine. Standalone on purpose: it loads first and depends on nothing else,
   so an error in the art or UI scripts can never break scrolling. */
(function () {
  var view = document.getElementById('stage');
  if (!view) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var target = 0, cur = 0, raf = 0, drag = null;

  /* phones (matches the CSS breakpoint): native vertical scrolling, this engine only helps the nav jump */
  function vert() { return window.matchMedia && matchMedia('(max-width: 800px)').matches; }
  function maxX() { return vert() ? Math.max(0, view.scrollHeight - view.clientHeight) : Math.max(0, view.scrollWidth - view.clientWidth); }
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }

  function tick() {
    cur += (target - cur) * 0.13;
    if (Math.abs(target - cur) < 0.5) { cur = target; raf = 0; }
    view.scrollLeft = cur;
    if (raf) raf = requestAnimationFrame(tick);
  }
  function go(x) {
    if (vert()) { view.scrollTo({ top: clamp(x, 0, maxX()), behavior: reduce ? 'auto' : 'smooth' }); return; }
    target = clamp(x, 0, maxX());
    if (reduce) { view.scrollLeft = target; return; }
    if (!raf) { cur = view.scrollLeft; raf = requestAnimationFrame(tick); }
  }
  function base() { return raf ? target : view.scrollLeft; }

  /* wheel anywhere on the page (rail, route bar and stage alike) moves the line sideways */
  window.addEventListener('wheel', function (e) {
    if (e.ctrlKey || e.defaultPrevented || vert()) return;
    var d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (e.deltaMode === 1) d *= 32;
    else if (e.deltaMode === 2) d *= view.clientWidth;
    e.preventDefault();
    go(base() + d * 1.1);
  }, { passive: false });

  /* mouse drag; touch keeps native sideways panning */
  view.addEventListener('pointerdown', function (e) {
    if (vert() || e.pointerType !== 'mouse' || e.button !== 0 || e.target.closest('a, button')) return;
    drag = { x: e.clientX, s: view.scrollLeft, moved: false };
  });
  window.addEventListener('pointermove', function (e) {
    if (!drag) return;
    var dx = e.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) > 5) { drag.moved = true; view.classList.add('dragging'); }
    if (drag.moved) go(drag.s - dx * 1.4);
  });
  window.addEventListener('pointerup', function () { drag = null; view.classList.remove('dragging'); });

  window.addEventListener('keydown', function (e) {
    if (vert() || (e.target.closest && e.target.closest('input, textarea'))) return;
    var k = e.key, step = window.innerWidth * 0.4;
    if (k === 'ArrowRight') { go(base() + step); e.preventDefault(); }
    else if (k === 'ArrowLeft') { go(base() - step); e.preventDefault(); }
    else if (k === 'PageDown' || k === 'ArrowDown') { go(base() + view.clientWidth * 0.8); e.preventDefault(); }
    else if (k === 'PageUp' || k === 'ArrowUp') { go(base() - view.clientWidth * 0.8); e.preventDefault(); }
    else if (k === 'Home') { go(0); e.preventDefault(); }
    else if (k === 'End') { go(maxX()); e.preventDefault(); }
  });

  /* native scrolling (touch, trackpad, scrollbar) keeps the eased target in sync */
  view.addEventListener('scroll', function () { if (!raf) { cur = target = view.scrollLeft; } }, { passive: true });

  window.lineScroll = { go: go, view: view, max: maxX };
})();
