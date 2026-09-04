import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Reset Password",
  description: "Set a new password for your Vylore account.",
  path: "/reset-password",
  noIndex: true,
});

export default function ResetPasswordLayout({ children }: { children: ReactNode }) {
  return children;
}
