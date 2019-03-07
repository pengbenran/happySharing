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
					<div class="preLeft">
						<div class="Present fl">￥:{{goodsDetail.price}}元</div>
						<div class="discounts fl">优惠:{{discounts}}元</div>
					</div>
					<div class="preRight" v-if="Time">
                         <div class="time">{{TimeStr}}</div>
					</div>
					<!-- <div class="people fr">{{item.people}}</div> -->
				</div>
				<div class="disribe clr" v-if="userInfo.whetherDistribe!=0">推荐师返佣:
						<span class="Present">{{goodsDetail.returnAmount}}元</span>
				        <div class="sell fr">库存:{{goodsDetail.inventory}}</div>
				</div>
				<div class="original-sell clr">
					<div class="original fl">原价:{{goodsDetail.showPrice}}元</div>
					<div class="sell fr">已售:{{goodsDetail.showSales}}件</div>
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
        <div style="margin-bottom:55px"> <wxParse :content="detailContent" @preview="preview" @navigate="navigate" /></div>

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
			<div @click="jumpSaveOrder(index)" class="rush">
				{{btnStr}}
			</div>
		</div>
		<div class="paintImg" v-show="paintOk">
			<div class="bcg" @click="closeClick"></div>
			<div class="img" :style="{width:Width+'px',height:Width+'px'}">
				<img :src="shareImage">
			</div>
			<div class="saveImgBtn" @click="saveImg">保存图片到本地</div>
		</div>
		<canvasdrawer :painting="painting"  @getImage="eventGetImage" ref="canvas"/>
		<loginModel ref="loginModel"></loginModel>
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
	import canvasdrawer from '@/components/canvasdrawer'
	export default {
		data() {
			return {
				wid: "100%",
				magleft: "0",
				paintOk:false,
				goodsDetail:{},
				painting:{},
				shareImage:'',
				shareBool:true,
				Width:'',
				userInfo:{},
				TimeStr:'',
				Time:'',
				whetherDistribe:'',
				UsertagId:'',
				btnSubmit:false,
				detailContent:'',
				btnStr:'立即购买'
			}

		},
		components: {
			canvasdrawer,
			wxParse,
			loginModel
		},
		computed:{
			discounts(){
				let that=this
				return util.accSub(that.goodsDetail.showPrice,that.goodsDetail.price) 
			},
			
		},

		methods: {
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
			// 拨打电话
			makePhone(){
				let that=this
				wx.makePhoneCall({
				  phoneNumber:that.goodsDetail.shopPhone//仅为示例，并非真实的电话号码
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
			jumpIndex(){
				wx.switchTab({
					url:'../index/main'
				})
			},
			async jumpSaveOrder(){
				if(this.goodsDetail.inventory > 0){
					await this.GetUserLable(store.state.userInfo.unionid) //判断用户标签
					if(!this.Time){ //定时上架
						wx.navigateTo({url:`../order-submit/main?orderType=1`})
					}else{
						lib.showToast('该商品还未上架','none')
					}
				}else{
                        lib.showToast('该商品库存为空','none')
				}
			},
			share(){
				let that=this
				if(that.shareBool){
					that.shareBool = false
				    that.getErCode()
				}	

				// let shareRight = that.goodsDetail.shareRight.split(',')
				// if(shareRight.indexOf(that.whetherDistribe.toString()) != -1){
                //    that.getErCode()
				// }else{
                //    lib.showToast('抱歉您暂无推荐权限','none')
				// }
			},

			async getErCode(){
				let that=this
				let params={}
				params.params=store.state.userInfo.unionid+','+that.goodsDetail.id+','+1
				let QrcodeRes=await Api.GetQrcode(params)
				if(QrcodeRes.code==0){
					that.eventDraw(QrcodeRes.url)
				}
				that.shareBool = true

			},

			async getGoodsInfo(params){
				let that=this
				wx.showLoading({title: '加载中',})
				let goodsDetailRes=await Api.getGoodDetail(params)
				goodsDetailRes.goodbanner=goodsDetailRes.images.split(',')
				goodsDetailRes.goodbanner.pop()
				that.goodsDetail=goodsDetailRes
				that.detailContent = that.goodsDetail.content
				store.commit("stateGoodDetail",that.goodsDetail)
				that.Timer(goodsDetailRes.upTime,goodsDetailRes.upType,function(res){
					if(res != 'NoTime'){
						that.TimeStr = res;
					}else{
						that.TimeStr = '';
					}	
				})
				wx.hideLoading()

			},



			Timer(time,timeIndex,fn){
				var msg = ''
				var maxtime = (new Date(time) - new Date())/1000;
				if(timeIndex == 3){
						if(maxtime >= 0){
					  	this.btnStr = '暂未上架'
						}else{
							that.btnStr = '立即购买'
							this.Time = true;
						}
					 this.Time = setInterval(function(){
						 maxtime = (new Date(time) - new Date())/1000;
						if(maxtime >= 0) {
							var dd = parseInt(maxtime / 60 / 60 / 24, 10);//计算剩余的天数  
							var hh = parseInt(maxtime / 60 / 60 % 24, 10);//计算剩余的小时数  
							var mm = parseInt(maxtime / 60 % 60, 10);//计算剩余的分钟数  
							var ss = parseInt(maxtime % 60, 10);//计算剩余的秒数  
							hh = lib.checkTime(hh);
							mm = lib.checkTime(mm);
							ss = lib.checkTime(ss);
				
							msg =  dd + "天" + hh + "时" + mm + "分" + ss + "秒";
							fn(msg);
						} else {
							clearInterval( this.Time );
							
							fn("NoTime");
							// return {msg:msg,maxtime:maxtime};
						}
					},1000);
				
				}else{
					clearInterval(this.Time);
				}
		},

		closeClick(){
			let that = this;
			that.paintOk = false;
		},

		/**
		 * 获取用户标签并判断购买限制
		 * that.btnSubmit：购买限制
		 * unionid: 用户unionid
		 */
		async GetUserLable(unionid){
			let that = this;
			wx.showLoading({title: '加载中',})
			let data = {unionid:unionid}	
			let res = await Api_user.getUserLable(data).catch(err => {
				 lib.showToast('没有获取到该用户的标签数据','none')
			})
            if(res.code == 0 && res.TagList.length > 0){
				let arr = []
				res.TagList.map(v => {
                     arr.push(v.tagId);
				})
				let falg=false
				if(that.goodsDetail.buyLimit == ''){ //判断商品是否设置了变量限制
					falg = true;
				}else{
					arr.map(v => {
						if(that.goodsDetail.buyLimit.split(',').indexOf(v.toString()) != -1){
							falg = true;
						}	
					})
				}
				if(falg){
					that.btnSubmit=true
				}
				else{
					that.btnSubmit=false
				}
			}
			 wx.hideLoading()
		},
		},
		async mounted(){
			let that=this
            this.Time = ''
			this.btnSubmit = false;
			this.btnStr = '立即购买'
			that.goodsId =that.$root.$mp.query.goodsId
			clearInterval(this.Time);
			if(that.$root.$mp.query.codeUnionid!=''){
				store.commit("statecodeUnionid",that.$root.$mp.query.codeUnionid)
				store.commit("stategoodsid",that.$root.$mp.query.goodsId)
				await that.$refs.loginModel.userLogin()
			}	
			that.Width=wx.getSystemInfoSync().windowWidth
            let params={}
            that.userInfo = store.state.userInfo
			that.whetherDistribe = store.state.userInfo.whetherDistribe
            params.goodId=that.goodsId
			if(that.userInfo.whetherDistribe!=0){
            	params.memberLv=that.userInfo.whetherDistribe
            }
			that.getGoodsInfo(params)
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