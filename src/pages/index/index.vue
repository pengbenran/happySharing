<<<<<<< HEAD
=======
<template>
  <div class="container">
    <div class="top">
      <div class="address"><span class="addressName oneover">南昌</span><span class="iconfont">&#xe60c;</span></div>
      <Search></Search>
    </div>
    <div class="banner">
      <Banner></Banner>  
    </div>
  </div>
</template>

<script>
import Search from '@/components/search'
import Banner from '@/components/banner'
export default {
  data () {
    return {
     
    }
  },

  components: {
    Search,
    Banner
  },

  methods: {
   
  },

  created () {
    // 调用应用实例的方法获取全局数据
  }
}
</script>

<style scoped lang="less">
.container{
	.top{
    display: flex;
  }
  .address{
    width: 80px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    .addressName{
      width: 55px;
      height:100%;
      display: inline-block;
    }
    .iconfont{
      vertical-align: top;
    }
  }
  .seach{
    width: 250px;
    height:50px;
    background: #fafafa;
    border-radius: 3px;
    line-height: 50px;
    color: #9A9A9A;
    font-size: 0.9em;
    text-align: center;
  }
} 

</style>
>>>>>>> becbd738855b71be4dc0400f4d1371d2642c7385
