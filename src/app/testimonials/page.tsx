"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Star,
  Quote,
  CheckCircle2,
  Play,
  X,
  Users,
  Award,
  Cog,
  Zap,
  Globe2,
  Headphones,
  Building2,
  ShieldCheck,
  Leaf,
} from "lucide-react";
import { sampleTestimonials } from "@/data/sampleData";

export default function TestimonialsPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const videoTestimonials = [
    {
      id: "v-1",
      name: "Rajesh Kumar",
      location: "Kolkata, West Bengal",
      duration: "02:30",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "v-2",
      name: "Suresh Patnaik",
      location: "Bhubaneswar, Odisha",
      duration: "01:48",
      thumbnail: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "v-3",
      name: "Amit Verma",
      location: "Lucknow, Uttar Pradesh",
      duration: "02:15",
      thumbnail: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "v-4",
      name: "Neha Agarwal",
      location: "Indore, Madhya Pradesh",
      duration: "01:52",
      thumbnail: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const trustedCompanies = [
    { name: "Shree Ganesh Industries", icon: Building2 },
    { name: "Green Pack Solutions", icon: Leaf },
    { name: "Om Sai Enterprises", icon: ShieldCheck },
    { name: "Yashvi Industries", icon: Cog },
    { name: "Sri Balaji Enterprises", icon: Building2 },
    { name: "SK Paper Products", icon: Cog },
    { name: "Eco Plate Solutions", icon: Leaf },
  ];

  return (
    <div className="w-full bg-slate-50 text-gray-900 font-sans">
      {/* 1. Hero Banner */}
      <section className="relative bg-neutral-900 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="relative max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>&gt;</span>
            <span className="text-white">Testimonials</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            WHAT OUR CLIENTS <span className="text-green-500">SAY ABOUT US</span>
          </h1>

          <p className="max-w-2xl text-sm sm:text-base text-gray-300 leading-relaxed">
            Real stories from real customers who trust Mohanty Udyog for quality, reliability and exceptional service.
          </p>
        </div>
      </section>

      {/* 2. Stats Bar (White Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 text-center">
            <Users className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-xl font-extrabold text-gray-900">5000+</div>
            <div className="text-[11px] text-gray-600 font-medium">Happy Customers</div>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 text-center">
            <Award className="w-6 h-6 text-red-600 mx-auto mb-2" />
            <div className="text-xl font-extrabold text-gray-900">15+</div>
            <div className="text-[11px] text-gray-600 font-medium">Years of Experience</div>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 text-center">
            <Cog className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-xl font-extrabold text-gray-900">5000+</div>
            <div className="text-[11px] text-gray-600 font-medium">Machines Installed</div>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 text-center">
            <Zap className="w-6 h-6 text-red-600 mx-auto mb-2" />
            <div className="text-xl font-extrabold text-gray-900">36,000+</div>
            <div className="text-[11px] text-gray-600 font-medium">Plates Per Day</div>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 text-center">
            <Globe2 className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-xl font-extrabold text-gray-900">25+</div>
            <div className="text-[11px] text-gray-600 font-medium">States Served</div>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 text-center">
            <Headphones className="w-6 h-6 text-red-600 mx-auto mb-2" />
            <div className="text-xl font-extrabold text-gray-900">24/7</div>
            <div className="text-[11px] text-gray-600 font-medium">Customer Support</div>
          </div>
        </div>
      </section>

      {/* 3. CLIENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
            <span className="w-8 h-0.5 bg-green-600"></span>
            <span>CLIENT TESTIMONIALS</span>
            <span className="w-8 h-0.5 bg-green-600"></span>
          </div>
          <p className="text-xs text-gray-600">Trusted by businesses across India</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <Quote className="w-6 h-6 text-red-600 fill-red-100" />
                <p className="text-xs text-gray-700 leading-relaxed font-normal">
                  {item.text}
                </p>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 border border-gray-300 overflow-hidden flex items-center justify-center font-bold text-gray-700 text-xs shrink-0">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900 flex items-center gap-1">
                    <span>{item.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600 fill-green-100" />
                  </div>
                  <div className="text-[11px] text-gray-500">{item.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CLIENT VIDEO TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
            <span className="w-8 h-0.5 bg-green-600"></span>
            <span>CLIENT VIDEO TESTIMONIALS</span>
            <span className="w-8 h-0.5 bg-green-600"></span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videoTestimonials.map((v) => (
            <div
              key={v.id}
              onClick={() => setActiveVideo("https://www.youtube.com/embed/dQw4w9WgXcQ")}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 group cursor-pointer hover:shadow-md transition-all"
            >
              <div className="relative h-44 w-full bg-slate-800">
                <img
                  src={v.thumbnail}
                  alt={v.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-red-600 ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {v.duration}
                </span>
              </div>
              <div className="p-4">
                <div className="text-xs font-bold text-gray-900">{v.name}</div>
                <div className="text-[11px] text-gray-500">{v.location}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TRUSTED BY 1000+ BUSINESSES ACROSS INDIA */}
      <section className="bg-white border-y border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
              <span className="w-8 h-0.5 bg-green-600"></span>
              <span>TRUSTED BY 1000+ BUSINESSES ACROSS INDIA</span>
              <span className="w-8 h-0.5 bg-green-600"></span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 text-center">
            {trustedCompanies.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={i}
                  className="p-4 rounded-lg bg-gray-50 border border-gray-200 flex flex-col items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                >
                  <Icon className="w-6 h-6 text-red-600" />
                  <span className="text-[11px] font-bold text-gray-800 leading-tight">
                    {c.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Modal Popup */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-black rounded-xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-3 right-3 text-white bg-black/60 p-2 rounded-full hover:bg-red-600 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={`${activeVideo}?autoplay=1`}
                title="Client Testimonial Video"
                className="w-full h-full border-0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
