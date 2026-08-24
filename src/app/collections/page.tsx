import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { getFeaturedCollections } from "@/services/collection.service";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Collections",
  description: "Curated directions within the Vylore silver jewellery range.",
  path: "/collections",
});

export default async function CollectionsPage() {
  const collections = await getFeaturedCollections();

  return (
    <main className="flex flex-1 flex-col py-16 lg:py-24">
      <Container>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Collections" }]} />
        <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">Collections</h1>
        <p className="mt-3 max-w-xl text-base text-muted">
          Curated directions within the Vylore silver jewellery range.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {collections.map((collection) => (
            <Link key={collection.id} href={`/collections/${collection.slug}`} className="group block">
              <div className="relative aspect-[3/2] overflow-hidden">
                <PlaceholderImage
                  tone="burgundy"
                  className="transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="mt-4 font-serif text-xl text-charcoal transition-colors group-hover:text-burgundy">
                {collection.name}
              </h3>
              <p className="mt-1 text-sm text-muted">{collection.description}</p>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}
