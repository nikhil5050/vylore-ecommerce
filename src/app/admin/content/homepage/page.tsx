import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { HomepageContentOverview } from "@/components/admin/content/HomepageContentOverview";
import { mockContentBlocks } from "@/lib/admin/mock";

export const metadata: Metadata = { title: "Homepage" };

export default function HomepageContentPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Homepage"
        description="Every section shown on the storefront homepage, in display order."
      />
      <HomepageContentOverview initialBlocks={mockContentBlocks} />
    </div>
  );
}
