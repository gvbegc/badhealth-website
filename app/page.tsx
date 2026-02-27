import Image from "next/image";
import HeroSection from "./components/sections/HeroSection";
import FeaturesSection from "./components/sections/FeaturesSection";
import AboutSection from "./components/sections/AboutSection";
import CommunitySection from "./components/sections/CommunitySection";
import CTASection from "./components/sections/CTASection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <div className="w-full relative">
        <Image
          src="/CuteScenaryHome.png"
          alt="Divider"
          width={1920}
          height={200}
          className="w-full h-auto"
          unoptimized
        />
      </div>
      <AboutSection />
      <CommunitySection />
      <CTASection />
    </main>
  );
}
