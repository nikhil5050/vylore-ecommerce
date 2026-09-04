import type { Metadata } from "next";
import { Bestsellers } from "@/components/home/Bestsellers";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ComingSoon } from "@/components/home/ComingSoon";
import { FinalCta } from "@/components/home/FinalCta";
import { MaterialStory } from "@/components/home/MaterialStory";
import { OfferBanner } from "@/components/home/OfferBanner";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustSection } from "@/components/home/TrustSection";
import { isComingSoon } from "@/config/launch";
import { HeroGrid } from "@/components/home/HeroGrid";
import { Faq } from "@/components/home/Faq";
import { VyloreExperienceLazy as VyloreExperience } from "@/components/home/vylore-experience/VyloreExperienceLazy";
import { buildMetadata } from "@/utils/metadata";

// Without this, the static home page is cached forever after build (Next's
// default for a page with no request-time APIs) — a new/updated product
// added via the admin would never appear here until the next deploy.
export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "Sterling Silver Jewellery Online | Rings, Necklaces & More | Vylore",
  description:
    "Explore modern silver rings, necklaces, earrings, bracelets, anklets and more, designed with intention and crafted  with attention to detail. ",
  path: "/",
  keywords: [
    "silver jewellery",
    "sterling silver jewellery",
    "925 sterling silver jewellery",
    "silver jewellery online",
    "silver jewellery for women",
    "sterling silver rings",
    "silver rings",
    "silver necklaces",
    "silver earrings",
    "silver bracelets",
    "silver anklets",
    "silver ear cuffs",
    "contemporary silver jewellery",
    "minimalist silver jewellery",
    "everyday silver jewellery",
    "designer silver jewellery",
    "silver jewellery online",
    "silver jewellery India",
    "custom silver jewellery",
    " modern silver jewellery",
    "pune best silver jewellery",

  ],
});

export default function Home() {
  if (isComingSoon) return <ComingSoon />;

  return (
    <main className="flex flex-1 flex-col">
     <VyloreExperience />
      <CategoryGrid />
      <HeroGrid />
      <OfferBanner />
      <TrustSection />
      <Bestsellers />
      <MaterialStory /> 
      <Testimonials />
      <Faq />
      <FinalCta />
    </main>
  );
}
