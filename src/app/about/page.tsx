"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";

// Mixed-media hero slides — three photo slides and one looping video slide.
const heroSlides: Array<
  | { id: number; type: "image"; src: string; title: string; subtitle: string }
  | { id: number; type: "video"; src: string; poster: string; title: string; subtitle: string }
> = [
  {
    id: 1,
    type: "image",
    src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop",
    title: "Handcrafted Silver Elegance",
    subtitle: "Precision engineering meets timeless metal art",
  },
  {
    id: 2,
    type: "video",
    src: "https://assets.mixkit.co/videos/32284/32284-720.mp4",
    poster: "https://assets.mixkit.co/videos/32284/32284-thumb-720-0.jpg",
    title: "Living, Breathing Silver",
    subtitle: "Watch every finish catch the light",
  },
  {
    id: 3,
    type: "image",
    src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop",
    title: "Bespoke Modern Heritage",
    subtitle: "Over two decades of refined jewellery expertise",
  },
  {
    id: 4,
    type: "image",
    src: "https://images.unsplash.com/photo-1611591475155-4282fc289e78?q=80&w=1200&auto=format&fit=crop",
    title: "Uncompromised Purity",
    subtitle: "925 Sterling Silver polished to perfection",
  },
];

// "Behind the craft" video gallery — click any clip to watch it full-size with sound.
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

const marqueeItems = ["925 Sterling Silver", "Handcrafted Detail", "Timeless Design", "No Compromise", "Family Legacy"];

// Plays only while scrolled into view, and pauses otherwise — keeps four
// autoplaying videos in the craft gallery from all competing for bandwidth
// at once. Shared by the hero's video slide too.
function AutoplayVideo({ src, poster, className }: { src: string; poster?: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px" });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (inView) el.play().catch(() => {});
    else el.pause();
  }, [inView]);

  return <video ref={ref} src={src} poster={poster} muted loop playsInline className={className} />;
}

interface LightboxVideo {
  src: string;
  poster?: string;
  title: string;
}

