import HeroSection from "@/components/landing/hero-section";
import AboutSection from "@/components/landing/about-section";
import DonationSection from "@/components/landing/donation-section";

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <DonationSection />
    </>
  );
}
