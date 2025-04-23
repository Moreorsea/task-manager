<template>
  <section>
    <ul class="main__filter filter container">
      <li
        v-for="{ filter, count } in Object.entries(filters).map(([filter, count]) => ({ filter, count }))"
        :key="filter"
        class="filter__item"
        :class="{ 'filter__item--active': activeFilter === filter, 'filter__item--disabled': count.value === 0 }"
        @click="handleFilter(filter)"
      >
        {{ filter }} {{ count }}
      </li>
    </ul>

    <!-- <ul>
      <li v-for="option in filterOptions" :key="option">
        {{ option }}
      </li>
    </ul> -->
  </section>
</template>

<script setup lang="ts">
import { useTasksStore } from '@/stores/tasks';
import { storeToRefs } from 'pinia';
import { isTaskExpired, isTaskExpiringToday } from '@/utils/utils';
import { computed } from 'vue';
import { ITask } from '@/types/interfaces';
import { Filters } from '@/types/enums';

const tasksStore = useTasksStore();
const { tasks, activeFilter } = storeToRefs(tasksStore);

const filters = {
  [Filters.all]: computed<number>(() => tasks.value.filter((task: ITask) => !task.is_archived).length),
  [Filters.overdue]: computed<number>(() => tasks.value.filter((task: ITask) => isTaskExpired(task.due_date) && !task.is_archived).length),
  [Filters.today]: computed<number>(() => tasks.value.filter((task: ITask) => isTaskExpiringToday(task.due_date) && !task.is_archived).length),
  [Filters.favorites]: computed<number>(() => tasks.value.filter((task: ITask) => task.is_favorite).length),
  [Filters.repeating]: computed<number>(() => tasks.value.filter((task: ITask) => task?.repeating_date && Object.values(task?.repeating_date).some(Boolean) && !task.is_archived).length),
  [Filters.archive]: computed<number>(() => tasks.value.filter((task: ITask) => task.is_archived).length),
};

const filterCounts = computed(() => ({
  [Filters.all]: tasks.value.filter((task: ITask) => !task.is_archived).length,
  [Filters.overdue]: tasks.value.filter((task: ITask) => isTaskExpired(task.due_date) && !task.is_archived).length,
  [Filters.today]: tasks.value.filter((task: ITask) => isTaskExpiringToday(task.due_date) && !task.is_archived).length,
  [Filters.favorites]: tasks.value.filter((task: ITask) => task.is_favorite).length,
  [Filters.repeating]: tasks.value.filter((task: ITask) => task?.repeating_date && Object.values(task?.repeating_date).some(Boolean) && !task.is_archived).length,
  [Filters.archive]: tasks.value.filter((task: ITask) => task.is_archived).length,
}));

const options = computed(() => {
  return Object.entries(filterCounts.value).map(([filter, count]) => ({ filter, count }));
});

const handleFilter = (filter: Filters): void => {
  tasksStore.setActiveFilter(filter);
  tasksStore.resetPageSize();
};
</script>

<style lang="less" scoped>
@import '../style/normalize.less';

.filter {
  justify-content: space-between;
  margin-bottom: 29px;

  &__item {
    cursor: pointer;
    text-transform: uppercase;

    &--active {
      font-weight: bold;
    }

    &--disabled {
      color: #e7e3e3;
      pointer-events: none;
    }

    &:hover {
      opacity: 0.8;
      transition: opacity 0.2s ease-out;
    }
  }
}
</style>
