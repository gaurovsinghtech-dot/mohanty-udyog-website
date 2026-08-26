"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Cpu,
  Zap,
  Factory,
  CheckCircle2,
  FileText,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

interface HeroSlide {
  id: number;
  eyebrow: string;
  titleRed: string;
  titleGreen: string;
  titleSuffix: string;
  subtitle: string;
  capacityTag: string;
  image: string;
  bullets: string[];
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  cardTitle: string;
  cardSubtitle: string;
  cardLink: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    eyebrow: "A MARK OF QUALITY & TRUST • ISO 9001:2015 CERTIFIED",
    titleRed: "Paper Plate",
    titleGreen: "Making Machines",
    titleSuffix: "High Performance",
    subtitle:
      "Engineered for maximum efficiency, durability and high output. Fully automatic, semi automatic, and heavy-duty hydraulic paper plate machines manufactured in Jagatpur Industrial Estate, Cuttack.",
    capacityTag: "Capacity: 36,000+ / Day",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=80",
    bullets: [
      "36,000+ Plates / Day Production Capacity",
      "Heavy Duty Vibration-Free Steel Frame",
      "Pan-India On-Site Installation & Setup",
      "24/7 After Sales Support & Genuine Spares",
    ],
    primaryCtaText: "REQUEST QUOTATION",
    primaryCtaLink: "/contact",
    secondaryCtaText: "EXPLORE MACHINES",
    secondaryCtaLink: "/products",
    cardTitle: "Fully Automatic Machine",
    cardSubtitle: "High speed multi-die automatic feeder & heater",
    cardLink: "/products/fully-automatic-paper-plate-making-machine",
  },
  {
    id: 2,
    eyebrow: "HEAVY-DUTY INDUSTRIAL HYDRAULICS",
    titleRed: "Hydraulic Press",
    titleGreen: "Thali Machines",
    titleSuffix: "Heavy Duty",
    subtitle:
      "100 Ton high-pressure hydraulic machines built for thick paper thali, buffet plates, and deep wrinkle dies with vibration-free steel frames.",
    capacityTag: "Pressure: 100 Ton Hydraulic",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80",
    bullets: [
      "100 Ton Hydraulic Cylinder Pressure",
      "Deep Wrinkle & Heavy Paper Thali Dies",
      "Low Power Consumption Motor",
      "Pan-India Fast Dispatch & Setup",
    ],
    primaryCtaText: "VIEW HYDRAULIC MACHINES",
    primaryCtaLink: "/products?category=hydraulic",
    secondaryCtaText: "REQUEST QUOTATION",
    secondaryCtaLink: "/contact",
    cardTitle: "Hydraulic Paper Plate Machine",
    cardSubtitle: "100 Ton pressure for heavy buffet & thali plates",
    cardLink: "/products/hydraulic-paper-plate-making-machine",
  },
  {
    id: 3,
    eyebrow: "DUAL PRODUCTION LINES • 2X DAILY OUTPUT",
    titleRed: "Double Die",
    titleGreen: "Automatic Lines",
    titleSuffix: "High Speed",
    subtitle:
      "Double die automatic machines designed for high-capacity manufacturing plants. Run two separate production lines simultaneously with automated paper feeding.",
    capacityTag: "Dual Line: 2X Output",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80",
    bullets: [
      "Simultaneous Dual-Die Production",
      "Automated Roll Feeder & Counter",
      "Independent Temperature Control",
      "Heavy Steel Frame Construction",
    ],
    primaryCtaText: "EXPLORE DOUBLE DIE",
    primaryCtaLink: "/products/hydraulic-double-die-machine",
    secondaryCtaText: "DOWNLOAD CATALOGUE",
    secondaryCtaLink: "/products",
    cardTitle: "Double Die High-Speed Machine",
    cardSubtitle: "Dual production lines running simultaneously",
    cardLink: "/products/hydraulic-double-die-machine",
  },
  {
    id: 4,
    eyebrow: "BUFFET & CATERING SPECIALTY MACHINERY",
    titleRed: "Buffet & Thali",
    titleGreen: "Die Machines",
    titleSuffix: "Specialty",
    subtitle:
      "Specialized deep wrinkle dies and multi-cavity moulds for heavy-duty buffet catering plates, bowls, and meal thalis with precision heating.",
    capacityTag: "Specialty: Buffet & Thali",
    image:
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1920&q=80",
    bullets: [
      "Deep Wrinkle & Diamond Die Cutters",
      "Suitable for 80 GSM to 400 GSM Raw Paper",
      "Precision Temperature Control Heaters",
      "Custom Mould Sizes Available",
    ],
    primaryCtaText: "VIEW BUFFET MACHINES",
    primaryCtaLink: "/products/fully-automatic-buffet-plate-making-machine",
    secondaryCtaText: "CONTACT FACTORY",
    secondaryCtaLink: "/contact",
    cardTitle: "Buffet & Thali Specialty Machine",
    cardSubtitle: "Deep wrinkle die mechanism for heavy catering plates",
    cardLink: "/products/fully-automatic-buffet-plate-making-machine",
  },
  {
    id: 5,
    eyebrow: "STATE-OF-THE-ART MANUFACTURING PLANT • CUTTACK",
    titleRed: "Mohanty Udyog",
    titleGreen: "Manufacturing Unit",
    titleSuffix: "Industrial Facility",
    subtitle:
      "Spanning 25,000 Sq. Ft. in Jagatpur Industrial Estate, Cuttack, Odisha. ISO 9001:2015 certified plant equipped with CNC precision machinery.",
    capacityTag: "Facility: 25,000 Sq. Ft.",
    image:
      "https://images.unsplash.com/photo-158109187062b-7428641d42f7?auto=format&fit=crop&w=1920&q=80",
    bullets: [
      "25,000 Sq. Ft. Jagatpur Industrial Estate Plant",
      "CNC Lathes & Precision Engineering",
      "In-House Quality Testing Laboratory",
      "Pan-India Dispatch & Logistics Network",
    ],
    primaryCtaText: "TOUR OUR PLANT",
    primaryCtaLink: "/manufacturing-unit",
    secondaryCtaText: "WHY CHOOSE US",
    secondaryCtaLink: "/why-choose-us",
    cardTitle: "Jagatpur Manufacturing Facility",
    cardSubtitle: "25,000 Sq. Ft. ISO certified plant in Cuttack, Odisha",
    cardLink: "/manufacturing-unit",
  },
];

