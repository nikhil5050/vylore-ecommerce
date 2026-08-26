import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProductThumbnail } from "@/components/ui/ProductThumbnail";
import { getBanners } from "@/services/banner.service";

// /banners isn't live on the backend yet, so this fails closed: no banners
// (or a fetch error) just means the section doesn't render, instead of
// breaking the homepage.
export async function OfferBanner() {
  const banners = await getBanners().catch(() => []);
  if (banners.length === 0) return null;

  return (
    <section className="py-6 lg:py-10">
      <Container>
        <div className="space-y-6">
          {banners.map((banner, index) => {
            const image = (
              <div className="relative aspect-[16/5] w-full overflow-hidden rounded-2xl">
                <ProductThumbnail src={banner.imageUrl} alt={banner.title ?? "Offer"} transform="w-1600" />
              </div>
            );
            return (
              <FadeIn key={banner.id} delay={index * 0.05}>
                {banner.linkUrl ? (
                  <Link href={banner.linkUrl} className="group block">
                    {image}
                  </Link>
                ) : (
                  image
                )}
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
