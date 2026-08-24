import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

const pillars = [
  { title: "Quality", description: "Every material is chosen and checked before it becomes Vylore." },
  { title: "Design", description: "Distinctive forms, refined until nothing extra remains." },
  { title: "Craftsmanship", description: "Precision finishing at every stage of the making." },
  { title: "Trust", description: "Clear information and honest promises, every time." },
];

export function NoCompromise() {
  return (
    <section className="bg-burgundy py-16 text-ivory lg:py-[120px]">
      <Container>
        <FadeIn>
          <p className="eyebrow text-center text-xs text-champagne">The Vylore Standard</p>
          <h2 className="mt-4 text-center font-serif text-5xl leading-tight sm:text-6xl lg:text-7xl">
            No Compromise.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-center text-base text-ivory/75">
            From the metal we choose to the finishing we deliver, every promise matters.
          </p>
        </FadeIn>

        <div className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-10">
          {pillars.map((pillar, index) => (
            <FadeIn key={pillar.title} delay={index * 0.08} className="text-center lg:text-left">
              <p className="eyebrow text-xs text-champagne">0{index + 1}</p>
              <h3 className="mt-3 font-serif text-2xl">{pillar.title}</h3>
              <p className="mt-2 text-sm text-ivory/70">{pillar.description}</p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
