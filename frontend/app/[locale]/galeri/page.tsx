"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Images, Loader2, PlayCircle } from "lucide-react";
import { api, API_BASE_URL } from "../../../lib/api";

interface GalleryItem {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  mediaUrls: string[];
  eventDate: string;
}

export default function PublicGalleryPage() {
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const data = await api.get("/gallery");
        setGalleries(data);
      } catch (err) {
        console.error("Albümler yüklenemedi:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGalleries();
  }, []);

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">Medya Galerisi</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Vakfımızın etkinliklerinden, eğitimlerinden ve projelerinden geriye kalan en güzel anlar.
          </p>
        </div>

        {/* Content Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 text-teal-600">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p className="text-slate-500 font-medium">Albümler yükleniyor...</p>
          </div>
        ) : galleries.length === 0 ? (
          <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 text-lg">Henüz hiç albüm yüklenmemiş.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleries.map((album) => (
              <Link 
                key={album.id} 
                href={`/tr/galeri/${album.slug}`}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Cover Image */}
                <div className="aspect-[4/3] w-full overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  
                  {/* Badge: Count of photos/videos */}
                  <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Images className="w-3.5 h-3.5" />
                    {album.mediaUrls?.length || 0} Medya
                  </div>

                  <img 
                    src={album.coverImage.startsWith('/') ? `${API_BASE_URL}${album.coverImage}` : `${API_BASE_URL}/${album.coverImage}`} 
                    alt={album.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 text-transparent"
                    loading="lazy"
                  />

                  {/* Text positioned over the bottom of the image */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <p className="flex items-center gap-1.5 text-teal-300 text-xs font-medium mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(album.eventDate)}
                    </p>
                    <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors line-clamp-2">
                      {album.title}
                    </h3>
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