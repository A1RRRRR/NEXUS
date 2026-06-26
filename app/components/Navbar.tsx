"use client";
import { useState, useEffect } from "react";
import { Zap, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#050508]/95 backdrop-blur-xl border-b border-[#1a1a2e]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] flex items-center justify-center">
              <Zap size={16} className="text-white" fill="white" />
            </div>
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] opacity-40 blur-md -z-10" />
          </div>
          <span className="text-xl font-black tracking-tight">
            <span className="text-[#00d4ff]">NEXUS</span>
            <span className="text-white"> AI</span>
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-sm text-[#9090b0]">
          {["Platform", "Signals", "Analytics", "Pricing", "Docs"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-[#00d4ff] transition-colors duration-200 font-medium"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button className="text-sm text-[#9090b0] hover:text-white px-4 py-2 transition-colors">
            Sign In
          </button>
          <button className="relative text-sm font-bold px-5 py-2 rounded-lg bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white overflow-hidden group">
            <span className="relative z-10">Start Free Trial</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed] to-[#00d4ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#9090b0]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0d0d1a] border-b border-[#1a1a2e] px-6 py-4 flex flex-col gap-4">
          {["Platform", "Signals", "Analytics", "Pricing", "Docs"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[#9090b0] hover:text-[#00d4ff] text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="text-sm font-bold px-5 py-2 rounded-lg bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white">
            Start Free Trial
          </button>
        </div>
      )}
    </nav>
  );
}
