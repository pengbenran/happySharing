<template>
	<!--类目-->
	<div class="container">
		<div class="order-nav">
			<div @click="change(index)" v-for="(item,index) in recommendList" class="order-nav-li" :class="listcurr==index?'active':''">
				{{item.name}}
			</div>
		</div>
		
		<!--列表-->
		<div class="rec-wrap centered" v-if="goodList.length != 0">
			<div class="rec-li" v-for="(orderItem,index) in goodList" :key="orderItem.orderId">
				<div class="top">
					<div>
						订单编号:{{orderItem.orderId}}
					</div>
					<div>
						<!-- 下单时间:{{orderItem.createTime}} -->
					</div>
				</div>
				<div class="center">
					<div class="cant clr">
						<div class="img fl"><img :src="orderItem.goodThumbnail" /></div>
						<div class="rec-center fl">
							<div class="tit fontHidden">{{orderItem.goodName}}</div>
							<div class="name fontHidden1">{{orderItem.goodName}}</div>
							<div class="present ">￥:{{orderItem.goodsAmount}}</div>

						</div>
						<div class="rec-right fr">
							<div class="time" v-if="orderItem.goodType == 2">
                                 <span >预约订单</span>
							</div>
							<div class="time" v-if="orderItem.goodType == 3">
                                 <span >积分订单</span>
							</div>
							<div class="time" v-if="orderItem.goodType == 4">
                                 <span >秒杀订单</span>
							</div>
							<div class="time" v-if="orderItem.goodType == 1">
                                 <span >普通订单</span>
							</div>
							<div class="num ">数量 : {{orderItem.goodsNum}}</div>
								<span class="time ">
								   <span v-if="orderItem.status == 0">待付款</span>
								   <span v-if="orderItem.status == 1">待核销</span>
								   <span v-if="orderItem.status == 2">已核销</span>
								   <span v-if="orderItem.status == 3">已取消</span>
								</span>
						</div>
					</div>
					<div class="clr">
						<div class="line fr"></div>
					</div>
					<div class="rec-bottom">
						实际支付金额:{{orderItem.orderAmount}} 
						<span>{{orderItem.orderType == 4? '分':'元'}}</span>
					</div>
				</div>
				<div class="bottom" v-if="listcurr == 0">
					<div v-if="orderItem.status == 0" class="bottomCase">
						<botton plain='true' class="closeBtn" @click="removeOrder(orderItem.orderId,index)">取消订单</botton>
						<botton  class="queBtn"  @click="Pay(orderItem.orderId,orderItem.needPayMoney,orderItem.balance,index)" >立即付款</botton>
					</div>
					<div v-if="orderItem.status == 1" class="bottom">
						<botton   class="queBtn"  @click="orderDetail(orderItem.orderId)">立即使用</botton>
					</div>
					<div v-if="orderItem.status == 2" class="bottom">
						<botton  class="queBtn" @click="removeOrder(orderItem.orderId,index)">删除订单</botton>
						<botton class="queBtn" @click="orderDetail(orderItem.orderId)">查看订单</botton>
					</div>

					<div v-if="orderItem.status == 3" class="bottom">
						<botton  class="queBtn" @click="removeOrder(orderItem.orderId,index)">删除订单</botton>
					</div>
				</div>
				<!--全部订单-->

				<div class="bottom" v-if="listcurr == 1">
					<botton plain='true' class="closeBtn" @click="removeOrder(orderItem.orderId,index)">取消订单</botton>
					<botton  class="queBtn"  @click="Pay(orderItem.orderId,orderItem.needPayMoney,orderItem.balance,index)">立即付款</botton>
				</div>

				<div class="bottom" v-if="listcurr == 2">
					<botton   class="queBtn"  @click="orderDetail(orderItem.orderId)">立即使用</botton>
				</div>

				<div class="bottom" v-if="listcurr == 3">
					<botton  class="queBtn" @click="removeOrder(orderItem.orderId,index)">删除订单</botton>
					<botton class="queBtn" @click="orderDetail(orderItem.orderId)">查看订单</botton>
				</div>
				<div class="bottom" v-if="listcurr == 4">
					<botton  class="queBtn" @click="removeOrder(orderItem.orderId,index)">删除订单</botton>
				</div>			
			</div>			
		</div>
		<!--空空如也-->
		<div class="not" v-else><img :src="imgList.not"/></div>
		<nomoreTip v-if="!hasMore"></nomoreTip>

	</div>
</template>

