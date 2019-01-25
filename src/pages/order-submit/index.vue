<template>
	<div>
		<div class="order-detail">
			<!--产品-->
			<div class="rec-li ">
				<div class="rec-li-warp clr">
					<div class="img fl"><img :src="goodDetail.thumbnail" /></div>
					<div class="rec-center fl">
						<div class="tit">{{goodDetail.title}}</div>
						<div class="name">{{goodDetail.goodName}}</div>
						<div class="present "><span>￥:{{goodDetail.price}}</span> <span>原价:{{goodDetail.showPrice}}</span></div>
					</div>
					<div class="rec-right fr">
						<div class="clr"> 
							<div class="make fr">{{make}}</div>
						</div>
						<!-- <div class="people ">{{goodDetail.people}}</div> -->
						<div class="sell ">已售:{{goodDetail.showSales}}</div>
					</div>
				</div>
				<!--总价-->
				<div class="prices">
					<div class="price1">
						<p>数量:</p>
						<p>1</p>
					</div>
					<div class="price2">
						<p>商品总价: </p>
						<p> ¥ {{goodDetail.price}}</p>
					</div>
					<div class="price2">
						<p>会员折扣: </p>
						<p> {{userInfo.discount}}折</p>
					</div>
					<div class="price2">
						<p>折后价: </p>
						<p>{{discountPrice}}元</p>
					</div>
					<div class="price3">
						<p>推荐师优惠：</p>
						<p v-if="userInfo.whetherDistribe==0"> <span>(非推荐师优惠0元)</span></p>
						<p v-else> ¥ {{goodDetail.returnAmount}}元</p>	
					</div>
					<!--<div class="price6">
						<p>预约时间</p>
						<p>{{item.phone}}</p>
					</div>-->
				</div>
			</div>
			<!--支付-->		
			<div class="payment">
				<div class="payment-commission">
					<div class="inp">
						<span><input type="checkbox"  value="佣金抵扣" /></span><span>佣金抵扣</span>
					</div>
					<div>还有{{userInfo.balance}}可用佣金</div>
				</div>
			</div>			
		</div>
		<!--提交订单-->
		<button class="submit" :disbaled='isSubmit' @click='save'>
			<span>¥ {{totalPay}}</span>
			<span>提交订单</span>
		</button>
	</div>
</template>

<script>
	import goodslist from '@/components/goodslist'
	import store from '@/store/store'
	import util from '@/utils/index'
	import Api from '@/api/order'
	export default {
		components: {
			goodslist
		},

		data() {
			return {
				isSubmit:false,
				goodDetail:{},
				orderForm:{num:1},
				userInfo:{},
				order:{},
				orderType:''
			
			}
		},
		computed: {
			make(){
				return this.goodDetail.book==2?'免预约':'需预约'
			},
			discountPrice(){
				let that=this
				return Number(that.goodDetail.price*that.userInfo.discount/10).toFixed(2)
			},
			totalPay(){
				let that=this
				if(that.userInfo.whetherDistribe!=0){
					return util.accSub(that.discountPrice,that.goodDetail.returnAmount)
				}else{
					return util.accSub(that.discountPrice,0)
				}
				
			}
		},
		methods:{
				async save(){
				let that=this
				wx.showLoading({
					title: '请稍等',
				})
				let params={}
				if(!that.isSubmit){
					that.isSubmit=true
					if(store.state.codeUnionid!=''){
						params.payStatus=2
						params.paymentId=store.state.codeUnionid
					}
					else{
						params.payStatus=1
					}
					params.orderType=that.orderType	
					if(that.orderType==2){
						params.beginTime=store.state.appointment.beginTime
						params.endTime=store.state.appointment.endTime
					}	
					params.unionId=that.userInfo.unionid
					params.paymentType=1
					params.goodsAmount=that.goodDetail.price
					params.orderAmount=that.totalPay
					params.gainedpoint=that.goodDetail.buyIntegral == null ? 0 : that.goodDetail.buyIntegral
					params.discount=that.userInfo.discount
					params.needPayMoney=that.totalPay
					params.balance=that.userInfo.balance
					params.recommend=that.goodDetail.returnAmount == null ? 0 : that.goodDetail.returnAmount
					params.goodsId=that.goodDetail.id
					params.thumbnail=that.goodDetail.thumbnail
					params.goodName=that.goodDetail.goodName
					params.price=that.goodDetail.price
					let saveRes=await Api.orderSave(params)
					if(saveRes.code==0){
						wx.hideLoading()
						that.order=saveRes.orderDO
						console.log(that.order);
						that.weixinPay()
					}	
				}
				
			},
			weixinPay(){
				let params={}
				let that=this
				params.sn = that.order.sn
				params.openid=that.userInfo.xopenid
	            // params.total_fee = that.order.needPayMoney*100
	            params.total_fee=1
	            Api.prepay(params).then(function(parRes){
	            	wx.requestPayment({
	            		timeStamp: parRes.timeStamp,
	            		nonceStr: parRes.nonceStr,
	            		package: parRes.package,
	            		signType: parRes.signType, 
	            		paySign: parRes.paySign,
	            		success: function (res) {
	            			wx.showToast({
	            				title: '支付成功',
	            				icon: 'success',
	            				duration: 2000
	            			})
	            			that.payOrder()
	            		},
	            		fail: function (res) {
		                        // fail
		                        wx.showToast({
		                        	title: '支付失败',
		                        	icon: 'success',
		                        	duration: 2000
		                        })
		                    },
		                    complete: function (complete) {
		                        // complete   
		                        that.isSubmit=false
		                    }
		                })
	            })
	        },
	        async payOrder(){
	        	// 订单支付成功之后修改订单状态
	        	let QRparams={}
	        	let that=this
	            QRparams.orderId=that.order.orderId
	            QRparams.page='pages/xxxx/main'
	        	let getQRCode=await Api.getQRCode(QRparams)
	        	console.log(getQRCode);
	        	let statuParam={}
	        	statuParam.orderId=that.order.orderId
	        	statuParam.orderCode=getQRCode.msg
	        	let payOrder=await Api.payOrder(statuParam)
	        	console.log(payOrder);
	        }
		},
		mounted(){
			let that=this
			that.goodDetail = store.state.goodDetail
			that.userInfo = store.state.userInfo
		},
		onLoad(options){
			// 1为普通订单2为预约订单
			this.orderType=options.orderType
			console.log(options);
		}
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