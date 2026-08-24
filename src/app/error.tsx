"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col py-16 lg:py-24">
      <Container>
        <ErrorMessage
          title="Something went wrong"
          description="An unexpected error occurred. Please try again, or head back to the homepage."
          action={
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="primary" size="md" onClick={reset}>
                Try Again
              </Button>
              <Button href="/" variant="secondary" size="md">
                Back to Home
              </Button>
            </div>
          }
        />
      </Container>
    </main>
  );
}
