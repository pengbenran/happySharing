<template>
	<div class="discount" :style="{display:isflex}">
		<div class="discount-li" :style="{width:wid,marginLeft:magleft}" v-for="(item , index) in discountList" :key="item.id" @click="jumpGoodDetail(item.id)">	
			<!-- <day :d="discountList.d" :h="discountList.h" :m="discountList.m" :s="discountList.s"></day> -->
			<div class="img"><img :src="item.thumbnail" /></div>
			<div class="cant">
				<div class="name-make clr">
					<div class="name fl">{{item.title}}</div>
					<div class="make fr">免预约</div>
				</div>
				<!-- <div class="desc">{{item.goodName}}</div> -->
				<div class="original-people clr">
					<div class="original fl">原价:{{item.showPrice}}元</div>
					<!-- <div class="people fr">{{item.showSales}}</div> -->
				</div>
				<div class="Present-discounts-sell clr">
					<div class="Present fl">￥:{{item.price}}元</div>
					<div class="discounts fl">优惠:{{item.saveMoney}}元</div>
					<div class="sell fr">已售:{{item.showSales}}件</div>
				</div>
			</div>
		</div> 
	</div>
	
</template>
<script>
	import day from '@/components/day'
	export default {
		props: ['discountList', 'wid', 'magleft','isflex'],
		data() {
			return {
				
			}
		},
		components: {
			day
		},
		// computed:{

		// },
		methods: {
		jumpGoodDetail(goodsId){
			wx.navigateTo({url:`../detail/main?goodsId=${goodsId}&codeUnionid=`})
		}
		},
		created() {
			// 调用应用实例的方法获取全局数据
		}
	}
</script>

<style scoped lang="less">
	/*中间居中*/
	.discount-li {
		border: 1px solid #DEDEDE; 
		flex-shrink: 0;
		position: relative;
		margin-bottom: 30px;
		border-radius: 5px;
		// &:nth-child(1),
		// &:nth-child(2) {
		// 	margin: 0;
		// }
		.img {
			width: 100%;
			border-radius: 5px;
			height: 200px;
			img {
				width: 100%;
				height: 100%;
				border-radius: 5px;
			}
		}
		.cant {
			box-sizing: border-box;
			padding: 0 5px;
			.name-make {
				margin: 6px 0;
				.name {
					font-size: 12px;
					color: #ff0000;
					border-bottom: 1px solid #ff0000;
				}
				.make {
					font-size: 10px;
					color: #4aa9fe;
					width: 40px;
					height: 15px;
					border: 1px solid #4aa9fe;
					line-height: 15px;
					text-align: center;
					border-radius: 5px;
				}
			}
			.desc {
				font-size: 15px;
				color: #111111;
				line-height: 18px;
			}
			.original-people {
				padding: 8px 0;
				.original {
					text-decoration: line-through;
					color: #999999;
					font-size: 12px;
				}
				.people {
					color: #999999;
					font-size: 12px;
				}
			}
			.Present-discounts-sell {
				padding-bottom: 14px;
				.Present {
					color: #ff0000;
					font-size: 17px;
				}
				.discounts {
					color: #999999;
					font-size: 12px;
					margin-left: 6px;
					line-height: 25px;
				}
				.sell {
					color: #666666;
					font-size: 12px;
				}
			}
		}
	}
</style>