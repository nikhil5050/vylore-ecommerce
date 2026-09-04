import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";

export default function ResetPasswordPage() {
  return (
    <main className="flex flex-1 flex-col py-16 lg:py-24">
      <Container>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Reset Password" }]} />
        <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">Reset Password</h1>

        <div className="mt-10 max-w-md">
          <Suspense fallback={null}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </Container>
    </main>
  );
}
