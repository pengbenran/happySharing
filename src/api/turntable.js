import * as API from './base'
export default {
 // get_Turntable: params => {
 //     return API.GET('/api-good/api/turntable')
 // },

 //消耗积分
 // point_Consumption:params=>{
 //     return API.POST('/api-member/api/integral/consume',params)
 // },

 //获得积分
 // point_Obtain:params => {
 //     return API.POST('/api-member/api/integral/obtain',params)
 // },

 //获得积分商城商品
 point_Shop:params => {
     return API.GET('/api/integralGood/list',params)
 },

 //积分商品详情
 PoinDetail_Shop:params => {
     return API.GET('/api/integralGood/pointGoodDetails',params)
 },

 //提交订单扣除商品积分
 submit_ShopOrder:params => {
     return API.POST('/api-member/api/integral/buy',params)
 },

 //提交积分商品订单
 submin_pointOrder:params => {
     return API.POST('/api/order/pointOrderSave',params)
 },

 //提交订单支付成功
 submint_OrderSuccess:params => {
     return API.PUT('/api/order/pointPassOrder',params)
 }


}