<template>
	<div>
		<blockquote v-if="!isLoading">
			<loading></loading>
		</blockquote>
		<blockquote v-else>
            <div class="order-detail">
				<!--产品-->
				<div class="rec-li ">
					<div class="rec-li-warp clr">
						<div class="img fl"><img :src="goodDetail.thumbnail" /></div>
						<div class="rec-center fl">
							<div class="tit fontHidden">{{goodDetail.title}}</div>
							<div class="name fontHidden1">{{goodDetail.goodName}}</div>
							<div class="present "><span>所需积分：{{goodDetail.buyIntegral}}</span></div>
						</div>
						<div class="rec-right fr">
						
							<!-- <div class="people ">{{goodDetail.people}}</div> -->
							<div class="sell ">已售:{{goodDetail.sales}}</div>
						</div>
					</div>
					<!--总价-->
					<div class="prices">
						<div class="price1">
							<p>数量:</p>
							<p>1</p>
						</div>
						<div class="price2">
							<p>商品积分: {{goodDetail.buyIntegral}}</p>
							<p> </p>
						</div>
						<div class="price2">
							<p>用户积分: {{userInfo.point}}</p>
							<p> </p>
						</div>
					
						<!--<div class="price6">
							<p>预约时间</p>
							<p>{{item.phone}}</p>
						</div>-->
					</div>
				</div>
				<!--支付-->				
			</div>
			<!--提交订单-->
			<button class="submit" :disbaled='isSubmit' @click='submit_PointOrder'>
				<span>确认兑换</span>
			</button>
		</blockquote>
	</div>
</template>

<script>
	import goodslist from '@/components/goodslist'
	import store from '@/store/store'
	import lib from '@/utils/lib'
	import Api from '@/api/turntable'
	import Api_order from '@/api/order'
	import loading from '@/components/loading'
	import util from '@/utils/index'
	export default {
		components: {
			goodslist,
			loading
		},

		data() {
			return {
				isLoading:false,
				isChoose:true,
				isSubmit:false,
				goodDetail:{},
				userInfo:{},
				useBanlan:0,
				orderDO:{}
			}
		},
		computed: {
		
		},
		methods:{
			submit_PointOrder(){
				let that = this;
				if(that.userInfo.point >= that.goodDetail.buyIntegral){
					wx.showModal({
						title: '提示',
						content: '是否消耗'+that.goodDetail.buyIntegral+'兑换',
						success(res) {
							if (res.confirm) {
								that.savaPointOrder()
							} else if (res.cancel) {
							    console.log('用户点击取消')
							}
						}
					})
				}else{
					lib.showToast('抱歉你的积分不够',"none")
				}
			},

            //保存订单
			async savaPointOrder(){
				let that = this;
				wx.showLoading({title: '加载中'})
				let data = {}
				data.unionId = that.userInfo.unionid
				data.goodsId = that.goodDetail.goodId
				data.goodsAmount = that.goodDetail.buyIntegral
				data.orderAmount = that.goodDetail.buyIntegral
				data.needPayMoney = that.goodDetail.buyIntegral
				data.thumbnail = that.goodDetail.thumbnail
				data.goodName = that.goodDetail.goodName
				data.catName = that.goodDetail.catName
				data.price = that.goodDetail.buyIntegral
				//#endregion
				let res = await Api.submin_pointOrder(data).catch(err => {
					lib.showToast('抱歉网络开了小差',"none")
				})
				if(res.code == 0){
					that.orderDO = res.orderDO
					that.GetQRCode(res.orderDO); //生成二维码
				}else{
			     	lib.showToast('抱歉网络开了小差',"none")
				}
			},
			
			//生成二维码
			async GetQRCode(orderDO){
				let that = this;
				wx.showLoading({title: '加载中'})
				let QRparams={}
				QRparams.params=orderDO.orderId
				QRparams.page='pages/order-cancel/main'
				let getQRCode=await Api_order.getQRCode(QRparams).catch(err => {
					lib.showToast('抱歉网络开了小差',"none")
				})
				if(getQRCode.code == 0){
				   let data = {}
				   data.orderId = orderDO.orderId;
				   data.orderCode = getQRCode.url
				   that.delete_point(data); //支付成功
				}else{
					lib.showToast('抱歉未生成！',"none")
				}
			},


            //扣除积分
            delete_point(qrCodeData){
				let that = this;
				wx.hideLoading()
                let data = {
                    unionId:that.userInfo.unionid,
                    point:that.goodDetail.buyIntegral
                }
                Api.submit_ShopOrder(data).then(res => {

				if(res.code == 0){
                    that.ponitOrderSuccess(qrCodeData); //扣除用户的积分
				}else{
					lib.showToast('抱歉支付失败！',"none")
				}
                }).catch(err => {
                  lib.showToast('抱歉网络开了小差',"none")
                })
			},

			//支付成功
			async ponitOrderSuccess(qrCodeData){
				let that = this;
				wx.showLoading({title: '加载中'})
				let res = await Api.submint_OrderSuccess(qrCodeData).catch(err => {
					lib.showToast('抱歉网络开了小差',"none")
				})
				if(res.code == 0){
						util.updateUserInfo()
						lib.showToast('你好兑换成功',"success")
						wx.switchTab({
						     url: '../order/main'
						})
				}else{
						 lib.showToast('你好兑换失败',"success")
				}
			},

	

		},
		mounted(){
			let that=this
            that.userInfo = store.state.userInfo
		},
		
		onLoad(options){
			//1为普通订单2为预约订单
			this.useBanlan=0
			this.goodDetail = JSON.parse(options.goodDetail)
			this.isLoading = true;
		},
		
		onUnload(){
			this.isLoading=false;
			this.isChoose=true;
			this.isSubmit=false;
			this.goodDetail={};
			this.userInfo={};
			this.useBanlan=0;
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
					width:100%;
					display: flex;
					justify-content: space-between;
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