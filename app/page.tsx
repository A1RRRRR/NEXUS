import TickerBar         from "./components/TickerBar";
import Navbar            from "./components/Navbar";
import Hero              from "./components/Hero";
import HowItWorks        from "./components/HowItWorks";
import LiveSignals       from "./components/LiveSignals";
import Dashboard         from "./components/Dashboard";
import ROICalculator     from "./components/ROICalculator";
import Features          from "./components/Features";
import ComparisonTable   from "./components/ComparisonTable";
import Pricing           from "./components/Pricing";
import SocialProof       from "./components/SocialProof";
import FAQ               from "./components/FAQ";
import UrgencyCTA        from "./components/UrgencyCTA";
import Roast             from "./components/Roast";
import Footer            from "./components/Footer";
import CustomCursor      from "./components/CustomCursor";
import ToastNotification from "./components/ToastNotification";

export default function Home() {
  return (
    <>
      {/* Global UI overlays */}
      <CustomCursor />
      <ToastNotification />

      <main className="min-h-screen">
        {/* Fixed top ticker (33px tall) */}
        <TickerBar />

        {/* Sticky nav (sits below ticker) */}
        <Navbar />

        {/* Hero — fullscreen, particle bg, animated stats */}
        <Hero />

        {/* 3-step how it works */}
        <HowItWorks />

        {/* Real-time AI signal feed with sparklines */}
        <LiveSignals />

        {/* Portfolio analytics — 4 chart modes */}
        <Dashboard />

        {/* Interactive ROI calculator */}
        <ROICalculator />

        {/* 12-feature grid */}
        <Features />

        {/* NEXUS vs competitors table */}
        <ComparisonTable />

        {/* 3-tier pricing */}
        <Pricing />

        {/* Testimonials + press logos */}
        <SocialProof />

        {/* FAQ — 9 questions answered honestly */}
        <FAQ />

        {/* Countdown urgency CTA */}
        <UrgencyCTA />

        {/* 5-perspective honest roast */}
        <Roast />

        <Footer />
      </main>
    </>
  );
}
