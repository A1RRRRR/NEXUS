"use client";
import { useState, useEffect } from "react";
import { DollarSign, TrendingUp, Calculator } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function ROICalculator() {
  const [investment, setInvestment] = useState(10000);
  const [months, setMonths]         = useState(12);
  const [winRate, setWinRate]       = useState(89);
  const [avgGain, setAvgGain]       = useState(7.4);
  const [result, setResult]         = useState(0);
  const [benchmark, setBenchmark]   = useState(0);
  const [animating, setAnimating]   = useState(false);

  useEffect(() => {
    // Monthly compounding at win-rate adjusted gain
    const effectiveMonthly = (winRate / 100) * avgGain - ((1 - winRate / 100) * 2.1);
    const final = investment * Math.pow(1 + effectiveMonthly / 100, months);
    const bench = investment * Math.pow(1 + 0.008, months); // ~9.6% annual benchmark

    setAnimating(true);
    const dur = 800;
    const start = Date.now();
    const from = result;
    const fromB = benchmark;
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setResult(from + (final - from) * e);
      setBenchmark(fromB + (bench - fromB) * e);
      if (p < 1) requestAnimationFrame(tick);
      else setAnimating(false);
    };
    requestAnimationFrame(tick);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [investment, months, winRate, avgGain]);

  const profit  = result - investment;
  const roi     = ((result - investment) / investment) * 100;
  const vs      = result - benchmark;

  const sliders = [
    {
      label: "Starting Capital",
      value: investment,
      min: 1000, max: 100000, step: 500,
      display: `€${investment.toLocaleString()}`,
      color: "#00d4ff",
      onChange: (v: number) => setInvestment(v),
    },
    {
      label: "Time Horizon (months)",
      value: months,
      min: 1, max: 36, step: 1,
      display: `${months} months`,
      color: "#8b5cf6",
      onChange: (v: number) => setMonths(v),
    },
    {
      label: "Signal Win Rate (%)",
      value: winRate,
      min: 50, max: 99, step: 1,
      display: `${winRate}%`,
      color: "#10b981",
      onChange: (v: number) => setWinRate(v),
    },
    {
      label: "Avg Gain Per Signal (%)",
      value: avgGain,
      min: 1, max: 20, step: 0.1,
      display: `${avgGain.toFixed(1)}%`,
      color: "#fbbf24",
      onChange: (v: number) => setAvgGain(v),
    },
  ];

  return (
    <section className="py-28 px-6 bg-[#06060e] relative">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#10b981]/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#10b981]/30 bg-[#10b981]/8 mb-5">
            <Calculator size={12} className="text-[#10b981]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#10b981]">ROI Calculator</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#f8f8ff] mb-4">
            Calculate Your
            <br />
            <span className="gradient-text">Potential Returns</span>
          </h2>
          <p className="text-[#707090] max-w-xl mx-auto">
            Move the sliders. See what NEXUS can do for your capital.
            These are conservative estimates based on our 3-year audited backtest.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Sliders panel */}
          <ScrollReveal direction="left">
            <div className="glass-bright rounded-2xl p-6 space-y-6 border border-white/6">
              {sliders.map(({ label, value, min, max, step, display, color, onChange }) => (
                <div key={label}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#707090]">{label}</span>
                    <span className="text-sm font-black" style={{ color }}>{display}</span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min={min}
                      max={max}
                      step={step}
                      value={value}
                      onChange={e => onChange(parseFloat(e.target.value))}
                      className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, ${color} 0%, ${color} ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.08) ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.08) 100%)`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-[#303050] mt-1">
                    <span>{min.toLocaleString()}</span>
                    <span>{max.toLocaleString()}</span>
                  </div>
                </div>
              ))}

              {/* Preset buttons */}
              <div>
                <p className="text-[10px] text-[#404060] uppercase tracking-wider mb-2">Quick Presets</p>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { label: "Conservative", inv: 5000,  m: 6,  wr: 75, ag: 4.5 },
                    { label: "NEXUS Default", inv: 10000, m: 12, wr: 89, ag: 7.4 },
                    { label: "Aggressive",   inv: 25000, m: 24, wr: 89, ag: 10  },
                  ].map(p => (
                    <button
                      key={p.label}
                      onClick={() => {
                        setInvestment(p.inv);
                        setMonths(p.m);
                        setWinRate(p.wr);
                        setAvgGain(p.ag);
                      }}
                      className="text-[10px] font-bold px-3 py-1.5 rounded-lg border border-white/10 text-[#707090] hover:border-[#8b5cf6]/40 hover:text-[#8b5cf6] transition-all"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Results panel */}
          <ScrollReveal direction="right">
            <div className="space-y-4">
              {/* Main result card */}
              <div className="glass-bright rounded-2xl p-6 border-glow-green relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/8 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="text-xs text-[#505060] uppercase tracking-widest mb-1">Portfolio value after {months} months</div>
                  <div className="text-5xl font-black text-[#f8f8ff] mb-2">
                    €{result.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-[#10b981]" />
                    <span className="text-[#10b981] font-bold text-lg">
                      +€{profit.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} profit
                    </span>
                    <span className="text-[#10b981]/70 text-sm">({roi.toFixed(1)}% ROI)</span>
                  </div>
                </div>
              </div>

              {/* vs Benchmark */}
              <div className="glass rounded-2xl p-5 border border-white/6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-[#505060] uppercase tracking-wider">vs S&P500 Benchmark</span>
                  <span className="text-xs text-[#10b981] font-bold">NEXUS wins by</span>
                </div>
                <div className="text-3xl font-black text-[#10b981]">
                  +€{vs.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 rounded-sm bg-[#10b981]" />
                    <span className="text-[#707090] flex-1">NEXUS</span>
                    <span className="font-bold text-[#f0f0f0]">€{result.toLocaleString("en-US", { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 rounded-sm bg-[#505070]" />
                    <span className="text-[#707090] flex-1">S&P 500 (~9.6%/yr)</span>
                    <span className="font-bold text-[#606070]">€{benchmark.toLocaleString("en-US", { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>

              {/* Monthly subscription cost perspective */}
              <div className="glass rounded-2xl p-5 border border-white/6">
                <div className="text-xs text-[#505060] uppercase tracking-wider mb-2">Pro subscription cost over {months} months</div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-black text-[#fbbf24]">€{(299 * months).toLocaleString()}</div>
                    <div className="text-[10px] text-[#404060]">€299/month × {months} months</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-[#10b981]">
                      {((profit / (299 * months))).toFixed(0)}× ROI
                    </div>
                    <div className="text-[10px] text-[#404060]">on subscription cost</div>
                  </div>
                </div>
              </div>

              <button className="w-full py-4 rounded-2xl font-black text-base text-white bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] hover:opacity-90 transition-opacity shadow-2xl">
                Start Earning This → Free Trial
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <style jsx>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px; height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(0,212,255,0.5);
        }
        input[type=range]::-moz-range-thumb {
          width: 16px; height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 8px rgba(0,212,255,0.5);
        }
      `}</style>
    </section>
  );
}
