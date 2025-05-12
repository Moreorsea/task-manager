import { watch, Ref, computed, ref } from 'vue';
import { ITask } from '@/types/interfaces';
import { isDateBetween, timestampToDate } from '@/utils/date';

export const useBarChartData = (tasks: Ref<ITask[]>, startDate: Ref<Date>, endDate: Ref<Date>, daysOfRange: Ref<Record<string, number>>) => {
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

  const data = computed(() => ({
    labels: Object.keys(filteredTasks.value || {}).map((item) => timestampToDate(Number(item))),
    datasets: [
      {
        label: 'График задач за выбранный период',
        backgroundColor: '#f87979',
        data: Object.values(filteredTasks.value || {}),
        barPercentage: 1,
      },
    ],
  }));

  return {
    chartOptions,
    data,
  };
};
