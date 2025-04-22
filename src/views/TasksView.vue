<template>
  <section class="board container">
    <TaskSort v-if="filteredTasks.length" />

    <div class="board__tasks">
      <Form v-if="tasksListState === null" />

      <NoTasks v-if="showTasksNoLength" />

      <TaskCard v-for="task in filteredTasks" :key="task.id" :task="task" />
    </div>

    <button v-if="isShowLoadMore" class="load-more" type="button">load more</button>
  </section>

  <notifications position="top right" />
</template>

<script lang="ts" setup>
import TaskCard from '@/components/TaskCard.vue';
import Form from '@/components/Form.vue';
import TaskSort from '@/components/TaskSort.vue';
import NoTasks from '@/components/NoTasks.vue';
import { useTasksStore } from '@/stores/tasks';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const tasksStore = useTasksStore();
const { tasksListState, filteredTasks } = storeToRefs(tasksStore);
const showTasksNoLength = computed(() => filteredTasks.value.length === 0 && tasksListState.value === undefined);
const TASK_FOR_PAGE = 8;

const isShowLoadMore = computed<boolean>(() => filteredTasks.value.length > TASK_FOR_PAGE);
</script>

<style lang="less">
.board__filter-list {
  margin-bottom: 24px;
}

.board__filter {
  display: inline-block;
  margin-right: 24px;
  outline: none;
  text-decoration: none;
  color: #000;
}

.board__filter:hover,
.board__filter:focus {
  opacity: 0.7;
}

.board__filter--active {
  font-weight: bold;
}

.board__tasks {
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  min-height: 500px;
  margin-right: -40px;
}
.board__no-tasks {
  text-align: center;
  text-transform: uppercase;
  width: 100%;
}

// load more
.load-more {
  width: 100%;
  padding: 15px 0;
  display: flex;
  justify-content: center;
  background-color: transparent;
  border: 1px solid #000000;
  text-transform: uppercase;
  box-shadow: 0 9px 38px 0 rgba(2, 2, 2, 0.15);
  cursor: pointer;
  margin-top: auto;
  outline: none;
}
.load-more:hover {
  background-color: rgba(0, 0, 0, 0.1);
  opacity: 0.8;
}
</style>
