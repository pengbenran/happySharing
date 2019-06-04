<template>
	<div class="container">
		<blockquote v-if="!isLoading">
			<loading></loading>
		</blockquote>
		<blockquote v-else>
			<!-- 顶部导航 -->
		<Search></Search>
		<!-- banner图 -->
		<div class="banner">
			<Banner :banner='bannerList'></Banner>
		</div> 
		<!-- 积分商城 -->
		<div class="pointLogo" @click="jumpPointShop">  
			<img :src="globalConfig.pointImage" mode="aspectFit">
		</div>
		<!-- 地区列表 -->
		<div class="addressItem">
			<div class="addressItemList" v-for="(item,index) in addressItem" :key="item.id" @click="jumpAuro(item.id,item.name)">
				<!-- <navigator url="../../pages/auro/main"> -->
					<img :src="item.value" mode="widthFix">
					<span>{{item.name}}</span>
				<!-- </navigator> -->
			</div>
		</div>

		<!-- 菜单列表 -->
		<div class="menuItem">
			<div class="menuItemList" v-for="(item,index) in menuItem" :key="item.catId" @click="jumpgoodCart(item.catId,item.name)">
				<img :src="item.img" mode="widthFix">
				<span>{{item.name}}</span>
			</div>
		</div>
		
		<!-- 头条广告 -->
		<div class="adv">
			<!-- <div class="left">
				<img src="/static/images/tou.png">
			</div> -->
			<div class="right">
				<swiper class="swiper"  autoplay='true' vertical='true'>
					<swiper-item v-for="(item,index) in message" :key="item.id">
						{{item.name}}
					</swiper-item>
				</swiper>
			</div>
			
		</div>
		<!-- 分类列表 -->
		<kindTemplate :kind_item='kindItem'></kindTemplate>
		<!-- 单品秒杀 -->
		<div class="discount-wrap centered">
			<div class="title">新品秒杀</div>
		<div class="rec-li" v-for="(item,index) in seckillGood" :index='index' :key='item.goodId'>
			<div class="top" @click="topage(item.goodId)">
				<div class="img fl"><img :src="item.thumbnail" /></div>
				<div class="rec-center fl">
					 <div class="tit">{{item.title}}</div>
					<div class="name fontHidden">{{item.goodName}}</div>
					<div class="present ">￥{{item.price}}</div>
					<div class="original ">原价:{{item.showPrice}}元</div>
				</div>
			</div>

			<!-- <div class="bottom">
				<div class="left">
					{{item.upTimeString}}开抢
				</div>
				<div class="right" @click.stop="remind(index)" :style="{color:item.color,borderColor:item.color}"><span class="iconfont">&#xe616;</span>&nbsp;{{item.tip}}</div>
			</div>  -->
		</div>
	</div>
		<!--为你推荐-->
		<div class="discount-wrap centered">
			<div class="title">为你推荐</div>
			<!-- <day ref="day" :endtime="endtime"></day>	 -->
			<discount :discountList="discount" :wid="wid" :magleft="magleft" ref="discounts" :isflex='displayType'></discount>
			<nomoreTip v-if="!hasMore"></nomoreTip>
		</div>
		<div class="footer">
			<img src="https://shop.guqinet.com/html/images/shuiguo/index/footerImg.png"/>
		</div>
		</blockquote>
		<loginModel ref="loginModel" @getIndex='getIndex'></loginModel> 
	</div>

</template>

