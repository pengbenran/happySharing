<template>
	<!--类目-->
	<div class="container">
		<div class="order-nav">
			<div @click="change(index)" v-for="(item,index) in nav" class="order-nav-li" :class="item.isSelect? 'active':''">
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
						下单时间:{{orderItem.createTime}}
					</div>
				</div>
				<div class="center">
					<div class="cant clr">
						<div class="img fl"><img :src="orderItem.thumbnail" /></div>
						<div class="rec-center fl">
							<div class="tit fontHidden">{{orderItem.goodName}}</div>
							<div class="name fontHidden1">{{orderItem.goodName}}</div>
							<div class="present ">￥:{{orderItem.goodsAmount}}</div>

						</div>
						<div class="rec-right fr">
							<div class="time" v-if="orderItem.orderType == 3">
                                 <span >积分订单</span>
							</div>

							<div class="num ">数量 : {{orderItem.goodsNum}}</div>
								<span class="time ">
								   <span v-show="orderItem.status == 0">待付款</span>
								   <span v-show="orderItem.status == 1">待核销</span>
								   <span v-show="orderItem.status == 2">已核销</span>
								   <span v-show="orderItem.status == 3">已取消</span>
								</span>
						</div>
					</div>
					<div class="clr">
						<div class="line fr"></div>
					</div>
					<div class="rec-bottom">
						实际支付金额:{{orderItem.orderAmount}} 
						<span>{{orderItem.orderType == 3? '分':'元'}}</span>
					</div>
				</div>
				<div class="bottom" v-if="SelectIndex == 0">
					<div v-if="orderItem.status == 0" class="bottomCase">
						<botton plain='true' class="closeBtn" @click="removeOrder(orderItem.orderId,index)">取消订单</botton>
						<botton  class="queBtn"  :disabled='disabledBtn' @click="wxPay(orderItem.sn,orderItem.needPayMoney,orderItem.orderId)">立即付款</botton>
					</div>
					<div v-if="orderItem.status == 1" class="bottom">
						<botton   class="queBtn"  @click="orderDetail(orderItem.orderId)">立即使用</botton>
					</div>
					<div v-if="orderItem.status == 2" class="bottom">
						<botton  class="queBtn" @click="deleteorder(orderItem.orderId,index)">删除订单</botton>
						<botton class="queBtn" @click="orderDetail(orderItem.orderId)">查看订单</botton>
					</div>

					<div v-if="orderItem.status == 3" class="bottom">
						<botton  class="queBtn" @click="deleteorder(orderItem.orderId,index)">删除订单</botton>
					</div>
				</div>
				<!--全部订单-->

				<div class="bottom" v-if="SelectIndex == 1">
					<botton plain='true' class="closeBtn" @click="removeOrder(orderItem.orderId,index)">取消订单</botton>
					<botton  class="queBtn" :disabled='disabledBtn' @click="wxPay(orderItem.sn,orderItem.needPayMoney,orderItem.orderId,orderItem.balance)">立即付款</botton>
				</div>

				<div class="bottom" v-if="SelectIndex == 2">
					<botton   class="queBtn"  @click="orderDetail(orderItem.orderId)">立即使用</botton>
				</div>

				<div class="bottom" v-if="SelectIndex == 3">
					<botton  class="queBtn" @click="deleteorder(orderItem.orderId,index)">删除订单</botton>
					<botton class="queBtn" @click="orderDetail(orderItem.orderId)">查看订单</botton>
				</div>

				
				<div class="bottom" v-if="SelectIndex == 4">
					<botton  class="queBtn" @click="deleteorder(orderItem.orderId,index)">删除订单</botton>
				</div>
					
			</div>			
		</div>


		
		<!--空空如也-->
		<div class="not" v-else><img :src="imgList.not"/></div>
		<nomoreTip v-if="!hasMore"></nomoreTip>

	</div>
</template>

