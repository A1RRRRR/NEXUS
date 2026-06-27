import QuoteForm from "@/components/QuoteForm";
import { Phone, Clock, CheckCircle, Star } from "lucide-react";

const perks = [
  "Free estimate — no obligation, ever",
  "Response within 24 hours",
  "On-site inspection included",
  "Licensed & fully insured crew",
];

export default function QuotePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient pt-32 pb-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="badge mb-6">Free Estimate</span>
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              Get Your Free
              <br />
              <span className="gradient-text">Roofing Quote</span>
            </h1>
            <p className="text-xl text-slate-300">
              Tell us about your project. We&apos;ll come out, inspect, and deliver a
              detailed written estimate — usually within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Why us card */}
              <div className="card p-7">
                <h3 className="font-black text-brand-navy text-xl mb-5">
                  What to Expect
                </h3>
                <ul className="space-y-4">
                  {perks.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-orange-500 mt-0.5 shrink-0" />
                      <span className="text-slate-600 text-sm">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rating */}
              <div className="card p-7">
                <div className="flex stars text-2xl mb-2">★★★★★</div>
                <div className="text-3xl font-black text-brand-navy">5.0</div>
                <div className="text-sm text-slate-500">Based on 340+ reviews</div>
                <blockquote className="mt-4 text-sm text-slate-600 italic border-l-4 border-orange-400 pl-4">
                  &ldquo;Best contractor experience I&apos;ve ever had. Quote was detailed,
                  price was fair, and the roof looks amazing.&rdquo;
                  <footer className="mt-2 font-semibold text-orange-500 not-italic">— Kevin R.</footer>
                </blockquote>
              </div>

              {/* Emergency call */}
              <div className="bg-orange-gradient rounded-2xl p-7 text-white">
                <div className="flex items-center gap-2 font-black text-lg mb-2">
                  <Clock size={20} /> Emergency?
                </div>
                <p className="text-white/80 text-sm mb-4">
                  Don&apos;t fill out a form — call us right now. 24/7 emergency
                  service with 2-hour response.
                </p>
                <a
                  href="tel:+15558007663"
                  className="flex items-center gap-2 bg-white text-orange-600 font-black px-5 py-3 rounded-xl hover:bg-orange-50 transition-colors"
                >
                  <Phone size={18} />
                  (555) 800-ROOF
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
