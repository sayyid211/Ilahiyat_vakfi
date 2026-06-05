"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2, Link as LinkIcon, Image as ImageIcon } from "lucide-react";
import { api, API_BASE_URL } from "../../../../lib/api";

interface AnnouncementItem {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl?: string;
  isActive: boolean;
  expiresAt?: string;
}

export default function AnnouncementsAdminPage() {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setIsLoading(true);
      const data = await api.get("/announcement?all=true");
      setAnnouncements(data);
    } catch (err: any) {
      setError(err.message || "Duyurular yüklenirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu duyuruyu/afişi silmek istediğinize emin misiniz?")) return;
    try {
      await api.delete(`/announcement/${id}`);
      setAnnouncements((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert("Silme işlemi başarısız oldu.");
    }
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return "Süresiz";
    return new Date(isoString).toLocaleDateString("tr-TR");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Duyuru / Afiş Yönetimi</h1>
          <p className="text-sm text-slate-500 mt-1">Ana sayfadaki kayan görsel galerisini buradan yönetin.</p>
        </div>
        <Link href="/tr/admin/announcements/create" className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-colors font-medium text-sm shadow-sm">
          <Plus className="w-4 h-4" />
          Yeni Afiş Ekle
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-teal-500" />
            <p>Duyurular yükleniyor...</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center text-red-500">
            <p>{error}</p>
            <button onClick={fetchAnnouncements} className="mt-4 underline hover:text-red-600">Tekrar Dene</button>
          </div>
        ) : announcements.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <p>Henüz hiç duyuru afişi eklenmemiş.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 dark:bg-slate-950/50 text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Görsel</th>
                  <th className="px-6 py-4 font-medium">Başlık & Bağlantı</th>
                  <th className="px-6 py-4 font-medium">Bitiş Tarihi</th>
                  <th className="px-6 py-4 font-medium">Durum</th>
                  <th className="px-6 py-4 font-medium text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {announcements.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-24 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-700">
                        {item.imageUrl ? (
                          <img src={`${API_BASE_URL}${item.imageUrl}`} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 dark:text-white">{item.title}</div>
                      {item.linkUrl && (
                        <a href={item.linkUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-blue-500 hover:underline mt-1">
                          <LinkIcon className="w-3 h-3" /> Yönlendirme Bağlantısı
                        </a>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {formatDate(item.expiresAt)}
                    </td>
                    <td className="px-6 py-4">
                      {item.isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                          <Eye className="w-3.5 h-3.5" /> Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">
                          <EyeOff className="w-3.5 h-3.5" /> Kapalı
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/tr/admin/announcements/edit/${item.id}`} className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors" title="Düzenle">
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(item.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors" title="Sil">
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