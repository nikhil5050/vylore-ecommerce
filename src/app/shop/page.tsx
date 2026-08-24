import type { Metadata } from "next";
import { ProductListing } from "@/components/shop/ProductListing";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { getCategories } from "@/services/category.service";
import { getAllProducts } from "@/services/product.service";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Shop All",
  description: "Browse the complete Vylore silver jewellery collection.",
  path: "/shop",
});

export default async function ShopPage() {
  const [products, categories] = await Promise.all([getAllProducts(), getCategories()]);

  return (
    <main className="flex flex-1 flex-col py-16 lg:py-24">
      <Container>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
        <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">Shop All</h1>
        <p className="mt-3 max-w-xl text-base text-muted">
          The complete Vylore silver jewellery collection, in one place.
        </p>

        <div className="mt-10">
          <ProductListing products={products} categories={categories} />
        </div>
      </Container>
    </main>
  );
}
