"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, UploadCloud, Loader2, Save, X } from "lucide-react";
import { api } from "../../../../../lib/api";

export default function CreateGalleryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Text Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  
  // Single Cover Image State
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  // Multi-Media State (Photos & Videos inside the album)
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([]);

  // Handle Cover Image Selection
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  // Handle Multiple File Selections
  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setMediaFiles((prev) => [...prev, ...files]);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setMediaPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  // Remove a specific media file from the list before uploading
  const removeMedia = (indexToRemove: number) => {
    setMediaFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
    setMediaPreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!title || !eventDate) throw new Error("Lütfen albüm adı ve tarihini girin.");
      if (!coverFile) throw new Error("Lütfen albüm kapağı için bir görsel seçin.");
      if (mediaFiles.length === 0) throw new Error("Albümün içine en az bir fotoğraf veya video eklemelisiniz.");

      // STEP 1: Upload the Cover Image
      const coverUploadResult = await api.upload(coverFile);
      
      // STEP 2: Upload all Media Files in Parallel
      // This sends all files to the NestJS upload endpoint simultaneously for speed
      const mediaUploadPromises = mediaFiles.map(file => api.upload(file));
      const mediaResults = await Promise.all(mediaUploadPromises);
      
      // Extract just the URL strings from the results array
      const uploadedMediaUrls = mediaResults.map(res => res.imageUrl);

      // STEP 3: Save the Album Data
      const albumData = {
        title,
        description,
        eventDate: new Date(eventDate).toISOString(),
        coverImage: coverUploadResult.imageUrl,
        mediaUrls: uploadedMediaUrls,
        isPublished,
      };

      await api.post("/gallery", albumData);

      router.push("/tr/admin/gallery");
      router.refresh();

    } catch (err: any) {
      setError(err.message || "Albüm kaydedilirken bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/tr/admin/gallery" className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-500" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Yeni Albüm Ekle</h1>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">{error}</div>}

          {/* TOP SECTION: Basic Info & Cover Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Albüm Adı / Etkinlik Adı *</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-teal-500 outline-none dark:bg-slate-950 dark:border-slate-800 dark:text-white" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Etkinlik Tarihi *</label>
                <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-teal-500 outline-none dark:bg-slate-950 dark:border-slate-800 dark:text-white" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Kısa Açıklama</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-teal-500 outline-none resize-none dark:bg-slate-950 dark:border-slate-800 dark:text-white" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white">Yayın Durumu</h4>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500 dark:bg-slate-700"></div>
                </label>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Vitrin Görseli (Albüm Kapağı) *</label>
                <div className="relative group">
                  <input type="file" accept="image/*" onChange={handleCoverChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <div className={`w-full h-[320px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all ${coverPreview ? 'border-teal-500 bg-teal-50/10' : 'border-slate-300 hover:bg-slate-50 dark:border-slate-700'}`}>
                    {coverPreview ? <img src={coverPreview} alt="Cover Preview" className="w-full h-full object-cover" /> : (
                      <div className="text-center p-4">
                        <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-500 font-medium">Kapak görseli seçmek için tıklayın</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-slate-100 dark:border-slate-800" />

          {/* BOTTOM SECTION: Multi-Media Upload */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Albüm İçeriği (Fotoğraflar ve Videolar) *</label>
              <span className="text-xs text-slate-500 font-medium bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                Seçilen: {mediaFiles.length}
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* The "Add More" Button Box */}
              <div className="relative aspect-square rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex flex-col items-center justify-center cursor-pointer overflow-hidden">
                <input type="file" multiple accept="image/*,video/*" onChange={handleMediaChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                <span className="text-xs text-slate-500 font-medium text-center px-2">Dosya Ekle</span>
              </div>

              {/* Previews of Selected Files */}
              {mediaPreviews.map((preview, index) => (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 group">
                  {/* Basic check if video (browsers auto-assign blob types, but fallback to img if not video) */}
                  {mediaFiles[index]?.type.startsWith('video/') ? (
                    <video src={preview} className="w-full h-full object-cover" />
                  ) : (
                    <img src={preview} alt={`Media ${index}`} className="w-full h-full object-cover" />
                  )}
                  
                  {/* Delete Button Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button type="button" onClick={() => removeMedia(index)} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 hover:scale-110 transition-all">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Link href="/tr/admin/gallery" className="px-6 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 transition-colors">İptal</Link>
            <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium transition-colors disabled:opacity-70 shadow-sm">
              {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Yükleniyor...</> : <><Save className="w-4 h-4" /> Albümü Kaydet</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}