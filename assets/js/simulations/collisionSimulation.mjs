// Reusable canvas simulation: 1D collision of two carts (Unit 4).

export function mountCollisionSimulation(container) {
  container.innerHTML = `
    <h3>Interactive: 1D Collision</h3>
    <p class="sim-readout">Choose masses, initial velocities, and collision type, then press Run.</p>
    <canvas width="640" height="160" aria-label="Collision animation"></canvas>
    <div class="sim-controls">
      <label>Mass 1 (kg)
        <input type="range" min="1" max="10" step="0.5" value="3" class="m1-slider" />
      </label>
      <label>Velocity 1 (m/s)
        <input type="range" min="-10" max="10" step="0.5" value="4" class="v1-slider" />
      </label>
      <label>Mass 2 (kg)
        <input type="range" min="1" max="10" step="0.5" value="3" class="m2-slider" />
      </label>
      <label>Velocity 2 (m/s)
        <input type="range" min="-10" max="10" step="0.5" value="-2" class="v2-slider" />
      </label>
      <label>Type
        <select class="type-select">
          <option value="inelastic">Perfectly inelastic (stick together)</option>
          <option value="elastic">Elastic</option>
        </select>
      </label>
      <button type="button" class="run-btn">Run</button>
    </div>
    <p class="sim-readout" id="collision-readout"></p>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const m1Slider = container.querySelector('.m1-slider');
  const v1Slider = container.querySelector('.v1-slider');
  const m2Slider = container.querySelector('.m2-slider');
  const v2Slider = container.querySelector('.v2-slider');
  const typeSelect = container.querySelector('.type-select');
  const runBtn = container.querySelector('.run-btn');
  const readout = container.querySelector('#collision-readout');

  const pxPerMeterPerSec = 12;
  const cartY = canvas.height / 2;
  const cartSize = 30;
  let animationId = null;

  function drawCarts(x1, x2) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0a121a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#2a3b4a';
    ctx.beginPath();
    ctx.moveTo(0, cartY + cartSize / 2 + 5);
    ctx.lineTo(canvas.width, cartY + cartSize / 2 + 5);
    ctx.stroke();

    ctx.fillStyle = '#4fb0ff';
    ctx.fillRect(x1 - cartSize / 2, cartY - cartSize / 2, cartSize, cartSize);
    ctx.fillStyle = '#e05a5a';
    ctx.fillRect(x2 - cartSize / 2, cartY - cartSize / 2, cartSize, cartSize);
  }

  function stop() {
    if (animationId) cancelAnimationFrame(animationId);
    animationId = null;
  }

  function run() {
    stop();
    const m1 = Number(m1Slider.value);
    const v1 = Number(v1Slider.value);
    const m2 = Number(m2Slider.value);
    const v2 = Number(v2Slider.value);
    const type = typeSelect.value;

    let x1 = 150;
    let x2 = 450;
    let hasCollided = false;
    let finalV1 = v1;
    let finalV2 = v2;
    let vf = 0;

    if (type === 'inelastic') {
      vf = (m1 * v1 + m2 * v2) / (m1 + m2);
    } else {
      finalV1 = ((m1 - m2) / (m1 + m2)) * v1 + ((2 * m2) / (m1 + m2)) * v2;
      finalV2 = ((2 * m1) / (m1 + m2)) * v1 + ((m2 - m1) / (m1 + m2)) * v2;
    }

    let currentV1 = v1;
    let currentV2 = v2;

    function step() {
      if (!hasCollided && x2 - x1 <= cartSize + 4) {
        hasCollided = true;
        if (type === 'inelastic') {
          currentV1 = vf;
          currentV2 = vf;
        } else {
          currentV1 = finalV1;
          currentV2 = finalV2;
        }
      }

      x1 += (currentV1 * pxPerMeterPerSec) / 60;
      x2 += (currentV2 * pxPerMeterPerSec) / 60;

      drawCarts(x1, x2);

      if (x1 > 20 && x1 < canvas.width - 20 && x2 > 20 && x2 < canvas.width - 20) {
        animationId = requestAnimationFrame(step);
      } else {
        readout.textContent =
          type === 'inelastic'
            ? `After sticking together, both carts move at ${vf.toFixed(2)} m/s.`
            : `After the elastic collision: cart 1 = ${finalV1.toFixed(2)} m/s, cart 2 = ${finalV2.toFixed(2)} m/s.`;
      }
    }

    drawCarts(x1, x2);
    animationId = requestAnimationFrame(step);
  }

  runBtn.addEventListener('click', run);
  drawCarts(150, 450);
}
