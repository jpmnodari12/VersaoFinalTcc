import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Dispositivos from './views/Dispositivos.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: { title: 'Dashboard' },
      component: Dashboard
    },
    {
      path: '/dispositivos',
      name: 'dispositivos',
      meta: { title: 'Dispositivos' },
      component: Dispositivos
    },
    {
      name: 'Login',
      path: '/login',
      meta: { title: 'Login' },
      component: () => import(/* webpackChunkName: "login" */ './pages/login/Login')
    },
    {
      name: 'Register',
      path: '/register',
      meta: { title: 'Register' },
      component: () => import(/* webpackChunkName: "register" */ './pages/register/Register')
    }

  ]
})