<script>
import API from '@/api/order'
import Store from '@/store/store'
import Lib from '@/utils/lib'
import Index_Lib from '@/utils/index'
import nomoreTip from "@/components/nomoreTip"
import Config from '@/config'
	export default {
		data() {
			return {
				unionid:'',
				isSubmit:false,
				imgList:{not:Config.imgurl+'/not.png'},
				listcurr:0,
				recommendList: [{
						name: "全部",
						options: [],
						page: 1,
						limit: 10,
						flag: true,
					},
					{
						name: "待付款",
						options: [],
						page: 1,
						limit: 10,
						flag: true,
						status: 0,
						expiredStatus: 2
					},
					{
						name: "待使用",
						options: [],
						page: 1,
						limit: 10,
						flag: true,
						status: 1,
						expiredStatus: 2
					},
					{
						name: "已使用",
						options: [],
						page: 1,
						limit: 10,
						flag: true,
						status: 2,
						expiredStatus: 2
					},
					{
						name: "已过期",
						options: [],
						page: 1,
						limit: 10,
						flag: true,
						status: 3,
						expiredStatus: 1
					},
				],
				userInfo:{},
			}
		},
		computed:{
			goodList(){
				let that=this
				return that.recommendList[that.listcurr].options
			}
		},
		components: {
            nomoreTip
		},
	   onReachBottom:function(){
			let that = this;
            that.recommendList[that.listcurr].page += 1
            let data = {
            	unionId: that.userInfo.unionid,
            	page: that.recommendList[that.listcurr].page,
            	limit: that.recommendList[that.listcurr].limit,
            	status: that.recommendList[that.listcurr].status,
            	expiredStatus: that.recommendList[that.listcurr].expiredStatus
            }
			that.GetOrderListData(data,that.listcurr)
			
		},
		methods: {
			//请求数据
			GetOrderListData(data, index) {
				let that = this;
				if(that.recommendList[index].flag){
					API.GetOrderList(data).then(res => {
						if(res.code == 0) {
							if(res.orderList.length < data.limit){
								that.recommendList[index].flag = false
							}
							that.recommendList[index].options = that.recommendList[index].options.concat(res.orderList);
						} else {
							wx.showToast({
								title: '网络错误',
								icon: 'none',
								duration: 2000
							})
						}
					}).catch(err => {
						wx.showToast({
							title: '网络错误',
							icon: 'none',
							duration: 2000
						})
					})
				}
				else{
					wx.showToast({
						title: '没有更多数据了',
						icon: 'none',
						duration: 2000
					})
				}
				
			},
			change(index) {
				let that = this
				that.listcurr = index
				that.recommendList[index].options=[]
				that.recommendList[index].page=1
				that.recommendList[index].flag=true
				let data={}
				if(that.listcurr==0){
					data.unionId=that.userInfo.unionid
					data.page=that.recommendList[that.listcurr].page
					data.limit=that.recommendList[that.listcurr].limit
				}
				else{
					data.unionId=that.userInfo.unionid
					data.page=that.recommendList[that.listcurr].page
					data.limit=that.recommendList[that.listcurr].limit
					data.status=that.recommendList[that.listcurr].status
					data.expiredStatus=that.recommendList[that.listcurr].expiredStatus
				}
				
				that.GetOrderListData(data, that.listcurr)
			},
			//取消订单
			removeOrder(orderId,index){
				let that = this;
				wx.showModal({
					title: '提示',
					content: '是否取消订单?',
					success(res) {
						if (res.confirm) {		
							wx.showLoading({title: '加载中',})
							API.deleteOrder({
								orderId: orderId
							}).then(res => {
								if(res.code == 0) {
									that.goodList.splice(index, 1)
									wx.showToast({
										title: '取消成功',
										icon: 'none',
										duration: 2000
									})
								} else {
									wx.showToast({
										title: '取消失败',
										icon: 'none',
										duration: 2000
									})
								}
							})
						} else if (res.cancel) {

						}
					}
					})


			},

			orderDetail(orderId){
				 wx.navigateTo({
					url: '../order-detail/main?orderId='+orderId
				})
			},
			Pay(orderId,needPayMoney,balance,index){
				let that = this;
				if(!that.isSubmit) {
					that.isSubmit = true
					that.weixinPay(orderId,needPayMoney,balance)
				}
			},

			//立即付款
			weixinPay(orderId,needPayMoney,balance,index){
				let that = this;
				let params={}
				if(that.userInfo.balance<balance){
					Lib.showToast('余额不足','none')
					that.isSubmit = false
				}
				else{
				wx.showLoading({ title: '加载中',})
				params.orderId = orderId
				params.openId = that.userInfo.xopenid
				// params.total_fee = needPayMoney*100
				params.payAmount = 1
	            // params.total_fee=1
				API.prepay(params).then(function(parRes) {
					if(parRes.code==500){
						that.isSubmit=false
						wx.showToast({
								title: '网络错误请重试',
								icon: 'none',
								duration: 2000
							})
					}else{
						wx.requestPayment({
							timeStamp: parRes.Map.timeStamp,
							nonceStr: parRes.Map.nonceStr,
							package: parRes.Map.package,
							signType: parRes.Map.signType,
							paySign: parRes.Map.paySign,
							success: function(res) {
								wx.showToast({
									title: '支付成功',
									icon: 'success',
									duration: 2000
								})
								that.goodList.splice(index,1)
								that.payOrder(orderId)
							},
							fail: function(res) {
							// fail
							wx.showToast({
								title: '支付失败',
								icon: 'success',
								duration: 2000
							})
						},
						complete: function(complete) {
							// complete   
							that.isSubmit = false
						}
					})
					}
					
				})
				}
			},
			async payOrder(orderId) {
				// 订单支付成功之后修改订单状态
				let that = this
				let statuParam = {}
				statuParam.orderId = orderId
				let payOrder = await API.payOrder(statuParam)
				if(payOrder.code == 0) {
					utils.updateUserInfo()
					wx.redirectTo({
						url: '../myself-order-detail/main?orderId=' + orderId
					})
				}
			}		
		},
		onShow() {
			let that = this
			that.recommendList.map(Mres => {
				Mres.options = [];
				Mres.flag=true
				return Mres
			})

			//重置
			that.listcurr = 0;
			that.userInfo = Store.state.userInfo;
			that.GetOrderListData(Object.assign({}, {
				unionId: that.userInfo.unionid
			}, {
				page: 1,
				limit: 10
			}), 0)
		},

		created() { // 调用应用实例的方法获取全局数据
		
		}
	}
