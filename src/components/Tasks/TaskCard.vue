<template>
  <Form v-if="tasksListState && tasksListState === task.id" :task="{ ...task }" />

  <article v-else :class="classes">
    <div class="card__form">
      <div class="card__inner">
        <div class="card__control">
          <Icon icon="line-md:edit" width="24" height="24" class="card__btn card__btn--edit" @click="handleEditForm" />
          <Icon icon="line-md:folder-check" width="24" :class="{ 'card__btn card__btn--archive': true, 'card__btn--disabled': task.is_archived }" height="24" @click="handleArchive" />
          <Icon icon="line-md:heart" width="24" height="24" @click="handleFavorite" :class="{ 'card__btn card__btn--favorites': true, 'card__btn--disabled': task.is_favorite }" />
        </div>

        <div class="card__color-bar">
          <Wave />
        </div>

        <div class="card__textarea-wrap">
          <p class="card__text">{{ task.description }}</p>
        </div>

        <div v-if="isRepeatingTask(props.task?.repeating_date)" class="card__days">{{ t('tasks.repetitionDays', { days: repeatingDays }) }}</div>

        <div v-if="task.due_date" class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <div class="card__date-deadline">
                <p class="card__input-deadline-wrap">
                  <span class="card__date">{{ toLocaleString(task.due_date, currentLanguage) }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useTasksStore } from '@/stores/tasks';
import { isTaskExpired, toLocaleString } from '@/utils/date';
import { storeToRefs } from 'pinia';
import { API_METHODS, RepeatingDaysRu } from '@/types/enums';
import { Icon } from '@iconify/vue';
import Wave from './Wave.vue';
import Form from './Form.vue';
import { useTranslation } from 'i18next-vue';
import { useLocalesStore } from '@/stores/locales';

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const { t } = useTranslation();

const isRepeatingTask = (repeating_date: any): boolean => Object.values(repeating_date).some((el) => el);
const localeStore = useLocalesStore();
const { currentLanguage } = storeToRefs(localeStore);

const repeatingDays = computed(() =>
  Object.entries(props.task?.repeating_date)
    .reduce((sum, day) => {
      if (day[1]) {
        if (currentLanguage.value === 'ru') {
          sum.push(RepeatingDaysRu[day[0]]);
        } else {
          sum.push(day[0]);
        }
      }

      return sum;
    }, [])
    .join(', '),
);

const tasksStore = useTasksStore();
const { tasksListState } = storeToRefs(tasksStore);

const classes = computed<string>(() => {
  const classNames = ['card'];

  props.task.color && classNames.push(`card--${props.task.color}`);

  if (isRepeatingTask(props.task?.repeating_date)) {
    classNames.push('card--repeat');
  }

  if (props.task.due_date) {
    isTaskExpired(props.task.due_date) && classNames.push('card--deadline');
  }

  tasksListState.value && tasksListState.value === props.task.id && classNames.push('card--edit');

  return classNames.join(' ');
});

const handleEditForm = () => {
  tasksStore.setTasksListState(props.task.id);
};

const handleFavorite = () => {
  tasksStore.createEditTask({ ...props.task, is_favorite: !props.task.is_favorite }, API_METHODS.put);
};

const handleArchive = () => {
  tasksStore.createEditTask({ ...props.task, is_archived: !props.task.is_archived }, API_METHODS.put);
};
</script>

<style lang="less">
@import '../../style/variables.less';

.card {
  position: relative;
  width: 210px;
  min-height: 210px;
  margin-bottom: 26px;
  margin-right: 40px;

  &__days {
    font-size: 14px;
  }

  &__inner {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    padding: 7px 15px;
    box-sizing: border-box;
    box-shadow: 0 9px 38px 0 rgba(0, 17, 45, 0.12);
    background-color: #ffffff;
    outline: 0;

    &:hover {
      outline: 10px solid white;
      transition: outline-width 0.2s ease-in-out;
      box-shadow:
        0 -14px 38px 0 rgba(35, 113, 245, 0.07),
        0 14px 38px 0 rgba(35, 113, 245, 0.07);
      z-index: 1;
    }
  }

  &__btn {
    border: 0;
    padding: 0;
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    background-color: transparent;
    outline: none;

    &:hover,
    &:focus {
      opacity: 0.6;
    }

    &--edit {
      margin-right: 9px;
    }

    &--archive {
      margin-right: auto;
    }

    &--disabled {
      color: #e7e3e3;
    }
  }
}

.card--deadline .card__inner {
  box-shadow: 0 2px 38px 0 rgba(240, 0, 0, 0.19);
}

.card__control {
  display: flex;
  opacity: 0;
  margin-bottom: 8px;
  transition: opacity 0.3s ease-out;
}
.card__inner:hover .card__control {
  opacity: 1;
}

