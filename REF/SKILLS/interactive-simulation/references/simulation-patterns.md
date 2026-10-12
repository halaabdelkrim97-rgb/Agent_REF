# Simulation patterns (plain JavaScript)

## Fixed-timestep loop
```js
const DT = 1 / 120;           // model step in seconds
let acc = 0, last = performance.now();

function frame(now) {
  acc += Math.min((now - last) / 1000, 0.1); // cap after tab switches
  last = now;
  while (acc >= DT) { model.step(DT); acc -= DT; }
  view.draw(model.state, acc / DT);          // acc/DT = interpolation factor
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
```

## Model with parameters
```js
function createModel(params) {
  const state = { t: 0, x: 0, v: 0 };
  return {
    params, state,
    step(dt) {                                // semi-implicit Euler
      const a = (-params.k * state.x - params.c * state.v) / params.m;
      state.v += a * dt;
      state.x += state.v * dt;
      state.t += dt;
    },
    reset() { state.t = state.x = state.v = 0; }
  };
}
```

## Controls bound to parameters
```html
<label for="k">Stiffness k (N/m)</label>
<input id="k" type="range" min="1" max="200" step="1" value="50">
<output for="k">50</output>
```
```js
const k = document.getElementById('k');
k.addEventListener('input', () => {
  model.params.k = Number(k.value);
  k.nextElementSibling.textContent = k.value;
});
```

## Crisp canvas on any screen
```js
function fit(canvas) {
  const r = canvas.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(r.width * dpr);
  canvas.height = Math.round(r.height * dpr);
  canvas.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);
}
new ResizeObserver(() => fit(canvas)).observe(canvas);
```

## Pause when hidden
```js
document.addEventListener('visibilitychange', () => { last = performance.now(); });
```

## Rolling graph of a value
Keep a fixed-size array (ring buffer) of the last N samples, draw it as one `moveTo`/`lineTo` path per frame, and label both axes with units.

## Reference-case check
```js
// known result: undamped oscillator period T = 2*pi*sqrt(m/k)
const m = createModel({ m: 1, k: 100, c: 0 });
// run N steps, measure the period, expect |measured - T| / T < 0.01
```
