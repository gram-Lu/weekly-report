import Vue from 'Vue'
import App from './App'
import Vuex from 'vuex'
// 引入路由器
import router from './router/index'
import VueRouter from 'vue-router'
import store from './store'
// 引入iview
import 'view-design/dist/styles/iview.css'
// import ViewUI from 'view-design'
// 引入字体图标文件
import './common/css/style.css'
import {Modal} from 'iview'
console.log(store)
Vue.use(VueRouter)
Vue.prototype.$Modal = Modal
Vue.use(Vuex)

let vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
Vue.use({
  vm
})
