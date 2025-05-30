<template>
  <section class="statistic container">
    <div class="statistic__line">
      <div class="statistic__period">
        <h2 class="statistic__period-title">{{ t('statistics.title') }}</h2>

        <div class="statistic-input-wrap">
          <flat-pickr v-model="dateRange" :config="config" @on-change="handleChange" />
        </div>

        <p class="statistic__period-result">{{ t('statistics.amountForPeriod', { count: tasksCount }) }}</p>
      </div>
      <div class="statistic__circle">
        <div class="statistic__colors-wrap">
          <pie-chart :tasks="tasks" />
        </div>
      </div>
    </div>

    <div class="statistic__line-graphic">
      <bar-chart :date-range="dateRange" :tasks="tasks" :days-of-range="daysOfRange" @get-count="getTaskTotalCount" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { onBeforeMount, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTranslation } from 'i18next-vue';

import { useTasksStore } from '@/stores/tasks';
import { useDateOfRange } from '@/composables/useDateOfRange';

import PieChart from '../components/Statistic/PieChart.vue';
import BarChart from '../components/Statistic/BarChart.vue';

const tasksStore = useTasksStore();
const { tasks } = storeToRefs(tasksStore);
const { t } = useTranslation();
const tasksCount = ref<number>(0);

const { config, handleChange, dateRange, daysOfRange } = useDateOfRange();

const getTaskTotalCount = (total: number) => {
  tasksCount.value = total;
};

onBeforeMount(() => {
  if (tasks.value.length === 0) tasksStore.fetchTasks();
});
</script>

<style lang="less">
@import '../style/variables.less';

.flatpickr-input {
  font-family: 'HelveticaNeueCyr';
  padding: 5px;
  width: 155px;
}

.statistic {
  padding-top: 50px;
  padding-bottom: 50px;

  &__line {
    display: flex;
    padding-bottom: 20px;

    &-graphic {
      margin-top: 30px;
    }
  }

  &__period {
    width: 330px;
    margin-right: 80px;
    font-size: 14px;
    font-weight: 500;

    &-result {
      font-size: 14px;
      font-weight: 500;
    }

    &-title {
      margin-top: 0;
      font-size: 18px;
      text-transform: uppercase;
    }

    &-input {
      padding: 8px 0 4px 20px;
      margin: 0;
      border: 1px solid @black;
      font-size: 14px;
      width: 100%;
      color: @black;
    }
  }

  &-input-wrap {
    display: flex;
    width: 100%;
  }

  &__circle {
    display: flex;
    justify-content: space-between;
  }
}
</style>
