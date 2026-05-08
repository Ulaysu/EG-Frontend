import './assets/main.css'
import './style.css'
import { createApp } from 'vue'
import{createPinia} from 'pinia'
import { useAuthStore } from './stores/authStore'
import App from './App.vue'
import * as lucide from 'lucide-vue-next'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

Object.keys(lucide).forEach((iconName) => {
  app.component(iconName, lucide[iconName])
})

app.use(pinia)
app.use(router)
const authStore = useAuthStore(pinia)

authStore.restoreSession().catch((error) => {
  console.error('Failed to restore auth session:', error)
}).finally(() => {
  app.mount('#app')
})



// Register all Lucide icons globally

