
// 导入vue组件
import Vue from 'vue'
import index from './index.vue'

// 导入vue-router组件
import vueRouter from 'vue-router'
Vue.use(vueRouter)
import router from './router.js'

// 导入vue-resource组件
import vueResource from 'vue-resource'
Vue.use(vueResource)
Vue.http.options.root = 'http://localhost:9000/';
Vue.http.options.emulateJSON = true;

// 导入echarts包
import echarts from 'echarts'
Vue.use(echarts)
Vue.prototype.$echarts=echarts

// 引入elementUI
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

// 设置时间过滤器
Vue.filter('dateFormat', function(dateStr) {
  var dt = new Date(dateStr)
  var y = dt.getFullYear()
  var m = dt.getMonth() + 1
  var d = dt.getDate()
  var h = dt.getHours()
  var mm = dt.getMinutes()
  var ss = dt.getSeconds()

  return `${y}-${m}-${d} ${h}:${mm}:${ss}`
})

var vm = new Vue({
  el: '#index-container',
  data() {
    return {
      
    }
  },
  render: c => c(index),
  router: router
})