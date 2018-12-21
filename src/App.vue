<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
  }
}
</script>

<style>
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
  src: url('//at.alicdn.com/t/font_977244_j1md9p3seo.eot');
  src: url('//at.alicdn.com/t/font_977244_j1md9p3seo.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_977244_j1md9p3seo.woff') format('woff'),
  url('//at.alicdn.com/t/font_977244_j1md9p3seo.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_977244_j1md9p3seo.svg#iconfont') format('svg');
}
.iconfont{
  font-family: 'iconfont';
  vertical-align: middle; 
}
.oneover{
  overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
}
</style>
