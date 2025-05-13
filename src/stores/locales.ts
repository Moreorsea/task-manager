import { LangsEnum } from '@/types/enums';
import i18next from 'i18next';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLocalesStore = defineStore('locales', () => {
  const currentLanguage = ref(localStorage.getItem('i18nextLng') || LangsEnum.en);

  const handleLanguageChange = (lng: LangsEnum) => {
    i18next.changeLanguage(lng);
    currentLanguage.value = lng;
  };

  return {
    currentLanguage,

    handleLanguageChange,
  };
});
