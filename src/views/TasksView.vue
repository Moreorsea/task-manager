<template>
  <section class="board container" @keyup.esc="handleKeyUpEsc">
    <HeaderSort v-if="paginatedTasks.length" />

    <div class="board__tasks">
      <Form v-if="tasksListState === null" />

      <NoTasks v-if="showTasksNoLength" />

      <TaskCard v-for="task in paginatedTasks" :key="task.id" :task="task" />
    </div>

    <button
      v-if="isShowLoadMore"
      class="load-more"
      type="button"
      @click="tasksStore.updatePageSize"
    >
      load more
    </button>
  </section>

  <notifications position="top right" />
</template>

<script lang="ts" setup>
import TaskCard from '@/components/TaskCard.vue';
import Form from '@/components/Form.vue';
import HeaderSort from '@/components/HeaderSort.vue';
import NoTasks from '@/components/NoTasks.vue';
import { useTasksStore } from '@/stores/tasks';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const tasksStore = useTasksStore();
const { tasksListState, paginatedTasks, isShowLoadMore } = storeToRefs(tasksStore);
const showTasksNoLength = computed(
  () => paginatedTasks.value.length === 0 && tasksListState.value === undefined
);

const handleKeyUpEsc = () => {
  console.log('ESC');
  tasksStore.setTasksListState(undefined);
};
</script>

<style lang="less">
@import '../style/variables.less';

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
  border: 1px solid @black;
  text-transform: uppercase;
  box-shadow: 0 9px 38px 0 rgba(2, 2, 2, 0.15);
  cursor: pointer;
  margin-top: auto;
  outline: none;

  &:hover {
    background-color: rgba(@black, 0.1);
    opacity: 0.8;
  }
}
</style>
