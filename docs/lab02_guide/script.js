window.addEventListener("load", () => {
  const canvas = document.getElementById("logoCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  let x = 0;
  const radius = 14;

  function drawBackground() {
    const gradient = ctx.createLinearGradient(0, 0, W, H);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0.2)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, W, H);
  }

  function drawText() {
    ctx.font = "bold 26px system-ui, sans-serif";
    ctx.fillStyle = "#c15500";
    ctx.fillText("KKU Guide", 16, 36);

    ctx.font = "12px system-ui, sans-serif";
    ctx.fillStyle = "#9c4b00";
    ctx.fillText("Campus Navigation & Places", 16, 54);
  }

  function drawCircle() {
    ctx.beginPath();
    ctx.arc(x, H - 22, radius, 0, Math.PI * 2);
    ctx.fillStyle = "#004c8c";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, H - 22, radius - 5, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);

    drawBackground();
    drawText();
    drawCircle();

    x += 2;
    if (x - radius > W) {
      x = -radius;
    }

    requestAnimationFrame(animate);
  }

  animate();
});
