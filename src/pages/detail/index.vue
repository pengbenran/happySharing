<template>
	<div class="contain">
		<blockquote v-if="!isLoading">
			<loading></loading>
		</blockquote>
		<blockquote v-else>	
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
						<div class="preDetail">
							<div class="preLeft">
								<div class="Present fl">￥:{{goodsDetail.price}}元</div>
								<div class="discounts fl">优惠:{{discounts}}元</div>
							</div>
							<div class="preRight">
								购买得{{goodsDetail.buyIntegral}}积分
							</div>
							<!-- <div class="people fr">{{item.people}}</div> -->
						</div>
						<div class="original-sell clr">
							<div class="original fl">原价:{{goodsDetail.showPrice}}元</div>
							<div class="sell fr">已售:{{goodsDetail.sales}}件/还剩{{goodsDetail.inventory}}件</div>
						</div>
						<div class="disribe">
							<blockquote v-if="userInfo.distributorStatus==1">推荐师返佣:
								<span class="Present">{{goodsDetail.commission}}元</span>
							</blockquote>
							<div class="sell" style="color:#ff0000" v-if="goodsDetail.goodType==4&&status==0">
								距活动开始还剩{{day}}天{{hours}}时{{minute}}分{{second}}秒
							</div>
							<div class="sell" style="color:#ff0000" v-if="goodsDetail.goodType==4&&status==1">
								距活动结束还剩{{day}}天{{hours}}时{{minute}}分{{second}}秒
							</div>
							
						</div>
						<div class="phone clr">
							<div class="phone-txt fl">商家热线 ：{{goodsDetail.shopPhone}}</div>
							<div class="phone-img fr iconfont" @click='makePhone'>&#xe613;</div>
						</div>
					</div>
				</div>
				<!--商品详情-->
				<div class="product-detail centered">
					<span>商品详情</span>
				</div>
				<div class="intro"> <wxParse :content="goodsDetail.content" @preview="preview" @navigate="navigate" /></div>
				<!-- 保存图片分享好友 -->
				<div class="footer" v-if="isPoster">
					<div class="saveImg" @click="eventSave">保存图片</div>
					<div class="shareFriend">分享好友</div>
				</div>
				<!--底下导航-->
				<div class="nav" v-else>
					<div class="index" @click="jumpIndex">
						<div class="img"><img src="/static/images/home.png" /></div>
						<div class="text">首页</div>
					</div>
					<div class="index" @click="share">
						<div class="img"><span class="iconfont">&#xe62a;</span></div>
						<div class="text">分享</div>
					</div>
					<div @click="jumpOrder()" class="rush" v-if="goodsDetail.goodType==4">
						{{btnTxt}}
					</div>
					<div @click="jumpSaveOrder()" class="rush" v-else>
						立即购买
					</div>
				</div>	
		</blockquote>
		<!-- 分享海报 -->
		<goodPoster ref="goodPoster" @closePoster='closePoster' @paintOk='paintOk' :goodDetail='goodsDetail'></goodPoster>

		<loginModel ref="loginModel" @getGoodsInfo="getGoodsInfo"></loginModel>
	</div>	
</template>

