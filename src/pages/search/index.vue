<template>
	<div class="search">
        <div class="header">
            <div class="left"><input type="text" placeholder="请输入商品名称" v-model="FromStr"></div>
            <div class="right" @click="GetGoodList"><text>搜索</text></div>
        </div>
        <!--header end-->

    <div class="Lsit" v-if="List">
        <div class="item" v-for='(item,index) in List' :index='index' :key="item" @click="jumpGooddetail(item.id)">
            <div class="ItemImg"><img :src="item.thumbnail" mode='aspectFit'/></div>
            <div class="title">
                <div class="fontHidden">{{item.goodName}}</div>
            </div>
            <div class="Price"><text class="Pri">￥{{item.showPrice}}</text><text class="info">销量：{{item.showSales}}</text></div>
        </div>

        <div class="Tip"  v-show='List.length == 0'>{{tip}}</div>
    </div>
    <!--List end-->
	</div>
</template>

<script>
import Search from '@/components/search'
import API_SEARCH from '@/api/search'
import Lib from '@/utils/lib'
export default { 
    data() {
        return {
           FromStr:'',
           tip:'请搜索商品~~~~',
           List:[],
           total:5
        }

    },
    components: {
        Search
    },

    methods: {
        //点击搜索
        async GetGoodList(){
            let that = this;
            wx.showLoading({title: '加载中',})
            let data = {pageNum:1, pageSize:20,condition:that.FromStr}
            let res = await API_SEARCH.get_SearchGoods(data).catch(err => {
                Lib.showToast('失败','loading')
            })
            if(res != undefined){
                // Lib.showToast('成功','success')
                that.List = res.rows
                that.total = res.total
                that.tip = '抱歉暂无该商品'
            }else{
                Lib.showToast('失败','loading')
            }
            wx.hideLoading()
        },

        //点击跳转
        jumpGooddetail(goodsId){
            let that = this;
            wx.navigateTo({
              url: '../detail/main?goodsId='+goodsId
            })
        }
    
    },

    async mounted() {

    }
}
</script>

<style scoped lang="less">
img{
  width: 100%;
  height: 100%;
  overflow:hidden;
}
.search{min-height: 100vh;background: #f8f8f8;}

.header{display: flex;align-items: center;justify-content:space-between;padding: 20rpx;font-weight: 100;font-size: 32rpx;border-bottom: 1px solid #f4f4f4;background: #fff;
  .left{width: 84%;background: #f5f5f5;border-radius: 35rpx;padding-left: 18rpx;line-height: 65rpx;height: 65rpx;}
  .left input{height: 65rpx;}
  .right{width: 16%;text-align: center;}
  .right text{background: rgb(253,199,6);color: #fff;display: inline-block;padding: 10rpx 15rpx;font-size: 26rpx;border-radius: 10rpx;margin-left: 15rpx;}

}
.titile{display: flex;align-items: center;justify-content: space-between;font-weight: 100;font-size: 34rpx;color: #666;}
.TabList{padding: 10rpx 20rpx;border-bottom: 1px solid #f4f4f4;background: #fff;
  .tagList{display: flex;align-items: center;flex-wrap: wrap;margin-right: 20rpx;padding: 15rpx 0;}
  .tagList text{background: rgb(253,199,6);font-size: 24rpx;display: inline-block;padding: 5rpx 15rpx;color: #fff;} 
}



.Lsit{display: flex;align-items: center;justify-content: space-between;font-weight: 100;flex-wrap:wrap;
  .item{width: 49%;background: #fff;margin-bottom: 10rpx;}
  .ItemImg{height: 280rpx;padding: 25rpx;}
  .item .title{font-size: 30rpx;color: #666; height: 80rpx;padding: 10rpx;}
}

.Tip{font-weight: 100;text-align: center;color: rgb(141, 141, 141);margin: auto;padding-top: 20rpx;font-size: 32rpx;
  
}

.Price{display: flex;align-items: center;justify-content: space-between;padding: 15rpx;
     .Pri{font-size: 34rpx;color: rgb(253,199,6);}
     .info{font-size: 28rpx;color: rgb(167, 167, 167);}
}

</style>