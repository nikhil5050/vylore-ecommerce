import { EmptyState } from "@/components/ui/EmptyState";

// No review data source exists yet — show an honest empty state rather than fabricated ratings.
export function ProductReviews() {
  return (
    <section className="py-16 lg:py-20">
      <p className="eyebrow text-xs text-muted">Reviews</p>
      <h2 className="mt-4 font-serif text-3xl text-charcoal sm:text-4xl">Customer Reviews</h2>
      <EmptyState
        title="No reviews yet"
        description="Be among the first to share your experience with this piece."
      />
    </section>
  );
}
