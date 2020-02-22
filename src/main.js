import Vue from 'Vue'
import App from './App'

// 引入路由器
import router from './router/index'
import VueRouter from 'vue-router'
// 引入iview
import 'view-design/dist/styles/iview.css'
// 引入字体图标文件
import './common/css/style.css'

Vue.use(VueRouter)
let vm = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
Vue.use({
  vm
})
