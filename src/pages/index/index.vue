<template>
	<div class="container">
		<!-- 顶部导航 -->
		<Search></Search>
		<!-- <div class="top">		 -->
				<!-- <span>南昌</span>
				<span class="iconfont">&#xe60c;</span> -->
			    <!-- <span></span>  -->
			    <!-- <span>+</span> -->
		<!-- </div> -->
		<!-- banner图 -->
		<div class="banner">
			<Banner :banner='bannerList'></Banner>
		</div> 
		<!-- 积分商城 -->
		<div class="pointLogo" @click="jumpPointShop">  
			<img src="https://shop.guqinet.com/html/images/zhifenxiang/pointLogo.png" mode="widthFix">
		</div>
		<!-- 地区列表 -->
		<div class="addressItem">
			<div class="addressItemList" v-for="(item,index) in addressItem" :key="item.id" @click="jumpAuro(item.id,item.name)">
				<!-- <navigator url="../../pages/auro/main"> -->
					<img :src="item.img" mode="widthFix">
					<span>{{item.name}}</span>
				<!-- </navigator> -->
			</div>
		</div>

		<!-- 菜单列表 -->
		<div class="menuItem">
			<div class="menuItemList" v-for="(item,index) in menuItem" :key="item.id" @click="jumpgoodCart(item.id,item.name)">
				<img :src="item.img" mode="widthFix">
				<span>{{item.name}}</span>
			</div>
		</div>
		
		<!-- 头条广告 -->
		<div class="adv">
			<div class="left">
				<img src="/static/images/tou.png">
			</div>
			<div class="right">
				<swiper class="swiper"  autoplay='true' vertical='true'>
					<swiper-item v-for="(item,index) in message" :key="item.id">
						{{item.content}}
					</swiper-item>
				</swiper>
			</div>
			
		</div>
		<!-- 分类列表 -->
		<kindTemplate :kind_item='kindItem'></kindTemplate>
		<!--为你推荐-->
		<div class="discount-wrap centered">
			<div class="title">为你推荐</div>
			<!-- <day ref="day" :endtime="endtime"></day>	 -->
			<discount :discountList="discount" :wid="wid" :magleft="magleft" ref="discounts" :isflex='displayType'></discount>
			<nomoreTip v-if="!hasMore"></nomoreTip>
		</div>

		<loginModel ref="loginModel" @getIndex='getIndex'></loginModel> 
		<div class="footer">
			<img src="https://shop.guqinet.com/html/images/shuiguo/index/footerImg.png"/>
		</div>
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
	import Api from "@/api/home";
	// let api=new Api

	export default {
		data() {
			return {
				displayType:'block',
				message:[],
				addressItem: [],
				menuItem: [],
				bannerList:[],
				kindItem: [],
				discount: [],
				wid: "100%",
				magleft: '0px',
				nowPage:1,
				hasMore:true
			}
		},
		components: {
			Search,
			Banner,
			kindTemplate,
			discount,
			day,
			loginModel,
			nomoreTip
		},

  methods: {
   
  },


		methods: {
			jumpAuro:function(regionId,regionname){
				wx.navigateTo({url:`../auro/main?regionId=${regionId}&regionname=${regionname}`})
			},
			jumpgoodCart:function(goodCatId,goodCatName){
				wx.navigateTo({url:`../goodCart/main?goodCatId=${goodCatId}&goodCatName=${goodCatName}`})
			},
			jumpPointShop:function(){
				wx.showToast({
					title:'开发中,敬请期待',
					icon:'none',
					duration:1500
				})
			},
			cutTimes: function(i,endtime) {
				//获取当前时间
				let that=this
				var date = new Date();
				var now = date.valueOf();
				//设置截止时间
				var endDate = new Date(endtime).valueOf();
				//时间差
				var leftTime = endDate - now;
				//定义变量 d,h,m,s保存倒计时的时间 
				if(leftTime >= 0) {
					var interval = setInterval(function () {
						that.discount[i].d = parseInt(leftTime / 1000 / 60 / 60 / 24,10);
						that.discount[i].h = parseInt(leftTime / 1000 / 60 / 60 % 24,10);
						that.discount[i].m = parseInt(leftTime / 1000 / 60 % 60,10);
						that.discount[i].s = parseInt(leftTime / 1000 % 60,10);
						leftTime = leftTime - 1000;
						if(leftTime<0){
							clearinterval(interval)
						}
     				},1000)	
				}	
			},
			// 获取首页推荐商品
			async getRecommendGood(pages,limit){
				let that=this
				if(that.hasMore){
					wx.showLoading({
						title: '加载中',
					})
					let RecommendGood=await Api.getRecommendGood(pages,limit)
					RecommendGood.rows.map(item=>{
						item.saveMoney=util.accSub(item.showPrice,item.price)	
					})
					wx.hideLoading();
					if(RecommendGood.rows.length<limit){
						that.hasMore=false
					}
					that.discount=that.discount.concat(RecommendGood.rows)
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
	    
	            that.kindItem=rootKindRes.rootCats
				// 获取地区分类
				let reginRes=await Api.getRegin()
				that.addressItem=reginRes	
				// 获取首页banner和公告
			    // this.$refs.discounts.get()
			    let bannerAndMessageRes=await Api.getbannerAndMessage()
			    that.bannerList=bannerAndMessageRes.data.BannerList
			    that.message=bannerAndMessageRes.data.messageDOList
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
			wx.showLoading({
				title: '加载中',
			})

			that.getIndex()

		}

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
		    height: 55px;
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
	.footer{height: 80rpx;padding: 20rpx 30rpx 10rpx 0;}
</style>