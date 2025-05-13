import { watch, Ref, computed, ref } from 'vue';
import { ITask } from '@/types/interfaces';
import { isDateBetween, timestampToDate } from '@/utils/date';
import { useTranslation } from 'i18next-vue';

export const useBarChartData = (tasks: Ref<ITask[]>, startDate: Ref<Date>, endDate: Ref<Date>, daysOfRange: Ref<Record<string, number>>) => {
  const { t } = useTranslation();
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
    },
  };
  const filteredTasks = ref<Record<number, number>>({});
  const tasksCount = ref<number>(0);

  const getFilteredTasks = () => {
    const newTasks: Record<string, number> = { ...daysOfRange.value };
    tasks.value.forEach((task) => {
      if (!task.due_date) return;

      if (isDateBetween(task.due_date, startDate.value, endDate.value) && task.due_date in newTasks) {
        newTasks[task.due_date] += 1;
      }
    });

    filteredTasks.value = newTasks;
  };

  watch([tasks, startDate, endDate, daysOfRange], getFilteredTasks, { deep: true, immediate: true });

  watch(filteredTasks, () => {
    tasksCount.value = Object.values(filteredTasks.value || {}).reduce((sum, item) => sum + item, 0);
  });

  const data = computed(() => ({
    labels: Object.keys(filteredTasks.value || {}).map((item) => timestampToDate(Number(item))),
    datasets: [
      {
        label: t('statistics.barTitle'),
        backgroundColor: '#f87979',
        data: Object.values(filteredTasks.value || {}),
        barPercentage: 1,
      },
    ],
  }));

  return {
    chartOptions,
    data,
    tasksCount,
  };
};
