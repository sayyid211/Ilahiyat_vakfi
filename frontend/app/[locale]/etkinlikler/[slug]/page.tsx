"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Loader2, Share2, MapPin, Clock } from "lucide-react";
import { api, API_BASE_URL } from "../../../../lib/api";

interface ActivityDetail {
  title: string;
  content: string;
  imageUrl: string;
  eventDate: string;
  location?: string;
}

export default function ActivityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [activity, setActivity] = useState<ActivityDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const data = await api.get(`/activity/slug/${slug}`);
        setActivity(data);
      } catch (err) {
        // If not found, kick them back to the list
        router.push("/tr/etkinlikler");
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) fetchActivity();
  }, [slug, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-12 h-12 animate-spin text-teal-600" />
      </div>
    );
  }

  if (!activity) return null;

  // Formatting Date and Time separately for a better UI look
  const eventDateObj = new Date(activity.eventDate);
  const formattedDate = eventDateObj.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  const formattedTime = eventDateObj.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <article className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      
      {/* Hero Image Section with Next.js Image */}
      <div className="w-full h-[40vh] md:h-[60vh] relative bg-slate-900">
        <div className="absolute inset-0 bg-black/50 z-10" /> 
        <img 
          src={`${API_BASE_URL}${activity.imageUrl}`} 
          alt={activity.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        
        {/* Title & Info Overlay */}
        <div className="absolute inset-0 z-20 flex items-end">
          <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 text-center md:text-left">
            <Link 
              href="/tr/etkinlikler" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium mb-6 transition-colors bg-black/30 hover:bg-black/50 px-4 py-2 rounded-full backdrop-blur-md w-fit"
            >
              <ArrowLeft className="w-4 h-4" /> Tüm Etkinlikler
            </Link>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
              {activity.title}
            </h1>
            
            {/* Actionable Event Meta Tags */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-white/90 font-medium">
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                <Calendar className="w-5 h-5 text-teal-300" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                <Clock className="w-5 h-5 text-teal-300" />
                {formattedTime}
              </span>
              {activity.location && (
                <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                  <MapPin className="w-5 h-5 text-teal-300" />
                  {activity.location}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Article */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-30">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 p-8 md:p-12 lg:p-16">
          
          <div className="flex justify-end mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
            <button className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors">
              <Share2 className="w-4 h-4" /> Etkinliği Paylaş
            </button>
          </div>

          <div className="prose prose-lg dark:prose-invert prose-teal max-w-none">
            {activity.content.split('\n').map((paragraph, index) => (
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