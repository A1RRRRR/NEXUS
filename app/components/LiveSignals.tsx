"use client";
import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Brain, AlertCircle, Clock } from "lucide-react";

const SIGNAL_TEMPLATES = [
  { symbol: "BTC/USD", type: "LONG", confidence: 94.2, timeframe: "4H", reason: "Bull flag breakout + MACD cross + volume spike", gain: 8.4 },
  { symbol: "ETH/USD", type: "LONG", confidence: 88.7, timeframe: "1D", reason: "Accumulation zone retest + RSI divergence", gain: 12.1 },
  { symbol: "SOL/USD", type: "LONG", confidence: 91.3, timeframe: "1H", reason: "Support reclaim + funding rate reset", gain: 6.7 },
  { symbol: "NVDA", type: "LONG", confidence: 85.6, timeframe: "1D", reason: "Earnings beat + institutional inflow detected", gain: 5.2 },
  { symbol: "XRP/USD", type: "SHORT", confidence: 79.4, timeframe: "4H", reason: "Distribution pattern + whale sell detected", gain: -4.1 },
  { symbol: "AVAX/USD", type: "LONG", confidence: 86.9, timeframe: "4H", reason: "Breakout from 3-week consolidation", gain: 9.8 },
  { symbol: "TSLA", type: "SHORT", confidence: 72.3, timeframe: "1D", reason: "Head & shoulders complete + volume confirmation", gain: -7.3 },
  { symbol: "LINK/USD", type: "LONG", confidence: 83.1, timeframe: "1H", reason: "Cross-chain activity surge + technical breakout", gain: 11.4 },
  { symbol: "META", type: "LONG", confidence: 87.5, timeframe: "1D", reason: "AI revenue acceleration + price compression", gain: 4.8 },
  { symbol: "MATIC/USD", type: "LONG", confidence: 80.2, timeframe: "4H", reason: "DeFi volume spike + institutional interest", gain: 7.6 },
];

