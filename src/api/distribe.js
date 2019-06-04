import * as API from './base'
export default {
 // 判断是否提交过申请
 judgeApply:params=>{
 	return API.GET('/api/distributor/apply',params)
 },
 //提交申请
 submitApply:params=>{
 	return API.POST('/api/distributor/apply',params)
 },
 //提现
 withdrawal:params=>{
 	return API.POST('/api/distributor/withdrawal/apply ',params)
 },
 // 获取推荐师奖金列表
 distributorLog:params=>{
 	return API.GET('/api/distributor/distributorLog',params)
 },
 // 积分日志
 poinLog:params=>{
 	return API.GET('/api/point/pointLog',params)
 },
  //获取所有分享师的等级
  GetDistributorData:params => {
  	return API.GET('/api/distributor/lvs',params)
  },
}