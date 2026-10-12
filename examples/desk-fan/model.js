// Pure model, no DOM. Illustrative desk-fan: motor speed with first-order lag.
export function createFan(opts = {}) {
  const p = { maxRpm: 1200, tau: 0.8, oscDeg: 45, oscPeriod: 6, ...opts };
  const state = { t: 0, rpm: 0, bladeAngle: 0, oscPhase: 0, headYaw: 0 };
  const input = { on: false, speed: 0.5, oscillate: false };
  return {
    p, state, input,
    targetRpm() { return input.on ? input.speed * p.maxRpm : 0; },
    step(dt) {
      state.rpm += (this.targetRpm() - state.rpm) * (1 - Math.exp(-dt / p.tau));
      state.bladeAngle = (state.bladeAngle + state.rpm * 2 * Math.PI / 60 * dt) % (2 * Math.PI);
      if (input.oscillate && input.on) state.oscPhase += 2 * Math.PI / p.oscPeriod * dt;
      const wanted = input.oscillate ? Math.sin(state.oscPhase) * p.oscDeg * Math.PI / 180 : 0;
      state.headYaw += (wanted - state.headYaw) * (1 - Math.exp(-dt / 0.3)); // smooth return to center
      state.t += dt;
    },
    // Illustrative estimates, not measured data
    airflowM3min() { return 0.0135 * state.rpm; },   // 16 m3/min at 1200 rpm
    powerW() { return state.rpm < 1 ? 0 : 6 + 34 * Math.pow(state.rpm / p.maxRpm, 3); },
    reset() { state.t = 0; state.rpm = 0; state.bladeAngle = 0; state.oscPhase = 0; state.headYaw = 0; input.on = false; input.oscillate = false; }
  };
}
