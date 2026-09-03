import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

const pillars = [
  {
    title: "Purity",
    description: "The actual metal purity and material is clearly stated for every product.",
  },
  {
    title: "Craftsmanship",
    description: "Every piece is reviewed for proportion, detailing, finish and overall presentation before it reaches you.",
  },
  {
    title: "Transparent Pricing",
    description: "Clear product pricing and straightforward information, with no unnecessary surprises at checkout.",
  },
  {
    title: "Product Details",
    description: "Material, dimensions, weight, stone details, finish and care instructions shown where applicable.",
  },
  {
    title: "Customer Commitment",
    description: "Thoughtful service, clear communication and support throughout your Vylore experience.",
  },
];

export function TrustSection() {
  return (
    <section className="bg-white py-16 lg:py-[120px]">
      <Container>
        <FadeIn className="max-w-xl">
          <p className="eyebrow text-xs text-muted">Transparency</p>
          <h2 className="mt-4 font-serif text-4xl text-[#680307] sm:text-5xl">Know What You Wear.</h2>
          <p className="mt-6 text-base text-muted">
            Beautiful jewellery should come with clear information. From materials and
            product details to pricing, care and policies, Vylore is committed to
            helping you make an informed choice.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((pillar, index) => (
            <FadeIn key={pillar.title} delay={index * 0.05}>
              <Card className="h-full p-6">
                <p className="eyebrow text-xs text-burgundy">0{index + 1}</p>
                <h3 className="mt-3 font-serif text-lg text-charcoal">{pillar.title}</h3>
                <p className="mt-2 text-sm text-muted">{pillar.description}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
