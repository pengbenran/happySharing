<template>
	<div>
		<!--背景图-->
		<div class="dial">
			<div class="img"><img src="https://shop.guqinet.com/html/images/zhifenxiang/dial-bg.png" /></div>
			<!--转盘-->
			<div id="rotary-table">
				<div class="award" v-for="(item,index) in turntablesList" :class="['award'+index,{'active': index==current}]">
					<div class="icoImg"><img :src="item.image" :alt="item.content"></div>	
					<div class="ico"><span>{{item.content}}分</span></div>
				</div>
				<div id="start-btn" @click="start" class="start-btn">开始</div>

				<div class="popup">
					<!--中奖数字-->
					<div class="popup-left">
						<span>{{getPoint}}</span>
					</div>
					<!--可用积分-->
					<div class="popup-right">
						<spna>{{UserInfo.point}}</spna>
					</div>
				</div>

				<!--下面的确认按钮-->
				<div class="confirm" @click="submitBtn">
					<img src="https://shop.guqinet.com/html/images/zhifenxiang/confirm.png" />
				</div>

				<div class="zhuanPoint" @click="tojump"> 

				</div>

			</div>
			<!--列表-->
			<div class="list">
				<div class="list-wp">
					<div class="rec-li" v-for="(goodlist , index) in pointShopList" :key="goodlist.recId">
						<div class="cant clr">
							<div class="img fl"><img :src="goodlist.thumbnail" /></div>
							<div class="rec-center fl">
								<div class="tit fontHidden">{{goodlist.title}}</div>
								<div class="name fontHidden1">{{goodlist.goodName}}</div>
								<div class="present ">{{goodlist.buyIntegral}}积分</div>
							</div>
							<div class="rec-right fr">
								<div class="num ">已兑 : {{goodlist.showSales}}</div>
								<div class="use">
									<div  @click="Jump(goodlist.goodId)">
										去兑换
									</div>
								</div>
							</div>
						</div>
					</div>
					<nomoreTip v-if="hasMore"></nomoreTip>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import API from '@/api/turntable'
