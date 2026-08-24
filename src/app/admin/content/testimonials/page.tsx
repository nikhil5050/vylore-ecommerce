import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { TestimonialsManager } from "@/components/admin/content/TestimonialsManager";
import { mockTestimonials } from "@/lib/admin/mock";

export const metadata: Metadata = { title: "Testimonials" };

export default function TestimonialsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Testimonials" description="Customer quotes shown across the storefront." />
      <TestimonialsManager initialTestimonials={mockTestimonials} />
    </div>
  );
}
