"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, UploadCloud, Loader2, Save, X, Film, Image as ImageIcon } from "lucide-react";
import { api, API_BASE_URL } from "../../../../../../lib/api";

export default function EditGalleryPage() {
  const router = useRouter();
  const params = useParams();
  const galleryId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [description, setDescription] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  
  // Cover Image State
  const [existingCoverImage, setExistingCoverImage] = useState<string | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);

  // Gallery Media State (Array of Strings natively in Prisma)
  const [existingMediaUrls, setExistingMediaUrls] = useState<string[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<{ url: string; type: "image" | "video" }[]>([]);

  // Helper to guess file type from a URL extension
  const getMediaType = (url: string) => {
    const videoExts = ['.mp4', '.webm', '.ogg', '.mov'];
    return videoExts.some(ext => url.toLowerCase().endsWith(ext)) ? 'video' : 'image';
  };

  useEffect(() => {
    const fetchGalleryItem = async () => {
      try {
        const data = await api.get(`/gallery/${galleryId}`);
        
        setTitle(data.title);
        setDescription(data.description || "");
        setIsPublished(data.isPublished);
        setExistingCoverImage(data.coverImage);
        
        if (data.mediaUrls) {
          setExistingMediaUrls(data.mediaUrls);
        }
        
        if (data.eventDate) {
          const formattedDate = new Date(data.eventDate).toISOString().split('T')[0];
          setEventDate(formattedDate);
        }
      } catch (err: any) {
        setError("Galeri verileri yüklenemedi.");
      } finally {
        setIsLoading(false);
      }
    };

    if (galleryId) fetchGalleryItem();
  }, [galleryId]);

  // Handle Cover Image
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImageFile(file);
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle New Gallery Files
  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setGalleryFiles((prev) => [...prev, ...filesArray]);
      
      const newPreviews = filesArray.map((file) => ({
        url: URL.createObjectURL(file),
        type: file.type.startsWith("video/") ? "video" as const : "image" as const,
      }));
      setGalleryPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  // Removals
  const removeExistingMedia = (indexToRemove: number) => {
    setExistingMediaUrls((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const removeNewGalleryFile = (indexToRemove: number) => {
    setGalleryFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
    setGalleryPreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!title || !eventDate) {
        throw new Error("Lütfen başlık ve etkinlik tarihi alanlarını doldurun.");
      }

      // 1. Upload Cover Image (if changed)
      let finalCoverImage = existingCoverImage;
      if (coverImageFile) {
        const uploadResult = await api.upload(coverImageFile);
        finalCoverImage = uploadResult.imageUrl;
      }

      // 2. Upload New Gallery Files
      const newlyUploadedUrls: string[] = [];
      if (galleryFiles.length > 0) {
        const uploadPromises = galleryFiles.map(async (file) => {
          const res = await api.upload(file);
          return res.imageUrl; // Prisma schema expects an array of pure strings
        });
        const results = await Promise.all(uploadPromises);
        newlyUploadedUrls.push(...results);
      }

      // 3. Combine retained existing URLs with newly uploaded URLs
      const finalMediaUrls = [...existingMediaUrls, ...newlyUploadedUrls];

      // 4. Submit to NestJS
      const updateData = {
        title,
        description,
        eventDate: new Date(eventDate).toISOString(),
        coverImage: finalCoverImage,
        mediaUrls: finalMediaUrls,
        isPublished,
      };

      await api.patch(`/gallery/${galleryId}`, updateData);

      router.push("/tr/admin/gallery");
      router.refresh();

    } catch (err: any) {
      setError(err.message || "Galeri güncellenirken hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin mb-4 text-teal-500" />
        <p>Galeri yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link 
          href="/tr/admin/gallery" 
          className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-500" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Galeriyi Düzenle</h1>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Galeri Başlığı</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 dark:bg-slate-950 dark:border-slate-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Etkinlik Tarihi</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 dark:bg-slate-950 dark:border-slate-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Açıklama</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 dark:bg-slate-950 dark:border-slate-800 resize-none"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                <div>
                  <h4 className="text-sm font-medium">Yayın Durumu</h4>
                  <p className="text-xs text-slate-500 mt-1">Kapalıysa sitede görünmez.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                </label>
              </div>
            </div>

            <div className="space-y-6">
              
              {/* Kapak Görseli */}
              <div>
                <label className="block text-sm font-medium mb-2">Kapak Görseli</label>
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full h-48 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 overflow-hidden relative">
                    {coverImagePreview ? (
                      <img src={coverImagePreview} alt="Yeni Kapak" className="w-full h-full object-cover" />
                    ) : existingCoverImage ? (
                      <img src={`${API_BASE_URL}${existingCoverImage}`} alt="Mevcut Kapak" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-slate-400">
                        <UploadCloud className="w-8 h-8 mb-2" />
                        <span className="text-sm">Görsel Seç</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Medya Listesi */}
              <div>
                <label className="block text-sm font-medium mb-2">Galeri Medyaları</label>
                <div className="relative mb-4">
                  <input
                    type="file"
                    accept="image/*,video/mp4,video/quicktime"
                    multiple
                    onChange={handleGalleryChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full py-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center gap-2 text-sm font-medium hover:bg-slate-100 transition-colors">
                    <UploadCloud className="w-5 h-5 text-teal-600" /> Medya Ekle
                  </div>
                </div>

                {(existingMediaUrls.length > 0 || galleryPreviews.length > 0) && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    
                    {/* Mevcut Medyalar */}
                    {existingMediaUrls.map((url, idx) => (
                      <div key={`exist-${idx}`} className="relative aspect-square rounded-lg border overflow-hidden group">
                        {getMediaType(url) === 'video' ? (
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-teal-500">
                            <Film className="w-6 h-6" />
                          </div>
                        ) : (
                          <img src={`${API_BASE_URL}${url}`} className="w-full h-full object-cover" alt="" />
                        )}
                        <button
                          type="button"
                          onClick={() => removeExistingMedia(idx)}
                          className="absolute inset-0 m-auto w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    {/* Yeni Yüklenecekler */}
                    {galleryPreviews.map((file, idx) => (
                      <div key={`new-${idx}`} className="relative aspect-square rounded-lg border-2 border-teal-500 overflow-hidden group">
                        {file.type === "video" ? (
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-teal-500">
                            <Film className="w-6 h-6" />
                          </div>
                        ) : (
                          <img src={file.url} className="w-full h-full object-cover" alt="" />
                        )}
                        <div className="absolute top-1 left-1 bg-teal-500 text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase">Yeni</div>
                        <button
                          type="button"
                          onClick={() => removeNewGalleryFile(idx)}
                          className="absolute inset-0 m-auto w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Link href="/tr/admin/gallery" className="px-6 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100">İptal</Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium disabled:opacity-70"
            >
              {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Kaydediliyor...</> : <><Save className="w-4 h-4" /> Güncelle</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}