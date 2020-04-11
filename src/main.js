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
import axios from './config/axios'
import local from './util/until'
import md5 from 'js-md5';
// Vue.config.productionTip = false
Vue.prototype.$ajax=axios;
Vue.use(VXETable)
Vue.use(VueRouter)
Vue.prototype.$Modal = Modal
Vue.prototype.$md5 = md5
Vue.use(Vuex)
Vue.use(ViewUI)
Vue.use(local)
router.beforeEach((to, from, next)=>{
  console.log(to.meta.requireAuth)
  if(to.meta.requireAuth){
    console.log('进入判断')
    if(localStorage.getItem('token')){
      console.log('证明有token存在')
      next();
    }else{
      console.log('说明没有token存在')
      next({
        path:'/login',
        query:{redirect:to.fullPath}
      })
    }
  }else {
    next();
  }
})
let vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
Vue.use({
  vm
})
