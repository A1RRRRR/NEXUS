"use client";
import { useEffect, useRef, useState } from "react";
import { Brain, Clock, TrendingUp, TrendingDown, AlertCircle, Activity } from "lucide-react";
import MiniSparkline from "./MiniSparkline";
import ScrollReveal from "./ScrollReveal";

const SIGNAL_POOL = [
  { symbol: "BTC/USD",   type: "LONG",  confidence: 94.2, tf: "4H", reason: "Bull flag breakout + MACD cross + whale accumulation detected",     entry: 107200, tp: [108800, 110500, 114000], sl: 105800 },
  { symbol: "ETH/USD",   type: "LONG",  confidence: 88.7, tf: "1D", reason: "Accumulation zone retest + RSI bullish divergence + funding reset",   entry: 3850,   tp: [4100, 4350, 4800],     sl: 3680  },
  { symbol: "SOL/USD",   type: "LONG",  confidence: 91.3, tf: "1H", reason: "Support reclaim after 3-day consolidation + volume expansion",        entry: 278,    tp: [292, 305, 325],         sl: 268   },
  { symbol: "NVDA",      type: "LONG",  confidence: 85.6, tf: "1D", reason: "Earnings beat positioning + institutional accumulation detected",      entry: 1240,   tp: [1310, 1380, 1450],     sl: 1190  },
  { symbol: "XRP/USD",   type: "SHORT", confidence: 79.4, tf: "4H", reason: "Distribution at resistance + whale sell detected on-chain",            entry: 0.861,  tp: [0.82, 0.79, 0.74],     sl: 0.892 },
  { symbol: "AVAX/USD",  type: "LONG",  confidence: 86.9, tf: "4H", reason: "Breakout from 3-week consolidation + DeFi volume surge",              entry: 46.4,   tp: [50.2, 54.8, 61.0],     sl: 44.1  },
  { symbol: "TSLA",      type: "SHORT", confidence: 72.3, tf: "1D", reason: "Head & shoulders complete + institutional positioning data bearish",    entry: 394,    tp: [372, 355, 330],         sl: 412   },
  { symbol: "LINK/USD",  type: "LONG",  confidence: 83.1, tf: "1H", reason: "Cross-chain activity spike + technical breakout from descending wedge", entry: 19.2,   tp: [20.8, 22.4, 25.0],    sl: 18.4  },
  { symbol: "META",      type: "LONG",  confidence: 87.5, tf: "1D", reason: "AI revenue acceleration + price compression near support",              entry: 578,    tp: [610, 645, 700],         sl: 555   },
  { symbol: "MATIC/USD", type: "LONG",  confidence: 80.2, tf: "4H", reason: "Network activity surge + smart money inflow on L2",                   entry: 0.72,   tp: [0.79, 0.86, 0.96],     sl: 0.68  },
  { symbol: "DOGE/USD",  type: "LONG",  confidence: 76.8, tf: "4H", reason: "Retail sentiment flip + volume spike + Fibonacci retracement complete", entry: 0.178,  tp: [0.198, 0.215, 0.24],   sl: 0.169 },
  { symbol: "MSFT",      type: "LONG",  confidence: 84.1, tf: "1D", reason: "Cloud growth beat + AI segment expanding + institutional buying",       entry: 418,    tp: [440, 458, 480],         sl: 404   },
];

function generateSparkline(type: string, n = 20) {
  let v = 100;
  const trend = type === "LONG" ? 0.3 : -0.3;
  return Array.from({ length: n }, () => {
    v += trend + (Math.random() - 0.5) * 2;
    return Math.max(85, Math.min(115, v));
  });
}

function timeAgo(ms: number) {
  const s = Math.floor(ms / 1000);
  if (s < 60)  return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60)  return `${m}m ago`;
  return `${Math.floor(m / 60)}h ago`;
}

interface Signal {
  id: number;
  symbol: string;
  type: string;
  confidence: number;
  tf: string;
  reason: string;
  entry: number;
  tp: number[];
  sl: number;
  ts: number;
  status: "live" | "closed";
  gain: number;
  spark: number[];
}

