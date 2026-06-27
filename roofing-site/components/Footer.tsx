import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Star } from "lucide-react";

const services = [
  "Residential Roofing",
  "Commercial Roofing",
  "Roof Repair",
  "Roof Replacement",
  "Gutter Installation",
  "Emergency Services",
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      {/* Top emergency bar */}
      <div className="bg-orange-gradient py-3">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <span className="font-bold text-white">
            🚨 24/7 Emergency Roofing — Storm damage? We respond in 2 hours.
          </span>
          <a
            href="tel:+15558007663"
            className="font-black text-white underline underline-offset-2 hover:no-underline whitespace-nowrap"
          >
            (555) 800-ROOF
          </a>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-orange-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-lg">P</span>
              </div>
              <span className="text-white font-black text-xl font-display">
                Pro<span className="gradient-text">Roof</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Your trusted roofing experts since 2004. Licensed, insured, and committed
              to quality workmanship on every project.
            </p>
            {/* Stars */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex stars text-lg">★★★★★</div>
              <span className="text-sm text-slate-300 font-medium">5.0 · 340+ Reviews</span>
            </div>
            {/* Social */}
            <div className="flex gap-3">
              {[Facebook, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-white mb-5 uppercase tracking-wider text-sm">
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-slate-400 hover:text-orange-400 transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="text-orange-500">›</span> {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-bold text-white mb-5 uppercase tracking-wider text-sm">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/gallery", label: "Project Gallery" },
                { href: "/quote", label: "Free Quote" },
                { href: "#", label: "Financing Options" },
                { href: "#", label: "Warranty Info" },
              ].map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-orange-400 transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="text-orange-500">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white mb-5 uppercase tracking-wider text-sm">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+15558007663"
                  className="flex items-start gap-3 text-slate-300 hover:text-orange-400 transition-colors"
                >
                  <Phone size={18} className="text-orange-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="font-bold text-white">(555) 800-ROOF</div>
                    <div className="text-xs text-slate-400">Mon–Sat 7am–7pm | Emergency 24/7</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@proroof.com"
                  className="flex items-start gap-3 text-slate-300 hover:text-orange-400 transition-colors"
                >
                  <Mail size={18} className="text-orange-400 mt-0.5 shrink-0" />
                  <span className="text-sm">info@proroof.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-slate-300">
                  <MapPin size={18} className="text-orange-400 mt-0.5 shrink-0" />
                  <div className="text-sm">
                    <div>123 Rooftop Ave</div>
                    <div>Your City, ST 00000</div>
                  </div>
                </div>
              </li>
            </ul>

            {/* License badge */}
            <div className="mt-6 border border-white/10 rounded-xl p-4 bg-white/5">
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Credentials</div>
              <div className="text-sm font-medium text-white">License #ROO-123456</div>
              <div className="text-xs text-slate-400 mt-1">
                GAF Certified · BBB A+ · Fully Insured
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-sm">
          <span>© {new Date().getFullYear()} ProRoof. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
