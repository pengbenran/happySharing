// import Fly from "flyio/dist/npm/wx";
import http from "./http.js"
// let fly=new Fly
// fly.interceptors.request.use((request) => {
//     request.timeout = 30000;
//     if (wx.getStorageSync('token')) {//检查本地缓存是否有token存在没有则重新获取
//         request.headers = {//设置请求头
//             "Authorization": wx.getStorageSync('token')
//         }
//         return request;
//     } else {
//         fly.lock();//锁住请求
//         return app.Load().then(res => {//重新获取token
//             request.timeout = 30000,
//                 request.headers = {//设置请求头
//                     "content-type": "application/json",
//                     "token": wx.getStorageSync('Token')
//                 }
//             wx.showLoading({
//                 title: "加载中",
//                 mask: true,
//             });
//             fly.unlock();//解锁请求
//             return request;//继续之前的请求
//         })
//     }
// })
 export default class Api{
  constructor() {
   // this.baseUrl = "https://www.guqinjiujiang.xyz:8444/guoranhuiwei"
     // this.baseUrl = "https://www.etuetf.com"
     // this.baseUrl = "http://192.168.2.131:8011" 
     this.baseUrl = "http://192.168.2.111:8002" 

     // this.baseUrl = "http://192.168.2.111/guoranhuiwei" 
     // this.baseUrl = "http://192.168.2.131:8080/guoranhuiwei" 

    // this.baseUrl = "http://192.168.2.131/guoranhuiwei" 
    // this.fly = new Fly;
    // this.fly.config.baseUrl=
  }
  // 根据code判断是否是会员
  getCode(){
   return new Promise((resolve, reject) => {
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          let memberRes=that.fly.get(that.baseUrl +'/api/byCode',{code:res.code})
          resolve(memberRes) 
        }
      }
    })
  })
 }
 // 获取令牌
 getToken(openId){
   return new Promise((resolve, reject) => {
    var that = this;
    let tokenRes=that.fly.get(that.baseUrl +'/api/getToken',{openId:openId})
    resolve(tokenRes) 
  })
 }
  // 获取用户信息并且注册会员
  weCatLogin(code,avatarUrl,nickName,gender,country,province,city){
    return new Promise((resolve, reject) => {
      let weLoginRes=this.fly.get(this.baseUrl +'/api/weChatLogin',{
                      code: code,//获取openid的话 需要向后台传递code,利用code请求api获取openid
                      headurl:avatarUrl,//这些是用户的图片信息
                      nickname:nickName,//获取昵称
                      sex:gender,//获取性别
                      country:country,//获取国家
                      province:province,//获取省份
                      city:city//获取城市
                    })
      resolve(weLoginRes) 
    })
  }
  // 获取会员信息
  getMemberInfo(memberId){
    return new Promise((resolve, reject) => {
      let userParms = {}
      userParms.memberId = memberId
      let userInfoRes=this.fly.get(this.baseUrl +'/api/member/memberIndex',{parms:JSON.stringify(userParms)})
      resolve(userInfoRes)
    })
  }
  //获取地区分类列表
getGoodCat(){
  return new Promise((resolve,reject)=>{
    let GoodCatRes=http.fly.get(this.baseUrl+'/api-good/api/goodCat')
    resolve(GoodCatRes)
  })
}

  // 获取商品分类列表

}
