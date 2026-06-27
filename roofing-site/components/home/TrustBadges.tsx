const items = [
  "🏆 GAF Certified Master Elite",
  "⭐ BBB Accredited A+",
  "✅ Licensed & Insured",
  "🛡️ Lifetime Warranty",
  "📜 Angi Super Service",
  "🥇 HomeAdvisor Elite",
  "💯 5-Star Rated",
  "🚨 24/7 Emergency",
  "🏠 500+ Roofs",
  "📅 20 Years Experience",
];

export default function TrustBadges() {
  const repeated = [...items, ...items]; // duplicate for seamless loop

  return (
    <div className="py-5 overflow-hidden bg-dark2 border-y border-white/5 relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
           style={{ background: "linear-gradient(to right, #080B1A, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
           style={{ background: "linear-gradient(to left, #080B1A, transparent)" }} />

      <div className="flex animate-marquee-l whitespace-nowrap">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 mx-8 text-white/50 hover:text-white transition-colors text-sm font-semibold"
          >
            {item}
            <span className="text-orange/30 mx-2">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
