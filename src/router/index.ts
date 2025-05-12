import { useTasksStore } from '@/stores/tasks';
import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import('../views/TasksView.vue'),
    beforeEnter: (to, from, next) => {
      const tasksStore = useTasksStore();
      tasksStore.resetPageSize();
      next();
    },
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: () => import('../views/StatisticsView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/tasks',
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
