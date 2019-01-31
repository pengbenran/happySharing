<template>
	<div>
		<div class="order-detail">
			<!--模块1-->
			<div class="title">
				<span></span>
				<span>{{OrderInfo.status}}</span>
			</div>
			<!--模块2-->
			<div class="rec-li " >
				<div class="rec-li-warp clr">
					<div class="img fl"><img :src="OrderInfo.thumbnail" /></div>
					<div class="rec-center fl">
						<div class="tit fontHidden">{{OrderInfo.goodName}}</div>
						<div class="name">{{OrderInfo.status}}</div>
						<div class="present "><span>￥:{{OrderInfo.needPayMoney}}</span> <span>原价:{{OrderInfo.goodsAmount}}</span></div>
						<!-- <div v-if="goodlist.isshow" class="dianzhan">点赞:{{goodlist.dianzhan}}</div> -->
					</div>
					<div class="rec-right fr">
						<div class="clr">
							<div class="make fr">{{OrderInfo.status}}</div>
						</div>
						<div class="people ">{{OrderInfo.goodsNum}}</div>
						<!-- <div class="sell ">已售:{{goodlist.sell}}</div> -->
					</div>
				</div>
				<!--总价-->
				<div class="prices">
					<div class="price1">
						<span>商品总价: </span>
						<span> ¥ {{OrderInfo.goodsAmount}}</span>
					</div>
					<div class="price2">
						<span>推荐师：</span>
						<span> ¥ {{OrderInfo.recommend}}</span>
					</div>
					<div class="price3">
						<span>订单总价：</span>
						<span> ¥ {{OrderInfo.orderAmount}}</span>
					</div>
					<div class="price4">
						<span>实付金额：</span>
						<span> ¥ {{OrderInfo.needPayMoney}}</span>
					</div>
				</div>
			</div>
			<!--模板3-->
			<div class="code">
				<div class="code-center">
					<div class="txt-img">
						<div class="txt">电子码</div>
						<div class="img"><img :src="OrderInfo.orderCode" /></div>
					</div>
					<div class="number clr"> <span class="fl"> 订单编号：</span> <span class="fl">{{OrderInfo.orderId}}</span></div>
				</div>
			</div>

			<!--订单详情-->
			<div class="detail-order">
				<div class="tit">订单详情</div>
				<div  class="detail-order-li">
					<div>
						<span>积分:</span>
						<span>{{OrderInfo.gainedpoint}}</span>
					</div>
					<div>
						<span>下单时间:</span>
						<span>{{OrderInfo.createTime}}</span>
					</div>
				</div>
			</div>

			<!--按钮-->
			<div class="dele">
				<!-- <span>删除订单</span> -->
				<span @click='jumpHome'>回到首页</span>
			</div>
		</div>
	</div>
</template>

<script>
	import goodslist from '@/components/goodslist'
	import Index_Lib from '@/utils/index'
	import API_ord from '@/api/order'
	import Lib from '@/utils/lib'
	export default {
		components: {
			goodslist
		},

		data() {
			return {
				orderId:'',
				OrderInfo:{},
			}
		},
		computed: {
	

		},
		methods:{
            async getOnList(){
				let that = this;
				let data = {orderId:that.orderId};
				let res = await API_ord.getOrderList(data).catch(err => {
					Lib.showToast('失败','loading')
				});
				if(res.code == 0){
					let OrderInfo = res.pageUtils.rows[0]
						if(OrderInfo.status == 0){
                           OrderInfo.status = '待支付'
						}else if (OrderInfo.status == 1) {
							OrderInfo.status = '待核销'
						}else if (OrderInfo.status == 2) {
							OrderInfo.status = ' 已核销'
						}else if (OrderInfo.status == 3) {
							OrderInfo.status = '已取消'
						}
					OrderInfo.createTime = Index_Lib.formatTime(OrderInfo.createTime)	
					that.OrderInfo = OrderInfo
				};
			},
			jumpHome(){
				wx.switchTab({
					url:'../index/main'
				})
			}
		},

		onLoad(options){
			 let that = this;
			 that.orderId = options.orderId;
			  that.getOnList();
		},

	}
</script>

