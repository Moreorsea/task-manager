import { Filters, Sorts, Colors } from "@/types/enums";
import { ITask } from "@/types/interfaces";
import { getTaskTimestamp, isTaskExpired, isTaskExpiringToday } from "./date";
import { DEFAULT_REPEATING_DATE } from '@/constants/form';

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

export const createNewTask = () => {
  const newTask: ITask = {
    id: null,
    color: Colors.black,
    description: '',
    due_date: null,
    is_archived: false,
    is_favorite: false,
    repeating_date: DEFAULT_REPEATING_DATE,
  };

  return newTask;
};