<script>
	import Api from '@/api/goods'
	import Api_user from '@/api/userinfo'
	import util from '@/utils/index'
	import store from '@/store/store'
	import lib from '@/utils/lib'
	import wxParse from 'mpvue-wxparse'
	import loginModel from "@/components/loginModel"; 
	import canvasdrawer from '@/components/canvasdrawer';
	import loading from '@/components/loading';
	import goodPoster from '@/components/goodPoster'
	export default {
		data() {
			return {
				isLoading:false,
				wid: "100%",
				magleft: "0",
				paintOk:false,
				goodsDetail:{},
				shareImage:'',
				Width:'',
				userInfo:{},
				UsertagId:'',
				btnSubmit:false,
				isPoster: false,
				day:'',
				hours:'',
				minute:'',
				second:'',
				status:0,
				btnTxt:'活动未开始'
			}

		},
		components: {
			canvasdrawer,
			wxParse,
			loginModel,
			loading,
			goodPoster
		},
		computed:{
			discounts(){
				let that=this
				return util.accSub(that.goodsDetail.showPrice,that.goodsDetail.price) 
			},
			
		},

		methods: {
			closePoster() {
				let that = this
				that.isPoster = false
			},
			// 拨打电话
			makePhone(){
				let that=this
				wx.makePhoneCall({
				  phoneNumber:that.goodsDetail.shopPhone//仅为示例，并非真实的电话号码
				})
			},
			jumpIndex(){
				wx.switchTab({
					url:'../index/main'
				})
			},
			async jumpSaveOrder(){
				let that=this
				if(this.goodsDetail.inventory > 0){
					// await this.GetUserLable(store.state.userInfo.unionid) //判断用户标签
					that.canBuy()		
				}
			},
			jumpOrder(){
				let that=this
				if(this.goodsDetail.inventory > 0 && that.btnTxt=='立即抢'){
					that.canBuy()
				}
			},
			canBuy(){
				let params={}
				let that=this
				params.goodId=that.goodsDetail.goodId
				params.memberId=that.userInfo.memberId
				Api.canBuy(params).then(function(res){
					if(res.code!=500){
						if(that.btnTxt=='立即购买')
						{
							wx.navigateTo({url:`../order-submit/main?orderType=1`})
						}
						else{
							wx.navigateTo({url:`../order-submit/main?orderType=5`})
						}	
					}
					else{
						lib.showToast('该商品您暂无购买权限','none')
					}
				})
			},
			share(){
				let that=this
				if(that.shareImage==""){
					// let shareRight=that.goodsDetail.shareRight.split(',')
					// let tagMemberDOList=that.userInfo.tagMemberDOList
					// let flag=false
					// for(var i in tagMemberDOList){
					// 	if(shareRight.includes(tagMemberDOList[i].tagId.toString())){
					// 		flag=true
					// 	}
					// }
					// if(flag){
					// 	lib.showToast('您暂无分享权限','none')
					// }
					// else{
					// 	that.$refs.goodPoster.getErCode(that.goodDetail.id)
					// }
					that.$refs.goodPoster.getErCode(that.goodsDetail.goodId)	
				}
				else{
					that.isPoster=true
				}	
			},
			// 绘制好了触发事件
			paintOk(shareImg) {
				let that = this
				that.isPoster = true
				that.shareImg = shareImg
			},
			timeOut(stopTime){
				let that=this
				var timer = null;
				timer = setInterval(function(){
					var today=new Date()//当前时间
					var shenyu=stopTime-today.getTime()//倒计时毫秒数
					if(shenyu>0){
						var shengyuD=parseInt(shenyu/(60*60*24*1000)),//转换为天
					    D=parseInt(shenyu)-parseInt(shengyuD*60*60*24*1000),//除去天的毫秒数
					    shengyuH=parseInt(D/(60*60*1000)),//除去天的毫秒数转换成小时
					    H=D-shengyuH*60*60*1000,//除去天、小时的毫秒数
					    shengyuM=parseInt(H/(60*1000)),//除去天的毫秒数转换成分钟
					    M=H-shengyuM*60*1000,//除去天、小时、分的毫秒数
					    S=parseInt((shenyu-shengyuD*60*60*24*1000-shengyuH*60*60*1000-shengyuM*60*1000)/1000)//除去天、小时、分的毫秒数转化为秒
					    that.day=shengyuD
					    that.hours=shengyuH
					    that.minute=shengyuM
					    that.second=S
					}
					else{
						clearInterval(timer);
						that.day=0
					    that.hours=0
					    that.minute=0
					    that.second=0
					}
				  
				},1000)
			    // setTimeout("clock()",500);
			},
			async getGoodsInfo(){
				let that=this
				let params={}  
				that.userInfo=store.state.userInfo
				params.memberId = that.userInfo.memberId
				params.goodId=that.goodsId
				let goodsDetailRes=await Api.getGoodDetail(params)
				goodsDetailRes.good.goodbanner=goodsDetailRes.good.images.split(',')
				if(goodsDetailRes.good.goodType==4){
					// 获取当前时间戳
					let today=(new Date()).getTime()
					let seckillEnd=(new Date(goodsDetailRes.good.seckillEnd)).getTime()
					let seckillStart=(new Date(goodsDetailRes.good.seckillStart)).getTime()
					if(today<seckillStart){
						that.timeOut(seckillStart)
						that.status=0
						that.btnTxt='活动未开始'
					}
					else if(seckillStart<today&&today<seckillEnd){
						that.timeOut(seckillEnd)
						that.status=1
						that.btnTxt='立即抢'
					}
					else{
						that.status=2
						that.btnTxt='活动已结束'
					}
				}
				that.goodsDetail=goodsDetailRes.good
				store.commit("stateGoodDetail",that.goodsDetail)
				that.isLoading=true
			},
			async getUserInfo(){
				let that=this
				store.commit("statecodeUnionid",that.$root.$mp.query.codeUnionid)
				store.commit("stategoodsid",that.$root.$mp.query.goodsId)
				await that.$refs.loginModel.userLogin()
			},
		},
		async mounted(){
			let that=this
			that.goodsId =that.$root.$mp.query.goodsId
			that.Width=wx.getSystemInfoSync().windowWidth 	
			if(that.$root.$mp.query.codeUnionid!=''){
				that.getUserInfo()
			}
			else{
				that.userInfo = store.state.userInfo
				that.getGoodsInfo()
			}		
		},
		onUnload(){
			let that=this
			that.isLoading=false
			that.wid= "100%"
			that.magleft= "0"
			that.isPoster=false
			that.goodsDetail={}
			that.shareImage=''
			that.Width=''
			that.userInfo={}
			that.UsertagId=''
			that.btnSubmit=false
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
		display: flex;
		justify-content:space-between;
		color: #999999;
		font-size: 12px;
		.Present{
			color: #ff0000;
			font-size: 17px;
		}
	}
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
				margin: 8px auto 0 auto;
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
	.discount-li {
		flex-shrink: 0;
		position: relative;
		margin-bottom: 15px;
	
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
			.preDetail{
				display: flex;
				justify-content: space-between;
				margin-top: 10px;
				.preRight{
					font-size: 12px;color: #999;

				}
				.preLeft{
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
	.intro{
		padding-bottom: 55px;
		box-sizing: border-box;
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