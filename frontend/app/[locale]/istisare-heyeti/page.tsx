import { Users, Info, User } from "lucide-react";
// import Image from "next/image"; // Uncomment when adding real photos

// 1. DATA STRUCTURE: Separating title and name creates a cleaner UI!
const advisoryBoard = [
  { title: "Prof. Dr.", name: "İsmail Erdoğan" },
  { title: "Prof. Dr.", name: "Mehmet Erdem" },
  { title: "Prof. Dr.", name: "İskender Oymak" },
  { title: "Prof. Dr.", name: "Selim Özarslan" },
  { title: "Prof. Dr.", name: "İhsan Soysaldı" },
  { title: "Prof. Dr.", name: "Veysel Özdemir" },
  { title: "Prof. Dr.", name: "Ramazan Işık" },
  { title: "Prof. Dr.", name: "Enes Erdim" },
  { title: "Doç. Dr.", name: "Abdurrahman Güneş" },
  { title: "Doç. Dr.", name: "Enver Demirpolat" },
  { title: "Doç. Dr.", name: "Ayşe Meydanoğlu" },
  { title: "Doç. Dr.", name: "Hüsamettin Karataş" },
  { title: "Doç. Dr.", name: "Mehmet Öztürk" },
  { title: "Dr. Öğr. Üyesi", name: "Rahime Çelik" },
  { title: "Ar. Gör.", name: "Mesut Şen" },
  { title: "Ar. Gör.", name: "Ersin Akdağ" },
];

export default function IstisareHeyetiPage() {
  return (
    <>
      {/* Top Blue/Dark Header Area */}
      <section className="bg-slate-900 text-white py-12 md:py-16 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight flex items-center justify-center md:justify-start gap-4">
              <Users className="w-10 h-10 text-teal-400" />
              Vakıf İstişare Heyeti
            </h1>
            <p className="mt-4 text-slate-400 text-lg">
              Vakfımızın faaliyetlerine yön veren, akademik ve idari tecrübeye sahip danışma kurulumuz.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="bg-slate-50 dark:bg-background py-16 min-h-[50vh]">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Mission Statement Callout Box */}
          <div className="mb-16 bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-10 shadow-sm border-l-4 border-l-teal-500 border-y border-r border-y-slate-200 border-r-slate-200 dark:border-y-slate-800 dark:border-r-slate-800 relative overflow-hidden">
            {/* Decorative background icon */}
            <Info className="absolute -right-8 -bottom-8 w-48 h-48 text-slate-50 dark:text-slate-800/50 pointer-events-none" />
            
            <div className="relative z-10 max-w-4xl">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                Heyetin Amacı ve İşleyişi
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                Mütevelli heyetçe belirlenen genel politikalar ışığında, vakıf faaliyetlerinin düzenli ve verimli olarak yürütülmesini sağlayan, vakfın sorunları ve işleyişi hakkında acil karar alınması ve gerekli adımların atılması noktasında mevcut yönetim kurulu, mütevelli heyeti ve iktisadi işletme üyeleri arasından oluşan bir heyet tarafından sık sık istişare için toplanan bir kurulu temsil etmektedir.
              </p>
            </div>
          </div>

          {/* Compact 4-Column Avatar Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            
            {advisoryBoard.map((member, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 dark:border-slate-800 flex items-center space-x-4 group"
              >
                {/* Circular Avatar / Image Slot */}
                <div className="relative w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 overflow-hidden border border-slate-200 dark:border-slate-700">
                  <User className="w-6 h-6 text-slate-400 group-hover:text-teal-600 transition-colors duration-300" />
                  
                  {/* REAL IMAGE SETUP: Uncomment and use this when you have photos!
                  <Image 
                    src={`/team/istisare-${index}.jpg`} 
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  */}
                </div>

                {/* Member Info */}
                <div>
                  <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 mb-0.5 tracking-wide">
                    {member.title}
                  </p>
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