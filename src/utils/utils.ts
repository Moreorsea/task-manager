import { ITask } from '@/types/interfaces';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(isToday);

export const isTaskExpired = (date: string) => dayjs().isAfter(date);

export const isTaskExpiringToday = (date: string) => dayjs(date).isToday();

export const getTaskTimestamp = (task: ITask) => (task.due_date ? dayjs(task.due_date).valueOf() : Infinity);
