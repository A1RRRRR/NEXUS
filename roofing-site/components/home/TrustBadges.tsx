const badges = [
  { label: "GAF Certified", icon: "🏆" },
  { label: "BBB Accredited A+", icon: "⭐" },
  { label: "Licensed & Insured", icon: "✅" },
  { label: "Angi Super Service", icon: "🥇" },
  { label: "HomeAdvisor Elite", icon: "🛡️" },
  { label: "25-Year Warranty", icon: "📜" },
];

export default function TrustBadges() {
  return (
    <div className="bg-brand-navy py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {badges.map((b) => (
            <div key={b.label} className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <span className="text-xl">{b.icon}</span>
              <span className="text-sm font-semibold whitespace-nowrap">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
