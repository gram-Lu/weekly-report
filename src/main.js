import Vue from 'Vue'
import App from './App'
let vm = new Vue({
  el: '#app',
  render: h => h(App)
})
Vue.use({
  vm
})
