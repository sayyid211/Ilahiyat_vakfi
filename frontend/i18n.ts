import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const validLocale = ['tr', 'en'].includes(locale as string) ? locale : 'tr';

  return {
    locale: validLocale, 
    messages: (await import(`./messages/${validLocale}.json`)).default
  };
});