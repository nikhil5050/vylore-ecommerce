import { Suspense } from "react";
import { VerifyEmailStatus } from "@/components/auth/VerifyEmailStatus";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";

export default function VerifyEmailPage() {
  return (
    <main className="flex flex-1 flex-col py-16 lg:py-24">
      <Container>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Verify Email" }]} />
        <div className="mx-auto mt-4 max-w-md">
          <Suspense fallback={null}>
            <VerifyEmailStatus />
          </Suspense>
        </div>
      </Container>
    </main>
  );
}
