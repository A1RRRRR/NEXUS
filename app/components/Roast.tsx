"use client";
import { useState } from "react";
import {
  TrendingUp, ShoppingCart, Wrench, Users, DollarSign, ChevronDown
} from "lucide-react";

const PERSPECTIVES = [
  {
    id: 1,
    icon: TrendingUp,
    color: "#00d4ff",
    label: "Real-Time Market",
    title: "Is the niche actually hot right now?",
    verdict: "YES — but with serious caveats",
    verdictColor: "#f59e0b",
    body: [
      "AI trading tools are a verified $18.2B market growing at 34% CAGR through 2029. Retail traders are furious that institutions have had algorithmic edge for decades — NEXUS positions itself as the democratizer.",
      "However: the 'AI signal' space is littered with scams. Kaiju bots, pump-and-dump Discord servers, and fake backtests have poisoned the well. The #1 job is not feature-building — it's trust-building.",
      "Opportunity: Nobody in this space offers full methodology transparency + real-time audited performance. That white space is your moat, if you fill it aggressively.",
      "Threat: TradingView has 150M users and is adding AI fast. If they ship a signal product, you need to already own mindshare in the premium segment.",
    ],
  },
  {
    id: 2,
    icon: ShoppingCart,
    color: "#ef4444",
    label: "Buyer Perspective",
    title: "Would I actually pay for this?",
    verdict: "NOT YET — you need to prove it first",
    verdictColor: "#ef4444",
    body: [
      "At €299/month I need one thing: proof that it works. Not backtest screenshots. Not testimonials you wrote yourself. I want a LIVE verified track record on a third-party platform (FX Blue, Myfxbook, Collective2).",
      "The signal accuracy of '89.3%' is completely meaningless without knowing: what asset class, what timeframe, what market conditions, and what a 'win' is defined as. Every scam service claims 80%+.",
      "What would make me pull out my card: A free 7-day trial with REAL-TIME signals (not delayed). One signal that plays out correctly in front of my eyes. A live performance page I can bookmark and check daily.",
      "The copy trading feature is the stickiest retention tool you have. If I make money from following someone on your platform, I will never cancel. That's the product-market fit you should optimize toward.",
    ],
  },
  {
    id: 3,
    icon: Wrench,
    color: "#7c3aed",
    label: "What I'd Change",
    title: "10 things I'd build differently",
    verdict: "Critical upgrades needed",
    verdictColor: "#7c3aed",
    body: [
      "1. TRUST ENGINE FIRST: Build a public, real-time, audited signal log before you sell anything. No hiding. Every signal, every result, every loss. Counter-intuitive but this is the best conversion funnel.",
      "2. FREE TIER IS WRONG: 15-minute delay destroys trust. Better: unlimited real-time signals for 7 days, then gate on asset count. Let them feel the product.",
      "3. MOBILE APP: Traders live on their phones. A web app is fine for research; alerts and execution need to be native iOS/Android with haptic alerts.",
      "4. SIGNAL EXPLAINABILITY: Don't just say 'LONG BTC.' Show me the graph. Highlight the pattern. Label the indicators. Show me the historical times this pattern appeared and what happened.",
      "5. PAPER TRADING MODE: Let users follow signals with fake money first. The moment they see paper +20% in a week, they will pay for real access.",
      "6. COMMUNITY AS MOAT: A Discord/Telegram with elite trader conversations is stickier than any feature. Host monthly calls. Build parasocial loyalty.",
      "7. REFERRAL PROGRAM: Traders talk. 30% commission for 12 months turns your best users into a sales force. This alone could 10x growth.",
      "8. LOSS TRANSPARENCY PAGE: Show every signal that didn't work and why. This one counterintuitive page will do more for conversion than any testimonial.",
      "9. BROKER INTEGRATION: Partner with 3-5 brokers for one-click execution from your signals. That's a category-defining feature that creates a completely different business model (take rate on trades).",
      "10. AI CHAT OVER DATA: Let me ask 'Should I hedge my ETH position if CPI prints hot tomorrow?' and get a specific, data-backed answer. That's the ChatGPT moment for trading.",
    ],
  },
  {
    id: 4,
    icon: Users,
    color: "#10b981",
    label: "Competition",
    title: "How bad is the competitive landscape?",
    verdict: "Scary — but there's a clear gap",
    verdictColor: "#f59e0b",
    body: [
      "Bloomberg Terminal ($28K/yr): Institutional only. No AI-native UX. Ripe for disruption at the pro-retail tier.",
      "TradingView ($60/mo): Chart-first, signal-second. 150M users but AI features are bolt-ons, not core. Loyal but not entrenched at the signal layer.",
      "Koyfin (free-to-$500): Data-rich, AI-poor. Their team is small, their AI roadmap is slow. Opportunity window: 18-24 months.",
      "3Commas/Pionex: Bot-focused, not signal-focused. Different workflow. Different buyer.",
      "Your gap: No one at the €99-299/month tier offers transparent, audited, AI-explained, multi-asset signals with social layer. That gap is real. The question is whether you can earn trust faster than the noise destroys it.",
      "GTM bet: Partner with 5 finance YouTubers/Twitter traders (500K+ combined audience) on performance-based deals. They track signals live on their channels. If it works publicly, you don't need a sales team.",
    ],
  },
  {
    id: 5,
    icon: DollarSign,
    color: "#f59e0b",
    label: "Revenue Reality",
    title: "Is €350,000/month actually achievable?",
    verdict: "Yes — but not how you think",
    verdictColor: "#10b981",
    body: [
      "Math: €350K/month at €299 Pro = 1,170 paying subscribers. That's achievable. There are trading communities with 50K+ members. You need 2.3% conversion from a reasonably-sized audience.",
      "Realistic timeline: Month 1-3 (trust building, free users, content); Month 4-6 (first 200 paying); Month 7-12 (scale to 500); Month 13-18 (1,000+); Month 19-24 (€350K run rate). This is an 18-24 month journey, not 6.",
      "The real €350K path isn't the app — it's the data. At 12,000 users generating real trading behavior, you have a dataset worth €5M+ to hedge funds. That's the second business inside this product.",
      "Customer Acquisition Cost warning: Fintech CAC runs €100-500. To acquire 1,200 customers you need €120K-600K in marketing. Either raise capital or grow through organic/affiliate-only — both are viable but slow.",
      "The thing that will actually kill you: one high-profile signal that loses big money for a large number of users simultaneously. This is a risk management product. Your risk management can never fail publicly.",
      "Revenue ceiling is NOT €350K. A verified track record + institutional tier + data licensing + broker take-rate model = €2-5M/month ARR within 4-5 years. The real opportunity is 10x bigger than you stated.",
    ],
  },
];

