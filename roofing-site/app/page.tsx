import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import ServicesPreview from "@/components/home/ServicesPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import GalleryPreview from "@/components/home/GalleryPreview";
import CTABanner from "@/components/home/CTABanner";
import TrustBadges from "@/components/home/TrustBadges";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <StatsBar />
      <ServicesPreview />
      <WhyChooseUs />
      <Testimonials />
      <GalleryPreview />
      <CTABanner />
    </>
  );
}
