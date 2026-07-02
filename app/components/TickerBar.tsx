"use client";
import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const BASE = [
  { symbol: "BTC/USD",  price: 107842.5, change:  2.34 },
  { symbol: "ETH/USD",  price:   3921.4, change:  1.87 },
  { symbol: "SOL/USD",  price:    284.6, change:  4.12 },
  { symbol: "AAPL",     price:    213.5, change:  0.93 },
  { symbol: "TSLA",     price:    387.2, change: -1.42 },
  { symbol: "NVDA",     price:   1284.5, change:  3.21 },
  { symbol: "SPY",      price:    542.8, change:  0.45 },
  { symbol: "XRP/USD",  price:      0.847, change: -0.83 },
  { symbol: "AVAX/USD", price:     48.92, change:  5.67 },
  { symbol: "MSFT",     price:    429.1, change:  0.71 },
  { symbol: "META",     price:    592.3, change:  2.14 },
  { symbol: "GOLD",     price:   2401.5, change:  0.38 },
  { symbol: "EUR/USD",  price:     1.0834,change: -0.12 },
  { symbol: "BNB/USD",  price:    718.4, change:  1.94 },
  { symbol: "LINK/USD", price:     19.84, change:  3.45 },
  { symbol: "DOGE/USD", price:      0.186, change: 8.21 },
];

export default function TickerBar() {
  const [tickers, setTickers] = useState(BASE);

  useEffect(() => {
    const id = setInterval(() => {
      setTickers(prev =>
        prev.map(t => ({
          ...t,
          price:  t.price  * (1 + (Math.random() - 0.499) * 0.0018),
          change: Math.max(-15, Math.min(15, t.change + (Math.random() - 0.5) * 0.06)),
        }))
      );
    }, 1500);
    return () => clearInterval(id);
  }, []);

  const doubled = [...tickers, ...tickers];

  return (
    <div className="w-full h-[33px] bg-[#06060e] border-b border-white/5 overflow-hidden flex items-center fixed top-0 left-0 right-0 z-50">
      {/* Live badge */}
      <div className="shrink-0 flex items-center gap-1.5 px-4 border-r border-white/5 h-full bg-[#0a0a18]">
        <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse-dot" />
        <span className="text-[10px] font-black uppercase tracking-widest text-[#10b981]">Live</span>
      </div>

      <div className="ticker-wrap flex-1 overflow-hidden">
        <div className="flex gap-0 animate-ticker w-max">
          {doubled.map((t, i) => (
            <div key={i} className="flex items-center gap-2 px-5 border-r border-white/4 h-[33px]">
              <span className="text-[11px] font-bold text-[#f0f0ff] tracking-wide">{t.symbol}</span>
              <span className="text-[11px] font-mono text-[#8080a0]">
                {t.price < 10
                  ? t.price.toFixed(4)
                  : t.price < 100
                  ? t.price.toFixed(3)
                  : t.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className={`text-[10px] font-bold flex items-center gap-0.5 ${t.change >= 0 ? "text-[#10b981]" : "text-[#f43f5e]"}`}>
                {t.change >= 0 ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                {t.change >= 0 ? "+" : ""}{t.change.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
