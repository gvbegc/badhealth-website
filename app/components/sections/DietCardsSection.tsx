"use client";

import Image from "next/image";

export default function DietCardsSection() {
  const dietCards = [
    {
      image: "/diet-plant-based.png",
      title: "Plant-Based",
      description: "Vegan and vegetarian options tailored to your nutritional needs and preferences.",
    },
    {
      image: "/diet-high-protein.png",
      title: "High-Protein",
      description: "Muscle building and recovery meals optimized for your fitness goals.",
    },
    {
      image: "/diet-low-carb.png",
      title: "Low-Carb",
      description: "Keto and metabolic health recipes designed to support your lifestyle.",
    },
    {
      image: "/diet-balanced.png",
      title: "Balanced",
      description: "Mediterranean and whole foods approach for sustainable healthy eating.",
    },
    {
      image: "/diet-dietary-restricted.png",
      title: "Dietary Restricted",
      description: "Allergy-friendly and specialized diet options for your unique requirements.",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/CuteScenaryHome.png"
          alt="Background"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 py-12 md:py-16">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-white tracking-tight leading-tight">
            Personalized for every eating style
          </h2>
        </div>

        {/* Horizontal Scrolling Cards */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 px-6 pb-4 min-w-max">
            {dietCards.map((card, index) => (
              <div
                key={index}
                className="relative w-[280px] md:w-[340px] h-[400px] md:h-[480px] rounded-2xl overflow-hidden flex-shrink-0"
                style={{
                  background: 'radial-gradient(circle, #f5f5f5 0%, #d4d4d4 100%)'
                }}
              >
                {/* Card Background Image */}
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  unoptimized
                />

                {/* Glass Effect Text Overlay (over bottom of image) */}
                <div className="absolute bottom-0 left-0 right-0 bg-gray-800/85 backdrop-blur-md p-6">
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 uppercase tracking-wide text-white">
                    {card.title}
                  </h3>
                  <p className="text-sm md:text-base text-white ">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
