<template>
	<div>
		<blockquote v-if="!isLoading">
			<loading></loading>
		</blockquote>
		<blockquote v-else>
			<div class="order-detail" v-if="isWrite">
				<!--模块1-->
				<div class="title">
					<span>{{OrderInfo.status}}</span>
					<span v-if="OrderInfo.orderType==1">下单时间:{{OrderInfo.createTime}}</span>
					<span v-else>过期时间:{{OrderInfo.endTime}}</span>
				</div>
				<!--模块2-->
				<div class="rec-li ">
					<div class="rec-li-warp clr">
						<div class="img fl"><img :src="OrderInfo.thumbnail" /></div>
						<div class="rec-center fl">
							<div class="tit">{{OrderInfo.goodName}}</div>
							<div class="name"></div>
							<div class="present "><span>￥{{OrderInfo.goodsAmount}}</span></div>
						</div>
						<div class="rec-right fr">
							<div class="clr">
								<div class="make fr" v-if='OrderInfo.orderType==1'>免预约</div>
								<div class="make fr" v-else>需预约</div>
							</div>
							<div class="people "></div>
							<div class="sell "></div>
						</div>
					</div>
					<!--总价-->
					<div class="prices">
						<div class="price1">
							<span>商品总价: </span>
							<span> ¥ {{OrderInfo.goodsAmount}}</span>
						</div>
						<div class="price2">
							<span>推荐师优惠：</span>
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
				<!--订单详情-->
		

				<!--按钮-->
				<div class="dele" >
					<span @click='writeOff(OrderInfo.orderId)' v-if="OrderInfo.status=='待核销'">立即核销</span>
					<span v-else>已核销</span>
					<span @click='jumpIndex'>返回首页</span>
				</div>
			</div>
			<div v-else class="audit">
				<span>您不是核销员哦,无法核销</span>
				<span><img :src="auditimg"></span> 
				<span @click='jumpIndex'>返回首页</span>
			</div>
		</blockquote>
		<loginModel ref="loginModel"></loginModel> 
	</div>
</template>

<script>
	import goodslist from '@/components/goodslist'
	import loginModel from "@/components/loginModel"; 
	import loading from '@/components/loading'
	import store from '@/store/store'
	import Api from '@/api/order'
	import Index_Lib from '@/utils/index'
	import Lib from '@/utils/lib'
	export default {
		components: {
			goodslist,
			loginModel,
			loading
		},

		data() {
			return {
				isLoading:false,
				isWrite:false,
				auditimg:'/static/images/audit.png',
				OrderInfo:{},
				isSubmit:false,
				orderId:'',
			}
		},
		methods:{
			// 判断能否核销
			async isWriteOff(unionId,orderId){
				let that=this
				let params={}

				params.unionId=unionId
				params.orderId=orderId
				let isWriteOffRes=await Api.isWriteOff(params)
				if(isWriteOffRes.code==0){
					that.isWrite=true
					that.getOnList(that.orderId)
				}
				else{
					that.isWrite=false
					that.isLoading = true;
				}
			},
			// 核销
			async writeOff(orderId){
				let that=this
				let params={}
				params.orderId=orderId
				params.memberName=store.state.userInfo.name
				if(!that.isSubmit){
					that.isSubmit=true
					let writeOffRes=await Api.writeOff(params)
					if(writeOffRes.code==0){
						Lib.showToast('核销成功','success')
						that.getOnList(orderId)
					}
				}

			},
			async getOnList(orderId){
				let that = this;
				let data = {};
				data.orderId=orderId
				let res = await Api.getOrderList(data).catch(err => {
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
					if(OrderInfo.orderType==2){
						OrderInfo.endTime=Index_Lib.formatTime(OrderInfo.endTime)
					}
					that.OrderInfo = OrderInfo
				};
				that.isLoading = true;
			},
			jumpIndex(){
				wx.switchTab({
					url:'../index/main'
				})
			} 
		},
		async mounted(){
			let that=this
			await that.$refs.loginModel.userLogin()
			that.isWriteOff(store.state.userInfo.unionid,that.orderId)
			// that.isWriteOff('oN-X01F3aJVZsIG0p-n-Kcn69lpA',that.orderId)
		},

		onLoad(options){
			var that = this 
			this.isLoading = false;
			this.isWrite = false;
			this.auditimg = '/static/images/audit.png';
			this.OrderInfo = {};
			this.isSubmit = false;
			// this.orderId=''
			that.orderId=decodeURIComponent(options.scene)
		},
		computed: {
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
					font-size: 18px;
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

		.dele {
			background-color: #fff;
			width: 100%;
			padding: 8px 12px;
			position: fixed;
			bottom: 0;
			box-sizing: border-box;
            span{
            	display: block;
            	text-align: center;
            	width: 100%;          
            	height: 33px;
            	line-height:33px ;
            	color: #FFF;
            	font-size: 14PX;
            	background-color: #ff7d28;
            	border-radius: 16px;
            	margin-bottom: 15px;
            }
		}
	}
	 .audit{
		width: 100%;
		span{
			display: block;
			text-align:center; 
			&:nth-child(1){
				color: #111111;
				font-size:16px;
				padding-top: 63px;
				padding-bottom: 22px;
			}
				&:nth-child(2){
				width: 116px;
				height: 116px;
				margin:  0 auto; 
				img{width: 100%;height: 100%;}
			}
			&:nth-child(3){
				color: #fff;
			    font-size:16px;
			    width: 290px;
			    height: 49px;
			    line-height: 49px;
			    background-color: #32a1ff;
			    margin: 0 auto;
			    margin-top: 66px;
			}
		}
	}
</style>