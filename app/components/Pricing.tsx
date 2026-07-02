"use client";
import { useState } from "react";
import { Check, X, Zap, Crown, Building2, Star } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const PLANS = [
  {
    name: "Starter",
    icon: Zap,
    monthly: 99,
    annual: 79,
    color: "#00d4ff",
    popular: false,
    desc: "For curious traders entering the AI era",
    features: [
      { text: "50 AI signals/day (15min delay)", ok: true },
      { text: "5 watchlist assets",              ok: true },
      { text: "Daily AI market brief",           ok: true },
      { text: "Basic portfolio tracker",         ok: true },
      { text: "Email alerts",                    ok: true },
      { text: "Community Discord",               ok: true },
      { text: "Real-time signals",               ok: false },
      { text: "Copy trading",                    ok: false },
      { text: "AI advisor chat",                 ok: false },
      { text: "API access",                      ok: false },
    ],
    cta: "Start Free Trial",
    note: "No credit card required",
  },
  {
    name: "Pro",
    icon: Crown,
    monthly: 299,
    annual: 239,
    color: "#8b5cf6",
    popular: true,
    desc: "For serious traders who want a real edge",
    features: [
      { text: "Unlimited real-time signals",          ok: true },
      { text: "500+ asset coverage",                  ok: true },
      { text: "AI portfolio advisor (unlimited chat)", ok: true },
      { text: "All alert channels (SMS, Telegram, push)", ok: true },
      { text: "Copy trading + social leaderboard",    ok: true },
      { text: "Risk-adjusted position sizing",        ok: true },
      { text: "Backtested strategy library (3yr)",    ok: true },
      { text: "Full analytics dashboard",             ok: true },
      { text: "Priority support (< 2h)",              ok: true },
      { text: "API access (read-only)",               ok: false },
    ],
    cta: "Start Free Trial",
    note: "7-day full access, cancel anytime",
  },
  {
    name: "Institutional",
    icon: Building2,
    monthly: 999,
    annual: 799,
    color: "#fbbf24",
    popular: false,
    desc: "For funds, prop desks, and power users",
    features: [
      { text: "Everything in Pro",                    ok: true },
      { text: "Full REST + WebSocket API",            ok: true },
      { text: "Custom signal fine-tuning",            ok: true },
      { text: "White-label dashboard option",         ok: true },
      { text: "Dedicated account manager",            ok: true },
      { text: "20-seat team access",                  ok: true },
      { text: "SLA: 99.99% uptime guarantee",        ok: true },
      { text: "Compliance reporting suite",           ok: true },
      { text: "Direct researcher access",             ok: true },
      { text: "Custom alert infrastructure",         ok: true },
    ],
    cta: "Book a Demo",
    note: "Custom invoicing available",
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-28 px-6 relative">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#8b5cf6]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#fbbf24]/30 bg-[#fbbf24]/8 mb-5">
            <Crown size={12} className="text-[#fbbf24]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#fbbf24]">Pricing</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#f8f8ff] mb-4">
            Less Than
            <br />
            <span className="gradient-text-gold">One Good Trade</span>
          </h2>
          <p className="text-[#707090] max-w-xl mx-auto mb-8">
            Our average Pro user recovers the subscription cost within 48 hours.
            Risk-free 7-day trial. No credit card needed.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl border border-white/8 bg-[#0a0a18]">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${!annual ? "bg-[#1a1a2e] text-[#f0f0f0] shadow-lg" : "text-[#505070]"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${annual ? "bg-[#1a1a2e] text-[#f0f0f0] shadow-lg" : "text-[#505070]"}`}
            >
              Annual
              <span className="text-[10px] text-[#10b981] bg-[#10b981]/10 px-1.5 py-0.5 rounded-full font-black">
                -20%
              </span>
            </button>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-5">
          {PLANS.map(({ name, icon: Icon, monthly, annual: annualPrice, color, popular, desc, features, cta, note }, i) => (
            <ScrollReveal key={name} delay={i * 0.1}>
              <div
                className={`relative rounded-2xl overflow-hidden card-lift h-full flex flex-col ${
                  popular ? "border-[#8b5cf6]/40 shadow-2xl" : "border-white/6"
                }`}
                style={{
                  border: popular ? "1px solid rgba(139,92,246,0.4)" : "1px solid rgba(255,255,255,0.06)",
                  background: popular ? "rgba(14,14,34,0.8)" : "rgba(10,10,20,0.6)",
                }}
              >
                {/* Popular gradient bar */}
                {popular && <div className="h-0.5 bg-gradient-to-r from-[#00d4ff] via-[#8b5cf6] to-[#00d4ff]" />}

                {/* Popular glow */}
                {popular && (
                  <div className="absolute inset-0 bg-gradient-to-b from-[#8b5cf6]/8 via-transparent to-transparent pointer-events-none" />
                )}

                {/* Popular badge */}
                {popular && (
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#8b5cf6] text-white">
                      <Star size={8} fill="white" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1 relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}14` }}>
                      <Icon size={17} style={{ color }} />
                    </div>
                    <span className="text-lg font-black text-[#f8f8ff]">{name}</span>
                  </div>
                  <p className="text-xs text-[#505070] mb-5">{desc}</p>

                  {/* Price */}
                  <div className="mb-5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black text-[#f8f8ff]">
                        €{annual ? annualPrice : monthly}
                      </span>
                      <span className="text-[#505070] text-sm">/mo</span>
                    </div>
                    {annual && (
                      <div className="text-[11px] text-[#10b981] mt-1 font-bold">
                        Billed €{annualPrice * 12}/yr · Save €{(monthly - annualPrice) * 12}
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <button
                    className={`w-full py-3 rounded-xl font-bold text-sm mb-5 transition-all duration-200 ${
                      popular
                        ? "bg-gradient-to-r from-[#8b5cf6] to-[#00d4ff] text-white hover:opacity-90 shadow-lg"
                        : "border border-white/10 text-[#9090b0] hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {cta}
                  </button>
                  <p className="text-center text-[10px] text-[#404060] mb-5">{note}</p>

                  {/* Features */}
                  <div className="space-y-2.5 flex-1">
                    {features.map(({ text, ok }) => (
                      <div key={text} className="flex items-start gap-2">
                        {ok
                          ? <Check size={13} className="shrink-0 mt-0.5" style={{ color }} />
                          : <X    size={13} className="shrink-0 mt-0.5 text-[#2a2a3a]" />
                        }
                        <span className={`text-xs leading-relaxed ${ok ? "text-[#9090b0]" : "text-[#3a3a4a] line-through"}`}>
                          {text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom note */}
        <ScrollReveal delay={0.3} className="mt-10 text-center">
          <div className="inline-flex flex-wrap gap-x-8 gap-y-2 items-center justify-center px-8 py-3 rounded-2xl glass border border-white/5 text-xs text-[#505070]">
            {[
              "✓ Cancel anytime",
              "✓ No contracts",
              "✓ Refund if not profitable in 30 days",
              "✓ Instant access after signup",
            ].map(t => <span key={t}>{t}</span>)}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
