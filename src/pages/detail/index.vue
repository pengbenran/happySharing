<template>
	<div style="width: 100%;">
		<div class="discount-li" :style="{width:wid,marginLeft:magleft}" v-for="(item,index) in discount">
			<div class="img"><img :src="item.img" /></div>
			<div class="cant centered">
				<div class="address-make clr">
					<div class="address fl">消费地址 ： {{address}}</div>
					<div class="make fr">{{item.make}}</div>
				</div>
				<div class="desc">{{item.desc}}</div>
				<div class="Present-discounts-people clr">
					<div class="Present fl">￥:{{item.Present}}</div>
					<div class="discounts fl">优惠:{{item.discounts}}</div>
					<div class="people fr">{{item.people}}</div>
				</div>
				<div class="original-sell clr">
					<div class="original fl">原价:{{item.original}}</div>
					<div class="sell fr">已售:{{item.sell}}</div>
				</div>
				<div class="phone clr">
					<div class="phone-txt fl">商家热线 ：{{item.phone}}</div>
					<div class="phone-img fr iconfont">&#xe613;</div>
				</div>
			</div>
		</div>
		<!--商品详情-->
		<div class="product-detail centered">
			<span>商品详情</span>
		</div>

		<!--底下导航-->
		<div class="nav">
			<div class="index">
				<navigator url="/pages/index/main">
					<div class="img"><img src="/static/images/home.png" /></div>
					<div class="text">首页</div>
				</navigator>
			</div>
			<div @click="btn(index)" class="make" :class="{ active: isActive }">
				{{make}}
			</div>
			<div @click="btn1(index)" class="rush" :class="{ active: isActive1 }">
				{{rush}}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isActive: true,
				isActive1: false,
				make: "预约日期",
				rush: "立即购买",
				wid: "100%",
				magleft: "0",
				address: "高新区艾溪湖东大道云中城99号",
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
					dianzhan: "1188",
					phone: "199 7908 0830",
				}, ],
			}

		},
		components: {

		},

		methods: {
			btn() {
				var that = this
				that.isActive = true
				this.isActive1 = false

			},
			btn1() {
				var that = this
				that.isActive1 = true
				this.isActive = false
			}

		},

		created() {

			// 调用应用实例的方法获取全局数据
		}
	}
</script>

<style lang="less">
	/*底部*/
	
	.nav {
		position: fixed;
		bottom: 0px;
		display: flex;
		width: 100%;
		height: 55px;
		border-top: 1px solid #dedede;
		.index {
			width: 16%;
			.img {
				width: 23px;
				height: 23px;
				margin: 8px auto 0 auto;
			}
			.text {
				color: #999999;
				font-size: 10px;
				text-align: center;
				margin-top: 7px;
			}
		}
		.make,
		.rush {
			width: 42%;
			border-left: 1px solid #dedede;
			color: #666666;
			line-height: 55px;
			text-align: center;
		}
		.active {
			background-color: #ff7d28;
			color: #fff;
		}
	}
	
	.discount-li {
		flex-shrink: 0;
		position: relative;
		margin-bottom: 15px;
		// &:nth-child(1),
		// &:nth-child(2) {
		// 	margin: 0;
		// }
		.img {
			width: 100%;
			height: 200px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.cant {
			.address-make {
				margin: 6px 0;
				.address {
					font-size: 13px;
					color: #999999;
					width: 300px;
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
				font-size: 18px;
				color: #111111;
				line-height: 26px;
			}
			.original-sell {
				padding: 8px 0;
				.original {
					text-decoration: line-through;
					color: #999999;
					font-size: 12px;
				}
				.sell {
					color: #666666;
					font-size: 12px;
				}
			}
			.Present-discounts-people {
				margin-top: 10px;
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
				.people {
					color: #999999;
					font-size: 12px;
				}
			}
			.phone {
				width: 100%;
				height: 37px;
				border-top: 1px solid #dedede;
				border-bottom: 1px solid #dedede;
				line-height: 37px;
				margin-top: 5px;
				text-align: center;
				.phone-txt {
					color: #111111;
					font-size: 13px;
				}
				.phone-img {
					color: #ffa061;
				}
			}
		}
	}
	
	.product-detail {
		margin-top: 30px;
		border-left: 4px solid #ff7d28;
		span {
			color: #111111;
			font-size: 18px;
			margin-left: 5px;
			font-weight: bold;
		}
	}
</style>