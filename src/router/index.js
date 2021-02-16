import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Project from '../views/Projects.vue'
import Team from '../views/Team.vue'
import Login from '../views/Login.vue'
import {store} from '../store/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Project
  },
  {
    path: '/team',
    name: 'Team',
    component: Team
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (store.state.userAuth !== true && to.path !== '/login' && to.path !=='/') next('/login')
  else if (store.state.userAuth == true && to.path == '/login') next('/')
  else next()
})

export default router
