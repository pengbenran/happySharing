import * as API from './base'
export default {
	// 根据商品id获取商品详细数据
	getGoodDetail(params){
		return API.GET(`/api/good/detail`,params)
	},
	// 获取地区分类下的商品分类下的商品
	getRegionKindGoods(params){
		return API.GET(`/api/good/goods`,params)
	},
	// 获取地区分类下的商品(非推荐)
	getRegionGood(params){
		return API.GET('/api/good/recommendGood',params)
	},
	// 获取地区分类下的商品(推荐)
	getRegionGoods(params){
		return API.GET('/api/good/offerGoods',params)
	},
	// 获取预约商品数据
	getBookGood(params){
		return API.GET(`/api/good/reserveGood`,params)
	},
	// 获取预约商品数据详细
	getBookGoodDetail(params){
		return API.GET(`/api/good/detail`,params)
	},
	// 获取预约商品预约时间详情
	getBookTime(params){
		return API.GET(`/api/good/books`,params)
	},
	// 获取分类下的banner图
	getKindImg(params){
		return API.GET('/api/goodCat/catsDetail',params)
	},
	// 获取区域下的banner图
	getRegionImg(params){
		return API.GET('/api/goodCat/regionDetail',params)
	},
	// 生成二维码
	GetQrcode(params){
		return API.GET('/api/member/publicQRCode',params)
	},
	// 获取根分类下的子分类
	getGoodCart(params){
		return API.GET('/api/goodCat/twoCats',params)
	},
	// 判断用户能否购买
	canBuy(params){
		return API.GET(`/api/good/tagMemberCount`,params)
	}

}