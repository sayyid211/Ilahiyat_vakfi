"use client";

import Link from "next/link";
import { Newspaper, CalendarDays, Megaphone, Images, Plus, ArrowRight } from "lucide-react";

export default function AdminDashboardPage() {
  
  // A configuration array to easily manage your dashboard modules
  const modules = [
    {
      title: "Haberler",
      description: "Vakıf haberlerini ve duyurularını yönetin.",
      icon: <Newspaper className="w-8 h-8 text-blue-500" />,
      bgLight: "bg-blue-50",
      bgDark: "dark:bg-blue-500/10",
      borderColor: "border-blue-100 dark:border-blue-500/20",
      listUrl: "/tr/admin/news",
      createUrl: "/tr/admin/news/create",
    },
    {
      title: "Etkinlikler",
      description: "Yaklaşan programları ve seminerleri planlayın.",
      icon: <CalendarDays className="w-8 h-8 text-emerald-500" />,
      bgLight: "bg-emerald-50",
      bgDark: "dark:bg-emerald-500/10",
      borderColor: "border-emerald-100 dark:border-emerald-500/20",
      listUrl: "/tr/admin/activities",
      createUrl: "/tr/admin/activities/create",
    },
    {
      title: "Ana Sayfa Afişleri",
      description: "Kayan galeri (carousel) görsellerini güncelleyin.",
      icon: <Megaphone className="w-8 h-8 text-amber-500" />,
      bgLight: "bg-amber-50",
      bgDark: "dark:bg-amber-500/10",
      borderColor: "border-amber-100 dark:border-amber-500/20",
      listUrl: "/tr/admin/announcements",
      createUrl: "/tr/admin/announcements/create",
    },
    {
      title: "Medya Galerisi",
      description: "Etkinlik fotoğraflarını ve videolarını albümlere ekleyin.",
      icon: <Images className="w-8 h-8 text-purple-500" />,
      bgLight: "bg-purple-50",
      bgDark: "dark:bg-purple-500/10",
      borderColor: "border-purple-100 dark:border-purple-500/20",
      listUrl: "/tr/admin/gallery",
      createUrl: "/tr/admin/gallery/create",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Welcome Header */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
        {/* Decorative background shape */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-teal-50 dark:bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Yönetim Paneline Hoş Geldiniz</h1>
          <p className="mt-2 text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Vakıf web sitenizin tüm dinamik içeriklerini buradan güvenle kontrol edebilirsiniz. Hızlı işlem yapmak için aşağıdaki kısayolları kullanın.
          </p>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((mod, index) => (
          <div 
            key={index} 
            className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className={`p-4 rounded-2xl ${mod.bgLight} ${mod.bgDark} ${mod.borderColor} border`}>
                {mod.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{mod.title}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {mod.description}
                </p>
              </div>
            </div>

            <div className="mt-auto grid grid-cols-2 gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
              <Link 
                href={mod.listUrl}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                Listeyi Gör <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href={mod.createUrl}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition-colors"
              >
                <Plus className="w-4 h-4" /> Yeni Ekle
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}