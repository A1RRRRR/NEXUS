import TickerBar from "./components/TickerBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LiveSignals from "./components/LiveSignals";
import Dashboard from "./components/Dashboard";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import SocialProof from "./components/SocialProof";
import Roast from "./components/Roast";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <TickerBar />
      <Navbar />
      <Hero />
      <LiveSignals />
      <Dashboard />
      <Features />
      <Pricing />
      <SocialProof />
      <Roast />
      <Footer />
    </main>
  );
}
