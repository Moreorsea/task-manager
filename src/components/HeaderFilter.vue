<template>
  <section>
    <ul class="main__filter filter container">
      <li v-for="{ filter, count } in Object.entries(filters).map(([filter, count]) => ({ filter, count }))" :key="filter">
        <input type="radio" :id="`filter__${filter}`" class="filter__input visually-hidden" name="filter" :disabled="count.value === 0" />
        <label :for="`filter__${filter}`" class="filter__label">
          {{ filter }}
          <span :class="`filter__${filter}-count`">{{ count }}</span>
        </label>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { useTasksStore } from '@/stores/tasks';
import { storeToRefs } from 'pinia';
import { isTaskExpired, isTaskExpiringToday } from '@/utils/utils';
import { computed } from 'vue';
import { ITask } from './TaskCard.vue';

const tasksForStore = useTasksStore();
const { notArchiveTasks, tasks } = storeToRefs(tasksForStore);

const filters = {
  all: computed(() => notArchiveTasks.value.length),
  overdue: computed(() => notArchiveTasks.value.filter((task: ITask) => isTaskExpired(task.due_date)).length),
  today: computed(() => notArchiveTasks.value.filter((task: ITask) => isTaskExpiringToday(task.due_date)).length),
  favorites: computed(() => notArchiveTasks.value.filter((task: ITask) => task.is_favorite).length),
  repeating: computed(() => notArchiveTasks.value.filter((task: ITask) => task?.repeating_date && Object.values(task?.repeating_date).some(Boolean)).length),
  archive: computed(() => tasks.value.filter((task: ITask) => task.is_archived).length),
};
</script>

<style scoped lang="less">
.main__filter {
  margin-bottom: 29px;
  list-style: none;
}

.filter {
  display: flex;
  justify-content: space-between;
}
.filter__label {
  text-transform: uppercase;
  cursor: pointer;
  font-weight: 500;
}
.filter__label:hover {
  opacity: 0.7;
  transition: opacity 0.2s ease-out;
}
.filter__input:not(:disabled):checked + .filter__label {
  text-shadow: 1px 0 0 #000000;
}
.filter__input:not(:disabled):checked + .filter__label:hover {
  text-shadow: 1px 0 0 #000000;
  opacity: 1;
}
.filter__input:disabled + .filter__label {
  color: #e7e3e3;
}
</style>
