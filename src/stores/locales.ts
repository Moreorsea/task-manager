import { Langs } from '@/types/types';
import i18next from 'i18next';
import { defineStore } from 'pinia';
import { ref } from 'vue';
// Langs
export const useLocalesStore = defineStore('locales', () => {
  const currentLanguage = ref(localStorage.getItem('i18nextLng') || 'en');

  const handleLanguageChange = (lng: Langs) => {
    i18next.changeLanguage(lng);
    currentLanguage.value = lng;
  };

  // i18next.on('languageChanged', () => {
  //   console.log('lang', i18next.language);
  // });

  return {
    currentLanguage,

    handleLanguageChange,
  };
});
