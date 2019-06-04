import * as API from './base'
export default {
	// 根据code判断是否是会员
	getCode(code){
	 return API.GET('/api/member/getMemberinfo',{code:code})
	},
	// 获取用户信息并且注册会员  
	weCatLogin(params){	
		return API.GET('/api/member/weChatLogin',params)
	},
	//获取商品分类 
	getGoodCart(){
		return API.GET('/api/goodCat/twoCats')
	},
	// 获取地区分类
	getRegin(){
		return API.GET('/api/goodCat/region')
	},
	// 获取首页推荐商品
	getRecommendGood(params){
		return API.GET(`/api/good/goods`,params)
	},
    // 获取首页banner图和公告
    getbannerAndMessage(){
    	return API.GET('/api/advertisement/getIndexImage')
    },
    // 获取根分类
    getRootKind(){
    	return API.GET(`/api/goodCat/cats`)
    },
    // 获取小程序全局设置
	getConfig(){
		return API.GET('/api/member/getGlobalConfig')
	},
	// 获取单品秒杀商品
	getseckill(params){
		return API.GET('/api/good/seckill',params)
	}
	
}