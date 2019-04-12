<template>
	<div class="contain">
		<blockquote v-if="!isLoading">
			<loading></loading>
		</blockquote>
		<blockquote v-else>
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
							<div class="preLeft">
								<div class="Present fl">￥:{{goodsDetail.price}}元</div>
								<div class="discounts fl">优惠:{{discounts}}元</div>
							</div>
							<div class="preRight" v-if="Time">
								<div class="time">{{TimeStr}}</div>
							</div>
						</div>
						<div class="original-sell clr">
							<div class="original fl">原价:{{goodsDetail.showPrice}}元</div>
							<div class="sell fr">已售:{{goodsDetail.sales}}件</div>
						</div>
						<div class="disribe clr">
							<blockquote v-if="userInfo.whetherDistribe!=0">推荐师返佣:<span class="Present">{{goodsDetail.returnAmount}}元</span></blockquote>
							<div class="sell fr">库存:{{goodsDetail.inventory}}</div>
						</div>
						<div class="phone clr">
							<div class="phone-txt fl">商家热线 ：{{goodsDetail.shopPhone}}</div>
							<div class="phone-img fr iconfont" @click='makePhone'>&#xe613;</div>
						</div>
					</div>
				</div>
				<!--商品详情-->
				<div class="product-detail centered">
					<span>图文详情</span>
				</div>
				<div class="intro"> <wxParse :content="detailContent" @preview="preview" @navigate="navigate" /></div>
		
			<!--底下导航-->
			<div class="nav">
				<div class="index" @click="jumpIndex">
					<div class="img"><img src="/static/images/home.png" /></div>
					<div class="text">首页</div>
				</div>
				<div class="index" @click="share">
					<div class="img"><span class="iconfont">&#xe62a;</span></div>
					<div class="text">分享</div>
				</div>
				<div class="rush"  @click="onConfirm">	
					立即预约
				</div>
			</div>
			<div class="paintImg" v-if="paintOk">
				<div class="bcg" @click="closeClick"></div>
				<div class="img" :style="{width:Width+'px',height:Width+'px'}">
					<img :src="shareImage">
				</div>
				<div class="saveImgBtn" @click="saveImg">保存图片到本地</div>
			</div>
			<canvasdrawer :painting="painting"   @getImage="eventGetImage" ref="canvas"/>	
		</div>


	</blockquote>
    <loginModel ref="loginModel" @getGoodsInfo="getGoodsInfo"></loginModel>
</div>

</template>

