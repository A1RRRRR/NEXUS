"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";

const STATS = [
  { label: "Active Traders", value: 12847, suffix: "+", prefix: "" },
  { label: "Avg Monthly ROI", value: 34.7, suffix: "%", prefix: "" },
  { label: "Signal Accuracy", value: 89.3, suffix: "%", prefix: "" },
  { label: "Assets Tracked", value: 4200, suffix: "+", prefix: "" },
];

function useCountUp(target: number, duration = 2000, decimals = 0) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, target, duration, decimals]);

  return { count, ref };
}

function StatCard({ stat }: { stat: typeof STATS[0] }) {
  const decimals = stat.value % 1 !== 0 ? 1 : 0;
  const { count, ref } = useCountUp(stat.value, 2200, decimals);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-black text-[#00d4ff] text-glow-cyan">
        {stat.prefix}{count.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{stat.suffix}
      </div>
      <div className="text-xs text-[#6b7280] mt-1 uppercase tracking-widest font-medium">{stat.label}</div>
    </div>
  );
}

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg pt-28 pb-16">
      {/* Dynamic gradient blob following mouse */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none transition-all duration-1000 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #7c3aed 0%, #00d4ff 50%, transparent 100%)",
          left: `${mousePos.x * 60}%`,
          top: `${mousePos.y * 60}%`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Static glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#7c3aed]/10 blur-[80px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#00d4ff]/8 blur-[100px] animate-float" style={{ animationDelay: "2s" }} />

      {/* Badge */}
      <div className="relative z-10 mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/5 backdrop-blur-sm">
        <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse-glow" />
        <span className="text-xs font-medium text-[#00d4ff] tracking-widest uppercase">
          Live AI Signals Active
        </span>
        <span className="text-xs text-[#6b7280]">· 847 signals today</span>
      </div>

      {/* Main headline */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-6">
          <span className="block text-[#f0f0ff]">Beat the Market</span>
          <span className="block shimmer-text">With Neural Precision</span>
        </h1>
        <p className="text-lg md:text-xl text-[#7a7a9a] max-w-2xl mx-auto leading-relaxed mb-10">
          NEXUS AI analyzes 4,200+ assets across crypto, equities, and forex in real-time.
          Get institutional-grade signals before the crowd moves.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button className="group relative flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-base text-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed] to-[#00d4ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Start 7-Day Free Trial</span>
            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base border border-[#2a2a3e] hover:border-[#00d4ff]/50 text-[#9090b0] hover:text-white transition-all duration-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00d4ff]/20 to-[#7c3aed]/20 flex items-center justify-center">
              <Zap size={14} className="text-[#00d4ff]" />
            </div>
            Watch Live Demo
          </button>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#5a5a7a] mb-16">
          {[
            { icon: ShieldCheck, text: "SOC 2 Certified" },
            { icon: Globe, text: "142 Countries" },
            { icon: Zap, text: "< 50ms Latency" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5">
              <Icon size={12} className="text-[#00d4ff]" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8 py-6 rounded-2xl border border-[#1a1a2e] bg-[#0d0d1a]/60 backdrop-blur-sm">
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#3a3a5a]">
        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#3a3a5a] to-transparent animate-pulse" />
      </div>
    </section>
  );
}
