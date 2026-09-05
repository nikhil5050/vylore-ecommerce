"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Container } from "@/components/ui/Container";
import { AboutHero } from "@/components/about/AboutHero";

// "Behind the craft" video gallery
const craftVideos = [
  {
    id: 49163,
    title: "Made By Hand",
    caption: "Every link and clasp shaped by artisans, not machines.",
    src: "https://assets.mixkit.co/videos/49163/49163-720.mp4",
    poster: "https://assets.mixkit.co/videos/49163/49163-thumb-720-0.jpg",
  },
  {
    id: 34611,
    title: "Detail Obsessed",
    caption: "We zoom in on the millimetres others skip.",
    src: "https://assets.mixkit.co/videos/34611/34611-720.mp4",
    poster: "https://assets.mixkit.co/videos/34611/34611-thumb-720-0.jpg",
  },
  {
    id: 15743,
    title: "Worn With Confidence",
    caption: "Designed to be lived in, not just looked at.",
    src: "https://assets.mixkit.co/videos/15743/15743-720.mp4",
    poster: "https://assets.mixkit.co/videos/15743/15743-thumb-720-0.jpg",
  },
  {
    id: 34213,
    title: "Ready For The World",
    caption: "From the bench to the display case.",
    src: "https://assets.mixkit.co/videos/34213/34213-720.mp4",
    poster: "https://assets.mixkit.co/videos/34213/34213-thumb-720-0.jpg",
  },
];

const marqueeItems = [
  "925 Sterling Silver",
  "Handcrafted Detail",
  "Timeless Design",
  "No Compromise",
  "Family Legacy",
];

function AutoplayVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px" });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (inView) el.play().catch(() => {});
    else el.pause();
  }, [inView]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      className={className}
    />
  );
}

interface LightboxVideo {
  src: string;
  poster?: string;
  title: string;
}

