<template>
  <nav>
    <ul class="board__filter-list">
      <li v-for="option in sortOptions" :key="option.value">
        <button
          class="board__filter"
          :class="{ 'board__filter--active': activeSort === option.value }"
          @click.prevent="tasksStore.setActiveSort(option.value)">{{ t(`sorts.${option.value}`) }}</button>
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

const sortOptions = [
  {
    value: Sorts.default,
    label: 'SORT BY DEFAULT',
  },
  {
    value: Sorts.up,
    label: 'SORT BY DATE up',
  },
  {
    value: Sorts.down,
    label: 'SORT BY DATE down',
  },
];
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
