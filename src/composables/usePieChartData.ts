import { useTranslation } from 'i18next-vue';
import { ITask } from '@/types/interfaces';
import { computed, Ref } from 'vue';
import { Colors } from '@/types/enums';

export const usePieChartData = (tasks: Ref<ITask[]>) => {
  const { t } = useTranslation();
  const emptyColorObject = {
    [Colors.black]: 0,
    [Colors.yellow]: 0,
    [Colors.blue]: 0,
    [Colors.green]: 0,
    [Colors.pink]: 0,
  };

  const colorTasks = computed(() =>
    (tasks.value || []).reduce(
      (sum: Record<string, number>, task: ITask) => {
        sum[task.color] += 1;

        return sum;
      },
      { ...emptyColorObject },
    ),
  );

  const chartData = computed(() => ({
    labels: Object.values(Colors).map((color) => t(`statistics.pieColors.${color}`)),
    datasets: [
      {
        data: Object.values(colorTasks.value),
        backgroundColor: ['#0a0a0a', '#ffe125', '#0c5cdd', '#31b55c', '#ff3cb9'],
        hoverOffset: 4,
      },
    ],
  }));

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: t('statistics.pieTitle'),
      },
    },
  };

  return {
    chartData,
    chartOptions,
  };
};
