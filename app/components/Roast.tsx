"use client";
import { useState } from "react";
import { TrendingUp, ShoppingCart, Wrench, Users, DollarSign, ChevronDown } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const PERSPECTIVES = [
  {
    id: 1,
    icon: TrendingUp,
    color: "#00d4ff",
    label: "Real-Time Market",
    title: "Is this niche actually hot right now?",
    verdict: "YES — but trust is the real product",
    verdictColor: "#fbbf24",
    body: [
      "AI trading tools are a verified $18.2B market growing at 34% CAGR through 2029. Retail traders are furious that institutions have had algorithmic edge for decades. NEXUS positions itself as the democratizer — that narrative works.",
      "However: the 'AI signal' space is littered with scams. Kaiju bots, pump-and-dump Discord groups, and fake backtests have poisoned the well. The moment a potential customer reads '89.3% win rate,' their first reaction is 'sure it is.' That's the real enemy.",
      "The white space: nobody at the €100-300/month tier offers transparent, audited, explained, multi-asset signals with a public live performance log. That gap is real. The question is whether you can earn trust faster than the noise kills you.",
      "Threat: TradingView has 150M users and is adding AI features. If they ship a dedicated signal product, you need to already own mindshare in the premium niche before that happens. Window is 18-24 months.",
    ],
  },
  {
    id: 2,
    icon: ShoppingCart,
    color: "#ef4444",
    label: "Buyer Perspective",
    title: "Would I actually pay €299/month for this?",
    verdict: "NOT without proof first",
    verdictColor: "#f43f5e",
    body: [
      "At €299/month I need one thing before I pull my card: independent proof. Not your testimonials. Not your backtests in screenshots. I want a live performance page I can bookmark and check daily — every signal, every outcome, no edits.",
      "The signal accuracy number means nothing without context. What asset class? What timeframe? What's counted as a 'win'? What were market conditions? Every scam Telegram group claims '85%+'. You need verifiability, not claims.",
      "What would make me buy instantly: A 7-day free trial with REAL-TIME signals. One signal that plays out correctly in front of my eyes. A public Myfxbook or similar third-party audit I can verify independently.",
      "The copy trading feature is your stickiest retention mechanic. If I make money from following someone on your platform, I will never cancel. Everything else is secondary to this. Build it extremely well.",
    ],
  },
  {
    id: 3,
    icon: Wrench,
    color: "#8b5cf6",
    label: "What I'd Change",
    title: "10 things I'd build to make this 100× better",
    verdict: "Critical upgrades needed",
    verdictColor: "#8b5cf6",
    body: [
      "1. PUBLIC LIVE LOG: Every signal, every outcome, every loss — in real-time, publicly. Counterintuitive but this single page will convert better than any testimonial.",
      "2. FREE TRIAL REDESIGN: Kill the 15-minute delay. Give 7 days of full Pro access, no card. The moment they feel real-time signals working, they pay.",
      "3. MOBILE NATIVE APP: Traders live on their phones. Web is fine for research. Alerts and execution need iOS/Android native with haptic feedback for high-confidence signals.",
      "4. SIGNAL EXPLAINER OVERLAY: Don't just say 'LONG BTC'. Show the chart. Highlight the pattern. Label what the AI saw. Show the 3 historical times this setup appeared and what happened.",
      "5. PAPER TRADING MODE: Let users run signals with fake money. The moment they see paper +20% in a week, they pay for real. This is the highest-converting feature you're missing.",
      "6. LOSS TRANSPARENCY PAGE: A dedicated page showing every losing signal with post-mortem. This one page does more for trust than 1,000 winning testimonials.",
      "7. REFERRAL PROGRAM: Traders talk in closed groups. 30% commission for 12 months turns your best users into a distributed sales team that operates without payroll.",
      "8. BROKER INTEGRATION + TAKE RATE: Partner with 5 brokers. One-click execution from the signal. Take 0.1% of each trade volume. At scale this eclipses subscription revenue.",
      "9. COMMUNITY AS MOAT: A Discord/Telegram where elite traders discuss positions in real-time is stickier than any feature. Host monthly strategy calls. Build parasocial loyalty.",
      "10. REGIME DETECTION UI: Show users when the AI has shifted to 'bear market mode' vs 'bull mode' vs 'high volatility mode'. This builds trust that the system is adaptive, not static.",
    ],
  },
  {
    id: 4,
    icon: Users,
    color: "#10b981",
    label: "Competitive Landscape",
    title: "How bad is the competition really?",
    verdict: "Scary — but a gap clearly exists",
    verdictColor: "#fbbf24",
    body: [
      "Bloomberg Terminal (€2,300+/mo): Institutional-only UX, no AI-native signal layer, not built for individual traders. The most ripe incumbent for disruption.",
      "TradingView (€59/mo): Chart-first. 150M users. Loyal community. AI features are bolt-ons, not core. Their signal layer is weak. Weakness: not explainable, not multi-asset AI.",
      "Koyfin (free-€500): Data-rich but AI-poor. Small team, slow AI roadmap. Opportunity window: 18-24 months before they catch up.",
      "3Commas/Pionex/Bitsgap: Bot-focused, not signal-focused. Different workflow, different buyer psychology. Not direct competitors at your tier.",
      "Telegram signal channels: 50K+ exist. 98% are scams or pump schemes. You differentiate with transparency, verification, and institutional-grade methodology.",
      "Go-to-market bet: Partner with 5 finance creators (combined 500K+ audience) on performance-based deals. They run signals live on their channels. Public validation from trusted voices converts better than any ad spend.",
    ],
  },
  {
    id: 5,
    icon: DollarSign,
    color: "#fbbf24",
    label: "Revenue Reality Check",
    title: "Is €350,000/month actually achievable?",
    verdict: "Yes — but it's 18-24 months, not 6",
    verdictColor: "#10b981",
    body: [
      "The math: €350K/month at €299 Pro = 1,170 paying subscribers. That's a real number. There are Discord trading communities with 50K+ members. You need 2.3% conversion from a reasonably-sized engaged audience.",
      "Realistic milestones: Months 1-3 (trust building, free users, content); 4-6 (first 200 paying); 7-12 (500 subscribers); 13-18 (1,000 subscribers); 19-24 (€350K run rate). This is a 2-year play, not 6 months.",
      "Warning: Fintech CAC runs €100-500 depending on channel. To acquire 1,200 customers you need €120K-600K in marketing capital. Bootstrap option: affiliate-only (30% commission) costs zero upfront but grows slower.",
      "The real €350K path isn't subscriptions alone. It's the data layer. At 12,000 users generating real trading signals and portfolio data, you have a dataset worth €3-8M to hedge funds. Data licensing is a second business inside this one.",
      "The actual revenue ceiling is not €350K. With verified track record + institutional tier + data licensing + broker take-rate: €2-5M/month ARR is achievable by year 4-5. You stated the floor, not the ceiling.",
      "The thing that kills you: one high-profile signal that loses big for a large cohort simultaneously. Risk management can never fail publicly. Build this infrastructure before you have 10,000 users, not after.",
    ],
  },
];

