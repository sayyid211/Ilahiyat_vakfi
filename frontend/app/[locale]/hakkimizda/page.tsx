import { useTranslations } from 'next-intl';
import { 
  Target, 
  GraduationCap, 
  BookOpen, 
  HeartHandshake, 
  Building2, 
  Home, 
  MonitorPlay, 
  Briefcase 
} from 'lucide-react';

// DATA STRUCTURE: Moving the activities into an array keeps your JSX perfectly clean
const activities = [
  {
    icon: <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
    title: "Eğitim ve Akademik Destek",
    text: "Öğrencilere burs vermek; öğretim elemanlarına ilmî çalışmalarında yardımcı olmak; kurslar, geziler ve ilmî toplantılar düzenlemek; öğrencilere ve halka açık ücretsiz eğitimler tertiplemek."
  },
  {
    icon: <BookOpen className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
    title: "İlmi ve Kültürel Neşriyat",
    text: "Dinî, ilmî, millî ve edebî eserlerin hazırlanmasını teşvik etmek; yarışmalar açmak, araştırmalar yaptırmak ve kitap satış/teşhir yerleri açarak faydalı neşriyatı uygun fiyatla topluma ulaştırmak."
  },
  {
    icon: <HeartHandshake className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
    title: "Sosyal Yardımlaşma",
    text: "Şartlı ve şartsız bağışları kabul etmek; fitre ve zekâtları ayrı bir hesapta toplayarak doğrudan ihtiyaç sahiplerine ulaştırmak; fakir, muhtaç ve hasta vatandaşların tedavilerine destek olmak."
  },
  {
    icon: <Building2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
    title: "Toplumsal Öncülük ve Tesisleşme",
    text: "Üniversite ve halk iş birliği ile topluma öncülük etmek; projeli araştırmalar yapmak; dinî, sosyal, sportif ve sağlık tesislerini projelendirmek, inşa etmek ve onarmak."
  },
  {
    icon: <Home className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
    title: "Barınma ve Ulaşım",
    text: "Öğrencilerin barınma, sosyal ve kültürel ihtiyaçlarını karşılamak amacıyla yurtlar inşa etmek; kampüs dışında ikamet eden öğrencilerin ulaşım giderlerine katkıda bulunmak."
  },
  {
    icon: <MonitorPlay className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
    title: "Medya ve Yayıncılık",
    text: "Öğretim üyeleri ve ehil kişiler tarafından hazırlanan ders kitaplarını, sosyal ve kültürel içerikli yazılı, sesli, görüntülü yayınları Türkçe veya yabancı dillerde yayımlamak."
  },
  {
    icon: <Briefcase className="w-6 h-6 text-slate-600 dark:text-slate-400" />,
    title: "İktisadi İşletmeler",
    text: "Vakfın gayesine uygun, sürdürülebilir gelir getirici ticari işletmeler kurmak ve yönetmek."
  }
];

export default function HakkimizdaPage() {
  // const t = useTranslations('SomeDictionarySection');

  return (
    <>
      {/* 1. PAGE HEADER */}
      <section className="bg-slate-900 text-white py-12 md:py-16 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
              Hakkımızda
            </h1>
            <p className="mt-4 text-slate-400 text-lg">
              Vakfımızın misyonu, vizyonu ve kuruluş gayesi.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT AREA */}
      <section className="bg-slate-50 dark:bg-background py-16 min-h-[50vh]">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* VAKFIN GAYESİ (Mission Statement Highlight Box) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-800 mb-16 relative overflow-hidden">
            {/* Decorative Background Icon */}
            <Target className="absolute -right-10 -bottom-10 w-64 h-64 text-slate-50 dark:text-slate-800/50 pointer-events-none" />
            
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 font-serif">
                <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                Vakfın Gayesi
              </h2>
              <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                İslamî ilimlerin gerçek anlamda ve bütün yönleriyle öğrenilmesi ve öğretilmesi ile toplumun din konusunda aydınlatılmasını hedefleyen vakfımız; başta Elâzığ'ımız olmak üzere Türkiye'mizdeki ilahiyat fakültelerinin her türlü eğitim-öğretim ihtiyaçlarında yanlarında olmak, üniversiteler ve fakülteler arası bilimsel inceleme, çalışma ve araştırma yapılmasına katkı sağlamak, bilgi ve teknoloji üretilmesine ve bunların yayılmasına destek olmak, bina ve tesisler inşa etmek, onarmak, tefriş etmek, ilahiyat fakültelerinin ulusal ve uluslararası alanlarda kalkınmalarına öncülük etmek, global çapta din hizmetleri ve öğretimi sunmak, öğretim elemanları ile öğrencilerin barınma, eğitim, malî, sosyal, kültürel, gezi ve sağlık sorunlarının çözümüne katkı sağlamak gibi hedeflerle kurulmuştur.
              </p>
            </div>
          </div>

          {/* VAKFIN FAALİYET ALANLARI (Bento Grid) */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center font-serif">
              Faaliyet Alanlarımız
            </h2>
            
            {/* CSS Grid handles all the spacing perfectly - no <br> tags needed! */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((activity, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 dark:border-slate-800 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {activity.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {activity.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    {activity.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}