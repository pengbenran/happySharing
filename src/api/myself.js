import * as API from './base'

export default {
    getMyselt: params => {
        return API.GET('/api/myself/index',params)
    },

    //获取我的预约订单
    getBookList: params => {
        return API.GET('/api-good/api/goodBook/self',params)
    }
}