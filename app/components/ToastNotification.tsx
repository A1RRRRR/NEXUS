"use client";
import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Zap, Users } from "lucide-react";

interface Toast {
  id: number;
  type: "win" | "loss" | "join" | "signal";
  message: string;
  sub: string;
  color: string;
  icon: typeof TrendingUp;
}

const TEMPLATES = [
  { type: "win",    message: "+€2,840 in 4 hours",    sub: "Marcus R. · BTC Long 4H",         color: "#10b981", icon: TrendingUp },
  { type: "signal", message: "New Signal: SOL LONG",  sub: "Confidence 94.2% · 1H timeframe",  color: "#00d4ff", icon: Zap },
  { type: "join",   message: "23 traders joined",     sub: "In the last 5 minutes",             color: "#8b5cf6", icon: Users },
  { type: "win",    message: "+€847 realized",        sub: "Kofi M. · ETH Long 1D",            color: "#10b981", icon: TrendingUp },
  { type: "signal", message: "New Signal: NVDA LONG", sub: "Confidence 88.7% · 1D timeframe",  color: "#00d4ff", icon: Zap },
  { type: "win",    message: "+€4,120 this week",     sub: "Sophie L. · 7-trade streak",       color: "#10b981", icon: TrendingUp },
  { type: "signal", message: "AVAX breakout alert",   sub: "Confidence 91.3% · Pattern match", color: "#00d4ff", icon: Zap },
  { type: "join",   message: "847 signals sent today", sub: "97.4% delivered under 200ms",     color: "#8b5cf6", icon: Users },
  { type: "win",    message: "+12.4% this month",     sub: "Anna P. · Portfolio AI mode",      color: "#fbbf24", icon: TrendingUp },
  { type: "loss",   message: "Signal closed -1.8%",   sub: "Auto stop-loss triggered · Safe",  color: "#f43f5e", icon: TrendingDown },
] as const;

export default function ToastNotification() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  let counter = 0;

  useEffect(() => {
    const spawn = () => {
      const tmpl = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
      const toast: Toast = { ...tmpl, id: counter++ };
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 4500);
    };

    // First one after 3s, then random 8-18s
    const first = setTimeout(spawn, 3000);
    const interval = setInterval(spawn, 10000 + Math.random() * 8000);

    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map((t) => {
        const Icon = t.icon;
        return (
          <div
            key={t.id}
            className="animate-pop-in flex items-center gap-3 px-4 py-3 rounded-xl glass-bright max-w-xs"
            style={{ borderColor: `${t.color}30`, border: `1px solid ${t.color}30` }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `${t.color}20` }}
            >
              <Icon size={14} style={{ color: t.color }} />
            </div>
            <div>
              <div className="text-xs font-bold text-[#f0f0ff]">{t.message}</div>
              <div className="text-[10px] text-[#606080]">{t.sub}</div>
            </div>
            <div
              className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse-dot"
              style={{ background: t.color, color: t.color }}
            />
          </div>
        );
      })}
    </div>
  );
}
