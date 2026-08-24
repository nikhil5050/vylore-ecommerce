import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col py-16 lg:py-24">
      <Container>
        <EmptyState
          title="Page Not Found"
          description="The page you're looking for doesn't exist or may have moved."
          action={
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/" variant="primary" size="md">
                Back to Home
              </Button>
              <Button href="/shop" variant="secondary" size="md">
                Shop All
              </Button>
            </div>
          }
        />
      </Container>
    </main>
  );
}
