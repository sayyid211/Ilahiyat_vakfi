import { MapPin, Phone, Mail, User } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      {/* Top Blue/Dark Header Area (Matches your universal template) */}
      <section className="bg-slate-900 text-white py-12 md:py-16 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
              İLETİŞİM
            </h1>
            <p className="mt-4 text-slate-400 text-lg">
              Soru, görüş ve önerileriniz için bize ulaşabilirsiniz.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content and Cards */}
      <section className="bg-slate-50 dark:bg-background py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* 3-Column Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* CARD 1: ADDRESS (Teal) */}
            <div className="bg-teal-700 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow flex flex-col">
              <h2 className="text-2xl font-serif font-semibold mb-6 border-b border-teal-500/50 pb-4">
                Adres
              </h2>
              <div className="flex items-start space-x-4 flex-grow">
                <MapPin className="w-6 h-6 shrink-0 mt-1 text-teal-200" />
                <p className="text-teal-50 leading-relaxed">
                  Nail Bey Mah. General Hakkı Talay Cad. No: 48 
                  <br />Merkez/Elazığ 
                  <br /><span className="text-sm opacity-80">(Nail Bey Camii Bitişiği)</span>
                </p>
              </div>
              <div className="mt-8 pt-4">
                <a href="#harita" className="inline-flex items-center text-sm font-medium text-teal-100 hover:text-white transition-colors">
                  Aşağıdaki haritada gör →
                </a>
              </div>
            </div>

            {/* CARD 2: CONTACT INFO (Blue) */}
            <div className="bg-blue-700 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow flex flex-col">
              <h2 className="text-2xl font-serif font-semibold mb-6 border-b border-blue-500/50 pb-4">
                İletişim Bilgileri
              </h2>
              <ul className="space-y-6 flex-grow">
                <li className="flex items-center space-x-4">
                  <Phone className="w-5 h-5 shrink-0 text-blue-200" />
                  <a href="tel:+905302412123" className="text-blue-50 hover:text-white transition-colors">
                    +90 530 302 41 21 23
                  </a>
                </li>
                <li className="flex items-center space-x-4">
                  <User className="w-5 h-5 shrink-0 text-blue-200" />
                  <span className="text-blue-50">
                    Ramazan KARA <span className="text-sm opacity-80">(Yurt Müdürü)</span>
                  </span>
                </li>
                <li className="flex items-center space-x-4">
                  <Mail className="w-5 h-5 shrink-0 text-blue-200" />
                  <a href="mailto:bilgi@ilahiyatveharputilimvakfi.org" className="text-blue-50 hover:text-white transition-colors break-all">
                    bilgi@ilahiyatveharputilimvakfi.org
                  </a>
                </li>
              </ul>
            </div>

            {/* CARD 3: SOCIAL MEDIA (Maroon/Rose) */}
            <div className="bg-rose-900 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow flex flex-col">
              <h2 className="text-2xl font-serif font-semibold mb-6 border-b border-rose-700/50 pb-4">
                Sosyal Medya
              </h2>
              <p className="text-rose-100 mb-8">
                Vakfımızın güncel faaliyetlerini ve duyurularını sosyal medya hesaplarımızdan takip edebilirsiniz.
              </p>
              
              <div className="flex items-center space-x-6 mt-auto">
                {/* X (Twitter) Logo */}
                <Link href="#" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                  <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.961h-1.96z" />
                  </svg>
                </Link>

                {/* Instagram Logo */}
                <Link href="#" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                  <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </Link>

                {/* YouTube Logo */}
                <Link href="#" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                  <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </Link>
              </div>
            </div>

          </div>

          {/* MAP SECTION */}
          <div id="harita" className="mt-16 rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800">
            {/* Google Maps iFrame pointed generally at Elazığ */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3096.53323067828!2d39.215505076629986!3d38.67562096739345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4076c039ab6601b1%3A0xc66579fc2cb424f!2sNailbey%2C%2C%20General%20Hakk%C4%B1%20Talay%20Cd.%20No%3A54%2C%2023100%20El%C3%A2z%C4%B1%C4%9F%20Merkez%2FElaz%C4%B1%C4%9F!5e0!3m2!1sen!2str!4v1715815632488!5m2!1sen!2str" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full grayscale-[20%] contrast-[1.1] opacity-90 hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>

        </div>
      </section>
    </>
  );
}