<script>
import API_ORDER from '@/api/order'
import Store from '@/store/store'
import Lib from '@/utils/lib'
import Index_Lib from '@/utils/index'
import nomoreTip from "@/components/nomoreTip"
import Config from '@/config'
	export default {
		data() {
			return {
				unionid:'',
				disabledBtn:false,
				imgList:{not:Config.imgurl+'/not.png'},
				SelectIndex:0,
				hasMore:true,
				listQuery: {
					page: 1,
					limit: 3,
				},
				nav: [{
						name: "全部",
						isSelect:true
					}, {
						name: "待付款",
						isSelect:false
					}, {
						name: "待使用",
						isSelect:false
					}, {
						name: "已使用",
						isSelect:false
					},{
						name: "已取消",
						isSelect:false
					}
					],
				userInfo:{},
				goodList:[]
			}
		},

		components: {
            nomoreTip
		},
	   onReachBottom:function(){
			let that = this;
			// that.nowPage+=1
			// that.getRecommendGood(that.nowPage,3)
            that.listQuery.page += 1
			if(that.SelectIndex == 0){
				that.onload();
			}else{
                that.PayOrderList(that.SelectIndex - 1)
			}
			
		},
		methods: {
			//获取全部订单
			async onload(){
				let that = this;
				let data = Object.assign({},{unionId:Store.state.userInfo.unionid},that.listQuery) 
				// console.log()
				
				that.Get_Order(data)
			},

			//获取不同状态的订单
			async PayOrderList(status){
					let that = this;
					 let data = Object.assign({},{unionId:Store.state.userInfo.unionid,status:status},that.listQuery) 
					that.Get_Order(data)
			},

			//getOrder
			async Get_Order(data){
				let that= this;
				if(that.hasMore){
					wx.showLoading({title: '加载中',})
					let res = await API_ORDER.getOrderList(data).catch(err => {
						Lib.showToast('失败','loading')
					})
					if(res != undefined && res.code == 0){
						let goodLists = res.pageUtils.rows.map(v => {
							v.createTime = Index_Lib.formatTime(v.createTime);
							return v;
						});
						if(goodLists.length < that.listQuery.limit){
							that.hasMore=false
						}
						that.goodList = that.goodList.concat(goodLists)
					}else{
						that.goodList = [];
					}

					// setTimeout(function () {
					//   wx.hideLoading()
					// }, 1500)
				}

			},

			change(index) {
				let that=this;
				that.SelectIndex = index; //确定编号

				// 重置一遍分页数据
				that.hasMore = true;
				that.listQuery.page = 1;
				that.listQuery.limit = 3;
				that.goodList = [];

				that.nav.map(item=>{
					item.isSelect=false
					return item
				})
				that.nav[index].isSelect=true
				if(index == 0){ //获取全部订单
                    that.onload();  
				}else if(index == 1){ //获取未付款订单
					that.PayOrderList(0)
				}else if (index == 2) { //获取待核销的订单
					that.PayOrderList(1)
				}else if (index == 3) { //获取已核销的订单
					that.PayOrderList(2)
				}else if(index == 4){ //获取已取消的订单
					that.PayOrderList(3)
				}
			},
			//取消订单
			async removeOrder(orderId,index){
				wx.showModal({
					title: '提示',
					content: '是否取消订单?',
					success(res) {
						if (res.confirm) {
							let that = this;
							wx.showLoading({title: '加载中',})
							let data = {orderId:orderId,status:3}
							API_ORDER.quxiaoOrder(data).then(res =>{
								wx.hideLoading()
								if(res.code == 0){
									that.goodList.splice(index,1); //删除下标的指定数组  
									Lib.showToast('成功','success')
										wx.hideLoading()
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

			//立即付款
			async wxPay(Ordersn,needPayMoney,orderId,balance){
				let that = this;
				let params={}
				if(that.userInfo.balance<balance){
					Lib.showToast('余额不足','none')
				}
				else{
				wx.showLoading({ title: '加载中',})
				that.disabledBtn = true;
				params.sn = Ordersn
				params.openid=that.userInfo.xopenid
	            params.total_fee = needPayMoney*100
	            // params.total_fee=1
				let parRes = await API_ORDER.prepay(params)
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
	            			that.payOrder(orderId)
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
								wx.hideLoading()
		                       	that.disabledBtn = false;
		                    }
		            })
				}
			},

			async payOrder(OrderId){
	        	// 订单支付成功之后修改订单状态
	        	let that=this  
	        	let statuParam={}
	        	statuParam.orderId=OrderId
	        	let payOrder=await API_ORDER.payOrder(statuParam)
				if(payOrder.code==0){
	        		Index_Lib.updateUserInfo()
	        		wx.redirectTo({
	        			url: '../order-detail/main?orderId='+OrderId
	        		})
	        	}
			},
			
			//删除订单
			deleteorder(orderId,index){
				let that = this;
				wx.showModal({
				title: '提示',
				content: '是否删除该条订单？',
				success(res) {
					if (res.confirm) {
					//   let data = {orderId:orderId}
					  API_ORDER.deleteOrder(orderId).then(res => {
						  Lib.showToast('删除成功','success')
						that.goodList.splice(index,1); //删除下标的指定数组  
					  }).catch(err => {
						  Lib.showToast('删除失败','loading')
					  })

					} else if (res.cancel) {
					}
				}
				})
			},
			
		},
		onLoad(){
			let that=this
			that.unionid = Store.state.userInfo.unionid
			that.userInfo = Store.state.userInfo
			that.hasMore = true;
			that.listQuery.page = 1;
			that.listQuery.limit = 3;
			that.goodList = [];
            that.onload();
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