import { cmsStore, SlideItem } from "@/lib/cmsStore";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slidesList, setSlidesList] = useState<SlideItem[]>([]);

  useEffect(() => {
    setSlidesList(cmsStore.getSlides());
  }, []);

  const activeSlides = slidesList.length > 0 ? slidesList : heroSlides;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
  }, [activeSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  }, [activeSlides.length]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  const activeSlide = activeSlides[currentSlide] || heroSlides[0];

  return (
    <section
      className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden bg-neutral-950 text-white py-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Full-Screen Background Image Slides */}
      {activeSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-0" : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.cardTitle}
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-[8000ms] ease-out"
          />
          {/* Dark Industrial Gradient Overlays for High Legibility */}
          <div className="absolute inset-0 bg-neutral-950/75 sm:bg-neutral-950/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/60" />
        </div>
      ))}

      {/* Full-Screen Floating Navigation Arrows */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-red-700 text-white border border-white/20 flex items-center justify-center transition-all duration-200 shadow-2xl backdrop-blur focus:outline-none hover:scale-110"
        aria-label="Previous Hero Slide"
      >
        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-red-700 text-white border border-white/20 flex items-center justify-center transition-all duration-200 shadow-2xl backdrop-blur focus:outline-none hover:scale-110"
        aria-label="Next Hero Slide"
      >
        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      {/* Top Right Slide Counter Badge */}
      <div className="absolute top-6 right-6 sm:right-12 z-30 bg-black/70 backdrop-blur border border-neutral-700/80 rounded-full px-3.5 py-1.5 text-xs font-extrabold text-gray-200 shadow-lg">
        SLIDE <span className="text-red-500">{currentSlide + 1}</span> / {activeSlides.length}
      </div>

      {/* Hero Foreground Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Eyebrow, Dynamic Titles, Subtitle, Bullets & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-700 text-red-400 text-xs font-extrabold uppercase tracking-wider shadow-md backdrop-blur">
              <Cpu className="w-4 h-4 text-red-500 animate-pulse" />
              <span>{activeSlide.eyebrow}</span>
            </div>

            {/* Main Dynamic Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] font-sans">
              <span className="text-gray-100 block text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-300 mb-1">
                {activeSlide.titleSuffix}
              </span>
              <span className="text-red-600">{activeSlide.titleRed}</span>{" "}
              <span className="text-green-500">{activeSlide.titleGreen}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-normal max-w-2xl">
              {activeSlide.subtitle}
            </p>

            {/* Feature Bullets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {activeSlide.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-200 font-bold">
                  <CheckCircle2 className="w-4.5 h-4.5 text-green-500 shrink-0" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href={activeSlide.primaryCtaLink}
                className="inline-flex items-center gap-2.5 bg-red-700 hover:bg-red-800 text-white text-xs font-extrabold uppercase tracking-wider px-6 py-3.5 rounded shadow-xl transition-all hover:scale-105"
              >
                <FileText className="w-4 h-4" />
                <span>{activeSlide.primaryCtaText}</span>
              </Link>

              <Link
                href={activeSlide.secondaryCtaLink}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur text-xs font-extrabold uppercase tracking-wider px-6 py-3.5 rounded shadow transition-all hover:scale-105"
              >
                <span>{activeSlide.secondaryCtaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Glassmorphism Machine Preview & ISO Spec Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-neutral-900/80 border border-neutral-700/80 p-3.5 shadow-2xl backdrop-blur-md overflow-hidden group">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-950">
                <img
                  src={activeSlide.image}
                  alt={activeSlide.cardTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Highlight Tag */}
                <div className="absolute top-4 left-4 z-20 bg-neutral-900/90 backdrop-blur border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white flex items-center gap-2 shadow-md">
                  <Zap className="w-4 h-4 text-green-400" />
                  <div>
                    <div className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">SPECIFICATION</div>
                    <div className="font-bold text-green-400 text-xs">{activeSlide.capacityTag}</div>
                  </div>
                </div>

                {/* Bottom Spec Details Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-20 bg-neutral-900/90 backdrop-blur border border-neutral-700 rounded-xl p-3 flex items-center justify-between gap-2 shadow-lg">
                  <div className="space-y-0.5 max-w-[70%]">
                    <div className="text-xs font-bold text-white uppercase tracking-wider truncate">
                      {activeSlide.cardTitle}
                    </div>
                    <div className="text-[11px] text-gray-400 truncate">{activeSlide.cardSubtitle}</div>
                  </div>
                  <Link
                    href={activeSlide.cardLink}
                    className="text-xs font-bold text-red-500 hover:text-red-400 uppercase shrink-0"
                  >
                    Details &gt;
                  </Link>
                </div>
              </div>
            </div>

            {/* ISO Certification Badge */}
            <div className="absolute -bottom-6 -left-6 bg-neutral-900/95 border border-neutral-700 rounded-xl p-3.5 shadow-2xl flex items-center gap-3 hidden sm:flex z-30 backdrop-blur">
              <div className="p-2.5 rounded-lg bg-red-600/20 text-red-500 border border-red-500/30">
                <Factory className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                  <span>ISO 9001:2015 Certified</span>
                </div>
                <div className="text-[11px] text-gray-400">IDCO Road, Jagatpur Industrial Estate, Cuttack</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Center Indicator Dots Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-black/60 backdrop-blur border border-neutral-700/80 px-4 py-2 rounded-full shadow-xl">
        {activeSlides.map((slide, idx) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentSlide
                ? "w-8 bg-red-600"
                : "w-2 bg-neutral-600 hover:bg-neutral-400"
            }`}
            aria-label={`Jump to Hero Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}



