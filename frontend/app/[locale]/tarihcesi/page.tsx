import { Landmark, GraduationCap, Map, Clock, History, PlayCircle } from "lucide-react";

export default function TarihcePage() {
  return (
    <>
      {/* Üst Mavi/Koyu Başlık Alanı */}
      <section className="bg-slate-900 text-white py-12 md:py-16 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight flex items-center justify-center md:justify-start gap-4">
              <History className="w-10 h-10 text-blue-400" />
              Tarihçemiz
            </h1>
            <p className="mt-4 text-slate-400 text-lg">
              Vakfımızın kuruluşu, üniversitemizin köklü geçmişi ve kadim şehrimiz Elazığ'ın binlerce yıllık serüveni.
            </p>
          </div>
        </div>
      </section>

      {/* 1. BÖLÜM: VAKIF TARİHÇESİ */}
      <section className="py-16 bg-white dark:bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
            <Landmark className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-serif">
              Vakıf Tarihçesi
            </h2>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Elazığ İlahiyat ve Harput İlim Vakfı’nın kuruluş çalışmaları 2022 yılının başlarında atılan adımlarla doğmuştur. Vakfın kurulması için önce Asliye Hukuk mahkemesine müracaat edilmiştir. Dava sonucunda Elazığ 6. Asliye Hukuk Mahkemesinin 04.03.2022 tarihinde kesinleşen, 21.01.2022 tarih ve E: 2021/439, K: 2022/45 sayılı kararı ile Elazığ İlahiyat ve Harput İlim Vakfı’nın kurulması tescillenmiştir.
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mt-4">
              Daha sonra vakfın kuruluşu Vakıflar Genel Müdürlüğü tarafından da uygun görülmüş ve Türk Medeni Kanunu 104. Maddesi gereği ve Kültür Turizm Bakanlığı Vakıflar Genel Müdürlüğünden alınan izinle 17.03.2022 Perşembe günü 31781 Sayılı Resmi Gazetede ilan edilerek resmen faaliyetlerine başlamıştır.
            </p>
          </div>
        </div>
      </section>

      {/* 2. BÖLÜM: FIRAT ÜNİVERSİTESİ */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/20 border-y border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Metin Alanı */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-serif">
                  Fırat Üniversitesi ve Tarihi
                </h2>
              </div>
              <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                <p>
                  Köklü bir geçmişe sahip olan Fırat Üniversitesi, eğitim-öğretim hizmetine zengin bir kültür hayatı bulunan Elazığ'da başlamıştır. Daha sonra Elazığ'ın ilçeleri başta olmak üzere Bingöl, Muş ve Tunceli illeri ile Erzincan'ın Kemaliye ilçesinde yükseköğretim kurumları açarak ve aynı zamanda lisansüstü faaliyetleri ile üniversitelere eleman yetiştirerek Doğu ve Güneydoğu Anadolu'da yükseköğretimin gelişimine önemli katkı sağlayan bir yükseköğretim kurumu hâline gelmiştir.
                </p>
                <p>
                  Elazığ'da yükseköğretim, 1967 yılında açılan Yüksek Teknik Okul ile başlamıştır. Aynı yıl içerisinde Ankara Üniversitesi Senatosunun Elazığ'da Veteriner Fakültesinin kurulmasını öngören kararı, Millî Eğitim Bakanlığınca onaylanmıştır. Yüksek Teknik Okul, 1969 yılında Elazığ Devlet Mühendislik ve Mimarlık Akademisine (EDMMA) dönüştürülmüş; Veteriner Fakültesi de 1970 yılında Ankara Üniversitesine bağlı olarak eğitim-öğretime başlamıştır.
                </p>
                <p>
                  Elazığ'daki yükseköğretim kurumları, 11 Nisan 1975'te "Fırat Üniversitesi" adıyla tek bir çatı altında toplanmış ve Veteriner Fakültesi, Fen Fakültesi ve Edebiyat Fakültesinden oluşan bir yapı çerçevesinde faaliyete başlamıştır. EDMMA ise Mühendislik Fakültesine dönüştürülerek, 1982 yılında kurulan Tıp Fakültesi ile birlikte üniversite bünyesinde yer almıştır.
                </p>
              </div>
            </div>

            {/* Video Çerçevesi */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 group">
              <div className="absolute inset-0 bg-indigo-600/10 group-hover:bg-transparent transition-colors pointer-events-none z-10"></div>
              <div className="aspect-video relative w-full">
                <iframe 
                  src="https://www.youtube.com/embed/MQV9bEFpmKw?si=YOUR_PARAMS" 
                  title="Fırat Üniversitesi Tarihi" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. BÖLÜM: ELAZIĞ TARİHİ */}
      <section className="py-16 bg-white dark:bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          
          <div className="flex items-center gap-3 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
            <Map className="w-8 h-8 text-teal-600 dark:text-teal-400" />
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-serif">
              Şehrimizin Tanıtımı ve Tarihi
            </h2>
          </div>

          {/* Elazığ Video Frame (Büyük Ekran) */}
          <div className="mb-12 rounded-2xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800">
            <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-teal-400" />
              <span className="text-sm font-medium text-slate-300 tracking-wider uppercase">Elazığ Tanıtım Filmi</span>
            </div>
            <div className="aspect-video relative w-full bg-slate-100">
              <iframe 
                src="https://www.youtube.com/embed/XKEL6TTIe48?si=YOUR_PARAMS" 
                title="Elazığ Tanıtımı ve Tarihi" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>

          {/* Uzun Metin İçeriğini Düzenli Sütunlara ve Kartlara Bölüyoruz */}
          <div className="space-y-12">
            
            {/* Alt Başlık 1 */}
            <div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                <span className="bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                Tarihlerle İlimiz
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-700 dark:text-slate-300 leading-relaxed">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">4000 yıllık kent...</h4>
                  <p className="mb-6">Yeni bir yerleşim merkezi olan Elazığ’ın tarihi, tarihçiler tarafından, devamı olduğu Harput şehir tarihi ile birlikte inceleniyor. Gerçekten; bugünkü şehir merkezinden sadece 5 km uzaklıkta bulunan Harput, yazılı kaynaklara göre M.Ö. 2000 yılına dayanan 4000 yıllık tarihiyle, Elazığ’ın ilk yerleşim bölgesi. Tarihi kaynaklarda, Harput’a ilk yerleşenlerin “Hurriler” olduğu belirtiliyor. Asya çıkışlı oldukları tezi çoğunlukla kabul gören Hurriler’in yine bölgede yerleşmiş olan Hititler ve Asurlar’la ilişki içinde olduğu biliniyor. Hititler’in başkenti Boğazköy’de bulunan yazılı kaynaklarda Harput’tan “İşuva” olarak sözedilmesi bu bilgiyi doğrular nitelikte.</p>
                  
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Malazgirt’ten sonra</h4>
                  <p>Harput’un Asya / Anadolu / Trakya / Mısır bağlantılı ticaret yollarının tam üzerinde yeralması, her dönemde önemli bir yerleşim merkezi olmasına ve çeşitli uygarlıkların fetihlerine uğramasına neden oluyor 1085’de Çubuk bey tarafından fethedilen yörede, önce Artukoğulları’nın daha sonra 1234’de Anadolu Selçukları’nın, 1243’de İlhanlılar’ın, 1363’de Dulkadiroğulları’nın, 1465’de Akkoyunlular’ın hüküm sürdüklerini görüyoruz.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Ve Osmanlı...</h4>
                  <p className="mb-6">Harput, son olarak 1516’da Çaldıran Zaferi sonrası Yavuz Selim tarafından fethedilerek Osmanlı topraklarına katılıyor ve 19. yüzyılın sonlarına kadar kültür, bayındırlık gibi konularda yurdun en gözde şehirlerinden biri olarak varlığını sürdürüyor. 19. yüzyıl sonlarına doğru, değişen toplum yapısı ve buna bağlı olarak değişen şehircilik anlayışının getirdiği şartlarla Harput, 1834 yılından itibaren ovada yeralan ve o zamanki adı ile Agavat Mezrası olan bugünkü Elazığ’a taşınmaya başlıyor.</p>

                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Atatürk ve Elazığ</h4>
                  <p className="mb-6">Dönemin valisi İzzet Paşa’nın teklifiyle “Mamurat-ül Aziz” ismini alan, ancak söylenmesi daha kolay olduğu için “Elaziz” olarak anılan şehir, 1937 yılında Atatürk tarafından ziyaret ediliyor. Atatürk 1937’deki ziyaretiyle Elazığ’a ikinci defa gelmiş oluyor. 1937’de Atatürk, şehre “azığı bol il” anlamında “Elazık” ismini uygun görüyor, isim daha sonraları, TBMM kararı ile “Elazığ” olarak onaylanıyor.</p>

                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Çağdaş Elazığ</h4>
                  <p>Özellikle eğitim alanında büyük gelişme gösteren ve bir “Üniversite Şehri” niteliğindeki kent bugün, eğitim kurumları, turistik tesisleri, mükemmel şehircilik anlayışı, kültürü, tarihi yanında, çalışkan, konuksever halkı ile de çağdaş bir kent olarak “Doğu'nun İncisi” sıfatını hak ediyor.</p>
                </div>
              </div>
            </div>

            {/* Alt Başlık 2 */}
            <div className="bg-slate-50 dark:bg-slate-900/30 p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                <span className="bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                Kronoloji (Harput'un Türklerin Eline Geçişi)
              </h3>
              <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                <p>Büyük Selçuklu hakimiyetinin Anadolu'ya kayması ile Harput'un Türk yurdu olmasında en önemli savaşın Malazgirt Meydan Muharebesi olduğuna şüphe yoktur Nitekim Harput ve çevresi 26 Ağustos 1071 Malazgirt muharebesinden sonra Türklerin eline geçmiş olup yörede Büyük Selçuklu Devletine bağlı olarak Çubuk beyin idaresinde, Çubukoğulları Beyliği kurulmuştur (1085).</p>
                <p>Çubukoğulları Beyliğinin ömrü uzun sürmemiş 1110 yılında Artuklu Belek B. Behram Harput ve yöresini ele geçirerek Artukoğulları dönemini başlatmıştır. Belek Gazi, Haçlı seferlerine karşı büyük mücadeleler vermiştir. 1234 yılından itibaren Türkiye Selçuklu Devleti'nin hakimiyeti altına girmiştir. Türkiye Selçukluları devrinde Harput, bir subaşı tarafından idare edilmiş, bu devirde "Arap Baba" Türbe ve Mescidi hariç önemli bir eser günümüze kadar gelmemiştir.</p>
                <p>14.yüzyıl ortalarında bir süre Harput, Eratnalılar ile Dulkadiroğluları arasında mücadele konusu olmuştur. 1507 yılında Safevilerin eline geçen Harput, 1515 yılında Çaldıran zaferinden sonra Osmanlı hakimiyetine girdi (1516). Şehrin 1518'de 6.000 olan nüfusu giderek artmış ve bu rakam 1523'te 8.300'ü, 1566'da 13.400'ü geçmişti.</p>
                <p>Osmanlı hakimiyeti döneminde Harput, Basra ve Bağdat'tan Diyarbekir'e gelip Malatya ve Sivas istikametinde devam eden ticaret yolunun üzerinde bulunuyordu. Dericilik, demircilik ve bakırcılık çok gelişmişti. Sultan Abdulaziz'in tahta çıkışının 5.yılında Hacı Ahmed İzzet Paşa devrinde buraya tayin edilen, Vali İsmail Paşanın teklifi ile 1867 yılında "Mamurat al-aziz" adı verilmiştir.</p>
              </div>
            </div>

            {/* Alt Başlık 3 */}
            <div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                <span className="bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                Elazığ'ın Tarihi ve Uygarlıklar
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
                Doğu Anadolu Bölgesini batıya bağlayan yolların kavşak noktasında bulunmaktadır. İl Sınırları içindeki en önemli akarsu Fırat ve kollarıdır. Elazığ kent merkezinin geçmişi yeni olmakla birlikte yerleşim olarak bölgenin tarihi oldukça eskidir. Urartu dönemi ile ilgili olarak, Harput Kalesi başta olmak üzere, Altınova Norşuntepe'de ortaya çıkarılan Urartu yerleşmesi, Palu Kalesi, Karakoçan ve İzoli'ndeki çivi yazılı kitabeler yöredeki Urartu hakimiyetini açıkça ortaya koymuştur.
              </p>

              {/* State of the Art: Uygarlıklar "Badge" Izgarası */}
              <div className="bg-slate-900 rounded-2xl p-8 text-center mt-10 shadow-lg relative overflow-hidden">
                <Clock className="absolute -right-4 -top-4 w-32 h-32 text-slate-800 opacity-50 pointer-events-none" />
                <h4 className="text-xl font-serif text-white mb-6 relative z-10">Harput’ta Hüküm Sürmüş Uygarlıklar</h4>
                
                <div className="flex flex-wrap justify-center gap-3 relative z-10">
                  {[
                    "Hurriler (M.Ö. 20. yy.)",
                    "Hititler (M.Ö. 14-13. yy.)",
                    "Urartular (M.Ö. 9. yy.)",
                    "Romalılar (M.Ö. 8. yy.)",
                    "Bizanslılar (M.S. 10-11. yy.)",
                    "Azeri Türkleri (M.S. 11. yy.)",
                    "Araplar (M.S. 11. yy.)",
                    "Çubukoğulları (M.S. 12. yy.)",
                    "Artukoğulları (M.S. 12. yy.)",
                    "Selçuklular (M.S. 13-14. yy.)",
                    "Dulkadiroğulları (M.S. 14. yy.)",
                    "Akkoyunlular (M.S. 15. yy.)",
                    "Osmanlılar (M.S. 16. yy.)"
                  ].map((uygarlik, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-slate-800 border border-slate-700 text-teal-300 rounded-full text-sm font-medium hover:bg-teal-900 hover:text-white transition-colors cursor-default"
                    >
                      {uygarlik}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}