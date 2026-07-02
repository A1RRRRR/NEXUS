"use client";
import { Brain, Zap, Shield, Globe, BarChart2, Bell, Users, Cpu, Layers, Lock, Smartphone, ArrowLeftRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const FEATURES = [
  {
    icon: Brain,
    title: "Neural Signal Engine",
    description: "Proprietary model processes 2.4M data points/sec. Detects market moves 4–6 minutes before retail consensus. Eight independent signal layers fused into one confidence score.",
    color: "#8b5cf6",
    badge: "Core AI",
    size: "large",
  },
  {
    icon: Zap,
    title: "< 50ms Latency",
    description: "Co-located servers next to exchange matching engines. By the time you blink, your alert has already arrived.",
    color: "#00d4ff",
    badge: "Speed",
    size: "small",
  },
  {
    icon: Shield,
    title: "Risk-Adjusted Sizing",
    description: "Kelly Criterion position sizing. Every signal includes stop-loss, 3-tier take-profit targets, and drawdown probability.",
    color: "#10b981",
    badge: "Safety",
    size: "small",
  },
  {
    icon: Globe,
    title: "4,200+ Assets",
    description: "Crypto spot + perps, US/EU equities, forex, commodities, and ETFs. One platform. One interface. Everything tradeable.",
    color: "#fbbf24",
    badge: "Coverage",
    size: "small",
  },
  {
    icon: BarChart2,
    title: "Full Backtest Transparency",
    description: "3-year audited results. We show the losing streaks too. No cherry-picking. No survivorship bias. Verifiable by any third party.",
    color: "#00d4ff",
    badge: "Trust",
    size: "small",
  },
  {
    icon: Bell,
    title: "Omni-Channel Alerts",
    description: "Push, SMS, email, Telegram, Discord webhook. Customize per-signal thresholds. Never miss an entry again.",
    color: "#8b5cf6",
    badge: "Delivery",
    size: "small",
  },
  {
    icon: Users,
    title: "Social Copy Trading",
    description: "Follow elite traders with verified on-platform track records. One-click copy with automatic size scaling to your portfolio.",
    color: "#10b981",
    badge: "Social",
    size: "small",
  },
  {
    icon: Cpu,
    title: "AI Portfolio Advisor",
    description: "Ask in plain English: 'Am I overexposed to tech?' The AI answers, rebalances, and explains every decision in full detail.",
    color: "#fbbf24",
    badge: "AI Chat",
    size: "small",
  },
  {
    icon: Layers,
    title: "On-Chain Intelligence",
    description: "Track whale wallets, exchange inflows/outflows, smart contract interactions, and DeFi liquidity shifts before they move price.",
    color: "#8b5cf6",
    badge: "Web3",
    size: "small",
  },
  {
    icon: ArrowLeftRight,
    title: "Broker API Integration",
    description: "Connect to 12+ brokers for one-click execution directly from the signal. From insight to trade in under 3 seconds.",
    color: "#00d4ff",
    badge: "Execution",
    size: "small",
  },
  {
    icon: Smartphone,
    title: "Native Mobile App",
    description: "iOS and Android with biometric auth, haptic alerts, and full signal management. Designed for traders who never leave their phone.",
    color: "#10b981",
    badge: "Mobile",
    size: "small",
  },
  {
    icon: Lock,
    title: "SOC 2 Certified",
    description: "End-to-end encryption, zero-knowledge architecture for portfolio data. We never see your broker credentials. Ever.",
    color: "#fbbf24",
    badge: "Security",
    size: "small",
  },
];

export default function Features() {
  return (
    <section id="platform" className="py-28 px-6 bg-[#06060e] relative">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#10b981]/30 bg-[#10b981]/8 mb-5">
            <Cpu size={12} className="text-[#10b981]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#10b981]">Platform Features</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#f8f8ff] mb-4">
            Institutional Tools.
            <br />
            <span className="gradient-text">Retail Price.</span>
          </h2>
          <p className="text-[#707090] max-w-xl mx-auto">
            Bloomberg Terminal: €28,000/year. NEXUS AI: €299/month.
            We built the same capabilities. We just removed the gatekeeping.
          </p>
        </ScrollReveal>

        {/* Featured large card + grid */}
        <div className="grid md:grid-cols-12 gap-4">
          {/* Hero feature */}
          <ScrollReveal className="md:col-span-5" direction="left">
            <div className="h-full relative rounded-2xl glass-bright border border-[#8b5cf6]/30 p-6 card-lift group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/10 to-transparent pointer-events-none" />
              <div className="absolute top-0 right-0 w-48 h-48 rounded-bl-full bg-[#8b5cf6]/6 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#8b5cf6]/15 border border-[#8b5cf6]/30 flex items-center justify-center">
                    <Brain size={26} className="text-[#8b5cf6]" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#8b5cf6]/15 text-[#8b5cf6] border border-[#8b5cf6]/30">
                    Core AI
                  </span>
                </div>

                <h3 className="text-2xl font-black text-[#f8f8ff] mb-3">Neural Signal Engine</h3>
                <p className="text-sm text-[#707090] leading-relaxed mb-6">
                  Our proprietary model fuses eight independent data layers — on-chain flows, whale wallets,
                  order book depth, funding rates, options flow, macro indicators, sentiment analysis,
                  and technical patterns — into a single confidence score. Signals arrive 4–6 minutes
                  before retail consensus. That's the alpha.
                </p>

                <div className="space-y-2">
                  {[
                    "On-chain + whale wallet tracking",
                    "Order book + funding rate fusion",
                    "Options flow & institutional positioning",
                    "89.3% win rate (3-year audit)",
                  ].map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs text-[#9090b0]">
                      <div className="w-1 h-1 rounded-full bg-[#8b5cf6]" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Small feature grid */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {FEATURES.slice(1).map(({ icon: Icon, title, description, color, badge }, i) => (
              <ScrollReveal key={title} delay={(i + 1) * 0.06} direction="up">
                <div className="relative p-4 rounded-xl glass border border-white/5 card-lift group overflow-hidden h-full">
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 0% 0%, ${color}10, transparent 60%)` }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}14` }}>
                        <Icon size={15} style={{ color }} />
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                        style={{ color, background: `${color}12` }}>
                        {badge}
                      </span>
                    </div>
                    <h3 className="text-xs font-black text-[#f0f0f0] mb-1.5">{title}</h3>
                    <p className="text-[10px] text-[#505070] leading-relaxed">{description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
