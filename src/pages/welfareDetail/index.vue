<template>
	<div style="width: 100%;">
            <div class="discount-li" :style="{width:wid,marginLeft:magleft}">
				<swiper class="swiper" indicator-dots='true' autoplay='true' indicator-color="rgba(255, 255, 255, .6)" indicator-active-color="#fff" >
					<swiper-item v-for="(item,index) in goodsDetail.goodbanner" :key='item' :index="index"><img :src="item" mode='widthFix'></swiper-item>
				</swiper>
				<div class="cant centered">
					<div class="address-make clr">
						<div class="address fl">消费地址:{{goodsDetail.address}}</div>
						<!-- <div class="make fr">{{goodsDetail.make}}</div> -->
					</div>
					<div class="desc fontHidden">{{goodsDetail.goodName}}</div>
					<div class="Present-discounts-people clr">
						<div class="Present fl">
							<div class="left">
								积分兑换: <span>{{goodsDetail.buyIntegral}}</span>
							</div>
							<div class="right">
								库存：{{goodsDetail.inventory}}
							</div>
						</div>
						<div class="preRight" v-if="Time">
							<div class="time">{{TimeStr}}</div>
						</div>
						<!-- <div class="people fr">{{item.people}}</div> -->
					</div>
				</div>
	     	</div>
			<!--商品详情-->
			<div class="product-detail centered">
				<span>商品详情</span>
			</div>
            <div style="margin-bottom:55px"> <wxParse :content="goodsDetail.content" @preview="preview" @navigate="navigate" /></div>

			<!--底下导航-->
			<div class="nav">
				<div class="index" @click="jumpIndex">
					<button>
						<div class="img"><img src="/static/images/home.png" /></div>
						<div class="text">首页</div>
					</button>
				</div>
				<div class="index share_Btn" @click="share">
					<button open-type='share'>
						<div class="img" ><span class="iconfont">&#xe62a;</span></div>
						<div class="text">分享</div>
					</button>
				</div>
				<div @click="jumpSaveOrder(index)" class="rush">
					{{btnStr}}
				</div>
			</div>
		   <loginModel ref="loginModel"></loginModel>
		
	</div>
</template>
<script>
    import Api from '@/api/goods'
    import Api_wel from '@/api/turntable'
	import util from '@/utils/index'
	import store from '@/store/store'
	import lib from '@/utils/lib'
	import wxParse from 'mpvue-wxparse'
	import loginModel from "@/components/loginModel"; 
	import loading from '@/components/loading'

	export default {
		data() {
			return {
				isLoading:false,
				goodsDetail:{},
				userInfo:{},
				btnStr:'立即兑换'
			}

		},
		components: {
			wxParse,
			loginModel,
			loading
		},
		computed:{
			discounts(){
				let that=this
				return util.accSub(that.goodsDetail.showPrice,that.goodsDetail.price) 
			},
			
		},

		methods: {
		   
			jumpIndex(){
				wx.switchTab({
					url:'../index/main'
				})
            },
            jumpSaveOrder(){
				delete  this.goodsDetail.content
				if(this.goodsDetail.inventory>0){
					wx.navigateTo({
						url:'../welfareSubmint/main?goodDetail='+JSON.stringify(this.goodsDetail)
					})
				}else{
					lib.showToast('抱歉库存不够',"none")
				}
            },
			async getGoodsInfo(params){
                let that=this
                wx.showLoading({title: '加载中'})
                let goodsDetailRes=await Api_wel.PoinDetail_Shop(params)
                let goodDetail = goodsDetailRes.integralGood   
                goodDetail.goodbanner=goodDetail.images.split(',')
                goodDetail.goodbanner.pop()
				that.goodsDetail=goodDetail 
				that.isLoading = true;
                wx.hideLoading()
			},

		},


		async onLoad(options) {
			let that=this
			that.goodsId =options.goodsId
			// 调用应用实例的方法获取全局数据
		},
		async mounted(){
			let that=this
			await that.$refs.loginModel.userLogin()
            let params={}
            that.userInfo = store.state.userInfo
            params.goodId=that.goodsId
			that.getGoodsInfo(params)
        },
         onShareAppMessage: function () {
                return {
					title: '',
					desc: '抹哒抹哒',
					path: 'pages/welfareDetail/main?goodId='+this.goodsId
                }
		},
		onUnload(){
			this.isLoading=false;
			this.goodsDetail={};
			this.userInfo={};
			this.btnStr='立即兑换';
		}
	}
