import { Container } from "@/components/ui/Container";
import { CategoryAutoScroller } from "@/components/home/CategoryAutoScroller";
import { getCategories } from "@/services/category.service";

export async function CategoryGrid() {
  const categories = await getCategories();

  return (
    <section className="py-0 sm:py-10 lg:py-10">
      <Container>
        <CategoryAutoScroller categories={categories} />
      </Container>
    </section>
  );
}