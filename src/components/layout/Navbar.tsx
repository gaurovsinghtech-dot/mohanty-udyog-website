"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, FileText, Search } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm py-2.5 w-full transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 xl:gap-4">
          {/* Brand Logo - MU MOHANTY UDYOG */}
          <Link href="/" className="flex items-center gap-2 group focus:outline-none shrink-0">
            <div className="w-8 h-8 xl:w-9 xl:h-9 rounded-full bg-neutral-900 flex items-center justify-center text-white border border-neutral-800 shadow-sm group-hover:scale-105 transition-transform duration-200">
              <span className="font-black text-xs xl:text-sm tracking-tighter text-white">MU</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 leading-none">
                <span className="text-sm xl:text-base 2xl:text-lg font-black tracking-tight text-red-700 font-sans uppercase">
                  MOHANTY
                </span>
                <span className="text-sm xl:text-base 2xl:text-lg font-black tracking-tight text-green-700 font-sans uppercase">
                  UDYOG
                </span>
              </div>
              <span className="text-[8px] xl:text-[9px] text-gray-500 font-bold tracking-widest uppercase mt-0.5 whitespace-nowrap">
                A Mark of Quality & Trust
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links - Single Line */}
          <nav className="hidden xl:flex items-center space-x-1 2xl:space-x-2.5">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              const hasDropdown = link.label === "Products";
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-1.5 2xl:px-2 py-1 text-[11px] 2xl:text-[12px] font-bold uppercase tracking-wider transition-colors relative flex items-center gap-1 whitespace-nowrap ${
                    isActive
                      ? "text-red-700 font-extrabold"
                      : "text-gray-700 hover:text-red-700"
                  }`}
                >
                  <span>{link.label}</span>
                  {hasDropdown && <ChevronDown className="w-3 h-3 text-gray-500 shrink-0" />}
                  {isActive && (
                    <span className="absolute -bottom-2 left-1 right-1 h-0.5 bg-red-700 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Search & Request Quotation Button */}
          <div className="flex items-center gap-1.5 xl:gap-2.5 shrink-0">
            <Link
              href="/search"
              className="p-1.5 text-gray-600 hover:text-red-700 hover:bg-gray-100 rounded-md transition-colors focus:outline-none"
              aria-label="Search Catalogue"
            >
              <Search className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="hidden sm:flex items-center gap-1.5 bg-red-700 hover:bg-red-800 text-white text-[10px] xl:text-[11px] font-extrabold uppercase tracking-wider px-3 py-2 rounded-md shadow-sm transition-all duration-200 whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>REQUEST QUOTATION</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-md text-gray-700 hover:text-red-700 hover:bg-gray-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu Overlay */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-[calc(100%+1px)] bg-white border-b border-gray-200 shadow-xl transition-all duration-300 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
            {siteConfig.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 text-xs font-bold uppercase tracking-wider rounded-md transition-colors ${
                    isActive
                      ? "bg-red-50 text-red-700 font-extrabold"
                      : "text-gray-800 hover:bg-gray-100 hover:text-red-700"
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <div className="pt-3 border-t border-gray-200">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-red-700 hover:bg-red-800 text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded-md shadow-sm"
              >
                <FileText className="w-4 h-4" />
                <span>REQUEST QUOTATION</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}



