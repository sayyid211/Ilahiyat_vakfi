"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Users,
  Landmark,
  Sparkles,
  HeartHandshake,
  ChevronRight,
  ChevronLeft,
  Images,
  X,
  Maximize2,
  GraduationCap,
} from "lucide-react";

// Generates ["/gm1.jpeg", "/gm2.jpeg", ..., "/gm24.jpeg"]
// Adjust the path or extension here if your files are named differently
const ALL_IMAGES = Array.from({ length: 24 }, (_, i) => `/gm${i + 1}.jpeg`);

export default function GenclikMerkeziPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showAllGrid, setShowAllGrid] = useState(false);

  // Close lightbox
  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  // Next image in lightbox
  const nextImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % ALL_IMAGES.length
    );
  }, []);

  // Previous image in lightbox
  const prevImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + ALL_IMAGES.length) % ALL_IMAGES.length
    );
  }, []);

  // Keyboard navigation for Lightbox (Arrow keys + Escape)
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

  // Show 8 featured photos in the Bento grid initially (starting from gm6 so we don't repeat the first 5)
  // Or show all 24 if the user clicks "Tümünü Gridde Aç"
  const bentoImages = showAllGrid ? ALL_IMAGES : ALL_IMAGES.slice(5, 13);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-600/20 blur-3xl rounded-full"></div>

        <div className="container mx-auto px-4 py-20 lg:py-28 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 text-amber-400 text-sm font-semibold tracking-wide mb-6 border border-slate-700">
                <Landmark className="w-4 h-4 shrink-0" />
                <span>İLİM, İRFAN, İBADET VE GENÇLİK AYNI ÇATI ALTINDA BULUŞUYOR</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight mb-6">
                Fırat Üniversitesi Gençlik Merkezi ve Murad Camii
              </h1>
              <p className="text-slate-300 text-lg md:text-xl leading-relaxed text-justify mb-6">
                Elazığ İlahiyat ve Harput İlim Vakfı olarak gençlerimizin ilimle buluşmasını, akademik gelişimlerini sürdürmelerini ve millî-manevi değerlerle yetişmelerini önemsiyoruz. Bu doğrultuda, Fırat Üniversitesi İlahiyat Fakültemiz bünyesinde Murad Camii müştemilatında hizmet veren Gençlik Merkezi, öğrencilerin eğitim, kültür ve sosyal hayatına katkı sunan kıymetli mekânlardan biridir.
              </p>
              <p className="text-slate-400 text-md leading-relaxed text-justify">
                Gençlerin yalnızca akademik başarılarına değil; düşünce dünyalarına, manevi gelişimlerine ve sosyal ilişkilerine de katkı sağlamayı amaçlayan merkez, sunduğu imkânlarla öğrencilere verimli ve nitelikli bir ortam oluşturmaktadır.
              </p>
            </div>

            <div
              onClick={() => setLightboxIndex(0)}
              className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-700/50 group cursor-pointer"
            >
              <Image
                src={ALL_IMAGES[0]}
                alt="Fırat Üniversitesi Gençlik Merkezi ve Murad Camii"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md text-white text-xs px-3 py-2 rounded-xl flex items-center gap-2 border border-slate-700 opacity-90 group-hover:opacity-100 transition-opacity">
                <Images className="w-4 h-4 text-amber-400" />
                <span>24 Fotoğrafı İncele</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PILLARS SECTION (Alternating Layout) */}
      <section className="py-20 lg:py-28 container mx-auto px-4 max-w-7xl">
        <div className="space-y-24">

          {/* PILLAR 1: Kütüphane ve Ders Çalışma Alanları (Blue Theme) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              onClick={() => setLightboxIndex(1)}
              className="order-2 lg:order-1 relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-xl group cursor-pointer"
            >
              <Image
                src={ALL_IMAGES[1]}
                alt="Kütüphane ve Ders Çalışma Alanları"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="order-1 lg:order-2 lg:pl-10">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-serif mb-6">
                Kütüphane ve Ders Çalışma Alanları
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6 text-justify">
                Merkez bünyesinde bulunan kütüphane, derslikler ve çalışma alanları, öğrencilerin araştırma yapmalarına, kitap okumalarına ve derslerine hazırlanmalarına imkân sağlamaktadır. Bu alanlar, gençlerin bilgiye erişimlerini kolaylaştırırken akademik gelişimlerini de desteklemektedir.
              </p>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-3">
                  <ChevronRight className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>Sessiz ve nitelikli bireysel çalışma salonları</span>
                </li>
                <li className="flex items-center gap-3">
                  <ChevronRight className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>Zengin kaynaklara sahip araştırma kütüphanesi</span>
                </li>
              </ul>
            </div>
          </div>

          {/* PILLAR 2: Eğitim, Söyleşi ve Kültürel Etkinlikler (Purple Theme) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="lg:pr-10">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-serif mb-6">
                Eğitim, Söyleşi ve Kültürel Etkinlikler
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6 text-justify">
                Gençlik Merkezi; konferanslar, ilmî söyleşiler, kitap tahlilleri ve çeşitli eğitim faaliyetleriyle öğrencilerin farklı alanlarda bilgi ve birikim kazanmalarına katkı sunmaktadır. Bu faaliyetler, gençlerin fikir alışverişinde bulunmalarına, farklı bakış açıları kazanmalarına ve üniversite hayatını daha verimli geçirmelerine yardımcı olmaktadır.
              </p>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-3">
                  <ChevronRight className="w-5 h-5 text-purple-500 shrink-0" />
                  <span>Konferanslar, ilmî söyleşiler ve kitap tahlilleri</span>
                </li>
                <li className="flex items-center gap-3">
                  <ChevronRight className="w-5 h-5 text-purple-500 shrink-0" />
                  <span>Fikir alışverişi ve ufuk açıcı müzakere ortamları</span>
                </li>
              </ul>
            </div>
            <div
              onClick={() => setLightboxIndex(2)}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-xl group cursor-pointer"
            >
              <Image
                src={ALL_IMAGES[2]}
                alt="Eğitim, Söyleşi ve Kültürel Etkinlikler"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* PILLAR 3: Murad Camii ve Manevi Atmosfer (Emerald Theme) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              onClick={() => setLightboxIndex(3)}
              className="order-2 lg:order-1 relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-xl group cursor-pointer"
            >
              <Image
                src={ALL_IMAGES[3]}
                alt="Murad Camii ve Manevi Atmosfer"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="order-1 lg:order-2 lg:pl-10">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-serif mb-6">
                Murad Camii ve Manevi Atmosfer
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-6 text-justify">
                Gençlik Merkezi ile bütünleşen Murad Camii, öğrencilerin ibadetlerini yerine getirebildikleri ve manevi hayatlarını güçlendirebildikleri önemli bir mekândır. Camide gerçekleştirilen dinî sohbetler ve ilmî dersler, gençlerin dinî bilgi ve bilinçlerinin gelişmesine katkıda bulunmaktadır. Cami ve Gençlik Merkezi, ilim ile maneviyatın bir araya geldiği, gençlerin hem akademik hem de manevi yönden gelişimlerini destekleyen bir ortam sunmaktadır.
              </p>
              <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                <li className="flex items-center gap-3">
                  <ChevronRight className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>İlim ile maneviyatı buluşturan huzurlu ibadet mekânı</span>
                </li>
                <li className="flex items-center gap-3">
                  <ChevronRight className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>Düzenli dinî sohbetler ve ilmî ders halkaları</span>
                </li>
              </ul>
            </div>
          </div>

          {/* PILLAR 4: Hayır Hizmetleri ve Maddi Destekler (Rose Theme) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="lg:pr-10">
              <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center mb-6 text-rose-600 dark:text-rose-400">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-serif mb-6">
                Hayır Hizmetleri ve Maddi Destekler
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-4 text-justify">
                Elazığ İlahiyat ve Harput İlim Vakfı olarak cami hizmetlerinin sürdürülmesine, caminin imar ve bakım çalışmalarına, Gençlik Merkezi’nin imkânlarının geliştirilmesine ve öğrencilerimizin eğitim hayatlarının desteklenmesine önem veriyoruz. Bu kapsamda sunulan maddi desteklerin ve hayır hizmetlerinin, öğrencilerimizin daha iyi imkânlarda yetişmelerine ve ilmî faaliyetlerin devamlılığına katkı sağlamasını amaçlıyoruz.
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed text-justify">
                Hayırseverlerimizin katkılarıyla sürdürülen bu hizmetlerin, yalnızca bugünün gençlerine değil, gelecek nesillere de fayda sağlayacak kalıcı eserler ve hayırlar olarak devam etmesini temenni ediyoruz.
              </p>
            </div>
            <div
              onClick={() => setLightboxIndex(4)}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-xl group cursor-pointer"
            >
              <Image
                src={ALL_IMAGES[4]}
                alt="Hayır Hizmetleri ve Maddi Destekler"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. BENTO PHOTO GALLERY SECTION (Handles all 24 images cleanly) */}
      <section className="pb-20 lg:pb-28 container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Images className="w-3.5 h-3.5" />
              <span>Fotoğraf Galerisi</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-serif">
              Merkezimizden ve Camimizden Kareler
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAllGrid(!showAllGrid)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium transition-colors"
            >
              {showAllGrid ? "Özeti Göster (8)" : "Tümünü Sayfada Aç (24)"}
            </button>
            <button
              onClick={() => setLightboxIndex(0)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 text-sm font-medium transition-colors flex items-center gap-2"
            >
              <Maximize2 className="w-4 h-4 text-amber-400" />
              <span>Tam Ekran Galeri</span>
            </button>
          </div>
        </div>

        {/* Responsive Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[240px]">
          {bentoImages.map((src, idx) => {
            // Calculate actual index in ALL_IMAGES for the Lightbox
            const actualIndex = showAllGrid ? idx : idx + 5;
            const isLastPreviewTile = !showAllGrid && idx === 7;

            // Make the 1st and 6th items span 2x2 on desktop for a dynamic Bento feel
            const spanClasses =
              !showAllGrid && (idx === 0 || idx === 5)
                ? "col-span-2 row-span-2"
                : "col-span-1 row-span-1";

            return (
              <div
                key={src}
                onClick={() => setLightboxIndex(actualIndex)}
                className={`relative rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 group cursor-pointer shadow-md ${spanClasses}`}
              >
                <Image
                  src={src}
                  alt={`Gençlik Merkezi ve Murad Camii Görsel ${actualIndex + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <Maximize2 className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
                </div>

                {/* "+16 Fotoğrafı Gör" Overlay on the 8th tile */}
                {isLastPreviewTile && (
                  <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-sm flex flex-col items-center justify-center text-white p-4 text-center transition-colors group-hover:bg-slate-900/85">
                    <span className="text-3xl font-bold text-amber-400 mb-1">
                      +16
                    </span>
                    <span className="text-sm font-medium text-slate-200">
                      Tüm Fotoğrafları Gör
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. CLOSING MANIFESTO BANNER ("Gençliğe Yatırım, Geleceğe Yatırım") */}
      <section className="container mx-auto px-4 max-w-5xl pb-24">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden border border-slate-700">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <GraduationCap className="w-48 h-48 text-white" />
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white font-serif mb-6 flex flex-wrap items-center gap-3">
              <span className="bg-amber-500 text-slate-900 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-sans font-bold">
                Vizyonumuz
              </span>
              <span>Gençliğe Yatırım, Geleceğe Yatırım</span>
            </h3>
            <div className="space-y-4 text-slate-300 text-lg leading-relaxed text-justify max-w-4xl">
              <p>
                Elazığ İlahiyat ve Harput İlim Vakfı olarak gençlerimizin ilimle, güzel ahlakla ve kardeşlik bilinciyle yetişmesini temel önceliklerimiz arasında görüyoruz. Gençlerin eğitim hayatlarını destekleyen, onları faydalı faaliyetlerle buluşturan ve manevi gelişimlerine katkı sunan her çalışmayı değerli buluyoruz.
              </p>
              <p>
                İnanıyoruz ki ilimle beslenen, değerleriyle güçlenen ve sorumluluk bilinciyle yetişen bir gençlik, geleceğimizin en kıymetli kazanımlarından biridir. Bu anlayışla cami hizmetlerine, eğitim faaliyetlerine ve gençliğe yönelik çalışmalara katkı sunmaya devam ediyoruz.
              </p>
              <p className="text-amber-400 font-medium pt-2">
                İlim ve irfan yolunda gençlerimizin yanında olmaya, hayır hizmetlerine katkı sunmaya ve geleceğe değer katmaya devam ediyoruz.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-700/80 flex flex-wrap items-center gap-4">
              <Link
                href="/tr/bagis"
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition-colors shadow-lg shadow-amber-500/20"
              >
                Hayır Hizmetlerine Destek Ol
              </Link>
              <Link
                href="/tr/iletisim"
                className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-medium text-sm transition-colors"
              >
                Bizimle İletişime Geçin
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FULLSCREEN LIGHTBOX MODAL FOR ALL 24 IMAGES */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-6">
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white max-w-7xl mx-auto w-full">
            <div className="text-sm font-medium text-slate-300">
              <span className="text-amber-400 font-bold">
                {lightboxIndex + 1}
              </span>{" "}
              / {ALL_IMAGES.length} — Gençlik Merkezi ve Murad Camii
            </div>
            <button
              onClick={closeLightbox}
              className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-colors"
              aria-label="Kapat"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Image & Prev/Next Controls */}
          <div className="relative flex-1 flex items-center justify-center my-4 max-w-6xl mx-auto w-full overflow-hidden">
            <button
              onClick={prevImage}
              className="absolute left-2 md:left-4 z-10 p-3 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 transition-colors shadow-lg"
              aria-label="Önceki"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative w-full h-full max-h-[70vh]">
              <Image
                src={ALL_IMAGES[lightboxIndex]}
                alt={`Görsel ${lightboxIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            <button
              onClick={nextImage}
              className="absolute right-2 md:right-4 z-10 p-3 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 transition-colors shadow-lg"
              aria-label="Sonraki"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnail Strip */}
          <div className="max-w-5xl mx-auto w-full overflow-x-auto pb-2">
            <div className="flex items-center gap-2 min-w-max px-2">
              {ALL_IMAGES.map((thumb, idx) => (
                <button
                  key={thumb}
                  onClick={() => setLightboxIndex(idx)}
                  className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    lightboxIndex === idx
                      ? "border-amber-400 scale-105 opacity-100"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={thumb}
                    alt={`Küçük Görsel ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}