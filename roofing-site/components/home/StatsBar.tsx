"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Roofs Completed",   icon: "🏠", color: "#FF6500" },
  { value: 20,  suffix: "+", label: "Years Experience",   icon: "📅", color: "#FF6500" },
  { value: 5.0, suffix: "★", label: "Google Rating",      icon: "⭐", color: "#FFB800" },
  { value: 100, suffix: "%", label: "Satisfaction Rate",  icon: "💯", color: "#FF6500" },
  { value: 340, suffix: "+", label: "5-Star Reviews",     icon: "🌟", color: "#FF6500" },
];

function Counter({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref  = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !done.current) {
        done.current = true;
        const start     = performance.now();
        const isDecimal = target % 1 !== 0;
        const step      = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          setCount(parseFloat((eased * target).toFixed(isDecimal ? 1 : 0)));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {target % 1 !== 0 ? count.toFixed(1) : Math.round(count)}{suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className="py-16 bg-dark relative overflow-hidden">
      {/* Glow backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-40 opacity-10"
             style={{ background: "radial-gradient(ellipse, #FF6500 0%, transparent 70%)", filter: "blur(40px)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="shimmer-card neon-border rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300"
              style={{
                animationDelay: `${i * 0.1}s`,
                background: "rgba(255,101,0,0.03)",
              }}
            >
              <div className="text-3xl mb-2">{s.icon}</div>
              <div
                className="text-4xl font-black font-display mb-1"
                style={{ color: s.color, textShadow: `0 0 20px ${s.color}60` }}
              >
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-white/40 text-xs font-medium uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
