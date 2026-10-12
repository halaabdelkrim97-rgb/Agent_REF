import * as THREE from 'three';
import { OrbitControls } from './vendor/OrbitControls.js';
import { createFan } from './model.js';

const $ = (id) => document.getElementById(id);
const canvas = $('gl'), stage = $('stage');
const model = createFan();
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
} catch (e) {
  canvas.style.display = 'none'; $('fallback').style.display = 'block';
  document.querySelectorAll('.hot').forEach((h) => (h.hidden = true));
  throw e;
}
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;

// Palette: deep navy background, warm white body, cyan accent
const C = { body: 0xe8edf3, dark: 0x1c2533, accent: 0x4cc9f0, metal: 0x9aa7b8, bg: 0x101a2b };
const scene = new THREE.Scene();
scene.background = new THREE.Color(C.bg);
scene.fog = new THREE.Fog(C.bg, 3, 7);
const camera = new THREE.PerspectiveCamera(40, 16 / 10, 0.05, 30);

// Lights: hemisphere base, key with shadow, cool rim
scene.add(new THREE.HemisphereLight(0xcfe4ff, 0x1a2233, 0.9));
const key = new THREE.DirectionalLight(0xffffff, 2.2);
key.position.set(2, 3.5, 2.5); key.castShadow = true;
key.shadow.mapSize.set(1024, 1024); key.shadow.radius = 4;
Object.assign(key.shadow.camera, { left: -1, right: 1, top: 1, bottom: -1, near: 0.5, far: 10 });
scene.add(key);
const rim = new THREE.DirectionalLight(0x4cc9f0, 1.2); rim.position.set(-2.5, 1.5, -2); scene.add(rim);

// Floor
const floor = new THREE.Mesh(new THREE.CircleGeometry(10, 64),
  new THREE.MeshStandardMaterial({ color: 0x182335, roughness: 0.9, metalness: 0 }));
floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);

// Materials
const mBody = new THREE.MeshStandardMaterial({ color: C.body, roughness: 0.45, metalness: 0.05 });
const mDark = new THREE.MeshStandardMaterial({ color: C.dark, roughness: 0.6, metalness: 0.2 });
const mMetal = new THREE.MeshStandardMaterial({ color: C.metal, roughness: 0.3, metalness: 0.9 });
const mBlade = new THREE.MeshStandardMaterial({ color: C.accent, roughness: 0.35, metalness: 0.1, transparent: true, opacity: 0.95 });
const mesh = (g, m, parent, name) => { const o = new THREE.Mesh(g, m); o.castShadow = o.receiveShadow = true; o.name = name || ''; parent.add(o); return o; };

// Fan: units are meters, origin at the floor under the stem
const fan = new THREE.Group(); fan.name = 'fan'; scene.add(fan);
const base = new THREE.Group(); base.name = 'base'; fan.add(base);
mesh(new THREE.CylinderGeometry(0.15, 0.17, 0.035, 48), mBody, base, 'base-plate').position.y = 0.0175;
mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.03, 32), mDark, base, 'base-cap').position.y = 0.05;
const stem = mesh(new THREE.CylinderGeometry(0.018, 0.022, 0.38, 24), mMetal, fan, 'stem'); stem.position.y = 0.235;

const head = new THREE.Group(); head.name = 'head'; head.position.y = 0.43; fan.add(head); // yaw pivot
const motor = new THREE.Group(); motor.name = 'motor'; head.add(motor);
const housing = mesh(new THREE.CapsuleGeometry(0.06, 0.09, 8, 24), mBody, motor, 'motor-housing');
housing.rotation.x = Math.PI / 2; housing.position.z = -0.02;
mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.05, 16), mDark, motor, 'motor-neck').position.set(0, -0.07, -0.02);

const rotor = new THREE.Group(); rotor.name = 'rotor'; rotor.position.z = 0.075; head.add(rotor);
const hub = mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.03, 24), mDark, rotor, 'hub'); hub.rotation.x = Math.PI / 2;
for (let i = 0; i < 4; i++) {
  const arm = new THREE.Group(); arm.rotation.z = i * Math.PI / 2; rotor.add(arm);
  const b = mesh(new THREE.CapsuleGeometry(0.03, 0.07, 4, 16), mBlade, arm, 'blade'); // rounded blade
  b.scale.set(1, 1, 0.12); b.rotation.z = Math.PI / 2; b.position.set(0.085, 0, 0); b.rotation.x = 0.35; // pitch
}
// Cage: two rings and spokes
const cage = new THREE.Group(); cage.name = 'cage'; head.add(cage);
for (const z of [0.07, 0.12]) {
  const r = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.004, 8, 64), mMetal); r.position.z = z; r.castShadow = true; cage.add(r);
}
const spokeGeo = new THREE.CylinderGeometry(0.0025, 0.0025, 0.2, 6);
for (let i = 0; i < 12; i++) {
  const s = new THREE.Mesh(spokeGeo, mMetal); s.castShadow = false;
  const a = i / 12 * Math.PI * 2;
  s.rotation.z = a - Math.PI / 2; s.position.set(Math.cos(a) * 0.1, Math.sin(a) * 0.1, 0.12); cage.add(s);
}

