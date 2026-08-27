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
    <section className="bg-ivory py-16 lg:py-[120px]">
      <Container className="max-w-3xl">
        <FadeIn className="text-center">
          <p className="eyebrow text-xs text-muted">FAQ</p>
          <h2 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-base text-muted">Quick answers on orders, shipping, returns, and more.</p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-10">
          <Accordion
            items={featuredFaqs.map((item) => ({
              id: item.id,
              title: item.question,
              content: <p>{item.answer}</p>,
            }))}
          />
        </FadeIn>

        <FadeIn delay={0.15} className="mt-10 flex justify-center">
          <Button href="/faq" variant="secondary" size="md">
            View All FAQs
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
