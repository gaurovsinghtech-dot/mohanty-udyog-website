import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  Cpu,
  Award,
  Users,
  Zap,
  HeartHandshake,
  TrendingUp,
  Headphones,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { sampleTestimonials } from "@/data/sampleData";

export const metadata = {
  title: "Why Choose Us | Mohanty Udyog",
  description:
    "Discover why businesses across India trust Mohanty Udyog for high performance paper plate making machines, advanced manufacturing, and 24/7 service.",
};

export default function WhyChooseUsPage() {
  const featureCards = [
    {
      icon: Cpu,
      title: "Advanced Technology",
      description:
        "We use the latest technology and modern machinery to ensure superior performance and reliability.",
    },
    {
      icon: Award,
      title: "Superior Quality",
      description:
        "Every machine is built with high quality materials and strict quality control processes.",
    },
    {
      icon: Users,
      title: "Experienced Team",
      description:
        "Our skilled engineers and professionals have years of experience in delivering the best solutions.",
    },
    {
      icon: Zap,
      title: "High Performance",
      description:
        "Our machines are designed for maximum efficiency, durability and consistent output.",
    },
    {
      icon: HeartHandshake,
      title: "Customer Focused",
      description:
        "We prioritize our customers' needs and provide customized solutions and timely support.",
    },
    {
      icon: TrendingUp,
      title: "Cost Effective",
      description:
        "Best quality machines at competitive prices to maximize your return on investment.",
    },
    {
      icon: Headphones,
      title: "After Sales Support",
      description:
        "24/7 reliable support and service to keep your business running smoothly.",
    },
  ];

  const mohantyPoints = [
    "High quality raw materials",
    "Advanced technology & modern machinery",
    "Strict quality control at every stage",
    "High production capacity & efficiency",
    "On-time delivery",
    "24/7 after sales service & support",
    "Competitive pricing with best value",
  ];

  const otherPoints = [
    "Low quality materials",
    "Outdated technology & machinery",
    "Inconsistent quality control",
    "Low production & frequent breakdowns",
    "Delays in delivery",
    "Limited or no after sales support",
    "Higher cost with less value",
  ];

  const partnerReasons = [
    "We deliver machines that ensure high productivity and minimum downtime.",
    "Our strong infrastructure enables us to meet bulk orders without compromising on quality.",
    "We believe in long term relationships built on trust, transparency and performance.",
    "Our goal is your success - we grow when you grow.",
  ];

  const successPoints = [
    { title: "Reliable Machines", desc: "Built to last and perform." },
    { title: "Expert Guidance", desc: "Right advice for your business." },
    { title: "End-to-End Solutions", desc: "From setup to support." },
    { title: "Innovative Designs", desc: "For better productivity." },
    { title: "Sustainable Growth", desc: "Together we build a better future." },
  ];

  return (
    <div className="w-full bg-slate-50 text-gray-900 font-sans">
      {/* 1. Hero Banner */}
      <section className="relative bg-neutral-900 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
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
            <span className="text-white">Why Choose Us</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            WHY <span className="text-green-500">CHOOSE US</span>
          </h1>

          <p className="max-w-2xl text-sm sm:text-base text-gray-300 leading-relaxed">
            At Mohanty Udyog, we combine advanced technology, skilled expertise and a customer-first approach to deliver the best paper plate making machines.
          </p>
        </div>
      </section>

      {/* 2. 7 Feature Cards Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
          {featureCards.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 text-center flex flex-col items-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 border border-red-100 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-bold text-gray-900 mb-1.5 leading-snug">
                  {feat.title}
                </h3>
                <p className="text-[11px] text-gray-600 leading-normal">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. WHAT MAKES US DIFFERENT? (Comparison Table) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
            <span className="w-8 h-0.5 bg-green-600"></span>
            <span>WHAT MAKES US DIFFERENT?</span>
            <span className="w-8 h-0.5 bg-green-600"></span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-xl overflow-hidden shadow-lg border border-gray-200">
          {/* Left Block: Mohanty Udyog */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-gray-200">
            <div className="bg-green-700 text-white font-extrabold text-center py-3 uppercase text-sm tracking-wider rounded mb-6">
              MOHANTY UDYOG
            </div>
            <ul className="space-y-3.5">
              {mohantyPoints.map((pt, i) => (
                <li key={i} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-gray-800">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Block: Other Manufacturers */}
          <div className="lg:col-span-6 bg-gray-50 p-6 sm:p-8">
            <div className="bg-neutral-800 text-white font-extrabold text-center py-3 uppercase text-sm tracking-wider rounded mb-6">
              OTHER MANUFACTURERS
            </div>
            <ul className="space-y-3.5">
              {otherPoints.map((pt, i) => (
                <li key={i} className="flex items-center gap-3 text-xs sm:text-sm font-medium text-gray-600">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. REASONS TO PARTNER WITH US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
              <span className="w-8 h-0.5 bg-green-600"></span>
              <span>REASONS TO PARTNER WITH US</span>
            </div>

            <ul className="space-y-4">
              {partnerReasons.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    {reason}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
                alt="Mohanty Udyog Machinery Setup"
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Stats Counter Strip */}
      <section className="bg-white border-y border-gray-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-red-600">15+</div>
            <div className="text-xs font-bold text-gray-700 mt-1">Years of Experience</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-red-600">5000+</div>
            <div className="text-xs font-bold text-gray-700 mt-1">Machines Installed</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-red-600">36,000+</div>
            <div className="text-xs font-bold text-gray-700 mt-1">Plates Per Day</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-red-600">5000+</div>
            <div className="text-xs font-bold text-gray-700 mt-1">Happy Customers</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-red-600">25+</div>
            <div className="text-xs font-bold text-gray-700 mt-1">States Served</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-red-600">24/7</div>
            <div className="text-xs font-bold text-gray-700 mt-1">After Sales Support</div>
          </div>
        </div>
      </section>

      {/* 6. BUILT FOR YOUR SUCCESS Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                BUILT FOR YOUR SUCCESS
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                From engineering to installation and beyond, we provide complete solutions for your paper plate manufacturing business.
              </p>
            </div>

            <ul className="space-y-3">
              {successPoints.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <strong className="text-gray-900">{item.title}</strong> –{" "}
                    <span className="text-gray-600">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
                alt="Built For Your Success Machine"
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHAT OUR CUSTOMERS SAY Carousel / Cards */}
      <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
              <span className="w-8 h-0.5 bg-green-600"></span>
              <span>WHAT OUR CUSTOMERS SAY</span>
              <span className="w-8 h-0.5 bg-green-600"></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleTestimonials.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="text-red-600 text-3xl font-serif">“</div>
                  <p className="text-xs text-gray-700 leading-relaxed italic">
                    {item.text}
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-100 mt-4 space-y-1">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <div className="text-xs font-bold text-gray-900">— {item.name}</div>
                  <div className="text-[11px] text-gray-500">{item.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
