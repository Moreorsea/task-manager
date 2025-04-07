<template>
   <section class="main__control control container">
        <h1 class="control__title">TASKMANAGER</h1>
        <section class="control__btn-wrap">
          <input
            type="radio"
            name="control"
            id="control__new-task"
            class="control__input visually-hidden"
          />
          <label for="control__new-task" class="control__label control__label--new-task"
            >+ ADD NEW TASK</label
          >
          <router-link to="/tasks" class="control__label">TASKS</router-link>

          <router-link to="/statistics" class="control__label">STATISTICS</router-link>
        </section>
      </section>
</template>

<style lang="less" scoped>
.main__control {
  margin-bottom: 8px;
}

.control {
  position: relative;
  display: flex;
  align-items: baseline;

  &__btn-wrap {
  display: flex;
  width: 100%;
}

&__title {
  font-size: 16px;
  line-height: 23px;
  margin-top: 0;
  margin-bottom: 0;
}

&__label {
  font-size: 16px;
  display: inline-flex;
  font-weight: normal;
  color: inherit;
  text-decoration: none;
  margin-left: 54px;
  cursor: pointer;

  &:hover {
  opacity: 0.7;
  transition: opacity 0.3s ease-out;
}
}
}
.control__input:checked + .control__label {
  text-shadow: 1px 0 0 #000000;
}
.control__input:checked + .control__label:hover {
  opacity: 1;
  text-shadow: 1px 0 0 #000000;
  cursor: inherit;
}
.control__label--new-task {
  margin-right: auto;
}

.router-link-active {
  font-weight: bold;
}
</style>
