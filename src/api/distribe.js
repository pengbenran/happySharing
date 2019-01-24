import * as API from './base'
export default {
 myTeamIndex:params=>{
 	return API.GET('/api-member/api/distribe/myTeamIndex',params)
 },
 // 判断是否提交过申请
 judgeApply:params=>{
 	return API.GET('/api-member/api/distribe/judgeApply',params)
 },
 //提交申请
 submitApply:params=>{
 	return API.POST('/api-member/api/distribe/submitApply',{params:params})
 }
}