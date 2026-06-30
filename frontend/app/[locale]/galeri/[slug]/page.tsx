"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Calendar } from "lucide-react";
import { api, API_BASE_URL } from "../../../../lib/api";

interface GalleryDetail {
  title: string;
  description?: string;
  eventDate: string;
  mediaUrls: string[];
}

export default function AlbumDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [album, setAlbum] = useState<GalleryDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const data = await api.get(`/gallery/slug/${slug}`);
        setAlbum(data);
      } catch (err) {
        router.push("/tr/galeri"); // Redirect if not found
      } finally {
        setIsLoading(false);
      }
    };
    if (slug) fetchAlbum();
  }, [slug, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-12 h-12 animate-spin text-teal-600" />
      </div>
    );
  }

  if (!album) return null;

  const isVideo = (url: string) => /\.(mp4|webm|ogg|mov)$/i.test(url);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Navigation */}
        <Link 
          href="/tr/galeri" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Tüm Albümlere Dön
        </Link>

        {/* Album Info */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {album.title}
          </h1>
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-medium mb-4">
            <Calendar className="w-5 h-5" />
            {new Date(album.eventDate).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
          </div>
          {album.description && (
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
              {album.description}
            </p>
          )}
        </div>

        {/* Media Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {album.mediaUrls.map((url, index) => {
            const fullUrl = url.startsWith('/') ? `${API_BASE_URL}${url}` : `${API_BASE_URL}/${url}`;
            
            return (
              <div key={index} className="break-inside-avoid relative rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-800 group">
                {isVideo(url) ? (
                  <video 
                    src={fullUrl} 
                    controls 
                    className="w-full h-auto object-cover"
                    preload="metadata"
                  />
                ) : (
                  <div className="relative w-full h-auto">
                    {/* Next.js Image needs layout="responsive" equivalent for masonry grids */}
                    <img 
                      src={fullUrl} 
                      alt={`Media ${index + 1}`} 
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}