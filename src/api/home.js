import * as API from './base'
export default {
	getGoodCat(){
		return API.GET('/api-good/api/goodCat')
	},
	// 根据code判断是否是会员
	getCode(code){		
	 return API.GetCode('http://192.168.2.208:8011/api/login/byCode',{code:code})		
	},
	// 获取用户信息并且注册会员  
	weCatLogin(params){
		return API.GET('/api/login/weChatLogin',params)
	}
}