import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductListing } from "@/components/shop/ProductListing";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { getCategories } from "@/services/category.service";
import { getCollectionBySlug, getFeaturedCollections } from "@/services/collection.service";
import { getProductsByCollection } from "@/services/product.service";
import { buildMetadata } from "@/utils/metadata";

// Without this, each static collection page is cached forever after build
// (Next's default for a page with no request-time APIs).
export const revalidate = 60;

export async function generateStaticParams() {
  const collections = await getFeaturedCollections();
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) return {};

  return buildMetadata({
    title: collection.name,
    description: collection.description,
    path: `/collections/${collection.slug}`,
  });
}

export default async function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) notFound();

  const [products, categories] = await Promise.all([getProductsByCollection(slug), getCategories()]);

  return (
    <main className="flex flex-1 flex-col py-16 lg:py-24">
      <Container>
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Collections", href: "/collections" },
            { label: collection.name },
          ]}
        />
        <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">{collection.name}</h1>
        <p className="mt-3 max-w-xl text-base text-muted">{collection.description}</p>

        <div className="mt-10">
          <ProductListing products={products} categories={categories} />
        </div>
      </Container>
    </main>
  );
}
