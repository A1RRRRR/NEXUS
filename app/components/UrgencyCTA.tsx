"use client";
import { useEffect, useState } from "react";
import { ArrowRight, Clock, Shield, TrendingUp, Users } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

function useCountdown(hoursFromNow = 23) {
  const [time, setTime] = useState({ h: hoursFromNow, m: 59, s: 59 });

  useEffect(() => {
    // Persist target in session so refresh doesn't reset
    const key = "nexus-cta-target";
    let target = sessionStorage.getItem(key);
    if (!target) {
      const t = Date.now() + hoursFromNow * 3600 * 1000;
      sessionStorage.setItem(key, String(t));
      target = String(t);
    }

    const tick = () => {
      const diff = Math.max(0, parseInt(target!) - Date.now());
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTime({ h, m, s });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [hoursFromNow]);

  return time;
}

function TimeUnit({ val, label }: { val: number; label: string }) {
  const display = val.toString().padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#0a0a1c] border border-[#00d4ff]/20 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00d4ff]/5 to-transparent" />
        <span className="text-2xl md:text-3xl font-black text-[#00d4ff] text-glow-cyan tabular-nums relative z-10">
          {display}
        </span>
      </div>
      <span className="text-[9px] text-[#404060] uppercase tracking-widest mt-2 font-bold">{label}</span>
    </div>
  );
}

export default function UrgencyCTA() {
  const { h, m, s } = useCountdown(23);

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#0a0516] to-[#050508]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(0,212,255,0.06) 40%, transparent 70%)" }} />
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Spinning rings (decorative) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#8b5cf6]/10 animate-spin-slow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#00d4ff]/5 animate-spin-rev pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <ScrollReveal>
          {/* Urgency badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#f43f5e]/30 bg-[#f43f5e]/8 mb-8">
            <Clock size={12} className="text-[#f43f5e]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f43f5e]">
              Early Adopter Pricing Ends In
            </span>
          </div>

          {/* Countdown */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <TimeUnit val={h} label="Hours" />
            <span className="text-3xl font-black text-[#303050] mb-4">:</span>
            <TimeUnit val={m} label="Minutes" />
            <span className="text-3xl font-black text-[#303050] mb-4">:</span>
            <TimeUnit val={s} label="Seconds" />
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl font-black text-[#f8f8ff] leading-tight mb-4">
            Join 12,847 Traders
            <br />
            <span className="gradient-text">Already Profiting Today</span>
          </h2>
          <p className="text-[#707090] text-lg max-w-xl mx-auto mb-10">
            When the timer hits zero, Pro renews at €399/month.
            Lock in €299 now. Cancel anytime. No contracts.
          </p>

          {/* Live counter */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10b981]/8 border border-[#10b981]/20 mb-10">
            <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse-dot" />
            <span className="text-xs text-[#10b981] font-bold">
              <span className="text-[#f0f0f0] font-black">23</span> traders signed up in the last hour
            </span>
          </div>

          {/* CTA button */}
          <div className="flex flex-col items-center gap-4">
            <button className="group relative flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-lg text-white overflow-hidden shadow-2xl">
              <span className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6]" />
              <span className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#00d4ff] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10">Start Free Trial — No Card Needed</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1.5 transition-transform" />
            </button>

            {/* Guarantee chips */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#505070]">
              {[
                { icon: Shield,    text: "30-day money-back guarantee" },
                { icon: TrendingUp,text: "Cancel anytime" },
                { icon: Users,     text: "12,847 active traders" },
              ].map(({ icon: I, text }) => (
                <div key={text} className="flex items-center gap-1.5">
                  <I size={12} className="text-[#8b5cf6]" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Trust grid */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { n: "#1",    l: "AI Signal Platform (2026)" },
              { n: "4.9★",  l: "Average user rating" },
              { n: "89.3%", l: "Verified win rate (live)" },
              { n: "€0",    l: "Cost of 7-day trial" },
            ].map(({ n, l }) => (
              <div key={l} className="glass rounded-xl p-3 border border-white/5">
                <div className="text-xl font-black text-[#00d4ff]">{n}</div>
                <div className="text-[10px] text-[#404060] uppercase tracking-wider mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
