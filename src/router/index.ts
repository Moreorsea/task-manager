import { useTasksStore } from '@/stores/tasks';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import('../pages/Tasks.vue'),
    beforeEnter: (to, from, next) => {
      const tasksStore = useTasksStore();
      tasksStore.resetPageSize();
      next();
    },
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: () => import('../pages/Statistics.vue'),
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
