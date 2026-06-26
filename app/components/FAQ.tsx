"use client";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const FAQS = [
  {
    q: "How do I know the signals actually work and aren't cherry-picked?",
    a: "Every signal we've ever generated is logged publicly with timestamp, entry price, and outcome. No edits. No deletions. The 89.3% win rate is calculated across all signals in the last 30 days including losses — verified by our third-party auditor. You can also backtest any strategy yourself in the platform before trusting it with real money.",
  },
  {
    q: "What's the difference between Starter and Pro? Is the delay really that bad?",
    a: "On fast-moving assets like BTC or SOL, a 15-minute delay means you're entering after the majority of the move is done. Pro users consistently see 3-4× better entry prices. The delay exists so we can offer a meaningful free experience without giving away the real edge. Think of Starter as a proof-of-concept, not a real trading tool.",
  },
  {
    q: "I'm not a technical trader. Can I still use this?",
    a: "Yes. We designed the platform for this. Every signal includes a plain-English explanation: 'BTC is forming a bull flag after strong on-chain accumulation. Whales added 4,200 BTC to cold wallets in 48h. Enter now, set stop at $105,800.' You don't need to understand MACD or Fibonacci. The AI explains everything.",
  },
  {
    q: "What happens if a signal loses money?",
    a: "Stop-losses are included in every signal and auto-calculated using ATR (Average True Range). The AI targets a minimum 2:1 reward-to-risk ratio. Our worst single-month drawdown in 3 years was -4.2%. When the stop-loss fires, the loss is capped. This is the risk management that most retail traders ignore — and why our Sharpe ratio is 3.84.",
  },
  {
    q: "Is this legal? Am I receiving 'financial advice'?",
    a: "NEXUS AI provides informational signals and market analysis, not regulated financial advice. We're not a licensed investment advisor. Signals are data-driven insights — you decide whether to act on them. This is the same legal structure as platforms like TradingView, Bloomberg, or any research subscription service. We recommend consulting a financial advisor for personalized advice.",
  },
  {
    q: "Can I connect my broker and execute automatically?",
    a: "Yes, with the Institutional plan. The API supports automated execution via webhook to 12+ broker integrations including Interactive Brokers, Binance, Kraken, Coinbase, and more. Pro users get read-only API for custom dashboards. Auto-execution requires Institutional tier due to compliance requirements.",
  },
  {
    q: "How do you handle data security and privacy?",
    a: "We use zero-knowledge architecture for portfolio data — we never see your broker credentials. All data is AES-256 encrypted at rest and in transit. We don't sell or share user data. Our infrastructure is SOC 2 Type II certified. If we went offline tomorrow, your broker account would be completely unaffected — we hold no assets.",
  },
  {
    q: "What's the refund policy?",
    a: "If you follow our signals for 30 days and don't see a return that covers the subscription cost, we'll refund you — no questions asked. This applies to Pro plan only. To qualify, you need to have acted on at least 20 signals during the period. We're confident enough in our product to offer this because it almost never gets triggered.",
  },
  {
    q: "How is this different from crypto bots or Telegram signal groups?",
    a: "Three key differences: (1) Transparency — we publish every signal and outcome publicly. Signal groups cherry-pick wins. (2) Multi-asset — we cover crypto, stocks, forex, and commodities. Bots are usually crypto-only. (3) Explanation — we show the full AI reasoning behind every signal. A Telegram group gives you 'BTC LONG NOW' with a rocket emoji. We give you data.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-28 px-6 relative bg-[#06060e]">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="max-w-3xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/8 mb-5">
            <HelpCircle size={12} className="text-[#00d4ff]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00d4ff]">FAQ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#f8f8ff] mb-4">
            Every Objection.
            <br />
            <span className="gradient-text">Answered Honestly.</span>
          </h2>
          <p className="text-[#707090]">We know what you're thinking. Here are the real answers.</p>
        </ScrollReveal>

        <div className="space-y-2">
          {FAQS.map(({ q, a }, i) => (
            <ScrollReveal key={i} delay={i * 0.04}>
              <div
                className={`rounded-xl overflow-hidden transition-all duration-300 ${
                  open === i ? "border-[#00d4ff]/20 bg-[#0a0a1c]" : "border-white/5 bg-[#08081a]"
                }`}
                style={{ border: open === i ? "1px solid rgba(0,212,255,0.15)" : "1px solid rgba(255,255,255,0.04)" }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full px-5 py-4 text-left flex items-start gap-4 hover:bg-white/2 transition-colors"
                >
                  <span
                    className="shrink-0 w-5 h-5 rounded-full border border-[#00d4ff]/30 flex items-center justify-center text-[9px] font-black text-[#00d4ff] mt-0.5"
                  >
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-sm font-bold text-[#d0d0e8] text-left">{q}</span>
                  <ChevronDown
                    size={16}
                    className="shrink-0 text-[#404060] mt-0.5 transition-transform duration-300"
                    style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>
                {open === i && (
                  <div className="px-5 pb-5 pl-14">
                    <p className="text-sm text-[#7070a0] leading-relaxed">{a}</p>
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
