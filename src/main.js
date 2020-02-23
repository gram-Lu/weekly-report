import Vue from 'Vue'
import App from './App'

// 引入路由器
import router from './router/index'
import VueRouter from 'vue-router'
// 引入iview
import 'view-design/dist/styles/iview.css'
// 引入字体图标文件
import './common/css/style.css'
import {Modal} from 'iview'
Vue.use(VueRouter)
Vue.prototype.$Modal = Modal
let vm = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
Vue.use({
  vm
})
