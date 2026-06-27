"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Home, Building2, Wrench, Wind, Zap, Droplets, ArrowRight } from "lucide-react";

const services = [
  { icon: Home,      title: "Residential Roofing",  desc: "Asphalt, metal, tile — roofs built to last 30+ years.", tag: "Most Popular", color: "#4F9EFF" },
  { icon: Building2, title: "Commercial Roofing",   desc: "TPO, EPDM, flat systems with zero downtime guarantee.", tag: "Business",     color: "#A855F7" },
  { icon: Wrench,    title: "Roof Repair",           desc: "Leak detection to full repair. Same-day service.",       tag: "Fast",        color: "#FF6500" },
  { icon: Wind,      title: "Storm Damage",          desc: "Insurance claim specialists. We handle the paperwork.", tag: "Insurance",   color: "#FF2D00" },
  { icon: Zap,       title: "Emergency 24/7",        desc: "2-hour guaranteed response. Day, night, weekends.",      tag: "Urgent",      color: "#FFB800" },
  { icon: Droplets,  title: "Gutters & Exterior",    desc: "Seamless gutters, guards, fascia, and siding.",          tag: "Full Package", color: "#22C55E" },
];

function TiltCard({ svc }: { svc: typeof services[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glow, setGlow]     = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const Icon = svc.icon;

  const onMove = (e: React.MouseEvent) => {
    const el   = cardRef.current!;
    const rect = el.getBoundingClientRect();
    const x    = (e.clientX - rect.left) / rect.width  - 0.5;
    const y    = (e.clientY - rect.top)  / rect.height - 0.5;
    setRotate({ x: y * -18, y: x * 18 });
    setGlow({
      x: ((e.clientX - rect.left) / rect.width)  * 100,
      y: ((e.clientY - rect.top)  / rect.height) * 100,
    });
  };

  return (
    <div
      ref={cardRef}
      className="relative group cursor-pointer"
      style={{ perspective: "1000px" }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setRotate({ x: 0, y: 0 }); setHovered(false); }}
    >
      <div
        className="shimmer-card rounded-2xl p-7 h-full transition-all duration-200 relative overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: `1px solid ${hovered ? svc.color + "40" : "rgba(255,255,255,0.06)"}`,
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: "preserve-3d",
          boxShadow: hovered ? `0 20px 60px ${svc.color}20` : "none",
          transition: "transform 0.15s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        }}
      >
        {/* Spotlight glow */}
        {hovered && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, ${svc.color}15 0%, transparent 60%)`,
            }}
          />
        )}

        {/* Tag */}
        <span
          className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-5"
          style={{ background: svc.color + "20", color: svc.color }}
        >
          {svc.tag}
        </span>

        {/* Icon */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
          style={{ background: svc.color + "15", boxShadow: hovered ? `0 0 20px ${svc.color}40` : "none" }}
        >
          <Icon size={26} style={{ color: svc.color }} strokeWidth={1.5} />
        </div>

        <h3 className="text-white font-black text-xl mb-3 font-display">{svc.title}</h3>
        <p className="text-white/40 text-sm leading-relaxed mb-5">{svc.desc}</p>

        <div
          className="flex items-center gap-1.5 text-sm font-bold transition-all group-hover:gap-2.5"
          style={{ color: svc.color }}
        >
          Learn more <ArrowRight size={14} />
        </div>
      </div>
    </div>
  );
}

export default function ServicesPreview() {
  return (
    <section className="py-24 bg-dark2 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
           style={{
             backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
             backgroundSize: "50px 50px",
           }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block glass-orange text-orange text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            What We Do
          </span>
          <h2 className="font-display font-black text-white leading-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            Every Roofing Service
            <br />
            <span className="gradient-text">Done Right.</span>
          </h2>
        </div>

        {/* Tilt card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc) => (
            <TiltCard key={svc.title} svc={svc} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 gradient-bg text-white font-black text-lg px-10 py-4 rounded-2xl
                       hover:scale-105 hover:shadow-[0_0_50px_rgba(255,101,0,0.4)] transition-all duration-300"
          >
            View All Services <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
