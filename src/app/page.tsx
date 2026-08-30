import dynamic from "next/dynamic";
import { Bestsellers } from "@/components/home/Bestsellers";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ComingSoon } from "@/components/home/ComingSoon";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { MaterialStory } from "@/components/home/MaterialStory";
import { NewArrivals } from "@/components/home/NewArrivals";
import { NoCompromise } from "@/components/home/NoCompromise";
import { OfferBanner } from "@/components/home/OfferBanner";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustSection } from "@/components/home/TrustSection";
import { isComingSoon } from "@/config/launch";
import { HeroGrid } from "@/components/home/HeroGrid";
import { Faq } from "@/components/home/Faq";

const VyloreExperience = dynamic(
  () => import("@/components/home/vylore-experience/VyloreExperience").then((mod) => mod.VyloreExperience),
  {
    ssr: false,
    loading: () => (
      <div className="h-[80vh] w-full bg-white" aria-label="Loading experience" />
    ),
  }
);

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
    </main>
  );
}
