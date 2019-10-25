import vueRouter from 'vue-router'

import login from './Components/loginComponent/login.vue'

import success from './success.vue'


var router = new vueRouter({
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/login', component: login},
    {path: '/success', component: success}
  ]
})

export default router