"use client";

import React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Quote,
  MessageCircle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-gray-300 font-sans">
      {/* Top Split CTA Banner (Red Left + Green Right) */}
      <div className="w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-lg">
          {/* Left Red Block */}
          <div className="lg:col-span-5 bg-red-700 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute right-3 top-3 opacity-10 pointer-events-none">
              <Quote className="w-32 h-32 text-white" />
            </div>
            <div className="relative z-10 space-y-3">
              <div className="w-10 h-10 rounded-md bg-red-800/80 border border-red-500/50 flex items-center justify-center">
                <Quote className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Interested in Our Machines?
              </h3>
              <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
                Get in touch with us for more information or request a quotation today.
              </p>
            </div>
            <div className="pt-6 relative z-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-red-700 hover:bg-gray-100 text-xs font-extrabold uppercase tracking-wider px-5 py-2.5 rounded shadow transition-all duration-200"
              >
                <span>REQUEST QUOTATION</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Dark Green Block */}
          <div className="lg:col-span-7 bg-[#07381e] p-8 sm:p-10 text-white flex items-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
              {/* Call Us */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-900/80 border border-emerald-600/40 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">
                    Call Us
                  </span>
                  <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} className="text-xs font-bold text-white block hover:text-emerald-300">
                    {siteConfig.phone}
                  </a>
                  <a href={`tel:${siteConfig.altPhone.replace(/\s+/g, "")}`} className="text-[11px] text-gray-300 block hover:text-emerald-300">
                    {siteConfig.altPhone}
                  </a>
                </div>
              </div>

              {/* WhatsApp Us */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-900/80 border border-emerald-600/40 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">
                    WhatsApp Us
                  </span>
                  <a href={`https://wa.me/${siteConfig.whatsapp.replace(/\+/g, "")}`} target="_blank" rel="noreferrer" className="text-xs font-bold text-white block hover:text-emerald-300">
                    {siteConfig.phone}
                  </a>
                  <span className="text-[11px] text-emerald-200/80 block">
                    Chat with our experts
                  </span>
                </div>
              </div>

              {/* Email Us */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-900/80 border border-emerald-600/40 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">
                    Email Us
                  </span>
                  <a href={`mailto:${siteConfig.email}`} className="text-xs font-bold text-white block hover:text-emerald-300 truncate max-w-[140px]">
                    {siteConfig.email}
                  </a>
                  <span className="text-[11px] text-emerald-200/80 block">
                    We reply within 24 hrs
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer (5 Columns) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-neutral-800">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-full bg-neutral-900 flex items-center justify-center text-white border border-neutral-700">
                <span className="font-extrabold text-sm text-white">MU</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 leading-none">
                  <span className="text-base font-extrabold text-red-600 uppercase">MOHANTY</span>
                  <span className="text-base font-extrabold text-green-600 uppercase">UDYOG</span>
                </div>
                <span className="text-[9px] text-gray-400 uppercase tracking-wider mt-0.5">
                  A Mark of Quality & Trust
                </span>
              </div>
            </Link>

            <p className="text-xs text-gray-400 leading-relaxed">
              We manufacture high quality paper plate making machines with advanced technology and strict quality standards.
            </p>

            <div className="flex items-center gap-3 pt-2 text-gray-400">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-red-700 hover:text-white flex items-center justify-center transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-red-700 hover:text-white flex items-center justify-center transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-red-700 hover:text-white flex items-center justify-center transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-neutral-800 pb-2">
              QUICK LINKS
            </h4>
            <ul className="space-y-2 text-xs">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-green-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Products */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-neutral-800 pb-2">
              PRODUCTS
            </h4>
            <ul className="space-y-2 text-xs">
              {siteConfig.categories.map((cat) => (
                <li key={cat.name}>
                  <Link href={cat.href} className="text-gray-400 hover:text-green-500 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-neutral-800 pb-2">
              CONTACT US
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <div className="flex flex-col">
                  <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} className="hover:text-white">{siteConfig.phone}</a>
                  <a href={`tel:${siteConfig.altPhone.replace(/\s+/g, "")}`} className="hover:text-white">{siteConfig.altPhone}</a>
                  <a href={`tel:${siteConfig.salesPhone.replace(/\s+/g, "")}`} className="hover:text-white text-[11px] text-gray-400">{siteConfig.salesPhone} (Sales)</a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white truncate">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Our Location (Map Widget) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-neutral-800 pb-2">
              OUR LOCATION
            </h4>
            <div className="rounded-lg overflow-hidden border border-neutral-800 bg-neutral-900 p-2 space-y-2">
              <div className="relative h-28 w-full bg-slate-800 rounded flex items-center justify-center overflow-hidden">
                <iframe
                  title="Mohanty Udyog Location Map"
                  src="https://maps.google.com/maps?q=IDCO%20Road,%20Jagatpur%20Industrial%20Estate,%20Jagatpur,%20Cuttack,%20Odisha%20754021&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 opacity-85 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </div>
              <a
                href="https://maps.google.com/?q=IDCO+Road+Jagatpur+Industrial+Estate+Jagatpur+Cuttack+Odisha+754021"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-1.5 w-full bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold uppercase py-1.5 rounded transition-colors"
              >
                <span>GET DIRECTIONS</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Mohanty Udyog. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


