import Link from "next/link";
import Image from "next/image";
// Import the social brand icons from React Icons (FontAwesome 6 set)
import { FaFacebook, FaInstagram, FaYoutube, FaXTwitter, FaLinkedin } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-slate-300 py-12 md:py-16 border-t border-slate-800">
      <div className="container mx-auto px-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/amblem.png" alt="Logo" width={50} height={50} className="brightness-0 invert" />
              <span className="text-2xl font-bold text-white tracking-tight">Elaziğ İlahiyat ve Harput İlim Vakfı</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs text-slate-400">
              İlahiyat ve Harput İlim Vakfı olarak Türkiye&apos;nin ve bölgenin ihtiyaç duyduğu alanlarda bilgi, politika ve strateji üretiyoruz.
            </p>
          </div>

          {/* Column 2: Kurumsal */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Kurumsal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/hakkimizda" className="hover:text-white transition-colors">Hakkımızda</Link></li>
              <li><Link href="/mutevelli-heyeti" className="hover:text-white transition-colors">Mütevelli Heyeti</Link></li>
              <li><Link href="/tarihcesi" className="hover:text-white transition-colors">Tarihçesi</Link></li>
              <li><Link href="/yonetim-kurulu" className="hover:text-white transition-colors">Yönetim Kurulu</Link></li>
              <li><Link href="/istisare-heyeti" className="hover:text-white transition-colors">İstişare Heyeti</Link></li>
              <li><Link href="/dua-ve-bedduasi" className="hover:text-white transition-colors">Dua Ve Bedduasi</Link></li>
              <li><Link href="/bagis" className="hover:text-white transition-colors">Bağiş</Link></li>
              <li><Link href="/iletisim" className="hover:text-white transition-colors">İletişim</Link></li>
            </ul>
          </div>

          {/* Column 3: Faaliyetler */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Faaliyetler</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/projeler" className="hover:text-white transition-colors">Projeler</Link></li>
              <li><Link href="/etkinlikler" className="hover:text-white transition-colors">Etkinlikler</Link></li>
              <li><Link href="/yayinlar" className="hover:text-white transition-colors">Yayınlar</Link></li>
              <li><Link href="/haberler" className="hover:text-white transition-colors">Haberler</Link></li>
            </ul>
          </div>

          {/* Column 4: Araştırma Merkezleri */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Merkezler</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/ilim-ve-kultur-evi" className="hover:text-white transition-colors">İLİM VE KÜLTÜR EVİMİZ</Link></li>
              <li><Link href="https://elazigasevi.org/" className="hover:text-white transition-colors">Elazığ Aşevi</Link></li>
              <li><Link href="/yurt" className="hover:text-white transition-colors">Yurdumuz</Link></li>
            </ul>
          </div>

          {/* Column 5: Diğer & Socials */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Diğer</h3>
            <ul className="space-y-3 text-sm mb-8">
              <li><Link href="/kvkk" className="hover:text-white transition-colors">Kişisel Verilerin Korunması</Link></li>
            </ul>

            <h3 className="text-white font-semibold mb-4 text-lg">Bizi Takip Edin</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><FaFacebook className="h-6 w-6" /></a>
              <a href="https://www.instagram.com/elazigharputilimvakfi/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><FaInstagram className="h-6 w-6" /></a>
              <a href="https://www.youtube.com/@ilahiyatvakfi23" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><FaYoutube className="h-6 w-6" /></a>
              {/* Note: I used the new X logo for Twitter here! */}
              <a href="https://x.com/harputilimvakfi" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><FaXTwitter className="h-6 w-6" /></a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><FaLinkedin className="h-6 w-6" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}