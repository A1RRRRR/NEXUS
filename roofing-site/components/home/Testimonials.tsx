const reviews = [
  {
    name: "Sarah M.",
    location: "Westside, TX",
    rating: 5,
    text: "ProRoof replaced our entire roof in one day! The crew was professional, clean, and the final product looks incredible. Our neighbors keep asking who did our roof. Couldn't be happier.",
    project: "Full Roof Replacement",
    date: "2 weeks ago",
    avatar: "SM",
  },
  {
    name: "James T.",
    location: "Lakewood, TX",
    rating: 5,
    text: "Had a leak causing water damage. Called at 7pm, they were there by 9pm with tarps and had it fully repaired the next morning. Insurance handled smoothly too. These guys are the real deal.",
    project: "Emergency Repair",
    date: "1 month ago",
    avatar: "JT",
  },
  {
    name: "Maria & Carlos R.",
    location: "Oak Park, TX",
    rating: 5,
    text: "Three quotes, ProRoof was the most thorough and honest about what we actually needed (turned out we didn't need a full replacement — just targeted repairs). Saved us $8,000. Integrity is rare.",
    project: "Roof Inspection & Repair",
    date: "6 weeks ago",
    avatar: "MR",
  },
  {
    name: "David K.",
    location: "Downtown, TX",
    rating: 5,
    text: "Commercial flat roof for my restaurant. Done over a weekend so we didn't lose any business days. 18 months later, zero issues. Worth every penny and then some.",
    project: "Commercial TPO Roofing",
    date: "2 months ago",
    avatar: "DK",
  },
  {
    name: "Linda H.",
    location: "Riverside, TX",
    rating: 5,
    text: "After the hail storm I was dreading dealing with insurance. ProRoof handled EVERYTHING — the adjuster call, the paperwork, even followed up on my claim. My only job was to pick the shingle color.",
    project: "Storm Damage Claim",
    date: "3 months ago",
    avatar: "LH",
  },
  {
    name: "Robert P.",
    location: "Northgate, TX",
    rating: 5,
    text: "Fourth time using ProRoof across three properties. Consistent quality, same great crew, same fair price. When you find a contractor this good you don't look anywhere else.",
    project: "Repeat Customer",
    date: "1 month ago",
    avatar: "RP",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="badge mb-4">Real Reviews</span>
          <h2 className="section-title">
            Don&apos;t Take Our Word For It
          </h2>
          <p className="section-subtitle mx-auto">
            340+ five-star reviews on Google, Angi, and HomeAdvisor.
            Here&apos;s what your neighbors are saying.
          </p>
          {/* Overall rating */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex stars text-3xl">★★★★★</div>
            <div className="text-left">
              <div className="text-3xl font-black text-brand-navy">5.0</div>
              <div className="text-sm text-slate-500">340+ verified reviews</div>
            </div>
          </div>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.name} className="card p-7 flex flex-col">
              {/* Stars */}
              <div className="flex stars text-lg mb-4">
                {"★".repeat(r.rating)}
              </div>
              {/* Quote */}
              <blockquote className="text-slate-600 text-sm leading-relaxed flex-1 mb-6">
                &ldquo;{r.text}&rdquo;
              </blockquote>
              {/* Reviewer */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 bg-orange-gradient rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">
                  {r.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-brand-navy text-sm">{r.name}</div>
                  <div className="text-xs text-slate-400 truncate">{r.location}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-medium text-orange-500">{r.project}</div>
                  <div className="text-xs text-slate-400">{r.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google badge */}
        <div className="text-center mt-10">
          <a
            href="#"
            className="inline-flex items-center gap-3 bg-white border border-slate-200 hover:border-orange-300 rounded-xl px-6 py-3 shadow-sm hover:shadow-md transition-all"
          >
            <span className="text-2xl">G</span>
            <div className="text-left">
              <div className="text-sm font-bold text-slate-800">Read all reviews on Google</div>
              <div className="text-xs text-slate-500">340 reviews · 5.0 ★</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
