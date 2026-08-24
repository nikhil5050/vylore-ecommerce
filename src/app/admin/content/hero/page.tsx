import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { ContentBlockForm } from "@/components/admin/content/ContentBlockForm";
import { mockContentBlocks } from "@/lib/admin/mock";

export const metadata: Metadata = { title: "Hero Section" };

export default function HeroSectionPage() {
  const block = mockContentBlocks.find((b) => b.section === "hero")!;

  return (
    <div className="space-y-6">
      <PageHeader title="Hero Section" description="The main banner customers see when they land on the homepage." />
      <ContentBlockForm title="Homepage Hero" block={block} />
    </div>
  );
}
