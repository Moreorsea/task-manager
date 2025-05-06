<template>
  <Pie :data="chartData" :options="chartOptions" :width="350" :height="350" />
</template>

<script lang="ts" setup>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, PieController } from 'chart.js';
import { usePieChartData } from '@/composables/usePieChartData';
import { toRef, Ref } from 'vue';
import { ITask } from '@/types/interfaces';

ChartJS.register(Title, Tooltip, Legend, ArcElement, PieController);

const props = defineProps<{
  tasks: ITask[];
}>();

const tasksRef: Ref<ITask[]> = toRef(props, 'tasks');

const { chartData, chartOptions } = usePieChartData(tasksRef);
</script>
