import { ProductGridSkeleton } from "@/components/shop/ProductGridSkeleton";

export default function Loading() {
  return (
    <main className="flex flex-1 flex-col">
      <ProductGridSkeleton />
    </main>
  );
}
