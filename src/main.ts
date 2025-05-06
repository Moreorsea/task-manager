import { createPinia } from 'pinia';
import { createApp } from 'vue';
import Notifications from '@kyvg/vue3-notification';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';
import I18nextVue from 'i18next-vue';
import router from './router';
import App from './App.vue';
import i18next from './locales';

dayjs.extend(customParseFormat);

const pinia = createPinia();

createApp(App).use(router).use(pinia).use(Notifications).use(I18nextVue, { i18next }).mount('#app');
