import { ProductListing } from "@/components/shop/ProductListing";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { getCategories } from "@/services/category.service";
import { getAllProducts } from "@/services/product.service";

// Without this, the static shop page is cached forever after build (Next's
// default for a page with no request-time APIs) — a new/updated product
// added via the admin would never appear here until the next deploy.
export const revalidate = 60;

export default async function ShopPage() {
  // Fails closed, same as the homepage sections: an unreachable backend
  // (DNS blip, cold start, outage) renders the page shell with an empty
  // listing — ProductListing's own empty state — instead of a 500.
  const [products, categories] = await Promise.all([
    getAllProducts().catch(() => []),
    getCategories().catch(() => []),
  ]);

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
