"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";

const slides = [
  {
    title: "Book Your Doctor",
    highlight: "Appointment Online",
    subtitle: "Connect with top-rated doctors in Bangladesh. Easy booking, confirmed appointments, better health.",
    badge: "🏥 Trusted by 10,000+ Patients",
    cta: "Book Appointment",
    bg: "from-blue-900 via-blue-800 to-blue-700",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
  },
  {
    title: "Expert Doctors",
    highlight: "At Your Fingertips",
    subtitle: "Choose from 50+ verified specialists including cardiologists, neurologists, pediatricians and more.",
    badge: "✅ All Doctors Verified",
    cta: "View All Doctors",
    bg: "from-teal-900 via-teal-800 to-teal-700",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
  },
  {
    title: "Your Health",
    highlight: "Our Priority",
    subtitle: "Manage all your appointments, medical history, and doctor reviews from one convenient dashboard.",
    badge: "📱 Available 24/7",
    cta: "Get Started",
    bg: "from-indigo-900 via-indigo-800 to-indigo-700",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
];

export default function HeroBanner() {
  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="w-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className={`relative bg-gradient-to-r ${slide.bg} min-h-[88vh] flex items-center overflow-hidden`}
            >
              {/* BG Image */}
              <div
                className="absolute inset-0 opacity-20 bg-cover bg-center"
                style={{ backgroundImage: `url('${slide.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
                <div className="max-w-2xl">
                  <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                    {slide.badge}
                  </span>
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {slide.title}
                    <br />
                    <span className="text-teal-300">{slide.highlight}</span>
                  </h1>
                  <p className="text-white/85 text-lg md:text-xl mb-10 leading-relaxed">{slide.subtitle}</p>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/appointments" className="btn-primary text-base py-3 px-8 shadow-2xl">
                      {slide.cta} →
                    </Link>
                    <Link href="/register" className="bg-white/20 backdrop-blur-sm border border-white/40 text-white font-semibold py-3 px-8 rounded-xl hover:bg-white/30 transition-all duration-300">
                      Register Free
                    </Link>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-8 mt-14">
                    {[
                      { num: "50+", label: "Doctors" },
                      { num: "10K+", label: "Patients" },
                      { num: "4.8★", label: "Rating" },
                    ].map((s) => (
                      <div key={s.label}>
                        <p className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.num}</p>
                        <p className="text-white/60 text-xs uppercase tracking-widest mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}