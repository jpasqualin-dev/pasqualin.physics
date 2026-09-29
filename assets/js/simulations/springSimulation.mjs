// Reusable canvas simulation: mass-spring oscillator (Unit 7).

export function mountSpringSimulation(container) {
  container.innerHTML = `
    <h3>Interactive: Mass-Spring Oscillator</h3>
    <p class="sim-readout">Adjust mass, spring constant, and amplitude, then press Start.</p>
    <canvas width="640" height="220" aria-label="Spring oscillator animation"></canvas>
    <div class="sim-controls">
      <label>Mass (kg)
        <input type="range" min="1" max="10" step="0.5" value="2" class="mass-slider" />
      </label>
      <label>Spring constant (N/m)
        <input type="range" min="5" max="100" step="5" value="30" class="k-slider" />
      </label>
      <label>Amplitude (m)
        <input type="range" min="0.2" max="1.5" step="0.1" value="0.8" class="amp-slider" />
      </label>
      <button type="button" class="start-btn">Start</button>
      <button type="button" class="secondary stop-btn">Stop</button>
    </div>
    <p class="sim-readout" id="spring-readout"></p>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const massSlider = container.querySelector('.mass-slider');
  const kSlider = container.querySelector('.k-slider');
  const ampSlider = container.querySelector('.amp-slider');
  const startBtn = container.querySelector('.start-btn');
  const stopBtn = container.querySelector('.stop-btn');
  const readout = container.querySelector('#spring-readout');

  const wallX = 40;
  const centerX = canvas.width / 2 + 40;
  const centerY = canvas.height / 2;
  const pxPerMeter = 100;

  let animationId = null;
  let startTime = null;

  function periodAndOmega() {
    const mass = Number(massSlider.value);
    const k = Number(kSlider.value);
    const omega = Math.sqrt(k / mass);
    const period = (2 * Math.PI) / omega;
    return { mass, k, omega, period };
  }

  function drawAt(offsetMeters) {
    const blockX = centerX + offsetMeters * pxPerMeter;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0a121a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // wall
    ctx.fillStyle = '#2a3b4a';
    ctx.fillRect(wallX - 10, centerY - 60, 10, 120);

    // spring (zig-zag)
    ctx.strokeStyle = '#9fb2c3';
    ctx.beginPath();
    ctx.moveTo(wallX, centerY);
    const coils = 12;
    const segment = (blockX - wallX) / coils;
    for (let i = 1; i < coils; i++) {
      const x = wallX + i * segment;
      const y = centerY + (i % 2 === 0 ? 12 : -12);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(blockX, centerY);
    ctx.stroke();

    // block
    ctx.fillStyle = '#4fb0ff';
    ctx.fillRect(blockX, centerY - 25, 50, 50);
  }

  function stop() {
    if (animationId) cancelAnimationFrame(animationId);
    animationId = null;
    startTime = null;
  }

  function tick(timestamp) {
    if (startTime === null) startTime = timestamp;
    const elapsed = (timestamp - startTime) / 1000;
    const { omega, period } = periodAndOmega();
    const amplitude = Number(ampSlider.value);
    const offset = amplitude * Math.cos(omega * elapsed);
    drawAt(offset);
    readout.textContent = `Period T = ${period.toFixed(2)} s, angular frequency \u03c9 = ${omega.toFixed(2)} rad/s`;
    animationId = requestAnimationFrame(tick);
  }

  function start() {
    stop();
    animationId = requestAnimationFrame(tick);
  }

  massSlider.addEventListener('input', () => {
    if (!animationId) drawAt(Number(ampSlider.value));
  });
  kSlider.addEventListener('input', () => {
    if (!animationId) drawAt(Number(ampSlider.value));
  });
  ampSlider.addEventListener('input', () => {
    if (!animationId) drawAt(Number(ampSlider.value));
  });
  startBtn.addEventListener('click', start);
  stopBtn.addEventListener('click', stop);

  drawAt(Number(ampSlider.value));
}
