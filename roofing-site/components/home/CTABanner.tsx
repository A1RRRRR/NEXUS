"use client";

import Link from "next/link";
import { Phone, ArrowRight, Zap } from "lucide-react";
import { useEffect, useRef } from "react";

export default function CTABanner() {
  const btnRef = useRef<HTMLAnchorElement>(null);

  // Ripple effect on CTA button click
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn  = btnRef.current!;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size   = Math.max(rect.width, rect.height) * 2;
    ripple.style.cssText = `
      position:absolute; border-radius:50%; pointer-events:none;
      width:${size}px; height:${size}px;
      top:${e.clientY - rect.top  - size/2}px;
      left:${e.clientX - rect.left - size/2}px;
      background:rgba(255,255,255,0.3);
      transform:scale(0); animation:ripple-expand 0.6s ease-out forwards;
    `;
    btn.style.position = "relative";
    btn.style.overflow = "hidden";
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  };

  return (
    <section className="py-32 bg-dark2 relative overflow-hidden">
      {/* Animated blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20 animate-blob pointer-events-none"
           style={{ background: "radial-gradient(circle, #FF6500 0%, transparent 70%)", filter: "blur(70px)" }} />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full opacity-15 animate-blob-delay pointer-events-none"
           style={{ background: "radial-gradient(circle, #FF2D00 0%, transparent 70%)", filter: "blur(60px)" }} />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
           style={{
             backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
             backgroundSize: "60px 60px",
           }} />

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        {/* Floating badge */}
        <div className="inline-flex items-center gap-2 glass-orange text-orange text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-8 animate-float">
          <Zap size={12} className="fill-orange" />
          Limited Slots This Month
        </div>

        <h2
          className="font-display font-black text-white leading-none mb-6"
          style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
        >
          Ready for a Roof
          <br />
          <span className="gradient-text glow-text">You&apos;ll Love?</span>
        </h2>

        <p className="text-white/40 text-xl mb-12 max-w-2xl mx-auto">
          Free estimate. No pressure. Most quotes delivered in 24 hours.
          Financing available from $0 down.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          {/* Primary — with ripple */}
          <Link
            href="/quote"
            ref={btnRef}
            onClick={handleClick}
            className="relative gradient-bg text-white font-black text-xl px-12 py-6 rounded-2xl
                       hover:scale-105 hover:shadow-[0_0_80px_rgba(255,101,0,0.5)] transition-all duration-300
                       flex items-center gap-3 w-full sm:w-auto justify-center animate-glow-pulse"
          >
            Get My Free Estimate
            <ArrowRight size={22} />
          </Link>

          <a
            href="tel:+15558007663"
            className="flex items-center gap-3 glass border border-white/10 text-white font-black text-xl
                       px-12 py-6 rounded-2xl hover:border-orange/30 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,101,0,0.2)]
                       transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <Phone size={22} className="text-orange" />
            (555) 800-ROOF
          </a>
        </div>

        <p className="text-white/20 text-sm mt-8">
          No salespeople. No pressure. Just honest roofing advice.
        </p>
      </div>

      <style>{`
        @keyframes ripple-expand {
          to { transform: scale(1); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
