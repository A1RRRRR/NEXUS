import Link from "next/link";
import { Phone, ArrowRight, CheckCircle, Star } from "lucide-react";

const perks = [
  "Free Estimates — No Obligation",
  "Licensed & Fully Insured",
  "Lifetime Workmanship Warranty",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80')",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Floating badge — top right */}
      <div className="absolute top-28 right-6 md:right-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white text-center hidden md:block">
        <div className="flex stars text-2xl justify-center">★★★★★</div>
        <div className="font-bold mt-1">5.0 Rating</div>
        <div className="text-xs text-slate-300">340+ Google Reviews</div>
      </div>

      {/* Emergency badge — bottom right */}
      <div className="absolute bottom-20 right-6 md:right-16 bg-red-600/90 backdrop-blur-md rounded-2xl p-4 text-white text-center hidden md:block animate-pulse-slow">
        <div className="font-black text-lg">24/7</div>
        <div className="text-xs font-semibold">EMERGENCY</div>
        <div className="text-xs opacity-80">Response</div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/40 text-orange-300 text-sm font-semibold px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
          <Star size={14} fill="currentColor" />
          <span>Voted #1 Roofing Company — 3 Years Running</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-6 font-display">
          Your Roof.
          <br />
          <span className="gradient-text">Our Expertise.</span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
          From emergency repairs to full replacements — ProRoof delivers
          <strong className="text-white"> premium quality roofing</strong> that
          protects your home for decades.
        </p>

        {/* Perks */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {perks.map((p) => (
            <div key={p} className="flex items-center gap-2 text-slate-200 text-sm">
              <CheckCircle size={16} className="text-orange-400 shrink-0" />
              <span>{p}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/quote" className="btn-primary text-lg px-10 py-5 w-full sm:w-auto">
            Get My Free Quote
            <ArrowRight size={20} />
          </Link>
          <a
            href="tel:+15558007663"
            className="btn-outline text-lg px-10 py-5 w-full sm:w-auto"
          >
            <Phone size={20} />
            (555) 800-ROOF
          </a>
        </div>

        {/* Social proof micro-text */}
        <p className="text-slate-400 text-sm mt-6">
          Trusted by <strong className="text-slate-200">500+ homeowners</strong> in the metro area ·
          Response within <strong className="text-slate-200">2 hours</strong>
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}
