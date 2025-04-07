<template>
  <article :class="{'card': true, [`card--${task.color}`]: task.color}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive">
              archive
            </button>
            <button
              type="button"
              :class="{'card__btn card__btn--favorites': true, 'card__btn--disabled': task.is_favorite}"
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">{{ task.description }}</p>
          </div>

          <div class="card__settings" v-if="task.due_date">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">23 September</span>
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
/**
 * стили-модификаторы для линий
 * card--black - по умолчанию
 * card--blue
 * card--yellow
 * card--pink
 * card--red
 * card--deadline - просроченная задача. card card--deadline
 * Под просроченной задачей подразумевается задача с установленной датой исполнения меньше текущей даты.
 * card--repeat - повторяющаяся задача. у нее цветная полоса становится прозрачной
 * card__btn--disabled - для карточки, которая добавлена в избранное. card__btn card__btn--favorites card__btn--disabled
 */

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="less">
.card {
  position: relative;
  width: 210px;
  min-height: 210px;
  margin-bottom: 26px;
  margin-right: 40px;
}
.card__inner {
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
}
.card--deadline .card__inner {
  box-shadow: 0 2px 38px 0 rgba(240, 0, 0, 0.19);
}
.card__inner:hover {
  outline: 10px solid white;
  transition: outline-width 0.2s ease-in-out;
  box-shadow: 0 -14px 38px 0 rgba(35, 113, 245, 0.07),
    0 14px 38px 0 rgba(35, 113, 245, 0.07);
  z-index: 1;
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
.card__btn {
  border: 0;
  padding: 0;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  background-color: transparent;
  outline: none;
}
.card__btn:hover,
.card__btn:focus {
  opacity: 0.6;
}
.card__btn--edit {
  margin-right: 9px;
}
.card__btn--archive {
  margin-right: auto;
}
.card__btn--disabled {
  color: #e7e3e3;
}
.card__color-bar {
  width: 100%;
  height: 10px;
  font-size: 0;
  background-color: black;
  margin-bottom: 10px;
  stroke: #000000;
}
.card--black .card__color-bar {
  background-color: #000000;
}
.card--black .card__color-bar-wave {
  stroke: #000000;
}
.card--yellow .card__color-bar {
  background-color: #ffe125;
}
.card--yellow .card__color-bar-wave {
  stroke: #ffe125;
}
.card--blue .card__color-bar {
  background-color: #0c5cdd;
}
.card--blue .card__color-bar-wave {
  stroke: #0c5cdd;
}
.card--green .card__color-bar {
  background-color: #31b55c;
}
.card--green .card__color-bar-wave {
  stroke: #31b55c;
}
.card--pink .card__color-bar {
  background-color: #ff3cb9;
}
.card--pink .card__color-bar-wave {
  stroke: #ff3cb9;
}
.card--deadline .card__color-bar {
  background-color: #f11a1a;
}
.card--deadline .card__color-bar-wave {
  stroke: #f11a1a;
}
.card--repeat .card__color-bar {
  background-color: transparent;
}
.card__textarea-wrap {
  position: relative;
}
.card__text {
  border: 1px solid rgba(0, 0, 0, 0.2);
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
  border-color: #000000;
}
.card__text::placeholder {
  color: rgba(0, 0, 0, 0.3);
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
  color: #f11a1a;
}
.card__date:hover,
.card__time:hover {
  opacity: 0.5;
}
.card__date {
  margin-top: auto;
  font-size: 11px;
  font-weight: 500;
  width: 100px;
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
.card--edit .card__inner {
  bottom: auto;
  z-index: 2;
  min-height: 450px;
  border: 1px solid #000000;
  padding-bottom: 15px;
}

.card--edit .card__inner:hover {
  box-shadow: 0 9px 38px 0 rgba(0, 17, 45, 0.12);
  outline: 0;
}
.card--edit .card__control {
  opacity: 1;
}
.card--edit .card__settings {
  margin-top: 0;
  flex-direction: column;
}
.card--edit .card__img-wrap {
  order: 1;
  width: auto;
  display: flex;
  padding-bottom: 10px;
  margin-bottom: 9px;
  border-bottom: 2px solid #000000;
}
.card--edit .card__img {
  position: static;
  height: 80px;
  width: auto;
  max-width: 180px;
}
.card--edit .card__details {
  display: flex;
  flex-direction: column;
  order: 2;
  margin-bottom: 10px;
}
.card--edit .card__time,
.card--edit .card__date {
  font-size: 11px;
  width: 100%;
  margin-bottom: 10px;
  border-bottom: 1px solid #000000;
}
.card--edit .card__repeat-toggle {
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
  border-bottom: 1px solid #000000;
  background-color: transparent;
}
.card__repeat-toggle:hover {
  opacity: 0.5;
}
.card__repeat-status {
  padding-left: 2px;
}
.card--edit .card__dates {
  flex-direction: column;
  align-items: flex-start;
  border-bottom: 2px solid #000000;
  margin-bottom: 10px;
}
.card--edit .card__date-deadline-toggle {
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
  border-bottom: 1px solid #000000;
  outline: none;
  background-color: transparent;
}
.card--edit .card__date-deadline-toggle:hover {
  opacity: 0.5;
}
.card--edit .card__hashtag-list {
  margin-bottom: 5px;
  max-height: none;
}
.card--edit .card__hashtag-name {
  position: relative;
  background-color: transparent;
  border-radius: 10px;
  border: 1px solid #000000;
  padding: 3px 15px 2px 7px;
  color: #000000;
  margin: 0 6px 5px 0;
  outline: none;
  cursor: pointer;
  font-size: 13px;
}
.card--edit .card__hashtag-name:hover {
  opacity: 0.7;
  background-color: rgba(0, 0, 0, 0.1);
}
.card__hashtag-inner {
  position: relative;
  display: flex;
  flex-wrap: wrap;
}
.card--edit .card__hashtag-delete {
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
}
.card--edit .card__hashtag-delete::after {
  content: "";
  position: absolute;
  background: url("../assets/close.svg") no-repeat;
  background-size: 8px;
  width: 8px;
  height: 8px;
  top: 4px;
  right: 3px;
  cursor: pointer;
}
.card--edit .card__hashtag-delete:hover::after {
  opacity: 0.7;
}
.card--edit .card__hashtag-input {
  display: flex;
  width: 100%;
  border: 0;
  border-bottom: 2px solid #000000;
  outline: none;
  font-size: 12px;
}
.card--edit .card__hashtag-input::placeholder {
  font-size: 10px;
  color: #000000;
}
.card--edit .card__hashtag-input:focus {
  border-color: #0c5cdd;
}
.card--edit .card__colors-inner {
  order: 3;
  display: flex;
  flex-direction: column;
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
  box-shadow: 0 0 0 4px #ffffff, 0 0 0 6px #0a0a0a;
}
.card__color--yellow {
  background-color: #ffe125;
}
.card__color-input--yellow:checked + .card__color--yellow {
  box-shadow: 0 0 0 4px #ffffff, 0 0 0 6px #ffe125;
}
.card__color--blue {
  background-color: #0c5cdd;
}
.card__color-input--blue:checked + .card__color--blue {
  box-shadow: 0 0 0 4px #ffffff, 0 0 0 6px #0c5cdd;
}
.card__color--green {
  background-color: #31b55c;
}
.card__color-input--green:checked + .card__color--green {
  box-shadow: 0 0 0 4px #ffffff, 0 0 0 6px #31b55c;
}
.card__color--pink {
  background-color: #ff3cb9;
}
.card__color-input--pink:checked + .card__color--pink {
  box-shadow: 0 0 0 4px #ffffff, 0 0 0 6px #ff3cb9;
}
.card--edit .card__img-wrap--empty .card__img {
  width: 45px;
  height: 45px;
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
.card--edit .card__repeat-days-inner {
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 3px;
}
.card--edit .card__repeat-day {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  font-size: 12px;
  border: 1px solid #e3dede;
  color: #e3dede;
  cursor: pointer;
}
.card--edit .card__repeat-day:hover {
  background-color: rgba(227, 222, 222, 0.2);
}
.card__repeat-day-input:checked + .card__repeat-day {
  color: #000000;
  border-color: #000000;
}
.card--edit .card__status-btns {
  display: flex;
  flex-direction: column;
  margin-top: auto;
}
.card--edit .card__save {
  display: flex;
  justify-content: center;
  border: 1px solid #000000;
  font-size: 14px;
  padding: 5px 0;
  text-transform: uppercase;
  cursor: pointer;
  background-color: transparent;
}
.card__save:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.card--edit .card__delete {
  display: flex;
  border: 0;
  padding: 5px 0;
  margin: 0;
  background-color: transparent;
  justify-content: center;
  margin-top: 5px;
  color: red;
  text-transform: uppercase;
  font-size: 10px;
  cursor: pointer;
  border: 1px solid red;
}

.card--edit .card__delete:hover {
  opacity: 0.6;
  background-color: rgba(255, 0, 0, 0.1);
}
</style>
