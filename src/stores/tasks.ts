import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { notify } from '@kyvg/vue3-notification';

// import ITask from '@/components/TaskCard.vue';
import axios from 'axios';
import { API_METHODS, API_URL } from '@/constants/form';

export interface IWeek {
  mo: boolean;
  tu: boolean;
  we: boolean;
  th: boolean;
  fr: boolean;
  sa: boolean;
  su: boolean;
}

export interface ITask {
  id: number | null;
  description: string;
  due_date: string;
  color: string;
  repeating_date: IWeek | string;
  is_archived: boolean;
  is_favorite: boolean;
}

export const useTasksStore = defineStore('tasks', () => {
  const isCreateMode = ref(false);
  const tasks = ref<ITask[]>([]);
  const notArchiveTasks = ref<ITask[]>([]);
  // когда никаких действий не происходит - undefined, когда добавление задачи - null, когда редактирование - number
  const tasksListState = ref<undefined | null | number>(undefined);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(`${API_URL}`);
      tasks.value = data.map((task: ITask) => ({
        id: task.id,
        description: task.description,
        due_date: task.due_date,
        color: task.color,
        repeating_date: JSON.parse(task.repeating_date),
        is_archived: task.is_archived,
        is_favorite: task.is_favorite,
      }));

      setNotArchiveTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const setNotArchiveTasks = () => {
    notArchiveTasks.value = tasks.value.filter((task: ITask) => !task.is_archived);
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
      .then((res) => {
        isCreateMode.value = false;
        fetchTasks();
        resetTasksListState();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTask = (id: number) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        fetchTasks();

        notify({
          title: 'Vue 3 notification 🎉',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createNewTask = () => {
    const newTask: ITask = {
      id: null,
      color: 'black',
      description: '',
      due_date: null,
      is_archived: false,
      is_favorite: false,
      repeating_date: {
        mo: false,
        tu: false,
        we: false,
        th: false,
        fr: false,
        sa: false,
        su: false,
      },
    };

    return newTask;
  };

  return {
    isCreateMode,
    tasks,
    notArchiveTasks,
    fetchTasks,
    createEditTask,
    createNewTask,
    deleteTask,
    tasksListState,
    setTasksListState,
  };
});
