<template>
  <div class="container">
    <div class=""><span>{{msg}}</span></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg:"ewrewr"
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
.container{
	width: 100px;background: red;height: 200px; 
	span{
		display: block;width: 100px;height: 100px;background-color: hotpink;
	}
} 

</style>
