import Image from "next/image";
import { 
  BookOpen, 
  Palette, 
  Users, 
  Coffee,
  CalendarClock,
  Landmark,
  ChevronRight
} from "lucide-react";

export default function DarulUlumPage() {
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
                <Landmark className="w-4 h-4" />
                <span>YENİ BİR KÜLTÜR HAVZASI</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight mb-6">
                Dâru’l-Ulûm
              </h1>
              <p className="text-slate-300 text-lg md:text-xl leading-relaxed text-justify mb-8">
                Şehrimizin kalbinde, tarihin ve geleceğin kesişim noktasında yükselen Dâru’l-Ulûm, sadece geçmişin bir hatırası değil; ilmin, sanatın ve toplumsal hayatın yeniden harmanlandığı yaşayan bir kültür havzası olarak kapılarını açıyor.
              </p>
              <p className="text-slate-400 text-md leading-relaxed text-justify">
                Üniversitemizin tüm fakültelerinden gençleri ve şehir halkımızın her bir ferdini aynı çatı altında buluşturmayı hedefleyen merkezimiz, medeniyetimizin köklü mirasını modern bir vizyonla geleceğe taşımak için yola çıkıyor.
              </p>
            </div>

            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-700/50 group">
              <Image 
                src="/kultur-evi1.png" 
                alt="Dâru'l-Ulûm Merkezi" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PILLARS OF DARU'L-ULUM (Alternating Layout) */}
      <section className="py-20 lg:py-28 container mx-auto px-4 max-w-7xl">
        <div className="space-y-24">

          {/* PILLAR 1: İlim */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-xl group">
              <Image src="/kultur-evi2o.png" alt="İlmî Meclisler" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="order-1 lg:order-2 lg:pl-10">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                <BookOpen className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-serif mb-6">İlmî Meclisler ve Eğitim Halkaları</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg mb-6 text-justify">
                Zamanı aşan bir geleneğin izinde, zihni ve kalbi besleyen ilim meclislerimizi yeniden canlandırıyoruz. Merkezimiz bünyesinde düzenli olarak gerçekleştirilecek olan;
              </p>
              <ul className="space-y-4 text-slate-700 dark:text-slate-300 text-justify">
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                  <div><strong>Temel İslam Bilimleri Meclisleri:</strong> Tefsir, Fıkıh, Hadis ve Kelam ilimleri başta olmak üzere, medeniyetimizin köklü bilgi mirasından beslenen derinlikli okuma ve müzakere halkaları oluşturuyoruz.</div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                  <div><strong>Tarih ve Düşünce Meclisleri:</strong> Geçmişin rehberliğinde bugünü anlamlandırmak adına medeniyet, kültür ve düşünce tarihi üzerine ufuk açıcı dersler ve oturumlar düzenliyoruz.</div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                  <div><strong>Akademik Seminerler:</strong> Farklı disiplinlerden araştırmacı ve akademisyenleri ağırlayarak büyük konferans salonlarının mesafeli havasından uzak; üniversite gençliğimizi ve şehir halkımızı yüz yüze, göz temasının ve samimi bir diyaloğun kurulduğu butik oturumlarda bir araya getiriyoruz.</div>
                </li>
              </ul>
            </div>
          </div>

          {/* PILLAR 2: Sanat */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="lg:pr-10">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                <Palette className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-serif mb-6">Kültür, Sanat ve Edebiyat Atölyeleri</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg mb-6 text-justify">
                Estetiği ve kelamın gücünü hayatın merkezine alıyoruz. Sadece teorik eğitimle yetinmiyor, medeniyetimizin estetik mirasını atölyelerimize taşıyoruz:
              </p>
              <ul className="space-y-4 text-slate-700 dark:text-slate-300 text-justify">
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-purple-500 shrink-0 mt-1" />
                  <div><strong>Geleneksel İslam Sanatları:</strong> Alanında uzman eğitmenler ve kurumsal iş birlikleri rehberliğinde düzenlenecek hat, tezhip ve ebru atölyeleriyle, estetik mirasımızı genç kuşaklarla buluşturuyoruz.</div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-purple-500 shrink-0 mt-1" />
                  <div><strong>Edebiyat ve Söyleşi:</strong> Ruhumuzu dinlendiren edebi okumalar, metin tahlilleri ve derinlikli söyleşilerle kelimelerin dünyasında buluşuyoruz.</div>
                </li>
              </ul>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-xl group">
              <Image src="/kultur-evi3o.png" alt="Sanat Atölyeleri" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>

          {/* PILLAR 3: Toplum */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-xl group">
              <Image src="/kultur-evi4o.png" alt="Yaşayan Mekan" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="order-1 lg:order-2 lg:pl-10">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-serif mb-6">Yaşayan Mekan: Gençlik ve Toplum</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg mb-6 text-justify">
                Bu çatı, üniversitemizin sadece tek bir bölümüne değil, tüm öğrencilerine ve şehir halkına aittir. Gençliğin enerjisini ve toplumun tecrübesini burada bir araya getiriyoruz:
              </p>
              <ul className="space-y-4 text-slate-700 dark:text-slate-300 text-justify">
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                  <div><strong>Öğrenci Kulüpleri Etkinlik Alanı:</strong> Üniversitemiz kulüplerinin fikirlerini projeye dönüştürebileceği, özgürce faaliyet ve atölye çalışması yürütebileceği canlı bir platform sunuyoruz.</div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                  <div><strong>Esnek ve Kapsayıcı Planlama:</strong> Toplumun tüm kesimlerinin huzurla istifade edebilmesi adına, hanımlara ve beylere özel dönemsel ve esnek zamanlı programlar organize ediyoruz.</div>
                </li>
              </ul>
            </div>
          </div>

          {/* PILLAR 4: Sosyal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="lg:pr-10">
              <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center mb-6 text-rose-600 dark:text-rose-400">
                <Coffee className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-serif mb-6">Zihin ve Gönül Dünyanıza Hizmet Eden Sosyal Alanlar</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg mb-6 text-justify">
                Koşturmacanın ortasında dingin bir soluklanma, odaklanma ve sıcak bir hasbihal ortamı arayan herkes için kapımız hep açık:
              </p>
              <ul className="space-y-4 text-slate-700 dark:text-slate-300 text-justify">
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-rose-500 shrink-0 mt-1" />
                  <div><strong>Kütüphane ve Okuma Salonu:</strong> Araştırmalarınızı yapabileceğiniz, kitabınızı alıp derinleşebileceğiniz sessiz, nitelikli ve huzurlu çalışma alanları.</div>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="w-5 h-5 text-rose-500 shrink-0 mt-1" />
                  <div><strong>Sıcak Bir İkram, Samimi Bir Hasbihal:</strong> Gün boyu eksik olmayan çay servisimiz ve öğle saatlerinde gönülleri ısıtacak geleneksel çorba ikramımız ile burada bir aile sıcaklığı inşa ediyoruz.</div>
                </li>
              </ul>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-200 dark:bg-slate-800 shadow-xl group">
              <Image src="/kultur-evi5o.png" alt="Sosyal Alanlar" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>

        </div>
      </section>

      {/* 3. IMPORTANT NOTE BANNED */}
      <section className="container mx-auto px-4 max-w-5xl pb-20">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden border border-slate-700">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <CalendarClock className="w-48 h-48 text-white" />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="bg-amber-500 text-slate-900 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold">Önemli Not</span>
              Randevu ve Planlama
            </h3>
            <p className="text-slate-300 text-lg leading-relaxed text-justify max-w-3xl">
              Merkezimiz bünyesindeki kütüphane, çalışma salonları ve kontenjanlı atölye çalışmalarından tüm katılımcılarımızın en verimli ve konforlu şekilde istifade edebilmesi adına, hizmetlerimiz online randevu sistemi üzerinden yürütülecektir. Faaliyet takvimi ve randevu işlemleriyle ilgili detaylar çok yakında dijital platformlarımız üzerinden ilan edilecektir.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}