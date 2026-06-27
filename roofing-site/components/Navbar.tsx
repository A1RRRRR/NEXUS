"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, Zap } from "lucide-react";

const navLinks = [
  { href: "/",         label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery",  label: "Gallery" },
  { href: "/about",    label: "About" },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-white/5 py-3 shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-orange rounded-xl animate-glow-pulse opacity-50" />
              <div className="relative w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                <Zap size={20} className="text-white fill-white" />
              </div>
            </div>
            <span className="text-white font-black text-2xl font-display tracking-tight">
              Pro<span className="gradient-text">Roof</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-white/70 hover:text-white font-medium transition-colors duration-200
                           after:absolute after:bottom-0 after:left-0 after:h-px after:w-0
                           after:bg-orange after:transition-all after:duration-300
                           hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+15558007663"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
            >
              <Phone size={15} className="text-orange" />
              <span className="font-semibold">(555) 800-ROOF</span>
            </a>
            <Link
              href="/quote"
              className="relative overflow-hidden gradient-bg text-white font-bold px-6 py-2.5 rounded-lg text-sm
                         hover:scale-105 hover:shadow-[0_0_30px_rgba(255,101,0,0.5)] transition-all duration-200"
            >
              Free Quote
            </Link>
          </div>

          {/* Hamburger */}
          <button className="md:hidden text-white p-2" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-white/5 mt-2">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/70 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg font-medium transition-all"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-white/10">
              <Link
                href="/quote"
                className="block gradient-bg text-white font-bold text-center py-3 rounded-xl"
                onClick={() => setOpen(false)}
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
