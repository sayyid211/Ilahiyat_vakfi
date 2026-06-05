"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Newspaper, 
  CalendarDays, 
  Megaphone, 
  LogOut,
  Settings,
  Images
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, href: "/tr/admin" },
    { name: "Haberler", icon: <Newspaper className="w-5 h-5" />, href: "/tr/admin/news" },
    { name: "Etkinlikler", icon: <CalendarDays className="w-5 h-5" />, href: "/tr/admin/activities" },
    { name: "Duyurular", icon: <Megaphone className="w-5 h-5" />, href: "/tr/admin/announcements" },
    { name: "Galeri Yönetimi", icon: <Images className="w-5 h-5" />, href: "/tr/admin/gallery" },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col hidden md:flex">
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 bg-slate-950 border-b border-slate-800">
          <span className="text-white font-bold text-lg tracking-wide">VAKIF YÖNETİM</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-teal-500 text-white shadow-md shadow-teal-500/20" 
                    : "hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-slate-800 transition-all text-slate-400 hover:text-white">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Ayarlar</span>
          </button>
          <Link href="/tr" className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all text-slate-400">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Siteye Dön</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 shadow-sm z-10">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Yönetim Paneli</h2>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-bold border border-teal-200">
              A
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>

    </div>
  );
}