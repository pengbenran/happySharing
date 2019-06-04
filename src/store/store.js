import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
 
export default new Vuex.Store({
  state:{
  	userInfo:{},
  	config:{},
    goodDetail:{},
    codeUnionid:'',
    appointment:{},
    UserTagList:[],
    goodsId:'',
    distribInfo:{},
  },
  mutations:{
   storeUserInfo(state,userInfo){
   	state.userInfo=userInfo
   },
   storeConfig(state,config){
   	state.config=config
   },
   storeDistribInfo(state,distribInfo){
    state.distribInfo=distribInfo
   },
   stateGoodDetail(state,goodDetail){
    state.goodDetail=goodDetail
   },
   statecodeUnionid(state,codeUnionid){
    state.codeUnionid=codeUnionid
   },
    stategoodsid(state,goodsId){
    state.goodsId=goodsId
   },
   stateappointment(state,appointment){
    state.appointment=appointment
   },
   stateUserTagList(state,UserTagList){
    state.UserTagList = UserTagList
   }
}
})