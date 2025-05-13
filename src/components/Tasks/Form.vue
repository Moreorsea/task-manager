<template>
  <article class="card card--edit" :class="classes">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__color-bar">
          <Wave />
        </div>

        <div class="card__textarea-wrap">
          <label>
            <textarea v-model="taskCopy.description" class="card__text" :placeholder="t('form.placeholder')" minlength="1" maxlength="120" name="text" />
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__repeat-toggle" type="button" @click="handleRepeat">
                {{ t('form.repeat') }}<span class="card__repeat-status">{{ t(`form.${isRepeatInputText}`) }}</span>
              </button>
              <fieldset v-if="isRepeat" class="card__repeat-days">
                <ul class="card__repeat-days-inner">
                  <li v-for="day in RepeatingDays" :key="day" class="card__repeat-days-item" :class="{ 'card__repeat-days-item--active': taskCopy?.repeating_date[day] }" @click="handleDay(day)">
                    {{ currentLanguage === 'en' ? day : RepeatingDaysRu[day] }}
                  </li>
                </ul>
              </fieldset>

              <button class="card__date-deadline-toggle" type="button" @click="handleDate">
                {{ t('form.date') }}
                <span class="card__date-status">{{ t(`form.${isDateInputText}`) }}</span>
              </button>
              <fieldset v-if="isDate" class="card__date-deadline">
                <flat-pickr v-model="date" :config="config" class="card__date" @on-сlose="handleDateChange" />
              </fieldset>
            </div>
          </div>

          <div class="card__colors-inner">
            <h3 class="card__colors-title">{{ t('form.color') }}</h3>
            <ul class="card__colors-wrap">
              <li v-for="color in Colors" :key="color">
                <input
                  :id="`color-${color}-4`"
                  type="radio"
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
          <button class="card__button card__button--save" type="submit" @click.prevent="handleSave">{{ t('form.save') }}</button>
          <button class="card__button card__button--cancel" @click.prevent="handleCancel">{{ t('form.cancel') }}</button>
          <button v-if="tasksListState !== null" class="card__button card__button--delete" @click.prevent="handleDelete">{{ t('form.delete') }}</button>
        </div>
      </div>
    </form>
  </article>
</template>

<script setup lang="ts">
import { watchEffect, ref, computed } from 'vue';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { storeToRefs } from 'pinia';
import { useTasksStore } from '@/stores/tasks';
import { API_METHODS, Colors, RepeatingDays, RepeatingDaysRu } from '@/types/enums';
import Wave from './Wave.vue';
import { useTranslation } from 'i18next-vue';
import { useLocalesStore } from '@/stores/locales';

const props = defineProps({
  task: {
    type: Object,
    required: false,
  },
});

const { t } = useTranslation();
const tasksStore = useTasksStore();

const taskCopy = ref(props.task || tasksStore.createNewTask());
const isRepeat = ref(Object.values(taskCopy.value?.repeating_date || {}).some((el) => el));
const isRepeatInputText = computed<string>(() => (isRepeat.value ? 'yes' : 'no'));
const isDate = ref(!!taskCopy.value?.due_date);
const isDateInputText = computed<string>(() => (isDate.value ? 'yes' : 'no'));
const errorMessage = ref('');
const date = ref(props.task?.due_date ? new Date(props.task?.due_date).getTime() : new Date().getTime());
const localeStore = useLocalesStore();
const { currentLanguage } = storeToRefs(localeStore);

const config = ref({
  dateFormat: 'M d, Y',
});

const { tasksListState } = storeToRefs(tasksStore);

const classes = computed<string>(() => {
  const classNames = [];

  classNames.push(`card--${taskCopy.value.color}`);

  if (isRepeat.value) {
    classNames.push('card--repeat');
  }

  return classNames.join(' ');
});

const validateForm = () => {
  const errors = [];

  if (!taskCopy.value.description) {
    errors.push(t('errors.errorTaskNoName'));
  }

  if (isRepeat.value && !Object.values(taskCopy.value?.repeating_date).some((el) => el)) {
    errors.push(t('errors.errorTaskNoRepeat'));
  }

  errorMessage.value = errors.join('\n');
};

const handleSave = () => {
  validateForm();

  if (!errorMessage.value) {
    tasksStore.createEditTask(
      {
        ...taskCopy.value,
        due_date: isDate.value ? date.value : null,
      },
      taskCopy.value.id ? API_METHODS.put : API_METHODS.post,
    );
  }
};

const handleDateChange = (selectedDates: Array<Date>) => {
  date.value = new Date(selectedDates[0]).getTime();
};

const handleDelete = () => {
  tasksStore.deleteTask(taskCopy.value.id);
};

const handleCancel = () => {
  tasksStore.setTasksListState(undefined);
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
  } else {
    isDate.value = false;
    taskCopy.value.due_date = null;
  }
};

const handleDate = () => {
  isDate.value = !isDate.value;
};
</script>

