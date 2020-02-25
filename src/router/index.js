import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './../page/Home'
import Search from './../page/Search'
import Me from './../page/Me'
import Survey from './../page/Survey'
import ManageStaff from '../page/ManageStaff'
import WriteReport from './../page/WriteReport'
import HistoryReport from './../page/HistoryReport'
import WriteWeekReport from "../page/WriteReportChild/WriteWeekReport";
console.log(WriteWeekReport)
// 声明使用
Vue.use(VueRouter)
// 输出路由对象
export default new VueRouter({
  // 配置一级路由
  routes: [
    {
      name: 'WriteReport',
      path: '/writeReport',
      component: WriteReport,
      children:[
        {
          name: 'WriteWeekReport',
          //注意二级路由path没有/
          path: 'writeWeekReport',
          component: WriteWeekReport
        }
      ]
    },
    {
      name: 'HistoryReport',
      path: '/historyReport',
      component: HistoryReport
    },
    {
      name: 'ManageStaff',
      path: '/manageStaff',
      component: ManageStaff
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
