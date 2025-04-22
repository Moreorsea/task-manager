import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Notifications from '@kyvg/vue3-notification'

const pinia = createPinia();

createApp(App).use(router).use(pinia).use(Notifications).mount('#app');
