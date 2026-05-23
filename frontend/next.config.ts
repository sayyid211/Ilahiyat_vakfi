import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

// We explicitly tell the plugin exactly where the i18n.ts file is located
const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  /* config options here */
};

// Wrap your NextConfig with the translation plugin
export default withNextIntl(nextConfig);