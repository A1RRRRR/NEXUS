"use client";
import { Check, X, Minus } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const ROWS = [
  { feature: "Real-time AI signals",           nexus: true,  tv: false,    bb: true,  diy: false },
  { feature: "Signal explanation / reasoning", nexus: true,  tv: false,    bb: false, diy: false },
  { feature: "On-chain data fusion",           nexus: true,  tv: false,    bb: false, diy: false },
  { feature: "Verified 3yr backtest",          nexus: true,  tv: null,     bb: true,  diy: false },
  { feature: "Auto position sizing",           nexus: true,  tv: false,    bb: false, diy: false },
  { feature: "Copy trading / social layer",    nexus: true,  tv: true,     bb: false, diy: false },
  { feature: "Multi-asset (crypto+equity+FX)", nexus: true,  tv: true,     bb: true,  diy: null  },
  { feature: "Portfolio AI advisor (chat)",    nexus: true,  tv: false,    bb: false, diy: false },
  { feature: "< 50ms alert delivery",          nexus: true,  tv: false,    bb: null,  diy: false },
  { feature: "Public live performance log",    nexus: true,  tv: false,    bb: false, diy: false },
  { feature: "Mobile native app",              nexus: true,  tv: true,     bb: true,  diy: null  },
  { feature: "API access",                     nexus: true,  tv: true,     bb: true,  diy: true  },
];

const TOOLS = [
  { name: "NEXUS AI",          price: "€299/mo",   highlight: true  },
  { name: "TradingView Pro",   price: "€59/mo",    highlight: false },
  { name: "Bloomberg Terminal",price: "€2,300/mo", highlight: false },
  { name: "DIY / Alerts",      price: "Time cost", highlight: false },
];

function Cell({ val }: { val: boolean | null }) {
  if (val === true)  return <Check size={15} className="text-[#10b981] mx-auto" />;
  if (val === null)  return <Minus size={15} className="text-[#404060] mx-auto" />;
  return <X size={15} className="text-[#303050] mx-auto" />;
}

export default function ComparisonTable() {
  return (
    <section className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#fbbf24]/30 bg-[#fbbf24]/8 mb-5">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#fbbf24]">Honest Comparison</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#f8f8ff] mb-4">
            Why Traders
            <br />
            <span className="gradient-text-gold">Switch to NEXUS</span>
          </h2>
          <p className="text-[#707090] max-w-xl mx-auto">
            We're not the cheapest. We're the only platform that fuses on-chain intelligence
            with explainable AI signals and a verified public track record.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              {/* Header */}
              <thead>
                <tr>
                  <th className="text-left py-4 px-4 text-xs text-[#404060] uppercase tracking-wider font-bold w-[36%]">
                    Feature
                  </th>
                  {TOOLS.map(({ name, price, highlight }) => (
                    <th
                      key={name}
                      className={`py-4 px-3 text-center relative ${highlight ? "bg-[#8b5cf6]/8 rounded-t-xl" : ""}`}
                    >
                      {highlight && (
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] rounded-t-xl" />
                      )}
                      <div className={`text-xs font-black ${highlight ? "text-[#f0f0f0]" : "text-[#505070]"}`}>
                        {name}
                      </div>
                      <div className={`text-[10px] mt-0.5 ${highlight ? "text-[#8b5cf6]" : "text-[#303050]"}`}>
                        {price}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map(({ feature, nexus, tv, bb, diy }, i) => (
                  <tr
                    key={feature}
                    className={`border-t border-white/4 ${i % 2 === 0 ? "bg-white/[0.01]" : ""}`}
                  >
                    <td className="py-3 px-4 text-xs text-[#9090b0]">{feature}</td>
                    <td className="py-3 px-3 bg-[#8b5cf6]/5"><Cell val={nexus} /></td>
                    <td className="py-3 px-3"><Cell val={tv} /></td>
                    <td className="py-3 px-3"><Cell val={bb} /></td>
                    <td className="py-3 px-3"><Cell val={diy} /></td>
                  </tr>
                ))}
              </tbody>
              {/* Footer row */}
              <tfoot>
                <tr className="border-t border-white/6">
                  <td className="py-4 px-4 text-xs text-[#404060] font-bold">Score</td>
                  <td className="py-4 px-3 text-center bg-[#8b5cf6]/8 rounded-b-xl">
                    <span className="text-lg font-black text-[#10b981]">12/12</span>
                  </td>
                  <td className="py-4 px-3 text-center">
                    <span className="text-base font-black text-[#404060]">5/12</span>
                  </td>
                  <td className="py-4 px-3 text-center">
                    <span className="text-base font-black text-[#404060]">5/12</span>
                  </td>
                  <td className="py-4 px-3 text-center">
                    <span className="text-base font-black text-[#404060]">2/12</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <p className="text-center text-[10px] text-[#303050] mt-4">
            ✓ verified · — partial / unknown · ✗ not available
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
