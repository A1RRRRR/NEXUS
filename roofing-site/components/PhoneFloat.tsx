"use client";
import { Phone } from "lucide-react";

export default function PhoneFloat() {
  return (
    <a
      href="tel:+15558007663"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 gradient-bg text-white font-bold px-5 py-4 rounded-full
                 shadow-[0_0_30px_rgba(255,101,0,0.5)] hover:scale-110 hover:shadow-[0_0_50px_rgba(255,101,0,0.7)]
                 transition-all duration-200 md:hidden animate-glow-pulse"
    >
      <Phone size={20} />
      <span className="text-sm">(555) 800-ROOF</span>
    </a>
  );
}
