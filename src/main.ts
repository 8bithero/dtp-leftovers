import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';
import './assets/fonts.css';

const app = createApp(App);
app.config.performance = true;
app.use(router).mount('#app');
