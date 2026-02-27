import HeroSection from "./components/sections/HeroSection";
import FeaturesSection from "./components/sections/FeaturesSection";
import AboutSection from "./components/sections/AboutSection";
import CTASection from "./components/sections/CTASection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <CTASection />
    </main>
  );
}
