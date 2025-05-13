import { watch, Ref, computed, ref, reactive } from 'vue';
import { ITask } from '@/types/interfaces';
import { timestampToDate } from '@/utils/date';
import { useTranslation } from 'i18next-vue';
import { WEEK_IN_MILLISECONDS } from '@/constants/form';

export const useBarChartData = (tasks: Ref<ITask[]>, daysOfRange: Ref<Record<string, number>>) => {
  const startDate = ref(new Date().getTime());
  const endDate = ref(new Date(Date.now() - WEEK_IN_MILLISECONDS).getTime());
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

      if (task.due_date in newTasks) {
        newTasks[task.due_date] += 1;
      }
    });

    filteredTasks.value = newTasks;
    tasksCount.value = Object.values(filteredTasks.value).reduce((sum, task) => sum + task, 0);
  };

  watch([tasks, startDate, endDate, daysOfRange], getFilteredTasks, { deep: true, immediate: true });

  const data = computed(() => {
    return {
      labels: Object.keys(filteredTasks.value || {}).map((item) => timestampToDate(Number(item))),
      datasets: [
        {
          label: t('statistics.barTitle'),
          backgroundColor: '#f87979',
          data: Object.values(filteredTasks.value || {}),
          barPercentage: 1,
        },
      ],
    };
  });

  return {
    chartOptions,
    tasksCount,
    data,
  };
};