import Lib from '@/utils/lib'
import store from '@/store/store'
import nomoreTip from "@/components/nomoreTip"
	export default {
		name: 'raffle',
		components:{
			nomoreTip
		},
		computed: {
		
		},
		data() {
			return {
				current: 0,
				rec: [{
						recId: 1,
						img: "/static/images/d.png",
						title: "西江月园林火锅",
						name: "世茂/金塔/新力/莲塘/四店通用",
						use: "待使用",
						desc: "西江月园林艺术餐厅，真正的艺术赣菜,快来抢购！",
						original: "223",
						present: 200,
						discounts: "83",
						num: "1000",
						sell: "2368",
						time: "2018-12-31",
						dele: "删除订单",
						detail: "订单详情",
						integral: "积分兑换",
					},
					{
						recId: 2,
						img: "/static/images/d.png",
						title: "西江月园林火锅",
						name: "世茂/金塔/新力/莲塘/四店通用",
						use: "待使用",
						desc: "西江月园林艺术餐厅，真正的艺术赣菜,快来抢购！",
						original: "223",
						present: 200,
						discounts: "83",
						num: "1000",
						sell: "2368",
						time: "2018-12-31",
						dele: "删除订单",
						detail: "订单详情",
						integral: "积分兑换",
					},
					{
						recId: 3,
						img: "/static/images/d.png",
						title: "西江月园林火锅",
						name: "世茂/金塔/新力/莲塘/四店通用",
						use: "待使用",
						desc: "西江月园林艺术餐厅，真正的艺术赣菜,快来抢购！",
						original: "223",
						present: 200,
						discounts: "83",
						num: "1000",
						sell: "2368",
						time: "2018-12-31",
						dele: "删除订单",
						detail: "订单详情",
						integral: "积分兑换",
					},
				],
				listQuery: {
					page: 1,
					limit: 3,
				},
				pointShopList:[],
				total:5,
				speed: 200,
				diff: 15,
				award: {},
				time: 0,
				timeout: '',
				iss: false,
				hasMore:false,
				turntablesList:[],
				UserInfo:{},
				Config:{},
				getPoint:0
			};
		},
		mounted(){
		   this.getShopList(this.listQuery);
		   this.getData();
		   this.UserInfo = store.state.userInfo
		   this.Config = store.state.config
		   console.log("查看一下用户的信息：", this.UserInfo.point)
		},
		//上拉请求
		onReachBottom:function(){
				let that = this;
				that.listQuery.page += 1
				that.getShopList(that.listQuery);
		},
		methods: {
			getData(){
				let that = this;
				wx.showLoading({title: '加载中'})
				API.get_Turntable().then(res => {
					console.log(res," 请求的数据")
					if(res.code == 0){
						that.turntablesList = res.turntables
						wx.hideLoading()
					}else{
                        Lib.showToast('网络开了个小差','none')
					}
				}).catch(err => {
                   Lib.showToast('网络开了个小差','none')
				})
			},
			start() {
				// 开始抽奖
				console.log('积分：',this.UserInfo.point)
				let that = this;
				console.log("查看配置信息",that.Config)
				wx.showModal({
					title: '提示',
					content: '将扣除'+that.Config.turntable_consume_point+'积分',
					success(res) {
						if (res.confirm) {
								if(that.UserInfo.point >= that.Config.turntable_consume_point){
									that.drawAward()
									that.time = Date.now();
									that.speed = 250;
									that.diff = 15;
								}else{
									Lib.showToast('你的积分不足','none')
								}
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},

			//获取一个随机数
			sum(m,n){
				return Math.floor(Math.random()*(m - n + 1) + n);
			},
			drawAward() {
				// 请求接口, 这里我就模拟请求后的数据
				let that = this;
				let res = this.sum(1,100);
				let num = 0;
				that.turntablesList.map((v,index) => {
                    if(res > num && res<=(parseInt(v.probability)+num)){
						console.log(index,"确认范围：",res,num,parseInt(v.probability)+num,"名字：",v.content)
						that.award.id = v.id
					}
					num = num + parseInt(v.probability)
				})

				//此处是消耗积分的请求
				let data = {
					unionId:this.UserInfo.unionid,
					point:that.Config.turntable_consume_point //后代设置消耗的积分
				}
				
				API.point_Consumption(data).then(res => {
					if(res.code == 0){
						that.UserInfo.point = res.nowPoint
                   	    that.move();
					}
				}).catch(err => {
                    Lib.showToast('网络开了个小差','none')
				})
			},

			//转盘主题程序
			move() {
				let that = this;
				that.timeout = setTimeout(() => {
					this.current++;
					if(this.current > 7) {
						this.current = 0;
					}
					if(this.award.id && (Date.now() - this.time) / 1000 > 2) {
						this.speed += this.diff;
						if((Date.now() - this.time) / 1000 > 5 && this.award.id == this.turntablesList[this.current].id) {
							clearTimeout(that.timeout);
							this.getPoint += this.turntablesList[this.current].content*1
                           
							//往后台保存积分
							let data = {
								unionId:this.UserInfo.unionid,
								point:this.turntablesList[this.current].content*1   //获取当前选择的那个积分
							}
							API.point_Obtain(data).then(res => {
							console.log(res,"获取积分")
							   if(res.code == 0){
								 Lib.showToast('获得积分'+this.turntablesList[this.current].content,'success')
                                 this.UserInfo.point = res.nowPoint
							   }else{
								 Lib.showToast('网络开了个小差','none')
							   }
							}).catch(err => {
							   Lib.showToast('网络开了个小差','none')
							})

							setTimeout(() => {
								//this.iss = true								
							}, 0);
							return;
						}
					} else {
						this.speed -= this.diff;
					}
					console.log(this.speed);
					this.move();
				}, this.speed);
			},

			tojump(){
				let that = this;
				console.log("进来了吗？")
				wx.switchTab({
					url: '../index/main',   //注意switchTab只能跳转到带有tab的页面，不能跳转到不带tab的页面
				})
			},
			submitBtn(){
               Lib.showToast('共获得积分'+this.getPoint,'success')
			},
			//跳转到商品详情
			Jump(id){
                wx.navigateTo({
			     	url: '../welfareDetail/main?goodsId='+id　　// 页面 B
				})
			},

			//获取积分商场商品
			getShopList(listQuery){
				wx.showLoading({title: '加载中'})
				let that = this;
				API.point_Shop(listQuery).then(res => {
					console.log("你好世界",res)
				    if(res.code == 0){
					   wx.hideLoading()
					   that.pointShopList = that.pointShopList.concat(res.IntegralGoodShowPage.rows);
					   that.total = res.IntegralGoodShowPage.total
					//    console.log("获得数据的长度",res.IntegralGoodShowPage.rows.length,that.listQuery.limit)
					   	if(res.IntegralGoodShowPage.rows.length < that.listQuery.limit ){
                            that.hasMore=true
						}
					}else{
						 Lib.showToast('网络开了个小差','none')
					}
					wx.hideLoading()
				}).catch(err => {
					 Lib.showToast('网络开了个小差','none')
					 wx.hideLoading()
				})

			},

		},

	

		
        //用户点击右上角分享
		onShareAppMessage: function(res) {
			return {
				title: '抹哒抹哒',
				path: "pages/welfare/main",
				success: function(shareTickets) {
					console.info(shareTickets + '成功');
					// 转发成功
					
				},
				fail: function(res) {
					console.log(res + '失败');
					// 转发失败
				},			
			}
		}
	};
</script>

<style rel="stylesheet/less" lang="less">
    .start-btn{
		font-size: 38rpx;color: #fff;
	}
	.dial {
		position: relative;
		.img {
			width: 100%;
			height: 624px;
		}
		#rotary-table {
			width: 340px;
			height: 349px;
			position: absolute;
			margin: auto;
			left: 20px;
			top: 84px;
			.award {
				width: 90px;
				height: 96px;
				float: left;
				position: absolute;
				overflow: hidden;
				.ico {
					position: absolute;
					top: 0px;
					right: 0;
					font-size: 18px;
					text-align: right;
					text-shadow:0px 0px 50px #8df;
					background: rgba(0, 0, 0, 0.275);
					font-weight: bold;
					width: 100%;
					span {
						color: #ffffff;
					}
				}
				// .ico span{}
				.icoImg{
                  width:180rpx;
                  height:192rpx;
				}
				&.active {
					width: 90px;
					height: 96px;
					background-color: rgba(255, 255, 255, 0.2);
					box-shadow: 0 0 10px 6px #fff;
					border-radius: 6px;
					border: 1px solid #fff;
				}
				&.award0 {
					top: 18px;
					left: 16.5px;
					text-shadow: 0px 0px 5px #b20000;
				}
				&.award1 {
					top: 18px;
					left: 122.5px;
					text-shadow: 0px 0px 5px #e56721;
				}
				&.award2 {
					top: 18px;
					right: 22px;
					text-shadow: 0px 0px 5px #3875a1;
				}
				&.award3 {
					top: 124.5px;
					right: 22px;
					text-shadow: 0px 0px 5px #38e10d;
				}
				&.award4 {
					bottom: 22.5px;
					right: 22px;
					text-shadow: 0px 0px 5px #38e10d;
				}
				&.award5 {
					bottom: 22.5px;
					left: 122.5px;
					text-shadow: 0px 0px 5px #e56721;
				}
				&.award6 {
					bottom: 22.5px;
					left: 16.5px;
					text-shadow: 0px 0px 5px #3875a1;
				}
				&.award7 {
					top: 124.5px;
					left: 17px;
					text-shadow: 0px 0px 5px #38e10d;
				}
			}
			#start-btn {
				position: absolute;
				top: 124.5px;
				left: 122.5px;
				width: 90px;
				height: 96px;
				line-height: 90px;
				text-align: center;
			}
			.popup {
				display: flex;
				justify-content: space-between;
				position: relative;
				.popup-left,
				.popup-right {
					text-align: center;
					width: 126px;
					height: 45px;
					line-height: 45px;
					color: #ffffff;
					font-size: 22px;
				}
				.popup-left {
					position: absolute;
					left: 18px;
					top: -50px;
				}
				.popup-right {
					position: absolute;
					right: 23px;
					top: -50px;
				}
			}
			.confirm {
				width: 126px;
				height: 45px;
				position: absolute;
				bottom: -72px;
				left: 18px;
			}
			.zhuanPoint{
				width: 126px;
				height: 45px;
				position: absolute;
				bottom: -72px;
				right: 22px;
			}
		}
		/*产品列表*/
		.list {
			width: 100%;
			height: 156px;
			border-radius: 50%;
			background-color: #ffb833;
			position: absolute;
			bottom: -78px;
			.list-wp {
				position: relative;
				width: 100%;
				background-color: #ffb833;
				bottom: -83px;
				box-sizing: border-box;
				padding: 0 12px;
				/*列表*/
				.rec-li {
					padding: 16px 0;
					border-bottom: 1px solid #ff6f00;
					&:nth-last-child(1) {
						border: 0;
					}
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
						width: 180px;
						line-height: 24px;
						overflow: hidden;
						padding-left: 12px;
						box-sizing: border-box;
						padding-top: 5px;
						.tit {
							font-size: 15px;
							color: #111111;
						}
						.name {
							font-size: 12px;
							color: #333333;
						}
						.present {
							color: #ff0000;
							font-size: 17px;
						}
						.original {
							text-decoration: line-through;
							color: #999999;
							font-size: 12px;
						}
					}
					.rec-right {
						width: 80px;
						text-align: right;
						padding-top: 9px;
						.use {
							font-size: 14px;
							color: #fff;
							width: 80px;
							height: 34px;
							border-radius: 17px;
							background-color: #ff6f00;
							line-height: 34px;
							text-align: center;
							margin-top: 26px;
						}
						.num {
							color: #333333;
							font-size: 12px;
						}
					}
				}
			}
		}
	}
</style>