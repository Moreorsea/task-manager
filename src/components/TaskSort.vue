<template>
  <div class="board__filter-list">
      <a href="#" class="board__filter" @click.prevent="tasksStore.setActiveSort(Sorts.default)">SORT BY DEFAULT</a>
      <a href="#" class="board__filter" @click.prevent="tasksStore.setActiveSort(Sorts.up)">SORT BY DATE up</a>
      <a href="#" class="board__filter" @click.prevent="tasksStore.setActiveSort(Sorts.down)">SORT BY DATE down</a>
    </div>
</template>

<script setup lang="ts">
import { useTasksStore } from '@/stores/tasks';
import { Sorts } from '@/types/enums';

const tasksStore = useTasksStore();
</script>