.card__color-bar {
  width: 100%;
  height: 10px;
  font-size: 0;
  margin-bottom: 10px;
}
.card--black .card__color-bar {
  background-color: @black;
  opacity: 0.7;
}
.card--black .card__color-bar-wave {
  stroke: @black;
}
.card--yellow .card__color-bar {
  background-color: @yellow;
  opacity: 0.7;
}
.card--yellow .card__color-bar-wave {
  stroke: @yellow;
}
.card--blue .card__color-bar {
  background-color: @blue;
  opacity: 0.7;
}
.card--blue .card__color-bar-wave {
  stroke: @blue;
}
.card--green .card__color-bar {
  background-color: @green;
  opacity: 0.7;
}
.card--green .card__color-bar-wave {
  stroke: @green;
}
.card--pink .card__color-bar {
  background-color: @pink;
  opacity: 0.7;
}
.card--pink .card__color-bar-wave {
  stroke: @pink;
}
.card--deadline .card__color-bar {
  background-color: @red;
}
.card--deadline .card__color-bar-wave {
  stroke: @red;
}
.card--repeat .card__color-bar {
  background-color: transparent;
}
.card__textarea-wrap {
  position: relative;
}
.card__text {
  border: 1px solid rgba(@black, 0.2);
  margin: 0;
  resize: none;
  height: 98px;
  width: 100%;
  outline: none;
  padding: 3px;
  font-weight: 500;
  font-size: 16px;
  overflow: auto;
  box-sizing: border-box;
  border-color: transparent;
}
.card__text:focus {
  border-color: @black;
}
.card__text::placeholder {
  color: rgba(@black, 0.3);
}
.card__settings {
  display: flex;
  margin-top: auto;
}
.card__details {
  display: flex;
  flex-direction: column;
}
.card__dates {
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
}
.card__date-deadline-toggle {
  display: none;
}
.card__date-deadline {
  padding: 0;
  border: 0;
  margin: 0;
}
.card__date-deadline:disabled {
  display: none;
}
.card--deadline .card__date,
.card--deadline .card__time {
  color: @red;
}
.card__date:hover,
.card__time:hover {
  opacity: 0.5;
}
.card__date {
  margin-top: auto;
  font-size: 11px;
  font-weight: 500;
  outline: none;
  border: 0;
  text-transform: uppercase;
}
.card__delete {
  display: none;
}

.card__input-deadline-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 140px;
  margin-top: 0;
  margin-bottom: 0;
}
.card__time {
  margin: 0;
  font-size: 11px;
  font-weight: 500;
  font-family: inherit;
  outline: none;
  width: 100px;
  padding: 0;
  border: 0;
}
.card__repeat-toggle,
.card__repeat-days-inner {
  display: none;

  li {
    position: relative;
  }
}

.card__repeat-days-inner {
  list-style: none;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 10px;
}
.card__repeat-wrap {
  position: relative;
}

.card__hashtag-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}
.card__hashtag-name {
  margin-top: 0;
  margin-bottom: 0;
  margin-right: 3px;
  font-size: 10px;
  border: 0;
  outline: 0;
}
.card__hashtag-name:hover {
  opacity: 0.7;
}
.card__hashtag-input {
  display: none;
}
.card__hashtag-delete {
  display: none;
}
.card__img-wrap {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-width: 64px;
}
.card__img-wrap:hover {
  opacity: 0.7;
}
.card__img-wrap--empty {
  display: none;
}
.card__img {
  height: 45px;
  max-width: 80px;
  width: auto;
  bottom: 0;
  right: 0;
  cursor: pointer;
}
.card__colors-inner {
  display: none;
}
.card__save {
  display: none;
}

.card__repeat-toggle:hover {
  opacity: 0.5;
}
.card__repeat-status {
  padding-left: 2px;
}

.card__hashtag-inner {
  position: relative;
  display: flex;
  flex-wrap: wrap;
}
.card__colors-title {
  margin: 0;
  margin-bottom: 10px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 500;
}
.card__colors-wrap {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  list-style: none;
  padding-left: 0;
}
.card__color {
  display: flex;
  width: 15px;
  height: 15px;
  font-size: 0;
  cursor: pointer;
}
.card__color:hover {
  opacity: 0.7;
}
.card__color--black {
  background-color: #0a0a0a;
}
.card__color-input--black:checked + .card__color--black {
  box-shadow:
    0 0 0 4px #ffffff,
    0 0 0 6px #0a0a0a;
}
.card__color--yellow {
  background-color: @yellow;
}
.card__color-input--yellow:checked + .card__color--yellow {
  box-shadow:
    0 0 0 4px #ffffff,
    0 0 0 6px @yellow;
}
.card__color--blue {
  background-color: @blue;
}
.card__color-input--blue:checked + .card__color--blue {
  box-shadow:
    0 0 0 4px #ffffff,
    0 0 0 6px @blue;
}
.card__color--green {
  background-color: @green;
}
.card__color-input--green:checked + .card__color--green {
  box-shadow:
    0 0 0 4px #ffffff,
    0 0 0 6px @green;
}
.card__color--pink {
  background-color: @pink;
}
.card__color-input--pink:checked + .card__color--pink {
  box-shadow:
    0 0 0 4px #ffffff,
    0 0 0 6px @pink;
}
.card__repeat-days {
  border: 0;
  padding: 0;
  width: 100%;
  margin: 0;
}
.card__repeat-days:disabled {
  display: none;
}

.card__repeat-day-input:checked + .card__repeat-day {
  color: @black;
  border-color: @black;
}
.card__save:hover {
  background-color: rgba(@black, 0.1);
}
</style>
