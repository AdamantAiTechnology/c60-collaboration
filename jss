/**
 * SOULC60 — Main JavaScript
 * Handles: C60 particle canvas, molecule animation,
 *          scroll reveals, slider, counter, navbar, form
 */

'use strict';

/* ─── NAVBAR ──────────────────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const burger = document.getElementById('burger');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    burger.classList.toggle('active');
    // Animate burger → X
    const spans = burger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
})();


/* ─── HERO CANVAS (Particle C60 atmosphere) ──────────────── */
(function initHeroCanvas() {
  const canvas = document.getElementById('c60-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [], nodes = [], connections = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', () => { resize(); buildScene(); });
  resize();

  // C60-like structure nodes
  function buildScene() {
    nodes = [];
    connections = [];
    particles = [];

    const cx = W * 0.72, cy = H * 0.5;
    const R = Math.min(W, H) * 0.22;

    // Icosahedral-ish 60-atom approximation (two rings + top/bottom caps)
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const lat = (i % 2 === 0) ? 0.4 : -0.4;
      nodes.push({
        x: cx + R * Math.cos(angle) * Math.cos(lat),
        y: cy + R * Math.sin(lat) * 1.6,
        z: R * Math.sin(angle) * Math.cos(lat),
        r: 2 + Math.random() * 1.5,
        baseX: cx, baseY: cy,
        angle, lat, phase: Math.random() * Math.PI * 2
      });
    }

    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      const lat = (i % 2 === 0) ? 0.9 : -0.9;
      nodes.push({
        x: cx + R * Math.cos(angle) * Math.cos(lat),
        y: cy + R * Math.sin(lat) * 1.4,
        z: R * Math.sin(angle) * Math.cos(lat),
        r: 2.5,
        baseX: cx, baseY: cy,
        angle, lat, phase: Math.random() * Math.PI * 2
      });
    }

    // Connections between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < R * 0.7) {
          connections.push([i, j]);
        }
      }
    }

    // Ambient particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.3 + 0.05,
        pulse: Math.random() * Math.PI * 2
      });
    }
  }

  buildScene();

  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 0.006;

    // Rotate molecule
    const rotSpeed = t * 0.3;

    // Draw connections
    ctx.lineWidth = 0.6;
    connections.forEach(([i, j]) => {
      const ni = nodes[i], nj = nodes[j];
      const xi = ni.baseX + Math.cos(ni.angle + rotSpeed) * Math.cos(ni.lat) * Math.min(W,H) * 0.22;
      const yi = ni.baseY + Math.sin(ni.lat) * Math.min(W,H) * 0.33 + Math.sin(t + ni.phase) * 4;
      const xj = nj.baseX + Math.cos(nj.angle + rotSpeed) * Math.cos(nj.lat) * Math.min(W,H) * 0.22;
      const yj = nj.baseY + Math.sin(nj.lat) * Math.min(W,H) * 0.33 + Math.sin(t + nj.phase) * 4;

      const grad = ctx.createLinearGradient(xi, yi, xj, yj);
      grad.addColorStop(0, 'rgba(201,168,76,0.15)');
      grad.addColorStop(0.5, 'rgba(201,168,76,0.28)');
      grad.addColorStop(1, 'rgba(201,168,76,0.15)');
      ctx.strokeStyle = grad;
      ctx.beginPath();
      ctx.moveTo(xi, yi);
      ctx.lineTo(xj, yj);
      ctx.stroke();
    });

    // Draw nodes
    nodes.forEach(n => {
      const R = Math.min(W,H) * 0.22;
      const nx = n.baseX + Math.cos(n.angle + rotSpeed) * Math.cos(n.lat) * R;
      const ny = n.baseY + Math.sin(n.lat) * R * 1.5 + Math.sin(t + n.phase) * 5;

      const glow = ctx.createRadialGradient(nx, ny, 0, nx, ny, n.r * 4);
      glow.addColorStop(0, 'rgba(201,168,76,0.7)');
      glow.addColorStop(0.4, 'rgba(201,168,76,0.25)');
      glow.addColorStop(1, 'rgba(201,168,76,0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(nx, ny, n.r * 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(201,168,76,0.85)';
      ctx.beginPath();
      ctx.arc(nx, ny, n.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // Ambient particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += 0.02;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      const a = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));
      ctx.fillStyle = `rgba(201,168,76,${a})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();
})();


/* ─── MOLECULE CANVAS (Experience section) ───────────────── */
(function initMolCanvas() {
  const canvas = document.getElementById('mol-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const cx = W / 2, cy = H / 2;

  // Build a simplified C60 wireframe
  const R = 140;
  const atoms = [];
  const bonds = [];

  // Pentagon positions (12 pentagons of C60 approximated)
  const phi = (1 + Math.sqrt(5)) / 2;
  const ico = [
    [0, 1, phi], [0, -1, phi], [0, 1, -phi], [0, -1, -phi],
    [1, phi, 0], [-1, phi, 0], [1, -phi, 0], [-1, -phi, 0],
    [phi, 0, 1], [-phi, 0, 1], [phi, 0, -1], [-phi, 0, -1]
  ];

  // Normalize and scale
  ico.forEach(v => {
    const len = Math.sqrt(v[0]**2 + v[1]**2 + v[2]**2);
    atoms.push({ x: v[0]/len * R, y: v[1]/len * R, z: v[2]/len * R });
  });

  // Add edge midpoints for hexagons
  const extraAtoms = [];
  for (let i = 0; i < atoms.length; i++) {
    for (let j = i + 1; j < atoms.length; j++) {
      const dx = atoms[i].x - atoms[j].x;
      const dy = atoms[i].y - atoms[j].y;
      const dz = atoms[i].z - atoms[j].z;
      const d = Math.sqrt(dx*dx + dy*dy + dz*dz);
      if (d < R * 1.05) {
        bonds.push([i, j]);
        const mx = (atoms[i].x + atoms[j].x) / 2;
        const my = (atoms[i].y + atoms[j].y) / 2;
        const mz = (atoms[i].z + atoms[j].z) / 2;
        const mlen = Math.sqrt(mx*mx + my*my + mz*mz);
        extraAtoms.push({ x: mx/mlen*R, y: my/mlen*R, z: mz/mlen*R });
      }
    }
  }

  const allAtoms = [...atoms, ...extraAtoms];

  let t = 0;
  function drawMol() {
    ctx.clearRect(0, 0, W, H);
    t += 0.008;

    const cosY = Math.cos(t), sinY = Math.sin(t);
    const cosX = Math.cos(t * 0.4), sinX = Math.sin(t * 0.4);

    function rotateAtom(a) {
      // Rotate Y
      const x1 = a.x * cosY - a.z * sinY;
      const z1 = a.x * sinY + a.z * cosY;
      // Rotate X
      const y2 = a.y * cosX - z1 * sinX;
      const z2 = a.y * sinX + z1 * cosX;
      return { x: cx + x1, y: cy + y2, z: z2 };
    }

    const projected = allAtoms.map(rotateAtom);

    // Sort by z for depth
    const indexedAtoms = projected.map((p, i) => ({ ...p, i }))
      .sort((a, b) => a.z - b.z);

    // Draw bonds first
    bonds.forEach(([i, j]) => {
      const pi = projected[i], pj = projected[j];
      const avgZ = (pi.z + pj.z) / 2;
      const depthAlpha = ((avgZ / R) + 1) * 0.5;
      const alpha = 0.08 + depthAlpha * 0.22;

      ctx.beginPath();
      ctx.moveTo(pi.x, pi.y);
      ctx.lineTo(pj.x, pj.y);
      ctx.strokeStyle = `rgba(201,168,76,${alpha})`;
      ctx.lineWidth = 0.8 + depthAlpha * 0.6;
      ctx.stroke();
    });

    // Draw atoms
    indexedAtoms.forEach(({ x, y, z, i }) => {
      if (i >= atoms.length) return; // skip midpoints
      const depthAlpha = ((z / R) + 1) * 0.5;
      const r = 2.5 + depthAlpha * 2;
      const alpha = 0.3 + depthAlpha * 0.7;

      const grd = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
      grd.addColorStop(0, `rgba(201,168,76,${alpha})`);
      grd.addColorStop(1, 'rgba(201,168,76,0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(x, y, r * 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(232,201,106,${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(drawMol);
  }

  drawMol();
})();


/* ─── CTA CANVAS (subtle particle field) ─────────────────── */
(function initCtaCanvas() {
  const canvas = document.getElementById('cta-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 50; i++) {
    pts.push({
      x: Math.random() * 1200,
      y: Math.random() * 800,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.2 + 0.05
    });
  }

  function drawCta() {
    ctx.clearRect(0, 0, W, H);

    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.fillStyle = `rgba(201,168,76,${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // Connect nearby points
    for (let i = 0; i < pts.length; i++) {
      for (let j = i+1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 120) {
          ctx.strokeStyle = `rgba(201,168,76,${0.06 * (1 - d/120)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawCta);
  }
  drawCta();
})();


/* ─── SCROLL REVEAL ───────────────────────────────────────── */
(function initReveal() {
  const elements = document.querySelectorAll(
    '.essence-card, .benefit-card, .timeline-item, .program-card, .exp-step, .number-item, .testimonial-card'
  );

  elements.forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('reveal-delay-1');
    if (i % 3 === 2) el.classList.add('reveal-delay-2');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
})();


/* ─── COUNTER ANIMATION ───────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.number-val');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      let current = 0;
      const duration = 1800;
      const step = target / (duration / 16);

      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current);
        if (current >= target) {
          el.textContent = target;
          clearInterval(timer);
        }
      }, 16);

      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));
})();


/* ─── TESTIMONIAL SLIDER ──────────────────────────────────── */
(function initSlider() {
  const track = document.getElementById('testimonial-track');
  const dotsContainer = document.getElementById('slider-dots');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  if (!track) return;

  const cards = track.querySelectorAll('.testimonial-card');
  const visibleCount = window.innerWidth < 768 ? 1 : 2;
  const total = cards.length;
  const maxIndex = total - visibleCount;
  let current = 0;
  let autoTimer;

  // Build dots
  const dotsCount = maxIndex + 1;
  for (let i = 0; i < dotsCount; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(idx, maxIndex));
    const cardWidth = cards[0].offsetWidth + 24; // gap = 1.5rem ≈ 24px
    track.style.transform = `translateX(-${current * cardWidth}px)`;
    dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  function autoPlay() {
    autoTimer = setInterval(() => {
      goTo(current < maxIndex ? current + 1 : 0);
    }, 5000);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    autoPlay();
  }

  autoPlay();

  window.addEventListener('resize', () => {
    track.style.transform = 'translateX(0)';
    current = 0;
  });
})();


/* ─── SMOOTH ANCHOR SCROLL ────────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ─── CONTACT FORM ────────────────────────────────────────── */
(function initForm() {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<span>Отправляем...</span>';

    // Simulate async submission
    setTimeout(() => {
      form.style.opacity = '0';
      form.style.transform = 'translateY(10px)';
      form.style.transition = '0.4s ease';
      setTimeout(() => {
        form.style.display = 'none';
        success.style.display = 'block';
      }, 400);
    }, 1400);
  });
})();


/* ─── MOLECULE ORB HOVER (card micro-interaction) ────────── */
(function initCardGlow() {
  document.querySelectorAll('.essence-card, .benefit-card, .program-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
      card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(201,168,76,0.06) 0%, transparent 60%), var(--bg-card)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });
})();
