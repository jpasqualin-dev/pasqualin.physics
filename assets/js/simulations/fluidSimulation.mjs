// Reusable canvas simulation: fluid pressure vs. depth (Unit 8).

export function mountFluidSimulation(container) {
  container.innerHTML = `
    <h3>Interactive: Pressure vs. Depth</h3>
    <p class="sim-readout">Drag the probe depth slider to see how pressure increases with depth.</p>
    <canvas width="640" height="320" aria-label="Fluid pressure diagram"></canvas>
    <div class="sim-controls">
      <label>Probe depth (m)
        <input type="range" min="0" max="10" step="0.1" value="4" class="depth-slider" />
      </label>
      <label>Fluid density (kg/m\u00b3)
        <input type="range" min="800" max="1400" step="10" value="1000" class="density-slider" />
      </label>
    </div>
    <p class="sim-readout" id="fluid-readout"></p>
  `;

  const canvas = container.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const depthSlider = container.querySelector('.depth-slider');
  const densitySlider = container.querySelector('.density-slider');
  const readout = container.querySelector('#fluid-readout');

  const surfaceY = 40;
  const bottomY = canvas.height - 20;
  const pxPerMeter = (bottomY - surfaceY) / 10;
  const containerLeft = 200;
  const containerRight = 440;

  function draw() {
    const depth = Number(depthSlider.value);
    const density = Number(densitySlider.value);
    const pressure = density * 9.8 * depth;
    const probeY = surfaceY + depth * pxPerMeter;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0a121a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // water
    ctx.fillStyle = '#1d4f6b';
    ctx.fillRect(containerLeft, surfaceY, containerRight - containerLeft, bottomY - surfaceY);

    // container walls
    ctx.strokeStyle = '#2a3b4a';
    ctx.strokeRect(containerLeft, surfaceY, containerRight - containerLeft, bottomY - surfaceY);

    // depth markers
    ctx.strokeStyle = '#2a3b4a55';
    ctx.fillStyle = '#9fb2c3';
    ctx.font = '11px sans-serif';
    for (let m = 0; m <= 10; m += 2) {
      const y = surfaceY + m * pxPerMeter;
      ctx.beginPath();
      ctx.moveTo(containerLeft, y);
      ctx.lineTo(containerRight, y);
      ctx.stroke();
      ctx.fillText(`${m} m`, containerRight + 8, y + 4);
    }

    // probe
    ctx.fillStyle = '#e05a5a';
    ctx.beginPath();
    ctx.arc((containerLeft + containerRight) / 2, probeY, 7, 0, Math.PI * 2);
    ctx.fill();

    // pressure bar (visual scale)
    const maxPressure = 1400 * 9.8 * 10;
    const barHeight = (pressure / maxPressure) * (bottomY - surfaceY);
    ctx.fillStyle = '#4fb0ff';
    ctx.fillRect(90, bottomY - barHeight, 40, barHeight);
    ctx.strokeStyle = '#2a3b4a';
    ctx.strokeRect(90, surfaceY, 40, bottomY - surfaceY);

    readout.textContent = `At a depth of ${depth.toFixed(1)} m in fluid of density ${density} kg/m\u00b3, gauge pressure = ${pressure.toFixed(0)} Pa`;
  }

  depthSlider.addEventListener('input', draw);
  densitySlider.addEventListener('input', draw);
  draw();
}
