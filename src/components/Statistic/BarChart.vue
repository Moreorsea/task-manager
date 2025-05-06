<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="data" />
</template>

<script lang="ts" setup>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { ref, toRef, Ref, toRefs } from 'vue';
import { ITask } from '@/types/interfaces';
import { useBarChartData } from '@/composables/useBarChartData';
import { WEEK_IN_MILLISECONDS } from '@/constants/form';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps<{
  dates: Record<string, number>;
  daysOfRange: Record<string, number>;
  dateRange: Date[];
  tasks: ITask[];
}>();

const startDate = ref(new Date().getTime());
const endDate = ref(new Date(Date.now() - WEEK_IN_MILLISECONDS).getTime());

const tasksRef: Ref<ITask[]> = toRef(props, 'tasks');
const daysOfRangeRef: Ref<Record<string, number>> = toRef(props, 'daysOfRange');

const { chartOptions, data } = toRefs(useBarChartData(tasksRef, startDate, endDate, daysOfRangeRef));
</script>
