"use client";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Marcus Reinholt",
    role: "Full-time Crypto Trader · Munich",
    avatar: "MR",
    color: "#00d4ff",
    stars: 5,
    text: "I've tried 12 signal services. NEXUS is the first one where the math actually holds up. 91% win rate in my first 60 days. Paying for itself 40x over.",
    stat: "+€18,400 in 60 days",
  },
  {
    name: "Sophie Laurent",
    role: "Portfolio Manager · Paris",
    avatar: "SL",
    color: "#7c3aed",
    stars: 5,
    text: "We use this to supplement our proprietary models. The AI explains every signal decision in plain English — my compliance team loves it as much as our traders.",
    stat: "+31% YTD alpha",
  },
  {
    name: "Kofi Mensah",
    role: "Prop Trader · London",
    avatar: "KM",
    color: "#10b981",
    stars: 5,
    text: "The latency is insane. I got the BTC signal 4 minutes before it broke out on Twitter. That's the edge. Institutional subscription, pays itself in one trade per month.",
    stat: "4min avg signal lead",
  },
  {
    name: "Anna Petrov",
    role: "Quant Analyst · Zurich",
    avatar: "AP",
    color: "#f59e0b",
    stars: 5,
    text: "I was skeptical — I build models myself. But their on-chain + sentiment fusion is genuinely novel. Their team shared the methodology on request. Transparent and legit.",
    stat: "Methodology verified",
  },
  {
    name: "Raj Patel",
    role: "Angel Investor + Trader · Amsterdam",
    avatar: "RP",
    color: "#00d4ff",
    stars: 4,
    text: "One complaint: too many signals. I want quality over quantity. That said, the top-5-confidence filter view solves it. Returns have been exceptional. Hard to argue.",
    stat: "+€7,800 in 30 days",
  },
  {
    name: "Elena Bauer",
    role: "DeFi Strategist · Berlin",
    avatar: "EB",
    color: "#7c3aed",
    stars: 5,
    text: "The DeFi signal coverage is unmatched. On-chain flow analysis caught the AVAX accumulation 6 hours early. That one trade paid my annual subscription 12x over.",
    stat: "6hr early on AVAX",
  },
];

const PRESS_LOGOS = [
  "CoinDesk", "Bloomberg", "Financial Times", "The Block", "Decrypt", "Forbes"
];

export default function SocialProof() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Press bar */}
        <div className="text-center mb-16">
          <p className="text-xs text-[#4a4a6a] uppercase tracking-widest mb-6">As featured in</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-40">
            {PRESS_LOGOS.map((name) => (
              <span key={name} className="text-lg font-black text-[#9090b0] tracking-tight">
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Testimonials header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-[#f0f0ff] mb-4">
            Traders Don't Lie
            <br />
            <span className="shimmer-text">About Their P&L</span>
          </h2>
          <p className="text-[#6b7280]">12,847 active subscribers. These are real results from real people.</p>
        </div>

        {/* Testimonial grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS.map(({ name, role, avatar, color, stars, text, stat }) => (
            <div
              key={name}
              className="p-5 rounded-xl border border-[#1a1a2e] bg-[#0d0d1a] card-hover relative overflow-hidden group"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(circle at 0% 0%, ${color}08, transparent 60%)` }}
              />
              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {Array(stars).fill(0).map((_, i) => (
                    <Star key={i} size={12} className="text-[#f59e0b]" fill="#f59e0b" />
                  ))}
                  {Array(5 - stars).fill(0).map((_, i) => (
                    <Star key={i} size={12} className="text-[#3a3a5a]" />
                  ))}
                </div>

                <p className="text-sm text-[#9090b0] leading-relaxed mb-4">&ldquo;{text}&rdquo;</p>

                {/* Stat callout */}
                <div
                  className="inline-flex items-center px-3 py-1 rounded-full mb-4 text-xs font-bold"
                  style={{ background: `${color}15`, color }}
                >
                  {stat}
                </div>

                {/* User */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white"
                    style={{ background: `linear-gradient(135deg, ${color}, ${color}80)` }}
                  >
                    {avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#f0f0ff]">{name}</div>
                    <div className="text-xs text-[#4a4a6a]">{role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
