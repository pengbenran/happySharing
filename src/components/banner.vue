<template>
	<div>
   <swiper class="swiper" indicator-dots='true' autoplay='true' indicator-color="rgba(255, 255, 255, .6)" indicator-active-color="#fff" >
    <swiper-item v-for="(item,index) in banner" :key='item' :index="index"><img :src="item.imageUrl" ></swiper-item>
  </swiper>
	</div>	 
</template>
<script>
export default {
  data () {
    return {
     banner:[{
      imageUrl:'/static/images/banner.png'
     },{
      imageUrl:'/static/images/banner.png'
     },{ 
      imageUrl:'/static/images/banner.png'
     }]
    }
  },

  components: {
    
  },
  
  methods: {
   
  },
 
  created () {
    // 调用应用实例的方法获取全局数据
  }
}
</script>

<style scoped lang="less">
.i_sw .wx-swiper-dot{
 
background-color:#fff;

}
img{
  width: 100%;
  height: 100%;
  display: block;
}
.swiper{
 height:90px;

}
</style>
