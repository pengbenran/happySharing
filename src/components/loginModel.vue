 <template>
  <div class='mode' v-if="isMember">
    <div class='bcg'></div>
    <div class='loginmodel'>
      <div class='title'>需要您的授权</div>
      <div class='modeltip'>为了提供更好的服务请在稍后的提示框中点击允许</div>
      <button class='modelbtn' open-type="getUserInfo"  @getuserinfo="getUserInfo" :disable="isSubmit">我知道了</button> 
    </div> 
  </div>
</template>

<script>
import Api from "@/api/home";
import store from '@/store/store'
export default {
  props: [],
  data () {
    return {
       isMember:false,
       isSubmit:false
    }
    },
    mounted(){
 
    },
    methods: {
    getUserInfo(){   
      var that = this 
      that.isMember=false
      if(that.memberId=="00"){
       that.isSubmit=true
       wx.login({
        success: res => {
           let code=res.code   
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (code) { 
             wx.getUserInfo({
              success: function (res_user) {
                res_user.userInfo.code=code
                Api.weCatLogin(res_user.userInfo).then(function(res){
                  if(res.code==0){
                    that.isSubmit=false
                    that.userLogin()
                    if(wx.getStorageSync('distribeId')==null){

                    }
                    else{
                      Api.promotion(res.data.memberId,wx.getStorageSync('distribeId')).then(function(res){
                       
                      })
                    }
                  }
                }) 
              }
            }) 
           }
         }
       })
     }
   },
  userLogin(){
    return new Promise((resolve, reject) => {
      let that=this
      wx.showLoading({
        title: '加载中',
      })
      wx.login({
        success: function (res) {
          if (res.code) {
            Api.getCode(res.code).then(function(memberRes){
              if(memberRes.code!=500){
                wx.setStorageSync('Token', memberRes.token)
                wx.setStorageSync('memberId', memberRes.memberDo.id)
                store.commit("storeUserInfo",memberRes.memberDo)
              }
              else {
                let memberId="00"
                that.memberId=memberId
                wx.setStorageSync('memberId', "00")
                that.isMember=true
              }
              resolve()
            })
          }
        }
      }) 
    })
    
  },
}
}
</script>

<style  scoped lang='less'>
/* 登录模态框 */
.mode{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
}
.bcg{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
}
.loginmodel{
  border-radius:10rpx; 
  width: 60%;
  height: 260rpx;
  background: #fff;
  position: absolute;
  top: 500rpx;
  left: 20%;
}
.title{
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
}
.modeltip{
  width: 90%;
  margin: 0 auto;
  font-size: 0.8em;
  text-indent: 20px;
  color: #8a8a8a;
  height: 100rpx;
}
.modelbtn{
  border: none;
  outline: 0;
  text-align: right;
  background: #fff;
  color: #3494ff
}
button::after {
  border: none;
}

</style>