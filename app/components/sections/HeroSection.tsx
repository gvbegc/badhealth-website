import Container from "../Container";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-black tracking-tight leading-tight">
              BadHealth is the first personalized fridge scan app for families
            </h1>
            <p className="mt-6 text-sm md:text-base text-black">
              BadHealth is the first research-backed mobile app that scans your fridge and gives you meal recommendations tailored to your unique health goals. Whether you're cooking for yourself or a small family, we make it easy to eat sustainably.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="https://apps.apple.com/us/app/badhealth-smart-recipes/id6740097820"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#0B352B] px-8 py-3 text-base font-medium text-white hover:bg-[#0e4a3f] transition-colors text-center"
              >
                Download
              </a>
              <a
                href="#"
                className="rounded-full bg-white border border-zinc-300 px-8 py-3 text-base font-medium text-black hover:bg-zinc-50 transition-colors text-center"
              >
                Get 15% off
              </a>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="relative h-[400px] lg:h-[500px]">
            <Image
              src="/hero-image.jpg"
              alt="BadHealth App"
              fill
              className="object-cover rounded-2xl"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