<script>
	import discount from '@/components/discount'
	import Search from '@/components/search'
	import Banner from '@/components/banner'
	import kindTemplate from '@/components/kindTemplate'
	import day from '@/components/day'
    import loginModel from "@/components/loginModel"; 
    import nomoreTip from "@/components/nomoreTip"
	import util from '@/utils/index'
	import loading from '@/components/loading'
	import Api from "@/api/home";
	import store from '@/store/store'
	// let api=new Api

	export default {
		data() {
			return {
				isLoading:false,
				displayType:'block',
				message:[],
				addressItem: [],
				menuItem: [],
				bannerList:[],
				kindItem: [],
				discount: [],
				seckillGood:[],
				wid: "100%",
				magleft: '0px',
				nowPage:1,
				hasMore:true,
				globalConfig:{}
			}
		},
		components: {
			Search,
			Banner,
			kindTemplate,
			discount,
			day,
			loginModel,
			nomoreTip,
			loading
		},
		methods: {
			jumpAuro:function(regionId,regionname){
				wx.navigateTo({url:`../auro/main?regionId=${regionId}&regionname=${regionname}`})
			},
			topage(goodId){
				let that = this;
				wx.navigateTo({url:`../detail/main?goodsId=${goodId}&codeUnionid=`})
			},
			// 获取全局配置
			getConfig(){
				let that=this
				Api.getConfig().then(function(res){
					if(res.code==0){
						that.globalConfig=res.globalConfigEntity
						store.commit("storeConfig",res.globalConfigEntity)
					}
				})
			},
			// 获取秒杀商品
			getseckill(){
				let params={}
				let that=this
				params.limit=6
				params.page=1
				Api.getseckill(params).then(function(res){
					that.seckillGood=res.page.rows
				})
			},
			jumpgoodCart:function(goodCatId,goodCatName){
				wx.navigateTo({url:`../goodCart/main?goodCatId=${goodCatId}&goodCatName=${goodCatName}`})
			},
			jumpPointShop:function(){
				wx.switchTab({
					url: '../welfare/main',  
				})
			},
			// 获取首页推荐商品
			async getRecommendGood(pages,limit){
				let that=this
				if(that.hasMore){
					let params={}
					params.page=pages
					params.limit=limit
					params.hot=1
					let RecommendGood=await Api.getRecommendGood(params)
					RecommendGood.page.rows.map(item=>{
						item.saveMoney=util.accSub(item.showPrice,item.price)	
					})
					if(RecommendGood.page.rows.length<limit){
						that.hasMore=false
					}
					that.discount=that.discount.concat(RecommendGood.page.rows)
				}
				else{
					wx.showToast({
						title:'没有更多数据了',
						icon:"none",
						duration:1500
					})
				}
			
			},

			// 获取地区列表
			async getIndex(){
				let that=this
				that.isLoading=true
				wx.hideTabBar({})
				that.discount=[]
				that.nowPage=1
				that.hasMore=true
				await that.$refs.loginModel.userLogin()
				let GoodCatRes=await Api.getGoodCart()
				that.menuItem=GoodCatRes.goodCats
				that.getRecommendGood(1,3)
	            // 获取根分类
	            let rootKindRes=await Api.getRootKind()
	            that.kindItem=rootKindRes.goodCats
				// 获取地区分类
				let reginRes=await Api.getRegin()
				that.addressItem=reginRes.region	
				// 获取首页banner和公告
			    // this.$refs.discounts.get()
			    let bannerAndMessageRes=await Api.getbannerAndMessage()
			    that.bannerList=bannerAndMessageRes.indexBanner
			    that.message=bannerAndMessageRes.headline
			    that.isLoading=true
			    wx.stopPullDownRefresh()
				},
		},
		onReachBottom:function(){
			let that = this;
			that.nowPage+=1
			that.getRecommendGood(that.nowPage,3)
		},
		onShareAppMessage: function () {
			withShareTicket: true
		},
		onPullDownRefresh: function(){
			let that=this
			that.getIndex()
		},
		mounted(){
			let that = this;
			that.getConfig()
			that.getseckill()
			that.getIndex()
		},
	}
</script>

<style scoped lang="less">
     
	/*隐藏滚动条*/
	 ::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}
	/*centered*/
	
	.centered {
		width: 95%;
		margin: 0 auto;
	}
	
	.index-title {
		font-size: 18px;
		color: #111111;
		margin: 24px auto 18px auto;
		font-weight: bold;
	}
	
	.container {
		.top {
			display: flex;
			align-items: center;
			padding: 9px 12px;
			span{
				display: block;
				&:nth-child(1),&:nth-child(2){
					font-size: 15px;
					color: #111111;
					font-weight: bold;
				}
				&:nth-child(2){
					font-size: 12px;
					margin-left: 2px;
					margin-top: 5px;
				}
				&:nth-child(3){
					margin-left: 14px;
				}
				&:nth-child(4){
					font-size: 23px;
					color: #111111;
					font-weight: bold;
					margin-left: 14px;
					margin-bottom: 4px;
				}
			}
		}
		.pointLogo{
			width:  240px;
		    height: 72px;
		    margin:  10px auto;
		}
		.addressItem,
		.menuItem {
			font-size: 0.8em;
			color: #9a9a9a;
			display: flex;
			width: 100%;
			overflow-x: auto;
			overflow-y: hidden;
			height: 72px;
			// white-space: nowrap;
			.addressItemList,
			.menuItemList {
				width: 20%;
				text-align: center;
				flex-shrink: 0;
				img {
					width: 50px;
					height: 50px;
				}
				span {
					display: block;
					font-size: 12px;
					color: #666666;
				}
			}
		}
		//@keyframes kf-marque-animation{ 0% { transform: translateX(0); } 100% { transform: translateX(-53.3%); } }
		.adv {
			border: 1px solid #ddd;
			height: 33px;
			font-size: 12px;
			line-height: 33px;
			width: 95%;
			margin: 5px auto;
			padding: 0 10px;
			box-sizing: border-box;
			display: flex;
			.left img{
				margin-top: 7px;
				width: 50px;
				height: 18px;
				display: block;
			}
		    .right{
		    	padding-left: 10px;
		    	box-sizing: border-box;
				flex-grow: 1;
				swiper{
					height: 33px;
				}
		    }
		}
		.centered {
			width: 95%;
			margin: 0 auto;
		}
		.discount-wrap {
			padding-top: 30px;
			.title {
				font-size: 18px;
				color: #111111;
				margin-bottom: 30px;
				font-weight: bold;
			}
			.discount {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
			}
		}
	}
	.rec-li {
  width: 95%;
  margin: 0 auto;
  border-radius: 5px;
  padding:0 10rpx;
  box-sizing: border-box;
  border:1rpx solid #999;
  // box-shadow:0px 0px 6px #999;
  .top{
   display: flex;
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
    flex-grow: 1;
    line-height: 20px;
    overflow: hidden;
    padding-left: 12px;
    box-sizing: border-box;
    .name {
      font-size: 12px;
      height: 40px;
      color: #999999;
      width: 180px;
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
  }
}
}
	.footer{height: 80rpx;padding: 20rpx 30rpx 10rpx 0;}
</style>