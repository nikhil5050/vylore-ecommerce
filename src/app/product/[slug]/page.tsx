import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductReviews } from "@/components/product/ProductReviews";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { StickyMobileCta } from "@/components/product/StickyMobileCta";
import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { siteConfig } from "@/config/site";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/services/product.service";

// Without this, each static product page is cached forever after build
// (Next's default for a page with no request-time APIs) — price/stock/image
// edits made via the admin would never appear here until the next deploy.
export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;

  // getProductBySlug only resolves to undefined on a genuine 404; anything
  // else (backend unreachable, 5xx) rethrows, so it's caught here and shown
  // as a distinct "unavailable" state instead of a false notFound() or a 500.
  let product;
  try {
    product = await getProductBySlug(slug);
  } catch {
    return (
      <main className="flex flex-1 flex-col pb-24 pt-16 lg:pb-0 lg:pt-24">
        <Container>
          <EmptyState
            title="This product is temporarily unavailable"
            description="We're having trouble reaching the catalog. Please try again shortly."
          />
        </Container>
      </main>
    );
  }
  if (!product) notFound();

  // The product itself is known-good above; only the related-products lookup
  // can still fail (a separate request), so it fails closed into
  // RelatedProducts' own empty render rather than taking the page down.
  const related = await getRelatedProducts(product).catch(() => []);

  // No real reviews exist yet, so aggregateRating is intentionally omitted
  // rather than fabricated.
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.id,
    category: product.category,
    ...(product.images.length > 0 ? { image: product.images.map((image) => image.url) } : {}),
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/product/${product.slug}`,
      priceCurrency: "INR",
      price: product.price,
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  const specRows: string[] = [`Category: ${product.category}`];
  if (product.metal) specRows.push(`Metal: ${product.metal}`);
  if (product.purity) specRows.push(`Purity: ${product.purity}`);
  if (product.weight) specRows.push(`Weight: ${product.weight}g`);
  if (product.sizes?.length) specRows.push(`Available sizes: ${product.sizes.join(", ")}`);

  const accordionItems: AccordionItem[] = [
    {
      id: "description",
      title: "Description",
      content: (
        <div className="flex flex-col gap-3">
          <p>{product.description}</p>
          {product.story && <p>{product.story}</p>}
        </div>
      ),
    },
    {
      id: "specifications",
      title: "Specifications",
      content: (
        <ul className="flex flex-col gap-1">
          {specRows.map((row) => (
            <li key={row}>{row}</li>
          ))}
        </ul>
      ),
    },
    {
      id: "shipping-returns",
      title: "Shipping & Returns",
      content: (
        <p>
          Full shipping and return details are available on our{" "}
          <Link href="/shipping" className="text-burgundy underline underline-offset-2">
            Shipping
          </Link>{" "}
          and{" "}
          <Link href="/returns" className="text-burgundy underline underline-offset-2">
            Returns
          </Link>{" "}
          pages.
        </p>
      ),
    },
  ];

  return (
    <main className="flex flex-1 flex-col pb-24 pt-16 lg:pb-0 lg:pt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery productName={product.name} images={product.images} />
          <ProductInfo product={product} />
        </div>

        <div className="mt-16 max-w-3xl lg:mt-24">
          <Accordion items={accordionItems} defaultOpenId="description" headingLevel={2} />
        </div>

        <ProductReviews />
        <RelatedProducts products={related} />
      </Container>

      <StickyMobileCta product={product} />
    </main>
  );
}
