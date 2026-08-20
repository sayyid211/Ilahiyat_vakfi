"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Loader2, Share2 } from "lucide-react";
import { api } from "../../../../lib/api";
import NewsMediaCarousel from "../../../../components/NewsMediaCarousel";

// Updated interface to prepare for multiple media files (images/videos)
export interface NewsDetail {
  id?: string;
  title: string;
  content: string;
  imageUrl: string; // The primary image (fallback)
  mediaFiles?: { id: string; url: string; type: "image" | "video" }[]; // Future-proofing for galleries
  date: string;
}

// Helper function to turn plain URLs into clickable links safely
const renderTextWithLinks = (text: string) => {
  if (!text) return null;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a 
          key={index} 
          href={part} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-teal-600 dark:text-teal-400 hover:underline font-medium break-all"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [article, setArticle] = useState<NewsDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await api.get(`/news/slug/${slug}`);
        setArticle(data);
      } catch (err) {
        router.push("/tr/haberler");
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) fetchArticle();
  }, [slug, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-12 h-12 animate-spin text-teal-600" />
      </div>
    );
  }

  if (!article) return null;

  const formattedDate = new Date(article.date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <article className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Top Navigation Bar */}
        <div className="mb-8">
          <Link 
            href="/tr/haberler" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 font-medium transition-colors w-fit bg-white dark:bg-slate-900 px-4 py-2 rounded-full shadow-sm border border-slate-200 dark:border-slate-800"
          >
            <ArrowLeft className="w-4 h-4" /> Tüm Haberlere Dön
          </Link>
        </div>

        {/* The Split Layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          
          {/* LEFT SIDE: The Story (Text Content) */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
              {article.title}
            </h1>
            
            {/* Meta Info (Date & Share) */}
            <div className="flex items-center justify-between py-4 border-y border-slate-200 dark:border-slate-800 mb-8">
              <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium">
                <Calendar className="w-5 h-5 text-teal-600 dark:text-teal-500" />
                {formattedDate}
              </span>
              <button className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors">
                <Share2 className="w-4 h-4" /> Paylaş
              </button>
            </div>

            {/* The Text Body */}
            <div className="prose prose-lg dark:prose-invert prose-teal max-w-none">
              {article.content.split('\n').map((paragraph, index) => (
                paragraph.trim() ? (
                  <p key={index} className="mb-6 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                    {renderTextWithLinks(paragraph)}
                  </p>
                ) : null
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: The Media Viewer (Carousel/Video) */}
          <div className="w-full lg:w-1/2">
            <div className="sticky top-24">
              <NewsMediaCarousel article={article} />
            </div>
          </div>

        </div>
      </div>
    </article>
  );
}