import vueRouter from 'vue-router'


import success from './success.vue'


var router = new vueRouter({
  routes: [
    {path: '/', redirect: '/success'},
    {path: '/success', component: success}
  ]
})

export default router