import { GemIcon } from "@/components/icons/Icons";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

// Placeholder quotes pending real customer reviews — swap once collected.
const testimonials = [
  { quote: "The finishing is unlike anything I've worn before — understated but clearly considered.", name: "Ananya R." },
  { quote: "Ordered a custom piece and the whole process felt personal from start to finish.", name: "Kabir S." },
  { quote: "Simple, elegant designs that don't try too hard. Exactly what I was looking for.", name: "Meher P." },
];

export function Testimonials() {
  return (
    <section className="bg-ivory py-16 lg:py-[120px]">
      <Container>
        <FadeIn className="text-center">
          <p className="eyebrow text-xs text-muted">In Their Words</p>
          <h2 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">The Vylore Experience.</h2>
          <p className="mt-4 text-base text-muted">
            Jewellery is personal. So is the experience of finding the right piece.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <FadeIn key={item.name} delay={index * 0.08} className="flex flex-col items-center text-center">
              <GemIcon className="h-5 w-5 text-champagne" />
              <p className="mt-4 max-w-sm font-serif text-lg leading-relaxed text-charcoal">
                &ldquo;{item.quote}&rdquo;
              </p>
              <p className="eyebrow mt-4 text-xs text-muted">{item.name}</p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
