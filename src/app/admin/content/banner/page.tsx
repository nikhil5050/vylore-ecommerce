import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { ContentBlockForm } from "@/components/admin/content/ContentBlockForm";
import { mockContentBlocks } from "@/lib/admin/mock";

export const metadata: Metadata = { title: "Offer Banner" };

export default function ContentOfferBannerPage() {
  const block = mockContentBlocks.find((b) => b.section === "offer_banner")!;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Offer Banner"
        description="The promotional strip shown on the homepage below the hero section."
      />
      <ContentBlockForm title="Homepage Offer Banner" block={block} />
    </div>
  );
}
