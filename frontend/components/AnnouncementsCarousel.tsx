"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { api, API_BASE_URL } from "../lib/api";

interface Announcement {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl?: string;
  isActive: boolean;
}

export default function AnnouncementsCarousel() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await api.get("/announcement");
        setAnnouncements(data);
      } catch (err) {
        console.error("Afişler yüklenemedi:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    if (announcements.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === announcements.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, announcements.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? announcements.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === announcements.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (isLoading) {
    return (
      <div className="w-full h-full min-h-[400px] bg-slate-900 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-teal-500 mb-4" />
      </div>
    );
  }

  if (announcements.length === 0) return null;

  return (
    <div className="relative w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[650px] group bg-slate-900 overflow-hidden">
      
      {/* Slides */}
      <div 
        className="w-full h-full flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {announcements.map((item) => (
          <div key={item.id} className="min-w-full h-full relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none" />
            
            {item.linkUrl ? (
              <a href={item.linkUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative cursor-pointer">
                <img 
                  src={item.imageUrl.startsWith('/') ? `${API_BASE_URL}${item.imageUrl}` : `${API_BASE_URL}/${item.imageUrl}`}
                  alt={item.title}
                  priority
                  unoptimized={process.env.NODE_ENV === "development"}
                  className="object-cover"
                />
              </a>
            ) : (
              <img 
                src={item.imageUrl.startsWith('/') ? `${API_BASE_URL}${item.imageUrl}` : `${API_BASE_URL}/${item.imageUrl}`}
                alt={item.title}
                priority
                unoptimized={process.env.NODE_ENV === "development"}
                className="object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {/* Permanently visible, mobile-friendly Navigation Arrows */}
      {announcements.length > 1 && (
        <>
          <button 
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/40 text-white backdrop-blur-md opacity-80 hover:opacity-100 hover:bg-black/60 hover:scale-110 transition-all shadow-lg"
            aria-label="Önceki afiş"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/40 text-white backdrop-blur-md opacity-80 hover:opacity-100 hover:bg-black/60 hover:scale-110 transition-all shadow-lg"
            aria-label="Sonraki afiş"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Pagination Indicators */}
          <div className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-center gap-2 md:gap-3 px-4">
            {announcements.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full h-2 shadow-sm ${
                  currentIndex === index 
                    ? "w-8 md:w-10 bg-teal-400" 
                    : "w-2 bg-white/50 hover:bg-white/90"
                }`}
                aria-label={`Slayta git ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}