</script>

<style lang="less">
@import url("~mpvue-wxparse/src/wxParse.css");
	/*底部*/
	.swiper{
		height: 190px;
	}
	.disribe{
		color: #999999;
		font-size: 12px;
		.Present{
			color: #ff0000;
			font-size: 17px;
		}
	}
	.Present{width: 100%;display: flex;justify-content: space-between;}
	.saveImgBtn{
		width:80%;
		height: 50px;
		text-align:center;
		background: #ff7d28;
		color: #fff;
		border-radius: 25px;
		line-height:50px;
		position: absolute;
		bottom: 80px;
		left: 10%;
 	}
	.paintImg{
		position: fixed;
		top:0;
		left: 0;
		bottom:0;
		right: 0;
		z-index: 5;
		.bcg{
		width: 100%;
	    height: 100%;
    	background: rgba(0,0,0,.5);
		}		
		.img{
			overflow: hidden;
			z-index: 10;
			position: absolute;
			top: 80px;
		}
		}
 
	.nav {
		position: fixed;
		bottom: 0px;
		display: flex;
		width: 100%;
		height: 55px;
		background: #fff;
		z-index:10;
		border-top: 1px solid #dedede;
		.index {
			width: 16%;
			.img {
				width: 23px;
				height: 23px;
				margin-left: 5px;
				// margin: 8px auto 0 auto;
		
			}
			.text {
				color: #999999;
				font-size: 10px;
				text-align: center;
				margin-top: 7px;
			}
		}
		.rush {
			width: 68%;
			line-height: 55px;
			text-align: center;
			background-color: #ff7d28;
			color: #fff;
		}
	}
	   .share_Btn{
		   button{text-align: center;}
         
	}
	
	.discount-li {
		flex-shrink: 0;
		position: relative;
		margin-bottom: 15px;
		// &:nth-child(1),
		// &:nth-child(2) {
		// 	margin: 0;
		// }
		.img {
			width: 100%;
			height: 200px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.cant {
			.address-make {
				margin: 6px 0;
				.address {
					font-size: 13px;
					color: #999999;
					width: 300px;
				}
				.make {
					font-size: 10px;
					color: #4aa9fe;
					width: 40px;
					height: 15px;
					border: 1px solid #4aa9fe;
					line-height: 15px;
					text-align: center;
					border-radius: 5px;
				}
			}
			.desc {
				font-size: 18px;
				color: #111111;
				line-height: 26px;
			}
			.original-sell {
				padding: 8px 0;
				.original {
					text-decoration: line-through;
					color: #999999;
					font-size: 12px;
				}
				.sell {
					color: #666666;
					font-size: 12px;
				}
			}
			.Present-discounts-people { display: flex;position: relative;
			.preRight{position:absolute;top:0px;right: 5px;font-size: 15px;color: #fff;background: #ff0000;}
			// .preRight .time{width: 120px;}
				margin-top: 10px;
				.Present {
					color: #ff0000;
					font-size: 17px;
				}
				.discounts {
					color: #999999;
					font-size: 12px;
					margin-left: 6px;
					line-height: 25px;
				}
				.people {
					color: #999999;
					font-size: 12px;
				}
			}
			.phone {
				width: 100%;
				height: 37px;
				border-top: 1px solid #dedede;
				border-bottom: 1px solid #dedede;
				line-height: 37px;
				margin-top: 5px;
				text-align: center;
				.phone-txt {
					color: #111111;
					font-size: 13px;
				}
				.phone-img {
					color: #ffa061;
				}
			}
		}
	}
	
	.product-detail {
		margin-top: 30px;
		border-left: 4px solid #ff7d28;
		span {
			color: #111111;
			font-size: 18px;
			margin-left: 5px;
			font-weight: bold;
		}
	}

</style>