import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductListing } from "@/components/shop/ProductListing";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { getCategories, getCategoryBySlug } from "@/services/category.service";
import { getProductsByCategory } from "@/services/product.service";
import { buildMetadata } from "@/utils/metadata";

// Without this, each static category page is cached forever after build
// (Next's default for a page with no request-time APIs) — a new/updated
// product added via the admin would never appear here until the next deploy.
export const revalidate = 60;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps<"/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};

  return buildMetadata({
    title: category.name,
    description: category.description,
    path: `/category/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const products = await getProductsByCategory(slug);

  return (
    <main className="flex flex-1 flex-col py-16 lg:py-24">
      <Container>
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: category.name }]}
        />
        <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">{category.name}</h1>
        <p className="mt-3 max-w-xl text-base text-muted">{category.description}</p>

        <div className="mt-10">
          <ProductListing products={products} />
        </div>
      </Container>
    </main>
  );
}