function timeAgo(ms: number) {
  const secs = Math.floor(ms / 1000);
  if (secs < 60) return `${secs}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  return `${Math.floor(mins / 60)}h ago`;
}

interface Signal {
  id: number;
  symbol: string;
  type: string;
  confidence: number;
  timeframe: string;
  reason: string;
  gain: number;
  timestamp: number;
  status: "active" | "closed";
}

export default function LiveSignals() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    // Seed initial signals
    const initial = SIGNAL_TEMPLATES.map((t, i) => ({
      ...t,
      id: i,
      timestamp: Date.now() - i * 87000,
      status: i < 6 ? ("active" as const) : ("closed" as const),
    }));
    setSignals(initial);

    // Tick clock
    const clockInterval = setInterval(() => setNow(Date.now()), 1000);

    // Add new signals periodically
    let counter = SIGNAL_TEMPLATES.length;
    const signalInterval = setInterval(() => {
      const template = SIGNAL_TEMPLATES[Math.floor(Math.random() * SIGNAL_TEMPLATES.length)];
      const newSignal: Signal = {
        ...template,
        id: counter++,
        timestamp: Date.now(),
        status: "active",
        confidence: template.confidence + (Math.random() - 0.5) * 5,
      };
      setSignals((prev) => [newSignal, ...prev.slice(0, 14)]);
    }, 8000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(signalInterval);
    };
  }, []);

  return (
    <section id="signals" className="py-24 px-6 relative">
      {/* Section header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7c3aed]/10 border border-[#7c3aed]/30 mb-4">
              <Brain size={12} className="text-[#7c3aed]" />
              <span className="text-xs text-[#7c3aed] font-medium uppercase tracking-widest">Neural Signal Engine</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#f0f0ff]">
              Live AI Signals
            </h2>
            <p className="text-[#6b7280] mt-3 max-w-xl">
              Our model processes 2.4M data points per second across on-chain data,
              order books, sentiment, and macro indicators.
            </p>
          </div>

          {/* Live counter */}
          <div className="hidden md:flex flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse-glow" />
              <span className="text-sm font-bold text-[#10b981]">LIVE</span>
            </div>
            <span className="text-xs text-[#4a4a6a]">847 signals today</span>
          </div>
        </div>

        {/* Signal accuracy bar */}
        <div className="mb-8 p-4 rounded-xl border border-[#1a1a2e] bg-[#0d0d1a]/80 flex flex-wrap gap-6 items-center">
          {[
            { label: "Win Rate (30d)", value: "89.3%", color: "#10b981" },
            { label: "Avg Return", value: "+7.4%", color: "#10b981" },
            { label: "Max Drawdown", value: "-2.1%", color: "#f59e0b" },
            { label: "Sharpe Ratio", value: "3.84", color: "#00d4ff" },
          ].map((m) => (
            <div key={m.label} className="flex flex-col gap-0.5">
              <span className="text-xs text-[#6b7280] uppercase tracking-wider">{m.label}</span>
              <span className="text-lg font-black" style={{ color: m.color }}>{m.value}</span>
            </div>
          ))}
        </div>

        {/* Signal feed */}
        <div className="grid md:grid-cols-2 gap-3">
          {signals.slice(0, 8).map((signal) => (
            <div
              key={signal.id}
              className="group relative p-4 rounded-xl border bg-[#0d0d1a] card-hover overflow-hidden"
              style={{ borderColor: signal.status === "active" ? "rgba(0,212,255,0.2)" : "rgba(26,26,46,1)" }}
            >
              {/* Active glow */}
              {signal.status === "active" && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff]/5 to-transparent rounded-xl" />
              )}

              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Header row */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-black text-[#f0f0ff] text-base">{signal.symbol}</span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                        signal.type === "LONG"
                          ? "bg-[#10b981]/15 text-[#10b981]"
                          : "bg-[#ef4444]/15 text-[#ef4444]"
                      }`}
                    >
                      {signal.type === "LONG" ? "▲" : "▼"} {signal.type}
                    </span>
                    <span className="text-xs text-[#4a4a6a] border border-[#2a2a3e] px-1.5 py-0.5 rounded">
                      {signal.timeframe}
                    </span>
                    {signal.status === "active" && (
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse-glow" />
                        <span className="text-[10px] text-[#10b981] font-bold">ACTIVE</span>
                      </div>
                    )}
                  </div>

                  {/* Reason */}
                  <p className="text-xs text-[#6b7280] mb-3 leading-relaxed">{signal.reason}</p>

                  {/* Confidence bar */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-[#1a1a2e] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${signal.confidence}%`,
                          background: `linear-gradient(to right, #7c3aed, #00d4ff)`,
                        }}
                      />
                    </div>
                    <span className="text-xs font-bold text-[#00d4ff] w-12 text-right">
                      {signal.confidence.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Right side */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div
                    className={`text-lg font-black ${
                      signal.gain > 0 ? "text-[#10b981]" : "text-[#ef4444]"
                    }`}
                  >
                    {signal.gain > 0 ? "+" : ""}
                    {signal.gain.toFixed(1)}%
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-[#4a4a6a]">
                    <Clock size={10} />
                    {timeAgo(now - signal.timestamp)}
                  </div>
                  {signal.type === "LONG" ? (
                    <TrendingUp size={20} className="text-[#10b981]" />
                  ) : (
                    <TrendingDown size={20} className="text-[#ef4444]" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA below signals */}
        <div className="mt-8 text-center">
          <p className="text-[#5a5a7a] text-sm mb-4">
            <AlertCircle size={14} className="inline mr-1 text-[#f59e0b]" />
            Free users see signals with 15-minute delay. Pro users get instant delivery.
          </p>
          <button className="px-8 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white hover:opacity-90 transition-opacity">
            Unlock Real-Time Signals →
          </button>
        </div>
      </div>
    </section>
  );
}
