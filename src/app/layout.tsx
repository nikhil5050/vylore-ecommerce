import type { Metadata } from "next";
import { Bricolage_Grotesque, Open_Sans } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { siteConfig } from "@/config/site";
import { isComingSoon } from "@/config/launch";

// TEMPORARY stand-in for "Black Mango" (a paid/personal-use display font,
// not on Google Fonts — see AGENTS.md note or ask about licensing). Swap this
// next/font/google call for a next/font/local call against the licensed
// Black Mango files once available; keep the "--font-display" variable name
// so no other file needs to change.
const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const body = Open_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Premium Silver Jewellery`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  // Replaces the old placeholder gem-shaped app/icon.svg — this points
  // straight at the real logo instead, so there's only one favicon source.
  icons: {
    icon: "/logo/logo.png",
    shortcut: "/logo/logo.png",
    apple: "/logo/logo.png",
  },
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ivory text-charcoal">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <SiteChrome comingSoon={isComingSoon}>{children}</SiteChrome>
      </body>
    </html>
  );
}
