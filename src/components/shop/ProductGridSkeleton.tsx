import { Container } from "@/components/ui/Container";

export function ProductGridSkeleton() {
  return (
    <Container className="py-16 lg:py-24">
      <div className="h-3 w-32 animate-pulse bg-silver/20" />
      <div className="mt-4 h-10 w-64 animate-pulse bg-silver/20" />

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3 lg:gap-x-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-3">
            <div className="aspect-[4/5] animate-pulse bg-silver/20" />
            <div className="h-3 w-16 animate-pulse bg-silver/20" />
            <div className="h-4 w-32 animate-pulse bg-silver/20" />
          </div>
        ))}
      </div>
    </Container>
  );
}
