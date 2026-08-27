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
import { VyloreExperience } from "@/components/home/vylore-experience/VyloreExperience";
import { isComingSoon } from "@/config/launch";
import {HeroGrid} from "@/components/home/HeroGrid";
import { Faq } from "@/components/home/Faq";


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
