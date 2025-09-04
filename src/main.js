import './assets/main.css'
import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import * as lucide from 'lucide-vue-next'
import router from './router'

const app = createApp(App)

Object.keys(lucide).forEach((iconName) => {
  createApp(App).component(iconName, lucide[iconName])
})

app.use(router)
app.mount('#app')



// Register all Lucide icons globally

