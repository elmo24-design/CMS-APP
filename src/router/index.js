import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Archive from '../views/Archive.vue'
import Dashboard from '../views/Dashboard.vue'
import Expenses from '../views/Expenses.vue'
import Details from '../views/Details.vue'
import Welcome from '../views/Welcome.vue'

Vue.use(VueRouter)

import {projectAuth} from '../firebase/config'

const requireAuth = (to, from, next) => {
   let user = projectAuth.currentUser
   if(!user){
      next({ name: 'Login'})
   }else{
      next()
   }
}
const requireNoAuth = (to, from, next) => {
   let user = projectAuth.currentUser
   if(user){
      next({ name: 'Home'})
   }else{
      next()
   }
}

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    beforeEnter: requireNoAuth
  },
  {
    path: '/clients',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: Signup,
    beforeEnter: requireAuth
  },
  {
    path: '/archive',
    name: 'Archive',
    component: Archive,
    beforeEnter: requireAuth
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: requireAuth
  },
  {
    path: '/expenses',
    name: 'Expenses',
    component: Expenses,
    beforeEnter: requireAuth
  },
  {
    path: '/details/:id',
    name: 'Details',
    component: Details,
    props: true,
    beforeEnter: requireAuth
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
