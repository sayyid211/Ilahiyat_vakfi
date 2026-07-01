"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight, Loader2, Image as ImageIcon } from "lucide-react";
import { api, API_BASE_URL } from "../../../lib/api";

interface ActivityItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  eventDate: string;
  location?: string;
}

export default function PublicActivitiesPage() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Fetches ONLY published activities
        const data = await api.get("/activity"); 
        setActivities(data);
      } catch (err) {
        console.error("Etkinlikler yüklenemedi:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const formatEventDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Etkinliklerimiz</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Vakfımız tarafından düzenlenen yaklaşan etkinlikleri, seminerleri ve programları buradan takip edebilirsiniz.
          </p>
        </div>

        {/* Content Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-teal-600">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p className="text-slate-500 font-medium">Etkinlikler yükleniyor...</p>
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 text-lg">Şu an için planlanmış bir etkinlik bulunmuyor.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((item) => (
              <Link 
                key={item.id} 
                href={`/tr/etkinlikler/${item.slug}`}
                className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Image Container */}
                <div className="aspect-[16/9] w-full overflow-hidden relative bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  {item.imageUrl ? (
                    <Image
                      fill
                      src={item.imageUrl.startsWith('/') ? `${API_BASE_URL}${item.imageUrl}` : `${API_BASE_URL}/${item.imageUrl}`}
                      alt={item.title}
                      className="object-cover group-hover:scale-105 transition-transform duration-500 text-transparent"
                      loading="lazy"
                    />
                  ) : (
                    <ImageIcon className="w-12 h-12 text-slate-300 dark:text-slate-600" />
                  )}
                </div>

                {/* Text Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-teal-600 dark:text-teal-400 mb-3">
                    <span className="flex items-center gap-1.5 bg-teal-50 dark:bg-teal-500/10 px-2.5 py-1 rounded-md">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatEventDate(item.eventDate)}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-1">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 max-w-[60%]">
                      {item.location && (
                        <>
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{item.location}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 shrink-0">
                      Detaylar <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}