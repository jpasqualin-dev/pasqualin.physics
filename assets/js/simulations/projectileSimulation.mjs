// Reusable canvas simulation: projectile motion (Unit 1).

export function mountProjectileSimulation(container) {
  container.innerHTML = `
    <h3>Interactive: Projectile Motion</h3>
    <p class="sim-readout">Set the launch speed and angle, then press Launch.</p>
    <canvas width="640" height="360" aria-label="Projectile motion animation"></canvas>
    <div class="sim-controls">
      <label>Launch speed (m/s)
        <input type="range" min="5" max="40" value="20" class="speed-slider" />
      </label>
      <label>Angle (\u00b0)
        <input type="range" min="10" max="80" value="45" class="angle-slider" />
      </label>
      <button type="button" class="launch-btn">Launch</button>
    </div>
    <p class="sim-readout" id="projectile-readout"></p>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const speedSlider = container.querySelector('.speed-slider');
  const angleSlider = container.querySelector('.angle-slider');
  const launchBtn = container.querySelector('.launch-btn');
  const readout = container.querySelector('#projectile-readout');

  const g = 9.8;
  const groundY = canvas.height - 30;
  const originX = 40;
  const pxPerMeter = 8;

  let animationId = null;
  let t = 0;
  let v0 = 0;
  let angleRad = 0;
  const trail = [];

  function reset() {
    if (animationId) cancelAnimationFrame(animationId);
    t = 0;
    trail.length = 0;
    v0 = Number(speedSlider.value);
    angleRad = (Number(angleSlider.value) * Math.PI) / 180;
    drawScene(originX, groundY);
    const range = (v0 * v0 * Math.sin(2 * angleRad)) / g;
    const timeOfFlight = (2 * v0 * Math.sin(angleRad)) / g;
    const maxHeight = (v0 * v0 * Math.sin(angleRad) * Math.sin(angleRad)) / (2 * g);
    readout.textContent =
      `Predicted range = ${range.toFixed(1)} m, time of flight = ${timeOfFlight.toFixed(1)} s, ` +
      `max height = ${maxHeight.toFixed(1)} m`;
  }

  function drawScene(x, y) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0a121a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#2a3b4a';
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(canvas.width, groundY);
    ctx.stroke();

    ctx.strokeStyle = '#4fb0ff88';
    ctx.beginPath();
    trail.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.stroke();

    ctx.fillStyle = '#4fb0ff';
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fill();
  }

  function step() {
    t += 1 / 60;
    const x = originX + v0 * Math.cos(angleRad) * t * pxPerMeter;
    const y = groundY - (v0 * Math.sin(angleRad) * t - 0.5 * g * t * t) * pxPerMeter;

    if (y >= groundY || x >= canvas.width) {
      drawScene(Math.min(x, canvas.width), groundY);
      return;
    }

    trail.push({ x, y });
    drawScene(x, y);
    animationId = requestAnimationFrame(step);
  }

  function launch() {
    reset();
    animationId = requestAnimationFrame(step);
  }

  speedSlider.addEventListener('input', reset);
  angleSlider.addEventListener('input', reset);
  launchBtn.addEventListener('click', launch);

  reset();
}
