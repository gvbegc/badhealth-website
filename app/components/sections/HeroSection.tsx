import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/badhealth-fridge-scan-app-hero.png"
        alt="BadHealth personalized fridge scan app"
        fill
        className="object-cover"
        priority
        unoptimized
      />

      {/* Gradient overlay — dark at top and bottom, lighter in center for image visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto">
        <p className="text-xs md:text-sm font-medium tracking-widest uppercase text-white/70 mb-5">
          Now available on iOS
        </p>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal leading-tight tracking-tight">
          Your fridge.<br />Your perfect meal.
        </h1>
        <p className="mt-6 text-base md:text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
          Scan your fridge and get instant meal recommendations tailored to your health goals. No guesswork. No wasted food.
        </p>
        <div className="mt-10">
          <a
            href="https://apps.apple.com/us/app/badhealth-smart-recipes/id6740097820"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-white px-10 py-4 text-base font-medium text-[#0B352B] hover:bg-zinc-100 transition-colors"
          >
            Download Free
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <div className="w-px h-8 bg-white/30" />
      </div>
    </section>
  );
}
