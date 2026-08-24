import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

// Icons are decorative accompaniments to labeled buttons/links throughout this
// codebase, so they're hidden from screen readers by default. Pass
// aria-hidden={false} (or an aria-label) at the call site for the rare
// standalone/meaningful icon.
function baseProps(props: IconProps): IconProps {
  return {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    focusable: "false",
    ...props,
  };
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.6-3.6 5-5.5 7.5-5.5s5.9 1.9 7.5 5.5" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M12 20s-7.5-4.6-10-9.2C.6 7.6 2.1 4.5 5.2 4c2-.3 3.9.6 5.1 2.3l1.7 2 1.7-2C15 4.6 16.9 3.7 18.9 4c3.1.5 4.6 3.6 3.2 6.8C19.5 15.4 12 20 12 20Z" />
    </svg>
  );
}

export function BagIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M6 8h12l-.9 11.1a2 2 0 0 1-2 1.9H8.9a2 2 0 0 1-2-1.9L6 8Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M14 8.5h2V5h-2c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v6h3v-6H16l.5-3h-3V8.9c0-.3.2-.4.5-.4Z" />
    </svg>
  );
}

export function GemIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M8 4h8l4 5-8 11L4 9Z" />
      <path d="M4 9h16" />
      <path d="M9.5 9 12 20 14.5 9" />
      <path d="M8 4l1.5 5M16 4l-1.5 5" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <line x1="4" y1="12" x2="20" y2="12" />
      <polyline points="14 6 20 12 14 18" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function PinterestIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 19c.7-2.7 1.3-5.2 2-8" />
      <path d="M9 12.2c-.4-2.6 1.4-4.7 3.8-4.7 2 0 3.5 1.4 3.5 3.4 0 2.6-1.3 4.6-3.4 4.6-1 0-1.8-.5-2.1-1.2" />
    </svg>
  );
}
