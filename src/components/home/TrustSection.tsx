import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

const pillars = [
  { title: "Purity", description: "We believe you should always know what your jewellery is made of." },
  { title: "Craftsmanship", description: "Every piece is finished with care, start to finish." },
  { title: "Transparent Billing", description: "Clear pricing with no hidden surprises at checkout." },
  { title: "Quality", description: "Materials and finishing checked before a piece reaches you." },
  { title: "Customer Commitment", description: "Punctual, honest service on every order." },
];

export function TrustSection() {
  return (
    <section className="bg-white py-16 lg:py-[120px]">
      <Container>
        <FadeIn className="max-w-xl">
          <p className="eyebrow text-xs text-muted">Transparency</p>
          <h2 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">Know What You Wear.</h2>
          <p className="mt-6 text-base text-muted">
            Vylore believes every customer should be able to understand the quality and
            purity of what they purchase — before and after the sale.
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
