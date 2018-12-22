<template>
  <div class="kind">
    <div class="kindList"  v-for="(item,index) in kind_item" style="background:#FEB2B6">
      <div class="kindIntro">
        <div class="tipIcon"><img :src="item.kindicon"></div>
        <div class="kindname oneover">{{item.kindname}}</div>
        <div class="kinddetail oneover">{{item.kindintro}}</div>
      </div>
      <div class="rightImg">
        <img :src="item.kindImg" mode="widthFix">
      </div>
    </div>
  </div>
  
</template>
<script>
export default {
  props: ['kind_item'],
  data () {
    return {
    
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
  .kind{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .kindList{
      width:48%;
      margin-bottom:5px; 
      display: flex;
      font-size: 0.8em;
      justify-content: space-between;
      position: relative;
      overflow:hidden;
      .kindIntro{
         .tipIcon{
          width:40px;
          height:20px;
          overflow: hidden;
         }
         .kindname,.kinddetail{
          height:35px;
          line-height: 35px;
          width:100px;
          padding-left: 5px;
          box-sizing: border-box;
         }
         .kinddetail{
           color: #FE494D;
         }
      }
      .rightImg{
        width:100px;
        height:100px;
        border-radius: 50%;
        border: 1px solid #ddd;
        overflow: hidden;
        position: absolute;
        top:30px;
        right: -10px;
      }
    }
  }
</style>
