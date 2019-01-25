<template>
	<div class="content">
		<div class="seach"  @click="jumpsearch"><span class="iconfont">&#xe60b;</span>搜索商品</div>
	</div>	 
</template>
<script>
export default {
  data () {
    return {
     
    }
  },

  components: {
    
  },

  methods: {
  	jumpsearch(){
  		wx.navigateTo({
  			url: '../search/main'
  		})
  	}
  },

  created () {
    // 调用应用实例的方法获取全局数据
  }
}
</script>

<style scoped lang="less">
.content{
	width:100vw;
	height: 43px;
}
.seach{
	width: 250px;
	height:33px;
	background: #fafafa;
	border-radius: 5px;
	line-height: 33px;
	color: #9A9A9A;
	font-size: 12px;
	text-align: center;
	margin: 5px auto;
}

</style>
