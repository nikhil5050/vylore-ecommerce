export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  // { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: Record<"shop" | "about" | "help", NavItem[]> = {
  shop: [
    { label: "Rings", href: "/category/rings" },
    { label: "Necklaces", href: "/category/necklaces" },
    { label: "Earrings", href: "/category/earrings" },
    { label: "Anklets", href: "/category/anklets" },
    { label: "Bracelets", href: "/category/bracelets" },
    
  ],
  about: [
    { label: "Our Story", href: "/about" },
    { label: "Custom Jewellery", href: "/custom-jewellery" },
    { label: "Contact", href: "/contact" },
  ],
  help: [
    { label: "FAQ", href: "/faq" },
    { label: "Shipping", href: "/shipping" },
    { label: "Returns", href: "/returns" },
    { label: "Track Order", href: "/track-order" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms" },
  ],
};
