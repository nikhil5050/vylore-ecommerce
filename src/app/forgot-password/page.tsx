import type { Metadata } from "next";
import Link from "next/link";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Forgot Password",
  description: "Reset your Vylore account password.",
  path: "/forgot-password",
  noIndex: true,
});

export default function ForgotPasswordPage() {
  return (
    <main className="flex flex-1 flex-col py-16 lg:py-24">
      <Container>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Forgot Password" }]} />
        <h1 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">Forgot Password</h1>
        <p className="mt-3 max-w-md text-sm text-muted">
          Enter the email address on your account and we&apos;ll send you a link to reset your password.
        </p>

        <div className="mt-10 max-w-md">
          <ForgotPasswordForm />
          <p className="mt-6 text-sm text-muted">
            Remembered it?{" "}
            <Link href="/login" className="text-burgundy transition-colors hover:text-burgundy-dark">
              Back to sign in
            </Link>
          </p>
        </div>
      </Container>
    </main>
  );
}
