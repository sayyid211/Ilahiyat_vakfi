"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Building, 
  ShieldCheck, 
  Wifi, 
  BookOpen, 
  Utensils, 
  Bath, 
  BedDouble, 
  GraduationCap,
  PlayCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// --- HELPER COMPONENT: The Auto-Fading Image Slider Card ---
function SliderCard({ images, title, description, fallbackIcon: FallbackIcon }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="group relative h-[400px] rounded-3xl overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700">
      
      {/* Images or Fallback Icon */}
      {images.length > 0 ? (
        images.map((src: string, index: number) => (
          <div 
            key={index} 
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image 
              src={src} 
              alt={`${title} - Görsel ${index + 1}`} 
              fill 
              className="object-cover" 
            />
          </div>
        ))
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-300 dark:bg-slate-700">
          <FallbackIcon className="w-20 h-20 text-slate-400" />
        </div>
      )}

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent z-10"></div>

      {/* Manual Controls (Only show on hover if there are multiple images) */}
      {images.length > 1 && (
        <>
          <button 
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-teal-600 text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-teal-600 text-white rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 p-8 w-full z-20">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-300 text-sm leading-relaxed">{description}</p>
        
        {/* Dot Indicators */}
        {images.length > 1 && (
          <div className="flex gap-1.5 mt-4">
            {images.map((_: any, idx: number) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "w-6 bg-teal-400" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function YurtPage() {
  
  // Replace these placeholder paths with the actual paths of your images in the /public folder
  const odaImages = ["/R1.jpeg", "/R2.jpeg", "/R3.jpeg", "/R4.jpeg", "/R5.jpeg", "/R6.jpeg"]; 
  const banyoImages = ["/L1.jpeg", "/L2.jpeg"];
  const etutImages = ["/et1.jpeg", "/et2.jpeg"];
  const ortakAlanImages = ["/Y1.jpeg", "/Y2.jpeg", "/T1.jpeg", "/T2.jpeg"];

  return (
    <>
      {/* 1. PAGE HEADER */}
      <section className="bg-slate-900 text-white py-12 md:py-16 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight flex items-center justify-center md:justify-start gap-4">
              <Building className="w-10 h-10 text-teal-400" />
              Erkek Öğrenci Yurdu
            </h1>
            <p className="mt-4 text-slate-400 text-lg">
              Öğrencilerimize ev ortamını aratmayacak güvenli, huzurlu ve düzenli bir yaşam ve gelişim merkezi.
            </p>
          </div>
        </div>
      </section>

      {/* 2. INTRO & VIDEO SECTION */}
      <section className="bg-slate-50 dark:bg-background py-16 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-teal-500"></div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 font-serif">
                Sayın Öğrencilerimiz ve Değerli Velilerimiz,
              </h2>
              <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                <p>
                  Yurdumuzun temel amacı, üniversite öğrencilerine kendi ev ortamlarını aratmayacak nitelikte; güvenli, huzurlu ve düzenli bir barınma imkânı sunmaktır. Bununla birlikte, öğrencilerimizin akademik, sosyal ve kültürel gelişimlerine katkı sağlamak da öncelikli hedeflerimiz arasında yer almaktadır. Bu kapsamda çeşitli eğitim faaliyetleri, spor etkinlikleri, seminerler, konferanslar ve paneller düzenlenmektedir.
                </p>
                <p>
                  Yurdumuzda sunulan kahvaltı ve akşam yemekleri, alanında deneyimli personel tarafından yurt mutfağında hazırlanmakta olup, hijyen kurallarına uygun şekilde yemekhanede servis edilmektedir.
                </p>
                <p className="font-medium text-teal-700 dark:text-teal-400 p-4 bg-teal-50 dark:bg-teal-950/30 rounded-xl mt-4">
                  Belirtilen ücretlerden de anlaşılacağı üzere yurdumuz kâr amacı gütmemektedir. Tahsil edilen ücretler yalnızca temel işletme maliyetlerinin (elektrik, su, doğalgaz, personel) karşılanmasına yöneliktir. Diğer tüm ihtiyaçlar vakfımız tarafından karşılanmaktadır.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 group bg-slate-900">
                <div className="aspect-video relative w-full">
                  <iframe 
                    src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
                    title="Yurt Tanıtım Videosu" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  ></iframe>
                </div>
              </div>
              <div className="flex justify-between items-center px-2">
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Yurt Tanıtım Filmi</p>
                <a 
                  href="https://youtube.com/watch?v=YOUR_VIDEO_ID" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 transition-colors"
                >
                  <PlayCircle className="w-4 h-4" />
                  YouTube'da İzle
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FACILITIES BENTO GRID */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-serif mb-4">
              Öğrenci Yurdumuzda Sunulan İmkânlar
            </h2>
            <p className="text-slate-500 dark:text-slate-400">Modern donanım, manevi gelişim ve yüksek güvenlik bir arada.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
              <ShieldCheck className="w-10 h-10 text-teal-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Yeni ve Güvenli Bina</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                2023 yılında inşa edilerek hizmete açılan binamız, güncel deprem yönetmeliğine uygun yapılmış olup depremden hasar almamıştır.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
              <Wifi className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Eksiksiz Donanım</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Tüm odalarımız yüksek hızlı Wi-Fi, kişisel buzdolabı, modern baza sistemi ve kişisel dolap gibi temel ihtiyaçlara cevap verecek donanıma sahiptir.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow">
              <GraduationCap className="w-10 h-10 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Akademik & Manevi Gelişim</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                İlahiyat Fakültesi hocaları tarafından hazırlanan ilmî programlar; Kur'an-ı Kerim, hüsn-i hat, tezhip ve dinî musiki kursları düzenlenmektedir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PHYSICAL SPACES GALLERY */}
      <section className="py-16 bg-slate-50 dark:bg-background border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Odalar Slider */}
              <SliderCard 
                title="1-3-4-5 Kişilik Odalar"
                description="Öğrencilerimizin farklı ihtiyaç ve tercihlerine hitap eden, konforlu ve titizlikle tasarlanmış yaşam alanları."
                images={odaImages}
                fallbackIcon={BedDouble}
              />
              
              {/* Banyo Slider */}
              <SliderCard 
                title="Özel Duş ve WC"
                description="Odalarımızın tamamında müstakil banyo ve lavabo imkânı bulunmaktadır."
                images={banyoImages}
                fallbackIcon={Bath}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Etüt Odaları Slider */}
              <SliderCard 
                title="Etüt Odaları & Kütüphane"
                description="Her katta ayrı çalışma odaları. İlaveten yurdun zengin kütüphanesi ve sessiz çalışma ortamı."
                images={etutImages}
                fallbackIcon={BookOpen}
              />

              {/* Ortak Alanlar Slider */}
              <SliderCard 
                title="Yemek & Ortak Alanlar"
                description="Sıcağı sıcağına sunulan kahvaltı ve akşam yemeği, mescit ve şehir manzaralı teras."
                images={ortakAlanImages}
                fallbackIcon={Utensils}
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}