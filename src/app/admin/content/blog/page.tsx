import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { BlogManager } from "@/components/admin/content/BlogManager";
import { mockBlogArticles } from "@/lib/admin/mock";

export const metadata: Metadata = { title: "Blog / Articles" };

export default function BlogPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Blog / Articles" description="Editorial content published on the Vylore journal." />
      <BlogManager initialArticles={mockBlogArticles} />
    </div>
  );
}
