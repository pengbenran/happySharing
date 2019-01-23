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
			   <discount :discountList="catGoodRes"  :wid="wid" :magleft="magleft" :isflex='displayType'></discount>
			</scroll-view>
		</div>
		<!--超赞推荐-->
		<div class="rec-wrap centered">
			<div class="title ">超值优惠</div>
			<div class="image"><img src="/static/images/rec-banner.png" /></div>
			<goodslist :catGoodRecommend='catGoodRecommend'></goodslist>
		</div>
	</div>
</template>

<script>
	import Search from '@/components/search'
	import Banner from '@/components/banner'
	import discount from '@/components/discount'
	import goodslist from '@/components/goodslist'
	import Api from '@/api/goods'
	import kindApi from '@/api/home'
	export default {
		data() {
			return {
				displayType:'flex',
				menuItem: [],
				regionname:'',
				regionId:'',
				wid: '240px',
				magleft: '10px',
				catGoodRes: [],
				catGoodRecommend: [],
				bannerImg:[]
			}
		},

		components: {
			Search,
			Banner,
			discount,
			goodslist
		},

		methods: {
			jumpAuroList(goodCatId,catname) {
				let that=this
				wx.navigateTo({url:`../auro-list/main?goodCatId=${goodCatId}&catname=${catname}&regionname=${that.regionname}&regionId=${that.regionId}`})
			}
		},

		async onLoad(options) {
			console.log(options);
			let that=this
			that.regionname=options.regionname 
			that.regionId=options.regionId
			wx.setNavigationBarTitle({
				title:options.regionname,		
			})
			// 获取地区分类下的广告
			let typeImgRes=await Api.getTypeImg(2,options.regionId)
			that.bannerImg=typeImgRes.data.imgs
			// 获取地区分类下的商品分类
			let GoodCatRes=await kindApi.getGoodCart()
			GoodCatRes.goodCats.map(item=>{
				item.img='/static/images/down_icon_a.png'
			})
			that.menuItem=GoodCatRes.goodCats

			// 获取地区分类下的商品(非推荐)
			let params={}
			params.regionId=options.regionId
			let regionGoodRes=await Api.getRegionGoods(1,3,params)
			that.regionGoodRes=regionGoodRes.rows
			//获取地区分类项的商品(推荐)
			params.recommend=1
			let regionGoodRecommendRes=await Api.getRegionGoods(1,3,params)
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
	/*类目*/
	
	.cate {
		display: flex;
		flex-wrap: wrap;
		text-align: center;
		.cate-li {
			margin-top: 16px;
			width: 70px;
			.img {
				width: 25px;
				height: 25px;
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
		padding: 24px 0 40px 0;
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