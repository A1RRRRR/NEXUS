"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ZoomIn } from "lucide-react";

const projects = [
  { src: "https://images.unsplash.com/photo-1599619351208-3e6c839d6828?w=800&q=80", label: "Full Replacement", loc: "Westside", span: "col-span-2 row-span-2" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",  label: "Commercial TPO",   loc: "Downtown",  span: "" },
  { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80", label: "Storm Repair",  loc: "Lakewood",  span: "" },
  { src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80", label: "Metal Roof",    loc: "Oak Park",  span: "" },
  { src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80", label: "New Build",     loc: "Northgate", span: "" },
  { src: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80", label: "Tile Replace",  loc: "Riverside", span: "" },
];

export default function GalleryPreview() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-24 bg-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block glass-orange text-orange text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              Our Work
            </span>
            <h2 className="font-display font-black text-white leading-none"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
              Real Projects,
              <br />
              <span className="gradient-text">Real Results.</span>
            </h2>
          </div>
          <Link
            href="/gallery"
            className="flex items-center gap-2 text-orange font-bold hover:gap-4 transition-all duration-200"
          >
            View all 9 projects <ArrowRight size={18} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 grid-rows-2 gap-3 h-[520px]">
          {projects.map((p, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${p.span}`}
              style={{
                border: hovered === i ? "1px solid rgba(255,101,0,0.4)" : "1px solid rgba(255,255,255,0.05)",
                transition: "border-color 0.3s ease",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <Image
                src={p.src} alt={p.label} fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 transition-all duration-300"
                   style={{ background: hovered === i ? "rgba(4,5,14,0.6)" : "rgba(4,5,14,0.3)" }} />

              {/* Zoom icon */}
              <div className={`absolute top-4 right-4 w-9 h-9 glass rounded-full flex items-center justify-center transition-all duration-300 ${hovered === i ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
                <ZoomIn size={14} className="text-orange" />
              </div>

              {/* Label */}
              <div className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${hovered === i ? "translate-y-0 opacity-100" : "translate-y-2 opacity-70"}`}>
                <div className="text-white font-bold text-sm">{p.label}</div>
                <div className="text-orange text-xs">{p.loc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
