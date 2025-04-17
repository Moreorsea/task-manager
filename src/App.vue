<template>
  <Header />

  <router-view />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import Header from './components/Header.vue';
import { useTasksStore } from './stores/tasks';

const tasksStore = useTasksStore();

onMounted(async () => {
  await tasksStore.fetchTasks();
});
</script>

<style>
#app {
  padding-top: 50px;
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
@font-face {
  font-family: 'HelveticaNeueCyr';
  src:
    local('HelveticaNeueCyr-Bold'),
    url('@/fonts/HelveticaNeueCyr-Bold.woff2') format('woff'),
    url('@/fonts/HelveticaNeueCyr-Bold.woff') format('woff');
  font-weight: bold;
  font-style: normal;
}

@font-face {
  font-family: 'HelveticaNeueCyr';
  src:
    local('HelveticaNeueCyr-Medium'),
    url('@/fonts/HelveticaNeueCyr-Medium.woff2') format('woff2'),
    url('@/fonts/HelveticaNeueCyr-Medium.woff') format('woff');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'HelveticaNeueCyr';
  src:
    local('HelveticaNeueCyr-Roman'),
    url('@/fonts/HelveticaNeueCyr-Roman.woff2') format('woff2'),
    url('@/fonts/HelveticaNeueCyr-Roman.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

body {
  font-family: 'HelveticaNeueCyr', Arial, sans-serif;
}

.container {
  width: 960px;
  padding: 0 20px;
  margin: 0 auto;
}

.visually-hidden {
  position: absolute !important;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  padding: 0 !important;
  border: 0 !important;
  height: 1px !important;
  width: 1px !important;
  overflow: hidden;
}

.main {
  padding-top: 50px;
  padding-bottom: 20px;
}
</style>
