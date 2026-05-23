import { ScrollText, Scale, Gavel, BookOpen } from "lucide-react";

// Data structure for the historical quotes to keep the code clean
const historicalQuotes = [
  {
    author: "Kanunî Sultan Süleyman",
    date: "950 H/ 1543",
    type: "dua", // Green accent
    text: "“Her kimse ki vakıfların bekasına özen ve gelirlerinin artmasına itina gösterirse; bağışlayıcı olan yüce Allah’ın huzurunda ameli güzel ve makbul olup, mükâfatı sayılamayacak kadar çok olsun. Dünya üzüntülerinden korunsun ve her türlü tehlikeden muhafaza olunsun.”"
  },
  {
    author: "Sultan 2. Bayezid",
    date: "1 Şubat 1495",
    type: "beddua", // Red/Rose accent
    text: "“Sultan, emir veya herhangi bir kimseye bu vakfı değiştirmek, bozmak, nakletmek, başka hâle getirmek, iptal etmek, işlemez hâle getirmek, ihmal etmek ve değiştirmek helal olmaz. Kim onun şartlarını değiştirir veya iptal ederse haramı üstlenerek günaha girmiş olur. Günahkârların alınlarından tutularak cezalandırıldıkları gün, Allah onların hesabını görsün. Cehennemde zebaniler onları denetlesin. Allah’ın hesabı hızlıdır. Kim bunları işittikten sonra, vakfı değiştirirse, onun günahı, değiştirenler üzerinedir. Kuşkusuz Allah, iyilik edenlerin ecrini zayi etmez.”"
  },
  {
    author: "Hazine Vekili Hafız İsa Ağa",
    date: "1818",
    type: "beddua",
    text: "“Vakıf gelirini haksız olarak yiyenler, dünya ve ahirette mutluluk yüzü görmesinler.”"
  },
  {
    author: "Pertevniyal Valide Sultan",
    date: "1872",
    type: "beddua",
    text: "“Şayet bir nice zaman sonra vakfı değiştirmeye, bozmaya temayül eden olursa veya vakfın bozulmasına sebep olursa, yerleri ve gökleri yaratan ve bize bunca nimetleri veren Allah’ın kahır ve gazabına uğrasın. Dünyada ve âhirette rahat yüzü görmesin ve iki cihanda rezaletten kurtulmasın.”"
  }
];

