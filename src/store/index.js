import Vue from 'vue'
import Vuex from 'vuex'
import action from './action'
import state from './state'
import mutations from './mutations'
import getters from "./getters";
Vue.use(Vuex)
export default new Vuex.Store({
  action,
  state,
  mutations,
  getters
})
