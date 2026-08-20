"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, UploadCloud, Loader2, Save, X, Film, Image as ImageIcon } from "lucide-react";
import { api } from "../../../../../lib/api"; 

export default function CreateNewsPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  
  // 1. Primary Cover Image State (Preserved for backwards compatibility)
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // 2. NEW: Additional Gallery/Media State (For the multi-file slider)
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<{ url: string; type: "image" | "video" }[]>([]);

  // Handle Primary Cover Image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // NEW: Handle Multiple Gallery Files (Images & Videos)
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

  // NEW: Remove a specific file from the gallery before uploading
  const removeGalleryFile = (index: number) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!imageFile) {
        throw new Error("Lütfen bir ana haber görseli (Kapak Fotoğrafı) seçin.");
      }
      if (!title || !date || !description || !content) {
        throw new Error("Lütfen tüm alanları doldurun.");
      }

      // Upload the primary cover image first
      const coverUploadResult = await api.upload(imageFile);
      const imageUrl = coverUploadResult.imageUrl;

      // Upload all additional gallery files in parallel
      const uploadedMedia = [];
      if (galleryFiles.length > 0) {
        const uploadPromises = galleryFiles.map(async (file) => {
          const res = await api.upload(file);
          return {
            url: res.imageUrl, // Assuming the upload controller returns `{ imageUrl: 'path' }` for all files
            type: file.type.startsWith("video/") ? "video" : "image",
          };
        });
        
        const results = await Promise.all(uploadPromises);
        uploadedMedia.push(...results);
      }

      // Assemble the final payload matching our new NestJS DTO
      const newsData = {
        title,
        date: new Date(date).toISOString(),
        description,
        content,
        imageUrl, // The cover photo
        isPublished,
        mediaFiles: uploadedMedia, // The new array of extra files!
      };

      await api.post("/news", newsData);

      router.push("/tr/admin/news");
      router.refresh();

    } catch (err: any) {
      setError(err.message || "Haber kaydedilirken beklenmeyen bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            href="/tr/admin/news" 
            className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-500" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Yeni Haber Ekle</h1>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl text-sm border border-red-100 dark:border-red-500/20">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Text Data */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Haber Başlığı</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all dark:text-white"
                  placeholder="Örn: Yeni Yurt Binası Açıldı"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tarih</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Kısa Açıklama (Özet)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all dark:text-white resize-none"
                  placeholder="Haber listesinde görünecek kısa özet metni..."
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white">Yayın Durumu</h4>
                  <p className="text-xs text-slate-500 mt-1">Eğer kapalıysa, bu haber sitede görünmez.</p>
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

            {/* Right Column: Media Management */}
            <div className="space-y-6">
              
              {/* PRIMARY COVER IMAGE */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Ana Kapak Görseli <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className={`w-full h-48 rounded-xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all ${imagePreview ? 'border-teal-500 bg-teal-50/10' : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-4">
                        <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-500 font-medium">Kapak görseli seçin</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* NEW: MULTI-FILE GALLERY UPLOAD */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Ekstra Medya (Galeri / Video) <span className="text-slate-400 font-normal ml-2">İsteğe bağlı</span>
                </label>
                
                {/* Custom multi-file upload button */}
                <div className="relative mb-4">
                  <input
                    type="file"
                    accept="image/*,video/mp4,video/quicktime"
                    multiple
                    onChange={handleGalleryChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full py-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">
                    <UploadCloud className="w-5 h-5 text-teal-600" />
                    Resim veya Video Ekle
                  </div>
                </div>

                {/* Grid to preview selected gallery files */}
                {galleryPreviews.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {galleryPreviews.map((file, idx) => (
                      <div key={idx} className="relative aspect-square rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden group bg-slate-100 dark:bg-slate-900">
                        {file.type === "video" ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                            <Film className="w-6 h-6 mb-1" />
                            <span className="text-[10px] font-medium">VİDEO</span>
                          </div>
                        ) : (
                          <img src={file.url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                        )}
                        
                        {/* Overlay to indicate type and provide delete button */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => removeGalleryFile(idx)}
                            className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="absolute bottom-1 right-1 p-1 bg-black/60 rounded text-white backdrop-blur-sm">
                          {file.type === "image" ? <ImageIcon className="w-3 h-3" /> : <Film className="w-3 h-3" />}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Full Width: Main Content */}
          <div className="pt-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Haber İçeriği</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all dark:text-white"
              placeholder="Haberin tam içeriğini buraya yazın..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Link
              href="/tr/admin/news"
              className="px-6 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            >
              İptal
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Haberi Kaydet
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}