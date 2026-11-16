const openBtn = document.getElementById('open-btn');
const introScreen = document.getElementById('intro-screen');
const mainContent = document.getElementById('main-content');
const celebrateBtn = document.getElementById('celebrate-btn');
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Confetti Engine
let particles = [];
const colors = ['#ff477e', '#ffd166', '#06d6a0', '#118ab2', '#a1c4fd', '#ff85a1'];

function createConfetti(count = 120) {
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 3 + 2,
      speedX: Math.random() * 2 - 1,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 6 - 3
    });
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, index) => {
    p.y += p.speedY;
    p.x += p.speedX;
    p.rotation += p.rotationSpeed;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();

    if (p.y > canvas.height) {
      particles.splice(index, 1);
    }
  });

  requestAnimationFrame(animateConfetti);
}

animateConfetti();

// Open Gift Interaction
openBtn.addEventListener('click', () => {
  introScreen.style.display = 'none';
  mainContent.classList.remove('hidden');
  mainContent.style.opacity = '1';
  createConfetti(150);
});

// Extra Confetti Button
celebrateBtn.addEventListener('click', () => {
  createConfetti(100);
});