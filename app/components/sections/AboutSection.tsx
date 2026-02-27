import Container from "../Container";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-black tracking-tight leading-tight">
            About BadHealth
          </h2>
          <p className="mt-6 text-sm md:text-base text-black ">
            {/* Add your about content here */}
          </p>
        </div>
      </Container>
    </section>
  );
}
