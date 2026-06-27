"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brand-navy/95 backdrop-blur-md shadow-2xl py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-orange-gradient rounded-lg flex items-center justify-center shadow-orange-glow group-hover:scale-110 transition-transform">
              <span className="text-white font-black text-lg">P</span>
            </div>
            <div>
              <span className="text-white font-black text-xl tracking-tight font-display">
                Pro<span className="gradient-text">Roof</span>
              </span>
              <p className="text-orange-400 text-xs font-medium -mt-0.5 hidden sm:block">
                Licensed &amp; Insured
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + phone */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+15558007663"
              className="flex items-center gap-2 text-white hover:text-orange-400 transition-colors"
            >
              <Phone size={16} className="text-orange-400" />
              <span className="font-semibold text-sm">(555) 800-ROOF</span>
            </a>
            <Link href="/quote" className="btn-primary text-sm px-6 py-3">
              Free Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-brand-navy/98 backdrop-blur-md border-t border-white/10 mt-2">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-200 hover:text-white hover:bg-white/5 px-4 py-3 rounded-lg font-medium transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-3">
              <a
                href="tel:+15558007663"
                className="flex items-center gap-2 text-white font-semibold px-4"
              >
                <Phone size={18} className="text-orange-400" />
                (555) 800-ROOF
              </a>
              <Link
                href="/quote"
                className="btn-primary justify-center"
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
