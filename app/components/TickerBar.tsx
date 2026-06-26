"use client";
import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const BASE_TICKERS = [
  { symbol: "BTC/USD", price: 107842.5, change: 2.34 },
  { symbol: "ETH/USD", price: 3921.4, change: 1.87 },
  { symbol: "SOL/USD", price: 284.6, change: 4.12 },
  { symbol: "AAPL", price: 213.45, change: 0.93 },
  { symbol: "TSLA", price: 387.2, change: -1.42 },
  { symbol: "NVDA", price: 1284.5, change: 3.21 },
  { symbol: "SPY", price: 542.8, change: 0.45 },
  { symbol: "XRP/USD", price: 0.847, change: -0.83 },
  { symbol: "AVAX/USD", price: 48.92, change: 5.67 },
  { symbol: "MSFT", price: 429.1, change: 0.71 },
  { symbol: "META", price: 592.3, change: 2.14 },
  { symbol: "GOLD", price: 2401.5, change: 0.38 },
  { symbol: "EUR/USD", price: 1.0834, change: -0.12 },
  { symbol: "BNB/USD", price: 718.4, change: 1.94 },
  { symbol: "LINK/USD", price: 19.84, change: 3.45 },
];

export default function TickerBar() {
  const [tickers, setTickers] = useState(BASE_TICKERS);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prev) =>
        prev.map((t) => ({
          ...t,
          price: t.price * (1 + (Math.random() - 0.498) * 0.002),
          change: t.change + (Math.random() - 0.5) * 0.05,
        }))
      );
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const doubled = [...tickers, ...tickers];

  return (
    <div className="w-full bg-[#0d0d1a] border-b border-[#1a1a2e] overflow-hidden py-2 relative z-50">
      <div className="flex gap-8 animate-ticker w-max">
        {doubled.map((t, i) => (
          <div key={i} className="flex items-center gap-2 whitespace-nowrap px-3">
            <span className="text-xs font-bold text-[#f0f0ff] tracking-wider">{t.symbol}</span>
            <span className="text-xs font-mono text-[#a0a0c0]">
              ${t.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span
              className={`text-xs font-bold flex items-center gap-0.5 ${
                t.change >= 0 ? "text-[#10b981]" : "text-[#ef4444]"
              }`}
            >
              {t.change >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              {t.change >= 0 ? "+" : ""}
              {t.change.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
