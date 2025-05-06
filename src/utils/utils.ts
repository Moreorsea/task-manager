import { DATE_OPTIONS } from '@/constants/form';
import { Sorts, Filters } from '@/types/enums';
import { ITask } from '@/types/interfaces';

export const isDateToday = (date: string) => {
  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const dateDay = new Date(date).getDate();
  const dateMonth = new Date(date).getMonth();
  const dateYear = new Date(date).getFullYear();

  return todayDay === dateDay && todayMonth === dateMonth && todayYear === dateYear;
};

export const isDateInPast = (date: string) => {
  const today = Date.now();
  const taskDate = new Date(date).getTime();

  return taskDate < today;
};

export const isTaskExpired = (date: string) => isDateInPast(date);

export const isTaskExpiringToday = (date: string) => isDateToday(date);

export const getTaskTimestamp = (task: ITask, sort: Sorts) => (task.due_date ? new Date(task.due_date).getTime() : sort === Sorts.down ? -Infinity : Infinity);

export const isDateBetween = (currentDate: Date, endDate: Date, startDate: Date) => currentDate >= startDate && currentDate <= endDate;

export const dateToTimestamp = (dateString: string) => {
  const [d, m, y] = dateString.split('.').map(Number);
  const date = new Date(y, m - 1, d);

  if (isNaN(date.getTime())) {
    throw new Error(`Неверная дата: ${dateString}`);
  }

  return date.getTime();
};

export const timestampToDate = (timestamp: number) => {
  const date = new Date(timestamp);

  return date.toLocaleDateString('en-US', DATE_OPTIONS);
};

export const filterTasksByType = (tasks: ITask[], filter: Filters) => {
  switch (filter) {
    case Filters.overdue:
      return tasks.filter((task: ITask) => task.due_date && isTaskExpired(task.due_date) && !task.is_archived);
    case Filters.today:
      return tasks.filter((task: ITask) => task.due_date && isTaskExpiringToday(task.due_date) && !task.is_archived);
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
    [Sorts.up]: (a: ITask, b: ITask) => getTaskTimestamp(a, Sorts.up) - getTaskTimestamp(b, Sorts.up),
    [Sorts.down]: (a: ITask, b: ITask) => getTaskTimestamp(b, Sorts.down) - getTaskTimestamp(a, Sorts.down),
    [Sorts.default]: (a: ITask, b: ITask) => (a.id ?? 0) - (b.id ?? 0),
  };

  return tasks.sort(sortStrategies[sort]);
};
