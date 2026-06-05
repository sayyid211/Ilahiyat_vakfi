/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, UploadCloud, Loader2, Save } from "lucide-react";
import { api, API_BASE_URL } from "../../../../../../lib/api";

export default function EditAnnouncementPage() {
  const router = useRouter();
  const params = useParams();
  const announcementId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [isActive, setIsActive] = useState(true);
  
  // Image State
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const data = await api.get(`/announcement/${announcementId}`);
        setTitle(data.title);
        setLinkUrl(data.linkUrl || "");
        setIsActive(data.isActive);
        setExistingImageUrl(data.imageUrl);
        
        if (data.expiresAt) {
          setExpiresAt(new Date(data.expiresAt).toISOString().split('T')[0]);
        }
      } catch (err: any) {
        setError("Veriler yüklenemedi. Lütfen tekrar deneyin.");
      } finally {
        setIsLoading(false);
      }
    };
    if (announcementId) fetchAnnouncement();
  }, [announcementId]);

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
      if (!title) throw new Error("Lütfen yönetici paneli için bir başlık girin.");

      let finalImageUrl = existingImageUrl;
      if (imageFile) {
        const uploadResult = await api.upload(imageFile);
        finalImageUrl = uploadResult.imageUrl;
      }

      const payload = {
        title,
        linkUrl: linkUrl || null, // Convert empty string to null to clear it out if needed
        expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
        imageUrl: finalImageUrl,
        isActive,
      };

      await api.patch(`/announcement/${announcementId}`, payload);
      
      router.push("/tr/admin/announcements");
      router.refresh();

    } catch (err: any) {
      setError(err.message || "Güncellenirken bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin mb-4 text-teal-500" />
        <p>Afiş verileri yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/tr/admin/announcements" className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-500" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Afişi Düzenle</h1>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">{error}</div>}

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Afiş Görseli</label>
            <div className="relative group">
              <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <div className={`w-full h-64 rounded-xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all ${imagePreview || existingImageUrl ? 'border-teal-500 bg-teal-50/10' : 'border-slate-300 hover:bg-slate-50 dark:border-slate-700'}`}>
                {imagePreview ? (
                  <img src={imagePreview} alt="Yeni Seçilen" className="w-full h-full object-cover" />
                ) : existingImageUrl ? (
                  <img src={`${API_BASE_URL}${existingImageUrl}`} alt="Mevcut" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-4">
                    <UploadCloud className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                    <p className="text-sm text-slate-600 font-medium mb-1">Değiştirmek için tıklayın</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Yönetim Başlığı *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-teal-500 outline-none dark:bg-slate-950 dark:border-slate-800 dark:text-white" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Yönlendirme Linki</label>
              <input type="url" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-teal-500 outline-none dark:bg-slate-950 dark:border-slate-800 dark:text-white" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Otomatik Kaldırma Tarihi</label>
              <input type="date" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-teal-500 outline-none dark:bg-slate-950 dark:border-slate-800 dark:text-white" />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 mt-7 h-fit">
              <div>
                <h4 className="text-sm font-medium text-slate-900 dark:text-white">Afiş Aktif Mi?</h4>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500 dark:bg-slate-700"></div>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Link href="/tr/admin/announcements" className="px-6 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 transition-colors">İptal</Link>
            <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors disabled:opacity-70 shadow-sm">
              {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Güncelleniyor...</> : <><Save className="w-4 h-4" /> Değişiklikleri Kaydet</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}