import * as API from './base'

export default {
    getMyselt: params => {
        return API.GET('/api/myself/index',params)
    }
}