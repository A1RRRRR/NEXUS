const reviews = [
  { name: "Sarah M.",     loc: "Westside, TX",   stars: 5, text: "ProRoof replaced our entire roof in ONE day. The crew was unreal. Neighbors keep asking who did it.", project: "Full Replacement",  avatar: "SM" },
  { name: "James T.",     loc: "Lakewood, TX",   stars: 5, text: "Called at 7pm, they showed up by 9pm with tarps. Fully repaired by morning. These guys are legends.", project: "Emergency Repair",   avatar: "JT" },
  { name: "Maria R.",     loc: "Oak Park, TX",   stars: 5, text: "Saved us $8,000 by being honest — we didn't need a full replacement. Integrity is rare. These guys have it.", project: "Honest Inspection", avatar: "MR" },
  { name: "David K.",     loc: "Downtown, TX",   stars: 5, text: "Commercial flat roof for my restaurant done over a weekend. Zero disruption. 18 months — zero issues.", project: "Commercial TPO",    avatar: "DK" },
  { name: "Linda H.",     loc: "Riverside, TX",  stars: 5, text: "ProRoof handled my whole insurance claim — adjuster meetings, paperwork, follow-ups. I just picked a color.", project: "Storm Claim",       avatar: "LH" },
  { name: "Robert P.",    loc: "Northgate, TX",  stars: 5, text: "Fourth time using ProRoof across three properties. Same crew. Same quality. Same fair price. Don't look elsewhere.", project: "Repeat Customer",   avatar: "RP" },
  { name: "Chris W.",     loc: "Midtown, TX",    stars: 5, text: "Quote was lower than 4 competitors AND the job came out better. Still amazed. 10/10 would recommend.", project: "Beat Every Quote",  avatar: "CW" },
  { name: "Tanya B.",     loc: "Greendale, TX",  stars: 5, text: "I was dreading this project. ProRoof made it painless. Done in 8 hours. Zero mess left behind.", project: "Smooth Experience",  avatar: "TB" },
];

// Split into two rows
const row1 = [...reviews, ...reviews];
const row2 = [...reviews.slice(4), ...reviews.slice(0, 4), ...reviews.slice(4), ...reviews.slice(0, 4)];

function ReviewCard({ r }: { r: typeof reviews[0] }) {
  return (
    <div
      className="flex-shrink-0 w-72 glass rounded-2xl p-6 mx-3"
      style={{ border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="text-orange text-lg mb-3">{"★".repeat(r.stars)}</div>
      <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-3">&ldquo;{r.text}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 gradient-bg rounded-full flex items-center justify-center text-white text-xs font-black shrink-0">
          {r.avatar}
        </div>
        <div>
          <div className="text-white font-bold text-sm">{r.name}</div>
          <div className="text-white/30 text-xs">{r.project}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 bg-dark2 overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
           style={{ background: "linear-gradient(to right, #080B1A, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
           style={{ background: "linear-gradient(to left, #080B1A, transparent)" }} />

      <div className="max-w-4xl mx-auto px-4 text-center mb-14 relative z-10">
        <span className="inline-block glass-orange text-orange text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          Real Reviews
        </span>
        <h2 className="font-display font-black text-white leading-none mb-3"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
          What People Are
          <br />
          <span className="gradient-text">Saying About Us</span>
        </h2>
        <div className="flex items-center justify-center gap-3 mt-4">
          <span className="text-orange text-3xl">★★★★★</span>
          <span className="text-white font-black text-2xl">5.0</span>
          <span className="text-white/30 text-sm">· 340+ verified reviews</span>
        </div>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="flex mb-4">
        <div className="flex animate-marquee-l">
          {row1.map((r, i) => <ReviewCard key={`r1-${i}`} r={r} />)}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="flex">
        <div className="flex animate-marquee-r">
          {row2.map((r, i) => <ReviewCard key={`r2-${i}`} r={r} />)}
        </div>
      </div>
    </section>
  );
}
