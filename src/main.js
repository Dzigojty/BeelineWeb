import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { register } from 'swiper/element/bundle';
import VueTheMask from 'vue-the-mask';
import VueCookies from 'vue-cookies';
import { createPinia } from 'pinia';
import YmapPlugin from 'vue-yandex-maps';

const settings = {
  apiKey: '4a56995b-c087-4e6c-80f8-174e8c052bc4', // Ваш токен API
  lang: 'ru_RU', // Язык карты
  coordorder: 'latlong', // Координаты в формате "широта, долгота"
  debug: false, // Включить или выключить отладку
  version: '2.1', // Версия API Yandex.Maps
};


// register Swiper custom elements
register();

const app = createApp(App);
const pinia = createPinia();
app.use(pinia); // Инициализация Pinia
app.use(router);
app.use(YmapPlugin, settings); // Регистрируем плагин Yandex Maps

// Регистрируем директиву маски
app.use(VueTheMask);



// Правильное подключение плагина vue-cookies
app.use(VueCookies);

app.mount('#app')

