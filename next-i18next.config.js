module.exports = {
    i18n: {
      defaultLocale: 'fr', // Locale par défaut de votre application : le français
      locales: ['fr', 'en'], // Locales supportées par votre application : français et anglais
    },
    localePath: typeof window === 'undefined' ? require('path').resolve('./public/locales') : '/public/locales',
  };
  