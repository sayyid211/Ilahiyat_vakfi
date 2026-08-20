"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, UploadCloud, Loader2, Save, X, Film, Image as ImageIcon } from "lucide-react";
import { api, API_BASE_URL } from "../../../../../../lib/api";

export default function EditNewsPage() {
  const router = useRouter();
  const params = useParams();
  const newsId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  
  // 1. Primary Cover Image State
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // 2. NEW: Gallery Media State
  // Existing files loaded from the database
  const [existingMedia, setExistingMedia] = useState<{ url: string; type: "image" | "video" }[]>([]);
  
  // Brand new files waiting to be uploaded
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<{ url: string; type: "image" | "video" }[]>([]);

  // Fetch the existing news data
  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        const data = await api.get(`/news/${newsId}`);
        
        setTitle(data.title);
        setDescription(data.description);
        setContent(data.content);
        setIsPublished(data.isPublished);
        setExistingImageUrl(data.imageUrl);
        
        // Load the existing slider gallery if the backend sent it
        if (data.mediaFiles) {
          setExistingMedia(data.mediaFiles);
        }
        
        if (data.date) {
          const formattedDate = new Date(data.date).toISOString().split('T')[0];
          setDate(formattedDate);
        }

      } catch (err: any) {
        setError("Haber verileri yüklenemedi. Lütfen tekrar deneyin.");
      } finally {
        setIsLoading(false);
      }
    };

    if (newsId) {
      fetchNewsItem();
    }
  }, [newsId]);

  // Handle Cover Image
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
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

  // Remove existing media (marks it so it won't be sent back to NestJS)
  const removeExistingMedia = (indexToRemove: number) => {
    setExistingMedia((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // Remove newly selected media before upload
  const removeNewGalleryFile = (indexToRemove: number) => {
    setGalleryFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
    setGalleryPreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!title || !date || !description || !content) {
        throw new Error("Lütfen tüm zorunlu alanları doldurun.");
      }

      // STEP 1: Upload new cover image (if changed)
      let finalImageUrl = existingImageUrl;
      if (imageFile) {
        const uploadResult = await api.upload(imageFile);
        finalImageUrl = uploadResult.imageUrl;
      }

      // STEP 2: Upload new gallery files in parallel
      const newlyUploadedMedia = [];
      if (galleryFiles.length > 0) {
        const uploadPromises = galleryFiles.map(async (file) => {
          const res = await api.upload(file);
          return {
            url: res.imageUrl,
            type: file.type.startsWith("video/") ? "video" : "image",
          };
        });
        const results = await Promise.all(uploadPromises);
        newlyUploadedMedia.push(...results);
      }

      // STEP 3: Combine existing (undeleted) media with the new uploads
      // NestJS will wipe the old list in the DB and create relations for everything in this final list.
      const finalMediaFiles = [
        ...existingMedia.map((m) => ({ url: m.url, type: m.type })),
        ...newlyUploadedMedia
      ];

      // STEP 4: Prepare and send the payload
      const updateData = {
        title,
        date: new Date(date).toISOString(),
        description,
        content,
        imageUrl: finalImageUrl,
        isPublished,
        mediaFiles: finalMediaFiles, // The combined array
      };

      await api.patch(`/news/${newsId}`, updateData);

      // Redirect and refresh
      router.push("/tr/admin/news");
      router.refresh();

    } catch (err: any) {
      setError(err.message || "Haber güncellenirken beklenmeyen bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin mb-4 text-teal-500" />
        <p>Haber yükleniyor...</p>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Haberi Düzenle</h1>
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
                  <div className={`w-full h-48 rounded-xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all ${imagePreview || existingImageUrl ? 'border-teal-500 bg-teal-50/10' : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                    {imagePreview ? (
                      <img src={imagePreview} alt="Yeni Seçilen" className="w-full h-full object-cover" />
                    ) : existingImageUrl ? (
                      <img src={`${API_BASE_URL}${existingImageUrl}`} alt="Mevcut Görsel" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-4">
                        <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-500 font-medium">Yeni görsel seçmek için tıklayın</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* NEW: MULTI-FILE GALLERY UPLOAD */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Ekstra Medya (Galeri / Video)
                </label>
                
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
                    Medyaya Ekle
                  </div>
                </div>

                {/* Combined Grid: Existing Files + New Previews */}
                {(existingMedia.length > 0 || galleryPreviews.length > 0) && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    
                    {/* Render Existing Media (Loaded from DB) */}
                    {existingMedia.map((file, idx) => (
                      <div key={`existing-${idx}`} className="relative aspect-square rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden group bg-slate-100 dark:bg-slate-900">
                        {file.type === "video" ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                            <Film className="w-6 h-6 mb-1 text-teal-600" />
                            <span className="text-[10px] font-medium">MEVCUT VİDEO</span>
                          </div>
                        ) : (
                          <img src={file.url.startsWith('/') ? `${API_BASE_URL}${file.url}` : `${API_BASE_URL}/${file.url}`} alt={`Mevcut ${idx}`} className="w-full h-full object-cover opacity-80" />
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => removeExistingMedia(idx)}
                            className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-sm"
                            title="Sil"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="absolute bottom-1 right-1 p-1 bg-black/60 rounded text-white backdrop-blur-sm">
                          {file.type === "image" ? <ImageIcon className="w-3 h-3" /> : <Film className="w-3 h-3" />}
                        </div>
                      </div>
                    ))}

                    {/* Render New Media (Waiting to be uploaded) */}
                    {galleryPreviews.map((file, idx) => (
                      <div key={`new-${idx}`} className="relative aspect-square rounded-lg border-2 border-teal-500 overflow-hidden group bg-slate-100 dark:bg-slate-900">
                        {file.type === "video" ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                            <Film className="w-6 h-6 mb-1 text-teal-500" />
                            <span className="text-[10px] font-medium text-teal-600">YENİ VİDEO</span>
                          </div>
                        ) : (
                          <img src={file.url} alt={`Yeni ${idx}`} className="w-full h-full object-cover" />
                        )}
                        <div className="absolute top-1 left-1 bg-teal-500 text-white text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                          Yeni
                        </div>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => removeNewGalleryFile(idx)}
                            className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-sm"
                          >
                            <X className="w-4 h-4" />
                          </button>
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
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Güncelleniyor...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Değişiklikleri Kaydet
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}