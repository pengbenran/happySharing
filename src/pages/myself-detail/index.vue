<template>
	<div class="container">
		<!--佣金-->
		<div class="myselfdetails">
			<div class="myselfdetail">
				<div class="myselfdetail-left">
					<span>累计佣金（元）</span>
					<span>{{userInfo.total}}</span>
				</div>
				<div class="myselfdetail-right">
					<span>可提佣金（元）</span>
					<span>{{userInfo.balance}}</span>
					<span class="cashBtn" @click="jumpCash">提现</span>
				</div>
			</div>
		</div>

		<div class="flowbill">
			<!--流水信息栏-->
			<div class="flowbill-cate">

				<div class="tit">
					流水信息
				</div>
				<div class="type" @click="btnShow">
					类型-{{type}}<span class="iconfont" style="color: #666666;">&#xe600;</span>
				</div>
				<div class="day">
					2018-12-30<span class="iconfont" style="color: #666666;">&#xe600;</span>
				</div>
			</div>

			<!--流水列表 -->
			<div class="flowbill-list">
				<div v-for="(item,index) in bill" class="flowbill-list-li clr">
					<div class="img fl"> <img :src="item.img" /></div>
					<div class="name fl">
						<span>{{item.name}} - {{item.record}}</span>
						<span>{{item.day}}</span>
					</div>
					<div class="num fr">+{{num}}</div>
					<div class="xian"></div>
				</div>
				<!--收入-->
				<div class="bills clr">
					<div class="img fl"> <img :src="bills.img" /></div>
					<div class="name fl">
						<span class="day">{{bills.day}}</span>
						<div><span> 支出¥{{expenditure}}</span> <span>收入{{bills.income}}</span></div>
					</div>
					<div class="num fr"><span>总计 : </span>{{tofiex}}</div>
					<div class="xian"></div>
				</div>
				<!--提现-->
				<div class="cash clr">
					<div class="img fl"> <img :src="bills.cashimg" /></div>				
					<div class="name fl">
						<span>提现到微信钱包</span>
						<span>{{bills.day}}{{bills.time}}</span>
					</div>					
					<div class="num fr">-{{expenditure}}</div>	
					<div class="xian"></div>					
				</div>
			</div>
		</div>
		<!--弹窗-->
		<div class="popup" v-if="isShow">
			<div class="popup-wp">
				<div class="popup-header">选择流水类型</div>
				<div class="popup-cant">
					<span v-for="(item,index) in popup" @click="addClass(index)" :class="{on:index == current}">{{item.name}}</span>
				</div>
				<div @click="btnHide" class="popup-footer">取消</div>
			</div>
		</div>
	</div>
</template>

<script>
	import store from '@/store/store'
	export default {
		data() {
			return {
				type:"全部",
				userInfo:{},
				popup: [{
						name: "全部"
					},
					{
						name: "邀请"
					},
					{
						name: "提现"
					},
					{
						name: "会员消费"
					},
					{
						name: "银牌消费"
					},
					{
						name: "金牌消费"
					},
					{
						name: "推荐师消费"
					},
					{
						name: "钻石消费"
					},
					{
						name: "股东消费"
					},
				],
				isShow: false,
				current: 0,
				bills: {
					cashimg: "/static/images/flowbill2.png",
					img: "/static/images/flowbill1.png",
					day: "2018年12月30日",
					expenditure: 10.00,
					income: 20.99,
					time: "12:30",						
				},
				bill: [{
						img: "/static/images/head.png",
						name: "小明同学",
						record: "被成功邀请",
						recordo: "购买消费",
						day: "12月30日21:31",
						num: 20.00
					},
					{
						img: "/static/images/head.png",
						name: "小明同学",
						record: "被成功邀请",
						recordo: "购买消费",
						day: "12月30日21:31",
						num: 20.99
					},
					{
						img: "/static/images/head.png",
						name: "小明同学",
						record: "被成功邀请",
						recordo: "购买消费",
						day: "12月30日21:31",
						num: 20.99
					},
				],

			}
		},

		components: {

		},
		mounted() {
			let that=this
			that.userInfo = store.state.userInfo

		},
		methods: {
			btnShow() {
				this.isShow = true;
			},
			jumpCash(){
				wx.navigateTo({url:`../myself-cash/main`})
			},
			btnHide() {
				this.isShow = false;
			},
			addClass(index) {
				this.current = index;
				this.isShow = false;
				this.type = this.popup[index].name;
			}
		},

		computed: {
			expenditure() {
				return this.bills.expenditure.toFixed(2);
			},
			income() {
				return this.bills.income.toFixed(2);
			},
			tofiex() {
				return(this.bills.income - this.bills.expenditure).toFixed(2);
			},
			num() {
				for(var i in this.bill) {
					var num = this.bill[i].num.toFixed(2);
					return num;
				}
			}
		},
	}
