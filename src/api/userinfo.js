import * as API from './base'
export default {
	// 获取会员资料
	memberInfo(params){
		return API.GET('/api-member/api/myself/personalInformation',params)
	},
	// 修改会员资料
	memberInfoUpdate(params){
		return API.POST('/api-member/api/myself/updateInformation',params)
	},

	//获取会员的标签
	getUserLable:params => {
		return API.GET('/api-member/api/distribe/getTagList',params)
	}
}