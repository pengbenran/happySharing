<template>
	<div class="goodPoster">
		<div class="paintImg" v-show="paintOk">
			<div class="bcg" @click="closeClick"></div>
			<div class="img" :style="{width:Width+'px',height:Width+'px'}">
				<img :src="shareImage">
			</div>
			<div class="saveImgBtn" @click="saveImg">保存图片到本地</div>
		</div>
		<canvasdrawer :painting="painting"  @getImage="eventGetImage" ref="canvas"/>
	</div>
</template>

<script>
	import canvasdrawer from './canvasdrawer'
	import Api from '@/api/goods'
	import store from '@/store/store'
	export default {
		props: ['goodDetail'],
		data() {
			return {
				userInfo:{},
				Width:310,
				Height:500,
				painting:'',
				paintOk:false,
				shareImage:'',
				Left:'',
				imgWidth:'',
				imgHight:''
			}
		},
		components: {
		  canvasdrawer,	
		},
		methods: {
			// 关闭模态框
			closeClick(){
				let that=this
				that.paintOk=false
				that.$emit('closePoster')
			},
			// 获取二维码
			getErCode(goodsId,type){
				let that=this
				that.Left=(wx.getSystemInfoSync().windowWidth)*0.1
				that.imgWidth=(wx.getSystemInfoSync().windowWidth)*0.8
				that.imgHight=that.imgWidth*1.612
				that.userInfo = store.state.userInfo	
				let params={}
				params.params=`${that.userInfo.unionid},${goodsId},1`
				Api.GetQrcode(params).then(function(QrcodeRes){
					if(QrcodeRes.code==0){
						that.eventDraw(QrcodeRes.quick)
					}else{
						ShowToast('失败','none')
					}
				})
				
			},
			//点击生成海报
		   async eventDraw(codeUrl){
		   	let that = this;
		   	wx.showLoading({
		   		title:'推广码绘制中'
			   })	
		   	that.painting={
		   		width: that.Width,
		   		height: that.Width,
		   		clear: true,
		   		views: [
		   		{
		   			type: 'image',
		   			url: that.goodDetail.posterImg,
		   			top: 0,
		   			left: 0,
		   			width: that.Width,
		   			height: that.Width
		   		},
		   		{
		   			type: 'image',
		   			url: codeUrl,
		   			top: that.Width-60,
		   			left: 155,
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
		},
	}
</script>

<style scoped lang="less">
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
		left: 10%;
	}
}
</style>