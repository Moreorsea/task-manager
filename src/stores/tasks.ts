import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import axios from 'axios';
import { API_URL, DEFAULT_PAGE_SIZE, DEFAULT_REPEATING_DATE } from '@/constants/form';
import { TaskListState } from '@/types/types';
import { ITask } from '@/types/interfaces';
import { API_METHODS, Filters, Sorts } from '@/types/enums';
import { filterTasksByType, sortedTasksByDueDate } from '../utils/tasks';
import { useTranslation } from 'i18next-vue';
import { handleError, handleSuccess } from '@/utils/notifications';
import {saveRequest} from '../stores/offline';
import { tasksService } from '@/services/task.service';

export const useTasksStore = defineStore('tasks', () => {
  const { t } = useTranslation();
  const isCreateMode = ref(false);
  const tasks = ref<ITask[]>([]);
  const activeFilter = ref(Filters.all);
  const activeSort = ref(Sorts.default);
  const currentPageSize = ref(DEFAULT_PAGE_SIZE);
  // когда никаких действий не происходит - undefined, когда добавление задачи - null, когда редактирование - number
  const tasksListState = ref<TaskListState>(undefined);
  const isLoading = ref(false);

  const setLoading = (value: boolean) => {
    isLoading.value = value;
  };

  const filteredAndSortedTasks = computed<ITask[]>(() => {
    const filtered = filterTasksByType(tasks.value, activeFilter.value);

    return sortedTasksByDueDate(filtered, activeSort.value);
  });

  const paginatedTasks = computed<ITask[]>(() => filteredAndSortedTasks.value.slice(0, currentPageSize.value));

  const isShowLoadMore = computed<boolean>(() => currentPageSize.value < filteredAndSortedTasks.value.length);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      tasks.value = await tasksService.getAll();
    } catch (error) {
      handleError(t('errors.errorGetTasks'));
    } finally {
      setLoading(false);
    }
  };

  const updatePageSize = () => {
    currentPageSize.value += DEFAULT_PAGE_SIZE;
  };

  const resetPageSize = () => {
    currentPageSize.value = DEFAULT_PAGE_SIZE;
  };

  const setActiveSort = (sort: Sorts) => {
    activeSort.value = sort;
  };

  const setActiveFilter = (filter: Filters) => {
    activeFilter.value = filter;
  };

  const resetFilterAndSort = () => {
    activeFilter.value = Filters.all;
    activeSort.value = Sorts.default;
  };

  const setTasksListState = (state: TaskListState) => {
    tasksListState.value = state;
  };

  const createEditTask = async (task: ITask, method: API_METHODS) => {
    setLoading(true);

    const payload = {
      ...task,
      repeating_date: JSON.stringify(task.repeating_date)
    };

    if(!navigator.onLine) {
      try {
        await saveRequest({
          method,
          url: method === API_METHODS.put ? `${API_URL}/${task.id}` : `${API_URL}`,
          data: payload
        });
        handleSuccess("Задача в режиме офлайн успешно добавлена");
      } catch(error) {
        handleError("Задача в режиме офлайн не добавлена")
      } finally {
        setLoading(false);
      }
      return; // остановка функции, чтобы не идти в сеть
    }

    try {
      if(method === API_METHODS.put) {
        const updatedTask = await tasksService.update(task.id!, payload);
        const index = tasks.value.findIndex(t => t.id === task.id);
        if(index !== -1) {
          tasks.value[index] = updatedTask;
        }
        handleSuccess(t('success.successEditTask'));
      } else {
        const createdTask = await tasksService.create(task);

        tasks.value.push(createdTask);
        handleSuccess(t('success.successAddTask'));
      }

      isCreateMode.value = false;
      setTasksListState(undefined);
      await fetchTasks();
    } catch(error) {
      handleError(`${method === API_METHODS.put ? t('errors.errorEditTask') : t('errors.errorCreateTask')}`);
    } finally {
      setLoading(false);
    }
  }

  const deleteTask = async (id: number) => {
    try {
      await tasksService.delete(id);
      handleSuccess(t('success.successDeleteTask'));

      tasks.value = tasks.value.filter(task => task.id !== id);
    } catch(error) {
      handleError(t('errors.errorDeleteTask'));
    }
  }

  return {
    isCreateMode,
    tasks,
    tasksListState,
    currentPageSize,
    activeSort,
    activeFilter,
    isLoading,

    paginatedTasks,
    filteredAndSortedTasks,
    isShowLoadMore,

    fetchTasks,
    createEditTask,
    deleteTask,
    setTasksListState,
    setActiveFilter,
    setActiveSort,
    updatePageSize,
    resetPageSize,
    resetFilterAndSort,
    setLoading,
  };
});
