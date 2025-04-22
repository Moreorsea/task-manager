import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useNotification } from "@kyvg/vue3-notification";
import axios from 'axios';
import { API_URL, DEFAULT_REPEATING_DATE } from '@/constants/form';
import { TaskListState } from '@/types/types';
import { ITask } from '@/types/interfaces';
import {
  API_METHODS, Colors, Filters, Sorts,
} from '@/types/enums';
import { getTaskTimestamp, isTaskExpired, isTaskExpiringToday } from '../utils/utils';

export const useTasksStore = defineStore('tasks', () => {
  const isCreateMode = ref(false);
  const tasks = ref<ITask[]>([]);
  const activeFilter = ref(Filters.all);
  const activeSort = ref(Sorts.default);
  const { notify }  = useNotification();
  // когда никаких действий не происходит - undefined, когда добавление задачи - null, когда редактирование - number
  const tasksListState = ref<TaskListState>(undefined);

  const filteredTasks = computed<ITask[]>(() => {
    switch (activeFilter.value) {
      case Filters.overdue:
        return tasks.value.filter((task: ITask) => isTaskExpired(task.due_date) && !task.is_archived);
      case Filters.today:
        return tasks.value.filter((task: ITask) => isTaskExpiringToday(task.due_date) && !task.is_archived);
      case Filters.favorites:
        return tasks.value.filter((task: ITask) => task.is_favorite);
      case Filters.repeating:
        return tasks.value.filter((task: ITask) => Object.values(task.repeating_date).some(Boolean) && !task.is_archived);
      case Filters.archive:
        return tasks.value.filter((task: ITask) => task.is_archived);
      default:
        return tasks.value.filter((task: ITask) => !task.is_archived);
    }
  });

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(`${API_URL}`);
      tasks.value = data.map((task: ITask) => ({
        ...task,
        repeating_date: JSON.parse(task.repeating_date),
      }));
    } catch (error) {
      handleError('При загрузке задач возникла ошибка. Пожалуйста, попробуйте позже.');
    }
  };

  const setActiveSort = (sort: Sorts) => {
    activeSort.value = sort;

    tasks.value = tasks.value.sort((a, b) => {
      if (activeSort.value === Sorts.up) {
        return getTaskTimestamp(a) - getTaskTimestamp(b);
      }

      if (activeSort.value === Sorts.down) {
        return getTaskTimestamp(b) - getTaskTimestamp(a);
      }

      return (a.id ?? 0) - (b.id ?? 0);
    });
  };

  const setActiveFilter = (filter: Filters) => {
    activeFilter.value = filter;
  };

  const setTasksListState = (state: undefined | null | number) => {
    tasksListState.value = state;
  };

  const resetTasksListState = () => {
    tasksListState.value = undefined;
  };

  const createEditTask = (task: ITask, method: API_METHODS) => {
    axios({
      method,
      url: method === API_METHODS.put ? `${API_URL}/${task.id}` : `${API_URL}`,
      data: task,
    })
      .then(() => {
        isCreateMode.value = false;
        fetchTasks();
        resetTasksListState();
      })
      .catch((err) => {
        handleError(`При ${ method === API_METHODS.put ? 'редактировании' : 'создании' } задачи возникла ошибка. Пожалуйста, попробуйте позже.`);
      });
  };

  const deleteTask = (id: number) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        fetchTasks();

        notify({
          title: 'Задача успешно удалена',
          type: 'success'
        });
      })
      .catch((err) => {
        handleError('При удалении задачи возникла ошибка. Пожалуйста, попробуйте позже.');
      });
  };

  const handleError = (text: string) => {
    notify({
      title: text,
      type: 'error'
    });
  }

  const createNewTask = () => {
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

  return {
    isCreateMode,
    tasks,
    tasksListState,

    filteredTasks,

    fetchTasks,
    createEditTask,
    createNewTask,
    deleteTask,
    setTasksListState,
    setActiveFilter,
    setActiveSort,
  };
});