// Camera views (named) with eased moves
const VIEWS = {
  front: { pos: [0.15, 0.62, 1.35], tgt: [0, 0.3, 0] },
  side: { pos: [1.2, 0.6, 0.1], tgt: [0, 0.42, 0] },
  top: { pos: [0.01, 1.6, 0.3], tgt: [0, 0.3, 0] },
  blades: { pos: [0.1, 0.55, 0.65], tgt: [0, 0.43, 0.1] },
  motor: { pos: [0.6, 0.55, -0.4], tgt: [0, 0.43, 0] },
  base: { pos: [0.6, 0.35, 0.6], tgt: [0, 0.1, 0] }
};
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; controls.minDistance = 0.4; controls.maxDistance = 3;
controls.maxPolarAngle = Math.PI * 0.49; controls.enablePan = false;
let anim = null;
function goTo(name) {
  const v = VIEWS[name]; if (!v) return;
  const to = { p: new THREE.Vector3(...v.pos), t: new THREE.Vector3(...v.tgt) };
  if (camera.aspect < 1.4) to.p.sub(to.t).multiplyScalar(1.3).add(to.t); // keep the product in frame on narrow screens
  if (reduceMotion) { camera.position.copy(to.p); controls.target.copy(to.t); controls.update(); need = true; return; }
  anim = { fp: camera.position.clone(), ft: controls.target.clone(), to, k: 0 };
}


// Hotspots
const HOT = {
  'h-blades': { obj: rotor, off: [-0.2, 0.06, 0.0], view: 'blades', text: 'Blades: four pitched blades turn with the motor. Faster rotation moves more air.' },
  'h-motor': { obj: motor, off: [0.12, 0.02, -0.1], view: 'motor', text: 'Motor: speed follows the setting with a short delay, like a real motor with inertia.' },
  'h-base': { obj: base, off: [0.2, 0.05, 0.0], view: 'base', text: 'Base: a weighted base keeps the fan stable when the head oscillates.' }
};
const v3 = new THREE.Vector3();
function placeHotspots() {
  const w = stage.clientWidth, h = stage.clientHeight;
  for (const [id, hs] of Object.entries(HOT)) {
    hs.obj.getWorldPosition(v3); v3.x += hs.off[0]; v3.y += hs.off[1]; v3.z += hs.off[2];
    v3.project(camera);
    const el = $(id), vis = v3.z < 1;
    el.style.left = ((v3.x * 0.5 + 0.5) * w) + 'px'; el.style.top = ((-v3.y * 0.5 + 0.5) * h) + 'px'; el.style.visibility = vis ? 'visible' : 'hidden';
  }
}
for (const [id, hs] of Object.entries(HOT)) $(id).addEventListener('click', () => { $('info').textContent = hs.text; goTo(hs.view); });
document.querySelectorAll('[data-view]').forEach((b) => b.addEventListener('click', () => goTo(b.dataset.view)));

// Controls -> model inputs only
function setPressed(el, v) { el.setAttribute('aria-pressed', String(v)); }
$('power').addEventListener('click', () => { model.input.on = !model.input.on; setPressed($('power'), model.input.on); need = true; });
$('osc').addEventListener('click', () => { model.input.oscillate = !model.input.oscillate; setPressed($('osc'), model.input.oscillate); need = true; });
$('speed').addEventListener('input', (e) => { model.input.speed = Number(e.target.value) / 100; $('speed-o').textContent = e.target.value + '%'; need = true; });

// Size
function resize() {
  const w = stage.clientWidth, h = stage.clientHeight;
  renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); need = true;
}
new ResizeObserver(resize).observe(stage);
controls.addEventListener('change', () => (need = true));

// Loop: fixed-step model, render only when something changes
const DT = 1 / 120; let acc = 0, last = performance.now(), need = true, onScreen = true;
new IntersectionObserver((e) => { onScreen = e[0].isIntersecting; last = performance.now(); }).observe(stage);
document.addEventListener('visibilitychange', () => { last = performance.now(); });

function frame(now) {
  requestAnimationFrame(frame);
  if (!onScreen || document.hidden) return;
  const fdt = Math.min((now - last) / 1000, 0.1); acc += fdt; last = now;
  while (acc >= DT) { model.step(DT); acc -= DT; }
  const s = model.state;
  rotor.rotation.z = s.bladeAngle; head.rotation.y = s.headYaw;
  if (anim) {
    anim.k = Math.min(1, anim.k + fdt / 0.6); // 0.6 s, independent of frame rate
     const e = 1 - Math.pow(1 - anim.k, 3);
    camera.position.lerpVectors(anim.fp, anim.to.p, e); controls.target.lerpVectors(anim.ft, anim.to.t, e);
    if (anim.k >= 1) anim = null; need = true;
  }
  const moving = s.rpm > 0.5 || Math.abs(model.targetRpm() - s.rpm) > 0.5 || Math.abs(s.headYaw) > 0.001 || model.input.oscillate;
  controls.update();
  if (moving || need) { renderer.render(scene, camera); placeHotspots(); need = false; }
  $('o-rpm').textContent = Math.round(s.rpm); $('o-air').textContent = model.airflowM3min().toFixed(1); $('o-pw').textContent = Math.round(model.powerW());
}
resize(); goTo('front');
if (anim) { camera.position.copy(anim.to.p); controls.target.copy(anim.to.t); anim = null; } // first view: no tween
controls.update(); placeHotspots();
requestAnimationFrame(frame);
window.__fan = { model, camera, renderer }; // for tests