function VideoLightbox({ video, onClose }: { video: LightboxVideo | null; onClose: () => void }) {
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/90 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-black shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close video"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </button>
            <video key={video.src} src={video.src} poster={video.poster} controls autoPlay playsInline className="aspect-video w-full bg-black" />
            <p className="px-6 py-4 font-serif text-lg text-white">{video.title}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StatCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1100;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);

  return (
    <p ref={ref} className="font-serif text-3xl sm:text-4xl font-bold text-burgundy">
      {value}
      {suffix}
    </p>
  );
}

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxVideo, setLightboxVideo] = useState<LightboxVideo | null>(null);
  const craftTrackRef = useRef<HTMLDivElement>(null);

  // Auto-play feature for the visual slider
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  function scrollCraftTrack(direction: 1 | -1) {
    const el = craftTrackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const amount = (card?.offsetWidth ?? 320) + 24;
    el.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

  const activeSlide = heroSlides[currentSlide];

  return (
    <main className="flex flex-1 flex-col overflow-x-hidden bg-[#FAF9F6]/50">
      <VideoLightbox video={lightboxVideo} onClose={() => setLightboxVideo(null)} />

      {/* Hero Section — full-bleed cinematic media slider, editorial overlay layout */}
      <section
        className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-charcoal text-ivory"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Full-bleed background slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {activeSlide.type === "video" ? (
              <AutoplayVideo src={activeSlide.src} poster={activeSlide.poster} className="h-full w-full object-cover" />
            ) : (
              <Image src={activeSlide.src} alt={activeSlide.title} fill priority={activeSlide.id === 1} className="object-cover object-center" />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Legibility gradients */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-charcoal/10" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/10 to-transparent" />

        {/* Floating breadcrumb chip */}
        <div className="absolute inset-x-0 top-0 z-20 pt-6 lg:pt-10">
          <Container className="flex items-center justify-between">
            <div className="inline-flex rounded-full bg-ivory/95 px-4 py-2 shadow-lg backdrop-blur-md">
              <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
            </div>
            {activeSlide.type === "video" && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-md">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                Live Footage
              </span>
            )}
          </Container>
        </div>

        {/* Main content, pinned to the bottom like an editorial cover */}
        <Container className="relative z-20 w-full pb-24 pt-40 sm:pb-28 lg:pb-32">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
            <FadeIn direction="up" className="lg:col-span-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-champagne/30 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-champagne backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-champagne animate-pulse" />
                About Vylore
              </span>
              <h1 className="mt-6 font-serif text-5xl leading-[1.08] text-white sm:text-6xl lg:text-7xl tracking-tight">
                Legacy Behind Us.
                <br />
                <span className="italic font-normal text-champagne">Vision Ahead.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/80 sm:text-lg font-light">
                Vylore is a modern silver jewellery brand built on family experience and a clear point of view on design. We bridge authentic craftsmanship with contemporary aesthetic standards.
              </p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8 flex items-center gap-2 text-xs uppercase tracking-widest text-ivory/60"
                >
                  <span className="h-1 w-1 rounded-full bg-champagne" />
                  {activeSlide.title} — {activeSlide.subtitle}
                </motion.div>
              </AnimatePresence>
            </FadeIn>

            <FadeIn direction="up" delay={0.15} className="lg:col-span-4">
              <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-md sm:p-8">
                <StatCounter target={25} suffix="+" />
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-ivory/80">Years of Heritage</p>
                <div className="mt-5 h-px w-full bg-white/15" />
                <p className="mt-5 text-sm leading-relaxed text-ivory/70 font-light">
                  Family expertise in fine metals, shaped into a brand built for today.
                </p>
              </div>
            </FadeIn>
          </div>
        </Container>

        {/* Bottom bar: slide dots + scroll cue */}
        <div className="absolute inset-x-0 bottom-6 z-20 lg:bottom-10">
          <Container className="flex items-center justify-between">
            <div className="flex gap-2">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => document.getElementById("beginning")?.scrollIntoView({ behavior: "smooth" })}
              className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-ivory/70 transition-colors hover:text-white"
            >
              Our Story
              <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </button>
          </Container>
        </div>
      </section>

      {/* Scrolling Marquee Divider */}
      <div className="marquee-viewport border-y border-charcoal/10 bg-white py-4">
        <div className="marquee-track">
          {[0, 1].map((loopIndex) => (
            <div key={loopIndex} className="flex shrink-0 items-center" aria-hidden={loopIndex === 1}>
              {marqueeItems.map((text) => (
                <span key={text} className="mx-6 flex items-center gap-6 font-serif text-lg text-charcoal/60 sm:text-xl">
                  {text}
                  <span className="h-1.5 w-1.5 rounded-full bg-burgundy" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* The Beginning Section */}
      <section id="beginning" className="py-16 sm:py-20 lg:py-28 bg-white border-b border-charcoal/5">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <FadeIn direction="left">
            <div className="relative group aspect-[4/3] sm:aspect-[16/10] lg:aspect-[3/4] overflow-hidden rounded-3xl shadow-xl border border-charcoal/10">
              <Image
                src="https://images.unsplash.com/photo-1611591475155-4282fc289e78?q=80&w=1000&auto=format&fit=crop"
                alt="Jewellery Craftsmanship Atelier"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          </FadeIn>

          <FadeIn delay={0.1} direction="right">
            <span className="inline-block rounded-full bg-charcoal/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted border border-charcoal/5">
              The Beginning
            </span>
            <h2 className="mt-4 sm:mt-6 font-serif text-3xl text-charcoal sm:text-4xl lg:text-5xl tracking-tight">A New Brand, Not a New Idea</h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-muted font-light">
              Vylore was founded to bring together two things that don&apos;t often meet in the same place: real jewellery-business experience, and a modern, design-first point of view.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted font-light">
              Rather than starting from nothing, Vylore started from what was already known — taking decades of precious metal expertise and asking what it could look like built thoughtfully for today.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Behind The Craft — Video Slider */}
      <section className="bg-[#FAF9F6] py-16 sm:py-20 lg:py-28">
        <Container>
          <FadeIn className="max-w-2xl">
            <span className="inline-block rounded-full bg-burgundy/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-burgundy border border-burgundy/10">
              Behind The Craft
            </span>
            <h2 className="mt-4 sm:mt-6 font-serif text-3xl text-charcoal sm:text-4xl lg:text-5xl tracking-tight">Watch It Come Together</h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted font-light">
              A closer look at the hands, tools, and details behind every Vylore piece — tap any clip to watch it in full, with sound.
            </p>
          </FadeIn>

          <div className="relative mt-10 sm:mt-14">
            <div ref={craftTrackRef} className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 sm:gap-6">
              {craftVideos.map((clip, index) => (
                <FadeIn key={clip.id} delay={index * 0.08} direction="scale" className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[27%]">
                  <button
                    type="button"
                    onClick={() => setLightboxVideo(clip)}
                    className="group relative block aspect-[3/4] w-full overflow-hidden rounded-3xl border border-charcoal/10 shadow-lg text-left"
                  >
                    <AutoplayVideo
                      src={clip.src}
                      poster={clip.poster}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-burgundy shadow-xl transition-transform duration-300 group-hover:scale-110">
                        <Play className="h-5 w-5 translate-x-0.5" fill="currentColor" />
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                      <p className="font-serif text-lg sm:text-xl">{clip.title}</p>
                      <p className="mt-1 text-xs text-ivory/80 font-light">{clip.caption}</p>
                    </div>
                  </button>
                </FadeIn>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => scrollCraftTrack(-1)}
                aria-label="Scroll to previous videos"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-burgundy hover:text-burgundy"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollCraftTrack(1)}
                aria-label="Scroll to next videos"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/15 text-charcoal transition-colors hover:border-burgundy hover:text-burgundy"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* Legacy Banner Highlight */}
      <section className="bg-charcoal py-16 sm:py-20 lg:py-28 text-ivory relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        <motion.div
          className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-burgundy/30 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <Container className="relative max-w-3xl text-center">
          <FadeIn direction="scale">
            <span className="text-xs uppercase tracking-[0.25em] text-champagne font-medium">Family Legacy</span>
            <h2 className="mt-4 font-serif text-3xl text-white sm:text-4xl lg:text-5xl tracking-tight">More Than Twenty-Five Years in the Making</h2>
            <p className="mt-6 text-base leading-relaxed text-ivory/80 sm:text-lg font-light">
              Vylore comes from a family with more than twenty-five years of experience in the jewellery and gold business. That deep-rooted expertise in raw materials, intricate craftsmanship, and structural integrity sits behind every single piece we dispatch.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Founder Section */}
      <section className="py-16 sm:py-20 lg:py-28">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <FadeIn className="lg:order-2" direction="right">
            <div className="relative group aspect-[4/5] sm:aspect-[4/3] lg:aspect-[3/4] overflow-hidden rounded-3xl shadow-xl border border-charcoal/10">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
                alt="Akash Kapile - Founder of Vylore"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-serif text-2xl sm:text-3xl">Akash Kapile</p>
                <p className="text-xs uppercase tracking-widest text-champagne mt-1">Founder &amp; Director</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="lg:order-1" direction="left">
            <span className="inline-block rounded-full bg-burgundy/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-burgundy border border-burgundy/10">
              The Founder
            </span>
            <h2 className="mt-4 sm:mt-6 font-serif text-3xl text-charcoal sm:text-4xl lg:text-5xl tracking-tight">Akash Kapile</h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-muted font-light">
              Vylore is founded by Akash Kapile, who brings close to eight years of direct business experience to the brand.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted font-light">
              His role has been to take what the family already understood about fine metals and shape it into something built for a new generation of design-conscious customers.
            </p>
            <blockquote className="mt-8 border-l-2 border-burgundy pl-6 italic font-serif text-base sm:text-lg text-charcoal">
              &ldquo;We don&apos;t just make accessories; we refine heritage techniques into everyday modern heirlooms.&rdquo;
            </blockquote>
          </FadeIn>
        </Container>
      </section>

      {/* Core Values Responsive Cards */}
      <section className="bg-white py-16 sm:py-20 lg:py-28 border-y border-charcoal/5">
        <Container>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            <FadeIn direction="left" className="group rounded-3xl border border-charcoal/10 bg-[#FAF9F6] p-6 sm:p-10 lg:p-12 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-burgundy/30">
              <span className="text-xs uppercase tracking-widest text-burgundy font-semibold">Why Vylore</span>
              <h3 className="mt-4 font-serif text-2xl text-charcoal sm:text-3xl">Family Knowledge. A Founder&apos;s Vision.</h3>
              <p className="mt-4 text-base leading-relaxed text-muted font-light">
                Vylore exists on the belief that jewellery businesses don&apos;t need to choose between heritage and modernity. The family provides the institutional knowledge. The founder provides the clear directional perspective.
              </p>
            </FadeIn>

            <FadeIn delay={0.1} direction="right" className="group rounded-3xl border border-charcoal/10 bg-[#FAF9F6] p-6 sm:p-10 lg:p-12 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-burgundy/30">
              <span className="text-xs uppercase tracking-widest text-burgundy font-semibold">Quality &amp; Purity</span>
              <h3 className="mt-4 font-serif text-2xl text-charcoal sm:text-3xl">Know What You Wear</h3>
              <p className="mt-4 text-base leading-relaxed text-muted font-light">
                Vylore believes customers should be able to understand the quality of what they buy. Metal hallmark and purity information is clearly disclosed, and every piece undergoes strict quality check before dispatch.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Design Philosophy Section */}
      <section className="py-16 sm:py-20 lg:py-28">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <FadeIn direction="left">
            <div className="relative group aspect-[4/3] sm:aspect-[16/10] lg:aspect-[3/4] overflow-hidden rounded-3xl shadow-xl border border-charcoal/10">
              <Image
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop"
                alt="Minimalist Fine Silver Design"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.1} direction="right">
            <span className="inline-block rounded-full bg-charcoal/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted border border-charcoal/5">
              Design Philosophy
            </span>
            <h2 className="mt-4 sm:mt-6 font-serif text-3xl text-charcoal sm:text-4xl lg:text-5xl tracking-tight">Distinctive, Not Traditional</h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-muted font-light">
              Vylore is designed to feel modern, considered, and quietly confident — never ornate purely for its own sake.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted font-light">
              Every piece is meant to look intentional: a small number of strong design ideas resolved carefully, rather than a large number of ideas resolved quickly.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Statement Banner (No Compromise) */}
      <section className="relative overflow-hidden bg-burgundy py-20 text-ivory lg:py-32 shadow-2xl">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:18px_18px]" />
        <Container className="relative max-w-3xl text-center">
          <FadeIn direction="scale">
            <span className="text-xs uppercase tracking-[0.3em] text-champagne font-medium">Our Philosophy</span>
            <h2 className="mt-4 font-serif text-4xl sm:text-6xl tracking-tight text-white">No Compromise.</h2>
            <p className="mt-6 text-base leading-relaxed text-ivory/90 sm:text-lg font-light">
              No compromise on materials. No compromise on design. No compromise on how a piece is finished, billed, or delivered. It is a simple standard, and it shapes every decision behind Vylore.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Future Vision */}
      <section className="py-16 sm:py-20 lg:py-32">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <FadeIn className="lg:order-2" direction="right">
            <div className="relative group aspect-[4/3] sm:aspect-[16/10] lg:aspect-[3/4] overflow-hidden rounded-3xl shadow-xl border border-charcoal/10">
              <Image
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop"
                alt="Silver Ring Craftsmanship"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="lg:order-1" direction="left">
            <span className="inline-block rounded-full bg-charcoal/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted border border-charcoal/5">
              Future Vision
            </span>
            <h2 className="mt-4 sm:mt-6 font-serif text-3xl text-charcoal sm:text-4xl lg:text-5xl tracking-tight">Building for the Long Term</h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-muted font-light">
              Vylore is being built with a long-term view — starting with silver jewellery for today&apos;s customer, with the ambition to grow into a brand recognized globally.
            </p>
          </FadeIn>
        </Container>
      </section>
    </main>
  );
}
