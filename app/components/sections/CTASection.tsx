export default function CTASection() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-xs font-medium tracking-widest uppercase text-[#0B352B] mb-5">
          Get started
        </p>
        <h2 className="text-4xl md:text-5xl font-normal text-black leading-tight">
          Stop staring into your fridge.
        </h2>
        <p className="mt-6 text-base text-zinc-500 leading-relaxed max-w-xl mx-auto">
          Download BadHealth free and get personalized meal recommendations from whatever you already have. Your goals, your food, your perfect meal.
        </p>
        <div className="mt-10">
          <a
            href="https://apps.apple.com/us/app/badhealth-smart-recipes/id6740097820"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-[#0B352B] px-10 py-4 text-base font-medium text-white hover:bg-[#0e4a3f] transition-colors"
          >
            Download Free on iOS
          </a>
        </div>
      </div>
    </section>
  );
}
