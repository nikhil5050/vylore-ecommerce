import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

const gridImages = {
  heroLarge: "https://ik.imagekit.io/vyloreimgs/vylore/Grid%20images/nacklace1.png",
  featuredWide: "https://ik.imagekit.io/vyloreimgs/vylore/Grid%20images/necklace2.png",
  card1: "https://ik.imagekit.io/vyloreimgs/vylore/Grid%20images/necklace3.png",
  card2: "https://ik.imagekit.io/vyloreimgs/vylore/Grid%20images/necklace4.png",
  card3: "https://ik.imagekit.io/vyloreimgs/vylore/Grid%20images/nacklace5.png",
};

export function HeroGrid() {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <Container>
        {/* Asymmetrical Grid matching reference photo layout */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
          
          {/* --- LEFT HERO BANNER (Full height, vertical hero card) --- */}
          <FadeIn className="lg:col-span-5 h-full">
            <div className="group relative min-h-[500px] sm:min-h-[580px] lg:h-full w-full overflow-hidden border border-charcoal/10 bg-charcoal">
              {/* Background Image with smooth zoom on hover */}
              <Image
                src={gridImages.heroLarge}
                alt="Vylore Royal Emerald & Diamond Necklace Collection"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-105 opacity-90"
              />

              {/* Gradient overlay for readability positioned from right-top */}
              <div className="absolute inset-0 bg-gradient-to-bl from-charcoal/90 via-charcoal/40 to-transparent" />

              {/* Content Overlay - Shifted to TOP RIGHT so necklace & subject are clear */}
              <div className="absolute inset-0 flex flex-col justify-start items-end p-6 sm:p-10 text-right">
                <div className="max-w-xs flex flex-col items-end">
                  <p className="eyebrow text-xs tracking-widest text-white uppercase font-semibold">
                    Heritage Collection
                  </p>
                  <h2 className="mt-2 font-serif text-2xl sm:text-3xl leading-snug text-white">
                    Crafted for those who wear their brilliance with pride
                  </h2>
                  
                  <div className="mt-6">
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal transition-colors hover:bg-burgundy hover:text-white"
                    >
                      <span>Shop Now</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* --- RIGHT COLUMN (Split into Top Wide Banner + Bottom 3 Cards) --- */}
          <div className="flex flex-col gap-4 lg:col-span-7 lg:gap-6">
            
            {/* TOP FEATURED WIDE BANNER */}
            <FadeIn delay={0.1}>
              <div className="group relative min-h-[280px] sm:min-h-[320px] w-full overflow-hidden  border border-burgundy/20 bg-burgundy/95">
                {/* Product background image */}
                <Image
                  src={gridImages.featuredWide}
                  alt="Vylore Timeless Diamond Necklace"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-right transition-transform duration-700 ease-out group-hover:scale-105 opacity-80"
                />

                {/* Dark subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-burgundy/95 via-burgundy/60 to-transparent" />

                {/* Content Overlay */}
                <div className="relative z-10 flex h-full min-h-[280px] sm:min-h-[320px] flex-col justify-center p-6 sm:p-10 max-w-md text-white">
                  <p className="eyebrow text-xs tracking-widest text-white/80 uppercase font-semibold">
                    Signature Edition
                  </p>
                  <h3 className="mt-2 font-serif text-2xl sm:text-3xl leading-snug text-white">
                    Signature Silver Jewellery, Designed to Be Remembered.
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80">
                    Explore refined silhouettes, considered details and distinctive
                    designs created to bring character to every look.
                  </p>

                  <div className="mt-6">
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal transition-colors hover:bg-charcoal hover:text-white"
                    >
                      <span>Explore Signature</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* BOTTOM 3 HIGHLIGHT CARDS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
              
              {/* Card 1 */}
              <FadeIn delay={0.15}>
                <Link href="/shop" className="group block">
                  <div className="relative aspect-square w-full overflow-hidden border border-charcoal/10 bg-[#FAF9F6]">
                    <Image
                      src={gridImages.card1}
                      alt="Vylore Luxury Earrings"
                      fill
                      sizes="(max-width: 640px) 100vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-charcoal/10 transition-opacity group-hover:opacity-0" />
                    <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-charcoal shadow-sm transition-transform group-hover:scale-110 group-hover:bg-burgundy group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </FadeIn>

              {/* Card 2 */}
              <FadeIn delay={0.2} className="hidden sm:block">
                <Link href="/shop" className="group block">
                  <div className="relative aspect-square w-full overflow-hidden  border border-charcoal/10 bg-[#FAF9F6]">
                    <Image
                      src={gridImages.card2}
                      alt="Vylore Designer Necklace"
                      fill
                      sizes="(max-width: 640px) 100vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-charcoal/10 transition-opacity group-hover:opacity-0" />
                    <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-charcoal shadow-sm transition-transform group-hover:scale-110 group-hover:bg-burgundy group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </FadeIn>

              {/* Card 3 (Updated with necklace5.png) */}
              <FadeIn delay={0.25} className="hidden sm:block">
                <Link href="/shop" className="group block">
                  <div className="relative aspect-square w-full overflow-hidden  border border-charcoal/10 bg-[#FAF9F6]">
                    <Image
                      src={gridImages.card3}
                      alt="Vylore Fine Jewellery Detail"
                      fill
                      sizes="(max-width: 640px) 100vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-charcoal/10 transition-opacity group-hover:opacity-0" />
                    <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-charcoal shadow-sm transition-transform group-hover:scale-110 group-hover:bg-burgundy group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </FadeIn>

            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}