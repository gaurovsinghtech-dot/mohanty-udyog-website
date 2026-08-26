import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Target,
  Eye,
  Diamond,
  Award,
  Users,
  Building2,
  Trophy,
  Flag,
  Cog,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export const metadata = {
  title: "About Us | Mohanty Udyog",
  description:
    "Learn about Mohanty Udyog, India's leading paper plate machine manufacturer with 15+ years of experience, ISO certification, and 5000+ satisfied clients across India.",
};

export default function AboutPage() {
  const trustPoints = [
    "Advanced technology and modern infrastructure",
    "High performance and energy efficient machines",
    "Robust design for long machine life",
    "Easy operation and low maintenance",
    "Timely delivery and reliable after sales support",
    "Competitive pricing and value for money",
  ];

  const journeySteps = [
    { year: "2008", title: "Company Founded", icon: Flag },
    { year: "2012", title: "Expanded Product Range", icon: Cog },
    { year: "2016", title: "Modern Manufacturing Unit Established", icon: Building2 },
    { year: "2020", title: "Achieved 3000+ Installations", icon: Users },
    { year: "2024+", title: "Continuing Innovation & Growth", icon: Trophy },
  ];

  return (
    <div className="w-full bg-slate-50 text-gray-900 font-sans">
      {/* 1. Hero Banner */}
      <section className="relative bg-neutral-900 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="relative max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>&gt;</span>
            <span className="text-white">About Us</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">
            ABOUT <span className="text-green-500">US</span>
          </h1>

          <p className="max-w-3xl text-sm sm:text-base text-gray-300 leading-relaxed">
            Mohanty Udyog is a trusted name in manufacturing high quality paper plate making machines. We are committed to providing advanced, reliable and cost-effective machines that empower businesses and drive growth.
          </p>
        </div>
      </section>

      {/* 2. WHO WE ARE Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Factory Photo */}
          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
                alt="Mohanty Udyog Plant"
                className="w-full h-80 sm:h-[420px] object-cover"
              />
            </div>
          </div>

          {/* Right Text & Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-700">
                <span>WHO WE ARE</span>
                <span className="w-8 h-0.5 bg-red-700"></span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
                Building Machines. <br />
                <span className="text-green-700">Building Relationships.</span>
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Established with a vision to deliver excellence, Mohanty Udyog has become one of India&apos;s leading manufacturers of paper plate making machines. With years of experience, modern technology and a skilled team, we design and produce machines that ensure high performance, durability and efficiency.
            </p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Our commitment to quality, customer satisfaction and continuous innovation has earned the trust of 5000+ customers across India and beyond.
            </p>

            {/* Mission, Vision, Values Cards */}
            <div className="space-y-3 pt-2">
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 border border-red-100 flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-gray-900 uppercase">Our Mission</h3>
                  <p className="text-xs text-gray-600 mt-0.5">
                    To deliver innovative and reliable machines that help our customers achieve higher productivity and profitability.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-green-50 text-green-700 border border-green-100 flex items-center justify-center shrink-0">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-gray-900 uppercase">Our Vision</h3>
                  <p className="text-xs text-gray-600 mt-0.5">
                    To be a global leader in manufacturing high quality paper plate making machines and allied equipment.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 border border-red-100 flex items-center justify-center shrink-0">
                  <Diamond className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-gray-900 uppercase">Our Values</h3>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Quality, Integrity, Innovation and Customer Satisfaction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stats Counter Bar */}
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

      {/* 4. WHY CHOOSE US & CERTIFICATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Trust points */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
              <span className="w-8 h-0.5 bg-green-600"></span>
              <span>WHY CHOOSE US</span>
            </div>

            <h2 className="text-2xl font-black text-gray-900">
              Why Businesses Trust <span className="text-green-700">Mohanty Udyog</span>
            </h2>

            <ul className="space-y-3 pt-2">
              {trustPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-gray-800">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Middle Worker Image */}
          <div className="lg:col-span-3">
            <div className="rounded-xl overflow-hidden shadow border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
                alt="Worker at Machine Console"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>

          {/* Right Column: Certifications */}
          <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
              <span className="w-8 h-0.5 bg-red-600"></span>
              <span>CERTIFICATIONS</span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              We are an ISO 9001:2015 certified company, ensuring international quality standards in our products and services.
            </p>

            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-center space-y-1">
                <ShieldCheck className="w-12 h-12 text-blue-700 mx-auto" />
                <div className="text-xs font-black text-blue-900 tracking-wider">ISO 9001:2015</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase">CERTIFIED COMPANY</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2">
              {[1, 2, 3].map((num) => (
                <div key={num} className="p-2 border-2 border-amber-400 bg-amber-50 rounded text-center shadow-xs">
                  <Award className="w-5 h-5 text-amber-700 mx-auto mb-1" />
                  <div className="text-[9px] font-extrabold text-amber-900 uppercase">Certificate</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. OUR JOURNEY (Timeline) */}
      <section className="bg-gray-100 border-t border-gray-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
              <span className="w-8 h-0.5 bg-red-600"></span>
              <span>OUR JOURNEY</span>
              <span className="w-8 h-0.5 bg-red-600"></span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            {journeySteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center justify-between"
                >
                  <div className="w-12 h-12 rounded-full bg-green-700 text-white flex items-center justify-center mb-3 shadow">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-lg font-black text-gray-900">{step.year}</div>
                  <div className="text-xs font-bold text-gray-700 mt-1">{step.title}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Let's Build Success Together CTA Banner */}
      <section className="bg-red-700 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Let&apos;s Build Success Together
            </h3>
            <p className="text-xs sm:text-sm text-red-100">
              We are always ready to understand your requirements and provide the best solutions for your business.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-red-700 hover:bg-gray-100 text-xs font-extrabold uppercase px-5 py-3 rounded shadow transition-all shrink-0"
          >
            <span>GET IN TOUCH</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
