// overdue - все просроченные
// today - все задачи с сегодняшним датой
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(isToday);

export const isTaskExpired = (date: string) => dayjs().isAfter(date);

export const isTaskExpiringToday = (date: string) => dayjs(date).isToday();
