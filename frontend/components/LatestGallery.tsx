"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Images, Loader2 } from "lucide-react";
import { api, API_BASE_URL } from "../lib/api";

interface GalleryItem {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
}

export default function LatestGallery() {
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const data = await api.get("/gallery");
        setGalleries(data.slice(0, 4)); // Show top 4 albums
      } catch (err) {
        console.error("Albümler yüklenemedi:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGalleries();
  }, []);

  return (
    <section className="bg-slate-900 py-24 relative z-10 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-teal-500/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white">Fotoğraf & Video Galerisi</h2>
            <p className="text-slate-400 mt-2">Vakıf etkinliklerimizden kareler.</p>
          </div>
          <Link 
            href="/tr/galeri" 
            className="group flex items-center gap-2 text-teal-400 font-medium hover:text-teal-300 transition-colors"
          >
            Tüm Albümleri Gör <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
          </div>
        ) : galleries.length === 0 ? (
          <div className="text-center py-12 border border-slate-800 rounded-xl bg-slate-800/50">
            <p className="text-slate-400">Henüz albüm bulunmuyor.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleries.map((album) => (
              <Link 
                key={album.id} 
                href={`/tr/galeri/${album.slug}`}
                className="group block relative aspect-square rounded-2xl overflow-hidden shadow-lg border border-slate-700 hover:border-teal-500 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent z-10" />
                
<img
                    src={album.coverImage.startsWith('/') ? `${API_BASE_URL}${album.coverImage}` : `${API_BASE_URL}/${album.coverImage}`}
                    alt={album.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    loading="lazy"
                />
                
                {/* Floating Icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  <Images className="w-6 h-6 text-white" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                  <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors line-clamp-2">
                    {album.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}