<template>
	<div class="make">
		<!-- <div class="myself-make">
			<div class="head">
			    <div class="img"><img :src="head.img"/></div>
			    <div class="cant">
			    	<span>{{head.name}}</span>
			    	<span>{{head.pai}}</span>
			    </div>
			</div>
			<div class="invite">邀你加入一起嗨翻</div>
			<div class="code"><img :src="code"/></div>
			<div class="flicking">使用微信扫一扫</div>
			<div class="momoda">【抹哒抹哒】小程序</div>
		</div> -->
		<div class="paintImg">
			<img :src="shareImage">
		</div>
		<canvasdrawer :painting="painting"  @getImage="eventGetImage" ref="canvas"/>
		<div class="btn">保存图片</div> 
		<div class="rule"><span>了解规则</span></div>
	</div>
</template>
<script>
	import util from '@/utils/index'
	import store from '@/store/store'
	import canvasdrawer from '@/components/canvasdrawer'
	export default {
		data() {
			return {
				head:{
					img:"/static/images/head.png", 
					name:"bobo",
					pai:"金牌推荐师"
				},
				painting:{},
				code:"/static/images/code.png",
				shareImage:'',
				userInfo:{}
			};
		},
		components:{
			canvasdrawer
		},
	
		methods: {
			   //点击生成海报
			   async eventDraw(){
			   	let that = this;
			    wx.showLoading({
			        title:'推广码绘制中'
			    })	
			    that.userInfo = store.state.userInfo
			    console.log(that.userInfo);
			   	// let res = await api.GetShare('pages/shopInfo/main',that.goodsId)
			   	let ImgArr = ['https://shop.guqinet.com/html/images/zhifenxiang/bcg.png','https://shop.guqinet.com/html/images/zhifenxiang/ecode.png',]
			   	ImgArr[2]=that.userInfo.face
			   	// let ImgRes = await util.getImageInfo(ImgArr)
			   	// let name='彭本燃彭彭本燃彭彭'
			   	that.painting={
			   		width: 290,
			   		height: 413,
			   		clear: true,
			   		views: [
			   		{
			   			type: 'image',
			   			url: ImgArr[0],
			   			top: 0,
			   			left: 0,
			   			width: 290,
			   			height: 413
			   		},
			   		{
			   			type: 'image',
			   			url: ImgArr[2],
			   			top: 20,
			   			left: 125,
			   			width: 45,
			   			height: 45,
			   			borderRadius:22.5
			   		},
			   		{
			   			type: 'image',
			   			url: ImgArr[1],
			   			top: 170,
			   			left: 70,
			   			width: 150,
			   			height: 150
			   		},
			   		{
			   			type: 'text',
			   			content:that.userInfo.name,
			   			fontSize: 13,
			   			color: '#666',
			   			textAlign: 'left',
			   			breakWord: true,
			   			top: 70,
			   			width:200,
			   			isCenter:true
			   		},{
			   			type: 'text',
			   			content:that.userInfo.lvname,
			   			fontSize: 13,
			   			color: '#666',
			   			textAlign: 'left',
			   			breakWord: true,
			   			left: 15,
			   			top: 90,
			   			width:200,
			   			isCenter:true
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
			   		this.shareImage=tempFilePath

			   		// wx.previewImage({
			     //        current: this.shareImage, // 当前显示图片的http链接
			     //        urls: [this.shareImage] // 需要预览的图片http链接列表
			     //    })
			   	}
			   },
			eventSave() {
				wx.saveImageToPhotosAlbum({
					filePath: this.shareImage,
					success(res) {
						wx.showToast({
							title: '保存图片成功',
							icon: 'success',
							duration: 2000
						})
					}
				})
			},
		},
		mounted(){
			let that=this
			that.eventDraw()
		}
	};
</script>
<style lang="less">
	img{
		width:100%;
		height: 100%;
		display: block;
	}
	.make{
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #007bf9;
		.paintImg{
			width: 290px;
			height: 413px;
			background-color: #fff;
			margin:  20px auto 0 auto;
		}
		.btn{
			margin-top: 30px;
			width: 290px;
			height: 49px;
			line-height: 49px;
			text-align: center;
			margin:  30px auto 0 auto;
			color: #ff0000;
			font-size: 16px;
			background-color: #fff100;
			border-radius: 3px;
		}
		.rule{
			font-size: 16px;				
			text-align: center;
			margin-top: 30px;
			span{
				border-bottom: 1px solid #FFFFFF;
					color: #ffffff;	
			}
		}
	}
</style>