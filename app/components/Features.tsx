"use client";
import { Brain, Zap, Shield, Globe, BarChart2, Bell, Users, Cpu } from "lucide-react";

const FEATURES = [
  {
    icon: Brain,
    title: "Neural Signal Engine",
    description: "Our proprietary AI processes 2.4M data points per second — on-chain flows, order book depth, sentiment, and macro. Results in signals 4-6 minutes before retail consensus.",
    color: "#7c3aed",
    badge: "Core",
  },
  {
    icon: Zap,
    title: "< 50ms Latency",
    description: "Co-located servers next to major exchange matching engines. By the time a human blinks, your alert is already on your phone.",
    color: "#00d4ff",
    badge: "Speed",
  },
  {
    icon: Shield,
    title: "Risk-Adjusted Signals",
    description: "Every signal includes position sizing, stop-loss levels, and drawdown probability. We don't just tell you to buy — we tell you exactly how much.",
    color: "#10b981",
    badge: "Safety",
  },
  {
    icon: Globe,
    title: "4,200+ Assets",
    description: "Crypto (spot + perps), US equities, forex, commodities, and ETFs. One platform. One interface. Everything tradeable.",
    color: "#f59e0b",
    badge: "Coverage",
  },
  {
    icon: BarChart2,
    title: "Backtested Transparency",
    description: "Every strategy has 3 years of audited backtests available. We show you the losing streaks too. No cherry-picking. No survivorship bias.",
    color: "#00d4ff",
    badge: "Trust",
  },
  {
    icon: Bell,
    title: "Multi-Channel Alerts",
    description: "Push notifications, SMS, email, Telegram, and webhook. Customize thresholds. Never miss a signal because you were away from your desk.",
    color: "#7c3aed",
    badge: "Delivery",
  },
  {
    icon: Users,
    title: "Social Leaderboard",
    description: "Follow elite traders with verified track records. One-click copy trading with automatic position sizing relative to your portfolio.",
    color: "#10b981",
    badge: "Social",
  },
  {
    icon: Cpu,
    title: "Portfolio AI Advisor",
    description: "Ask in plain English: 'Am I overexposed to tech?' or 'Rebalance me for a bear market.' The AI rebalances and explains every decision.",
    color: "#f59e0b",
    badge: "AI",
  },
];

export default function Features() {
  return (
    <section id="platform" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 mb-4">
            <Cpu size={12} className="text-[#10b981]" />
            <span className="text-xs text-[#10b981] font-medium uppercase tracking-widest">Everything Included</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#f0f0ff] mb-4">
            Institutional Tools.<br />
            <span className="shimmer-text">Retail Price.</span>
          </h2>
          <p className="text-[#6b7280] max-w-xl mx-auto">
            Bloomberg Terminal costs $28,000/year. Goldman Sachs analysts use tools like this.
            You can access the same intelligence for €299/month.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map(({ icon: Icon, title, description, color, badge }, i) => (
            <div
              key={title}
              className="relative p-5 rounded-xl border border-[#1a1a2e] bg-[#0d0d1a] card-hover group overflow-hidden"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                style={{ background: `radial-gradient(circle at 30% 30%, ${color}20, transparent 70%)` }}
              />

              <div className="relative z-10">
                {/* Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                    style={{ color, background: `${color}15`, border: `1px solid ${color}30` }}
                  >
                    {badge}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#f0f0ff] mb-2">{title}</h3>
                <p className="text-xs text-[#6b7280] leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