export default function Roast() {
  const [open, setOpen] = useState<number | null>(1);

  return (
    <section className="py-24 px-6 bg-[#070710] relative">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ef4444]/10 border border-[#ef4444]/30 mb-4">
            <span className="text-xs text-[#ef4444] font-medium uppercase tracking-widest">Brutal Honest Evaluation</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#f0f0ff] mb-4">
            5 Perspectives.<br />
            <span className="text-[#ef4444]">No Sugarcoating.</span>
          </h2>
          <p className="text-[#6b7280]">
            Every major investor, competitor, and skeptical customer is thinking this.
            Better to know it now than find out in churn.
          </p>
        </div>

        <div className="space-y-3">
          {PERSPECTIVES.map(({ id, icon: Icon, color, label, title, verdict, verdictColor, body }) => (
            <div
              key={id}
              className="rounded-xl border overflow-hidden transition-all duration-300"
              style={{ borderColor: open === id ? `${color}40` : "#1a1a2e" }}
            >
              <button
                onClick={() => setOpen(open === id ? null : id)}
                className="w-full p-5 text-left flex items-center gap-4 hover:bg-[#0d0d1a]/80 transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${color}15` }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color }}>
                    Perspective {id} · {label}
                  </div>
                  <div className="text-sm font-bold text-[#f0f0ff]">{title}</div>
                </div>
                <div className="hidden sm:block text-xs font-bold px-3 py-1 rounded-full shrink-0"
                  style={{ color: verdictColor, background: `${verdictColor}15` }}>
                  {verdict}
                </div>
                <ChevronDown
                  size={16}
                  className="text-[#4a4a6a] shrink-0 transition-transform duration-300"
                  style={{ transform: open === id ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>

              {open === id && (
                <div className="px-5 pb-5 space-y-3 border-t border-[#1a1a2e]">
                  <div className="pt-4">
                    <div className="text-xs font-bold mb-3" style={{ color: verdictColor }}>
                      VERDICT: {verdict}
                    </div>
                    {body.map((paragraph, i) => (
                      <p key={i} className="text-sm text-[#7a7a9a] leading-relaxed mb-3">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
