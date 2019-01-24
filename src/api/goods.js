import * as API from './base'
export default {
	// 根据商品id获取商品详细数据
	getGoodDetail(goodId){
		return API.GET(`/api-good/api/good/${goodId}`)
	},
	// 获取地区分类下的推荐商品列表
	getkindGood(pageNum,pageSize,params){
		return API.GET(`/api-good/api/good/cat/${pageNum}/${pageSize}`,params)
	},
	// 获取地区分类下的商品分类下的商品
	getRegionKindGoods(pageNum,pageSize,params){
		return API.GET(`/api-good/api/good/region/cat/${pageNum}/${pageSize}`,params)
	},
	// 获取分类下的地区下的商品
	getRegionGoods(pageNum,pageSize,params){
		return API.GET(`/api-good/api/good/region/${pageNum}/${pageSize}`,params)
	},
	// 获取预约商品数据
	getBookGood(pageNum,pageSize,params){
		return API.GET(`/api-good/api/good/book/${pageNum}/${pageSize}`,params)
	},
	// 获取预约商品数据详细
	getBookGoodDetail(params){
		return API.GET(`/api-good/api/goodBook/good`,params)
	},
	// 获取分类下的banner图
	getTypeImg(type,sort){
		return API.GET(`/api-base/index/TypeImg/${type}/${sort}`)
	}

}