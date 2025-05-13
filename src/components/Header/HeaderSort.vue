<template>
  <nav>
    <ul class="board__filter-list">
      <li v-for="option in Sorts" :key="option">
        <button class="board__filter" :class="{ 'board__filter--active': activeSort === option }" @click.prevent="tasksStore.setActiveSort(option)">{{ t(`sorts.${option}`) }}</button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTasksStore } from '@/stores/tasks';
import { Sorts } from '@/types/enums';
import { useTranslation } from 'i18next-vue';

const { t } = useTranslation();

const tasksStore = useTasksStore();
const { activeSort } = storeToRefs(tasksStore);
</script>

<style lang="less" scoped>
@import '../../style/normalize.less';

.board__filter {
  display: inline-block;
  margin-right: 24px;
  outline: none;
  text-decoration: none;
  color: #000;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;

  &-list {
    margin-bottom: 24px;
  }

  &--active {
    font-weight: bold;
  }

  &:hover {
    opacity: 0.8;
  }
}
</style>
