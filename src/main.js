import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index'

import Particles from "vue3-particles";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(Particles).use(store).use(router).use(ElementPlus).mount('#app')
