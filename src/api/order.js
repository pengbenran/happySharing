import * as API from './base'
export default {
// 订单提交
 orderSave:params=>{
 	return API.POST('/api-order/api/order/prepayOrder', params)
 },
 prepay:params=>{
 	return API.GET('/api-order/api/order/prepay', {params:JSON.stringify(params)})
 },
 // 修改订单状态
 payOrder:params=>{
	return API.PUT('/api-order/api/order/payOrder', params)
 },
 getQRCode:params=>{
 	return API.GET('/api-member/api/login/getQRCode', params)
 },


 //获取订单
 getOrderList:params => {
	 return API.GET('/api-order/api/order/orderStatus',params)
 },

 //取消订单
 quxiaoOrder:params => {
	 return API.PUT('/api-order/api/order/orderCancel',params)
 },

 deleteOrder:params => {
	return API.DELETE(`/api-order/order/remove?orderId=`+params)
 }


}      