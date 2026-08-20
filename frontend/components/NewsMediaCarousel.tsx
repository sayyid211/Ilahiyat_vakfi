"use client";

import { useState } from "react";
import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { API_BASE_URL } from "../lib/api";

// This matches the interface we defined in page.tsx
interface NewsDetail {
  id?: string;
  title: string;
  content: string;
  imageUrl: string;
  mediaFiles?: { id: string; url: string; type: "image" | "video" }[];
}

export default function NewsMediaCarousel({ article }: { article: NewsDetail }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Fallback Logic: If the backend hasn't been updated to send `mediaFiles` yet, 
  // we just create a temporary array using the single `imageUrl` so the page doesn't crash.
  const mediaList = article.mediaFiles && article.mediaFiles.length > 0 
    ? article.mediaFiles 
    : [{ id: "fallback-1", url: article.imageUrl, type: "image" as const }];

  if (!mediaList || mediaList.length === 0) return null;

  const activeMedia = mediaList[activeIndex];

  // Helper to ensure the URL always formats correctly with the API base
  const getFullUrl = (url: string) => {
    if (!url) return "";
    return url.startsWith("/") ? `${API_BASE_URL}${url}` : `${API_BASE_URL}/${url}`;
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      
      {/* 1. MAIN VIEWER (With Cinematic Blur for images) */}
      <div className="relative w-full aspect-[4/3] bg-slate-900 rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200 dark:ring-slate-800">
        {activeMedia.type === "video" ? (
          <video 
            src={getFullUrl(activeMedia.url)} 
            controls 
            autoPlay
            className="w-full h-full object-contain bg-black"
          />
        ) : (
          <>
            {/* Blurred Background Layer */}
            <div className="absolute inset-0 z-0">
              <Image 
                src={getFullUrl(activeMedia.url)}
                alt="Background blur"
                fill
                className="object-cover opacity-50 blur-2xl scale-110"
              />
            </div>
            {/* Crisp Foreground Layer */}
            <div className="absolute inset-0 z-10 p-2 flex items-center justify-center">
              <Image
                src={getFullUrl(activeMedia.url)}
                alt={article.title}
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </>
        )}
      </div>

      {/* 2. THUMBNAIL ROW (Only shows if there is more than 1 file) */}
      {mediaList.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {mediaList.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(index)}
              className={`relative w-24 sm:w-28 aspect-[4/3] flex-shrink-0 rounded-xl overflow-hidden transition-all duration-200 ${
                activeIndex === index 
                  ? "ring-2 ring-teal-500 ring-offset-2 dark:ring-offset-slate-950 opacity-100" 
                  : "ring-1 ring-slate-200 dark:ring-slate-800 opacity-60 hover:opacity-100"
              }`}
            >
              {item.type === "video" ? (
                <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                  <PlayCircle className="w-8 h-8 text-white/80" />
                </div>
              ) : (
                <Image
                  src={getFullUrl(item.url)}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
      
    </div>
  );
}