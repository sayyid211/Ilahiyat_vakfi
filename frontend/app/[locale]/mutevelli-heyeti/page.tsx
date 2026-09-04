import { Landmark, Info, User } from "lucide-react";
// import Image from "next/image"; // Uncomment when adding real photos

// 1. DATA STRUCTURE: Standardized titles and separated merged names.
const trusteesBoard = [
  { title: "Prof. Dr.", name: "Fikret KARAMAN" },
  { title: "Prof. Dr.", name: "Veysel ÖZDEMİR" },
  { title: "Av.", name: "Ömer Faruk BUDAK" },
  { title: "", name: "Asilhan ARSLAN" },
  { title: "Doç. Dr.", name: "Tuncay KARATEKE" },
  { title: "Prof. Dr.", name: "Bilal ÜSTÜNDAĞ" },
  { title: "Prof. Dr.", name: "Saadettin TONBUL" },
  { title: "", name: "Nazif BİLGİNOĞLU" },
  { title: "", name: "Turgut TUNÇ" },
  { title: "", name: "Recep POLATCAN" },
  { title: "", name: "Mahmut Şakir COŞKUN" },
  { title: "", name: "Bahaddin GÜL" },
  { title: "", name: "Salim GÜR" },
  { title: "Prof. Dr.", name: "Mehmet ERDEM" },
  { title: "Prof. Dr.", name: "İskender OYMAK" },
  { title: "Prof. Dr.", name: "Ramazan IŞIK" },
  { title: "Doç. Dr.", name: "Mehmet ÖZTÜRK" },
  { title: "Doç. Dr.", name: "Hüsamettin KARATAŞ" },
  { title: "Doç. Dr.", name: "Abdurrahman GÜNEŞ" },
  { title: "Dr. Öğr. Üyesi", name: "Erdoğan SARITEPE" },
  { title: "Dr. Öğr. Üyesi", name: "Sait BOSAT" },
  { title: "Dr. Öğr. Üyesi", name: "Ayşe MEYDANOĞLU" },
  { title: "Dr. Öğr. Üyesi", name: "Rahime ÇELİK" },
  { title: "Dr. Öğr. Üyesi", name: "Zühal DAĞ" },
  { title: "Dr. Öğr. Üyesi", name: "Zeynep ALİMOĞLU SÜRMELİ" },
  { title: "Dr. Öğr. Üyesi", name: "Nizamettin ÇELİK" },
  { title: "Dr. Öğr. Üyesi", name: "Mustafa TAŞ" },
  { title: "Dr.", name: "Mustafa KİZİRGİL" },
  { title: "", name: "Veysel BULUT" },
  { title: "", name: "Osman TAYLAN" },
  { title: "", name: "İbrahim TAŞPINAR" },
  { title: "", name: "Nebi GEREK" },
  { title: "", name: "Ahmet KARAMAN" },
  { title: "Arş. Gör.", name: "Mesut ŞEN" },
  { title: "", name: "Nihat ASLAN" },
  { title: "Dr. Öğrt. Üyesi", name: "Veysel ALTUN" },
  { title: "Dr. Öğrt. Üyesi", name: "Selahattin POLATOĞLU" },
  { title: "Öğrt. Gör.", name: "Tahir KARAMAN" },
  { title: "Araş. Gör.", name: "Ramazan ERTEN" },
  { title: "", name: "Ömer Zülfü GÜRAKAR" },
  { title: "", name: "Erkan COŞKUN" },
  { title: "Doç. Dr.", name: "Nesrişah SAYLAN" },
  { title: "Dr. Öğrt. Üyesi", name: "Muzaffer ÖZLİ" },
  { title: "Dr. Öğrt. Üyesi", name: "Ayşenur Fidan KARATEKE" },
  { title: "Dr. Arş. Gör.", name: "İzzettin Sait GÜNERİ" },
  { title: "Arş. Gör.", name: "Ali Murtaza SAĞLAM" },
  { title: "", name: "Cihat ASLAN" },
  { title: "", name: "Samet CANPOLAT" },
  { title: "", name: "Ekrem Cengiz AKDENİZ" },
  { title: "", name: "Serdar TUNÇ" },
  { title: "", name: "Cabir KARATAŞ" },
  { title: "", name: "Ramazan TOLAN" },
];

export default function MutevelliHeyetiPage() {
  return (
    <>
      {/* Top Blue/Dark Header Area */}
      <section className="bg-slate-900 text-white py-12 md:py-16 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight flex items-center justify-center md:justify-start gap-4">
              <Landmark className="w-10 h-10 text-indigo-400" />
              Vakıf Mütevelli Heyeti
            </h1>
            <p className="mt-4 text-slate-400 text-lg">
              Bilimsel yöntemlerle hareket eden, gönüllülük esasına dayalı toplum hareketimizin kurucu ve yönlendirici kadrosu.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="bg-slate-50 dark:bg-background py-16 min-h-[50vh]">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Mission Statement Callout Box */}
          <div className="mb-16 bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-10 shadow-sm border-l-4 border-l-indigo-500 border-y border-r border-y-slate-200 border-r-slate-200 dark:border-y-slate-800 dark:border-r-slate-800 relative overflow-hidden">
            {/* Decorative background icon */}
            <Info className="absolute -right-8 -bottom-8 w-48 h-48 text-slate-50 dark:text-slate-800/50 pointer-events-none" />
            
            <div className="relative z-10 max-w-4xl">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                Heyetin Yapısı ve Vizyonu
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                Vakfımızın mütevelli heyeti Fırat Üniversitesi İlahiyat Fakültesi'nin ve Fırat Üniversitesinin bazı öğretim elemanları ile şehrimizin çeşitli kıymetlerinden müteşekkil olup yaklaşık 30 kişilik bir heyet ile zaman zaman toplanıp vakfın hizmetlerini görüşmektedirler. Vakıf herhangi bir cemaat, tarikat, stk gibi oluşumlara angaje olmadan bilimsel yöntemlerle hareket eden, gönüllülük esasına dayalı bir toplum hareketidir. Mütevelli heyeti öğretim elemanları ve halkımızdan gönüllü olarak katılım sağlamak isteyen herkese açıktır.
              </p>
            </div>
          </div>

          {/* Compact 4-Column Avatar Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            
            {trusteesBoard.map((member, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 dark:border-slate-800 flex items-center space-x-4 group"
              >
                {/* Circular Avatar / Image Slot */}
                <div className="relative w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 overflow-hidden border border-slate-200 dark:border-slate-700">
                  <User className="w-6 h-6 text-slate-400 group-hover:text-indigo-600 transition-colors duration-300" />
                  
                  {/* REAL IMAGE SETUP: Uncomment and use this when you have photos!
                  <Image 
                    src={`/team/mutevelli-${index}.jpg`} 
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  */}
                </div>

                {/* Member Info */}
                <div>
                  {/* Only render the title if it exists */}
                  {member.title && (
                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-0.5 tracking-wide">
                      {member.title}
                    </p>
                  )}
                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                    {member.name}
                  </h3>
                </div>
              </div>
            ))}

          </div>

        </div>
      </section>
    </>
  );
}