<style lang="less">
	.order-detail {
		background-color: #F9F9F9;
		/*模块1*/
		.title {
			width: 100%;
			height: 128px;
			position: relative;
			/*background-color: #ff7d28;*/
			background: linear-gradient(#ff7d28, #ff9a4c);
			span {
				display: block;
				&:nth-child(1) {
					padding-top: 40px;
					padding-left: 28px;
					color: #ffffff;
					font-size: 19px;
				}
				&:nth-child(2) {
					position: absolute;
					bottom: -20px;
					width: 351px;
					height: 60px;
					color: #ff7d28;
					font-size: 25px;
					text-align: center;
					line-height: 60px;
					background-color: #fff;
					left: 50%;
					margin-left: -175px;
					font-weight: bold;
				}
			}
		}
		/*模块2*/
		.rec-li {
			.rec-li-warp {
				padding: 20px 12px;
				margin-top: 32px;
				background-color: #fff;
				border-bottom: 1px solid #dedede;
				.img {
					width: 80px;
					height: 80px;
					overflow: hidden;
					img {
						border-radius: 5px;
						width: 100%;
						height: 100%;
					}
				}
				.rec-center {
					width: 176px;
					line-height: 20px;
					overflow: hidden;
					padding-left: 12px;
					box-sizing: border-box;
					margin-top: 8px;
					.tit {
						font-size: 15px;
						color: #111111;
					}
					.name {
						font-size: 12px;
						color: #999999;
					}
					.present {
						span {
							&:nth-child(1) {
								color: #111111;
								font-size: 12px;
							}
							&:nth-child(2) {
								color: #999999;
								font-size: 10px;
								margin-left: 12px;
								text-decoration: line-through;
							}
						}
					}
					.name {
						font-size: 12px;
						color: #999999;
					}
					.original {
						text-decoration: line-through;
						color: #999999;
						font-size: 12px;
					}
					.dianzhan {
						width: 68px;
						height: 15px;
						color: #ffb10f;
						border: 1px solid #ffb10f;
						border-radius: 5px;
						text-align: center;
						line-height: 15px;
						font-size: 11px;
						font-family: "宋体";
					}
				}
				.rec-right {
					width: 70px;
					line-height: 24px;
					overflow: hidden;
					margin-top: 8px;
					text-align: right;
					.make {
						font-size: 10px;
						color: #4aa9fe;
						width: 40px;
						height: 15px;
						border-radius: 5px;
						border: 1px solid #4aa9fe;
						line-height: 15px;
						text-align: center;
					}
					.people {
						color: #999999;
						font-size: 12px;
					}
					.sell {
						color: #666666;
						font-size: 12px;
					}
				}
			}
			.prices {
				background-color: #fff;
				padding: 18px 12px;
				.price1,
				.price2,
				.price3,
				.price4,
				{
					display: flex;
					justify-content: space-between;
					margin-bottom: 11px;
				}
				.price1,
				.price2,
				{
					span {
						color: #999999;
						font-size: 11px;
					}
				}
				.price3,
				{
					margin-bottom: 22px;
					span {
						color: #111111;
						font-size: 13px;
					}
				}
				.price4,
				{
					margin-bottom: 0;
					span {
						color: #fd0200;
						font-size: 13px;
					}
				}
			}
		}
		/*模板3*/
		.code {
			background-color: #fff;
			margin-top: 8px;
			.code-center {
				padding: 20px 12px;
				.txt-img {
					display: flex;
					.txt {
						font-size: 14px;
						font-weight: bold;
					}
					.img {
						width: 124px;
						height: 124px;
						margin: 0 auto;
						padding-right: 21px;
					}
				}
				.number {
					padding-top: 12px;
					span {
						display: block;
						font-size: 12px;
						color: #666666;
						&:nth-child(2) {
							width: 249px;
							text-align: center;
						}
					}
				}
			}
		}
		/*订单详情*/
		.detail-order {
			background-color: #fff;
			margin-top: 8px;
			padding-bottom: 44px;
			.tit {
				font-size: 14px;
				font-weight: bold;
				padding: 20px 12px 9px 12px;
			}
			.detail-order-li {
				padding: 0px 12px 50px 12px;
				div {
					span {
						display: inline-block;
						font-size: 12px;
						color: #666666;
						margin-top: 10px;
						&:nth-child(1) {
							width: 65px;
							margin-top: 0;
						}
						&:nth-child(2) {
							margin-left: 22px;
						}
					}
				}
			}
		}
		.dele {
			background-color: #fff;
			display: flex;
			width: 100%;
			border-top: 1px solid #DEDEDE;
			padding: 8px 0;
			/*flex-direction: row-reverse;*/
			justify-content: flex-end;
			position: fixed;
			bottom: 0;
			span {
				width: 80px;
				height: 32px;
				border-radius: 17px;
				border: 1px solid #DEDEDE;
				text-align: center;
				line-height: 32px;
				font-size: 14px;
				display: block;
				margin-right: 12px;
				&:nth-child(1) {
					color: #fff;
					background-color: #ff7d28;
					border: 1px solid #ff7d28;
				}
			}
		}
	}
</style>