<template>
	<div style="width: 100%;">
		<!--搜索-->
		<Search></Search>
		<!--超值优惠-->
		<div class="discount-wrap centered">
			<div class="discount">
				<discount :discountList="discount" :isflex='displayType' :wid="wid" :magleft="magleft"></discount>
			</div>	
		</div>	
	</div>
</template>

<script> 
	import Search from '@/components/search'
	import discount from '@/components/discount'
	import Api from '@/api/goods'
	export default {
		data() {
			return {
				displayType:'block',
				wid:'100%',
				magleft:'0',
				discount: []
			}
		},

		components: {
			Search,
			discount
		},

		methods: {
       
		},

		async onLoad(options) {
			wx.setNavigationBarTitle({
				title:options.regionname+options.catname,		
			})
			// 获取地区分类下的商品分类下的商品
			let RegionKindGoodsRes=	await Api.getRegionKindGoods(1,3,options)
			that.discount=RegionKindGoodsRes.rows
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