import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { AlertTriangle, Home, Package, PhoneCall, ArrowRight } from "lucide-react";

export const metadata = {
  title: "404 — Page Not Found | Apex Machina",
  description: "The page or specification you requested could not be found.",
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-slate-950 text-slate-100 flex items-center justify-center py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-industrial-grid opacity-20 pointer-events-none" />

      <div className="max-w-2xl mx-auto text-center space-y-8 relative z-10">
        {/* Badge & Icon */}
        <div className="w-20 h-20 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center mx-auto shadow-2xl shadow-orange-500/20">
          <AlertTriangle className="w-10 h-10" />
        </div>

        <div className="space-y-3">
          <span className="text-orange-500 font-mono text-xs font-semibold uppercase tracking-widest">
            ERROR 404 — ROUTE NOT FOUND
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-sans">
            Machinery Specification Not Found
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            The page or machine detail route you are trying to access might have been renamed, moved, or is temporarily unavailable.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Button href="/" variant="primary" size="md" className="w-full sm:w-auto">
            <Home className="w-4 h-4 mr-2" />
            <span>Return to Home</span>
          </Button>

          <Button href="/products" variant="accent" size="md" showArrow className="w-full sm:w-auto">
            <Package className="w-4 h-4 mr-2" />
            <span>Browse Products</span>
          </Button>
        </div>

        {/* Recommended Quick Links */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Popular Machinery Sections
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <Link
              href="/products?category=automatic"
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-orange-500/50 text-slate-200 hover:text-orange-400 transition-colors flex items-center justify-between"
            >
              <span>Automatic Machines</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/products?category=hydraulic"
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-orange-500/50 text-slate-200 hover:text-orange-400 transition-colors flex items-center justify-between"
            >
              <span>Hydraulic Presses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/contact"
              className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-orange-500/50 text-slate-200 hover:text-orange-400 transition-colors flex items-center justify-between"
            >
              <span>Sales Contact Desk</span>
              <PhoneCall className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
