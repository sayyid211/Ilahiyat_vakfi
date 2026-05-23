import { User, Building, ShieldCheck } from "lucide-react";
// import Image from "next/image"; // Uncomment this when you add real photos

// 1. DATA STRUCTURE: This makes it easy to update members in the future!
const boardMembers = [
  {
    name: "Prof. Dr. Veysel Özdemir",
    role: "Yönetim Kurulu Başkanı",
    affiliation: "Fırat Üniversitesi İlahiyat Fakültesi Dekanı",
    badgeColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    // imageUrl: "/team/veysel-ozdemir.jpg" // Add paths here later
  },
  {
    name: "Prof. Dr. İskender Oymak",
    role: "Yönetim Kurulu Başkan Yrd.",
    affiliation: "Fırat Üniversitesi İlahiyat Fakültesi Öğretim Üyesi",
    badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    name: "Doç. Dr. Ayşe Meydanoğlu",
    role: "Yönetim Kurulu Başkan Yrd.",
    affiliation: "Fırat Üniversitesi İlahiyat Fakültesi Öğretim Üyesi",
    badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    name: "Nazif Bilginoğlu",
    role: "Üye",
    affiliation: "Elazığ Belediyesi Başkan Yrd.",
    badgeColor: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  },
  {
    name: "Doç. Dr. Mehmet Öztürk",
    role: "Üye",
    affiliation: "Fırat Üniversitesi İlahiyat Fakültesi Öğretim Üyesi",
    badgeColor: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  },
  {
    name: "Av. Ömer Budak",
    role: "Üye",
    affiliation: "Serbest Avukat", // Added a generic affiliation since none was provided
    badgeColor: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  },
];

export default function YonetimKuruluPage() {
  return (
    <>
      {/* Top Blue/Dark Header Area */}
      <section className="bg-slate-900 text-white py-12 md:py-16 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight flex items-center justify-center md:justify-start gap-4">
              <ShieldCheck className="w-10 h-10 text-blue-400" />
              Yönetim Kurulu
            </h1>
            <p className="mt-4 text-slate-400 text-lg">
              Vakfımızın vizyonunu ve misyonunu geleceğe taşıyan yönetim kadromuz.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="bg-slate-50 dark:bg-background py-16 min-h-[50vh]">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* 3-Column Grid for the Board Members */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {boardMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 overflow-hidden group flex flex-col"
              >
                {/* Image Area (Placeholder) */}
                <div className="relative h-64 bg-slate-200 dark:bg-slate-800 overflow-hidden flex items-center justify-center">
                  
                  {/* The icon placeholder (Remove this when adding real images) */}
                  <User className="w-20 h-20 text-slate-400 dark:text-slate-600 transition-transform duration-500 group-hover:scale-110" />
                  
                  {/* REAL IMAGE SETUP: Uncomment and use this when you have photos!
                  <Image 
                    src={member.imageUrl || "/team/placeholder.jpg"} 
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  */}
                </div>

                {/* Card Content Area */}
                <div className="p-6 md:p-8 flex flex-col flex-grow text-center items-center">
                  
                  {/* Dynamic Role Badge */}
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${member.badgeColor}`}>
                    {member.role}
                  </span>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {member.name}
                  </h3>

                  {/* Affiliation / Title */}
                  <div className="flex items-start justify-center gap-2 mt-auto text-slate-500 dark:text-slate-400 text-sm">
                    <Building className="w-4 h-4 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      {member.affiliation}
                    </p>
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>
      </section>
    </>
  );
}