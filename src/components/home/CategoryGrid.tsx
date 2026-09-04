import { Container } from "@/components/ui/Container";
import { CategoryAutoScroller } from "@/components/home/CategoryAutoScroller";
import { getCategories } from "@/services/category.service";

// Fails closed like OfferBanner: an unreachable backend (DNS blip, Railway
// cold start, outage) hides this one section instead of throwing and taking
// the whole homepage down with a 500.
export async function CategoryGrid() {
  const categories = await getCategories().catch(() => []);
  if (categories.length === 0) return null;

  return (
    <section className="py-0 sm:py-10 lg:py-10">
      <Container>
        <CategoryAutoScroller categories={categories} />
      </Container>
    </section>
  );
}