<template>
  <p class="board__no-tasks">{{ t('tasks.noTasks') }}</p>
</template>

<script setup lang="ts">
import { useTranslation } from 'i18next-vue';

const { t } = useTranslation();
</script>

<style lang="less">
.board__no-tasks {
  text-align: center;
  text-transform: uppercase;
  width: 100%;
}
</style>
