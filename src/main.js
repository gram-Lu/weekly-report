import Vue from 'Vue'
import App from './App'
import Vuex from 'vuex'
// 引入路由器
import router from './router/index'
import VueRouter from 'vue-router'
import store from './store/index'
// 引入iview
import 'view-design/dist/styles/iview.css'
import ViewUI from 'view-design'
// 引入字体图标文件
import './common/css/style.css'
import {Modal} from 'iview'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'

Vue.use(VXETable)
Vue.use(VueRouter)
Vue.prototype.$Modal = Modal
Vue.use(Vuex)
Vue.use(ViewUI)
let vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
Vue.use({
  vm
})
