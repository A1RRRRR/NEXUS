"use client";
import { useEffect, useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie,
} from "recharts";
import { BarChart2, Activity, Cpu, Database, TrendingUp } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

function genPortfolio() {
  let v = 10000;
  return Array.from({ length: 90 }, (_, i) => {
    v = Math.max(8500, v + (Math.random() - 0.37) * 380);
    const d = new Date(); d.setDate(d.getDate() - (90 - i));
    return {
      date:  d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      nexus: Math.round(v),
      bench: Math.round(10000 * Math.pow(1.0026, i)),
    };
  });
}

function genMonthly() {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return months.map(m => ({
    m,
    win:  parseFloat((Math.random() * 15 + 3).toFixed(1)),
    lose: parseFloat((Math.random() * 4 + 0.5).toFixed(1)),
  }));
}

const ALLOCATION = [
  { name: "Crypto",      val: 38, color: "#00d4ff" },
  { name: "Equities",   val: 32, color: "#8b5cf6" },
  { name: "Forex",      val: 18, color: "#10b981" },
  { name: "Commodities",val: 12, color: "#fbbf24" },
];

const TABS = ["Performance", "Monthly P&L", "Heatmap", "Allocation"] as const;
type Tab = typeof TABS[number];

function genHeatmap() {
  return [
    "BTC","ETH","SOL","AVAX","MATIC","LINK","DOT","ADA",
    "AAPL","NVDA","TSLA","META","MSFT","GOOGL","AMZN","SPY",
  ].map(n => ({ n, v: parseFloat(((Math.random() - 0.42) * 14).toFixed(2)) }));
}

const PortfolioTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const nexus = payload[0]?.value;
  const bench = payload[1]?.value;
  return (
    <div className="bg-[#0e0e22] border border-white/8 rounded-xl p-3 text-xs shadow-2xl">
      <div className="text-[#606080] mb-1.5">{label}</div>
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full bg-[#00d4ff]" />
        <span className="text-[#f0f0f0] font-bold">${nexus?.toLocaleString()}</span>
        <span className="text-[#10b981]">+{(((nexus - 10000)/10000)*100).toFixed(1)}%</span>
      </div>
      {bench && (
        <div className="flex items-center gap-2 text-[#404060]">
          <div className="w-2 h-2 rounded-full bg-[#505070]" />
          <span>Benchmark: ${bench?.toLocaleString()}</span>
        </div>
      )}
    </div>
  );
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("Performance");
  const [portfolio]  = useState(genPortfolio);
  const [monthly]    = useState(genMonthly);
  const [heatmap, setHeatmap] = useState(genHeatmap);

  useEffect(() => {
    if (activeTab !== "Heatmap") return;
    const id = setInterval(() => setHeatmap(genHeatmap()), 3500);
    return () => clearInterval(id);
  }, [activeTab]);

  const latest  = portfolio[portfolio.length - 1];
  const totalRet = (((latest.nexus - 10000) / 10000) * 100).toFixed(1);

  return (
    <section id="analytics" className="py-28 px-6 bg-[#06060e] relative">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="max-w-7xl mx-auto relative z-10">

        <ScrollReveal className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/8 mb-4">
                <BarChart2 size={12} className="text-[#00d4ff]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00d4ff]">Analytics Dashboard</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-[#f8f8ff] leading-tight">
                See Everything.
                <br />
                <span className="gradient-text">Miss Nothing.</span>
              </h2>
            </div>
            <p className="text-[#707090] max-w-xs text-sm leading-relaxed">
              Real-time portfolio tracking, P&L attribution, market heatmaps, and AI-driven risk analysis.
            </p>
          </div>
        </ScrollReveal>

        {/* KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Portfolio Value",   val: `$${latest.nexus.toLocaleString()}`, delta: `+${totalRet}% (90d)`,   icon: Activity, color: "#10b981" },
            { label: "AI-Generated Alpha",val: "+12.4%",   delta: "vs benchmark",       icon: Cpu,    color: "#00d4ff" },
            { label: "Active Positions",  val: "7",        delta: "4 long · 3 short",   icon: BarChart2, color: "#8b5cf6" },
            { label: "Data / Second",     val: "2.4M pts", delta: "Live processing",     icon: Database, color: "#fbbf24" },
          ].map(({ label, val, delta, icon: Icon, color }) => (
            <ScrollReveal key={label}>
              <div className="p-4 rounded-xl glass border border-white/5 card-lift group hover:border-white/10 transition-colors relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 0% 0%, ${color}10, transparent 60%)` }} />
                <div className="flex items-center justify-between mb-2 relative z-10">
                  <span className="text-[10px] text-[#505070] uppercase tracking-wider font-bold">{label}</span>
                  <Icon size={13} style={{ color }} />
                </div>
                <div className="text-xl font-black text-[#f8f8ff] relative z-10">{val}</div>
                <div className="text-[11px] mt-0.5 relative z-10 font-bold" style={{ color }}>{delta}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Main chart card */}
        <ScrollReveal>
          <div className="rounded-2xl glass-bright border border-white/6 overflow-hidden">
            {/* Tab bar */}
            <div className="flex border-b border-white/5 px-2 pt-2 gap-1 overflow-x-auto">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-t-lg whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab
                      ? "text-[#00d4ff] border-b-2 border-[#00d4ff] -mb-px"
                      : "text-[#404060] hover:text-[#9090b0]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-6">
              {/* PERFORMANCE */}
              {activeTab === "Performance" && (
                <>
                  <div className="flex items-end gap-4 mb-6">
                    <div>
                      <div className="text-3xl font-black text-[#f8f8ff]">${latest.nexus.toLocaleString()}</div>
                      <div className="text-sm text-[#10b981] font-bold flex items-center gap-1">
                        <TrendingUp size={13} /> +{totalRet}% since inception · Started $10,000
                      </div>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={portfolio} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="nexusGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00d4ff" stopOpacity={0.25} />
                          <stop offset="100%" stopColor="#00d4ff" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="benchGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.12} />
                          <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" tick={{ fill:"#303050", fontSize:9 }} axisLine={false} tickLine={false} interval={17} />
                      <YAxis tick={{ fill:"#303050", fontSize:9 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(1)}k`} />
                      <Tooltip content={<PortfolioTooltip />} />
                      <Area type="monotone" dataKey="nexus" stroke="#00d4ff" strokeWidth={2} fill="url(#nexusGrad)" />
                      <Area type="monotone" dataKey="bench" stroke="#505070" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#benchGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="flex gap-4 justify-end mt-2 text-[10px] text-[#404060]">
                    <div className="flex items-center gap-1.5"><div className="w-5 h-0.5 bg-[#00d4ff]" />NEXUS</div>
                    <div className="flex items-center gap-1.5"><div className="w-5 h-0.5 bg-[#505070] border-dashed border-t border-[#505070]" />Benchmark</div>
                  </div>
                </>
              )}

              {/* MONTHLY P&L */}
              {activeTab === "Monthly P&L" && (
                <>
                  <p className="text-xs text-[#404060] uppercase tracking-wider mb-6">Average monthly gain/loss by month (simulated)</p>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={monthly} barGap={2} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                      <XAxis dataKey="m" tick={{ fill:"#404060", fontSize:10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill:"#404060", fontSize:10 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                      <Tooltip
                        contentStyle={{ background:"#0e0e22", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, fontSize:11 }}
                        labelStyle={{ color:"#606080" }}
                      />
                      <Bar dataKey="win"  name="Win"  radius={[4,4,0,0]}>
                        {monthly.map((_, i) => <Cell key={i} fill="#10b981" fillOpacity={0.8} />)}
                      </Bar>
                      <Bar dataKey="lose" name="Loss" radius={[4,4,0,0]}>
                        {monthly.map((_, i) => <Cell key={i} fill="#f43f5e" fillOpacity={0.8} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </>
              )}

              {/* HEATMAP */}
              {activeTab === "Heatmap" && (
                <>
                  <p className="text-[10px] text-[#404060] uppercase tracking-widest mb-5">
                    24h performance · live refresh every 3.5s
                  </p>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                    {heatmap.map(({ n, v }) => {
                      const intensity = Math.min(Math.abs(v) / 12, 1);
                      const bg = v > 0
                        ? `rgba(16,185,129,${0.08 + intensity * 0.55})`
                        : `rgba(244,63,94,${0.08 + intensity * 0.55})`;
                      const tc = v > 0 ? "#10b981" : "#f43f5e";
                      return (
                        <div key={n} className="rounded-xl p-3 text-center cursor-pointer transition-all duration-700 hover:scale-105" style={{ background: bg }}>
                          <div className="text-xs font-black text-[#f0f0f0]">{n}</div>
                          <div className="text-[11px] font-bold mt-0.5" style={{ color: tc }}>
                            {v > 0 ? "+" : ""}{v}%
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* ALLOCATION */}
              {activeTab === "Allocation" && (
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <ResponsiveContainer width={200} height={200}>
                    <PieChart>
                      <Pie
                        data={ALLOCATION}
                        dataKey="val"
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        strokeWidth={0}
                      >
                        {ALLOCATION.map((e, i) => <Cell key={i} fill={e.color} fillOpacity={0.85} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex-1 space-y-3">
                    {ALLOCATION.map(({ name, val, color }) => (
                      <div key={name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[#9090b0] font-medium">{name}</span>
                          <span className="font-black" style={{ color }}>{val}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-700" style={{ width:`${val}%`, background: color }} />
                        </div>
                      </div>
                    ))}
                    <p className="text-[10px] text-[#404060] pt-2">
                      Portfolio AI auto-rebalances based on market regime detection.
                      Rotation happens algorithmically when regime confidence &gt; 85%.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
