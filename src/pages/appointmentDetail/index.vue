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
					<div class="Present fl">￥:{{goodsDetail.price}}元</div>
					<div class="discounts fl">优惠:{{discounts}}元</div>
					<div class="people  fr"  v-if="userInfo.whetherDistribe!=0">
						推荐师优惠<span class="Present">{{goodsDetail.returnAmount}}</span></div>
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
			<span>图文详情</span>
		</div>
	</picker>
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
			<div v-if='goodsDetail.book==1' class="rush"  @click="showPicker">	
				立即预约
			</div>
		</div>
		<div class="paintImg" v-show="paintOk">
			<div class="bcg"></div>
			<div class="img" :style="{width:Width+'px',height:Width+'px'}">
				<img :src="shareImage">
			</div>
			
		</div>
		<canvasdrawer :painting="painting"   @getImage="eventGetImage" ref="canvas"/>

		<mpvue-picker :mode="mode" :deepLength=deepLength ref="mpvuePicker" :pickerValueArray="pickerValueArray" :pickerValueDefault="pickerValueDefault" @onConfirm="onConfirm"></mpvue-picker>
	</div>
</template>

<script>
	import Api from '@/api/goods'
	import util from '@/utils/index'
	import store from '@/store/store'
	import mpvuePicker from '@/components/mpvuePick'
	import canvasdrawer from '@/components/canvasdrawer'
	export default {
		data() {
			return {
				wid: "100%",
				magleft: "0",
				goodsDetail:{},
				multiIndex: [0,0],
				multiArray:[],
				dataArray: [],
				allBulletin: [],
				mode: 'selector',
			    deepLength: 0, // 几级联动
			    pickerValueDefault: [], // 初始化值
			    pickerValueArray: [], // picker 数组值
			    pickerText: '',
			    mulLinkageTwoPicker: [],
			    pickerValueDefault: [0,0],
			    goodBooks:[],
			    painting:{},
				shareImage:'',
				Width:'',
				userInfo:{}
			}

		},
		components: {
			mpvuePicker,
			canvasdrawer
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
			//点击生成海报
		   async eventDraw(){
		   	let that = this;
		   	wx.showLoading({
		   		title:'推广码绘制中'
		   	})	
		   	let ImgArr = []
		   	ImgArr[0]=that.goodsDetail.posterImg
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
		   		]
		   	}
		   	this.$refs.canvas.readyPigment()
		   },
		   eventGetImage(event) {
		   	wx.hideLoading()
		   	console.log('我绘制完了');
		   	console.log(event);
		   	const { tempFilePath, errMsg } = event
		   	if (errMsg === 'canvasdrawer:ok') {
		   		this.paintOk=true
		   		this.shareImage=tempFilePath
		    }
			},
			share(){
				let that=this
				that.getErCode()
			},
			async getErCode(){
				let that=this
				let params={}
				params.params=store.state.userInfo.unionid+','+that.goodsDetail.id+','+2
				let QrcodeRes=await Api.GetQrcode(params)
				console.log(QrcodeRes);
			},
			showPicker() {
				 console.log("预约")
				this.pickerValueArray = this.mulLinkageTwoPicker;
				this.mode = 'multiLinkageSelector';
				this.deepLength = 2;
				this.pickerValueDefault = [1, 0];
				this.$refs.mpvuePicker.show();
				console.log(this);
			},
			jumpIndex(){
				wx.switchTab({
					url:'../index/main'
				})
			},
			jumpSaveOrder(){
				wx.navigateTo({url:`../order-submit/main`})
			},
			async getGoodsInfo(params){
				let that=this
				let goodsDetailRes=await Api.getBookGoodDetail(params)
				if(goodsDetailRes.code==0){
					goodsDetailRes.good.goodbanner=goodsDetailRes.good.images.split(',')
					goodsDetailRes.good.goodbanner.pop()
					that.goodsDetail=goodsDetailRes.good
					that.goodBooks=goodsDetailRes.goodBooks
					let dateArr=[]
					for(var i in goodsDetailRes.goodBooks){
						let dateArr={}
						dateArr.label=that.timeFormat(goodsDetailRes.goodBooks[i].dateTime)
						dateArr.value=i
						dateArr.children=[]
						let str=goodsDetailRes.goodBooks[i].detail
						let resArry=JSON.parse(str)
						for(let j in resArry){
							let multiArr={}
							let resdataArry=resArry[j].split('/')
							console.log(resdataArry);
							if(resdataArry[2]>0){
								multiArr.label=resdataArry[1]
								multiArr.value=resdataArry[0]
								dateArr.children.push(multiArr)
							}	
						}
						console.log(dateArr);
						that.mulLinkageTwoPicker.push(dateArr)
					}
					store.commit("stateGoodDetail",that.goodsDetail)
				}
			},
			timeFormat(timestamp){
				var time = new Date(timestamp);
				var month = time.getMonth()+1;
    		    var date = time.getDate();
    		    return `${month}月${date}日`
    		}, 
    		onConfirm(e) {
    			let that=this
    			console.log(e,"我的亲",that.goodBooks);
    			let goodBooksItem=that.goodBooks[e.index[0]]
    			let dateTime=goodBooksItem.dateTime
    			let endtime=e.label.split('-')[2]
    			let begintime=e.label.split('-')[1]
    			let endtimehour=endtime.split(':')[0]
    			let endtimemintution=endtime.split(':')[1]
    			let begintimehour=begintime.split(':')[0]
    			let begintimemintution=begintime.split(':')[1]
    			let begintimetap=begintimehour*60*60*1000+begintimemintution*60*1000+dateTime*1
    			let endtimetap=endtimehour*60*60*1000+endtimemintution*60*1000+dateTime*1
    		    let appointmentParam={}
    		    appointmentParam.beginTime=begintimetap
				appointmentParam.endTime=endtimetap
				appointmentParam.index = e.index[1]
				appointmentParam.goodBookId = that.goodBooks[e.index[0]].id
				console.log(appointmentParam,"查看两个时间")
    		    store.commit("stateappointment",appointmentParam)
    		    wx.navigateTo({url:'../order-submit/main?orderType=2'})

    		}
		},
		async onLoad(options) {
			let that=this
			that.goodsId =options.goodsId
			that.Width=wx.getSystemInfoSync().windowWidth
			that.multiArray=[]
			that.dataArray=[]
            if(options.codeUnionid!=''){
            	store.commit("statecodeUnionid",options.codeUnionid)
            }
            that.userInfo = store.state.userInfo
            let params={}
            params.goodId=that.goodsId
            if(that.userInfo.whetherDistribe!=0){
            	params.memberLv=that.userInfo.whetherDistribe
            }
			that.getGoodsInfo(params)
			// 调用应用实例的方法获取全局数据
		}
	}
</script>

<style lang="less">
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
	.nav {
		position: fixed;
		bottom: 0px;
		display: flex;
		width: 100%;
		height: 55px;
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
			.Present-discounts-people {
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