function VideoLightbox({
  video,
  onClose,
}: {
  video: LightboxVideo | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!video) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [video, onClose]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/90 p-3 sm:p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl sm:rounded-3xl bg-black shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close video"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/70 active:scale-95"
            >
              <X className="h-5 w-5" />
            </button>
            <video
              key={video.src}
              src={video.src}
              poster={video.poster}
              controls
              autoPlay
              playsInline
              className="aspect-video w-full bg-black object-contain"
            />
            <p className="px-4 py-3 sm:px-6 sm:py-4 font-serif text-base sm:text-lg text-white">
              {video.title}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function AboutPage() {
  const [lightboxVideo, setLightboxVideo] = useState<LightboxVideo | null>(
    null,
  );
  const craftTrackRef = useRef<HTMLDivElement>(null);

  function scrollCraftTrack(direction: 1 | -1) {
    const el = craftTrackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const amount = (card?.offsetWidth ?? 280) + 16;
    el.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

  return (
    <main className="flex min-h-screen flex-1 flex-col overflow-x-hidden bg-[#FAF9F6]/50">
      <VideoLightbox
        video={lightboxVideo}
        onClose={() => setLightboxVideo(null)}
      />

      {/* Hero Container Wrap */}
      <div className="w-full overflow-hidden">
        <AboutHero />
      </div>

      {/* Scrolling Marquee Divider */}
      <div className="w-full overflow-hidden border-y border-charcoal/10 bg-white py-3 sm:py-4">
        <div className="marquee-viewport flex w-full overflow-hidden">
          <div className="marquee-track flex shrink-0 animate-marquee items-center whitespace-nowrap">
            {[0, 1].map((loopIndex) => (
              <div
                key={loopIndex}
                className="flex shrink-0 items-center"
                aria-hidden={loopIndex === 1}
              >
                {marqueeItems.map((text) => (
                  <span
                    key={text}
                    className="mx-3 sm:mx-6 flex items-center gap-3 sm:gap-6 font-serif text-sm sm:text-lg text-charcoal/70"
                  >
                    {text}
                    <span className="h-1 sm:h-1.5 w-1 sm:w-1.5 rounded-full bg-burgundy shrink-0" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The Beginning Section */}
      <section className="py-12 sm:py-20 lg:py-28 bg-white border-b border-charcoal/5">
        <Container className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn direction="left">
            <div className="relative group aspect-[4/3] sm:aspect-[16/10] lg:aspect-[3/4] w-full overflow-hidden  shadow-lg sm:shadow-xl border border-charcoal/10">
              <Image
                src="https://i.pinimg.com/1200x/18/da/e0/18dae01fedf40609284c25c89768425a.jpg"
                alt="Jewellery Craftsmanship Atelier"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          </FadeIn>

          <FadeIn
            delay={0.1}
            direction="right"
            className="flex flex-col items-start"
          >
            <span className="inline-block rounded-full bg-charcoal/5 px-3 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-muted border border-charcoal/5">
              The Beginning
            </span>
            <h2 className="mt-3 sm:mt-5 font-serif text-2xl sm:text-4xl lg:text-5xl tracking-tight text-charcoal leading-tight sm:leading-none">
              A New Chapter in a Jewellery Legacy
            </h2>
            <p className="mt-3 sm:mt-5 text-sm sm:text-base lg:text-lg leading-relaxed text-black font-light">
              <strong>VYLORE</strong> was founded to bring together two things
              that don&apos;t often meet in the same place: real
              jewellery-business experience, and a modern, design-first point of
              view.
            </p>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-black font-light">
              A New Chapter in a Jewellery Legacy Jewellery has been part of{" "}
              <strong>Akash Kapile’s</strong> world since childhood. Coming from
              a family with more than <strong>25 years of experience </strong>in
              the jewellery and gold business, he grew up around the realities
              of the trade — from understanding metals and products to observing
              customers, craftsmanship and the everyday workings of a jewellery
              business. What began as early exposure eventually became
              experience. With approximately eight years of direct business
              experience, Akash decided to build something of his own: Vylore.
              The brand brings together the knowledge passed down through his
              family with a more contemporary approach to jewellery, design and
              the way people want to wear it today.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center bg-burgundy px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-burgundy-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
              >
                Shop Vylore
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
              <Link
                href="/shop"
                className="text-burgundy underline decoration-burgundy/40 underline-offset-4 transition-colors hover:text-burgundy-dark"
              >
                Explore the collection
              </Link>
              <Link
                href="/contact"
                className="text-charcoal underline decoration-charcoal/30 underline-offset-4 transition-colors hover:text-burgundy"
              >
                Speak with Vylore
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Behind The Craft — Video Slider */}
      <section className="bg-[#FAF9F6] py-12 sm:py-20 lg:py-28">
        <Container>
          <FadeIn className="max-w-2xl">
            <span className="inline-block rounded-full bg-burgundy/10 px-3 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-burgundy border border-burgundy/10">
              Behind The Craft
            </span>
            <h2 className="mt-3 sm:mt-5 font-serif text-2xl sm:text-4xl lg:text-5xl tracking-tight text-charcoal">
              The Hands Behind Every Piece
            </h2>
            <p className="mt-2 sm:mt-4 text-sm sm:text-base lg:text-lg leading-relaxed text-muted font-light">
              Meet the artisans behind Vylore&apos;s handcrafted jewelry every
              clip captures the tools, detail, and care that turn 925 sterling
              silver into an heirloom. Tap to watch, with sound.
            </p>
          </FadeIn>

          <div className="relative mt-8 sm:mt-14">
            <div
              ref={craftTrackRef}
              className="no-scrollbar flex snap-x snap-mandatory gap-4 sm:gap-6 overflow-x-auto pb-4 touch-pan-x -mx-4 px-4 sm:mx-0 sm:px-0"
            >
              {craftVideos.map((clip, index) => (
                <FadeIn
                  key={clip.id}
                  delay={index * 0.08}
                  direction="scale"
                  className="w-[82%] shrink-0 snap-start sm:w-[45%] lg:w-[27%]"
                >
                  <button
                    type="button"
                    onClick={() => setLightboxVideo(clip)}
                    className="group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-charcoal/10 shadow-md sm:shadow-lg text-left focus:outline-none"
                  >
                    <AutoplayVideo
                      src={clip.src}
                      poster={clip.poster}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white/90 text-burgundy shadow-xl transition-transform duration-300 group-hover:scale-110 active:scale-95">
                        <Play
                          className="h-4 w-4 sm:h-5 sm:w-5 translate-x-0.5"
                          fill="currentColor"
                        />
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                      <p className="font-serif text-base sm:text-xl font-medium leading-tight">
                        {clip.title}
                      </p>
                      <p className="mt-1 text-xs text-ivory/80 font-light line-clamp-2">
                        {clip.caption}
                      </p>
                    </div>
                  </button>
                </FadeIn>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-4 sm:mt-6 flex justify-end gap-2 pr-1">
              <button
                type="button"
                onClick={() => scrollCraftTrack(-1)}
                aria-label="Scroll to previous videos"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/20 text-charcoal transition-colors hover:border-burgundy hover:text-burgundy active:scale-95"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollCraftTrack(1)}
                aria-label="Scroll to next videos"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/20 text-charcoal transition-colors hover:border-burgundy hover:text-burgundy active:scale-95"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* Legacy Banner Highlight */}
      <section className="bg-charcoal py-14 sm:py-20 lg:py-28 text-ivory relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] sm:[background-size:20px_20px]" />
        <motion.div
          className="absolute -top-16 -right-16 h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-burgundy/30 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <Container className="relative max-w-3xl text-center px-4">
          <FadeIn direction="scale">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-champagne font-medium">
              Family Legacy
            </span>
            <h2 className="mt-3 font-serif text-2xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-tight">
              More Than Twenty-Five Years in the Making
            </h2>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg leading-relaxed text-ivory/80 font-light">
              Vylore comes from a family with more than twenty-five years of
              experience in the jewellery and gold business. That deep-rooted
              expertise in raw materials, intricate craftsmanship, and
              structural integrity sits behind every single piece we dispatch.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Founder Section */}
      <section className="py-12 sm:py-20 lg:py-28">
        <Container className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn className="lg:order-2" direction="right">
            <div className="relative group aspect-[4/5] sm:aspect-[4/3] lg:aspect-[3/4] w-full overflow-hidden  shadow-lg sm:shadow-xl border border-charcoal/10">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
                alt="Akash Kapile - Founder of Vylore"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent opacity-95" />
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 text-white">
                <p className="font-serif text-xl sm:text-3xl">Akash Kapile</p>
                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-champagne mt-1">
                  Founder &amp; Director
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn
            delay={0.1}
            className="lg:order-1 flex flex-col items-start"
            direction="left"
          >
            <span className="inline-block rounded-full bg-burgundy/10 px-3 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-burgundy border border-burgundy/10">
              The Founder
            </span>
            <h2 className="mt-3 sm:mt-5 font-serif text-2xl sm:text-4xl lg:text-5xl tracking-tight text-charcoal">
              Akash Kapile
            </h2>
            <p className="mt-3 sm:mt-5 text-sm sm:text-base lg:text-lg  text-black font-light">
               <strong>Akash Kapile</strong>, Founder of Vylore, grew up inside his family's 25-year jewellery and gold business learning metals, customers, and the trade from childhood, long before he ran one. Nearly eight years of direct business experience later, he identified a specific gap in the silver jewellery market: customers wanted contemporary jewelry with a Exceptional, distinctive presence, but the category stayed saturated with limited design variety, pushing them back toward gold by default rather than choice.
            </p>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base  text-black font-light">
             

He founded Vylore to close that gap building custom jewelry design around individuality, quality, and craftsmanship rather than competing on price. Akash's focus on purity transparency, uncompromising quality standards, and one-to-one customisation is shaping Vylore's early identity as a design-led alternative in a market that has, until now, rewarded volume over distinction.
            </p>
            <blockquote className="mt-6 sm:mt-8 border-l-2 border-burgundy pl-4 sm:pl-6 italic font-serif text-sm sm:text-lg text-charcoal">
              &ldquo;We don&apos;t just make accessories; we refine heritage
              techniques into everyday modern heirlooms.&rdquo;
            </blockquote>
          </FadeIn>
        </Container>
      </section>

      {/* Core Values Responsive Cards */}
      <section className="bg-white py-12 sm:py-20 lg:py-28 border-y border-charcoal/5">
        <Container>
          <div className="grid gap-5 sm:gap-8 md:grid-cols-2">
            <FadeIn
              direction="left"
              className="group rounded-2xl sm:rounded-3xl border border-charcoal/10 bg-[#FAF9F6] p-5 sm:p-10 lg:p-12 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-burgundy/30"
            >
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-burgundy font-semibold">
                Why Vylore
              </span>
              <h3 className="mt-3 sm:mt-4 font-serif text-xl sm:text-3xl text-charcoal leading-snug">
                Family Knowledge. A Founder&apos;s Vision.
              </h3>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-black font-light">
                Sidheshwar Kapile spent over 25 years learning what makes metal
                and jewellery craftsmanship hold up through Vaishnavi Jewellers,
                the family's original trade. His son Akash spent 8 years
                watching a different gap open: customers wanted modern design
                jewelry but kept defaulting to gold, because silver jewelry
                design never offered enough variety to compete.
                <br />
                <br />
                Vylore is the answer to that gap which is also why the name
                carries the letter V forward. Not a new business replacing an
                old one, but its next-generation evolution in contemporary
                jewelry. An evolution of experience not a business apart from
                it.
              </p>
            </FadeIn>

            <FadeIn
              delay={0.1}
              direction="right"
              className="group rounded-2xl sm:rounded-3xl border border-charcoal/10 bg-[#FAF9F6] p-5 sm:p-10 lg:p-12 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-burgundy/30"
            >
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-burgundy font-semibold">
                Quality &amp; Purity
              </span>
              <h3 className="mt-3 sm:mt-4 font-serif text-xl sm:text-3xl text-charcoal leading-snug">
                Know What You Wear
              </h3>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-muted font-light">
                Purity standards at Vylore aren't set by a marketing team
                they're set by Sidheshwar Kapile, whose 25 years in the
                jewellery and gold trade shaped what "acceptable" means here.
                Every piece carries clear hallmark and 925 sterling silver
                purity disclosure, backed by documentation the moment you ask
                for it. No compromise on metal quality, no exceptions made under
                pressure.
                <br />
                <br />
                Before dispatch, every piece passes a strict quality check
                against that same standard. That's what pure silver purity
                should mean: not a claim, a standard someone is personally
                accountable for.
              </p>
            </FadeIn>

            <FadeIn
              delay={0.2}
              direction="left"
              className="group rounded-2xl sm:rounded-3xl border border-charcoal/10 bg-[#FAF9F6] p-5 sm:p-10 lg:p-12 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-burgundy/30"
            >
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-burgundy font-semibold">
                Another Reason to Love Us
              </span>
              <h3 className="mt-3 sm:mt-4 font-serif text-xl sm:text-3xl text-charcoal leading-snug">
                Jewellery Made to Mean More
              </h3>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-muted font-light">
                We believe fine jewellery should mean something beyond the
                moment you buy it. Every Vylore piece is built as heirloom
                jewellery designed to outlast trends and carry forward, the way
                our family&apos;s 25-year legacy in the jewellery and gold
                business has been carried into Vylore itself.
              </p>
              {/* <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-muted font-light">
                We concentrate on what actually earns trust: verified purity, transparent billing on every transaction, and design integrity that&apos;s never diluted under pressure. It&apos;s how we turn a piece of jewellery into something with real meaning, not just an accessory, but forever jewellery meant to be passed down.
              </p> */}
            </FadeIn>

            <FadeIn
              delay={0.3}
              direction="right"
              className="group rounded-2xl sm:rounded-3xl border border-charcoal/10 bg-[#FAF9F6] p-5 sm:p-10 lg:p-12 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-burgundy/30"
            >
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-burgundy font-semibold">
                Our Commitments
              </span>
              <h3 className="mt-3 sm:mt-4 font-serif text-xl sm:text-3xl text-charcoal leading-snug">
                Standards We Hold Every Time
              </h3>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-muted font-light">
                Fine jewellery built to last requires more than good intentions;
                it requires standards we hold to on every piece, every time.
                Every Vylore piece starts with genuine silver jewellery and
                verified 925 sterling silver purity, backed by proper
                documentation whenever it&apos;s asked for. Design, metal
                quality, and craftsmanship are never diluted under pressure, and
                every transaction is transparently invoiced and accounted for.
              </p>
              {/* <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-muted font-light">
                This is how a trusted jewellery brand earns that trust: not with promises, but with thoughtful jewellery and realistic commitments we actually deliver on, every time.
              </p> */}
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Design Philosophy Section */}
      <section className="py-12 sm:py-20 lg:py-28">
        <Container className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn direction="left">
            <div className="relative group aspect-[4/3] sm:aspect-[16/10] lg:aspect-[3/4] w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-charcoal/10">
              <Image
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop"
                alt="Minimalist Fine Silver Design"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </FadeIn>

          <FadeIn
            delay={0.1}
            direction="right"
            className="flex flex-col items-start"
          >
            <span className="inline-block rounded-full bg-charcoal/5 px-3 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-muted border border-charcoal/5">
              Design Philosophy
            </span>
            <h2 className="mt-3 sm:mt-5 font-serif text-2xl sm:text-4xl lg:text-5xl tracking-tight text-charcoal">
              Distinctive, Not Traditional
            </h2>
            <p className="mt-3 sm:mt-5 text-sm sm:text-base lg:text-lg leading-relaxed text-muted font-light">
              Vylore is designed to feel modern, considered, and quietly
              confident — never ornate purely for its own sake.
            </p>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-muted font-light">
              Every piece is meant to look intentional: a small number of strong
              design ideas resolved carefully, rather than a large number of
              ideas resolved quickly.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Statement Banner (No Compromise) */}
      <section className="relative overflow-hidden bg-burgundy py-14 sm:py-20 lg:py-32 text-ivory shadow-2xl">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:14px_14px] sm:[background-size:18px_18px]" />
        <Container className="relative max-w-3xl text-center px-4">
          <FadeIn direction="scale">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-champagne font-medium">
              Our Philosophy
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white">
              No Compromise.
            </h2>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg leading-relaxed text-ivory/90 font-light">
              No compromise on materials. No compromise on design. No compromise
              on how a piece is finished, billed, or delivered. It is a simple
              standard, and it shapes every decision behind Vylore.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Future Vision */}
      <section className="py-12 sm:py-20 lg:py-32">
        <Container className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-20">
          <FadeIn className="lg:order-2" direction="right">
            <div className="relative group aspect-[4/3] sm:aspect-[16/10] lg:aspect-[3/4] w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-charcoal/10">
              <Image
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop"
                alt="Silver Ring Craftsmanship"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </FadeIn>

          <FadeIn
            delay={0.1}
            className="lg:order-1 flex flex-col items-start"
            direction="left"
          >
            <span className="inline-block rounded-full bg-charcoal/5 px-3 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-muted border border-charcoal/5">
              Future Vision
            </span>
            <h2 className="mt-3 sm:mt-5 font-serif text-2xl sm:text-4xl lg:text-5xl tracking-tight text-charcoal">
              Building for the Long Term
            </h2>
            <p className="mt-3 sm:mt-5 text-sm sm:text-base lg:text-lg leading-relaxed text-muted font-light">
              Vylore is being built with a long-term view — starting with silver
              jewellery for today&apos;s customer, with the ambition to grow
              into a brand recognized globally.
            </p>
          </FadeIn>
        </Container>
      </section>
    </main>
  );
}
