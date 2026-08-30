import { Container } from "@/components/ui/Container";
import { CategoryAutoScroller } from "@/components/home/CategoryAutoScroller";
import { getCategories } from "@/services/category.service";

export async function CategoryGrid() {
  const categories = await getCategories();

  return (
    <section className="py-10 lg:py-16">
      <Container>
        <CategoryAutoScroller categories={categories} />
      </Container>
    </section>
  );
}