<script>
	import Api from '@/api/goods'
	import util from '@/utils/index'
	import store from '@/store/store'
	import lib from '@/utils/lib'
	import Api_user from '@/api/userinfo'
	import canvasdrawer from '@/components/canvasdrawer'
	import loginModel from "@/components/loginModel"; 
	import wxParse from 'mpvue-wxparse'
	import loading from '@/components/loading'
	export default {
		data() {
			return {
				wid: "100%",
				magleft: "0",
				goodsDetail:{},
			    painting:{},
				shareImage:'',
				Width:'',
				detailContent:'',
				Time:'',
				TimeStr:'',
				whetherDistribe:'',
				btnSubmit:false,
				userInfo:{},
				paintOk:false,
				isLoading:false,
				posterErcode:''
			}

		},
		components: {
			canvasdrawer,
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
			// 拨打电话
			makePhone(){
				let that=this
				wx.makePhoneCall({
				  phoneNumber:that.goodsDetail.shopPhone//仅为示例，并非真实的电话号码
				})
			},
			closeClick(){
				let that = this;
				that.paintOk = false;
			},
			// 保存图片到本地
			saveImg(){
				let that=this
				wx.saveImageToPhotosAlbum({
					filePath: that.shareImage,
					success(res) {
						wx.showToast({
							title: '保存图片成功',
							icon: 'success',
							duration: 2000
						})
					}
				})
			},
			//点击生成海报
		   async eventDraw(codeUrl){
		   	let that = this;
		   	wx.showLoading({
		   		title:'推广码绘制中'
		   	})	
		   	let ImgArr = []
		   	ImgArr[0]=that.goodsDetail.posterImg
		   	ImgArr[1]=codeUrl
		   	that.painting={
		   		width: that.Width,
		   		height: that.Width,
		   		clear: true,
		   		views: [
		   		{
		   			type: 'image',
		   			url: ImgArr[0],
		   			top: 0,
		   			left: 0,
		   			width: that.Width,
		   			height: that.Width
		   		},
		   		{
		   			type: 'image',
		   			url: ImgArr[1],
		   			top: that.Width-55,
		   			left: 150,
		   			width: 50,
		   			height:50
		   		},
		   	    {
		   			type: 'text',
		   			content:that.userInfo.name,
		   			fontSize: 13,
		   			color: '#000',
		   			textAlign: 'left',
		   			breakWord: true,
		   			top: that.Width-55,
		   			left:210,
		   			width:90,
		   			MaxLineNumber:2,
		   			isCenter:false
			   	},
		   		]
		   	}
		   	this.$refs.canvas.readyPigment()
		   },
		   eventGetImage(event) {
		   	wx.hideLoading()
		   	const { tempFilePath, errMsg } = event
		   	if (errMsg === 'canvasdrawer:ok') {
		   		this.paintOk=true
		   		this.shareImage=tempFilePath
		    }
			},
			share(){
				let that=this
				if(that.posterErcode != ''){
					if(that.shareImage==""){
						let shareRight=that.goodsDetail.shareRight.split(',')
						let tagMemberDOList=that.userInfo.tagMemberDOList
						let flag=false
						for(var i in tagMemberDOList){
							if(shareRight.includes(tagMemberDOList[i].tagId.toString())){
								flag=true
							}
						}
						if(flag){
							lib.showToast('您暂无分享权限','none')
						}
						else{
							that.eventDraw(that.posterErcode)
						}	
					}
					else{
						that.paintOk=true
					}
				}
			},
			async getErCode(){
				let that=this
				let params={}
				params.params=store.state.userInfo.unionid+','+that.goodsId+','+2
				let QrcodeRes=await Api.GetQrcode(params)
				if(QrcodeRes.code==0){
					that.posterErcode=QrcodeRes.url
				}
			},
	
			jumpIndex(){
				wx.switchTab({
					url:'../index/main'
				})
			},
			jumpSaveOrder(){
                wx.navigateTo({url:`../order-submit/main`})
					
			},
			async getGoodsInfo(){
				let that=this
				let params={}  
				that.userInfo=store.state.userInfo
				that.whetherDistribe = that.userInfo.whetherDistribe
				params.goodId=that.goodsId
				if(that.whetherDistribe!=0){
					params.memberLv=that.whetherDistribe
				}
				let goodsDetailRes=await Api.getBookGoodDetail(params)
				if(goodsDetailRes.code==0){
					wx.hideLoading()
					goodsDetailRes.good.goodbanner=goodsDetailRes.good.images.split(',')
					that.goodsDetail=goodsDetailRes.good
					that.detailContent = that.goodsDetail.content
					that.getErCode()
					store.commit("stateGoodDetail",that.goodsDetail)
					that.isLoading=true
				}
			},
    		onConfirm() {
    		    wx.navigateTo({url:'../order-submit/main?orderType=2'})
			},
			async getUserInfo(){
				let that=this
				store.commit("statecodeUnionid",that.$root.$mp.query.codeUnionid)
				store.commit("stategoodsid",that.$root.$mp.query.goodsId)
				await that.$refs.loginModel.userLogin()
			}
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
			that.wid= "100%"
			that.magleft= "0"
			that.goodsDetail={}
		    that.pickerText= ''
		    that.painting={}
		    that.shareImage=''
		    that.Width=''
		    that.detailContent=''
		    that.Time=''
		    that.TimeStr=''
		    that.whetherDistribe=''
		    that.btnSubmit=false
		    that.userInfo={}
		    that.paintOk=false
		    that.isLoading=false
		    that.posterErcode=''
		}
	}
</script>

<style lang="less">
@import url("~mpvue-wxparse/src/wxParse.css");
	/*底部*/
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
	.disribe{
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
			.Present-discounts-people {position: relative;
					.preRight{position:absolute;top:0px;right: 5px;font-size: 15px;color: #fff;background: #ff0000;}
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