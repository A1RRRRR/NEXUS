import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a2e] py-12 px-6 bg-[#050508]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] flex items-center justify-center">
                <Zap size={13} className="text-white" fill="white" />
              </div>
              <span className="font-black text-lg">
                <span className="text-[#00d4ff]">NEXUS</span>
                <span className="text-white"> AI</span>
              </span>
            </div>
            <p className="text-xs text-[#4a4a6a] leading-relaxed">
              Neural-grade market intelligence for elite traders.
              Processing 2.4M data points per second.
            </p>
          </div>

          {[
            {
              title: "Platform",
              links: ["Signal Engine", "Portfolio AI", "Analytics", "Alerts", "API Docs"],
            },
            {
              title: "Company",
              links: ["About", "Careers", "Blog", "Press Kit", "Legal"],
            },
            {
              title: "Support",
              links: ["Help Center", "Discord", "Status", "Contact", "Trust & Safety"],
            },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#6b7280] mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs text-[#4a4a6a] hover:text-[#00d4ff] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#1a1a2e] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#3a3a5a]">
            © 2026 NEXUS AI Technologies. All rights reserved.
          </p>
          <p className="text-xs text-[#3a3a5a] max-w-md text-center md:text-right">
            Trading involves risk. Past signal performance does not guarantee future results.
            This platform is for informational purposes only, not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
