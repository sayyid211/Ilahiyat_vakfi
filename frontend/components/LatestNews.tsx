"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Loader2, ArrowRight } from "lucide-react";
import { api, API_BASE_URL } from "../lib/api";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  date: string;
}

export default function LatestNews() {
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const data = await api.get("/news");
        // Slice the array to keep only the 3 most recent items
        setLatestNews(data.slice(0, 3));
      } catch (err) {
        console.error("Haberler yüklenemedi:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLatestNews();
  }, []);

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className="bg-slate-50 dark:bg-slate-950 pt-24 lg:pt-10 pb-16 relative z-10">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Haberler</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Vakfımızın son yayınları ve etkinlikleri.</p>
          </div>
          <Link 
            href="/tr/haberler" 
            className="group flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 transition-colors"
          >
            Tümünü Gör <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Dynamic Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : latestNews.length === 0 ? (
          <div className="text-center py-12 border rounded-xl bg-white dark:bg-slate-900 dark:border-slate-800">
            <p className="text-slate-500">Henüz yayınlanmış bir haber bulunmuyor.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestNews.map((news) => (
              <Link 
                key={news.id} 
                href={`/tr/haberler/${news.slug}`}
                className="group border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Image Container */}
                <div className="h-48 relative bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full z-20 shadow-md">
                    Haber
                  </span>
                  <Image
                    fill
                    src={news.imageUrl.startsWith('/') ? `${API_BASE_URL}${news.imageUrl}` : `${API_BASE_URL}/${news.imageUrl}`}
                    alt={news.title}
                    className="object-cover group-hover:scale-105 transition-transform duration-500 text-transparent z-10"
                    loading="lazy"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <p className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mb-3">
                    <Calendar className="w-4 h-4" />
                    {formatDate(news.date)}
                  </p>
                  <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 line-clamp-3 text-sm flex-1">
                    {news.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}