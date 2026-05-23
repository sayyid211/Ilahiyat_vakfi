import { useTranslations } from 'next-intl';

export default function InnerPageTemplate() {
  // If you want to use the dictionary, you can activate this:
  // const t = useTranslations('SomeDictionarySection');

  return (
    <>
      {/* 1. PAGE HEADER (The Blue Section)
        Notice the padding is smaller (py-12) than the homepage, 
        and the text is smaller (text-3xl md:text-4xl) to signify it's an inner page.
      */}
      <section className="bg-slate-900 text-white py-12 md:py-16 border-b border-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Sayfa Başlığı (Page Title)
            </h1>
            {/* Optional Subtitle or Breadcrumbs can go here */}
            <p className="mt-4 text-slate-400 text-lg">
              Kısa bir açıklama veya alt başlık buraya gelebilir.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT AREA (The White Section)
        min-h-[50vh] ensures the page is tall enough to push the footer 
        to the bottom even if there is no content yet.
      */}
      <section className="bg-white dark:bg-background py-12 md:py-16 min-h-[50vh]">
        <div className="container mx-auto px-4">
          
          <div className="max-w-4xl bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 p-8 md:p-12 text-center border-dashed">
            <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
              İçerik Hazırlanıyor
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Bu sayfanın tasarımı ve içerikleri daha sonra eklenecektir. Gelecekte buraya metinler, resimler, tablolar veya Strapi'den gelen dinamik veriler yerleştirilecek.
            </p>
          </div>

          {/* FUTURE COMPONENTS GO HERE:
            <TeamGrid />
            <ContactForm />
            <HistoryTimeline />
          */}

        </div>
      </section>
    </>
  );
}