import React from "react";
import HeroSection from "@/components/home/HeroSection";
import StatsStrip from "@/components/home/StatsStrip";
import AboutSection from "@/components/home/AboutSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import ManufacturingPreview from "@/components/home/ManufacturingPreview";
import GalleryPreview from "@/components/home/GalleryPreview";
import VideoShowcase from "@/components/home/VideoShowcase";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogPreview from "@/components/home/BlogPreview";
import FinalCTASection from "@/components/home/FinalCTASection";

export default function HomePage() {
  return (
    <div className="w-full overflow-hidden">
      <HeroSection />
      <StatsStrip />
      <AboutSection />
      <CategoryGrid />
      <FeaturedProductsSection />
      <WhyChooseUsSection />
      <ProcessTimeline />
      <ManufacturingPreview />
      <GalleryPreview />
      <VideoShowcase />
      <TestimonialsSection />
      <BlogPreview />
      <FinalCTASection />
    </div>
  );
}
