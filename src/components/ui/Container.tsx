import { createElement, ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  children: ReactNode;
}

export function Container({
  as: Tag = "div",
  className,
  children,
  ...props
}: ContainerProps) {
  return createElement(
    Tag,
    {
      className: cn("mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10", className),
      ...props,
    },
    children,
  );
}
