import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    App.component(key, component)
}
App.use(store).use(router).use(VueAxios, axios).use(ElementPlus).mount('#app')
