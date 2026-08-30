import { Bestsellers } from "@/components/home/Bestsellers";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ComingSoon } from "@/components/home/ComingSoon";
import { MaterialStory } from "@/components/home/MaterialStory";
import { OfferBanner } from "@/components/home/OfferBanner";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustSection } from "@/components/home/TrustSection";
import { isComingSoon } from "@/config/launch";
import { HeroGrid } from "@/components/home/HeroGrid";
import { Faq } from "@/components/home/Faq";
import { VyloreExperienceLazy as VyloreExperience } from "@/components/home/vylore-experience/VyloreExperienceLazy";

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
