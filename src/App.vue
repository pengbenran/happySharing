<script>
// import store from './store/store'
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
     //在页面加载时读取sessionStorage里的状态信息
    // if ( wx.getStorageSync("store") ) {
    //     this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    // } 
    // //在页面刷新时将vuex里的信息保存到sessionStorage里
    // wx.setStorageSync("store",JSON.stringify(this.$store.state))
  
  }
}
</script>

<style lang="less">
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
   margin: 0;
  padding: 0;
}
@font-face {
  font-family: 'iconfont';  /* project id 977244 */
  src: url('//at.alicdn.com/t/font_977244_aiq2pqqbrbb.eot');
  src: url('//at.alicdn.com/t/font_977244_aiq2pqqbrbb.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_977244_aiq2pqqbrbb.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_977244_aiq2pqqbrbb.woff') format('woff'),
  url('//at.alicdn.com/t/font_977244_aiq2pqqbrbb.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_977244_aiq2pqqbrbb.svg#iconfont') format('svg');
}

.iconfont{
  font-family: 'iconfont';
  vertical-align: middle; 
}


.fontHidden{
  white-space:normal;overflow: hidden;display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;
}

.fontHidden1{
  white-space:normal;overflow: hidden;display: -webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;
}
.oneover{
  overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
}
img{
  width: 100%;
  height: 100%;
  display: inline-block;
}
  /*浮动*/
  
  .fl {
    float: left;
  }
  
  .fr {
    float: right;
  }
  /*清除浮动*/
  
  .clr {
    &:after {
      content: "";
      display: block;
      clear: both
    }
    zoom:1
  }
  /*中间居中*/
  
  .centered {
    width: 95%;
    margin: 0 auto;
  }
  /*隐藏滚动条*/
  
   ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
</style>
