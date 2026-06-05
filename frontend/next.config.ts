import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

// We explicitly tell the plugin exactly where the i18n.ts file is located
const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000', // Your NestJS backend port
        pathname: '/public/uploads/**',
      },
      // Note: When you launch the real site, you will add your production backend URL here too!
    ],
  },
  /* config options here */
};

// Wrap your NextConfig with the translation plugin
export default withNextIntl(nextConfig);