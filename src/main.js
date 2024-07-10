import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createYmaps } from 'vue-yandex-maps';
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

const app = createApp(App);

app.use(createYmaps({
  apikey: '6e8b0885-8405-4bf3-b552-546dd840e044',
}));

app.use(router).mount('#app');
