import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['tr', 'en'],
 
  // Used when no locale matches (e.g., user just types the root domain)
  defaultLocale: 'tr',

  // 'as-needed' means the URL will be /hakkimizda for Turkish (cleaner)
  // and /en/about for English.
  localePrefix: 'always' 
});
 
export const config = {
  // This matcher tells Next.js exactly which routes the middleware should run on.
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`, `logo.png`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
    
    // However, match all pathnames within `/tr` or `/en`, even if they have a dot
    '/(tr|en)/:path*'
  ]
};