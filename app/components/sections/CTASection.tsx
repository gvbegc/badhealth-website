import Container from "../Container";

export default function CTASection() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-black tracking-tight leading-tight">
            Start Your Health Journey Today
          </h2>
          <p className="mt-6 text-sm md:text-base text-black ">
            Join thousands of users who have transformed their eating habits with BadHealth. Download now and get started with personalized recipes.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://apps.apple.com/us/app/badhealth-smart-recipes/id6740097820"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#0B352B] px-8 py-4 text-base font-medium text-white hover:bg-[#0e4a3f] transition-colors"
            >
              Download for iOS
            </a>
            <a
              href="/about"
              className="rounded-full border border-zinc-300 px-8 py-4 text-base font-medium text-black hover:bg-zinc-50 transition-colors"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
