<template>
	<div style="width: 100%;">
		<div class="discount-li" :style="{width:wid,marginLeft:magleft}">
			<div class="img"><img :src="goodsDetail.thumbnail" /></div>
			<div class="cant centered">
				<div class="address-make clr">
					<div class="address fl">消费地址:{{goodsDetail.address}}</div>
					<!-- <div class="make fr">{{goodsDetail.make}}</div> -->
				</div>
				<div class="desc">{{goodsDetail.goodName}}</div>
				<div class="Present-discounts-people clr">
					<div class="Present fl">￥:{{goodsDetail.price}}元</div>
					<div class="discounts fl">优惠:{{discounts}}元</div>
					<!-- <div class="people fr">{{item.people}}</div> -->
				</div>
				<div class="original-sell clr">
					<div class="original fl">原价:{{goodsDetail.showPrice}}元</div>
					<div class="sell fr">已售:{{goodsDetail.showSales}}件</div>
				</div>
				<div class="phone clr">
					<div class="phone-txt fl">商家热线 ：{{goodsDetail.phone}}</div>
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
			<div class="index" @click="jumpIndex">
				<div class="img"><img src="/static/images/home.png" /></div>
				<div class="text">首页</div>
			</div>
			<div class="make">
				预约
			</div>
			<div @click="btn1(index)" class="rush active">
				<navigator url="../order-submit/main" hover-class="none">
				   立即购买
				</navigator>
			</div>
		</div>
	</div>
</template>

<script>
	import Api from '@/api/goods'
	import util from '@/utils/index'
	export default {
		data() {
			return {
				wid: "100%",
				magleft: "0",
				goodsDetail:{}
			}

		},
		components: {

		},
		computed:{
			discounts(){
				let that=this
				return util.accSub(that.goodsDetail.showPrice,that.goodsDetail.price) 
			}
		},
		methods: {
			jumpIndex(){
				wx.switchTab({
					url:'../index/main'
				})
			}

		},

		async onLoad(options) {
			console.log(options);
			let that=this
			let goodsDetailRes=await Api.getGoodDetail(options.goodsId)
			if(goodsDetailRes.code==0){
				goodsDetailRes.good.thumbnail='/static/images/banner.png'
				that.goodsDetail=goodsDetailRes.good
			}
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