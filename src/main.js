import { createApp } from 'vue'
import 'bootstrap-icons/font/bootstrap-icons.css'

import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

const app =createApp(App)

const pinia = createPinia()
app.use(pinia) 
app.use(router)
app.mount('#app')
