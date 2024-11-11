import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createYmaps } from 'vue-yandex-maps';
import { register } from 'swiper/element/bundle';
import VueTheMask from 'vue-the-mask';
import VueCookies from 'vue-cookies';

// register Swiper custom elements
register();

const app = createApp(App);

const settings = {
  apiKey: '6e8b0885-8405-4bf3-b552-546dd840e044',
  lang: 'ru_RU',
  importModules: ['@yandex/ymaps3-controls@0.0.1'],
  coordorder: 'latlong',
}
app.use(createYmaps, settings);
app.use(router);

// Регистрируем директиву маски
app.use(VueTheMask);



// Правильное подключение плагина vue-cookies
app.use(VueCookies);

app.mount('#app')

