const stats = [
  { value: "500+", label: "Roofs Completed", icon: "🏠" },
  { value: "20+",  label: "Years Experience", icon: "📅" },
  { value: "5.0",  label: "Google Rating",    icon: "⭐" },
  { value: "100%", label: "Satisfaction Rate", icon: "💯" },
  { value: "24/7", label: "Emergency Service", icon: "🚨" },
];

export default function StatsBar() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="text-center p-6 bg-white rounded-2xl shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-4xl font-black text-brand-navy font-display">{s.value}</div>
              <div className="text-sm text-slate-500 font-medium mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
