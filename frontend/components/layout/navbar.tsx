"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, Menu, X } from "lucide-react";

export function Navbar() {
  // State to manage the mobile menu open/close action
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-2 z-50">
          <Image src="/amblem.png" alt="Logo" width={40} height={40} />
          <span className="text-xl font-bold text-slate-900 dark:text-white">
            Elaziğ İlahiyat ve Harput İlim Vakfı
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/anasayfa"
                    // Removed bg-accent hovers, added hover:text-blue-600
                    className="group inline-flex h-10 w-max items-center justify-center bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-blue-600 focus:text-blue-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    Anasayfa
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                {/* Overriding the default Shadcn trigger background styles to keep it transparent and change text color */}
                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent hover:text-blue-600 data-[state=open]:bg-transparent data-[active]:bg-transparent focus:bg-transparent">
                  Kurumsal
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="relative flex h-full w-full select-none flex-col justify-end rounded-md bg-slate-100 p-6 no-underline outline-none focus:shadow-md dark:bg-slate-800 transition-colors hover:text-blue-600 overflow-hidden group"
                      href="/hakkimizda"
                    >
                      {/* Translucent Logo Background */}
                      <div className="absolute inset-0 bg-[url('/amblem.png')] bg-center bg-no-repeat bg-[length:120px] opacity-10 transition-transform duration-500 group-hover:scale-110 pointer-events-none" />
                      
                      {/* Text Content (Z-10 ensures it stays clearly above the logo) */}
                      <div className="relative z-10">
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Hakkımızda
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Vakfımızın misyonu, vizyonu ve kuruluş gayesi.
                        </p>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
                    <ListItem href="/yonetim-kurulu" title="Yönetim Kurulu">
                      Vakfımızın yönetim kadrosu.
                    </ListItem>
                    <ListItem href="/mutevelli-heyeti" title="Mütevelli Heyeti">
                      Vakfımızın yönetim kadrosu.
                    </ListItem>
                    <ListItem href="/istisare-heyeti" title="İSTİŞARE HEYETİ">
                      Vakfımızın yönetim kadrosu.
                    </ListItem>
                    <ListItem href="/tarihcesi" title="TARİHÇESİ">
                      Vakfımızın yönetim kadrosu.
                    </ListItem>
                    <ListItem href="/dua-ve-bedduasi" title="DUA VE BEDDUASI">
                      Vakfımızın yönetim kadrosu.
                    </ListItem>
                    <ListItem href="/ilim-ve-kultur-evi" title="İLİM VE KÜLTÜR EVİMİZ">
                      Vakfımızın yönetim kadrosu.
                    </ListItem>
                    <ListItem href="/bagis" title="BAĞIŞ">
                      Vakfımızın yönetim kadrosu.
                    </ListItem>
                    <ListItem href="/iletisim" title="İletişim">
                      Bize ulaşın.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/etkinlikler"
                    className="group inline-flex h-10 w-max items-center justify-center bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-blue-600 focus:text-blue-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    Etkinlikler
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/haberler"
                    className="group inline-flex h-10 w-max items-center justify-center bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-blue-600 focus:text-blue-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    Haberler
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="https://elazigasevi.org/"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group inline-flex h-10 w-max items-center justify-center bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-blue-600 focus:text-blue-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    Aşevimiz
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/yurt"
                    className="group inline-flex h-10 w-max items-center justify-center bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-blue-600 focus:text-blue-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    Yurdumuz
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Section: Language Switcher & Mobile Menu Toggle */}
        <div className="flex items-center space-x-4 z-50">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:text-blue-600 hover:bg-transparent">
                <Globe className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Toggle language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="hover:text-blue-600 focus:text-blue-600 focus:bg-transparent cursor-pointer">Türkçe</DropdownMenuItem>
              <DropdownMenuItem className="hover:text-blue-600 focus:text-blue-600 focus:bg-transparent cursor-pointer">English</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button - toggles the state */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden hover:text-blue-600 hover:bg-transparent"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b shadow-lg py-4 px-4 flex flex-col space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <Link href="/anasayfa" className="text-sm font-medium transition-colors hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
            Anasayfa
          </Link>
          
          <div className="flex flex-col space-y-2">
            <span className="text-sm font-bold text-slate-900 dark:text-white border-b pb-1">Kurumsal</span>
            <Link href="/hakkimizda" className="text-sm text-muted-foreground pl-2 transition-colors hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Hakkımızda</Link>
            <Link href="/yonetim-kurulu" className="text-sm text-muted-foreground pl-2 transition-colors hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Yönetim Kurulu</Link>
            <Link href="/mutevelli-heyeti" className="text-sm text-muted-foreground pl-2 transition-colors hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Mütevelli Heyeti</Link>
            <Link href="/istisare-heyeti" className="text-sm text-muted-foreground pl-2 transition-colors hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>İstişare Heyeti</Link>
            <Link href="/tarihcesi" className="text-sm text-muted-foreground pl-2 transition-colors hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Tarihçesi</Link>
            <Link href="/dua-ve-bedduasi" className="text-sm text-muted-foreground pl-2 transition-colors hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Dua ve Bedduası</Link>
            <Link href="/ilim-ve-kultur-evi" className="text-sm text-muted-foreground pl-2 transition-colors hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>İlim ve Kültür Evimiz</Link>
            <Link href="/bagis" className="text-sm text-muted-foreground pl-2 transition-colors hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Bağış</Link>
            <Link href="/iletisim" className="text-sm text-muted-foreground pl-2 transition-colors hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>İletişim</Link>
          </div>

          <Link href="/etkinlikler" className="text-sm font-medium transition-colors hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
            Etkinlikler
          </Link>
          <Link href="/haberler" className="text-sm font-medium transition-colors hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
            Haberler
          </Link>
          <Link href="https://elazigasevi.org/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium transition-colors hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
            Aşevimiz
          </Link>
          <Link href="/yurt" className="text-sm font-medium transition-colors hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
            Yurdumuz
          </Link>
        </div>
      )}
    </header>
  );
}

// Helper component for the navigation menu dropdown
function ListItem({ className, title, children, href, ...props }: any) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          // Replaced hover:bg-accent with hover:text-blue-600
          className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:text-blue-600 focus:text-blue-600 ${className}`}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}