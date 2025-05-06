<template>
  <section class="toggle__container">
    <div class="toggle">
      <span class="toggle__text" @click="handleLanguageChange('ru')">ru</span>
      <div class="toggle__switch" :class="{ ru: currentLanguage === 'ru', en: currentLanguage === 'en' }"></div>
      <span class="toggle__text" @click="handleLanguageChange('en')">en</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import i18next from 'i18next';
import { ref, onMounted, onBeforeMount } from 'vue';

const currentLanguage = ref(i18next.resolvedLanguage || 'en');
type langs = 'ru' | 'en';

const handleLanguageChange = (lng: langs) => {
  if (lng !== currentLanguage.value) {
    i18next
      .changeLanguage(lng)
      .then(() => {
        currentLanguage.value = lng;
      })
      .catch((err: Error) => {
        console.error('Language change failed:', err);
      });
  }
};

const languageChangedHandler = (lng: langs) => {
  currentLanguage.value = lng;
};

onMounted(() => {
  i18next.on('languageChanged', languageChangedHandler);
});

onBeforeMount(() => {
  i18next.off('languageChanged', languageChangedHandler);
});
</script>

<style scoped lang="less">
.toggle {
  display: flex;
  align-items: center;
  margin-left: auto;
  justify-content: flex-end;

  &__container {
    width: 960px;
    margin: 0 auto 30px;
  }

  &__text {
    cursor: pointer;
  }

  &__switch {
    border-radius: 20px;
    border: 1px solid grey;
    width: 40px;
    height: 20px;
    position: relative;
    margin: 0 5px;

    &::before {
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      background-color: #000;
      border-radius: 50%;
      margin: 2px;
    }

    &.ru {
      &::before {
        margin-left: 2px;
        transition: ease-out 0.5s;
      }
    }

    &.en {
      background-color: lightgrey;
      transition: ease-out 0.5s;

      &::before {
        margin-left: 22px;
        transition: ease-out 0.5s;
      }
    }
  }
}
</style>
