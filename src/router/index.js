import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Library from '../views/Library.vue'
import Player from '../views/Player.vue'
const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/library', name: 'Library', component: Library },
    { path: '/player/:id', name: 'Player', component: Player, props: true }
  ]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router