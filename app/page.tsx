import Image from "next/image";
import HeroSection from "./components/sections/HeroSection";
import FeaturesSection from "./components/sections/FeaturesSection";
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
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mt-16">
            <blockquote className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-normal tracking-tight leading-tight">
              "After long shifts as a nurse, I'd come home with zero energy left to think about dinner. Now my family eats healthy meals we all actually enjoy, and I don't have to spend a single thought on planning them."
            </blockquote>
            <p className="text-white text-xs sm:text-sm md:text-base font-normal mt-4 opacity-90">
              - verified purchase
            </p>
          </div>
        </div>
      </div>
      <CommunitySection />
      <CTASection />
    </main>
  );
}
