"use client";
import { useEffect, useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line
} from "recharts";
import { BarChart2, Activity, Cpu, Database } from "lucide-react";

function generatePortfolioData() {
  let value = 10000;
  return Array.from({ length: 90 }, (_, i) => {
    const change = (Math.random() - 0.38) * 400;
    value = Math.max(8000, value + change);
    const date = new Date();
    date.setDate(date.getDate() - (90 - i));
    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: Math.round(value),
      benchmark: Math.round(10000 * (1 + i * 0.0035)),
    };
  });
}

function generateHeatmapData() {
  const assets = [
    "BTC", "ETH", "SOL", "AVAX", "MATIC", "LINK", "DOT", "ADA",
    "AAPL", "NVDA", "TSLA", "META", "MSFT", "GOOGL", "AMZN", "SPY",
  ];
  return assets.map((name) => ({
    name,
    change: parseFloat(((Math.random() - 0.42) * 12).toFixed(2)),
  }));
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const val = payload[0]?.value;
    const bench = payload[1]?.value;
    const pct = val && bench ? (((val - 10000) / 10000) * 100).toFixed(1) : "0";
    return (
      <div className="bg-[#0f0f1e] border border-[#2a2a3e] rounded-lg p-3 text-xs shadow-xl">
        <div className="text-[#6b7280] mb-1">{label}</div>
        <div className="text-[#00d4ff] font-bold">${val?.toLocaleString()}</div>
        <div className="text-[#10b981] font-bold">+{pct}% vs start</div>
        {bench && <div className="text-[#6b7280]">Benchmark: ${bench?.toLocaleString()}</div>}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [portfolioData] = useState(generatePortfolioData);
  const [heatmap, setHeatmap] = useState(generateHeatmapData);
  const [activeTab, setActiveTab] = useState<"portfolio" | "heatmap">("portfolio");

  useEffect(() => {
    const interval = setInterval(() => {
      setHeatmap(generateHeatmapData());
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const latestVal = portfolioData[portfolioData.length - 1]?.value ?? 10000;
  const totalReturn = (((latestVal - 10000) / 10000) * 100).toFixed(1);

  return (
    <section id="analytics" className="py-24 px-6 bg-[#070710] relative">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 mb-4">
            <BarChart2 size={12} className="text-[#00d4ff]" />
            <span className="text-xs text-[#00d4ff] font-medium uppercase tracking-widest">Analytics Dashboard</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#f0f0ff] mb-4">
            See Everything.<br />
            <span className="shimmer-text">Miss Nothing.</span>
          </h2>
          <p className="text-[#6b7280] max-w-xl">
            Real-time portfolio tracking, market heatmaps, and AI-driven performance attribution.
            Know exactly why you're winning (or losing) before it matters.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Portfolio Value", value: `$${latestVal.toLocaleString()}`, delta: `+${totalReturn}%`, icon: Activity, color: "#10b981" },
            { label: "AI-Generated Alpha", value: "+12.4%", delta: "vs benchmark", icon: Cpu, color: "#00d4ff" },
            { label: "Active Positions", value: "7", delta: "3 long · 4 short", icon: BarChart2, color: "#7c3aed" },
            { label: "Data Points/Sec", value: "2.4M", delta: "Live processing", icon: Database, color: "#f59e0b" },
          ].map(({ label, value, delta, icon: Icon, color }) => (
            <div
              key={label}
              className="p-4 rounded-xl border border-[#1a1a2e] bg-[#0d0d1a] card-hover"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[#6b7280] uppercase tracking-wider">{label}</span>
                <Icon size={14} style={{ color }} />
              </div>
              <div className="text-xl font-black text-[#f0f0ff]">{value}</div>
              <div className="text-xs mt-1" style={{ color }}>{delta}</div>
            </div>
          ))}
        </div>

        {/* Chart tabs */}
        <div className="rounded-2xl border border-[#1a1a2e] bg-[#0d0d1a] overflow-hidden">
          <div className="flex border-b border-[#1a1a2e] px-4 pt-4 gap-2">
            {(["portfolio", "heatmap"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-t-lg transition-colors ${
                  activeTab === tab
                    ? "text-[#00d4ff] border-b-2 border-[#00d4ff]"
                    : "text-[#4a4a6a] hover:text-[#9090b0]"
                }`}
              >
                {tab === "portfolio" ? "Portfolio Performance" : "Market Heatmap"}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === "portfolio" && (
              <div>
                <div className="flex items-end gap-4 mb-6">
                  <div>
                    <div className="text-3xl font-black text-[#f0f0ff]">${latestVal.toLocaleString()}</div>
                    <div className="text-sm text-[#10b981] font-bold">+{totalReturn}% since inception (90 days)</div>
                  </div>
                  <div className="text-xs text-[#4a4a6a] ml-auto">Started: $10,000 · NEXUS-managed</div>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={portfolioData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="nexusGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00d4ff" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#00d4ff" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="benchGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="date"
                      tick={{ fill: "#4a4a6a", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      interval={14}
                    />
                    <YAxis
                      tick={{ fill: "#4a4a6a", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#00d4ff"
                      strokeWidth={2}
                      fill="url(#nexusGrad)"
                    />
                    <Area
                      type="monotone"
                      dataKey="benchmark"
                      stroke="#7c3aed"
                      strokeWidth={1.5}
                      strokeDasharray="4 4"
                      fill="url(#benchGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="flex gap-4 mt-2 justify-end text-xs text-[#4a4a6a]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-px bg-[#00d4ff]" />
                    NEXUS Portfolio
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-px bg-[#7c3aed] border-dashed border-t border-[#7c3aed]" />
                    Market Benchmark
                  </div>
                </div>
              </div>
            )}

            {activeTab === "heatmap" && (
              <div>
                <p className="text-xs text-[#4a4a6a] mb-4 uppercase tracking-wider">24h performance · auto-refreshing every 4s</p>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                  {heatmap.map((asset) => {
                    const intensity = Math.min(Math.abs(asset.change) / 10, 1);
                    const bg = asset.change > 0
                      ? `rgba(16, 185, 129, ${0.1 + intensity * 0.5})`
                      : `rgba(239, 68, 68, ${0.1 + intensity * 0.5})`;
                    const textColor = asset.change > 0 ? "#10b981" : "#ef4444";
                    return (
                      <div
                        key={asset.name}
                        className="rounded-lg p-3 text-center transition-all duration-700 cursor-pointer hover:scale-105"
                        style={{ background: bg }}
                      >
                        <div className="text-xs font-black text-[#f0f0ff]">{asset.name}</div>
                        <div className="text-xs font-bold mt-1" style={{ color: textColor }}>
                          {asset.change > 0 ? "+" : ""}{asset.change}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
