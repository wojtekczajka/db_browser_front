import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import ResourcesView from '../views/ResourcesView.vue'
import UserView from '../views/UserView.vue'
import AuthView from '../views/AuthView.vue'
import BrowseView from '../views/BrowseView.vue'

const routes = [
  {
    path: '/db_browser_front/',
    name: 'main',
    component: MainView
  },
  {
    path: '/db_browser_front/auth',
    name: 'auth',
    component: AuthView
  },
  {
    path: '/db_browser_front/resources',
    name: 'resources',
    component: ResourcesView
  },
  {
    path: '/db_browser_front/profile',
    name: 'user',
    component: UserView
  },
  {
    path: '/db_browser_front/browse',
    name: 'browse',
    component: BrowseView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