export default function LiveSignals() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [now, setNow]         = useState(Date.now());
  const counter               = useRef(0);

  useEffect(() => {
    const init: Signal[] = SIGNAL_POOL.map((t, i) => ({
      ...t,
      id: counter.current++,
      ts: Date.now() - i * 84000,
      status: i < 7 ? "live" : "closed",
      gain: t.type === "LONG"
        ? parseFloat((Math.random() * 12 + 2).toFixed(1))
        : parseFloat((-(Math.random() * 8 + 2)).toFixed(1)),
      spark: generateSparkline(t.type),
    }));
    setSignals(init);

    const clock = setInterval(() => setNow(Date.now()), 1000);
    const inject = setInterval(() => {
      const tmpl = SIGNAL_POOL[Math.floor(Math.random() * SIGNAL_POOL.length)];
      const sig: Signal = {
        ...tmpl,
        id: counter.current++,
        ts: Date.now(),
        status: "live",
        gain: tmpl.type === "LONG"
          ? parseFloat((Math.random() * 14 + 1).toFixed(1))
          : parseFloat((-(Math.random() * 9 + 1)).toFixed(1)),
        spark: generateSparkline(tmpl.type),
        confidence: parseFloat((tmpl.confidence + (Math.random() - 0.5) * 4).toFixed(1)),
      };
      setSignals(p => [sig, ...p.slice(0, 15)]);
    }, 7000);

    return () => { clearInterval(clock); clearInterval(inject); };
  }, []);

  return (
    <section id="signals" className="py-28 px-6 relative">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="max-w-7xl mx-auto relative z-10">

        <ScrollReveal className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#8b5cf6]/30 bg-[#8b5cf6]/8 mb-4">
                <Brain size={12} className="text-[#8b5cf6]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8b5cf6]">Neural Signal Engine</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-[#f8f8ff] leading-tight">
                Live AI Signals
                <br />
                <span className="gradient-text text-3xl md:text-4xl font-bold">Real-Time · Explained · Actionable</span>
              </h2>
            </div>
            {/* Accuracy metrics */}
            <div className="flex gap-6 shrink-0">
              {[
                { label: "Win Rate",    val: "89.3%", color: "#10b981" },
                { label: "Avg Return",  val: "+7.4%", color: "#10b981" },
                { label: "Sharpe",      val: "3.84",  color: "#00d4ff" },
              ].map(m => (
                <div key={m.label} className="text-center">
                  <div className="text-2xl font-black" style={{ color: m.color }}>{m.val}</div>
                  <div className="text-[10px] text-[#404060] uppercase tracking-wider">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Signal grid */}
        <div className="grid md:grid-cols-2 gap-3">
          {signals.slice(0, 8).map((sig, i) => {
            const isLong  = sig.type === "LONG";
            const c       = isLong ? "#10b981" : "#f43f5e";
            const isNew   = Date.now() - sig.ts < 12000;

            return (
              <ScrollReveal key={sig.id} delay={i * 0.04}>
                <div
                  className={`relative group rounded-xl glass card-lift overflow-hidden transition-all duration-300 cursor-pointer ${
                    sig.status === "live" ? "border-[#00d4ff]/20" : "border-white/4"
                  }`}
                  style={{ border: `1px solid ${sig.status === "live" ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.04)"}` }}
                >
                  {/* Live shimmer on new signals */}
                  {isNew && (
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6]" />
                  )}

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 0% 50%, ${c}06, transparent 60%)` }}
                  />

                  <div className="p-4 flex gap-4">
                    {/* Left: info */}
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="font-black text-[#f8f8ff] text-base">{sig.symbol}</span>
                        <span
                          className="text-[10px] font-black px-2 py-0.5 rounded-md"
                          style={{ background: `${c}18`, color: c }}
                        >
                          {isLong ? "▲" : "▼"} {sig.type}
                        </span>
                        <span className="text-[10px] text-[#404060] border border-white/8 px-1.5 py-0.5 rounded font-mono">
                          {sig.tf}
                        </span>
                        {sig.status === "live" && (
                          <span className="flex items-center gap-1 text-[10px] text-[#10b981] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse-dot" />
                            LIVE
                          </span>
                        )}
                        {isNew && (
                          <span className="text-[10px] font-black text-[#00d4ff] bg-[#00d4ff]/10 px-1.5 py-0.5 rounded">
                            NEW
                          </span>
                        )}
                      </div>

                      {/* Reason */}
                      <p className="text-[11px] text-[#606080] mb-3 leading-relaxed">{sig.reason}</p>

                      {/* Entry / TP / SL */}
                      <div className="flex gap-3 mb-3 flex-wrap">
                        {[
                          { label: "Entry", val: sig.entry, color: "#b0b0d0" },
                          { label: "TP1",   val: sig.tp[0], color: "#10b981" },
                          { label: "SL",    val: sig.sl,    color: "#f43f5e" },
                        ].map(({ label, val, color }) => (
                          <div key={label}>
                            <div className="text-[9px] uppercase tracking-wider" style={{ color: "#404060" }}>{label}</div>
                            <div className="text-xs font-bold font-mono" style={{ color }}>
                              {val < 10 ? val.toFixed(4) : val < 100 ? val.toFixed(2) : val.toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Confidence bar */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-white/6 rounded-full overflow-hidden progress-bar">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${sig.confidence}%`,
                              background: `linear-gradient(to right, #8b5cf6, #00d4ff)`,
                            }}
                          />
                        </div>
                        <span className="text-[11px] font-bold text-[#00d4ff] shrink-0 w-10 text-right">
                          {sig.confidence.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    {/* Right: sparkline + gain */}
                    <div className="flex flex-col items-end justify-between shrink-0">
                      <div className={`text-xl font-black ${sig.gain > 0 ? "text-[#10b981] text-glow-green" : "text-[#f43f5e]"}`}>
                        {sig.gain > 0 ? "+" : ""}{sig.gain}%
                      </div>
                      <MiniSparkline data={sig.spark} color={c} width={90} height={36} />
                      <div className="flex items-center gap-1 text-[10px] text-[#404060]">
                        <Clock size={9} />
                        {timeAgo(now - sig.ts)}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Unlock CTA */}
        <ScrollReveal delay={0.3} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="text-xs text-[#505070] flex items-center gap-1.5">
            <AlertCircle size={12} className="text-[#fbbf24]" />
            Free users see signals with 15-min delay. Pro unlocks instant delivery.
          </p>
          <button className="px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] text-white hover:opacity-90 transition-opacity whitespace-nowrap">
            Unlock Real-Time →
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
}
