import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();
createApp(App).use(router).mount('#app')
