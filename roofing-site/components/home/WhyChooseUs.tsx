"use client";

import { useRef, useEffect, useState } from "react";
import { Shield, Clock, DollarSign, Award, Users, Headphones } from "lucide-react";

const reasons = [
  { icon: Shield,      title: "Lifetime Warranty",    desc: "We back our work forever. Anything fails — we fix it free.",        num: "01" },
  { icon: Clock,       title: "On Time, Always",      desc: "Show up when promised, done when promised. No exceptions.",           num: "02" },
  { icon: DollarSign,  title: "Transparent Pricing",  desc: "Detailed written quotes. We beat any comparable written estimate.",   num: "03" },
  { icon: Award,       title: "GAF Master Elite",      desc: "Top 3% of roofers in the country. Certified and proud of it.",       num: "04" },
  { icon: Users,       title: "Family Owned & Local",  desc: "We live here. Our reputation is our community. We protect both.",    num: "05" },
  { icon: Headphones,  title: "Dedicated Support",    desc: "One point of contact start to finish. Real people. Real answers.",    num: "06" },
];

function AnimatedCard({ r, delay }: { r: typeof reasons[0]; delay: number }) {
  const ref  = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  const Icon = r.icon;

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group glass rounded-2xl p-7 hover:border-orange/20 transition-all duration-500 relative overflow-hidden"
      style={{
        transform: vis ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
        opacity:   vis ? 1 : 0,
        transition: `all 0.6s ease ${delay}s`,
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
           style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,101,0,0.08) 0%, transparent 70%)" }} />

      <div className="flex items-start gap-5">
        {/* Number */}
        <span className="text-5xl font-black text-orange/10 font-display shrink-0 leading-none -mt-1 group-hover:text-orange/20 transition-colors duration-300">
          {r.num}
        </span>
        <div>
          {/* Icon */}
          <div className="w-10 h-10 glass-orange rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <Icon size={18} className="text-orange" />
          </div>
          <h3 className="text-white font-black text-lg mb-2">{r.title}</h3>
          <p className="text-white/40 text-sm leading-relaxed">{r.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-dark relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-10 pointer-events-none"
           style={{ background: "radial-gradient(circle, #FF6500 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-16">
          <div className="flex-1">
            <span className="inline-block glass-orange text-orange text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              Why ProRoof
            </span>
            <h2 className="font-display font-black text-white leading-none"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
              We Don&apos;t Just
              <br />
              Replace Roofs.
              <br />
              <span className="gradient-text">We Earn Trust.</span>
            </h2>
          </div>
          <p className="text-white/40 max-w-xs lg:pb-2">
            Every decision we make comes back to one thing: doing right by the homeowner.
            Here&apos;s what that looks like in practice.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((r, i) => (
            <AnimatedCard key={r.title} r={r} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
