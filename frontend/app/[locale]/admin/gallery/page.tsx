"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2, Images, Image as ImageIcon } from "lucide-react";
import { api, API_BASE_URL } from "../../../../lib/api";

interface GalleryItem {
  id: string;
  title: string;
  slug: string;
  coverImage: string;
  mediaUrls: string[];
  eventDate: string;
  isPublished: boolean;
}

export default function GalleryAdminPage() {
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      setIsLoading(true);
      const data = await api.get("/gallery?all=true");
      setGalleries(data);
    } catch (err: any) {
      setError(err.message || "Galeriler yüklenirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu albümü ve içindeki tüm medyaları silmek istediğinize emin misiniz?")) return;
    try {
      await api.delete(`/gallery/${id}`);
      setGalleries((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert("Silme işlemi başarısız oldu.");
    }
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("tr-TR");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Galeri Yönetimi</h1>
          <p className="text-sm text-slate-500 mt-1">Vakıf etkinliklerine ait fotoğraf ve video albümlerini yönetin.</p>
        </div>
        <Link href="/tr/admin/gallery/create" className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-colors font-medium text-sm shadow-sm">
          <Plus className="w-4 h-4" />
          Yeni Albüm Ekle
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-teal-500" />
            <p>Albümler yükleniyor...</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center text-red-500">
            <p>{error}</p>
            <button onClick={fetchGalleries} className="mt-4 underline hover:text-red-600">Tekrar Dene</button>
          </div>
        ) : galleries.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <p>Henüz hiç albüm eklenmemiş.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 dark:bg-slate-950/50 text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Kapak</th>
                  <th className="px-6 py-4 font-medium">Albüm Adı</th>
                  <th className="px-6 py-4 font-medium">Medya Sayısı</th>
                  <th className="px-6 py-4 font-medium">Tarih</th>
                  <th className="px-6 py-4 font-medium">Durum</th>
                  <th className="px-6 py-4 font-medium text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {galleries.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-16 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-700">
                        {item.coverImage ? (
                          <img src={`${API_BASE_URL}${item.coverImage}`} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Images className="w-4 h-4" /> {item.mediaUrls?.length || 0} Dosya
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {formatDate(item.eventDate)}
                    </td>
                    <td className="px-6 py-4">
                      {item.isPublished ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                          <Eye className="w-3.5 h-3.5" /> Yayında
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                          <EyeOff className="w-3.5 h-3.5" /> Gizli
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/tr/admin/gallery/edit/${item.id}`} className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors">
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(item.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}