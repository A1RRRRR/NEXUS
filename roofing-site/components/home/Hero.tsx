"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Phone, ArrowRight, Shield, Star, Zap } from "lucide-react";

const WORDS = ["Residential", "Commercial", "Emergency", "Storm Damage", "Any Roof"];

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timer: ReturnType<typeof setTimeout>;
    if (!deleting && charIdx < word.length) {
      timer = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === word.length) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timer = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }
    setDisplay(word.slice(0, charIdx));
    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.5 - 0.1,
      alpha: Math.random() * 0.6 + 0.1,
      color: Math.random() > 0.6 ? "#FF6500" : "#ffffff",
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle   = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur  = p.r * 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10)               p.y = canvas.height + 10;
        if (p.x < -10)               p.x = canvas.width  + 10;
        if (p.x > canvas.width  + 10) p.x = -10;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1]"
    />
  );
}

export default function Hero() {
  const typed = useTypewriter(WORDS);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark">

      {/* Animated gradient blobs */}
      <div className="absolute inset-0 pointer-events-none z-[0]">
        <div
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-20 animate-blob"
          style={{ background: "radial-gradient(circle, #FF6500 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-15 animate-blob-delay"
          style={{ background: "radial-gradient(circle, #FF2D00 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full opacity-10 animate-blob-delay2"
          style={{ background: "radial-gradient(circle, #FF6500 0%, transparent 70%)", filter: "blur(50px)" }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-[0] opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Particles */}
      <ParticleCanvas />

      {/* Floating UI elements */}
      <div className="absolute top-32 right-8 md:right-20 z-10 animate-float glass-orange rounded-2xl p-4 hidden sm:block">
        <div className="flex items-center gap-2 text-orange font-bold text-sm">
          <Star size={14} className="fill-orange text-orange" />
          <span className="text-white">5.0 Rating</span>
        </div>
        <div className="text-white/50 text-xs mt-1">340+ Google Reviews</div>
        <div className="flex text-orange text-lg mt-1">★★★★★</div>
      </div>

      <div className="absolute bottom-32 right-8 md:right-20 z-10 animate-float2 glass rounded-2xl p-4 hidden sm:block"
           style={{ border: "1px solid rgba(255,101,0,0.3)" }}>
        <div className="text-orange font-black text-2xl">24/7</div>
        <div className="text-white text-xs font-bold">EMERGENCY</div>
        <div className="text-white/40 text-xs">2-hr response</div>
      </div>

      <div className="absolute top-48 left-8 md:left-20 z-10 animate-float-slow glass rounded-2xl px-4 py-3 hidden md:block"
           style={{ border: "1px solid rgba(255,101,0,0.2)" }}>
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-orange" />
          <span className="text-white text-xs font-semibold">GAF Certified</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-24">

        {/* Top badge */}
        <div className="inline-flex items-center gap-2 glass-orange text-orange text-xs font-bold px-4 py-2 rounded-full mb-8 uppercase tracking-widest"
             style={{ animation: "slide-up 0.6s ease forwards" }}>
          <Zap size={12} className="fill-orange" />
          Voted #1 Roofing Company — 3 Years Running
        </div>

        {/* Main headline */}
        <h1
          className="font-display font-black text-white leading-none mb-4"
          style={{
            fontSize: "clamp(3.5rem, 10vw, 8rem)",
            animation: "crack-in 0.8s ease forwards 0.2s",
            opacity: 0,
          }}
        >
          We Fix
          <br />
          <span className="gradient-text glow-text">Every Roof.</span>
        </h1>

        {/* Typewriter */}
        <div
          className="flex items-center justify-center gap-3 text-xl md:text-3xl font-bold mb-8"
          style={{ animation: "slide-up 0.6s ease forwards 0.6s", opacity: 0 }}
        >
          <span className="text-white/50">Expert</span>
          <span className="text-orange min-w-[220px] text-left">
            {typed}
            <span className="animate-pulse">|</span>
          </span>
          <span className="text-white/50">Roofing</span>
        </div>

        {/* Sub */}
        <p
          className="text-white/50 text-lg max-w-2xl mx-auto mb-10"
          style={{ animation: "slide-up 0.6s ease forwards 0.8s", opacity: 0 }}
        >
          Licensed. Insured. Backed by a lifetime warranty. From a single missing
          shingle to a complete commercial overhaul — we do it right, the first time.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animation: "slide-up 0.6s ease forwards 1s", opacity: 0 }}
        >
          {/* Primary CTA with pulse rings */}
          <Link
            href="/quote"
            className="relative overflow-visible gradient-bg text-white font-black text-lg px-10 py-5 rounded-2xl
                       hover:scale-105 hover:shadow-[0_0_50px_rgba(255,101,0,0.6)] transition-all duration-300
                       flex items-center gap-3 w-full sm:w-auto justify-center"
          >
            <span className="absolute inset-0 rounded-2xl pulse-ring" />
            Get My Free Quote
            <ArrowRight size={20} />
          </Link>

          <a
            href="tel:+15558007663"
            className="flex items-center gap-3 glass text-white font-bold text-lg px-10 py-5 rounded-2xl
                       hover:border-orange/40 hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center"
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <Phone size={20} className="text-orange" />
            (555) 800-ROOF
          </a>
        </div>

        {/* Trust strip */}
        <div
          className="flex flex-wrap items-center justify-center gap-6 mt-10 text-white/30 text-sm"
          style={{ animation: "slide-up 0.6s ease forwards 1.2s", opacity: 0 }}
        >
          {["500+ Roofs Done", "20 Years Local", "Free Estimates", "Lifetime Warranty"].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <span className="text-orange">✓</span> {t}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent z-10 pointer-events-none" />
    </section>
  );
}
