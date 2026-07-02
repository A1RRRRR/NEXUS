"use client";
import { Brain, Zap, TrendingUp } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const STEPS = [
  {
    n: "01",
    icon: Brain,
    color: "#8b5cf6",
    title: "Neural Analysis",
    description:
      "Our AI ingests 2.4M data points per second: on-chain flows, whale wallets, order book depth, funding rates, social sentiment, and macro indicators — simultaneously.",
    details: ["On-chain flow detection", "Whale wallet tracking", "Order book analysis", "Funding rate monitoring", "Macro correlation engine"],
  },
  {
    n: "02",
    icon: Zap,
    color: "#00d4ff",
    title: "Signal Generation",
    description:
      "When confluence of 4+ independent indicators aligns, the engine generates a signal with exact entry, take-profit targets, stop-loss level, and position sizing recommendation.",
    details: ["Entry price + timing", "3-tier take-profit targets", "Auto stop-loss calculation", "Kelly criterion sizing", "Confidence scoring (0-100)"],
  },
  {
    n: "03",
    icon: TrendingUp,
    color: "#10b981",
    title: "You Execute & Profit",
    description:
      "Get the signal via app, SMS, Telegram, or webhook in under 50ms. One tap to review the full AI reasoning. One more tap to copy-trade or execute manually.",
    details: ["< 50ms delivery", "Full AI reasoning visible", "One-tap copy trading", "Real-time P&L tracking", "Automatic signal logging"],
  },
];

export default function HowItWorks() {
  return (
    <section className="py-28 px-6 relative bg-[#06060e]">
      <div className="absolute inset-0 grid-bg-dense opacity-40" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#8b5cf6]/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#8b5cf6]/30 bg-[#8b5cf6]/8 mb-5">
            <Brain size={12} className="text-[#8b5cf6]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8b5cf6]">How It Works</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#f8f8ff] leading-tight mb-4">
            From Raw Data to
            <br />
            <span className="gradient-text">Profitable Trades</span>
          </h2>
          <p className="text-[#707090] max-w-xl mx-auto text-lg">
            Three steps. Under 50 milliseconds. Before anyone else knows.
          </p>
        </ScrollReveal>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="absolute top-16 left-0 right-0 h-px hidden lg:block">
            <div className="mx-[16.66%] h-full bg-gradient-to-r from-[#8b5cf6]/30 via-[#00d4ff]/30 to-[#10b981]/30" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {STEPS.map(({ n, icon: Icon, color, title, description, details }, i) => (
              <ScrollReveal key={n} delay={i * 0.15} direction="up">
                <div className="relative p-6 rounded-2xl glass border border-white/6 card-lift group hover:border-white/12 transition-colors">
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 30% 0%, ${color}10, transparent 60%)` }}
                  />

                  {/* Number + icon */}
                  <div className="flex items-center gap-4 mb-5 relative z-10">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center relative"
                      style={{ background: `${color}12`, border: `1.5px solid ${color}30` }}
                    >
                      <Icon size={24} style={{ color }} />
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
                        style={{ background: color }}
                      />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color }}>{n}</div>
                      <div className="text-lg font-black text-[#f8f8ff]">{title}</div>
                    </div>
                  </div>

                  <p className="text-sm text-[#707090] leading-relaxed mb-5 relative z-10">
                    {description}
                  </p>

                  {/* Details list */}
                  <div className="space-y-2 relative z-10">
                    {details.map(d => (
                      <div key={d} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full shrink-0" style={{ background: color }} />
                        <span className="text-xs text-[#505070]">{d}</span>
                      </div>
                    ))}
                  </div>

                  {/* Corner accent */}
                  <div
                    className="absolute top-0 right-0 w-24 h-24 rounded-tr-2xl opacity-10 group-hover:opacity-20 transition-opacity"
                    style={{ background: `radial-gradient(circle at 100% 0%, ${color}, transparent 70%)` }}
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Bottom stat callout */}
        <ScrollReveal delay={0.4} className="mt-16 text-center">
          <div className="inline-flex flex-wrap gap-6 items-center justify-center px-8 py-4 rounded-2xl glass border border-white/6">
            {[
              { label: "Avg time from signal to delivery",   val: "< 50ms"   },
              { label: "Signals generated per trading day",  val: "847+"     },
              { label: "Backtested win rate (3yr audit)",    val: "89.3%"    },
              { label: "Average gain per closed signal",     val: "+7.4%"    },
            ].map(({ label, val }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-black text-[#00d4ff]">{val}</div>
                <div className="text-[10px] text-[#404060] uppercase tracking-wider mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
