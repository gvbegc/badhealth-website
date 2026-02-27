import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Scan your fridge",
    description:
      "Open the app and take a photo of your fridge. BadHealth identifies everything you have in seconds.",
    image: "/badhealth-app-home-screen.png",
    alt: "BadHealth app home screen fridge scan",
  },
  {
    number: "02",
    title: "Browse grocery lists",
    description:
      "Explore popular, curated grocery lists built around real nutrition goals — or let the app build one for you.",
    image: "/badhealth-popular-grocery-lists-feature.png",
    alt: "BadHealth popular healthy grocery lists feature",
  },
  {
    number: "03",
    title: "Get your meal recommendation",
    description:
      "Receive personalized meal suggestions with full nutritional breakdowns — calories, protein, fat, and carbs — all matched to your goals.",
    image: "/badhealth-fridge-scan-meal-recommendation-result.png",
    alt: "BadHealth fridge scan meal recommendation result",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-xs font-medium tracking-widest uppercase text-[#0B352B] mb-4">
            How it works
          </p>
          <h2 className="text-4xl md:text-5xl font-normal text-black leading-tight">
            From fridge to table in three steps.
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center">
              {/* App Screenshot */}
              <div className="relative w-[200px] h-[400px] mb-8">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  className="object-contain drop-shadow-2xl"
                  unoptimized
                />
              </div>
              {/* Step number */}
              <p className="text-xs font-medium tracking-widest uppercase text-zinc-300 mb-3">
                {step.number}
              </p>
              <h3 className="text-xl font-normal text-black mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
