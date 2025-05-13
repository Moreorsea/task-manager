<template>
  <Bar id="my-chart-id" :options="chartOptions" :data="data" />
</template>

<script lang="ts" setup>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { toRef, Ref, toRefs, watch } from 'vue';
import { ITask } from '@/types/interfaces';
import { useBarChartData } from '@/composables/useBarChartData';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps<{
  daysOfRange: Record<string, number>;
  dateRange: Date[];
  tasks: ITask[];
}>();
const emits = defineEmits(['get-count']);

const tasksRef: Ref<ITask[]> = toRef(props, 'tasks');
const daysOfRangeRef: Ref<Record<string, number>> = toRef(props, 'daysOfRange');

const { chartOptions, data, tasksCount } = toRefs(useBarChartData(tasksRef, daysOfRangeRef));

watch(tasksCount, (newCount, oldCount) => {
  if (newCount !== oldCount) {
    emits('get-count', newCount);
  }
});
</script>
