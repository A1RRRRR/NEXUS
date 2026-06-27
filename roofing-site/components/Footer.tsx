import Link from "next/link";
import { Phone, Mail, MapPin, Zap } from "lucide-react";

const services = ["Residential Roofing","Commercial Roofing","Roof Repair","Storm Damage","Emergency Service","Gutters & Exterior"];

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/5">
      {/* Emergency bar */}
      <div className="gradient-bg py-3">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
          <span className="font-bold text-white text-sm">
            🚨 24/7 Emergency Roofing — Storm damage? We respond in 2 hours guaranteed.
          </span>
          <a href="tel:+15558007663" className="font-black text-white underline underline-offset-2 whitespace-nowrap hover:no-underline">
            (555) 800-ROOF
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                <Zap size={18} className="text-white fill-white" />
              </div>
              <span className="text-white font-black text-xl font-display">
                Pro<span className="gradient-text">Roof</span>
              </span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed mb-5">
              Your trusted roofing experts since 2004. Licensed, insured, and committed to quality workmanship on every single project.
            </p>
            <div className="flex text-orange text-xl mb-2">★★★★★</div>
            <div className="text-white/30 text-xs">5.0 · 340+ Google Reviews</div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-5">Services</h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <Link href="/services"
                    className="text-white/30 hover:text-orange transition-colors text-sm flex items-center gap-2">
                    <span className="text-orange/50 text-xs">›</span> {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-5">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                {href:"/",label:"Home"},{href:"/about",label:"About Us"},
                {href:"/gallery",label:"Gallery"},{href:"/quote",label:"Free Quote"},
                {href:"#",label:"Financing"},{href:"#",label:"Warranty Info"},
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href}
                    className="text-white/30 hover:text-orange transition-colors text-sm flex items-center gap-2">
                    <span className="text-orange/50 text-xs">›</span> {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-5">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:+15558007663" className="flex items-start gap-3 text-white/30 hover:text-orange transition-colors">
                  <Phone size={16} className="text-orange mt-0.5 shrink-0" />
                  <div>
                    <div className="text-white font-bold text-sm">(555) 800-ROOF</div>
                    <div className="text-xs">Mon–Sat 7am–7pm · Emergency 24/7</div>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:info@proroof.com" className="flex items-start gap-3 text-white/30 hover:text-orange transition-colors">
                  <Mail size={16} className="text-orange mt-0.5 shrink-0" />
                  <span className="text-sm">info@proroof.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/30">
                <MapPin size={16} className="text-orange mt-0.5 shrink-0" />
                <span className="text-sm">123 Rooftop Ave, Your City, ST 00000</span>
              </li>
            </ul>

            <div className="mt-6 glass-orange rounded-xl p-4">
              <div className="text-orange text-xs font-bold uppercase tracking-wider mb-1">Credentials</div>
              <div className="text-white text-sm font-semibold">License #ROO-123456</div>
              <div className="text-white/30 text-xs mt-1">GAF Certified · BBB A+ · Fully Insured</div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/20 text-xs">
          <span>© {new Date().getFullYear()} ProRoof. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-orange transition-colors">Privacy</a>
            <a href="#" className="hover:text-orange transition-colors">Terms</a>
            <a href="#" className="hover:text-orange transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
