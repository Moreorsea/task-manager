import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useNotification } from '@kyvg/vue3-notification';
import axios from 'axios';
import { API_URL, DEFAULT_PAGE_SIZE, DEFAULT_REPEATING_DATE } from '@/constants/form';
import { TaskListState } from '@/types/types';
import { ITask } from '@/types/interfaces';
import { API_METHODS, Colors, Filters, Sorts } from '@/types/enums';
import { filterTasksByType, sortedTasksByDueDate } from '../utils/utils';

export const useTasksStore = defineStore('tasks', () => {
  const isCreateMode = ref(false);
  const tasks = ref<ITask[]>([]);
  const activeFilter = ref(Filters.all);
  const activeSort = ref(Sorts.default);
  const { notify } = useNotification();
  const currentPageSize = ref(DEFAULT_PAGE_SIZE);
  // когда никаких действий не происходит - undefined, когда добавление задачи - null, когда редактирование - number
  const tasksListState = ref<TaskListState>(undefined);

  const filteredAndSortedTasks = computed<ITask[]>(() => {
    const filtered = filterTasksByType(tasks.value, activeFilter.value);

    return sortedTasksByDueDate(filtered, activeSort.value);
  });

  const paginatedTasks = computed<ITask[]>(() => filteredAndSortedTasks.value.slice(0, currentPageSize.value));

  const isShowLoadMore = computed<boolean>(() => currentPageSize.value < filteredAndSortedTasks.value.length);

  const handleError = (text: string) => {
    notify({
      title: text,
      type: 'error',
    });
  };

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

  const setTasksListState = (state: undefined | null | number) => {
    tasksListState.value = state;
  };

  const resetTasksListState = () => {
    tasksListState.value = undefined;
  };

  const createEditTask = (task: ITask, method: API_METHODS) => {
    const date = task.due_date ? new Date(task.due_date) : null;
    axios({
      method,
      url: method === API_METHODS.put ? `${API_URL}/${task.id}` : `${API_URL}`,
      data: {
        ...task,
        due_date: task.due_date ? date.getTime() : null,
        repeating_date: JSON.stringify(task.repeating_date),
      },
    })
      .then(() => {
        isCreateMode.value = false;
        fetchTasks();
        resetTasksListState();
        setTasksListState(undefined);
        notify({
          title: `Задача успешно ${method === API_METHODS.put ? 'отредактирована' : 'добавлена'}`,
          type: 'success',
        });
      })
      .catch((err) => {
        handleError(`При ${method === API_METHODS.put ? 'редактировании' : 'создании'} задачи возникла ошибка. Пожалуйста, попробуйте позже.`);
      });
  };

  const deleteTask = (id: number) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        fetchTasks();

        notify({
          title: 'Задача успешно удалена',
          type: 'success',
        });
      })
      .catch((err) => {
        handleError('При удалении задачи возникла ошибка. Пожалуйста, попробуйте позже.');
      });
  };

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
    currentPageSize,
    activeSort,
    activeFilter,

    paginatedTasks,
    filteredAndSortedTasks,
    isShowLoadMore,

    fetchTasks,
    createEditTask,
    createNewTask,
    deleteTask,
    setTasksListState,
    setActiveFilter,
    setActiveSort,
    updatePageSize,
    resetPageSize,
    resetFilterAndSort,
  };
});