export default function Roast() {
  const [open, setOpen] = useState<number | null>(1);

  return (
    <section className="py-28 px-6 bg-[#06060e] relative">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#f43f5e]/30 bg-[#f43f5e]/8 mb-5">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f43f5e]">Brutal Honest Evaluation</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#f8f8ff] mb-4">
            5 Perspectives.
            <br />
            <span className="text-[#f43f5e]">Zero Sugarcoating.</span>
          </h2>
          <p className="text-[#707090]">
            Every investor, competitor, and skeptical customer is thinking this.
            Better to face it now than discover it in your churn data.
          </p>
        </ScrollReveal>

        <div className="space-y-2">
          {PERSPECTIVES.map(({ id, icon: Icon, color, label, title, verdict, verdictColor, body }) => (
            <ScrollReveal key={id} delay={id * 0.08}>
              <div
                className={`rounded-xl overflow-hidden transition-all duration-300 ${
                  open === id ? "bg-[#0a0a1c]" : "bg-[#07071a]"
                }`}
                style={{ border: open === id ? `1px solid ${color}25` : "1px solid rgba(255,255,255,0.04)" }}
              >
                <button
                  onClick={() => setOpen(open === id ? null : id)}
                  className="w-full p-5 text-left flex items-center gap-4 hover:bg-white/2 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}12` }}>
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-0.5" style={{ color }}>
                      {id} · {label}
                    </div>
                    <div className="text-sm font-bold text-[#d0d0e8] leading-tight">{title}</div>
                  </div>
                  <div
                    className="hidden sm:block text-[10px] font-black px-3 py-1 rounded-full shrink-0"
                    style={{ color: verdictColor, background: `${verdictColor}12` }}
                  >
                    {verdict}
                  </div>
                  <ChevronDown
                    size={15}
                    className="shrink-0 text-[#404060] transition-transform duration-300"
                    style={{ transform: open === id ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>

                {open === id && (
                  <div className="px-5 pb-5 border-t border-white/4">
                    <div className="pt-4">
                      <div className="text-[10px] font-black uppercase tracking-wider mb-3" style={{ color: verdictColor }}>
                        VERDICT: {verdict}
                      </div>
                      <div className="space-y-3">
                        {body.map((p, i) => (
                          <p key={i} className="text-sm text-[#7070a0] leading-relaxed">{p}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
