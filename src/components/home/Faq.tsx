import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { faqCategories } from "@/config/faq";

// A curated spread — one question from each of six categories — rather than
// the full /faq page's list. Sourced from the same faqCategories data so
// there's only one place to edit the actual questions/answers.
const featuredIds = ["orders-1", "shipping-1", "returns-1", "payments-1", "custom-1", "tracking-1"];

const featuredFaqs = faqCategories
  .flatMap((category) => category.items)
  .filter((item) => featuredIds.includes(item.id))
  .sort((a, b) => featuredIds.indexOf(a.id) - featuredIds.indexOf(b.id));

export function Faq() {
  return (
    <section className="border-y border-silver/30 bg-white py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(220px,0.7fr)_minmax(0,1.3fr)] lg:gap-24">
          <FadeIn direction="left" className="lg:self-start">
            <p className="eyebrow text-xs text-maroon">FAQ / 06 answers</p>
            <h2 className="mt-4 max-w-sm font-serif text-4xl leading-none text-charcoal sm:text-5xl">
              Questions, answered.
            </h2>
            <p className="mt-5 max-w-xs text-sm leading-6 text-muted">
              Everything you need to know before your next Vylore piece arrives.
            </p>
            <Button href="/contact" variant="ghost" size="sm" className="mt-6 px-0">
              Contact us <span aria-hidden="true">↗</span>
            </Button>
          </FadeIn>

          <div>
            <FadeIn className="mb-6 max-w-lg lg:mb-8">
              <p className="text-sm leading-6 text-muted">Quick answers on orders, shipping, returns, and more.</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Accordion
                items={featuredFaqs.map((item) => ({
                  id: item.id,
                  title: item.question,
                  content: <p>{item.answer}</p>,
                }))}
              />
            </FadeIn>

            <FadeIn delay={0.15} className="mt-7">
              <Button href="/faq" variant="secondary" size="md">
                View All FAQs <span aria-hidden="true">↗</span>
              </Button>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
