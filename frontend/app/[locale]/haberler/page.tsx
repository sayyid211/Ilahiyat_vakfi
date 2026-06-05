"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, Loader2 } from "lucide-react";
import { api, API_BASE_URL } from "../../../lib/api";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  date: string;
}

export default function PublicNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Fetches ONLY published news, sorted by newest first
        const data = await api.get("/news"); 
        setNews(data);
      } catch (err) {
        console.error("Haberler yüklenemedi:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Haberler ve Duyurular</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Vakfımızla ilgili en güncel gelişmeleri, açılışları ve faaliyet haberlerini buradan takip edebilirsiniz.
          </p>
        </div>

        {/* Content Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-teal-600">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p className="text-slate-500 font-medium">Haberler yükleniyor...</p>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 text-lg">Şu an için yayında olan bir haber bulunmuyor.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <Link 
                key={item.id} 
                href={`/tr/haberler/${item.slug}`}
                className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Image Container */}
                <div className="aspect-[16/9] w-full overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={`${API_BASE_URL}${item.imageUrl}`}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized={process.env.NODE_ENV === "development"}
                  />
                </div>

                {/* Text Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs font-medium text-teal-600 dark:text-teal-400 mb-3">
                    <Calendar className="w-4 h-4" />
                    {formatDate(item.date)}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-1">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 mt-auto">
                    Haberi Oku <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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