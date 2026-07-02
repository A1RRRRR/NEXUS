"use client";
import { useState, useEffect } from "react";
import { Zap, Menu, X, ChevronDown } from "lucide-react";

const NAV_ITEMS = [
  { label: "Platform", href: "#platform" },
  { label: "Signals",  href: "#signals"  },
  { label: "Analytics",href: "#analytics"},
  { label: "Pricing",  href: "#pricing"  },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActive]  = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = NAV_ITEMS.map(i => i.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-[33px] left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-[#02020b]/90 backdrop-blur-2xl border-b border-white/5 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00d4ff] to-[#8b5cf6] flex items-center justify-center glow-cyan transition-all duration-300 group-hover:scale-110">
              <Zap size={17} className="text-white" fill="white" />
            </div>
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-[#00d4ff] to-[#8b5cf6] opacity-30 blur-md -z-10 group-hover:opacity-50 transition-opacity" />
          </div>
          <div>
            <div className="text-xl font-black tracking-tight leading-none">
              <span className="text-[#00d4ff]">NEXUS</span>
              <span className="text-white"> AI</span>
            </div>
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#404060] leading-none mt-0.5">
              Market Intelligence
            </div>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ label, href }) => {
            const id = href.slice(1);
            return (
              <a
                key={label}
                href={href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeSection === id
                    ? "text-[#00d4ff]"
                    : "text-[#707090] hover:text-[#f0f0ff]"
                }`}
              >
                {activeSection === id && (
                  <span className="absolute inset-0 rounded-lg bg-[#00d4ff]/8" />
                )}
                {label}
              </a>
            );
          })}
        </div>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <button className="text-sm text-[#707090] hover:text-white px-4 py-2 transition-colors font-medium">
            Sign In
          </button>
          <button className="relative overflow-hidden text-sm font-bold px-5 py-2.5 rounded-xl text-white group">
            <span className="absolute inset-0 bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6]" />
            <span className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#00d4ff] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            <span className="relative z-10 flex items-center gap-1.5">
              Start Free Trial
              <span className="text-[10px] opacity-70">7 days</span>
            </span>
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#707090] hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-bright border-t border-white/5 px-6 py-5 flex flex-col gap-1">
          {NAV_ITEMS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="py-2.5 px-3 rounded-lg text-sm font-medium text-[#b0b0d0] hover:text-white hover:bg-white/5 transition-all"
            >
              {label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/5 mt-2 flex flex-col gap-2">
            <button className="text-sm font-medium text-[#707090] py-2">Sign In</button>
            <button className="w-full py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#00d4ff] to-[#8b5cf6]">
              Start Free Trial
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
