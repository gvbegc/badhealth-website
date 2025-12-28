import Container from "../Container";
import Image from "next/image";

export default function FeaturesSection() {
  return (
    <section id="features" className="pt-20 md:pt-32 pb-0">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
            <Image
              src="/homefeaturehighlight.png"
              alt="How it works"
              fill
              className="object-contain rounded-2xl"
              unoptimized
            />
          </div>

          {/* Right side - Content */}
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
              How it works
            </h2>
            <p className="mt-6 text-sm md:text-base text-zinc-600 dark:text-zinc-400">
              Take a photo of the contents of your refrigerator to receive meal recommendations aligned with your nutritional goals. Each recommendation includes a detailed analysis of calories, protein, fat, and carbohydrates, as well as a brief explanation of how the meal supports your specific objectives.
            </p>
            <div className="mt-8">
              <a
                href="https://apps.apple.com/us/app/badhealth-smart-recipes/id6740097820"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-[#0B352B] px-8 py-3 text-base font-medium text-white hover:bg-[#0e4a3f] transition-colors"
              >
                Start exploring in app
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
