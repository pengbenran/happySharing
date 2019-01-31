<template>
	<div style="width: 100%;">
		<!--搜索-->
		<Search></Search>
		<!--轮播-->
		<!-- <Banner :banner='bannerImg'></Banner> -->
		<!--类目-->
		<div class="cate centered">
			<div v-for="(item , index) in addressItem" :key="item.id" class="cate-li" @click="jumpgoodCartList(item.id,item.name)">
					<div class="img"><img :src="item.img" /></div>
					<div class="name">{{item.name}}</div>
			</div>
		</div>
		<!--超值优惠-->
		<div class="discount-wrap centered">
			<div class="title">超赞推荐</div>
			<scroll-view scroll-x style="width: 100%;">	
			   <discount :discountList="catGoodRecommend"  :wid="wid" :magleft="magleft" :isflex='displayType'></discount>
			</scroll-view>
		</div>
		<!--超赞推荐-->
		<div class="rec-wrap centered">
			<div class="title ">超值优惠</div>
			<!-- <div class="image"><img src="/static/images/rec-banner.png" /></div> -->
			<goodslist :catGoodRecommend='catGoodRes'></goodslist>
			<nomoreTip v-if="!hasMore"></nomoreTip>
		</div>
	</div>
</template>

<script>
	import Search from '@/components/search'
	import Banner from '@/components/banner'
	import discount from '@/components/discount'
	import goodslist from '@/components/goodslist'
	import nomoreTip from "@/components/nomoreTip"
	import Api from '@/api/goods'
	import kindApi from '@/api/home'
	import util from '@/utils/index'
	export default {
		data() {
			return {
				displayType:'flex',
				addressItem: [],
				goodCatName:'',
				goodCatId:'',
				wid: '240px',
				magleft: '10px',
				catGoodRes: [],
				catGoodRecommend:[],
				nowPage:1,
				hasMore:true,
				bannerImg:[]
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
			jumpgoodCartList(regionId,regionname) {
				let that=this
				wx.navigateTo({url:`../auro-list/main?goodCatId=${that.goodCatId}&catname=${that.goodCatName}&regionname=${regionname}&regionId=${regionId}`})
			},
			async getKindGoods(pageNum,pageSize,goodCatId){
				// 获取地区分类下的商品(非推荐)
				let that=this
				if(that.hasMore){
					wx.showLoading({
						title: '加载中',
					})
					let params={}
					params.goodCatId=goodCatId
					let catGoodRes=await Api.getkindGood(pageNum,pageSize,params)
					
					wx.hideLoading();
					if(catGoodRes.rows.length<pageSize){
						that.hasMore=false
					}
					that.catGoodRes=that.catGoodRes.concat(catGoodRes.rows)
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
			that.getKindGoods(that.nowPage,3,that.goodCatId)
		},
		async onLoad(options) {
			let that=this
			that.catGoodRes=[]
			that.catGoodRecommend=[]
			that.nowPage=1
			that.hasMore=true
			that.goodCatName=options.goodCatName
			that.goodCatId=options.goodCatId
			wx.setNavigationBarTitle({
				title:options.goodCatName,		
			})
			// 获取地区分类下的广告
			let typeImgRes=await Api.getTypeImg(3,options.goodCatId)
			that.bannerImg=typeImgRes.data.imgs
			// 获取地区分类下的商品分类
			let reginRes=await kindApi.getRegin()
			that.addressItem=reginRes

			that.getKindGoods(1,3,that.goodCatId)
			let params={}
			params.goodCatId=that.goodCatId
			//获取地区分类项的商品(推荐)
			params.recommend=1
			let catGoodRecommendRes=await Api.getkindGood(1,6,params)
			catGoodRecommendRes.rows.map(item=>{
						item.saveMoney=util.accSub(item.showPrice,item.price)	
			})
			that.catGoodRecommend=catGoodRecommendRes.rows

		}
	}
</script>

<style scoped lang="less">
	/*类目*/
	
	.cate {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		text-align: center;
		.cate-li {
			margin-top: 16px;
			width: 20%;
			.img {
				width: 50px;
				height: 50px;
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
		padding: 24px 0 10px 0;
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
			padding-bottom: 16px;
			height: 96px;
			margin-top: 18px;
			border-bottom: 1px solid #dedede;
			img {
				width: 100%;
				height: 100%;
				border-radius: 5px;
			}
		}
	}
</style>