<style scoped lang="less">
@import '../../style/variables.less';
.error {
  color: @red;
}

.card--edit {
  .card__inner {
    bottom: auto;
    z-index: 2;
    min-height: 450px;
    border: 1px solid @black;
    padding-bottom: 15px;

    &:hover {
      box-shadow: 0 9px 38px 0 rgba(0, 17, 45, 0.12);
      outline: 0;
    }
  }

  .card__control {
    opacity: 1;
  }

  .card__settings {
    margin-top: 0;
    flex-direction: column;
  }

  .card__img {
    position: static;
    height: 80px;
    width: auto;
    max-width: 180px;

    &-wrap {
      order: 1;
      width: auto;
      display: flex;
      padding-bottom: 10px;
      margin-bottom: 9px;
      border-bottom: 2px solid @black;
    }
  }

  .card__details {
    display: flex;
    flex-direction: column;
    order: 2;
    margin-bottom: 10px;
  }

  .card__time,
  .card__date {
    font-size: 11px;
    width: 100%;
    margin-bottom: 10px;
    border-bottom: 1px solid @black;
  }

  .card__repeat-toggle {
    display: flex;
    font-size: 11px;
    font-weight: 500;
    margin-top: 0;
    margin-bottom: 11px;
    text-transform: uppercase;
    padding: 0;
    border: 0;
    outline: none;
    cursor: pointer;
    border-bottom: 1px solid @black;
    background-color: transparent;
  }

  .card__dates {
    flex-direction: column;
    align-items: flex-start;
    border-bottom: 2px solid @black;
    margin-bottom: 10px;
  }

  .card__date-deadline-toggle {
    display: flex;
    width: auto;
    border: 0;
    padding: 0;
    margin: 0;
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 500;
    text-align: left;
    cursor: pointer;
    margin-bottom: 10px;
    border-bottom: 1px solid @black;
    outline: none;
    background-color: transparent;

    &:hover {
      opacity: 0.5;
    }
  }

  .card__hashtag-list {
    margin-bottom: 5px;
    max-height: none;
  }

  .card__hashtag-name {
    position: relative;
    background-color: transparent;
    border-radius: 10px;
    border: 1px solid @black;
    padding: 3px 15px 2px 7px;
    color: @black;
    margin: 0 6px 5px 0;
    outline: none;
    cursor: pointer;
    font-size: 13px;

    &:hover {
      opacity: 0.7;
      background-color: rgba(@black, 0.1);
    }
  }

  .card__hashtag-delete {
    display: flex;
    position: absolute;
    right: 7px;
    top: 2px;
    font-size: 0;
    border: 0;
    padding: 0;
    margin: 0;
    width: 15px;
    height: 16px;
    background-color: transparent;

    &::after {
      content: '';
      position: absolute;
      background: url('../assets/close.svg') no-repeat;
      background-size: 8px;
      width: 8px;
      height: 8px;
      top: 4px;
      right: 3px;
      cursor: pointer;
    }

    &:hover::after {
      opacity: 0.7;
    }
  }

  .card__hashtag-input {
    display: flex;
    width: 100%;
    border: 0;
    border-bottom: 2px solid @black;
    outline: none;
    font-size: 12px;

    &::placeholder {
      font-size: 10px;
      color: @black;
    }

    &:focus {
      border-color: @blue;
    }
  }

  .card__colors-inner {
    order: 3;
    display: flex;
    flex-direction: column;
  }

  .card__img-wrap--empty .card__img {
    width: 45px;
    height: 45px;
  }

  .card__repeat-days-inner {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 15px;
    margin-top: -5px;
  }

  .card__repeat-days {
    &-item {
      border: 1px solid grey;
      font-size: 12px;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.5;
      cursor: pointer;

      &--active {
        border-color: @black;
        opacity: 1;
      }
    }
  }

  .card__repeat-day {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    font-size: 12px;
    border: 1px solid #e3dede;
    color: #e3dede;
    cursor: pointer;

    &:hover {
      background-color: rgba(227, 222, 222, 0.2);
    }
  }

  .card__status-btns {
    display: flex;
    flex-direction: column;
    margin-top: auto;
  }

  .card__button {
    display: flex;
    text-transform: uppercase;
    justify-content: center;
    cursor: pointer;
    padding: 5px 0;
    border: none;
    outline: none;
    margin-bottom: 10px;
    font-size: 12px;

    &--save {
      font-size: 14px;
      background-color: rgba(@green, 0.8);
      color: white;

      &:hover {
        background-color: rgba(@green, 1);
        transition: background-color 0.2s ease-out;
      }
    }

    &--cancel {
      &:hover {
        background-color: rgba(@black, 0.2);
        transition: background-color 0.2s ease-out;
      }
    }

    &--delete {
      margin: 0;
      background-color: rgba(@red, 0.5);
      color: white;

      &:hover {
        background-color: rgba(@red, 0.7);
        transition: background-color 0.2s ease-out;
      }
    }
  }
}
</style>
