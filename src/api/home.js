import * as API from './base'
export default {
	// 根据code判断是否是会员
	getCode(code){		
	 return API.GetCode('http://192.168.2.208/api/login/byCode',{code:code})		
	},
	// 获取用户信息并且注册会员  
	weCatLogin(params){
		return API.getLogin('http://192.168.2.208/api/login/weChatLogin',params)
	},
	//获取商品分类
	getGoodCart(){
		return API.GET('/api-good/api/goodCat')
	},
	// 获取地区分类
	getRegin(){
		return API.GET('/api-good/api/region')
	},
	// 获取首页推荐商品
	getRecommendGood(pageNum,pageSize){
		return API.GET(`/api-good/api/good/index/${pageNum}/${pageSize}`)
	},
    // 获取首页banner图和公告
    getbannerAndMessage(){
    	return API.GET('/api-base/index/bannerAndMessage')
    }
}