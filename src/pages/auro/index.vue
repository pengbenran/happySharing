<template>
	<div class="contain">
		<blockquote v-if="!isLoading">
			<loading></loading>
		</blockquote>
		<blockquote v-else>
			<div style="width: 100%;">
				<!--搜索-->
				<Search></Search>
				<!--轮播-->
				<Banner :banner='bannerImg'></Banner>
				<!--类目-->
				<div class="cate centered">
					<div v-for="(item , index) in menuItem" :key="item.id" class="cate-li" @click="jumpAuroList(item.catId,item.name)">
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
					<!-- <div class="image"><img :src="kindImg" /></div> -->
				<!-- 	<div class="image  zanWarpimg">
				       <swiper indicator-dots='true' autoplay='true'>
							<swiper-item v-for="(item,index) in recommendimgs" :key="index">
							<image :src="item" class="slide-image" mode='aspectFit'  />
							</swiper-item>
						</swiper>
					</div> -->
					<!--image end-->

					<goodslist :catGoodRecommend='catGoodRecommend'></goodslist>
					<nomoreTip v-if="!hasMore"></nomoreTip>
					<!--goodslist end-->
				</div>
			</div>
		</blockquote>
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
	import loading from '@/components/loading'
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
				catGoodRecommend: [],
				regionGoodRecommend:[],
				bannerImg:[],
				recommendimgs:[],
				nowPage:1,
				hasMore:true,
				isLoading:false,
			}
		},

		components: {
			Search,
			Banner,
			discount,
			goodslist,
			nomoreTip,
			loading
		},

		methods: {
			jumpAuroList(goodCatId,catname) {
				let that=this
				wx.navigateTo({url:`../auro-list/main?goodCatId=${goodCatId}&catname=${catname}&regionname=${that.regionname}&regionId=${that.regionId}`})
			},
			async getRegionGood(pageNum,pageSize,regionId){
				let that=this
				if(that.hasMore){
					let params={}
					params.region=regionId
					params.page=pageNum
					params.limit=pageSize
					let regionGoodRes=await Api.getRegionGood(params)
					wx.hideLoading();
					if(regionGoodRes.recommendGood.rows.length<pageSize){
						that.hasMore=false 
					}
					that.catGoodRecommend=that.catGoodRecommend.concat(regionGoodRes.recommendGood.rows)
					


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
		},
		async onLoad(options) {
			let that=this
			that.catGoodRecommend=[]
			that.regionGoodRecommend=[]
		    that.recommendimgs=[]
			that.nowPage=1
			that.hasMore=true
			that.regionname=options.regionname
			that.regionId=options.regionId
			wx.setNavigationBarTitle({
				title:options.regionname,		
			})
			// 获取地区分类下的广告
			let regionImgParams={}
			regionImgParams.id=options.regionId
			let regionImgRes=await Api.getRegionImg(regionImgParams)
			that.bannerImg=JSON.parse(regionImgRes.region.description) 
			// that.recommendimgs=regionImgRes.region.value
			//#endregion
			// 获取地区分类下的商品分类
			let GoodCatRes=await kindApi.getGoodCart()
			that.menuItem=GoodCatRes.goodCats

			that.getRegionGood(1,3,that.regionId)
			// 获取地区分类下的商品(非推荐)
			let params={}
			params.region=options.regionId
			//获取地区分类项的商品(推荐)
			params.page=1
			params.limit=6
			let regionGoodRecommendRes=await Api.getRegionGoods(params)
			regionGoodRecommendRes.offerGood.rows.map(item=>{
				item.saveMoney=util.accSub(item.showPrice,item.price)	
			})
			that.regionGoodRecommend=regionGoodRecommendRes.offerGood.rows
			that.isLoading=true
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