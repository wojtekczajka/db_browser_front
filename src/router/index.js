import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import ResourcesView from '../views/ResourcesView.vue'
import UserView from '../views/UserView.vue'
import AuthView from '../views/AuthView.vue'
import BrowseView from '../views/BrowseView.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView
  },
  {
    path: '/resources',
    name: 'resources',
    component: ResourcesView
  },
  {
    path: '/profile',
    name: 'user',
    component: UserView
  },
  {
    path: '/browse',
    name: 'browse',
    component: BrowseView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router
