import * as API from './base'
export default {
 get_SearchGoods: params => {
     return API.GET('/api/good/goods',params)
 }
}