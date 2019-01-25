<template>
  <div>
    <div class="rec-li clr" v-for="(item , index) in catGoodRecommend"  :key="item.id">
      <div class="img fl"><img :src="item.thumbnail" /></div>
      <div class="rec-center fl">
        <div class="tit">{{item.title}}</div>
        <div class="name">{{item.goodName}}</div>
        <div class="present ">￥:{{item.price}}</div>
        <div class="original ">原价:{{item.showPrice}}元</div>
        <!-- <div v-if="item.isshow" class="dianzhan">点赞:{{item.dianzhan}}</div> -->
      </div>
      <div class="rec-right fr">
        <div class="clr"><div class="make fr">免预约</div></div>
        <!-- <div class="people ">{{item.people}}</div> -->
        <div class="sell ">已售:{{item.showSales}}</div>
      </div>
    </div>
  </div>
 
</template>
<script> 
  export default {
    props: ['catGoodRecommend'],
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
.rec-li {
  padding-bottom: 16px;
  margin-top: 16px;
  border-bottom: 1px solid #dedede;
  .img {
    width: 80px;
    height: 80px;
    overflow: hidden;
    img {
      border-radius: 5px;
      width: 100%;
      height: 100%;
    }
  }
  .rec-center {
    width: 176px;
     line-height: 20px;
    overflow: hidden;
    padding-left: 12px;
    box-sizing: border-box;
    .tit {
      font-size: 15px;
      color: #111111;
    }
    .name {
      font-size: 12px;
      color: #999999;
    }
    .present {
      color: #ff0000;
      font-size: 17px;
    }
    .name {
      font-size: 12px;
      color: #999999;
    }
    .original {
      text-decoration: line-through;
      color: #999999;
      font-size: 12px;
    }
    .dianzhan {
      width: 68px;
      height: 15px;
      color: #ffb10f;
      border: 1px solid #ffb10f;
      border-radius: 5px;
      text-align: center;
      line-height: 15px;
      font-size: 11px;
      font-family: "宋体";
    }
  }
  .rec-right {
    width: 70px;
    line-height: 24px;
    overflow: hidden;
    text-align: right;
    .make {
      font-size: 10px;
      color: #4aa9fe;
      width: 40px;
      height: 15px;
      border-radius: 5px;
      border: 1px solid #4aa9fe;
      line-height: 15px;
      text-align: center;
      margin-top: 8px;
    }
    .people {
      color: #999999;
      font-size: 12px;
    }
    .sell {
      color: #666666;
      font-size: 12px;
    }
  }
}
</style>
