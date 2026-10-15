import React, { useEffect, useRef, useState } from "react";
import "./PerfumeLoader.css";

export default function PerfumeLoader({ onFinish, duration = 7500 }) {
  const [finished, setFinished] = useState(false);
  const [typed, setTyped] = useState("");
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("PREPARING YOUR EXPERIENCE");
  const [capOpen, setCapOpen] = useState(false);

  const canvasRef = useRef(null);
  const loaderRef = useRef(null);
  const perfumeRef = useRef(null);
  const nozzleRef = useRef(null);

  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const sprayTimerRef = useRef(null);
  const burstTimerRef = useRef(null);
  const lastFrameRef = useRef(0);
  const completedRef = useRef(false);

  /* =========================
     CANVAS RESIZE
  ========================= */
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const loader = loaderRef.current;
    if (!canvas || !loader) return;

    const rect = loader.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  /* =========================
     NOZZLE POSITION
  ========================= */
  const getNozzlePosition = () => {
    const nozzle = nozzleRef.current;
    const canvas = canvasRef.current;
    if (!nozzle || !canvas) return { x: 0, y: 0 };

    const nozzleRect = nozzle.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();

    return {
      x: nozzleRect.right - canvasRect.left,
      y: nozzleRect.top + nozzleRect.height / 2 - canvasRect.top,
    };
  };

  /* =========================
     CREATE PARTICLE
  ========================= */
  const createParticle = () => {
    const origin = getNozzlePosition();
    particlesRef.current.push({
      x: origin.x,
      y: origin.y + (Math.random() - 0.5) * 5,
      vx: 3 + Math.random() * 5,
      vy: (Math.random() - 0.5) * 2,
      size: 1.5 + Math.random() * 3.5,
      life: 0,
      maxLife: 40 + Math.random() * 40,
      alpha: 0.3 + Math.random() * 0.45,
      drift: (Math.random() - 0.5) * 0.12,
    });
  };

  /* =========================
     SPRAY BURST
  ========================= */
  const sprayBurst = () => {
    let count = 0;
    clearInterval(burstTimerRef.current);
    burstTimerRef.current = setInterval(() => {
      for (let i = 0; i < 14; i++) createParticle();
      count++;
      if (count >= 25) {
        clearInterval(burstTimerRef.current);
        burstTimerRef.current = null;
      }
    }, 20);
  };

  /* =========================
     DRAW LOOP
  ========================= */
  const drawParticles = (ctx, width, height, delta) => {
    ctx.clearRect(0, 0, width, height);

    particlesRef.current = particlesRef.current.filter(
      (p) => p.life < p.maxLife && p.x < width + 100
    );

    for (const p of particlesRef.current) {
      p.life += delta;
      p.x += p.vx * delta;
      p.y += p.vy * delta;
      p.vy += p.drift * delta;

      const prog = p.life / p.maxLife;
      const fade = Math.sin(prog * Math.PI);
      const radius = p.size * (1 + prog * 3);

      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 3);
      gradient.addColorStop(0, `rgba(255, 248, 235, ${p.alpha * fade})`);
      gradient.addColorStop(0.35, `rgba(255, 213, 188, ${p.alpha * fade * 0.6})`);
      gradient.addColorStop(1, "rgba(255, 225, 200, 0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius * 3, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  /* =========================
     ANIMATION START
  ========================= */
  useEffect(() => {
    const canvas = canvasRef.current;
    const loader = loaderRef.current;
    if (!canvas || !loader) return;

    document.body.classList.add("loading");
    resizeCanvas();

    const ctx = canvas.getContext("2d");

    const animate = (time) => {
      if (completedRef.current) return;

      const delta = lastFrameRef.current
        ? Math.min((time - lastFrameRef.current) / 16.67, 2)
        : 1;
      lastFrameRef.current = time;

      const rect = loader.getBoundingClientRect();
      drawParticles(ctx, rect.width, rect.height, delta);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);

    // Typewriter
    const brand = "ÉLIXIR";
    let idx = 0;
    const typingTimer = setInterval(() => {
      if (completedRef.current) return clearInterval(typingTimer);
      setTyped(brand.slice(0, idx + 1));
      idx++;
      if (idx >= brand.length) clearInterval(typingTimer);
    }, 180);

    // Cap opens
    const capTimer = setTimeout(() => {
      if (!completedRef.current) setCapOpen(true);
    }, 1650);

    // Spray starts
    const sprayStartTimer = setTimeout(() => {
      if (completedRef.current) return;
      sprayBurst();
      setLoadingText("RELEASING THE FRAGRANCE");
      sprayTimerRef.current = setInterval(sprayBurst, 1500);
    }, 2600);

    // Progress
    const startTime = performance.now();
    let progressRaf;
    const updateProgress = (now) => {
      if (completedRef.current) return;
      const elapsed = now - startTime;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 2);
      setProgress(eased * 100);
      if (p < 1) progressRaf = requestAnimationFrame(updateProgress);
      else finishLoader();
    };
    progressRaf = requestAnimationFrame(updateProgress);

    // Events
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      clearInterval(typingTimer);
      clearInterval(sprayTimerRef.current);
      clearInterval(burstTimerRef.current);
      clearTimeout(capTimer);
      clearTimeout(sprayStartTimer);
      cancelAnimationFrame(animationRef.current);
      cancelAnimationFrame(progressRaf);
    };
    // eslint-disable-next-line
  }, []);

  /* =========================
     FINISH
  ========================= */
  const finishLoader = () => {
    if (completedRef.current) return;
    completedRef.current = true;

    clearInterval(sprayTimerRef.current);
    clearInterval(burstTimerRef.current);

    setLoadingText("WELCOME TO SHABBIE");
    setFinished(true);
    document.body.classList.remove("loading");

    setTimeout(() => {
      onFinish && onFinish();
    }, 1100);
  };

  return (
    <div ref={loaderRef} className={`elx-loader ${finished ? "finished" : ""}`}>
      <div className="elx-orbit" />
      <div className="elx-orbit elx-orbit-two" />

      <div className="elx-scene">
        <div className="elx-glow" />
        <canvas ref={canvasRef} className="elx-spray-canvas" />

        <div ref={perfumeRef} className={`elx-perfume ${capOpen ? "cap-open" : ""}`}>
          <div className="elx-neck" />

          <div className="elx-sprayer">
            <div className="elx-sprayer-head">
              <div ref={nozzleRef} className="elx-nozzle" />
            </div>
            <div className="elx-sprayer-ring" />
          </div>

          <div className="elx-bottle">
            <div className="elx-liquid" />
            <div className="elx-reflection" />
            <div className="elx-bottle-label">
              <small>MAISON</small>
              <strong>SHABBIE</strong>
              <span />
              <small>EAU DE PARFUM</small>
            </div>
          </div>

          <div className="elx-perfume-cap">
            <div className="elx-cap-reflection" />
          </div>
        </div>

        <div className="elx-floor" />
      </div>

      <div className="elx-brand">
        <p className="elx-brand-kicker">THE ART OF FRAGRANCE</p>
        <h1>
          <span>{typed}</span>
          <i className="elx-cursor" />
        </h1>
        <p className="elx-brand-subtitle">LUXURY FRAGRANCE</p>

        <div className="elx-progress-track">
          <div className="elx-progress-bar" style={{ width: `${progress}%` }} />
        </div>

        <p className="elx-loading-text">{loadingText}</p>
      </div>
    </div>
  );
}