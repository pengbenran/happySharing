<template>
	<div>
		<div class="order-detail">
			<!--产品-->
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
				<div class="prices" v-for="(item,index1) in detailOrder">
					<div class="price1">
						<p>数量: </p>
						<p> {{item.quantity}}</p>
					</div>
					<div class="price2">
						<p>商品总价: </p>
						<p> ¥ {{present}}</p>
					</div>
					<div class="price3">
						<p>推荐师优惠：</p>
						<p v-if=false> ¥ {{rate}}</p>
						<p> <span>(不是推荐师身份)</span> 无</p>
					</div>
					<div class="price4">
						<p>应实付金额：</p>
						<p> ¥ {{total}}</p>
					</div>
					<div class="price5">
						<p>手机号码</p>
						<p>{{item.phone}}</p>
					</div>
					<!--<div class="price6">
						<p>预约时间</p>
						<p>{{item.phone}}</p>
					</div>-->
				</div>
			</div>
			<!--支付-->
			
			<div class="payment">
				<div class="payment-weixin">
					<div class="inp">
						<span><input type="checkbox"  value="微信支付" checked/></span><span>微信支付</span>
					</div>
				</div>
				<div class="payment-commission">
					<div class="inp">
						<span><input type="checkbox"  value="佣金抵扣" /></span><span>佣金抵扣</span>
					</div>
					<div>还有100可用佣金</div>
				</div>
			</div>			
		</div>
		<!--提交订单-->
		<div class="submit">
			<span>¥ {{total}}</span>
			<span>提交订单</span>
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
	/*checkbox 选中前样式  */
checkbox .wx-checkbox-input {
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
}
/*checkbox选中后样式  */
checkbox .wx-checkbox-input.wx-checkbox-input-checked {
  background: #32a1ff; 
  border: 1px solid #32a1ff;
}
/*checkbox选中后图标样式  */
checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
	color: #fff;
	font-size: 16px;
}
	.order-detail {
		padding-bottom: 164px;
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
					width: 185px;
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
				padding: 18px 12px 0 12px;
				.price1,
				.price2,
				.price3,
				.price4,
				.price5,
				.price6,
				{
					display: flex;
					justify-content: space-between;
					margin-bottom: 24px;
					p {
						color: #111111;
						font-size: 14px;
					}
				}
				.price3 {
					p {
						span {
							color: #999999;
							margin-right: 8px;
						}
					}
				}
				.price5 {
					margin-bottom: 46px;
				}
				.price5,
				.price6,
				{
					padding: 15px 0;
					border-top: 1px solid #DEDEDE;
					border-bottom: 1px solid #DEDEDE;
					p {
						color: #999999;
					}
				}
			}
		}
		/*支付*/
		.payment {
			font-size: 14px;
			padding: 0 12px;
			.payment-weixin,
			.payment-commission {
				padding: 15px 0;
				border-top: 1px solid #DEDEDE;
				border-bottom: 1px solid #DEDEDE;
				.inp {
					color: #111111;
					span{
						&:nth-child(2){margin-left: 8px;}
					}
				}
			}
			.payment-commission {
				display: flex;
				justify-content: space-between;
				border-top: 0;
			}
		}
	}
	/*提交订单*/
	
	.submit {
		width: 100%;
		height: 54px;
		background-color: #ff7d28;
		line-height: 54px;
		text-align: center;
		font-size: 18px;
		color: #fff;
		position: fixed;
		bottom: 0;
		span {
			&:nth-child(1) {
				margin-right: 5px;
			}
			&:nth-child(2) {
				margin-left: 5px;
			}
		}
	}
</style>