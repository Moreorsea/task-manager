<template>
  <section class="toggle__container">
    <div class="toggle">
      <button
        class="toggle__text"
        :class="currentLanguage === LangsEnum.ru ? 'toggle__text-active' : ''"
        type="button"
        @click="localeStore.handleLanguageChange(LangsEnum.ru)"
        @keydown.enter="localeStore.handleLanguageChange(LangsEnum.ru)"
        @keydown.space.prevent="localeStore.handleLanguageChange(LangsEnum.ru)"
        role="button"
        tabindex="0"
        :aria-pressed="currentLanguage === LangsEnum.ru">ru</button>
      <div class="toggle__switch" :class="{ ru: currentLanguage === LangsEnum.ru, en: currentLanguage === LangsEnum.en }"></div>
      <button
        class="toggle__text"
        :class="currentLanguage === LangsEnum.en ? 'toggle__text-active' : ''"
        type="button"
        @click="localeStore.handleLanguageChange(LangsEnum.en)"
        @keydown.enter="localeStore.handleLanguageChange(LangsEnum.en)"
        @keydown.space.prevent="localeStore.handleLanguageChange(LangsEnum.en)"
        role="button"
        tabindex="0"
        :aria-pressed="currentLanguage === LangsEnum.en">en</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLocalesStore } from '@/stores/locales';
import { storeToRefs } from 'pinia';
import { LangsEnum } from '@/types/enums';

const localeStore = useLocalesStore();

const { currentLanguage } = storeToRefs(localeStore);
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
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 16px;


    &--active {
      font-weight: bold;
    }
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
