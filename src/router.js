import vueRouter from 'vue-router'

import login from './Components/loginComponent/login.vue'
import register from './Components/loginComponent/register.vue'
import setPassword from './Components/loginComponent/setPassword.vue'

import success from './success.vue'


var router = new vueRouter({
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/login', component: login},
    {path: '/register', component: register},
    {path: '/setPassword', component: setPassword}, 
    {path: '/success', component: success},
  ]
})

export default router