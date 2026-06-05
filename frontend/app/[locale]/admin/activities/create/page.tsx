"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, UploadCloud, Loader2, Save } from "lucide-react";
import { api } from "../../../../../lib/api";

export default function CreateActivityPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  
  // Image State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (!imageFile) throw new Error("Lütfen bir etkinlik görseli seçin.");
      if (!title || !eventDate || !description || !content) {
        throw new Error("Lütfen tüm zorunlu alanları doldurun.");
      }

      // 1. Upload Image
      const uploadResult = await api.upload(imageFile);
      
      // 2. Save Activity
      const activityData = {
        title,
        eventDate: new Date(eventDate).toISOString(), // Convert local datetime to ISO for Prisma
        location,
        description,
        content,
        imageUrl: uploadResult.imageUrl,
        isPublished,
      };

      await api.post("/activity", activityData);

      // 3. Redirect
      router.push("/tr/admin/activities");
      router.refresh();

    } catch (err: any) {
      setError(err.message || "Etkinlik kaydedilirken bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/tr/admin/activities" className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-500" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Yeni Etkinlik Ekle</h1>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Etkinlik Adı *</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-teal-500 outline-none dark:bg-slate-950 dark:border-slate-800 dark:text-white" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tarih ve Saat *</label>
                <input type="datetime-local" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-teal-500 outline-none dark:bg-slate-950 dark:border-slate-800 dark:text-white" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Konum (İsteğe Bağlı)</label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Örn: Konferans Salonu" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-teal-500 outline-none dark:bg-slate-950 dark:border-slate-800 dark:text-white" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Kısa Açıklama *</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-teal-500 outline-none resize-none dark:bg-slate-950 dark:border-slate-800 dark:text-white" />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Etkinlik Görseli *</label>
                <div className="relative group">
                  <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <div className={`w-full h-48 rounded-xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all ${imagePreview ? 'border-teal-500 bg-teal-50/10' : 'border-slate-300 hover:bg-slate-50 dark:border-slate-700'}`}>
                    {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" /> : (
                      <div className="text-center p-4">
                        <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-500 font-medium">Görsel seçmek için tıklayın</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white">Yayın Durumu</h4>
                  <p className="text-xs text-slate-500 mt-1">Eğer kapalıysa, sitede görünmez.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500 dark:bg-slate-700"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Etkinlik Detayları *</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-teal-500 outline-none dark:bg-slate-950 dark:border-slate-800 dark:text-white" />
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Link href="/tr/admin/activities" className="px-6 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 transition-colors">İptal</Link>
            <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium transition-colors disabled:opacity-70 shadow-sm">
              {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Kaydediliyor...</> : <><Save className="w-4 h-4" /> Kaydet</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}