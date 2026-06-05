"use client";

import { useTranslations } from 'next-intl';
import AnnouncementsCarousel from "../../components/AnnouncementsCarousel";
import LatestNews from "../../components/LatestNews";
import LatestActivities from "../../components/LatestActivities";
import LatestGallery from '@/components/LatestGallery';

export default function HomePage() {
  const t = useTranslations("Hero");

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white pt-16 pb-24 md:pt-24 md:pb-32 overflow-visible">
        <div className="container mx-auto px-4 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT COLUMN: Text */}
            <div className="lg:col-span-5 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                {t("title")}
              </h1>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t("subtitle")}
              </p>
            </div>

            {/* RIGHT COLUMN: Dynamic Announcements Carousel */}
            <div className="relative w-full lg:col-span-7 z-20 mt-12 lg:mt-0 lg:-mb-28">
              
              {/* Background glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-teal-400 rounded-2xl blur-lg opacity-40"></div>
              
              {/* THE MODERN SOLUTION: The Floating Badge */}
              <div className="absolute -top-4 right-6 lg:-right-4 z-30 bg-teal-500 text-white text-xs md:text-sm font-bold px-4 py-1.5 rounded-full shadow-lg border-2 border-slate-900 tracking-wide uppercase">
                📢 Güncel Duyurular
              </div>
              
              {/* Carousel Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 w-full bg-slate-900 h-[400px] sm:h-[500px] lg:h-[650px]">
                <AnnouncementsCarousel />
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Dynamic Latest News Section */}
      <LatestNews />

      {/* Dynamic Latest Activities Section */}
      <LatestActivities />

      {/* Dynamic Latest Gallery Section */}
      <LatestGallery />

      
    </main>
  );
}