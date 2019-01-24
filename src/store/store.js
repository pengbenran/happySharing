import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
 
export default new Vuex.Store({
  state:{
  	userInfo:{},
  	config:{},
    goodDetail:{},
    codeUnionid:'',
    appointment:{}
  },
  mutations:{
   storeUserInfo(state,userInfo){
   	state.userInfo=userInfo
   },
   storeConfig(state,config){
   	state.config=config
   },
   stateGoodDetail(state,goodDetail){
    state.goodDetail=goodDetail
   },
   statecodeUnionid(state,codeUnionid){
    state.codeUnionid=codeUnionid
   },
   stateappointment(state,appointment){
    state.appointment=appointment
   }
}
})