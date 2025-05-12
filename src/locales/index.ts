import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next.use(Backend).use(LanguageDetector).init({
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  detection: {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage'],
    lookupLocalStorage: 'i18nextLng',
  },
  backend: {
    loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json`,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
