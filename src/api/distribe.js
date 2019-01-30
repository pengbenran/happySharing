import * as API from './base'
export default {
 myTeamIndex:params=>{
 	return API.GET('/api-member/api/distribe/myTeamIndex',params)
 },
  myTeamList:params=>{
 	return API.GET('/api-member/clouddomember/member/getlist',params)
 },
 // 判断是否提交过申请
 judgeApply:params=>{
 	return API.GET('/api-member/api/distribe/judgeApply',params)
 },
 //提交申请
 submitApply:params=>{
 	return API.POST('/api-member/api/distribe/submitApply',{params:params})
 },
 //提现
 withdrawal:params=>{
 	return API.POST('/api-member/api/distribe/withdrawal',params)
 },
 getCommissionList:params=>{
	return API.GET('/api-member/distribe/commission/list',params)
 },
getWithdrawList:params=>{
	return API.GET('/api-member/distribe/withdraw/list',params)
 },
 // 判断还能否生成推荐师二维码
 canGetCode:params=>{
 	return API.GET('/api-member/api/distribe/generateCode',params)
 }
}