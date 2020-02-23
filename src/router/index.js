import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './../page/Home'
import Search from './../page/Search'
import Me from './../page/Me'
import Survey from './../page/Survey'
import WriteReport from './../page/WriteReport'
// 声明使用
Vue.use(VueRouter)
// 输出路由对象
export default new VueRouter({
  // 配置一级路由
  routes: [
    {
      name: 'writeReport',
      path: '/writeReport',
      component: WriteReport
    },
    {
      name: 'survey',
      path: '/survey',
      component: Survey
    },
    {
      name: 'search',
      path: '/search',
      component: Search
    },
    {
      name: 'me',
      path: '/me',
      component: Me
    },
    {
      name: 'home',
      path: '/home',
      component: Home
    },
    {
      path: '/',
      redirect: '/survey'
    }

  ]
})
