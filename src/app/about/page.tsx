import type { Metadata } from "next";
import { FadeIn } from "@/components/ui/FadeIn";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "The story behind Vylore — a modern silver jewellery brand built on family experience and a clear point of view on design.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col">
      <Container className="py-16 lg:py-24">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
        <p className="eyebrow mt-6 text-xs text-muted">About Vylore</p>
        <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
          Legacy Behind Us. Vision Ahead.
        </h1>
        <p className="mt-5 max-w-xl text-base text-muted">
          Vylore is a modern silver jewellery brand built on family experience and a clear point of view on
          design.
        </p>
      </Container>

      <section className="py-16 lg:py-[120px]">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <FadeIn>
            <div className="aspect-[3/4] overflow-hidden">
              <PlaceholderImage />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="eyebrow text-xs text-muted">The Beginning</p>
            <h2 className="mt-4 font-serif text-3xl text-charcoal sm:text-4xl">A New Brand, Not a New Idea</h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
              Vylore was founded to bring together two things that don&apos;t often meet in the same place: real
              jewellery-business experience, and a modern, design-first point of view. Rather than starting from
              nothing, Vylore started from what was already known — and asked what it could look like built for
              today.
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-white py-16 lg:py-[120px]">
        <Container className="max-w-2xl text-center">
          <FadeIn>
            <p className="eyebrow text-xs text-muted">Family Legacy</p>
            <h2 className="mt-4 font-serif text-3xl text-charcoal sm:text-4xl">
              More Than Twenty-Five Years in the Making
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              Vylore comes from a family with more than twenty-five years of experience in the jewellery and
              gold business. That experience — in materials, in craftsmanship, in what makes a piece worth
              keeping — sits behind every decision Vylore makes.
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="py-16 lg:py-[120px]">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <FadeIn className="lg:order-2">
            <div className="aspect-[3/4] overflow-hidden">
              <PlaceholderImage tone="burgundy" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1} className="lg:order-1">
            <p className="eyebrow text-xs text-muted">The Founder</p>
            <h2 className="mt-4 font-serif text-3xl text-charcoal sm:text-4xl">Akash Kapile</h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
              Vylore is founded by Akash Kapile, who brings close to eight years of direct business experience
              to the brand. His role has been to take what the family already understood about jewellery and
              shape it into something built for a new generation of customers.
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-white py-16 lg:py-[120px]">
        <Container className="max-w-2xl text-center">
          <FadeIn>
            <p className="eyebrow text-xs text-muted">Why Vylore</p>
            <h2 className="mt-4 font-serif text-3xl text-charcoal sm:text-4xl">
              Family Knowledge. A Founder&apos;s Vision.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              Vylore exists on the belief that jewellery businesses don&apos;t need to choose between heritage
              and modernity. The family provides the knowledge. The founder provides the direction. Together,
              they shape jewellery for a customer who wants both substance and a modern point of view.
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="py-16 lg:py-[120px]">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <FadeIn>
            <div className="aspect-[3/4] overflow-hidden">
              <PlaceholderImage />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="eyebrow text-xs text-muted">Design Philosophy</p>
            <h2 className="mt-4 font-serif text-3xl text-charcoal sm:text-4xl">Distinctive, Not Traditional</h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
              Vylore is designed to feel modern, considered and quietly confident — never ornate for its own
              sake. Every piece is meant to look intentional: a small number of ideas, resolved carefully,
              rather than a large number of ideas resolved quickly.
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-white py-16 lg:py-[120px]">
        <Container className="max-w-2xl text-center">
          <FadeIn>
            <p className="eyebrow text-xs text-muted">Quality &amp; Purity</p>
            <h2 className="mt-4 font-serif text-3xl text-charcoal sm:text-4xl">Know What You Wear</h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              Vylore believes customers should be able to understand the quality of what they buy. Metal and
              purity information is shared on each product page where available, and every piece is checked for
              finish and construction before it is dispatched.
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="bg-burgundy py-16 text-ivory lg:py-[120px]">
        <Container className="max-w-2xl text-center">
          <FadeIn>
            <p className="eyebrow text-xs text-champagne">Our Philosophy</p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">No Compromise.</h2>
            <p className="mt-5 text-base leading-relaxed text-ivory/75">
              No compromise on materials. No compromise on design. No compromise on how a piece is finished,
              billed, or delivered. It is a simple standard, and it shapes every decision behind Vylore.
            </p>
          </FadeIn>
        </Container>
      </section>

      <section className="py-16 lg:py-[120px]">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <FadeIn className="lg:order-2">
            <div className="aspect-[3/4] overflow-hidden">
              <PlaceholderImage tone="burgundy" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1} className="lg:order-1">
            <p className="eyebrow text-xs text-muted">Future Vision</p>
            <h2 className="mt-4 font-serif text-3xl text-charcoal sm:text-4xl">Building for the Long Term</h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
              Vylore is being built with a long-term view — starting with silver jewellery for today&apos;s
              customer, with the ambition to grow into a brand recognised well beyond where it started.
            </p>
          </FadeIn>
        </Container>
      </section>
    </main>
  );
}
