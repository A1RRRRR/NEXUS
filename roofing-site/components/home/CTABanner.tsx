import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-24 bg-orange-gradient relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full" />

      <div className="relative max-w-4xl mx-auto px-4 text-center text-white">
        <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white text-sm font-bold px-4 py-2 rounded-full mb-8">
          🚀 Limited Spots This Month
        </div>
        <h2 className="text-4xl md:text-6xl font-black mb-6 font-display leading-tight">
          Ready for a Roof You Can Be Proud Of?
        </h2>
        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          Get a free, no-pressure estimate today. Most quotes delivered within 24 hours.
          Financing available. We beat any written quote.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 bg-white text-orange-600 font-black px-10 py-5 rounded-lg hover:bg-orange-50 hover:scale-105 transition-all duration-200 shadow-2xl text-lg w-full sm:w-auto justify-center"
          >
            Get My Free Estimate
            <ArrowRight size={20} />
          </Link>
          <a
            href="tel:+15558007663"
            className="inline-flex items-center gap-2 border-2 border-white text-white font-black px-10 py-5 rounded-lg hover:bg-white/10 transition-all duration-200 text-lg w-full sm:w-auto justify-center"
          >
            <Phone size={20} />
            (555) 800-ROOF
          </a>
        </div>

        <p className="text-white/60 text-sm mt-6">
          No salespeople. No pressure. Just honest roofing advice.
        </p>
      </div>
    </section>
  );
}
