import Vue from "vue"
import Vuex from 'vuex'
import cartStore from './cart.js'
Vue.use(Vuex)
 const store = new Vuex.Store({
	modules:{
		cartStore
	} 
})

export default store

