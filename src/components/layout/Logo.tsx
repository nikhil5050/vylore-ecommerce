import Image from "next/image";
import { cn } from "@/utils/cn";

interface LogoProps {
  size?: "sm" | "md";
  className?: string;
}

export function Logo({ size = "md", className }: LogoProps) {
  const logoSize = size === "sm" ? 32 : 48;

  return (
    <>
      <Image
        src="/logo/logo.png"
        alt="Vylore"
        width={logoSize}
        height={logoSize}
        className={cn("select-none", className)}
        priority
      />
    </>
    
    
  );
}