import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import state from './state'
import mutations from './mutations'
import getters from "./getters";
Vue.use(Vuex)
console.log(actions);
console.log(state);
console.log(mutations);
console.log(getters);
let store = new Vuex.Store({
  actions,
  state,
  mutations,
  getters
})
export default store
