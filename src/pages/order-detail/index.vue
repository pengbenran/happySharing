<template>
	<div>
		<div class="order-detail">
			<!--模块1-->
			<div class="title">
				<span>{{title}}</span>
				<span>{{state}}</span>
			</div>
			<!--模块2-->
			<div class="rec-li " v-for="(goodlist,index) in rec">
				<div class="rec-li-warp clr">
					<div class="img fl"><img :src="goodlist.img" /></div>
					<div class="rec-center fl">
						<div class="tit">{{goodlist.title}}</div>
						<div class="name">{{goodlist.name}}</div>
						<div class="present "><span>￥:{{goodlist.present}}</span> <span>原价:{{goodlist.original}}</span></div>
						<div v-if="goodlist.isshow" class="dianzhan">点赞:{{goodlist.dianzhan}}</div>
					</div>
					<div class="rec-right fr">
						<div class="clr">
							<div class="make fr">{{goodlist.make}}</div>
						</div>
						<div class="people ">{{goodlist.people}}</div>
						<div class="sell ">已售:{{goodlist.sell}}</div>
					</div>
				</div>
				<!--总价-->
				<div class="prices">
					<div class="price1">
						<span>商品总价: </span>
						<span> ¥ {{present}}</span>
					</div>
					<div class="price2">
						<span>推荐师：</span>
						<span> ¥ {{rate}}</span>
					</div>
					<div class="price3">
						<span>订单总价：</span>
						<span> ¥ {{total}}</span>
					</div>
					<div class="price4">
						<span>实付金额：</span>
						<span> ¥ {{total}}</span>
					</div>
				</div>
			</div>
			<!--模板3-->
			<div class="code">
				<div class="code-center">
					<div class="txt-img">
						<div class="txt">电子码</div>
						<div class="img"><img :src="code" /></div>
					</div>
					<div class="number clr"> <span class="fl"> 订单编号：</span> <span class="fl">{{codeNumber}}</span></div>
				</div>
			</div>

			<!--订单详情-->
			<div class="detail-order">
				<div class="tit">订单详情</div>
				<div v-for="(item,index) in detailOrder" class="detail-order-li">
					<div>
						<span>预定人:</span>
						<span>{{item.reservations}}</span>
					</div>
					<div>
						<span>预定数量:</span>
						<span>{{item.quantity}}</span>
					</div>
					<div>
						<span>联系电话:</span>
						<span>{{item.phone}}</span>
					</div>
					<div>
						<span>积分:</span>
						<span>{{item.integral}}</span>
					</div>
					<div>
						<span>下单时间:</span>
						<span>{{item.days}}</span>
					</div>
					<div>
						<span>备注信息:</span>
						<span>{{item.remarks}}</span>
					</div>
				</div>
			</div>

			<!--按钮-->
			<div class="dele">
				<span>删除订单</span>
				<span>积分详情</span>
			</div>
		</div>
	</div>
</template>

<script>
	import goodslist from '@/components/goodslist'
	export default {
		components: {
			goodslist
		},

		data() {
			return {
				detailOrder: [{

					reservations: "小明",
					quantity: 1,
					phone: 15932325588,
					integral: 30,
					days: "2018-12-07  11:34:38",
					remarks: "这是我要说的一段备注信息，我也不知道说什么",

				}],
				codeNumber: "3053558899432156515",
				code: "https://shop.guqinet.com/html/images/zhifenxiang/code.png",
				title: "买家不可使用",
				state: "已取消",
				rec: [{
					recId: 1,
					img: "/static/images/d.png",
					title: "西江月园林火锅",
					name: "世茂/金塔/新力/莲塘/四店通用",
					make: "免预约",
					desc: "西江月园林艺术餐厅，真正的艺术赣菜,快来抢购！",
					original: 223,
					present: 16.99,
					rate: 6.98,
					discounts: "83",
					people: "2人",
					sell: "2368",
					dianzhan: "1188"
				}, ]
			}
		},
		computed: {
			present() {
				for(var i in this.rec) {
					var present = this.rec[i].present.toFixed(2);
					return present;
				};
			},
			rate() {
				for(var i in this.rec) {
					var rate = this.rec[i].rate.toFixed(2);
					return rate;

				};
			},
			total() {
				for(var i in this.rec) {
					var present = this.rec[i].present.toFixed(2);
					var rate = this.rec[i].rate.toFixed(2);
					var total = (present - rate).toFixed(2);
					return total;
				};
			}

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
					color: #666666;
				}
				&:nth-child(2) {
					color: #fff;
					background-color: #ff7d28;
					border: 1px solid #ff7d28;
				}
			}
		}
	}
</style>