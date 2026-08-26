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
    <main className="flex flex-1 flex-col overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24">
        <Container>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-12">
            <FadeIn className="lg:col-span-7">
              <p className="eyebrow text-xs uppercase tracking-widest text-muted">About Vylore</p>
              <h1 className="mt-4 font-serif text-4xl leading-tight text-charcoal sm:text-5xl lg:text-6xl">
                Legacy Behind Us.<br />
                <span className="italic font-normal">Vision Ahead.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                Vylore is a modern silver jewellery brand built on family experience and a clear point of view on design.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.2} className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-xl transition-transform duration-500 hover:scale-[1.01]">
                  <PlaceholderImage />
                </div>
                {/* Floating Metric Badge */}
                <div className="absolute -bottom-6 -left-6 rounded-xl bg-white p-6 shadow-xl border border-charcoal/5">
                  <p className="font-serif text-3xl font-bold text-charcoal">25+</p>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted">Years of Heritage</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* The Beginning Section */}
      <section className="py-16 lg:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn>
            <div className="relative group aspect-[3/4] overflow-hidden rounded-2xl shadow-lg">
              <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                <PlaceholderImage tone="burgundy" />
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <span className="inline-block rounded-full bg-charcoal/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted">
              The Beginning
            </span>
            <h2 className="mt-4 font-serif text-3xl text-charcoal sm:text-4xl lg:text-5xl">
              A New Brand, Not a New Idea
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
              Vylore was founded to bring together two things that don&apos;t often meet in the same place: real
              jewellery-business experience, and a modern, design-first point of view. Rather than starting from
              nothing, Vylore started from what was already known — and asked what it could look like built for
              today.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Legacy Stats & Highlight */}
      <section className="bg-white py-20 lg:py-32">
        <Container className="max-w-3xl text-center">
          <FadeIn>
            <p className="eyebrow text-xs uppercase tracking-widest text-muted">Family Legacy</p>
            <h2 className="mt-4 font-serif text-3xl text-charcoal sm:text-4xl lg:text-5xl">
              More Than Twenty-Five Years in the Making
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              Vylore comes from a family with more than twenty-five years of experience in the jewellery and
              gold business. That experience — in materials, in craftsmanship, in what makes a piece worth
              keeping — sits behind every decision Vylore makes.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Founder Section */}
      <section className="py-16 lg:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn className="lg:order-2">
            <div className="relative group aspect-[3/4] overflow-hidden rounded-2xl shadow-lg">
              <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                <PlaceholderImage tone="burgundy" />
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.1} className="lg:order-1">
            <span className="inline-block rounded-full bg-charcoal/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted">
              The Founder
            </span>
            <h2 className="mt-4 font-serif text-3xl text-charcoal sm:text-4xl lg:text-5xl">
              Akash Kapile
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
              Vylore is founded by Akash Kapile, who brings close to eight years of direct business experience
              to the brand. His role has been to take what the family already understood about jewellery and
              shape it into something built for a new generation of customers.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Interactive Core Values / Why Vylore & Quality */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <FadeIn className="rounded-2xl border border-charcoal/10 bg-white/50 p-8 sm:p-12 shadow-sm transition-all hover:shadow-md">
              <p className="eyebrow text-xs uppercase tracking-widest text-muted">Why Vylore</p>
              <h3 className="mt-4 font-serif text-2xl text-charcoal sm:text-3xl">
                Family Knowledge. A Founder&apos;s Vision.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Vylore exists on the belief that jewellery businesses don&apos;t need to choose between heritage
                and modernity. The family provides the knowledge. The founder provides the direction. Together,
                they shape jewellery for a customer who wants both substance and a modern point of view.
              </p>
            </FadeIn>

            <FadeIn delay={0.1} className="rounded-2xl border border-charcoal/10 bg-white/50 p-8 sm:p-12 shadow-sm transition-all hover:shadow-md">
              <p className="eyebrow text-xs uppercase tracking-widest text-muted">Quality &amp; Purity</p>
              <h3 className="mt-4 font-serif text-2xl text-charcoal sm:text-3xl">
                Know What You Wear
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Vylore believes customers should be able to understand the quality of what they buy. Metal and
                purity information is shared on each product page where available, and every piece is checked for
                finish and construction before it is dispatched.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Design Philosophy */}
      <section className="py-16 lg:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn>
            <div className="relative group aspect-[3/4] overflow-hidden rounded-2xl shadow-lg">
              <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                <PlaceholderImage />
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <span className="inline-block rounded-full bg-charcoal/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted">
              Design Philosophy
            </span>
            <h2 className="mt-4 font-serif text-3xl text-charcoal sm:text-4xl lg:text-5xl">
              Distinctive, Not Traditional
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
              Vylore is designed to feel modern, considered and quietly confident — never ornate for its own
              sake. Every piece is meant to look intentional: a small number of ideas, resolved carefully,
              rather than a large number of ideas resolved quickly.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Statement Banner (No Compromise) */}
      <section className="relative overflow-hidden bg-burgundy py-24 text-ivory lg:py-36">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <Container className="relative max-w-3xl text-center">
          <FadeIn>
            <p className="eyebrow text-xs uppercase tracking-widest text-champagne">Our Philosophy</p>
            <h2 className="mt-4 font-serif text-5xl sm:text-6xl tracking-tight">
              No Compromise.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ivory/85 sm:text-lg">
              No compromise on materials. No compromise on design. No compromise on how a piece is finished,
              billed, or delivered. It is a simple standard, and it shapes every decision behind Vylore.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Future Vision */}
      <section className="py-20 lg:py-32">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn className="lg:order-2">
            <div className="relative group aspect-[3/4] overflow-hidden rounded-2xl shadow-lg">
              <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                <PlaceholderImage tone="burgundy" />
              </div>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.1} className="lg:order-1">
            <span className="inline-block rounded-full bg-charcoal/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted">
              Future Vision
            </span>
            <h2 className="mt-4 font-serif text-3xl text-charcoal sm:text-4xl lg:text-5xl">
              Building for the Long Term
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
              Vylore is being built with a long-term view — starting with silver jewellery for today&apos;s
              customer, with the ambition to grow into a brand recognised well beyond where it started.
            </p>
          </FadeIn>
        </Container>
      </section>
    </main>
  );
}