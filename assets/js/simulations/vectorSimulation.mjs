// Reusable canvas simulation: 2D vector addition / decomposition (Unit 0).
// Renders a single vector defined by magnitude + angle, with its x/y
// component projections, so students can visualize SOH-CAH-TOA.

export function mountVectorSimulation(container) {
  container.innerHTML = `
    <h3>Interactive: Vector Components</h3>
    <p class="sim-readout">Drag the sliders to change the vector and watch its components update.</p>
    <canvas width="640" height="360" aria-label="Vector diagram"></canvas>
    <div class="sim-controls">
      <label>Magnitude
        <input type="range" min="10" max="150" value="100" class="mag-slider" />
      </label>
      <label>Angle (\u00b0)
        <input type="range" min="0" max="90" value="35" class="angle-slider" />
      </label>
    </div>
    <p class="sim-readout" id="vector-readout"></p>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const magSlider = container.querySelector('.mag-slider');
  const angleSlider = container.querySelector('.angle-slider');
  const readout = container.querySelector('#vector-readout');

  const originX = 80;
  const originY = canvas.height - 60;

  function draw() {
    const magnitude = Number(magSlider.value);
    const angleDeg = Number(angleSlider.value);
    const angleRad = (angleDeg * Math.PI) / 180;
    const dx = magnitude * Math.cos(angleRad);
    const dy = magnitude * Math.sin(angleRad);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // axes
    ctx.strokeStyle = '#2a3b4a';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(originX, 20);
    ctx.lineTo(originX, canvas.height - 20);
    ctx.moveTo(20, originY);
    ctx.lineTo(canvas.width - 20, originY);
    ctx.stroke();

    // x-component
    ctx.strokeStyle = '#e05a5a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + dx, originY);
    ctx.stroke();

    // y-component
    ctx.strokeStyle = '#4fb0ff';
    ctx.beginPath();
    ctx.moveTo(originX + dx, originY);
    ctx.lineTo(originX + dx, originY - dy);
    ctx.stroke();

    // resultant vector
    ctx.strokeStyle = '#e7edf3';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + dx, originY - dy);
    ctx.stroke();
    drawArrowHead(ctx, originX, originY, originX + dx, originY - dy);

    readout.textContent =
      `Magnitude = ${magnitude.toFixed(0)}, angle = ${angleDeg.toFixed(0)}\u00b0  ` +
      `\u2192  x-component = ${dx.toFixed(1)}, y-component = ${dy.toFixed(1)}`;
  }

  function drawArrowHead(context, x0, y0, x1, y1) {
    const headLength = 10;
    const angle = Math.atan2(y0 - y1, x1 - x0);
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(
      x1 - headLength * Math.cos(angle - Math.PI / 6),
      y1 + headLength * Math.sin(angle - Math.PI / 6)
    );
    context.lineTo(
      x1 - headLength * Math.cos(angle + Math.PI / 6),
      y1 + headLength * Math.sin(angle + Math.PI / 6)
    );
    context.closePath();
    context.fillStyle = '#e7edf3';
    context.fill();
  }

  magSlider.addEventListener('input', draw);
  angleSlider.addEventListener('input', draw);
  draw();
}
