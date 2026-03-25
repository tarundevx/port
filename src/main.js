import './style.css';

// Custom Cursor Logic
const cursor = document.getElementById('custom-cursor');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Smoothly animate cursor using linear interpolation (lerp)
function animateCursor() {
  const dx = mouseX - cursorX;
  const dy = mouseY - cursorY;

  cursorX += dx * 0.4;
  cursorY += dy * 0.4;

  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Add hover states to interactable elements
const interactables = document.querySelectorAll('a, span, .decor');
interactables.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hovering');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovering');
  });
});

// Interactive Parallax effect for the decors on mouse move
const decors = document.querySelectorAll('.decor');
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30; // Max distance scaled
  const y = (e.clientY / window.innerHeight - 0.5) * 30;

  decors.forEach(decor => {
    // some basic interactive parallax
    let speed = 1;
    if (decor.classList.contains('polaroid')) speed = 2.5;
    if (decor.classList.contains('sticky-note')) speed = 1.5;
    if (decor.classList.contains('pencil')) speed = -1.5;

    // Smooth transform applied via CSS transition, we just set the target offset
    decor.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});

// Blur letter by letter animation for hero text
const heroTextEl = document.querySelector('.hero-text');
if (heroTextEl) {
  const textNodes = Array.from(heroTextEl.querySelectorAll('p'));

  textNodes.forEach((p, pIndex) => {
    const text = p.innerText;
    p.innerHTML = ''; // clear original text

    text.split('').forEach((char, charIndex) => {
      const span = document.createElement('span');
      span.innerText = char === ' ' ? '\u00A0' : char;
      span.classList.add('blur-char');
      // Delay factors: 0.2s base delay + 0.015s per character
      span.style.animationDelay = `${0.2 + (pIndex * 0.15) + (charIndex * 0.015)}s`;
      p.appendChild(span);
    });
  });
}

console.log('Portfolio initialized with smooth animations.');