</script>

<style scoped lang="less">
	.container {
		width: 100%;
		background-color: #f9f9f9;
		/*佣金*/
		.myselfdetails {
			background-color: #fff;
			.myselfdetail {
				display: flex;
				justify-content: space-between;
				width: 283px;
				margin: 0 auto;
				padding: 20px 0;
				.myselfdetail-left {
					text-align: center;
					span {
						display: block;
						&:nth-child(1) {
							color: #111111;
							font-size: 15px;
						}
						&:nth-child(2) {
							color: #111111;
							font-size: 33px;
							font-family: "roboto";
							padding: 30px 0;
						}
					}
				}
				.myselfdetail-right {
					text-align: center;
					span {
						display: block;
						&:nth-child(1) {
							color: #111111;
							font-size: 15px;
						}
						&:nth-child(2) {
							color: #32a1ff;
							font-size: 33px;
							font-family: "roboto";
							padding: 30px 0;
						}
					}
					.cashBtn {
						width: 80px;
						height: 33px;
						background-color: #32a1ff;
						color: #fff;
						font-size: 14px;
						line-height: 33px;
						border-radius: 3px;
						margin: 0 auto;
						text-align: center;
						span {
							color: #fff;
						}
					}
				}
			}
		}
		.flowbill {
			margin-top: 8px;
			background-color: #fff;
			width: 100%;
			padding: 0 12px;
			box-sizing: border-box;
			/*流水信息栏*/
			.flowbill-cate {
				margin-bottom: 10px;
				width: 100%;
				height: 60px;
				line-height: 60px;
				display: flex;
				justify-content: space-between;
				.tit {
					color: 111111;
					font-size: 18px;
					font-weight: bold;
				}
				.type {
					color: #666666;
					font-size: 14px;
				}
				.day {
					font-size: 14px;
					color: #111111;
				}
			}
			/*	<!--流水列表 -->*/
			.flowbill-list {
				.flowbill-list-li,
				.cash {
					position: relative;
					padding: 20px 0;
					&:nth-child(1) {
						padding: 0 0 20px 0;
					}
					.img {
						width: 44px;
						height: 44px;
						vertical-align: middle;
						border-radius: 50%;
					}
					.name {
						margin-left: 12px;
						margin-top: 4px;
						span {
							display: block;
							&:nth-child(1) {
								font-size: 14px;
								color: #111111;
							}
							&:nth-child(2) {
								font-size: 12px;
								color: #999999;
								margin-top: 2px;
							}
						}
					}
					.num {
						font-size: 18px;
						font-family: "roboto";
						line-height: 30px;
						
					}
					.xian {
						height: 1px;
						background-color: #DEDEDE;
						width: 297px;
						position: absolute;
						right: 0;
						bottom: 0;
					}
				}
				/*收入*/
				.bills {
					position: relative;
					padding: 20px 0;
					&:nth-child(1) {
						padding: 0 0 20px 0;
					}
					.img {
						width: 44px;
						height: 44px;
						vertical-align: middle;
						border-radius: 50%;
					}
					.name {
						margin-left: 12px;
						margin-top: 4px;
						.day {
							display: block;
							font-size: 14px;
							color: #111111;
							font-weight: bold;
						 }
						 
						 div{
						 	margin-top: 2px;
						 	display: flex;
						 	span{
						 		display:block;
						 		font-size: 12px;
								color: #999999;
								margin-left: 12px;
								&:nth-child(1){
									margin-left: 0;
								}
						 	}
						 }
					}
					.num {
						font-size: 18px;
						font-family: "roboto";
						line-height: 30px;
						span{
							font-weight: bold;
							font-size: 15px;
							color: #111111;
						}
					}
					.xian {
						height: 1px;
						background-color: #DEDEDE;
						width: 297px;
						position: absolute;
						right: 0;
						bottom: 0;
					}
				}
			}
		}
		.popup {
			position: fixed;
			bottom: 0;
			width: 100%;
			background-color: #f9f9f9;
			.popup-wp {
				padding: 20px 12px;
				.popup-header {
					padding-bottom: 20px;
					border-bottom: 1px solid #DEDEDE;
					font-size: 14px;
					color: #111111;
					text-align: center;
				}
				.popup-cant {
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					padding: 10px 8px 20px 8px;
					span {
						display: block;
						color: #666666;
						font-size: 14px;
						text-align: center;
						width: 105px;
						height: 66px;
						line-height: 66px;
						background-color: #fff;
						border-radius: 5px;
						margin-top: 10px;
					}
					.on {
						color: #fff;
						background-color: #32A1FF;
					}
				}
				.popup-footer {
					padding-top: 20px;
					border-top: 1px solid #DEDEDE;
					text-align: center;
					font-size: 14px;
					color: #111111;
				}
			}
		}
	}
</style>