export default function DuaVeBedduaPage() {
  return (
    <>
      {/* Top Header Area */}
      <section className="bg-slate-900 text-white py-12 md:py-16 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight flex items-center justify-center md:justify-start gap-4">
              <ScrollText className="w-10 h-10 text-amber-400" />
              Vakıf Dua ve Bedduası
            </h1>
            <p className="mt-4 text-slate-400 text-lg">
              Geçmişten günümüze vakıf medeniyetinin manevi koruyucuları olan dualar ve uyarılar.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="bg-[#fcfbf9] dark:bg-background py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Introduction Text */}
          <div className="mb-12 text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-serif">
            <p>
              İslam hukukuna göre vakıf yapmak isteyen şahıs bir vakfiye yazarak Kadıya müracaat eder. Vakıf senedi mahkeme tarafından tescil edilirdi. Vakıf senedine padişah dâhil herkes uymak zorundaydı. Vakfiyelerde genellikle dua ve beddua bölümleri bulunurdu. Bunlardan bazıları şöyledir:
            </p>
          </div>

          {/* Historical Quotes Grid */}
          <div className="space-y-8 mb-20">
            {historicalQuotes.map((quote, index) => (
              <div 
                key={index} 
                className={`bg-white dark:bg-slate-900 rounded-xl p-8 shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden group ${
                  quote.type === 'dua' ? 'border-l-4 border-l-teal-500' : 'border-l-4 border-l-rose-700'
                }`}
              >
                {/* Decorative Icon */}
                <div className="absolute top-6 right-6 opacity-10">
                  {quote.type === 'dua' ? <Scale className="w-24 h-24" /> : <Gavel className="w-24 h-24" />}
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 font-serif">
                    {quote.author}
                  </h3>
                  <p className="text-sm font-semibold text-slate-500 mb-6 tracking-widest uppercase">
                    {quote.date}
                  </p>
                  <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 italic font-serif leading-relaxed">
                    {quote.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SPECIAL SECTION: Fatih Sultan Mehmed */}
      <section className="bg-slate-950 text-slate-300 py-20 border-t-8 border-rose-900 relative overflow-hidden">
        {/* Background Texture/Pattern placeholder */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          
          <div className="text-center mb-12">
            <BookOpen className="w-16 h-16 text-amber-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold text-white font-serif tracking-tight mb-4">
              FATİH SULTAN MEHMED’İN
              <span className="block text-amber-500 mt-2">AYASOFYA VAKFİYESİ</span>
            </h2>
            <p className="text-amber-500/70 tracking-widest uppercase text-sm font-semibold">
              1 Haziran 1453
            </p>
          </div>

          <div className="space-y-8 text-lg md:text-xl font-serif leading-relaxed">
            <p className="text-slate-300">
              “İşte bu benim Ayasofya Vakfiyem, dolayısıyla kim bu Ayasofya’yı camiye dönüştüren vakfiyemi değiştirirse, bir maddesini tebdil ederse onu iptal veya tebdile koşarsa, fasit veya fasık bir teville veya herhangi bir dalavereyle Ayasofya Camisi’nin vakıf hükmünü yürürlükten kaldırmaya kastederlerse, aslını değiştirir, füruuna itiraz eder ve bunları yapanlara yol gösterirlerse ve hatta yardım ederlerse ve kanunsuz olarak onda tasarruf yapmaya kalkarlar, camilikten çıkarırlar ve sahte evrak düzenleyerek, mütevellilik hakkı gibi şeyler ister yahut onu kendi batıl defterlerine kaydederler veya yalandan kendi hesaplarına geçirirlerse ifade ediyorum ki huzurunuzda, en büyük haram işlemiş ve günahları kazanmış olurlar.
            </p>

            {/* The Highly Emphasized Curse Text */}
            <div className="bg-rose-950/40 border border-rose-900/50 p-8 rounded-xl text-center my-10 shadow-2xl">
              <p className="text-rose-400 font-bold text-xl md:text-2xl leading-relaxed">
                Bu sebeple, bu vakfiyeyi kim değiştirirse; Allâh’ın, Peygamber’in, meleklerin, bütün yöneticilerin ve dahi bütün Müslümanların ebediyen <span className="underline decoration-rose-600 underline-offset-4">LANETİ ONUN VE ONLARIN ÜZERİNE OLSUN</span>, azapları hafiflemesin onların, haşr gününde yüzlerine bakılmasın.
              </p>
            </div>

            <p className="text-slate-300">
              Kim bunları işittikten sonra hala bu değiştirme işine devam ederse, günahı onu değiştirene ait olacaktır. Allah’ın azabı onlaradır. Allah işitendir, bilendir.”
            </p>

            <hr className="border-slate-800 my-12" />

            <p className="text-slate-400 text-base md:text-lg">
              <strong className="text-white">Fatih Sultan Mehmed’in vakfiyesinin bir kısmı şöyle:</strong> “Eğer bu hayır müesseseleri yıkılacak olursa, ikinci defa, üçüncü defa ila ahir yeniden inşa oluna… Bütün bu şerh ve ta’yin eylediğim şeyler, tesbit edilen şekilde ve vakfiyede yazılı haliyle VAKIF olmuştur; şartları değiştirilemez; kanunları tağyir edilemez; asılları maksatları dışında bir başka hale çevrilemez; tesbit edilen kuralları ve kaideleri eksiltilemez; vakfa herhangi bir şekilde müdahale Allâh’ın diğer haramları gibi haramdır. Kim ki, bozuk teviller, hurafe ve dedikodudan öteye geçmeyen bâtıl gerekçelerle, bu vakfın şartlarından birini değiştirirse veya kanun ve kurallarından birini tağyir ederse; vakfın tebdili ve iptali için gayret gösterirse; vakfın ortadan kalkmasına veya maksadından ve gayesinden başka bir gayeye çevrilmesine kast ederse, vakfın temel hayır müesseselerinden birinin yerine başka bir kurum ikame eylemek ve vakfın bölümlerinden birine itiraz etmek dilerse veya bu manada yapılacak değişiklik veya itirazlara yardımcı olur yahut yol gösterirse; veya şer’-i şerife aykırı olarak vakıfta tasarruf etmeye azm eylerse, mesela şeri’a-ta ve vakfiyeye aykırı ferman, berat, tomar veya talik yazarsa veyahut tevliyet hakkı resmi yahut takrir hakkı resmi ve benzeri bir şey taleb ederse, kısaca bâtıl tasarruflardan birini işler yahut bu tür tasarrufları tamamen geçersiz olan yazılı kayıtlara ve defterlere kaydeder ve bu tür haksız işlemlerini yalanlar yumağı olan hesaplarına ilhak ederse, açıkça büyük bir haramı işlemiş olur, günahı gerektiren bir fiili irtikâp eylemiş olur. Allah’ın, meleklerin ve bütün insanların la’neti üzerlerine olsun. Ebediyen Cehennemde kalsınlar, onların azapları asla hafifletilmesin ve onlara ebediyen merhamet olunmasın. Kim bunları duyup gördükten sonra değiştirirse, vebali ve günahı bunu değiştirenlerin üzerine olsun. Hiç şüphe yok ki, Allah her şeyi işitir ve her şeyi bilir.”
            </p>
          </div>

        </div>
      </section>
    </>
  );
}