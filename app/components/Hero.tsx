"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ShieldCheck, Zap, Globe, Lock, TrendingUp } from "lucide-react";
import ParticleCanvas from "./ParticleCanvas";

const STATS = [
  { label: "Active Traders",  value: 12847,  suffix: "+",  decimals: 0 },
  { label: "Avg Monthly ROI", value: 34.7,   suffix: "%",  decimals: 1 },
  { label: "Signal Accuracy", value: 89.3,   suffix: "%",  decimals: 1 },
  { label: "Assets Covered",  value: 4200,   suffix: "+",  decimals: 0 },
];

function useCountUp(target: number, decimals = 0, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const dur = 2400;
    let start: number;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(parseFloat((eased * target).toFixed(decimals)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, decimals]);
  return val;
}

function StatCard({ stat, active }: { stat: typeof STATS[0]; active: boolean }) {
  const val = useCountUp(stat.value, stat.decimals, active);
  return (
    <div className="text-center group">
      <div className="text-3xl md:text-4xl font-black text-[#00d4ff] text-glow-cyan tabular-nums">
        {val.toLocaleString("en-US", {
          minimumFractionDigits: stat.decimals,
          maximumFractionDigits: stat.decimals,
        })}{stat.suffix}
      </div>
      <div className="text-[10px] text-[#404060] mt-1.5 uppercase tracking-[0.15em] font-bold">{stat.label}</div>
    </div>
  );
}

export default function Hero() {
  const [mousePos, setMousePos]     = useState({ x: 0.5, y: 0.5 });
  const [statsVisible, setVisible]  = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const [wordIdx, setWordIdx]       = useState(0);
  const WORDS = ["Crypto", "Equities", "Forex", "Derivatives", "ETFs"];

  useEffect(() => {
    const id = setInterval(() => setWordIdx(i => (i + 1) % WORDS.length), 2200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-[33px]">
      {/* Particle neural net */}
      <ParticleCanvas />

      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Mouse-tracked radial glow */}
      <div
        className="absolute w-[900px] h-[900px] rounded-full pointer-events-none transition-all duration-[1200ms]"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(0,212,255,0.06) 40%, transparent 70%)",
          left:  `${mousePos.x * 100}%`,
          top:   `${mousePos.y * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Fixed orbs */}
      <div className="absolute top-1/3 left-1/5  w-72 h-72 bg-[#8b5cf6]/8  rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-[#00d4ff]/6 rounded-full blur-[120px] animate-float-slow" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto pt-20 pb-8">

        {/* Live badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#10b981]/30 bg-[#10b981]/5 backdrop-blur-sm mb-8">
          <div className="flex gap-1 items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse-dot" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#10b981]">Live</span>
          </div>
          <div className="w-px h-3 bg-[#10b981]/30" />
          <span className="text-[11px] text-[#607060]">847 signals generated today · 12,847 traders active</span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-[96px] font-black leading-[1.0] tracking-[-0.03em] mb-6">
          <span className="block text-[#f8f8ff]">Beat the Market</span>
          <span className="block mt-1">
            <span className="gradient-text">in Real-Time</span>
          </span>
        </h1>

        {/* Dynamic sub-word */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-[#303050]" />
          <div className="text-base md:text-lg text-[#707090] font-medium">
            AI signals for{" "}
            <span
              key={wordIdx}
              className="text-[#00d4ff] font-bold inline-block animate-rise"
            >
              {WORDS[wordIdx]}
            </span>
          </div>
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-[#303050]" />
        </div>

        <p className="text-lg text-[#707090] max-w-2xl mx-auto leading-relaxed mb-10">
          NEXUS processes <span className="text-[#f0f0ff] font-semibold">2.4 million data points per second</span> across
          on-chain flows, order books, sentiment, and macro indicators — delivering institutional-grade
          signals before the crowd moves.
        </p>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button className="group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base text-white overflow-hidden shadow-2xl">
            <span className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6]" />
            <span className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#00d4ff] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: "inset 0 0 30px rgba(255,255,255,0.1)" }} />
            <span className="relative z-10">Start 7-Day Free Trial</span>
            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="group flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-base border border-white/10 hover:border-white/20 text-[#9090b0] hover:text-white transition-all duration-200 backdrop-blur-sm bg-white/2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00d4ff]/20 to-[#8b5cf6]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp size={13} className="text-[#00d4ff]" />
            </div>
            Watch Live Demo
          </button>
        </div>

        {/* Trust chips */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#505070] mb-14">
          {[
            { icon: ShieldCheck, text: "SOC 2 Type II" },
            { icon: Lock,        text: "256-bit encrypted" },
            { icon: Globe,       text: "142 countries" },
            { icon: Zap,         text: "< 50ms latency" },
          ].map(({ icon: I, text }) => (
            <div key={text} className="flex items-center gap-1.5">
              <I size={11} className="text-[#00d4ff]" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 glass-bright rounded-2xl px-8 py-6 border-glow-cyan"
        >
          {STATS.map((s, i) => (
            <div key={s.label} className="flex items-center gap-0">
              <StatCard stat={s} active={statsVisible} />
              {i < STATS.length - 1 && (
                <div className="hidden md:block w-px h-10 bg-white/6 ml-6 mr-[-1px]" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-5 h-9 rounded-full border border-white/15 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-[#00d4ff]/60 animate-float" style={{ animationDuration: "1.5s" }} />
        </div>
      </div>
    </section>
  );
}
