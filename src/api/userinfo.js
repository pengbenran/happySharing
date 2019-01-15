import * as API from './base'
export default {
	// 获取会员资料
	memberInfo(params){
		return API.GET('/api/myself/personalInformation',params)
	},
	// 修改会员资料
	memberInfoUpdate(params){
		return API.POST('/api/myself/updateInformation',params)
	}
}