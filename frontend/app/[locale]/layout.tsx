import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css"; 

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

// 1. We import getLocale alongside getMessages
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "İlahiyat ve Harput İlim Vakfı",
  description: "İlim, İrfan ve Gelecek İçin Bir Köprü",
};

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  // 2. We completely removed 'params' from the TypeScript definition!
}>) {
  
  // 3. We magically fetch the locale directly from the server context
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.className} min-h-screen flex flex-col antialiased`}>
        <NextIntlClientProvider messages={messages}>
          
          <Navbar />
          
          <main className="flex-grow">
            {children}
          </main>

          <Footer />

        </NextIntlClientProvider>
      </body>
    </html>
  );
}