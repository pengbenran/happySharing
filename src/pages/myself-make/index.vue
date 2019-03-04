<template>
	<div class="make">
		<div class="paintImg">
			<img :src="shareImage">
		</div>
		<canvasdrawer :painting="painting"  @getImage="eventGetImage" ref="canvas"/>
		<div class="btn" @click="eventSave">保存图片</div> 
		<!-- <div class="rule"><span>了解规则</span></div> -->
	</div>
</template>
<script>
	import util from '@/utils/index'
	import store from '@/store/store'
	import Api from '@/api/goods'
	import canvasdrawer from '@/components/canvasdrawer'
	export default {
		data() {
			return {
				painting:{},
				shareImage:'',
				userInfo:{}
			};
		},
		components:{
			canvasdrawer
		},
	
		methods: {
			// 生成二维码
			async getErCode(unionid,inviteCode){
				let that=this
				let params={}
				params.params=store.state.userInfo.unionid+','+inviteCode+','+3
				let QrcodeRes=await Api.GetQrcode(params)
				if(QrcodeRes.code==0){
					that.eventDraw(QrcodeRes.url)
				}
				
			},
			//点击生成海报
			async eventDraw(codeUrl){
			   	let that = this;
			   	wx.showLoading({
			   		title:'推广码绘制中'
			   	})	
			   	let ImgArr = []
			   	ImgArr[0]=store.state.config.distribePoster
			   	ImgArr[1]=codeUrl
			   	ImgArr[2]=that.userInfo.face
			   	that.painting={
			   		width: 290,
			   		height: 413,
			   		clear: true,
			   		views: [
			   			{
			   			type:'rect',
			   			background:'#fff',
			   			top:0,
			   			left:0,
			   			width:290,
			   			height:413

			   		},
			   		{
			   			type: 'image',
			   			url: ImgArr[0],
			   			top: 0,
			   			left: 0,
			   			width: 290,
			   			height: 318
			   		},
			   		{
			   			type: 'image',
			   			url: ImgArr[2],
			   			top: 320,
			   			left: 30,
			   			width: 50,
			   			height: 50,
			   			borderRadius:22.5
			   		},
			   		{
			   			type: 'image',
			   			url: ImgArr[1],
			   			top: 320,
			   			left: 170,
			   			width: 90,
			   			height: 90
			   		},
			   		{
			   			type: 'text',
			   			content:that.userInfo.name,
			   			fontSize: 13,
			   			color: '#666',
			   			textAlign: 'left',
			   			breakWord: true,
			   			top: 370,
			   			left:30,
			   			width:100,
			   			MaxLineNumber:1,
			   			isCenter:false
			   		},{
			   			type: 'text',
			   			content:that.userInfo.dlvname,
			   			fontSize: 13,
			   			color: '#666',
			   			textAlign: 'left',
			   			breakWord: true,
			   			left: 30,
			   			top: 390,
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
		onLoad(options){
			let that=this
			that.userInfo = store.state.userInfo
			that.getErCode(that.userInfo.unionid,options.inviteCode)
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