"use client";

import React from "react";
import Link from "next/link";
import { 
  Shield, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  CheckCircle2, 
  FileText, 
  Lock, 
  UserCheck 
} from "lucide-react";

export default function KvkkPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-100 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 mb-6">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Kişisel Verilerin Korunması ve Aydınlatma Metni
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
            Elazığ İlahiyat ve Harput İlim Vakfı
          </p>
        </div>

        {/* Content Wrapper */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 sm:p-10 lg:p-12 space-y-12 text-slate-700 dark:text-slate-300 leading-relaxed">
          
          {/* 1. Veri Sorumlusu (Styled as a distinct card) */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="text-teal-600 dark:text-teal-500">1.</span> Veri Sorumlusu
            </h2>
            <p className="mb-6">
              6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında, kişisel verilerinizin işlenmesi bakımından veri sorumlusu vakfımız olarak belirlenmiştir. İşbu Aydınlatma Metni, vakfımız tarafından gerçekleştirilen kişisel veri işleme faaliyetleri hakkında ilgili kişileri bilgilendirmek amacıyla hazırlanmıştır.
            </p>
            <div className="bg-slate-50 dark:bg-slate-950/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800/60 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-600 dark:text-teal-500 mt-0.5 shrink-0" />
                <div>
                  <strong className="block text-slate-900 dark:text-white text-sm mb-1">Adres</strong>
                  <span className="text-sm">Nailbey Mahallesi General Hakkı Talay Caddesi No:48/1 Elazığ/Merkez</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-teal-600 dark:text-teal-500 mt-0.5 shrink-0" />
                <div>
                  <strong className="block text-slate-900 dark:text-white text-sm mb-1">Telefon</strong>
                  <span className="text-sm">0530 241 21 23</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-teal-600 dark:text-teal-500 mt-0.5 shrink-0" />
                <div>
                  <strong className="block text-slate-900 dark:text-white text-sm mb-1">E-posta</strong>
                  <a href="mailto:ilahiyatharputilimvakfi@gmail.com" className="text-sm text-teal-600 dark:text-teal-400 hover:underline">ilahiyatharputilimvakfi@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-teal-600 dark:text-teal-500 mt-0.5 shrink-0" />
                <div>
                  <strong className="block text-slate-900 dark:text-white text-sm mb-1">Web Sitesi</strong>
                  <a href="https://elazigilahiyatveharputilimvakfi.org/tr" target="_blank" rel="noopener noreferrer" className="text-sm text-teal-600 dark:text-teal-400 hover:underline">elazigilahiyatveharputilimvakfi.org/tr</a>
                </div>
              </div>
            </div>
          </section>

          {/* 2. İşlenme Amaçları */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-teal-600 dark:text-teal-500">2.</span> Kişisel Verilerin İşlenmesinin Amaçları
            </h2>
            <p className="mb-4">
              Vakfımız tarafından elde edilen kişisel veriler, 6698 sayılı KVKK ve ilgili mevzuata uygun olarak ve gerekli olduğu ölçüde aşağıdaki amaçlarla işlenebilmektedir:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
              {[
                "Vakıf faaliyetlerinin yürütülmesi",
                "Vakıf ile iletişimin sağlanması",
                "İletişim ve bilgi taleplerinin cevaplandırılması",
                "Bağış ve yardım faaliyetlerinin yürütülmesi",
                "Burs, yardım ve destek programlarının yürütülmesi",
                "Öğrenci yurdu faaliyetlerinin yürütülmesi",
                "Yurt başvuru ve kayıt işlemlerinin gerçekleştirilmesi",
                "Eğitim, kurs, seminer, konferans, kültürel ve sosyal faaliyetlerin planlanması ve yürütülmesi",
                "Etkinlik ve program başvurularının alınması",
                "Sosyal yardım ve dayanışma faaliyetlerinin yürütülmesi",
                "Başvuru, talep, öneri ve şikâyetlerin değerlendirilmesi",
                "Mevzuattan kaynaklanan yükümlülüklerin yerine getirilmesi",
                "Mali ve idari işlemlerin yürütülmesi",
                "Hukuki iş ve işlemlerin takip edilmesi",
                "Bilgi güvenliği ve internet sitesi güvenliğinin sağlanması",
                "Tanıtım ve kamuoyunun bilgilendirilmesi",
                "Yetkili kişi, kurum ve kuruluşlardan gelen taleplerin karşılanması",
                "Yasal ve idari yükümlülüklerin yerine getirilmesi"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm font-medium">Kişisel verileriniz, yukarıda belirtilen amaçlarla bağlantılı, sınırlı ve ölçülü olarak işlenmektedir.</p>
          </section>

          <hr className="border-slate-100 dark:border-slate-800" />

          {/* 3 & 4. İşlenen Veriler ve Toplanma Yöntemi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-teal-600 dark:text-teal-500">3.</span> İşlenen Kişisel Veriler
              </h2>
              <p className="mb-4 text-sm">Vakfımızın faaliyetleri kapsamında aşağıdaki veri kategorileri işlenebilmektedir:</p>
              <ul className="space-y-2 text-sm">
                <li>• Kimlik bilgileri (ad, soyad, T.C. kimlik numarası vb.)</li>
                <li>• İletişim bilgileri (telefon, e-posta, adres vb.)</li>
                <li>• Öğrenci ve eğitim bilgileri</li>
                <li>• Yurt başvuru ve kayıt bilgileri</li>
                <li>• Aile ve yakınlık bilgileri</li>
                <li>• Finansal bilgiler</li>
                <li>• Başvuru ve talep bilgileri</li>
                <li>• Vakıf faaliyetlerine ilişkin bilgiler</li>
                <li>• Fotoğraf ve video kayıtları</li>
                <li>• İnternet sitesi teknik bilgileri ve işlem güvenliği</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-teal-600 dark:text-teal-500">4.</span> Toplanma Yöntemi
              </h2>
              <p className="mb-4 text-sm">Kişisel verileriniz sözlü, yazılı veya elektronik yöntemlerle şu kanallardan toplanabilmektedir:</p>
              <ul className="space-y-2 text-sm">
                <li>• İnternet sitemiz ve üzerindeki formlar</li>
                <li>• Fiziki başvuru ve kayıt formları</li>
                <li>• Telefon ve e-posta</li>
                <li>• Sosyal medya iletişim kanalları</li>
                <li>• Başvuru, kayıt ve etkinlik süreçleri</li>
                <li>• Doğrudan yapılan başvurular</li>
                <li>• Kanunen yetkili kişi, kurum ve kuruluşlar</li>
              </ul>
            </section>
          </div>

          <hr className="border-slate-100 dark:border-slate-800" />

          {/* 5. Hukuki Sebepler */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-teal-600 dark:text-teal-500">5.</span> İşlenmenin Hukuki Sebepleri
            </h2>
            <p className="mb-4">Kişisel verileriniz, somut işlemin niteliğine göre aşağıdaki hukuki sebeplere dayanılarak işlenmektedir:</p>
            <div className="bg-slate-50 dark:bg-slate-950/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800/60">
              <ul className="space-y-3 text-sm">
                <li className="flex gap-3"><FileText className="w-5 h-5 text-slate-400 shrink-0" /> Kanunlarda açıkça öngörülmesi.</li>
                <li className="flex gap-3"><FileText className="w-5 h-5 text-slate-400 shrink-0" /> Hukuki yükümlülüğün yerine getirilmesi.</li>
                <li className="flex gap-3"><FileText className="w-5 h-5 text-slate-400 shrink-0" /> Bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması.</li>
                <li className="flex gap-3"><FileText className="w-5 h-5 text-slate-400 shrink-0" /> Bir hakkın tesisi, kullanılması veya korunması için zorunlu olması.</li>
                <li className="flex gap-3"><FileText className="w-5 h-5 text-slate-400 shrink-0" /> İlgili kişinin kendisi tarafından alenileştirilmiş olması.</li>
                <li className="flex gap-3"><FileText className="w-5 h-5 text-slate-400 shrink-0" /> İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla vakfımızın meşru menfaatleri için veri işlenmesinin zorunlu olması.</li>
                <li className="flex gap-3"><FileText className="w-5 h-5 text-slate-400 shrink-0" /> Gerekli olduğu durumlarda ilgili kişinin açık rızasının bulunması.</li>
              </ul>
            </div>
            <p className="mt-4 text-sm font-medium">Özel nitelikli kişisel veriler bakımından KVKK'nın 6. maddesinde belirtilen şartlara uygun hareket edilmektedir.</p>
          </section>

          {/* Additional Sections (6-12) Text Blocks */}
          <div className="space-y-10">
            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">6. Kişisel Verilerin Aktarılması</h2>
              <p>Kişisel verileriniz, KVKK'nın 8. ve 9. maddeleri çerçevesinde; yetkili kamu kurum ve kuruluşlarına, hukuki/mali danışmanlara ve vakfın faaliyetlerinin yürütülmesi için hizmet alınan gerçek/tüzel kişilere aktarılabilmektedir. Hukuki bir zorunluluk bulunmadıkça üçüncü kişilerle paylaşılmaz.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">7. İnternet Sitesinde Kişisel Verilerin İşlenmesi ve Çerezler</h2>
              <p>Sitemizi ziyaretiniz sırasında teknik veriler işlenebilmektedir. Açık rıza gerektiren çerezler bakımından ilgili mekanizmalar uygulanır. Ayrıntılı bilgiler ayrıca <Link href="/tr/cerez-politikasi" className="text-teal-600 dark:text-teal-400 hover:underline">Çerez Politikası</Link> içerisinde açıklanacaktır.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">8. İletişim ve Başvuru Formları</h2>
              <p>İnternet sitemizdeki formlar aracılığıyla iletilen bilgiler (ad, telefon, e-posta, mesaj içeriği) talebinizin değerlendirilmesi ve cevaplandırılması amacıyla işlenmektedir. Açık rıza gerektiren durumlarda ayrıca rıza alınmaktadır.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">9. Fotoğraf ve Video Kayıtları</h2>
              <p>Eğitim, kültür ve sosyal faaliyetlerimizde fotoğraf/video çekimleri yapılabilmektedir. Bu kayıtların tanıtım materyallerinde kullanılması durumunda KVKK kapsamında gerekli aydınlatma yapılmakta ve gerektiğinde açık rıza alınmaktadır.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">10. Öğrenci Yurdu ve Eğitim Faaliyetleri</h2>
              <p>Yurt, eğitim ve kurs kayıtları kapsamında alınan veriler; başvuru süreçlerinin yürütülmesi, iletişim sağlanması, yasal yükümlülüklerin yerine getirilmesi ve güvenlik süreçleri amacıyla işlenmektedir.</p>
            </section>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="bg-slate-50 dark:bg-slate-950/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2"><FileText className="w-5 h-5 text-teal-600" /> 11. Saklanma Süresi</h2>
                <p className="text-sm">İşlenmelerini gerektiren amaç için gerekli süre boyunca muhafaza edilir. Sebep ortadan kalktığında veriler silinir, yok edilir veya anonim hâle getirilir.</p>
              </section>
              <section className="bg-slate-50 dark:bg-slate-950/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2"><Lock className="w-5 h-5 text-teal-600" /> 12. Veri Güvenliği</h2>
                <p className="text-sm">Hukuka aykırı erişimi önlemek için yetki kontrolleri, erişim sınırlandırması, şifreleme ve fiziki/elektronik güvenlik tedbirleri uygulanmaktadır.</p>
              </section>
            </div>
          </div>

          <hr className="border-slate-100 dark:border-slate-800" />

          {/* 13. İlgili Kişinin Hakları */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-teal-600 dark:text-teal-500">13.</span> İlgili Kişinin Hakları (Madde 11)
            </h2>
            <p className="mb-4">KVKK'nın 11. maddesi kapsamında kişisel verileri işlenen kişilerin hakları şunlardır:</p>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2"><UserCheck className="w-5 h-5 text-teal-500 shrink-0" /> Verilerinin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme.</li>
              <li className="flex gap-2"><UserCheck className="w-5 h-5 text-teal-500 shrink-0" /> İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme.</li>
              <li className="flex gap-2"><UserCheck className="w-5 h-5 text-teal-500 shrink-0" /> Yurt içi/yurt dışında aktarıldığı üçüncü kişileri bilme.</li>
              <li className="flex gap-2"><UserCheck className="w-5 h-5 text-teal-500 shrink-0" /> Eksik veya yanlış işlenmişse düzeltilmesini isteme.</li>
              <li className="flex gap-2"><UserCheck className="w-5 h-5 text-teal-500 shrink-0" /> KVKK şartları çerçevesinde silinmesini veya yok edilmesini isteme.</li>
              <li className="flex gap-2"><UserCheck className="w-5 h-5 text-teal-500 shrink-0" /> Yapılan düzeltme/silme işlemlerinin üçüncü kişilere bildirilmesini isteme.</li>
              <li className="flex gap-2"><UserCheck className="w-5 h-5 text-teal-500 shrink-0" /> Otomatik sistemler aracılığıyla aleyhine bir sonuç çıkmasına itiraz etme.</li>
              <li className="flex gap-2"><UserCheck className="w-5 h-5 text-teal-500 shrink-0" /> Kanuna aykırı işlenme sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme.</li>
            </ul>
          </section>

          {/* 14 & 15. Başvuru ve Yürürlük */}
          <div className="bg-teal-50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-900/30 rounded-2xl p-6 md:p-8">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">14. Başvuru ve 15. Yürürlük</h2>
            <p className="mb-4 text-sm">
              KVKK kapsamındaki haklarınızı kullanmak amacıyla başvurunuzu <strong>ilahiyatharputilimvakfi@gmail.com</strong> adresine e-posta yoluyla veya <strong>Nailbey Mah. General Hakkı Talay Cad. No:48/1 Elazığ/Merkez</strong> adresine yazılı olarak iletebilirsiniz. Başvurunuzda kimliğinizi tespit edici bilgi/belgelerin bulunması gerekebilir.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              İşbu Aydınlatma Metni <strong>20.09.2026</strong> tarihinde yürürlüğe girmiştir. Vakfımız gerekli durumlarda bu metni güncelleme hakkını saklı tutar.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}