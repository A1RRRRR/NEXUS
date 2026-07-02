import { Zap, X, GitBranch, Play, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#02020b]">
      {/* Newsletter strip */}
      <div className="border-b border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-black text-[#f0f0f0] mb-1">Get the free Weekly Edge Report</h3>
            <p className="text-sm text-[#505070]">Top 5 signals of the week + market regime analysis. 14,000+ readers. Zero spam.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 md:w-64 px-4 py-2.5 rounded-xl text-sm bg-[#0a0a18] border border-white/8 text-[#f0f0f0] placeholder-[#404060] focus:outline-none focus:border-[#00d4ff]/40 transition-colors"
            />
            <button className="px-4 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6] text-white whitespace-nowrap flex items-center gap-2 hover:opacity-90 transition-opacity">
              <Send size={14} /> Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-14">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00d4ff] to-[#8b5cf6] flex items-center justify-center">
                <Zap size={14} className="text-white" fill="white" />
              </div>
              <span className="font-black text-lg">
                <span className="text-[#00d4ff]">NEXUS</span>
                <span className="text-white"> AI</span>
              </span>
            </div>
            <p className="text-xs text-[#404060] leading-relaxed mb-4">
              Neural-grade market intelligence for elite traders worldwide.
              2.4M data points processed per second.
            </p>
            <div className="flex gap-3">
              {[X, GitBranch, Play].map((Icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-lg border border-white/8 flex items-center justify-center text-[#404060] hover:text-[#00d4ff] hover:border-[#00d4ff]/30 transition-all"
                >
                  <Icon size={13} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            { title: "Platform", links: ["Signal Engine","Portfolio AI","Analytics","Heatmaps","API Docs"] },
            { title: "Resources",links: ["Strategy Library","Backtest Database","Market Blog","Tutorials","Status"] },
            { title: "Company",  links: ["About","Careers","Press Kit","Affiliate Program","Legal"] },
            { title: "Support",  links: ["Help Center","Discord Community","Telegram","Contact","Trust & Safety"] },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#404060] mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-xs text-[#404060] hover:text-[#00d4ff] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-[#2a2a40]">
            © 2026 NEXUS AI Technologies Ltd. All rights reserved. · Registered in Ireland
          </p>
          <p className="text-[10px] text-[#2a2a40] max-w-md text-center md:text-right">
            Trading carries risk. Past signal performance does not guarantee future results.
            NEXUS AI provides informational data, not regulated financial advice.
            Always trade with capital you can afford to lose.
          </p>
        </div>
      </div>
    </footer>
  );
}
