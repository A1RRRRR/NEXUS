import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    src: "https://images.unsplash.com/photo-1599619351208-3e6c839d6828?w=600&q=80",
    label: "Full Replacement · Asphalt",
    location: "Westside",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    label: "Commercial · TPO Flat",
    location: "Downtown",
  },
  {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
    label: "Storm Damage Repair",
    location: "Lakewood",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
    label: "Metal Roof · Standing Seam",
    location: "Oak Park",
  },
  {
    src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
    label: "New Construction",
    location: "Northgate",
  },
  {
    src: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600&q=80",
    label: "Tile Replacement",
    location: "Riverside",
  },
];

export default function GalleryPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="badge mb-4">Our Work</span>
            <h2 className="section-title">
              Real Projects,
              <br />
              <span className="gradient-text">Real Results</span>
            </h2>
          </div>
          <Link
            href="/gallery"
            className="flex items-center gap-2 text-orange-500 font-bold hover:gap-3 transition-all"
          >
            View full gallery <ArrowRight size={18} />
          </Link>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${
                i === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              style={{ aspectRatio: i === 0 ? "16/10" : "4/3" }}
            >
              <Image
                src={p.src}
                alt={p.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-brand-navy/0 group-hover:bg-brand-navy/60 transition-all duration-300 flex items-end p-4">
                <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-white font-bold">{p.label}</div>
                  <div className="text-orange-400 text-sm">{p.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
