"use client";
import { useState } from "react";
import { Check, Zap, Crown, Building } from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    icon: Zap,
    monthly: 99,
    annual: 79,
    color: "#00d4ff",
    popular: false,
    description: "For individuals exploring AI signals",
    features: [
      "50 signals/day (15min delay)",
      "5 assets watchlist",
      "Daily market briefing",
      "Basic portfolio tracker",
      "Email alerts only",
      "Community Discord access",
      "3 months of signal history",
    ],
    missing: ["Real-time signals", "Copy trading", "API access", "Priority support"],
    cta: "Start Free Trial",
  },
  {
    name: "Pro",
    icon: Crown,
    monthly: 299,
    annual: 239,
    color: "#7c3aed",
    popular: true,
    description: "For serious traders who want an edge",
    features: [
      "Unlimited real-time signals",
      "500+ assets coverage",
      "AI portfolio advisor (chat)",
      "Multi-channel alerts (SMS, Telegram, push)",
      "Social leaderboard + copy trading",
      "Risk-adjusted position sizing",
      "Backtested strategy library",
      "Full analytics dashboard",
      "Priority support (< 2h response)",
      "2 years signal history",
    ],
    missing: ["API access", "Custom models", "Dedicated account manager"],
    cta: "Start Free Trial",
  },
  {
    name: "Institutional",
    icon: Building,
    monthly: 999,
    annual: 799,
    color: "#f59e0b",
    popular: false,
    description: "For funds, prop desks, and power users",
    features: [
      "Everything in Pro",
      "Full REST + WebSocket API",
      "Custom signal fine-tuning",
      "White-label dashboard",
      "Dedicated account manager",
      "Custom alert thresholds",
      "Multi-seat team access (up to 20)",
      "SLA: 99.99% uptime guarantee",
      "Compliance reporting suite",
      "Direct alpha researcher access",
    ],
    missing: [],
    cta: "Book a Demo",
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  const annualRevenue = {
    starter: 99,
    pro: 299,
    inst: 999,
  };

  return (
    <section id="pricing" className="py-24 px-6 bg-[#070710] relative">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/30 mb-4">
            <Crown size={12} className="text-[#f59e0b]" />
            <span className="text-xs text-[#f59e0b] font-medium uppercase tracking-widest">Simple Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#f0f0ff] mb-4">
            Pay Less Than
            <br />
            <span className="shimmer-text">One Winning Trade</span>
          </h2>
          <p className="text-[#6b7280] max-w-xl mx-auto mb-8">
            Our average Pro user makes back the monthly subscription cost within the first 48 hours.
            Risk-free 7-day trial. Cancel anytime.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-xl border border-[#2a2a3e] bg-[#0d0d1a]">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                !annual ? "bg-[#1a1a2e] text-[#f0f0ff]" : "text-[#6b7280]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                annual ? "bg-[#1a1a2e] text-[#f0f0ff]" : "text-[#6b7280]"
              }`}
            >
              Annual
              <span className="ml-2 text-[10px] text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map(({ name, icon: Icon, monthly, annual: annualPrice, color, popular, description, features, missing, cta }) => (
            <div
              key={name}
              className={`relative rounded-2xl border ${
                popular
                  ? "border-[#7c3aed]/60"
                  : "border-[#1a1a2e]"
              } bg-[#0d0d1a] overflow-hidden card-hover`}
            >
              {/* Popular badge */}
              {popular && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00d4ff] via-[#7c3aed] to-[#00d4ff]" />
              )}
              {popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#00d4ff] text-white">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Glow for popular */}
              {popular && (
                <div className="absolute inset-0 bg-gradient-to-b from-[#7c3aed]/8 to-transparent pointer-events-none" />
              )}

              <div className="p-6 relative z-10">
                {/* Header */}
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${color}15` }}
                  >
                    <Icon size={16} style={{ color }} />
                  </div>
                  <span className="font-black text-lg text-[#f0f0ff]">{name}</span>
                </div>
                <p className="text-xs text-[#6b7280] mb-6">{description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black text-[#f0f0ff]">
                      €{annual ? annualPrice : monthly}
                    </span>
                    <span className="text-[#6b7280] text-sm mb-1">/month</span>
                  </div>
                  {annual && (
                    <div className="text-xs text-[#10b981] mt-1">
                      Billed €{annualPrice * 12}/year · Save €{(monthly - annualPrice) * 12}
                    </div>
                  )}
                </div>

                {/* CTA */}
                <button
                  className={`w-full py-3 rounded-xl font-bold text-sm mb-6 transition-all ${
                    popular
                      ? "bg-gradient-to-r from-[#7c3aed] to-[#00d4ff] text-white hover:opacity-90"
                      : "border border-[#2a2a3e] text-[#9090b0] hover:border-[#4a4a6a] hover:text-white"
                  }`}
                >
                  {cta}
                </button>

                {/* Features */}
                <div className="space-y-2.5">
                  {features.map((f) => (
                    <div key={f} className="flex items-start gap-2 text-xs text-[#9090b0]">
                      <Check size={12} className="shrink-0 mt-0.5" style={{ color }} />
                      {f}
                    </div>
                  ))}
                  {missing.map((f) => (
                    <div key={f} className="flex items-start gap-2 text-xs text-[#3a3a5a] line-through">
                      <div className="w-3 h-3 shrink-0 mt-0.5 rounded-full border border-[#3a3a5a]" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Revenue math callout */}
        <div className="mt-12 p-6 rounded-2xl border border-[#1a1a2e] bg-[#0d0d1a]/80 text-center">
          <p className="text-sm text-[#6b7280]">
            Trusted by <span className="text-[#00d4ff] font-bold">12,847</span> traders ·&nbsp;
            <span className="text-[#10b981] font-bold">€4.2M+</span> in subscriber profits this month ·&nbsp;
            <span className="text-[#f59e0b] font-bold">89.3%</span> signal accuracy (30-day audit)
          </p>
        </div>
      </div>
    </section>
  );
}
