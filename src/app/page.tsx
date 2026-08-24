import { Bestsellers } from "@/components/home/Bestsellers";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { CustomJewellery } from "@/components/home/CustomJewellery";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { InstagramProof } from "@/components/home/InstagramProof";
import { NewArrivals } from "@/components/home/NewArrivals";
import { NoCompromise } from "@/components/home/NoCompromise";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustSection } from "@/components/home/TrustSection";
import { VyloreExperience } from "@/components/home/vylore-experience/VyloreExperience";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <VyloreExperience />
      <CategoryGrid />
      <FeaturedCollections />
      <NewArrivals />
      <NoCompromise />
      <TrustSection />
      <Bestsellers />
      <CustomJewellery />
      <Testimonials />
      <InstagramProof />
    </main>
  );
}
