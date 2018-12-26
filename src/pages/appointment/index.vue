<template>
	<div style="width: 100%;">
		<!--搜索-->
		<Search></Search>
		<!--类目-->
		<div class="product-list centered">
			<div @click="click(index)" v-for="(item,index) in productlist" :class="timeindex === index? 'product-list-li-on':'product-list-li' ">
				<div class="title">{{item.title}}</div>
				<div class="desc">{{item.desc}}</div>
			</div>
		</div>
		<!--最新最火-->
		<div class="order">
			<div class="latest">最新</div>
			<div class="hot">最热</div>
			<div class="active"></div>
		</div>
		<!--列表-->
		<div class="discount-wrap">
			<div class="discount-li centered" v-for="(discountList,index) in discount">
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
		</div>
	</div>
</template>

<script>
	import Search from '@/components/search'
	export default {
		data() {
			return {
				timeindex: 0,
				productlist: [{
					title: "美食",
					desc: "畅享美味",
				}, {
					title: "美食",
					desc: "畅享美味",
				}, {
					title: "美食",
					desc: "畅享美味",
				}, {
					title: "美食",
					desc: "畅享美味",
				}],
				wid: "100%",
				magleft: '0px',
				discount: [{
						goodsid: 1,
						img: "/static/images/banner.png",
						name: "世茂/金塔/新力/莲塘/四店通用",
						make: "免预约",
						desc: "西江月园林艺术餐厅，真正的艺术赣菜,快来抢购！",
						original: "223",
						Present: "16.9",
						discounts: "83",
						people: "2人",
						sell: "2368",
						dianzhan: "1188"
					},
					{
						goodsid: 2,
						img: "/static/images/banner.png",
						name: "世茂/金塔/新力/莲塘/四店通用",
						make: "需预约",
						desc: "西江月园林艺术餐厅，真正的艺术赣菜,快来抢购！",
						original: "223",
						Present: "16.9",
						discounts: "83",
						people: "2人",
						sell: "200",
						dianzhan: "1188"
					},
					{
						goodsid: 3,
						img: "/static/images/banner.png",
						name: "世茂/金塔/新力/莲塘/四店通用",
						make: "免预约",
						desc: "西江月园林艺术餐厅，真正的艺术赣菜,快来抢购！",
						original: "223",
						Present: "16.9",
						discounts: "83",
						people: "2人",
						sell: "200",
						dianzhan: "1188"
					},

				],
			}

		},
		components: {
			Search,
		},

		methods: {
			click(index) {
				this.timeindex = index;
			}
		},

		created() {

			// 调用应用实例的方法获取全局数据
		}
	}
</script>

<style scoped lang="less">
	/*中间居中*/
	
	.centered {
		width: 95%;
		margin: 0 auto;
	}
	/*类目*/
	
	.product-list {
		display: flex;
		justify-content: space-between;
		text-align: center;
		margin-top: 18px;
		.product-list-li {
			margin-bottom: 16px;
			.title {
				color: #111111;
				font-size: 16px;
			}
			.desc {
				color: #999999;
				font-size: 14px;
				width: 70px;
				height: 18px;
				text-align: center;
				line-height: 18px;
				margin-top: 5px;
			}
		}
		.product-list-li-on {
			.desc {
				border-radius: 20px;
				background-color: #ff9a4c;
				color: #ffffff;
				font-size: 14px;
				width: 70px;
				height: 18px;
				text-align: center;
				line-height: 18px;
				margin-top: 5px;
			}
			.title {
				color: #ff9a4c;
				font-size: 16px;
			}
		}
	}
	/*最新最火*/
	
	.order {
		width: 85px;
		height: 22px;
		border-radius: 11px;
		border: 1px solid #999999;
		margin: 0 auto;
		line-height: 24px;
		display: flex;
		justify-content: space-between;
		margin-bottom: 16px;
		position: relative;
		.latest,
		.hot {
			font-size: 12px;
			color: #999999;
			line-height: 24px;
			text-align: center;
			width: 50%;
			height: 100%;
		}
		.active {
			position: absolute;
			left: -1px;
			top: -1px;
			width: 50%;
			height: 100%;
			border: 1px solid #ff9a4c;
			border-radius: 11px;
		}
	}
	/*列表*/
	
	.discount-li {
		position: relative;
		flex-shrink: 0;
		margin-bottom: 164px;
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
			box-sizing: border-box;position: absolute;
			bottom: -139px;left: 50%;margin-left: -165px; background-color: #ffffff;
			padding: 0 10px;border: 1px solid #cccccc;
			width: 331px;height: 168px;
			.name-make {
				margin: 6px 0;
				.name {
					font-size: 12px;
					color: #ff0000;
					border-bottom: 1px solid #ff0000;
				}
				.make {
					font-size: 10px;
					color: #ffb10f;
					width: 40px;
					height: 15px;
					border: 1px solid #ffb10f;
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