<template>
  <section class="main__control control container">
    <h1 class="control__title">TASKMANAGER</h1>
    <section class="control__btn-wrap">
      <button class="control__btn control__btn--create-task" @click="setTasksListState(null)">+ ADD NEW TASK</button>

      <router-link to="/tasks" class="control__btn">TASKS</router-link>

      <router-link to="/statistics" class="control__btn">STATISTICS</router-link>
    </section>
  </section>
</template>

<script lang="ts" setup>
import { useTasksStore } from '@/stores/tasks';

const { setTasksListState } = useTasksStore();
</script>

<style lang="less" scoped>
.main__control {
  margin-bottom: 8px;
}

.control {
  position: relative;
  display: flex;
  align-items: baseline;

  &__btn-wrap {
    display: flex;
    width: 100%;
  }

  &__title {
    font-size: 16px;
    line-height: 23px;
    margin-top: 0;
    margin-bottom: 0;
  }

  &__btn {
    font-size: 16px;
    display: inline-flex;
    font-weight: normal;
    color: inherit;
    text-decoration: none;
    margin-left: 54px;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
      transition: opacity 0.3s ease-out;
    }

    &--create-task {
      margin-right: auto;
      background: transparent;
      border: none;
      outline: none;
      font-weight: bold;
    }
  }
}

.router-link-active {
  font-weight: bold;
}
</style>
