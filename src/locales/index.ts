import i18next from 'i18next';
import Backend from 'i18next-http-backend';

i18next.use(Backend).init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  backend: {
    loadPath: `/locales/{{lng}}/{{ns}}.json`,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
