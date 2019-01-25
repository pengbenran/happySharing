<template>
	<div style="width: 100%;">
		<!--搜索-->
		<Search></Search>
		<!--轮播-->
		<Banner :banner='bannerImg'></Banner>
		<!--类目-->
		<div class="cate centered">
			<div v-for="(item , index) in menuItem" :key="item.id" class="cate-li" @click="jumpAuroList(item.id,item.name)">
					<div class="img"><img :src="item.img" /></div>
					<div class="name">{{item.name}}</div>
			</div>
		</div>
		<!--超值优惠-->
		<div class="discount-wrap centered">
			<div class="title">超赞推荐</div>
			<scroll-view scroll-x style="width: 100%;">	
			   <discount :discountList="regionGoodRecommend"  :wid="wid" :magleft="magleft" :isflex='displayType'></discount>
			</scroll-view>
		</div>
		<!--超赞推荐-->
		<div class="rec-wrap centered">
			<div class="title ">超值优惠</div>
			<div class="image  zanWarpimg">
		       <swiper indicator-dots='true' autoplay='true'>
					<swiper-item v-for="(item,index) in recommendimgs" :key="index">
					<image :src="item" class="slide-image" mode='aspectFit'  />
					</swiper-item>
				</swiper>
			</div>
			<!--image end-->

			<goodslist :catGoodRecommend='regionGoodRes'></goodslist>
			<nomoreTip v-if="!hasMore"></nomoreTip>
			<!--goodslist end-->
		</div>
	</div>
</template>

<script>
	import Search from '@/components/search'
	import Banner from '@/components/banner'
	import discount from '@/components/discount'
	import goodslist from '@/components/goodslist'
	import Api from '@/api/goods'
	import nomoreTip from "@/components/nomoreTip"
	import kindApi from '@/api/home'
	import util from '@/utils/index'
	export default {
		data() {
			return {
				displayType:'flex',
				menuItem: [],
				regionname:'',
				regionId:'',
				wid: '240px',
				magleft: '10px',
				regionGoodRes: [],
				regionGoodRecommend:[],
				bannerImg:[],
				recommendimgs:[],
				nowPage:1,
				hasMore:true
			}
		},

		components: {
			Search,
			Banner,
			discount,
			goodslist,
			nomoreTip
		},

		methods: {
			jumpAuroList(goodCatId,catname) {
				let that=this
				wx.navigateTo({url:`../auro-list/main?goodCatId=${goodCatId}&catname=${catname}&regionname=${that.regionname}&regionId=${that.regionId}`})
			},
			async getRegionGood(pageNum,pageSize,regionId){
				let that=this
				if(that.hasMore){
					wx.showLoading({
						title: '加载中',
					})
					let params={}
					params.regionId=regionId
					let regionGoodRes=await Api.getRegionGoods(pageNum,pageSize,params)
					wx.hideLoading();
					if(regionGoodRes.rows.length<pageSize){
						that.hasMore=false 
					}
					that.regionGoodRes=that.regionGoodRes.concat(regionGoodRes.rows)
				}
				else{
					wx.showToast({
						title:'没有更多数据了',
						icon:"none",
						duration:1500
					})
				} 
			}
		},
		onReachBottom:function(){
			let that = this;
			that.nowPage+=1
			that.getRegionGood(that.nowPage,6,that.regionId)
			console.log(that.nowPage)
		},
		async onLoad(options) {
			let that=this
			that.regionGoodRes=[]
			that.regionGoodRecommend=[]
			that.bannerImg=[]
		    that.recommendimgs=[]
			that.nowPage=1
			that.hasMore=true
			that.regionname=options.regionname
			that.regionId=options.regionId
			wx.setNavigationBarTitle({
				title:options.regionname,		
			})
			// 获取地区分类下的广告
			let typeImgRes=await Api.getTypeImg(2,options.regionId)
			that.bannerImg=typeImgRes.data.imgs
			that.recommendimgs = typeImgRes.data.recommendimgs
			//#endregion
			// 获取地区分类下的商品分类
			let GoodCatRes=await kindApi.getGoodCart()
			that.menuItem=GoodCatRes.goodCats
			 console.log("商品分类",that.menuItem)
			 
			that.getRegionGood(1,3,that.regionId)
			// 获取地区分类下的商品(非推荐)
			let params={}
			params.regionId=options.regionId
			//获取地区分类项的商品(推荐)
			params.recommend=1
			let regionGoodRecommendRes=await Api.getRegionGoods(1,6,params)
			regionGoodRecommendRes.rows.map(item=>{
				item.saveMoney=util.accSub(item.showPrice,item.price)	
			})
			that.regionGoodRecommend=regionGoodRecommendRes.rows
		},
				//		  用户点击右上角分享
		onShareAppMessage: function(res) {
			return {
				title: '抹哒抹哒' + item.name,
				path: "pages/auro/main",
				success: function(shareTickets) {
					console.info(shareTickets + '成功');
					// 转发成功
				},
				fail: function(res) {
					console.log(res + '失败');
					// 转发失败
				},			
			}
		}
	}
</script>

<style scoped lang="less">

.zanWarpimg,.zanWarpimg swiper{height: 155rpx;}
.zanWarpimg image{height: 100%;width: 100%;}
	/*类目*/
	
	.cate {
		display: flex;
		flex-wrap: wrap;
		text-align: center;
		.cate-li {
			margin-top: 16px;
			width: 70px;
			.img {
				width: 40px;
				height: 40px;
				margin: 0 auto;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.name {
				font-size: 12px;
				color: #666666;
				margin-top: 4px;
			}
		}
	}
	/*超值优惠*/
	
	.discount-wrap {
		padding: 24px 0 0 0;
		.title {
			font-size: 18px;
			color: #111111;
			margin-bottom: 18px;
			font-weight: bold;
		}
		.discount {
			display: flex;
			padding-top: 10px;
		}
	}
	/*超赞推荐*/
	
	.rec-wrap {
		.title {
			font-size: 18px;
			color: #111111;
			/*margin-bottom: 18px;*/
			font-weight: bold;
		}
		.image {
			width: 100%;
			padding-bottom: 7px;
			height: 96px;
			margin-top: 10px;
			border-bottom: 1px solid #dedede;
			img {
				width: 100%;
				height: 100%;
				border-radius: 5px;
			}
		}
	}
</style>