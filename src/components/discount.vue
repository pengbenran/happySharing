<template>	
	<div class="discount-li" :style="{width:wid,marginLeft:magleft}">
		<div class="img"><img :src="discountList.img" /></div>
		<div class="cant">
			<div class="name-make clr">
				<div class="name fl">{{discountList.name}}</div>
				<div class="make fr">{{discountList.make}}</div>
			</div>
			<div class="desc">{{discountList.desc}}</div>
			<div class="original-people clr">
				<div class="original fl">原价:{{discountList.original}}</div>
				<div class="people fr">{{discountList.people}}</div>
			</div>
			<div class="Present-discounts-sell clr">
				<div class="Present fl">￥:{{discountList.Present}}</div>
				<div class="discounts fl">优惠:{{discountList.discounts}}</div>
				<div class="sell fr">已售:{{discountList.sell}}</div>
			</div>
		</div>
	</div>	
</template>
<script>
	export default {
		props: ['discountList','wid','magleft'],
		data() {
			return {
				
			}
		},

		components: {

		},

		methods: {

		},

		created() {
			// 调用应用实例的方法获取全局数据
		}
	}
</script>

<style scoped lang="less">
/*中间居中*/
.discount-li {
	border: 1px solid #cccccc;
	flex-shrink: 0;
	margin-bottom: 15px;
	border-radius: 5px;
		// &:nth-child(1),
		// &:nth-child(2) {
		// 	margin: 0;
		// }
		.img {
			width: 100%;
			border-radius: 5px;
			height: 75px;
			img {
				width: 100%;
				height: 100%;
				border-radius: 5px;
			}
		}
		.cant {
			box-sizing: border-box;
			padding: 0 5px;
			.name {
				font-size: 12px;
				color: #ff0000;
				border-bottom: 1px solid #ff0000;
				margin: 6px 0;
			}
			.make {
				font-size: 10px;
				color: #4aa9fe;
				width: 40px;
				height: 15px;
			}
			.desc {
				font-size: 15px;
				color: #111111;
				line-height: 18px;
			}
			.original-people {
				padding-bottom: 8px;
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