</script>

<style scoped lang="less">
/*空空如也*/
.not{
	width:133px ;
	height: 181px;
	position: absolute;
	left: 50%;
	top: 112px;
	margin-left: -65px;
}



	/*导航*/
	.order-nav {
		position: fixed;
		top: 0;
		display: flex;
		justify-content: space-around;
		background-color: #fff;
		width: 100%;
		.order-nav-li {
			flex-grow:1;
			height: 38px;
			line-height: 38px;
			text-align: center;
			font-size: 14px;
			color: #111111;	
		}
		.active {
			border-bottom: 1px solid #ff7d28;
			color: #ff7d28;
		}
	}
	/*列表*/
	
	.rec-li {
		padding-bottom: 36px;
		&:nth-child(1) {
			margin-top: 56px;
		}
		.top{
			display: flex;
			justify-content: space-between;
			font-size: 15px;
			height: 30px;
			line-height:30px;
		}
		.center{
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
			width: 210px;
			line-height: 23px;
			overflow: hidden;
			padding-left: 12px;
			box-sizing: border-box;
			.tit {
				font-size: 15px;
				color: #111111;
				line-height: 24px;
			}
			.name {
				font-size: 12px;
				color: #999999;
			}
			.present {
				color: #ff0000;
				font-size: 17px;
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
			.time {
				color: #ffb10f;
				font-size: 11px;
			}
		}
		.rec-right {
			width: 60px;
			margin-top: 20px;
			text-align: right;
			.use {
				line-height: 24px;
				font-size: 12px;
				color: #ff7d28;
			}
			.time span{
				font-size: 12px;
				padding: 0 4px;
				color: #ff7d28;
				border:1px solid #ff7d28;
			}
			.num {
				color: #999999;
				font-size: 12px;
			}
			.sell {
				color: #666666;
				font-size: 12px;
			}
		}
		.line {
			width: 264px;
			height: 1px;
			background-color: #DEDEDE;
			margin: 6px 0 10px 0;
		}
		.rec-bottom {
			font-size: 14px;
			text-align: right;
			height: 25px;
			line-height:25px;
			padding-right: 10px;
			box-sizing: border-box;
		}
	}

	.bottom	.closeBtn{width: 80px; height: 33px;text-align: center;line-height: 33px;border-radius: 15px;border:1px solid rgb(214, 214, 214);color:rgb(0, 0, 0);margin-right: 10px;font-size: 15px;}
	.bottomCase {width: 100%;text-align: right;
	     botton{display:  inline-block;}
	}
	.bottom{
		display: flex;
			justify-content: flex-end;
			.queBtn {
				width: 80px;
				height: 33px;
				border: 1px solid #999999;
				border-radius: 17px;
				line-height: 33px;
				text-align: center;
				color: #666666;
				font-size: 14px;
				margin-right: 12px;


					background-color: #ff7d28;
					border: 1px solid #ff7d28;
					color: #fff;

			}
	}
	}
</style>