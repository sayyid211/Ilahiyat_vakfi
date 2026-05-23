This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


Folder structure

frontend/
 ├── app/
 │    └── [locale]/                 # Core translation wrapper
 │         ├── layout.tsx           # Global layout (Navbar, Footer, Fonts)
 │         └── page.tsx             # Landing page
 ├── components/
 │    └── layout/                   # UI components (Navbar, Footer)
 ├── messages/
 │    ├── en.json                   # English dictionary
 │    └── tr.json                   # Turkish dictionary
 ├── i18n.ts                        # Translation loader & Turbopack bypass
 ├── middleware.ts                  # URL router and interceptor
 ├── next.config.ts                 # Next.js config linked to i18n
 └── package.json

 The 3 Pillars of the i18n Configuration
To make translations work seamlessly with Next.js 16's strict compiler, three files work together:

1. next.config.ts (The Linker)
This file tells the Next.js compiler exactly where to find the translation configuration.

Key Detail: We must explicitly declare the path (./i18n.ts) using createNextIntlPlugin.

Important: Do not mix .ts and .mjs config files. Stick to next.config.ts.

2. middleware.ts (The Traffic Controller)
Intercepts incoming user traffic and routes them to the correct language folder.

Prefixing: We use localePrefix: 'always' to force the router to cleanly resolve localhost:3000/tr or /en.

Matcher Array: It explicitly ignores /api, _next, and static files (like images/fonts) to prevent the middleware from translating and breaking backend assets.

3. i18n.ts (The Dictionary Loader)
Fetches the correct JSON dictionary based on the URL.

The Turbopack Bypass: We intentionally use Static Imports (a hardcoded object map of tr and en) rather than dynamic string interpolation (e.g., import(`./messages/${locale}.json`)). Turbopack crashes if it cannot statically analyze imports during the build phase.

Fallback Logic: Instead of using notFound() which interrupts the compiler and causes a Performance.measure math crash, we safely default undefined routes to 'tr'.

