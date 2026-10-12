// Pure model: no DOM. SI units.
export function createModel(params) {
  const state = { t: 0, x: params.x0, v: 0 };
  return {
    params, state,
    step(dt) { // semi-implicit Euler
      const a = (-params.k * state.x - params.c * state.v) / params.m;
      state.v += a * dt;
      state.x += state.v * dt;
      state.t += dt;
    },
    reset() { state.t = 0; state.x = params.x0; state.v = 0; },
    zeta() { return params.c / (2 * Math.sqrt(params.k * params.m)); },
    regime() {
      const z = this.zeta();
      if (params.c === 0) return 'undamped';
      if (Math.abs(z - 1) < 0.02) return 'critical';
      return z < 1 ? 'underdamped' : 'overdamped';
    }
  };
}
