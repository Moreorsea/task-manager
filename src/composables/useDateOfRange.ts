import { MILLISECONDS_IN_DAY } from '@/constants/form';
import { dateToTimestamp } from '@/utils/date';
import dayjs from 'dayjs';
import { onMounted, ref, watch, computed } from 'vue';
import { Russian } from 'flatpickr/dist/l10n/ru';
import { Default } from 'flatpickr/dist/l10n/default';
import { useLocalesStore } from '@/stores/locales';
import { storeToRefs } from 'pinia';

export const useDateOfRange = () => {
  const startDate = dayjs().subtract(1, 'week').toDate();
  const endDate = new Date();
  const dateRange = ref<Date[] | string>([startDate, endDate]);
  const daysOfRange = ref({});
  const { currentLanguage } = storeToRefs(useLocalesStore());

  const config = computed(() => {
    return {
      mode: 'range',
      defaultDate: [startDate, endDate],
      dateFormat: 'd.m.Y',
      conjunction: ' — ',
      altInput: true,
      altFormat: 'j F Y',
      locale: currentLanguage.value === 'ru' ? Russian : Default,
    };
  });

  const createDaysOfRange = () => {
    const separator = currentLanguage.value === 'ru' ? ' — ' : ' to ';
    const dates = typeof dateRange.value === 'string' ? dateRange.value.split(separator) : dateRange.value.map((date) => dayjs(date).format('DD.MM.YYYY'));

    const startDate = dateToTimestamp(dates[0]);
    const newRange: Record<string, number> = {};

    for (let i = 0; i <= 7; i++) {
      newRange[i === 0 ? startDate : startDate + i * MILLISECONDS_IN_DAY] = 0;
    }

    daysOfRange.value = newRange;
  };

  watch(
    dateRange,
    () => {
      createDaysOfRange();
    },
    { deep: true },
  );

  onMounted(() => {
    createDaysOfRange();
  });

  const handleChange = (selectedDates: Date[]) => {
    if (selectedDates.length === 2 && selectedDates[0].getTime() === isValidDate(dateRange.value[0]) && selectedDates[1]?.getTime() === isValidDate(dateRange.value[1])) return;

    if (selectedDates.length === 1) {
      dateRange.value = [selectedDates[0], dayjs(selectedDates[0]).add(1, 'week').toDate()];
      return;
    }

    dateRange.value = selectedDates;
  };

  const isValidDate = (date: Date | string) => {
    if (date instanceof Date) {
      return date.getTime();
    }

    return date;
  };

  return {
    config,
    handleChange,
    dateRange,
    daysOfRange,
  };
};
