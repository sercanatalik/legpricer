import Vue from 'vue'
import VueRouter from 'vue-router'
import LegPricer from '../views/LegPricer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: LegPricer
  },
  
]

const router = new VueRouter({
  routes
})

export default router
