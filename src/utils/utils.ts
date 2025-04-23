import { Sorts, Filters } from '@/types/enums';
import { ITask } from '@/types/interfaces';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(isToday);

export const isTaskExpired = (date: string) => dayjs().isAfter(date);

export const isTaskExpiringToday = (date: string) => dayjs(date).isToday();

export const getTaskTimestamp = (task: ITask) => (task.due_date ? dayjs(task.due_date).valueOf() : Infinity);

export const filterTasksByType = (tasks: ITask[], filter: Filters) => {
  switch (filter) {
    case Filters.overdue:
      return tasks.filter((task: ITask) => isTaskExpired(task.due_date) && !task.is_archived);
    case Filters.today:
      return tasks.filter((task: ITask) => isTaskExpiringToday(task.due_date) && !task.is_archived);
    case Filters.favorites:
      return tasks.filter((task: ITask) => task.is_favorite);
    case Filters.repeating:
      return tasks.filter((task: ITask) => Object.values(task.repeating_date).some(Boolean) && !task.is_archived);
    case Filters.archive:
      return tasks.filter((task: ITask) => task.is_archived);
    default:
      return tasks.filter((task: ITask) => !task.is_archived);
  }
};

export const sortedTasksByDueDate = (tasks: ITask[], sort: Sorts) => {
  const sortStrategies = {
    [Sorts.up]: (a: ITask, b: ITask) => getTaskTimestamp(a) - getTaskTimestamp(b),
    [Sorts.down]: (a: ITask, b: ITask) => getTaskTimestamp(b) - getTaskTimestamp(a),
    [Sorts.default]: (a: ITask, b: ITask) => (a.id ?? 0) - (b.id ?? 0),
  };

  return tasks.sort(sortStrategies[sort]);
};
