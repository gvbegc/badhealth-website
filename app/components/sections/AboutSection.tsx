export default function AboutSection() {
  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "1M+", label: "Meals Planned" },
    { number: "4.8★", label: "App Store Rating" },
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-[#0B352B]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-white/50 mb-5">
              Our mission
            </p>
            <h2 className="text-4xl md:text-5xl font-normal text-white leading-tight">
              We built the app we always wished existed.
            </h2>
            <p className="mt-6 text-base text-white/70 leading-relaxed">
              Every night, millions of people open their fridge and freeze. Not because they don&apos;t have food — but because turning random ingredients into a healthy meal aligned with their goals feels impossible after a long day.
            </p>
            <p className="mt-4 text-base text-white/70 leading-relaxed">
              BadHealth is the first app that looks at what you actually have and tells you exactly what to make — personalized to your unique health goals.
            </p>
            <a
              href="https://apps.apple.com/us/app/badhealth-smart-recipes/id6740097820"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 rounded-full bg-white px-8 py-3 text-sm font-medium text-[#0B352B] hover:bg-zinc-100 transition-colors"
            >
              Download BadHealth
            </a>
          </div>

          {/* Right — Stats */}
          <div className="grid grid-cols-1 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="border-b border-white/10 pb-8 last:border-0 last:pb-0">
                <div className="text-5xl md:text-6xl font-normal text-white">
                  {stat.number}
                </div>
                <div className="mt-2 text-base text-white/50">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
