import Image from "next/image";
import { 
  Library, 
  Wrench, 
  Info, 
  Camera,
  HardHat,
  Users
} from "lucide-react";

export default function IlimKulturPage() {
  return (
    <>
      {/* 1. PAGE HEADER */}
      <section className="bg-slate-900 text-white py-12 md:py-16 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight flex items-center justify-center md:justify-start gap-4">
              <Library className="w-10 h-10 text-amber-400" />
              İlim ve Kültür Evimiz
            </h1>
            <p className="mt-4 text-slate-400 text-lg">
              İlim ve kültür alanında Elazığ&apos;a hizmet verecek olan yeni merkezimizin hazırlık çalışmaları.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN ANNOUNCEMENT & HERO IMAGE */}
      <section className="bg-slate-50 dark:bg-background py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
            
            {/* Left: Text Content */}
            <div className="p-8 md:p-12 order-2 lg:order-1">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 text-sm font-bold tracking-wide mb-6">
                <Wrench className="w-4 h-4" />
                <span>PROJE AŞAMASINDA</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 font-serif leading-tight">
                Tadilat Sürecine İlişkin Bilgilendirme
              </h2>
              
              <div className="space-y-5 text-slate-600 dark:text-slate-300 leading-relaxed text-lg text-justify">
                <p>
                  İlim ve kültür alanında hizmet vermek üzere kurulan merkezimizin fiziki hazırlık çalışmaları devam etmektedir.
                </p>
                <p>
                  Hâlihazırda yürütülmekte olan tadilat sürecinde, mekânın daha verimli, düzenli ve istifadeye uygun hale getirilmesi amaçlanmaktadır.
                </p>
                <p>
                  Çalışmalar tamamlandığında, merkezimizin nihai hali kamuoyu ile paylaşılacaktır. Bu süreçte göstermiş olduğunuz ilgi ve destek için teşekkür ederiz.
                </p>
              </div>

              {/* Decorative Info Note */}
              <div className="mt-8 flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Gelişmelerden ve açılış tarihinden haberdar olmak için duyurular sayfamızı takip edebilirsiniz.
                </p>
              </div>
            </div>

            {/* Right: Main Building Feature Image */}
            <div className="relative h-[400px] lg:h-full w-full bg-slate-200 dark:bg-slate-800 order-1 lg:order-2 group">
              {/* PLACEHOLDER: The hammer icon. Replace with the white house image. */}
              <div className="absolute inset-0 flex items-center justify-center">
                <HardHat className="w-24 h-24 text-slate-400 group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              {/* HOW TO ADD YOUR IMAGE:
                1. Put "kultur-evi-ana.jpg" in your public folder.
                2. Uncomment the Image tag below.
              */}
              <Image 
                src="/kultur-evi1.png" 
                alt="İlim ve Kültür Evi Tadilatı" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              /> 
              
              
              {/* Gradient overlay to make it look premium */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent lg:hidden"></div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SITE VISIT GALLERY (The 4 Photos) */}
      <section className="py-16 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-serif flex items-center gap-3 mb-2">
                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                Saha Ziyaretleri ve İncelemeler
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                Yönetim ve mütevelli heyetimizin inşaat alanındaki denetim ve istişareleri.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full w-max">
              <Camera className="w-4 h-4" />
              Güncel Fotoğraflar
            </div>
          </div>

          {/* Photo Grid - Modern Masonry Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Gallery Image 1 */}
            <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all">
               <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-slate-400 font-medium">Görsel 1 (Ziyaret)</span>
               </div>
                <Image src="/kultur-evi5.png" alt="Saha Ziyareti 1" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>

            {/* Gallery Image 2 */}
            <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all">
               <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-slate-400 font-medium">Görsel 2 (Ziyaret)</span>
               </div>
                <Image src="/kultur-evi2.png" alt="Saha Ziyareti 2" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>

            {/* Gallery Image 3 */}
            <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all">
               <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-slate-400 font-medium">Görsel 3 (Ziyaret)</span>
               </div>
               <Image src="/kultur-evi3.png" alt="Saha Ziyareti 3" fill className="object-cover group-hover:scale-105 transition-transform duration-700" /> 
            </div>

            {/* Gallery Image 4 */}
            <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all">
               <div className="absolute inset-0 flex items-center justify-center">
                 <span className="text-slate-400 font-medium">Görsel 4 (Teras/Balkon)</span>
               </div>
                <Image src="/kultur-evi4.png" alt="Saha Ziyareti 4" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>

          </div>

        </div>
      </section>
    </>
  );
}