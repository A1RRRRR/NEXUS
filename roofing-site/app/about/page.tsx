import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, Users, Heart, Shield } from "lucide-react";

const team = [
  {
    name: "Mike Johnson",
    title: "Founder & Master Roofer",
    bio: "30 years in roofing. GAF Master Elite Certified. Started ProRoof after seeing too many homeowners get burned by fly-by-night contractors.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
  },
  {
    name: "Sarah Chen",
    title: "Operations Manager",
    bio: "10 years of project management. Makes sure every job stays on schedule, on budget, and exceeds expectations.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
  {
    name: "Carlos Rivera",
    title: "Lead Estimator",
    bio: "15 years experience. Known for honest, detailed quotes with no surprises. Speaks English and Spanish.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
  {
    name: "Tom Bradley",
    title: "Commercial Division Lead",
    bio: "Specialist in flat and low-slope commercial systems. Has overseen 200+ commercial projects from retail to warehouses.",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
  },
];

const milestones = [
  { year: "2004", event: "Founded by Mike Johnson with one truck and a reputation for honesty." },
  { year: "2008", event: "Survived the housing crisis by doubling down on repair work. Grew to 10 employees." },
  { year: "2012", event: "Achieved GAF Master Elite Certification — top 3% of roofers nationwide." },
  { year: "2016", event: "Launched commercial division. First $1M project completed." },
  { year: "2019", event: "Hit 300 projects. Moved to our current facility." },
  { year: "2024", event: "500+ projects. Voted #1 Roofing Company 3 years running." },
];

const values = [
  {
    icon: Shield,
    title: "Integrity First",
    desc: "We tell you what you need — not what makes us the most money. If you need a repair, we won't sell you a replacement.",
  },
  {
    icon: Award,
    title: "Craft Over Cost",
    desc: "We use the best materials, take the time to do it right, and back every job with a lifetime workmanship warranty.",
  },
  {
    icon: Users,
    title: "Community Roots",
    desc: "We live here. Our kids go to school here. Our reputation lives or dies in this community — and we take that seriously.",
  },
  {
    icon: Heart,
    title: "People First",
    desc: "From the first call to the final walkthrough, you work with real people who actually care about the outcome.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero-gradient pt-32 pb-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="badge mb-6">Our Story</span>
              <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
                20 Years.
                <br />
                <span className="gradient-text">500+ Roofs.</span>
                <br />
                One Promise.
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                ProRoof was built on a simple idea: do the job right, be honest about
                what it costs, and treat every home like your own. Twenty years later,
                that idea is still our entire business model.
              </p>
              <Link href="/quote" className="btn-primary">
                Work With Us <ArrowRight size={18} />
              </Link>
            </div>
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                  alt="ProRoof crew at work"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating stat */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-card p-5 text-center">
                <div className="text-4xl font-black text-brand-navy">A+</div>
                <div className="text-sm text-slate-500 mt-1">BBB Rating</div>
              </div>
              <div className="absolute -top-6 -right-6 bg-orange-gradient rounded-2xl shadow-orange-glow p-5 text-center text-white">
                <div className="text-4xl font-black">20</div>
                <div className="text-sm opacity-80 mt-1">Years Local</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="badge mb-4">What Drives Us</span>
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="card p-7 text-center group">
                  <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:bg-orange-gradient group-hover:shadow-orange-glow transition-all duration-300">
                    <Icon size={24} className="text-orange-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-black text-brand-navy text-lg mb-3">{v.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="badge mb-4">Timeline</span>
            <h2 className="section-title">How We Got Here</h2>
          </div>
          <div className="space-y-0">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-6">
                {/* Line + dot */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-orange-gradient rounded-full flex items-center justify-center text-white font-black text-sm shrink-0 shadow-orange-glow">
                    {m.year.slice(2)}
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="w-0.5 bg-orange-200 flex-1 my-2" />
                  )}
                </div>
                {/* Content */}
                <div className="pb-10 pt-2">
                  <div className="text-sm font-bold text-orange-500 mb-1">{m.year}</div>
                  <p className="text-slate-600">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="badge mb-4">The Team</span>
            <h2 className="section-title">
              The People Behind
              <span className="gradient-text"> Every Roof</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="card overflow-hidden group">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-orange-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="font-black text-brand-navy">{member.name}</h3>
                  <div className="text-orange-500 font-semibold text-sm mb-3">{member.title}</div>
                  <p className="text-slate-500 text-xs leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-brand-navy text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-3">Credentials That Matter</h2>
          <p className="text-slate-400 mb-10">We don&apos;t just say we&apos;re the best — we prove it.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "🏆", label: "GAF Master Elite", sub: "Top 3% nationwide" },
              { icon: "⭐", label: "BBB Accredited", sub: "A+ Rating" },
              { icon: "🛡️", label: "Fully Licensed", sub: "#ROO-123456" },
              { icon: "📜", label: "Fully Insured", sub: "$2M liability" },
            ].map((c) => (
              <div
                key={c.label}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="text-4xl mb-3">{c.icon}</div>
                <div className="font-black text-white">{c.label}</div>
                <div className="text-slate-400 text-xs mt-1">{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-orange-gradient text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-4xl font-black mb-4">Ready to Meet the Team?</h2>
          <p className="text-white/80 text-lg mb-8">
            Schedule a free inspection and see firsthand why 500+ homeowners trust ProRoof.
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 bg-white text-orange-600 font-black px-10 py-5 rounded-lg hover:scale-105 transition-transform text-lg"
          >
            Get My Free Quote <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
