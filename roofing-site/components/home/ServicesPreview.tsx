import Link from "next/link";
import { Home, Building2, Wrench, Wind, Zap, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Residential Roofing",
    desc: "Asphalt shingles, metal, tile — beautiful roofs that last 30+ years and boost curb appeal.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: Building2,
    title: "Commercial Roofing",
    desc: "TPO, EPDM, flat roofing systems for businesses of any size. Minimal disruption guaranteed.",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    icon: Wrench,
    title: "Roof Repair",
    desc: "Leak detection, shingle replacement, flashing repair. Most repairs completed same day.",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: Wind,
    title: "Storm Damage",
    desc: "Insurance claim specialists. We work directly with your insurer so you don't have to.",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: Zap,
    title: "Emergency Service",
    desc: "Tarping, board-up, and emergency repairs within 2 hours — 24/7, 365 days a year.",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
  },
  {
    icon: Home,
    title: "Gutters & Siding",
    desc: "Complete exterior packages with seamless gutters, guards, fascia, and siding repair.",
    color: "text-green-500",
    bg: "bg-green-50",
  },
];

export default function ServicesPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <span className="badge mb-4">What We Do</span>
          <h2 className="section-title">
            Every Roofing Service
            <br />
            <span className="gradient-text">Under One Roof</span>
          </h2>
          <p className="section-subtitle">
            From a single missing shingle to a complete commercial re-roof, our
            certified crew handles it all with the same commitment to quality.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div key={svc.title} className="card p-8 group cursor-pointer">
                <div
                  className={`w-14 h-14 ${svc.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}
                >
                  <Icon size={26} className={svc.color} />
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-3">{svc.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{svc.desc}</p>
                <div className="flex items-center gap-1 mt-5 text-orange-500 font-semibold text-sm group-hover:gap-2 transition-all">
                  Learn more <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/services" className="btn-primary inline-flex">
            View All Services
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
