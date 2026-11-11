/**
 * Falling Lavender Petals Animation Canvas
 * Creates delicate floating floral petals across the invitation
 */
(function() {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let petals = [];

  const PETAL_COUNT = 24;
  const PETAL_COLORS = [
    'rgba(187, 166, 210, 0.65)', // Soft lavender
    'rgba(157, 132, 183, 0.6)',  // Medium lilac
    'rgba(215, 198, 230, 0.55)', // Light violet
    'rgba(235, 225, 245, 0.5)',  // Pale lavender white
    'rgba(197, 160, 89, 0.45)'   // Subtle gold dust
  ];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20;
      this.size = Math.random() * 8 + 6;
      this.speedX = (Math.random() - 0.5) * 1.2;
      this.speedY = Math.random() * 0.9 + 0.6;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 1.5;
      this.color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
      this.oscillationSpeed = Math.random() * 0.02 + 0.01;
      this.oscillationDistance = Math.random() * 1.5 + 0.5;
      this.oscillationStep = Math.random() * Math.PI * 2;
    }

    update() {
      this.oscillationStep += this.oscillationSpeed;
      this.x += this.speedX + Math.sin(this.oscillationStep) * this.oscillationDistance;
      this.y += this.speedY;
      this.rotation += this.rotationSpeed;

      if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);

      ctx.fillStyle = this.color;
      ctx.beginPath();
      // Draw organic petal shape
      ctx.moveTo(0, -this.size);
      ctx.bezierCurveTo(this.size * 0.8, -this.size * 0.5, this.size * 0.8, this.size * 0.5, 0, this.size);
      ctx.bezierCurveTo(-this.size * 0.8, this.size * 0.5, -this.size * 0.8, -this.size * 0.5, 0, -this.size);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    }
  }

  function init() {
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < PETAL_COUNT; i++) {
      petals.push(new Petal());
    }
    animate();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < petals.length; i++) {
      petals[i].update();
      petals[i].draw();
    }
    requestAnimationFrame(animate);
  }

  // Start after DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
