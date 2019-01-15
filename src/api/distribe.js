import * as API from './base'
export default {
 myTeamIndex:params=>{
 	return API.GET('/api/distribe/myTeamIndex',params)
 }
}