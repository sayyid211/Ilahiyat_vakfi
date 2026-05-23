"use client";

import { useState } from "react";
import { Building2, CreditCard, AlertCircle, Copy, Check, Landmark, User } from "lucide-react";

export default function BagisPage() {
  const [copied, setCopied] = useState(false);
  const iban = "TR39 0021 0000 0006 0451 5000 01";

  // Function to handle the copy-to-clipboard action
  const handleCopy = () => {
    navigator.clipboard.writeText(iban);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset the checkmark after 2 seconds
  };

  return (
    <>
      {/* Top Blue/Dark Header Area */}
      <section className="bg-slate-900 text-white py-12 md:py-16 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
              BAĞIŞ
            </h1>
            <p className="mt-4 text-slate-400 text-lg">
              Bağışlarınız için aşağıda yer alan banka hesap numaralarımızı kullanabilirsiniz.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="bg-slate-50 dark:bg-background py-16 min-h-[50vh]">
        <div className="container mx-auto px-4 max-w-3xl">
          
          {/* Main Donation Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            
            {/* Card Header */}
            <div className="bg-blue-50 dark:bg-slate-800/50 p-6 border-b border-slate-100 dark:border-slate-800 flex items-center space-x-3">
              <Landmark className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
                Banka Hesap Bilgileri
              </h2>
            </div>

            {/* Account Details */}
            <div className="p-6 md:p-8 space-y-6">
              
              {/* Account Name */}
              <div className="flex items-start space-x-4">
                <User className="w-5 h-5 text-slate-400 mt-1 shrink-0" />
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Alıcı Adı / Unvanı</p>
                  <p className="text-lg font-medium text-slate-900 dark:text-white">
                    ELAZIĞ İLAHİYAT VE HARPUT İLİM VAKFI
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800" />

              {/* Bank Branch & Account Number Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <Building2 className="w-5 h-5 text-slate-400 mt-1 shrink-0" />
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Banka ve Şube</p>
                    <p className="text-slate-900 dark:text-white font-medium">Vakıf Katılım Bankası</p>
                    <p className="text-slate-600 dark:text-slate-300">Elazığ Şubesi</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CreditCard className="w-5 h-5 text-slate-400 mt-1 shrink-0" />
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Hesap No</p>
                    <p className="text-slate-900 dark:text-white font-medium text-lg tracking-wide">604515</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800" />

              {/* IBAN Section with Interactive Copy Button */}
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-2">İBAN Numarası</p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="flex-grow bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-sm md:text-base text-slate-800 dark:text-slate-200 tracking-wider">
                    {iban}
                  </div>
                  <button
                    onClick={handleCopy}
                    className={`flex items-center justify-center space-x-2 px-6 py-4 rounded-xl font-medium transition-all duration-300 ${
                      copied 
                        ? "bg-green-100 text-green-700 border border-green-200" 
                        : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>Kopyalandı</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        <span>Kopyala</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* STATE OF THE ART: Zakat Emphasis Alert Box */}
          <div className="mt-8 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 md:p-8 flex items-start space-x-4 shadow-sm">
            <AlertCircle className="w-8 h-8 text-amber-600 dark:text-amber-500 shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-amber-800 dark:text-amber-400 mb-2 tracking-wide uppercase">
                Önemli!
              </h3>
              <p className="text-amber-900/80 dark:text-amber-200/80 leading-relaxed">
                Zekat ve fitre bağışlarınız olursa açıklama kısmında mutlaka belirtiniz ki vakfın diğer hizmetlerine karıştırmadan doğrudan ihtiyaç sahiplerine zekat ve fitre temliki olarak ulaştıralım.
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}