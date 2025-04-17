<template>
  <article class="card card--edit" :class="classes">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__color-bar">
          <Wave />
        </div>

        <div class="card__textarea-wrap">
          <label>
            <textarea class="card__text" placeholder="Start typing your text here..." v-model="taskCopy.description" name="text" />
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__repeat-toggle" type="button" @click="handleRepeat">
                repeat:<span class="card__repeat-status">{{ isRepeat ? 'yes' : 'no' }}</span>
              </button>
              <fieldset class="card__repeat-days" v-if="isRepeat">
                <div class="card__repeat-days-inner">
                  <template v-for="day in RepeatingDays" :key="day">
                    <input class="visually-hidden card__repeat-day-input" type="checkbox" :id="`repeat-${day}-4`" name="repeat" :value="day" :checked="taskCopy?.repeating_date[day]" />
                    <label class="card__repeat-day" :for="`repeat-${day}-4`" @click="handleDay(day)">{{ day }}</label>
                  </template>
                </div>
              </fieldset>

              <button class="card__date-deadline-toggle" type="button" @click="handleDate">
                date:
                <span v-if="isDate" class="card__date-status">yes</span>
                <span v-else class="card__date-status">no</span>
              </button>
              <fieldset class="card__date-deadline" v-if="isDate">
                <label class="card__input-deadline-wrap">
                  <input class="card__date" type="text" placeholder="" name="date" value="23 September 16:15" />
                </label>
                <flat-pickr v-model="date" />
              </fieldset>
            </div>
          </div>

          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <ul class="card__colors-wrap">
              <!--по умолчанию выбран цвет при создании, при редактировании выбраны цвет задачи-->
              <li v-for="color in Colors" :key="color">
                <input
                  type="radio"
                  :id="`color-${color}-4`"
                  :class="`card__color-input card__color-input--${color} visually-hidden`"
                  name="color"
                  :value="`${color}`"
                  :checked="taskCopy.color === color"
                />
                <label :for="`color-${color}-4`" :class="`card__color card__color--${color}`" @click="handleColor(color)">{{ color }}</label>
              </li>
            </ul>
          </div>
        </div>

        <p class="error">{{ errorMessage }}</p>

        <div class="card__status-btns">
          <button class="card__save" type="submit" @click.prevent="handleSave">save</button>
          <button class="card__delete" type="button" @click="handleDelete">delete</button>
        </div>
      </div>
    </form>
  </article>
</template>

<script setup lang="ts">
import { watchEffect, ref, computed } from 'vue';
import flatPickr from 'vue-flatpickr-component';
import { API_METHODS, Colors, RepeatingDays } from '../constants/form';
import Wave from './Wave.vue';
import 'flatpickr/dist/flatpickr.css';
import { storeToRefs } from 'pinia';
import { useTasksStore } from '@/stores/tasks';
import { isTaskExpired } from '@/utils/utils';

const props = defineProps({
  task: {
    type: Object,
    required: false,
  },
});

const emit = defineEmits(['save']);

const tasksStore = useTasksStore();

const taskCopy = ref(props.task || tasksStore.createNewTask());
const isRepeat = ref(Object.values(taskCopy.value?.repeating_date || {}).some((el) => el));
const isDate = ref(!!taskCopy.value?.due_date);
const errorMessage = ref('');
const date = ref(null);

const { tasksListState } = storeToRefs(tasksStore);

const classes = computed<string>(() => {
  const classNames = [];

  classNames.push(`card--${taskCopy.value.color}`);

  if (isRepeat.value) {
    classNames.push('card--repeat');
  }

  isTaskExpired(taskCopy.value?.due_date) && classNames.push('card--deadline');

  return classNames.join(' ');
});

const handleSave = () => {
  validateForm();

  if (!errorMessage.value) {
    tasksStore.createEditTask({ ...taskCopy.value, repeating_date: JSON.stringify(taskCopy.value?.repeating_date) }, taskCopy.value.id ? API_METHODS.put : API_METHODS.post);
  }
};

const handleDelete = () => {
  tasksStore.deleteTask(taskCopy.value.id);
};

const validateForm = () => {
  const errors = [];

  if (!taskCopy.value.description) {
    errors.push('Пожалуйста, укажите название задачи');
  }

  if (isRepeat.value && !Object.values(taskCopy.value?.repeating_date).some((el) => el)) {
    errors.push('Пожалуйста, укажите дни повторения');
  }

  errorMessage.value = errors.join('\n');
};

watchEffect(() => {
  if (taskCopy.value.description) {
    errorMessage.value = '';
  }

  if (isRepeat.value && Object.values(taskCopy.value?.repeating_date).some((el) => el)) {
    errorMessage.value = '';
  }
});

const handleColor = (color) => {
  taskCopy.value.color = color;
};

const handleDay = (day) => {
  taskCopy.value.repeating_date[day] = !taskCopy.value.repeating_date[day];
};

const handleRepeat = () => {
  isRepeat.value = !isRepeat.value;

  if (!isRepeat.value) {
    taskCopy.value.repeating_date = {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false,
    };
  }
};

const handleDate = () => {
  isDate.value = !isDate.value;
};
</script>

<style>
.error {
  color: red;
}
</style>
