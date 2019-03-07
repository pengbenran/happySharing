<template>
	<div class="contain">
		<blockquote v-if="!isLoading">
			<loading></loading>
		</blockquote>
		<blockquote v-else>
			<div style="width: 100%;">
				<!--搜索-->
				<Search></Search>
				<!--超值优惠-->
				<div class="discount-wrap centered">
					<div class="discount">
						<discount :discountList="discount" :isflex='displayType' :wid="wid" :magleft="magleft"></discount>
						<nomoreTip v-if="!hasMore"></nomoreTip>
					</div>
				</div>
			</div>
		</blockquote>
	</div>
</template>

<script>
	import Search from '@/components/search'
	import discount from '@/components/discount'
	import Api from '@/api/goods'
	import nomoreTip from "@/components/nomoreTip"
	import loading from '@/components/loading'
	export default {
		data() {
			return {
				hasMore: true,
				nowPage: 1,
				displayType: 'block',
				wid: '100%',
				magleft: '0',
				discount: [],
				goodCatId:'',
				regionId:'',
				isLoading:false,
			}
		},

		components: {
			Search,
			discount,
			nomoreTip,
			loading
		},

		methods: {
			async getRegionGood(pageNum, pageSize) {
				let that = this
				if(that.hasMore) {
					let params = {};					
					params.regionId=that.regionId;
					params.goodCatId=that.goodCatId;
					let discount = await Api.getRegionKindGoods(pageNum,pageSize,params)
					wx.hideLoading();
					if(discount.rows.length < pageSize) { 
						that.hasMore = false
					}
					that.discount = that.discount.concat(discount.rows)
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

		onReachBottom: function() {			
			let that = this;
			that.nowPage += 1
			that.getRegionGood(that.nowPage,3)
		},
		async onLoad(options) {
			let that = this		
			that.discount=[]
			that.nowPage=1;
			that.hasMore=true 
			wx.setNavigationBarTitle({
				title: options.regionname + options.catname,
			})
			// 获取地区分类下的商品分类下的商品  
			that.regionId = options.regionId
			that.goodCatId = options.goodCatId	
			await that.getRegionGood(1,3)
			that.isLoading=true
		},
		onUnload(){
			let that=this
			that.hasMore= true
			that.nowPage= 1
			that.displayType= 'block'
			that.wid= '100%'
			that.magleft= '0'
			that.discount= []
			that.goodCatId=''
			that.regionId=''
			that.isLoading=false
		}
	}
</script>

<style scoped lang="less">
	.discount-wrap {
		padding: 24px 0;
		.title {
			font-size: 18px;
			color: #111111;
			margin-bottom: 18px;
			font-weight: bold;
		}
	}
</style>