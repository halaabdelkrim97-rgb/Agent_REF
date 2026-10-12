import { createModel } from './model.js';

const DT = 1 / 240;
const params = { m: 1, k: 100, c: 2, x0: 0.5 };
const model = createModel(params);
const $ = (id) => document.getElementById(id);
const scene = $('scene'), graph = $('graph');
const sctx = scene.getContext('2d'), gctx = graph.getContext('2d');
const history = []; const HISTORY_S = 6; let sampleAcc = 0;
let running = true, acc = 0, last = performance.now();
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduceMotion) { running = false; $('play').textContent = 'Play'; }

function fit(canvas, ctx) {
  const r = canvas.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
  canvas.width = Math.max(1, Math.round(r.width * dpr));
  canvas.height = Math.max(1, Math.round(r.height * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
function fitAll() { fit(scene, sctx); fit(graph, gctx); draw(); }
new ResizeObserver(fitAll).observe(scene);
new ResizeObserver(fitAll).observe(graph);

function bind(id, key, fmt) {
  const el = $(id), out = $(id + '-o');
  const apply = () => {
    params[key] = Number(el.value);
    out.textContent = fmt(params[key]);
    if (key === 'x0') { model.reset(); history.length = 0; }
  };
  el.addEventListener('input', apply); apply();
}
bind('m', 'm', (v) => v.toFixed(1) + ' kg');
bind('k', 'k', (v) => v.toFixed(0) + ' N/m');
bind('c', 'c', (v) => v.toFixed(1) + ' N·s/m');
bind('x0', 'x0', (v) => v.toFixed(2) + ' m');

function setParams(m, k, c) {
  for (const [id, key, v] of [['m','m',m],['k','k',k],['c','c',c]]) {
    $(id).value = v; $(id).dispatchEvent(new Event('input'));
  }
  model.reset(); history.length = 0;
}
$('reset').addEventListener('click', () => { model.reset(); history.length = 0; draw(); });
$('play').addEventListener('click', () => {
  running = !running; $('play').textContent = running ? 'Pause' : 'Play'; last = performance.now();
});
$('p1').addEventListener('click', () => setParams(1, 100, 2));
$('p2').addEventListener('click', () => setParams(1, 100, 20));   // zeta = 1
$('p3').addEventListener('click', () => setParams(1, 100, 40));

function draw() {
  const w = scene.clientWidth, h = scene.clientHeight;
  sctx.clearRect(0, 0, w, h);
  const wallX = 20, midX = w / 2, scale = Math.min(w, 600) / 4; // 1 m = scale px
  const bx = midX + model.state.x * scale, bw = 40, by = h / 2;
  sctx.strokeStyle = '#64748b'; sctx.lineWidth = 3;
  sctx.beginPath(); sctx.moveTo(wallX, 20); sctx.lineTo(wallX, h - 20); sctx.stroke();
  // spring zigzag
  sctx.strokeStyle = '#38bdf8'; sctx.beginPath(); sctx.moveTo(wallX, by);
  const x1 = bx - bw / 2, coils = 10;
  for (let i = 1; i <= coils; i++) {
    const px = wallX + (x1 - wallX) * i / (coils + 1);
    sctx.lineTo(px, by + (i % 2 ? -14 : 14));
  }
  sctx.lineTo(x1, by); sctx.stroke();
  sctx.fillStyle = '#f59e0b'; sctx.fillRect(x1, by - bw / 2, bw, bw);
  sctx.strokeStyle = '#334155'; sctx.setLineDash([4, 4]);
  sctx.beginPath(); sctx.moveTo(midX, 10); sctx.lineTo(midX, h - 10); sctx.stroke(); sctx.setLineDash([]);

  const gw = graph.clientWidth, gh = graph.clientHeight;
  gctx.clearRect(0, 0, gw, gh);
  gctx.strokeStyle = '#334155'; gctx.beginPath(); gctx.moveTo(0, gh / 2); gctx.lineTo(gw, gh / 2); gctx.stroke();
  gctx.fillStyle = '#94a3b8'; gctx.font = '12px system-ui';
  gctx.fillText('x (m) vs time (last ' + HISTORY_S + ' s)', 8, 14);
  if (history.length > 1) {
    const t0 = history[history.length - 1].t - HISTORY_S;
    gctx.strokeStyle = '#38bdf8'; gctx.lineWidth = 2; gctx.beginPath();
    history.forEach((p, i) => {
      const gx = (p.t - t0) / HISTORY_S * gw, gy = gh / 2 - p.x / 1.2 * (gh / 2 - 10);
      i ? gctx.lineTo(gx, gy) : gctx.moveTo(gx, gy);
    });
    gctx.stroke();
  }
  $('o-t').textContent = model.state.t.toFixed(2);
  $('o-x').textContent = model.state.x.toFixed(3);
  $('o-v').textContent = model.state.v.toFixed(3);
  $('o-r').textContent = model.regime() + ' (ζ=' + model.zeta().toFixed(2) + ')';
}

function frame(now) {
  if (running) {
    acc += Math.min((now - last) / 1000, 0.1);
    while (acc >= DT) {
      model.step(DT); acc -= DT; sampleAcc += DT;
      if (sampleAcc >= 1 / 60) { sampleAcc = 0; history.push({ t: model.state.t, x: model.state.x });
        while (history.length && history[0].t < model.state.t - HISTORY_S) history.shift(); }
    }
  }
  last = now; draw(); requestAnimationFrame(frame);
}
document.addEventListener('visibilitychange', () => { last = performance.now(); });
fitAll(); requestAnimationFrame(frame);
