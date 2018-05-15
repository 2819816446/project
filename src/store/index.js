import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import mutations from './mutations.js'
import getters from './getters.js'
import actions from './actions.js'

Vue.use(Vuex)

// import vue/vuex v需要小写  踩过坑


// 导出 以便注入到main.js
export default new Vuex.Store({
	state,
	mutations,
	getters,
	actions,
});
