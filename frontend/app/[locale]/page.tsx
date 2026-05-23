"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HomePage() {
  const t = useTranslations('Hero');

  // 1. CAROUSEL STATE: This prepares us for the Strapi backend. 
  // We can easily replace this array with data fetched from the API later.
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    '/ad1.jpg', '/ad2.jpg', '/ad3.jpg'
    // Add more placeholder paths here to test the slider, e.g., '/duyuru2.jpg'
  ];

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white pt-16 pb-24 md:pt-24 md:pb-32 overflow-visible">
        <div className="container mx-auto px-4 relative z-10">
          
          {/* Changed to a 12-column grid for precise 40/60 control */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT COLUMN: Text (Takes up 5/12 or ~40%) */}
            <div className="lg:col-span-5 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                {t('title')}
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t('subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  {t('projectsBtn')}
                </Button>
                <Button size="lg" variant="outline" className="text-slate-900 bg-white hover:bg-slate-100 border-none">
                  {t('aboutBtn')}
                </Button>
              </div>
            </div>

            {/* RIGHT COLUMN: Carousel (Takes up 7/12 or ~60%) 
                The lg:-mb-32 pulls it down into the white section! */}
            <div className="relative w-full lg:col-span-7 z-20 mt-8 lg:mt-0 lg:-mb-28">
              
              {/* Background glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-teal-400 rounded-2xl blur-lg opacity-40"></div>
              
              {/* Carousel Container */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 group h-[400px] sm:h-[500px] lg:h-[650px] w-full flex items-center justify-center">
                
                {images.length > 0 ? (
                  <>
                    <Image 
                      src={images[currentIndex]} 
                      alt={`Duyuru ${currentIndex + 1}`}
                      fill
                      // "object-cover" fills the box. Change to "object-contain" if you want to ensure no text gets cut off.
                      className="object-contain transition-transform duration-700"
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                    
                    {/* "New" Badge */}
                    <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg z-30">
                      Yeni Duyuru
                    </div>

                    {/* Left/Right Controls (Only show if there's more than 1 image) */}
                    {images.length > 1 && (
                      <>
                        <button 
                          onClick={prevImage}
                          className="absolute left-4 p-2 md:p-3 bg-black/40 hover:bg-gray-400 text-white rounded-full backdrop-blur-sm transition-colors z-30"
                        >
                          {/* Raw SVG so you don't need external icon libraries */}
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                          </svg>
                        </button>

                        <button 
                          onClick={nextImage}
                          className="absolute right-4 p-2 md:p-3 bg-black/40 hover:bg-blue-600 text-white rounded-full backdrop-blur-sm transition-colors z-30"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                          </svg>
                        </button>

                        {/* Dot Indicators */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
                          {images.map((_, idx) => (
                            <div 
                              key={idx} 
                              className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-blue-500' : 'w-2 bg-white/60'}`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="text-slate-400">Görsel Yükleniyor...</div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Dynamic Content Grid Placeholder (News & Events) 
          Added pt-24 lg:pt-32 to push the text down so the overlapping image doesn't cover it. */}
      <section className="bg-white pt-24 lg:pt-10 pb-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Haberler</h2>
              <p className="text-muted-foreground mt-2">Vakfımızın son yayınları ve etkinlikleri.</p>
            </div>
            <Button variant="link" className="hidden md:inline-flex text-blue-600">
              Tümünü Gör →
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all">
              <div className="h-48 bg-slate-200 relative">
                <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Rapor Sunumu
                </span>
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-2">24 Nisan 2026</p>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                  Eğitim ve Toplum İzleme Raporu 2026
                </h3>
                <p className="text-slate-600 line-clamp-3">
                  Bu rapor, bölgesel eğitim dinamiklerini inceleyerek akademik ve sosyal kalkınma stratejilerini ortaya koymaktadır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Dynamic Content Grid Placeholder (News & Events) 
          Added pt-24 lg:pt-32 to push the text down so the overlapping image doesn't cover it. */}
      <section className="bg-gray-100 pt-24 lg:pt-10 pb-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Etkinlikler</h2>
              <p className="text-muted-foreground mt-2">Vakfımızın son yayınları ve etkinlikleri.</p>
            </div>
            <Button variant="link" className="hidden md:inline-flex text-blue-600">
              Tümünü Gör →
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all">
              <div className="h-48 bg-slate-200 relative">
                <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Rapor Sunumu
                </span>
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-2">24 Nisan 2026</p>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                  Eğitim ve Toplum İzleme Raporu 2026
                </h3>
                <p className="text-slate-600 line-clamp-3">
                  Bu rapor, bölgesel eğitim dinamiklerini inceleyerek akademik ve sosyal kalkınma stratejilerini ortaya koymaktadır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Dynamic Content Grid Placeholder (News & Events) 
          Added pt-24 lg:pt-32 to push the text down so the overlapping image doesn't cover it. */}
      <section className="bg-white pt-24 lg:pt-10 pb-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Güncel Çalışmalar</h2>
              <p className="text-muted-foreground mt-2">Vakfımızın son yayınları ve etkinlikleri.</p>
            </div>
            <Button variant="link" className="hidden md:inline-flex text-blue-600">
              Tümünü Gör →
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all">
              <div className="h-48 bg-slate-200 relative">
                <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Rapor Sunumu
                </span>
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-2">24 Nisan 2026</p>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                  Eğitim ve Toplum İzleme Raporu 2026
                </h3>
                <p className="text-slate-600 line-clamp-3">
                  Bu rapor, bölgesel eğitim dinamiklerini inceleyerek akademik ve sosyal kalkınma stratejilerini ortaya koymaktadır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* Dynamic Content Grid Placeholder (News & Events) 
          Added pt-24 lg:pt-32 to push the text down so the overlapping image doesn't cover it. */}
      <section className="bg-white pt-24 lg:pt-10 pb-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Güncel Çalışmalar</h2>
              <p className="text-muted-foreground mt-2">Vakfımızın son yayınları ve etkinlikleri.</p>
            </div>
            <Button variant="link" className="hidden md:inline-flex text-blue-600">
              Tümünü Gör →
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all">
              <div className="h-48 bg-slate-200 relative">
                <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Rapor Sunumu
                </span>
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-2">24 Nisan 2026</p>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                  Eğitim ve Toplum İzleme Raporu 2026
                </h3>
                <p className="text-slate-600 line-clamp-3">
                  Bu rapor, bölgesel eğitim dinamiklerini inceleyerek akademik ve sosyal kalkınma stratejilerini ortaya koymaktadır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}