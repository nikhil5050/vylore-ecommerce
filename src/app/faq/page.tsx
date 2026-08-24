import type { Metadata } from "next";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { faqCategories } from "@/config/faq";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "FAQ",
  description: "Answers to common questions about orders, shipping, returns, purity, and more.",
  path: "/faq",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqCategories.flatMap((category) =>
    category.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  ),
};

export default function FaqPage() {
  return (
    <main className="flex flex-1 flex-col py-16 lg:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Container className="max-w-3xl">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
        <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">Frequently Asked Questions</h1>

        <div className="mt-12 flex flex-col gap-12">
          {faqCategories.map((category) => (
            <div key={category.id}>
              <h2 className="font-serif text-2xl text-charcoal">{category.title}</h2>
              <div className="mt-4">
                <Accordion
                  items={category.items.map((item) => ({
                    id: item.id,
                    title: item.question,
                    content: <p>{item.answer}</p>,
                  }))}
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
