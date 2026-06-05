"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, EyeOff, Loader2, MapPin } from "lucide-react";
import { api } from "../../../../lib/api"; // Adjust this path as needed

interface ActivityItem {
  id: string;
  title: string;
  slug: string;
  eventDate: string;
  location?: string;
  isPublished: boolean;
}

export default function ActivitiesAdminPage() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setIsLoading(true);
      const data = await api.get("/activity?all=true");
      setActivities(data);
    } catch (err: any) {
      setError(err.message || "Etkinlikler yüklenirken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu etkinliği silmek istediğinize emin misiniz? Bu işlem geri alınamaz.")) {
      return;
    }

    try {
      await api.delete(`/activity/${id}`);
      setActivities((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert("Silme işlemi başarısız oldu.");
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Etkinlik Yönetimi</h1>
          <p className="text-sm text-slate-500 mt-1">Yaklaşan ve geçmiş vakıf etkinliklerini buradan yönetin.</p>
        </div>
        <Link
          href="/tr/admin/activities/create"
          className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-colors font-medium text-sm shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Yeni Etkinlik Ekle
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-teal-500" />
            <p>Etkinlikler yükleniyor...</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center text-red-500">
            <p>{error}</p>
            <button onClick={fetchActivities} className="mt-4 underline hover:text-red-600">Tekrar Dene</button>
          </div>
        ) : activities.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <p>Henüz hiç etkinlik eklenmemiş.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 dark:bg-slate-950/50 text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Etkinlik Adı</th>
                  <th className="px-6 py-4 font-medium">Tarih & Saat</th>
                  <th className="px-6 py-4 font-medium">Konum</th>
                  <th className="px-6 py-4 font-medium">Durum</th>
                  <th className="px-6 py-4 font-medium text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {activities.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 text-slate-900 dark:text-white font-medium">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {formatDate(item.eventDate)}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {item.location ? (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {item.location}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">Belirtilmedi</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {item.isPublished ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                          <Eye className="w-3.5 h-3.5" /> Yayında
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">
                          <EyeOff className="w-3.5 h-3.5" /> Taslak
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/tr/admin/activities/edit/${item.id}`}
                          className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                          title="Düzenle"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Sil"
                        >
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