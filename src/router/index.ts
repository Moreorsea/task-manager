import { useTasksStore } from '@/stores/tasks';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import(/* webpackChunkName: "about" */ '../views/TasksView.vue'),
    beforeEnter: (to, from, next) => {
      const tasksStore = useTasksStore();
      tasksStore.resetPageSize();
      next();
    },
  },
  {
    path: '/statistics',
    name: 'statistics',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/StatisticsView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
