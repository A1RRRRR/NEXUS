import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    src: "https://images.unsplash.com/photo-1599619351208-3e6c839d6828?w=800&q=80",
    title: "Westside Residence",
    type: "Full Replacement",
    material: "GAF Timberline HDZ® Charcoal",
    size: "2,400 sq ft",
    duration: "1 day",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    title: "Downtown Office Complex",
    type: "Commercial TPO",
    material: "Firestone TPO Membrane",
    size: "18,000 sq ft",
    duration: "5 days",
  },
  {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    title: "Lakewood Storm Repair",
    type: "Hail Damage Repair",
    material: "Owens Corning Duration® Driftwood",
    size: "1,800 sq ft",
    duration: "1 day",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    title: "Oak Park Farmhouse",
    type: "Metal Roof",
    material: "Standing Seam Steel — Galvalume",
    size: "3,100 sq ft",
    duration: "3 days",
  },
  {
    src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
    title: "Northgate New Build",
    type: "New Construction",
    material: "Certainteed Landmark® Weathered Wood",
    size: "2,800 sq ft",
    duration: "2 days",
  },
  {
    src: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80",
    title: "Riverside Spanish Villa",
    type: "Tile Replacement",
    material: "Eagle Concrete Tile — Terracotta",
    size: "2,200 sq ft",
    duration: "4 days",
  },
  {
    src: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&q=80",
    title: "Parkview Colonial",
    type: "Full Replacement",
    material: "GAF Timberline UHDZ® Pewter Gray",
    size: "3,600 sq ft",
    duration: "2 days",
  },
  {
    src: "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800&q=80",
    title: "Eastside Warehouse",
    type: "Commercial Metal",
    material: "R-Panel Corrugated Steel",
    size: "24,000 sq ft",
    duration: "8 days",
  },
  {
    src: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80",
    title: "Hillside Modern",
    type: "Metal Roof",
    material: "Kynar-coated Aluminum — Matte Black",
    size: "2,900 sq ft",
    duration: "3 days",
  },
];

const stats = [
  { value: "500+", label: "Projects Completed" },
  { value: "30+", label: "Material Options" },
  { value: "100%", label: "Satisfaction Rate" },
  { value: "20+", label: "Years Experience" },
];

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient pt-32 pb-20 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="badge mb-6">Our Work</span>
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            Roofs We&apos;re
            <br />
            <span className="gradient-text">Proud Of</span>
          </h1>
          <p className="text-xl text-slate-300">
            Every project tells a story. Here&apos;s ours — 500+ completed roofs
            across residential, commercial, and specialty projects.
          </p>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-orange-gradient">
        <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-black">{s.value}</div>
              <div className="text-white/70 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <div key={i} className="card overflow-hidden group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.src}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-orange-gradient text-white text-xs font-bold px-3 py-1 rounded-full">
                      {p.type}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-black text-brand-navy text-lg mb-3">{p.title}</h3>
                  <div className="space-y-1.5 text-sm text-slate-500">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-600">Material</span>
                      <span className="text-right text-xs">{p.material}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-600">Size</span>
                      <span>{p.size}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-600">Completed in</span>
                      <span className="text-orange-500 font-bold">{p.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-navy text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-4xl font-black mb-4">
            Want Your Home to Look
            <span className="gradient-text"> This Good?</span>
          </h2>
          <p className="text-slate-300 mb-8">
            Get a free estimate and see material samples for your specific home.
          </p>
          <Link href="/quote" className="btn-primary text-lg">
            Get My Free Quote <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
