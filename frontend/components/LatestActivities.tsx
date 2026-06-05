"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Loader2, ArrowRight, MapPin, Clock } from "lucide-react";
import { api, API_BASE_URL } from "../lib/api";

interface ActivityItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  eventDate: string;
  location?: string;
}

export default function LatestActivities() {
  const [latestActivities, setLatestActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatestActivities = async () => {
      try {
        const data = await api.get("/activity");
        // Slice the array to keep only the 3 most recent/upcoming events
        setLatestActivities(data.slice(0, 3));
      } catch (err) {
        console.error("Etkinlikler yüklenemedi:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLatestActivities();
  }, []);

  const formatEventDate = (isoString: string) => {
    const date = new Date(isoString);
    return {
      dateString: date.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }),
      timeString: date.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })
    };
  };

  return (
    <section className="bg-slate-100 dark:bg-slate-900/50 pt-24 lg:pt-16 pb-16 relative z-10">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Etkinlikler</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Vakfımız tarafından düzenlenen yaklaşan programlar.</p>
          </div>
          <Link 
            href="/tr/etkinlikler" 
            className="group flex items-center gap-2 text-teal-600 dark:text-teal-400 font-medium hover:text-teal-700 transition-colors"
          >
            Tümünü Gör <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Dynamic Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
          </div>
        ) : latestActivities.length === 0 ? (
          <div className="text-center py-12 border rounded-xl bg-white dark:bg-slate-900 dark:border-slate-800">
            <p className="text-slate-500">Şu an için planlanmış bir etkinlik bulunmuyor.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestActivities.map((activity) => {
              const { dateString, timeString } = formatEventDate(activity.eventDate);
              
              return (
                <Link 
                  key={activity.id} 
                  href={`/tr/etkinlikler/${activity.slug}`}
                  className="group border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Image Container */}
                  <div className="h-48 relative bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <span className="absolute top-4 left-4 bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full z-20 shadow-md">
                      Yaklaşan Etkinlik
                    </span>
                    <Image 
                      src={activity.imageUrl.startsWith('/') ? `${API_BASE_URL}${activity.imageUrl}` : `${API_BASE_URL}/${activity.imageUrl}`}
                      alt={activity.title}
                      fill
                      unoptimized={process.env.NODE_ENV === "development"}
                      className="object-cover group-hover:scale-105 transition-transform duration-500 text-transparent z-10"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-teal-600 dark:text-teal-400 mb-3 font-medium">
                      <span className="flex items-center gap-1.5 bg-teal-50 dark:bg-teal-500/10 px-2 py-1 rounded-md">
                        <Calendar className="w-4 h-4" />
                        {dateString}
                      </span>
                      <span className="flex items-center gap-1.5 bg-teal-50 dark:bg-teal-500/10 px-2 py-1 rounded-md">
                        <Clock className="w-4 h-4" />
                        {timeString}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2">
                      {activity.title}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-400 line-clamp-3 text-sm flex-1 mb-4">
                      {activity.description}
                    </p>

                    {/* Footer / Location */}
                    <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                       <div className="flex items-center gap-1.5 text-xs text-slate-500 max-w-[70%]">
                        {activity.location && (
                          <>
                            <MapPin className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{activity.location}</span>
                          </>
                        )}
                      </div>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors shrink-0">
                        Detaylar &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}