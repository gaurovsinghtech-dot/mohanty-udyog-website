"use client";

import React, { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import QuoteModal from "@/components/products/QuoteModal";
import { Product } from "@/data/sampleData";
import { siteConfig } from "@/config/site";
import {
  ChevronRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  HelpCircle,
  FileText,
  MessageSquare,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(
    product.images[0] || product.image
  );
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"specs" | "features" | "apps" | "benefits" | "faq">("specs");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const whatsappQuoteText = `Hello Mohanty Udyog! 👋

I would like to receive a formal Quotation & Technical Specifications for:

📌 Machine Name: ${product.name}
💰 Price Type: ${product.priceType || "Factory Quotation Required"}
⚡ Motor Rating: ${product.power}
🏭 Output Capacity: ${product.capacity}
📦 Availability: ${product.availability}
${product.specs && product.specs.length > 0 ? `\n📐 Technical Specs:\n${product.specs.map((s) => `• ${s.label}: ${s.value}`).join("\n")}` : ""}

Please send me the detailed quotation PDF, product brochure, best factory price, and delivery schedule.

Thank you!`;

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.replace(/\+/g, "")}?text=${encodeURIComponent(whatsappQuoteText)}`;

  return (
    <div className="min-h-screen bg-slate-950 py-10 relative pb-24 md:pb-12">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-industrial-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <Link href="/products" className="hover:text-white transition-colors">
            Products Catalog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-orange-400 font-medium truncate max-w-xs sm:max-w-md">
            {product.name}
          </span>
        </nav>

        {/* Main Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Preview Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden aspect-[4/3] relative shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

              <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-orange-400 border border-orange-500/30 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                {product.categoryName}
              </span>

              <span className="absolute bottom-4 left-4 bg-emerald-950/90 text-emerald-400 border border-emerald-800 text-xs font-mono px-2.5 py-1 rounded-md">
                {product.availability}
              </span>
            </div>

            {/* Thumbnail Selector */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      selectedImage === img
                        ? "border-orange-500 shadow-lg shadow-orange-500/30"
                        : "border-slate-800 opacity-60 hover:opacity-100"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Key Details & Immediate CTAs */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-orange-400 uppercase tracking-wider mb-2">
                <Zap className="w-4 h-4 text-orange-500" />
                <span>Heavy Duty Machine Model</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
                {product.fullDescription}
              </p>
            </div>

            {/* Quick Specs Highlight Grid */}
            <div className="grid grid-cols-2 gap-3 bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-500 uppercase tracking-wider">Output Speed</span>
                <div className="text-sm font-bold text-orange-400 font-mono">{product.capacity}</div>
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-500 uppercase tracking-wider">Motor Rating</span>
                <div className="text-sm font-bold text-white font-mono">{product.power}</div>
              </div>
            </div>

            {/* Primary Action CTAs */}
            <div className="space-y-3 pt-2">
              <Button
                onClick={() => setIsQuoteOpen(true)}
                variant="accent"
                size="lg"
                showArrow
                className="w-full justify-center"
              >
                Request Quotation & Price
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button href="/contact" variant="outline" size="md" className="justify-center">
                  Contact Sales
                </Button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-md text-xs font-semibold bg-emerald-950/80 border border-emerald-800 text-emerald-400 hover:bg-emerald-900 transition-colors shadow-sm hover:border-emerald-600 cursor-pointer"
                  title="Click to send quote request and get specs via WhatsApp"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-emerald-400/20" />
                  <span>WhatsApp Specs</span>
                </a>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="border-t border-slate-800/80 pt-4 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pan-India On-Site Installation & Technician Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-orange-500 shrink-0" />
                <span>1-Year Heavy Machinery Structural Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Detailed Specifications & Features */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Tabs Bar */}
          <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto p-3 bg-slate-950/60">
            {[
              { id: "specs", label: "Technical Specifications" },
              { id: "features", label: "Key Features" },
              { id: "apps", label: "Applications" },
              { id: "benefits", label: "Business Benefits" },
              { id: "faq", label: "Product FAQ" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-orange-600 text-white shadow-lg shadow-orange-600/25"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="p-6 sm:p-8">
            {activeTab === "specs" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  Technical Specifications Matrix
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.specs.map((sp, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs"
                    >
                      <span className="text-slate-400 font-medium">{sp.label}</span>
                      <span className="text-white font-mono font-bold">{sp.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "features" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  Engineering & Construction Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "apps" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  Industrial Applications & Output Uses
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.applications.map((app, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                      <span>{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "benefits" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  Commercial & ROI Benefits
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.benefits.map((ben, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start gap-3"
                    >
                      <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{ben}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "faq" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {product.faq.map((fq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden text-xs"
                      >
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full flex items-center justify-between p-4 text-left font-bold text-white hover:text-orange-400 transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <HelpCircle className="w-4 h-4 text-orange-500" />
                            {fq.question}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-500 transition-transform ${
                              isOpen ? "rotate-180 text-orange-400" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                            {fq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Related Machinery</h2>
              <Link
                href="/products"
                className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1"
              >
                <span>View Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex gap-4 items-center group hover:border-orange-500/50 transition-colors"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-950 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={rel.image} alt={rel.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                      {rel.name}
                    </h4>
                    <div className="text-[11px] text-orange-400 font-mono">{rel.capacity}</div>
                    <Link
                      href={`/products/${rel.slug}`}
                      className="text-[11px] font-semibold text-slate-400 hover:text-white inline-flex items-center gap-1 pt-1"
                    >
                      <span>View Specs</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-3 z-40 flex items-center gap-3">
        <div className="flex-1 truncate">
          <div className="text-[11px] font-bold text-white truncate">{product.name}</div>
          <div className="text-[10px] text-orange-400 font-mono">{product.capacity}</div>
        </div>
        <Button onClick={() => setIsQuoteOpen(true)} variant="accent" size="sm">
          Get Quote
        </Button>
      </div>

      <QuoteModal
        isOpen={isQuoteOpen}
        productName={product.name}
        onClose={() => setIsQuoteOpen(false)}
      />
    </div>
  );
}
