import './assets/main.css'
import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import * as lucide from 'lucide-vue-next'
Object.keys(lucide).forEach((iconName) => {
  createApp(App).component(iconName, lucide[iconName])
})

createApp(App).mount('#app')

// Register all Lucide icons globally

