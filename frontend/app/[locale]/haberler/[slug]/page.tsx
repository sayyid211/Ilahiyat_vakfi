"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Loader2, Share2 } from "lucide-react";
import { api, API_BASE_URL } from "../../../../lib/api";

interface NewsDetail {
  title: string;
  content: string;
  imageUrl: string;
  date: string;
}

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
        // If the slug doesn't exist, kick them back to the news list
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
    <article className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      
      {/* Hero Image Section */}
      <div className="w-full h-[40vh] md:h-[60vh] relative bg-slate-900">
        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Dark overlay for text readability */}
        <Image
          fill
          src={`${API_BASE_URL}${article.imageUrl}`}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        
        {/* Title Overlay */}
        <div className="absolute inset-0 z-20 flex items-end">
          <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 text-center md:text-left">
            <Link 
              href="/tr/haberler" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium mb-6 transition-colors bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm w-fit"
            >
              <ArrowLeft className="w-4 h-4" /> Tüm Haberler
            </Link>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-4">
              {article.title}
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-4 text-white/90 font-medium">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {formattedDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Article */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-30">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 p-8 md:p-12 lg:p-16">
          
          {/* Share Button (Visual only) */}
          <div className="flex justify-end mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
            <button className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors">
              <Share2 className="w-4 h-4" /> Paylaş
            </button>
          </div>

          {/* The Content */}
          <div className="prose prose-lg dark:prose-invert prose-teal max-w-none">
            {/* Split by newlines so paragraphs render correctly from the textarea */}
            {article.content.split('\n').map((paragraph, index) => (
              paragraph.trim() ? (
                <p key={index} className="mb-6 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                  {paragraph}
                </p>
              ) : null
            ))}
          </div>
          
        </div>
      </div>

    </article>
  );
}