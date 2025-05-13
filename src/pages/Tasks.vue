<template>
  <section class="board container" @keyup.esc="handleKeyUpEsc">
    <HeaderSort v-if="paginatedTasks.length" />

    <div class="board__tasks">
      <Form v-if="tasksListState === null" />

      <NoTasks v-if="showTasksNoLength" />

      <TaskCard v-for="task in paginatedTasks" :key="task.id" :task="task" />
    </div>

    <button v-if="isShowLoadMore" class="load-more" type="button" @click="tasksStore.updatePageSize">
      {{ t('tasks.loadMore') }}
    </button>
  </section>

  <notifications position="top right" />
</template>

<script lang="ts" setup>
import TaskCard from '@/components/Tasks/TaskCard.vue';
import Form from '@/components/Tasks/Form.vue';
import HeaderSort from '@/components/Header/HeaderSort.vue';
import NoTasks from '@/components/Tasks/NoTasks.vue';
import { useTasksStore } from '@/stores/tasks';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import { useTranslation } from 'i18next-vue';

const { t } = useTranslation();

const tasksStore = useTasksStore();
const { tasksListState, paginatedTasks, isShowLoadMore } = storeToRefs(tasksStore);
const showTasksNoLength = computed(() => paginatedTasks.value.length === 0 && tasksListState.value === undefined);

const handleKeyUpEsc = () => {
  tasksStore.setTasksListState(undefined);
};
</script>

<style lang="less">
@import '../style/variables.less';

.board {
  margin-top: -10px;

  &__tasks {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    min-height: 500px;
    margin-right: -40px;
  }
}

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
