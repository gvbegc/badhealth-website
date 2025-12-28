import Container from "../Container";

export default function CommunitySection() {
  const stats = [
    { number: "50K+", label: "Active Users" },
    { number: "100K+", label: "Recipes Shared" },
    { number: "1M+", label: "Meals Planned" },
  ];

  return (
    <section className="py-20 md:py-32">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
            Join Our Thriving Community
          </h2>
          <p className="mt-6 text-sm md:text-base text-zinc-600 dark:text-zinc-400">
            Connect with thousands of health-conscious individuals sharing recipes, tips, and support on their wellness journey.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100">
                {stat.number}
              </div>
              <div className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Community Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm p-8 rounded-2xl border border-zinc-200 dark:border-zinc-700">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Share Your Creations
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Upload your favorite healthy recipes and inspire others. Get feedback, ratings, and build your following within our community.
            </p>
          </div>

          <div className="bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm p-8 rounded-2xl border border-zinc-200 dark:border-zinc-700">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Learn from Others
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Discover recipes from experienced home cooks and nutrition enthusiasts. Save your favorites and adapt them to your needs.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
