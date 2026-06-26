"use client";
import { Star, Quote } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const TESTIMONIALS = [
  {
    name: "Marcus Reinholt",   role: "Full-time Crypto Trader",    loc: "Munich, DE",
    avatar: "MR", color: "#00d4ff", stars: 5,
    text: "I've subscribed to 12 signal services over 6 years. NEXUS is the first where the math actually holds up publicly. 91% win rate in my first 60 days. Paying for itself 40× over.",
    stat: "+€18,400", statLabel: "in 60 days",
  },
  {
    name: "Sophie Laurent",    role: "Portfolio Manager",           loc: "Paris, FR",
    avatar: "SL", color: "#8b5cf6", stars: 5,
    text: "We use it to supplement our quant models. The AI explains every signal in plain English — my compliance officer loves it. The on-chain layer caught the ETH institution move 5 hours early.",
    stat: "+31%", statLabel: "YTD alpha",
  },
  {
    name: "Kofi Mensah",       role: "Prop Trader",                 loc: "London, UK",
    avatar: "KM", color: "#10b981", stars: 5,
    text: "Got the BTC signal 4 minutes before it hit Twitter. That's the edge. Institutional plan — pays itself in one trade per month. The speed alone is worth 10× the subscription.",
    stat: "4 min", statLabel: "avg signal lead",
  },
  {
    name: "Anna Petrov",       role: "Quant Analyst",               loc: "Zurich, CH",
    avatar: "AP", color: "#fbbf24", stars: 5,
    text: "I build models myself, so I was deeply skeptical. They shared their full methodology on request. The on-chain + sentiment fusion is genuinely novel. Verified, transparent, legit.",
    stat: "Fully", statLabel: "verified methodology",
  },
  {
    name: "Raj Patel",         role: "Angel Investor + Trader",     loc: "Amsterdam, NL",
    avatar: "RP", color: "#00d4ff", stars: 4,
    text: "Complaint: too many signals without the filter on. With top-5-confidence view it's perfect. Returns are exceptional either way. The ROI on the subscription is embarrassingly good.",
    stat: "+€7,800", statLabel: "in 30 days",
  },
  {
    name: "Elena Bauer",       role: "DeFi Strategist",             loc: "Berlin, DE",
    avatar: "EB", color: "#8b5cf6", stars: 5,
    text: "The DeFi signal coverage is in a category of its own. The on-chain flow analysis caught AVAX accumulation 6 hours before the move. That one trade paid my annual subscription 12× over.",
    stat: "6 hrs", statLabel: "early on AVAX",
  },
];

const PRESS = ["CoinDesk", "Bloomberg", "The Block", "Forbes", "Financial Times", "Decrypt"];

export default function SocialProof() {
  return (
    <section className="py-28 px-6 bg-[#06060e] relative">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Press strip */}
        <ScrollReveal className="text-center mb-20">
          <p className="text-[10px] text-[#303050] uppercase tracking-[0.25em] font-bold mb-6">As seen in</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {PRESS.map(p => (
              <span key={p} className="text-xl font-black text-[#202040] tracking-tight hover:text-[#404060] transition-colors cursor-default">
                {p}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#10b981]/30 bg-[#10b981]/8 mb-5">
            <Star size={12} className="text-[#10b981]" fill="#10b981" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#10b981]">Social Proof</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#f8f8ff] mb-4">
            Traders Don't Lie
            <br />
            <span className="gradient-text">About Their P&L</span>
          </h2>
          <p className="text-[#707090]">
            12,847 active traders. Verified results. Real people.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS.map(({ name, role, loc, avatar, color, stars, text, stat, statLabel }, i) => (
            <ScrollReveal key={name} delay={i * 0.08}>
              <div className="relative p-5 rounded-2xl glass border border-white/5 card-lift group overflow-hidden h-full flex flex-col">
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 0% 0%, ${color}08, transparent 50%)` }}
                />

                {/* Quote icon */}
                <Quote size={20} className="absolute top-4 right-4 opacity-10" style={{ color }} />

                <div className="relative z-10 flex flex-col flex-1">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-3">
                    {Array(5).fill(0).map((_, k) => (
                      <Star key={k} size={11} className={k < stars ? "text-[#fbbf24]" : "text-[#202030]"} fill={k < stars ? "#fbbf24" : "none"} />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-sm text-[#8080a0] leading-relaxed mb-4 flex-1">&ldquo;{text}&rdquo;</p>

                  {/* Result badge */}
                  <div className="inline-flex items-baseline gap-1.5 px-3 py-1.5 rounded-xl mb-4 self-start"
                    style={{ background: `${color}12`, border: `1px solid ${color}20` }}>
                    <span className="text-base font-black" style={{ color }}>{stat}</span>
                    <span className="text-[10px]" style={{ color, opacity: 0.7 }}>{statLabel}</span>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
                      style={{ background: `linear-gradient(135deg, ${color}, ${color}70)` }}
                    >
                      {avatar}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#e0e0f0]">{name}</div>
                      <div className="text-[10px] text-[#404060]">{role} · {loc}</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Aggregate stats */}
        <ScrollReveal delay={0.3} className="mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { n: "4.9/5",    l: "Average rating (2,847 reviews)" },
              { n: "€4.2M+",  l: "Subscriber profits this month"    },
              { n: "89.3%",   l: "Signal win rate (30-day live audit)" },
              { n: "< 2min",  l: "Avg support response time"        },
            ].map(({ n, l }) => (
              <div key={l} className="text-center p-4 rounded-xl glass border border-white/5">
                <div className="text-2xl font-black text-[#00d4ff] mb-1">{n}</div>
                <div className="text-[10px] text-[#404060] uppercase tracking-wider">{l}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
