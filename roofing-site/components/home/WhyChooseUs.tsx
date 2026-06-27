import { Shield, Clock, DollarSign, Award, Users, Headphones } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Lifetime Warranty",
    desc: "We stand behind our work with a lifetime workmanship warranty — if anything goes wrong, we fix it free.",
  },
  {
    icon: Clock,
    title: "On-Time, Every Time",
    desc: "We show up when we say we will. Projects completed on schedule with daily progress updates.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    desc: "Detailed written quotes with zero hidden fees. We'll beat any comparable written estimate.",
  },
  {
    icon: Award,
    title: "Certified Experts",
    desc: "GAF Certified Master Elite contractors — the top 3% of roofers in the country.",
  },
  {
    icon: Users,
    title: "Local & Family Owned",
    desc: "We live here too. Our reputation depends on the work we do in our own community.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    desc: "A single point of contact from first call to final inspection. No runaround, ever.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-hero-gradient text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-orange-400 text-sm font-bold uppercase tracking-widest mb-4">
            ● Why ProRoof
          </span>
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            We Don&apos;t Just Replace Roofs.
            <br />
            <span className="gradient-text">We Earn Your Trust.</span>
          </h2>
          <p className="text-slate-300 mt-4 text-lg">
            Every decision we make is built around one thing: doing right by you.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 hover:border-orange-400/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-orange-gradient rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-orange-glow">
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{r.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{r.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
