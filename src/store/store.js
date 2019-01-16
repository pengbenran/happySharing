import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
 
export default new Vuex.Store({
  state:{
  	userInfo:{},
  	config:{}
  },
  mutations:{
   storeUserInfo(state,userInfo){
   	state.userInfo=userInfo
   },
   storeConfig(state,config){
   	state.config=config
   }
}
})