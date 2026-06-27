import Link from "next/link";
import { Home, Building2, Wrench, Wind, Zap, Droplets, ArrowRight, CheckCircle } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Residential Roofing",
    tagline: "Protect what matters most.",
    desc: "Whether you need a full roof replacement or a targeted upgrade, we install premium asphalt shingles, metal roofing, and tile systems engineered to withstand decades of weather.",
    features: [
      "GAF Timberline HDZ® shingles — industry gold standard",
      "25–50 year manufacturer warranties",
      "Proper ventilation assessment included",
      "Full cleanup and haul-away",
      "Financing available from $0 down",
    ],
    color: "blue",
    accent: "bg-blue-500",
    light: "bg-blue-50",
  },
  {
    icon: Building2,
    title: "Commercial Roofing",
    tagline: "Protect your business, not just your building.",
    desc: "We specialize in flat and low-slope commercial roofing using TPO, EPDM, and modified bitumen systems. Minimal disruption. Maximum lifespan.",
    features: [
      "TPO, EPDM, modified bitumen, built-up roofing",
      "Single-ply membrane systems",
      "Drainage and ponding water solutions",
      "Weekend and after-hours scheduling available",
      "Preventive maintenance programs",
    ],
    color: "purple",
    accent: "bg-purple-500",
    light: "bg-purple-50",
  },
  {
    icon: Wrench,
    title: "Roof Repair & Maintenance",
    tagline: "Small fix now. Avoid a big bill later.",
    desc: "From a single broken shingle to widespread storm damage, our repair team diagnoses the root cause — not just the symptom. Most repairs are completed same day.",
    features: [
      "Leak detection and moisture mapping",
      "Shingle and tile replacement",
      "Flashing and chimney repair",
      "Skylight sealing",
      "Preventive annual inspections ($99)",
    ],
    color: "orange",
    accent: "bg-orange-500",
    light: "bg-orange-50",
  },
  {
    icon: Wind,
    title: "Storm Damage & Insurance Claims",
    tagline: "Let us handle the paperwork.",
    desc: "Hail, wind, or fallen trees — we document all damage, meet with your insurance adjuster, and fight for the full replacement value you're owed.",
    features: [
      "Free storm damage inspection",
      "Detailed insurance-grade photo documentation",
      "Adjuster meetings handled by our team",
      "Supplement claims to maximize your payout",
      "Works with all major insurers",
    ],
    color: "red",
    accent: "bg-red-500",
    light: "bg-red-50",
  },
  {
    icon: Zap,
    title: "24/7 Emergency Roofing",
    tagline: "We're there when you need us most.",
    desc: "A hole in your roof can't wait until Monday. Our emergency crew responds within 2 hours — day or night, weekends and holidays — with tarps, boards, and rapid repairs.",
    features: [
      "2-hour response time guaranteed",
      "Emergency tarping and board-up",
      "Temporary waterproofing",
      "Storm chasers not welcome — we're local",
      "Available 365 days a year",
    ],
    color: "yellow",
    accent: "bg-yellow-500",
    light: "bg-yellow-50",
  },
  {
    icon: Droplets,
    title: "Gutters & Exterior",
    tagline: "Complete protection from top to bottom.",
    desc: "Seamless gutters, leaf guards, fascia repair, soffit installation — we handle the entire exterior envelope so water goes where it's supposed to.",
    features: [
      "Seamless aluminum & copper gutters",
      "Gutter guard installation",
      "Fascia and soffit repair",
      "Downspout extensions",
      "Siding repair and replacement",
    ],
    color: "green",
    accent: "bg-green-500",
    light: "bg-green-50",
  },
];

const colorMap: Record<string, string> = {
  blue:   "text-blue-600",
  purple: "text-purple-600",
  orange: "text-orange-600",
  red:    "text-red-600",
  yellow: "text-yellow-600",
  green:  "text-green-600",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient pt-32 pb-20 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="badge mb-6">What We Offer</span>
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Expert Roofing
            <br />
            <span className="gradient-text">For Every Situation</span>
          </h1>
          <p className="text-xl text-slate-300">
            Residential or commercial, emergency or planned — ProRoof has the
            expertise, equipment, and experience to handle any roofing project.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            const isEven = i % 2 === 0;
            return (
              <div
                key={svc.title}
                className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 items-center`}
              >
                {/* Icon block */}
                <div className="lg:w-1/2 flex justify-center">
                  <div className={`${svc.light} rounded-3xl p-16 flex items-center justify-center`}>
                    <Icon size={120} className={colorMap[svc.color]} strokeWidth={1} />
                  </div>
                </div>

                {/* Content */}
                <div className="lg:w-1/2">
                  <span className={`${colorMap[svc.color]} font-bold uppercase tracking-widest text-sm`}>
                    {svc.tagline}
                  </span>
                  <h2 className="text-4xl font-black text-brand-navy mt-2 mb-4">{svc.title}</h2>
                  <p className="text-slate-500 leading-relaxed mb-8">{svc.desc}</p>
                  <ul className="space-y-3 mb-8">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <CheckCircle size={18} className={`${colorMap[svc.color]} mt-0.5 shrink-0`} />
                        <span className="text-slate-600 text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/quote" className="btn-primary">
                    Get a Free Quote <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-50 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-4xl font-black text-brand-navy mb-4">
            Not Sure What You Need?
          </h2>
          <p className="text-slate-500 mb-8">
            We&apos;ll come out, inspect your roof, and give you an honest assessment — free of charge.
            No upselling. No pressure. Just the facts.
          </p>
          <Link href="/quote" className="btn-primary text-lg">
            Schedule a Free Inspection <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
