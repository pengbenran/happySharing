import * as API from './base'
export default {
// 订单提交
 orderSave:params=>{
 	return API.POST('/api/order/save', params)
 },
 prepay:params=>{
 	return API.GET('/api/order/getPrepayId',params)
 },
 // 修改订单状态
 payOrder:params=>{
	return API.PUT('/api/order/passOrder', params)
 },
 getQRCode:params=>{
 	return API.GET('/api-member/api/login/getQRCode', params)
 },
 //获取订单
 GetOrderList:params => {
	 return API.GET('/api/order/selectOrderList',params)
 },
 // 获取订单详情
 getOrderDetail:params=>{
 	return API.GET('/api/order/orderInfo',params) 
 },
 //取消订单
 quxiaoOrder:params => {
	 return API.PUT('/api-order/api/order/orderCancel',params)
 },
// 删除订单
 deleteOrder:params => {
	return API.PUT(`/api/order/orderDele`,params)
 },
// 判断是能否核销
memberCancel:params=>{
	return API.GET('/api/order/memberCancel',params)
},
// 核销订单
orderCancel:params=>{
	return API.GET('/api/order/orderCancel',params)
},
// 预约订单
orderBook:params=>{
	return API.POST('/api/order/orderBook', params)
}

}      