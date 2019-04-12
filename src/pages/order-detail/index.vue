<template>
	<div>
		<div class="order-detail">
			<!--模块1-->
			<div class="title">
				<span></span>
				<span>{{OrderInfo.statusType}}</span>
			</div>
			<!--模块2-->
			<div class="rec-li " >
				<div class="rec-li-warp clr" @click="jumpShop">
					<div class="img fl"><img :src="OrderInfo.thumbnail" /></div>
					<div class="rec-center fl">
						<div class="tit fontHidden">{{OrderInfo.goodName}}</div>
						<div class="name">{{OrderInfo.goodName}}</div>
						<div class="present "><span>￥:{{OrderInfo.goodsAmount}}</span></div>
						<!-- <div v-if="goodlist.isshow" class="dianzhan">点赞:{{goodlist.dianzhan}}</div> -->
					</div>
					<div class="rec-right fr">
						<div class="clr">
							<div class="make fr">{{OrderInfo.statusType}}</div>
						</div>
						<div class="people ">{{OrderInfo.goodsNum}}</div>
						<!-- <div class="sell ">已售:{{goodlist.sell}}</div> -->
					</div>
				</div>
				<!--总价-->
				<div class="prices">
					<div class="price1">
						<span>商品价格: </span>
						<span> ¥ {{OrderInfo.goodsAmount}}</span>
					</div>
					<div class="price1">
						<span>佣金抵扣: </span>
						<span> ¥ {{OrderInfo.balance}}</span>
					</div>	
					<div class="price2" v-if="OrderInfo.orderType != 3">
						<span>推荐师：</span>
						<span> ¥ {{OrderInfo.recommend}}</span>
					</div>
					<div class="price3">
						<span>订单总价：</span>
						<span> ¥ {{OrderInfo.orderAmount}}</span>
					</div>
					<div class="price4">
						<span>实付金额：</span>
						<span> ¥ {{OrderInfo.needPayMoney}}</span>
					</div>
				</div>
			</div>
			<!--模板3-->
			<div class="code">
				<div class="code-center">
					<div class="txt-img" v-if="OrderInfo.status!=3">
						<div class="txt">电子码</div>
						<div class="img"><img :src="OrderInfo.orderCode" /></div>
					</div>
					<div class="txt-img" v-else>
						<div class="img">订单已过期</div>
					</div>
					<div class="number clr"> <span class="fl"> 订单编号：</span> <span class="fl">{{OrderInfo.orderId}}</span></div>
				</div>
			</div>

			<!--订单详情-->
			<div class="detail-order">
				<div class="tit">订单详情</div>
				<div  class="detail-order-li">
					<div v-if="OrderInfo.orderType != 3">
						<span>获得积分:</span>
						<span>{{OrderInfo.gainedpoint}}</span>
					</div>
					<div>
						<span>下单时间:</span>
						<span>{{OrderInfo.createTime}}</span>
					</div>
					<div  v-if="OrderInfo.orderType==2">
						<span>预约开始时间:</span>
						<span v-if="OrderInfo.beginTime!=null">{{OrderInfo.beginTime}}</span>
						<span v-else>暂未预约</span>
					</div>
					<div v-if="OrderInfo.orderType==2">
						<span>预约结束时间:</span>
						<span v-if="OrderInfo.endTime!=null">{{OrderInfo.endTime}}</span>
						<span v-else>暂未预约</span>
					</div>
				</div>
			</div>

			<!--按钮-->
			<div class="dele">
				<span v-if="OrderInfo.orderType==2&&OrderInfo.endTime==null" @click="showPicker">立即预约</span>
				<span @click='jumpHome' class="jumpHomebtn">回到首页</span>
			</div>
			<div style="margin-bottom:55px">
				<mpvue-picker :mode="mode" :deepLength=deepLength ref="mpvuePicker" :pickerValueArray="pickerValueArray" :pickerValueDefault="pickerValueDefault" @onConfirm="onConfirm"></mpvue-picker>
			</div>
		</div>
	</div>
</template>

<script>
	import goodslist from '@/components/goodslist'
	import Index_Lib from '@/utils/index'
	import API_ord from '@/api/order'
	import Lib from '@/utils/lib'
	import mpvuePicker from '@/components/mpvuePick'
	import Api from '@/api/goods'
	import store from '@/store/store'
	export default {
		components: {
			goodslist,
			mpvuePicker
		},

		data() {
			return {
				orderId:'',
				OrderInfo:{},
				mode: 'multiLinkageSelector',
			    deepLength: 2, // 几级联动
			    pickerValueDefault: [1,0], // 初始化值
			    pickerValueArray: [], // picker 数组值
			    pickerText: '',
			    mulLinkageTwoPicker: [],
			    pickerValueDefault: [0,0],
			    goodBooks:[],
			    userInfo:{}
			}
		},
	
		methods:{
			async showPicker() {
				console.log(11111);
				let that=this
				that.mulLinkageTwoPicker=[]
				await that.getGoodsInfo()	
				that.pickerValueArray = that.mulLinkageTwoPicker;
				that.$refs.mpvuePicker.show();
			},
			onConfirm(e) {
    			let that=this
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
				appointmentParam.index = e.value[1]
				appointmentParam.orderId=that.orderId
				appointmentParam.goodBookId = that.goodBooks[e.index[0]].id
				appointmentParam.memberId=that.userInfo.id
				appointmentParam.orderType=2
    		    API_ord.orderBook(appointmentParam).then(function(res){
    		    	if(res.code==0){
    		    		Lib.showToast('预约成功','success')
    		    		that.getOnList()
    		    	}else{
    		    		Lib.showToast('预约失败','none')	
    		    	}
    		    })
			},
			async getGoodsInfo(){
				let that=this
				let params={}  
				params.goodId=that.OrderInfo.goodsId
				if(that.whetherDistribe!=0){
					params.memberLv=that.userInfo.whetherDistribe
				}
				let goodsDetailRes=await Api.getBookGoodDetail(params)
				if(goodsDetailRes.code==0){
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
							if(resdataArry[2]>0){
								multiArr.label=resdataArry[1]
								multiArr.value=resdataArry[0]
								dateArr.children.push(multiArr)
							}	
						}
						that.mulLinkageTwoPicker.push(dateArr)
					}
				}
			},
            async getOnList(){
				let that = this;
				let data = {orderId:that.orderId};
				let res = await API_ord.getOrderList(data).catch(err => {
					Lib.showToast('失败','loading')
				});
				if(res.code == 0){
						if(res.pageUtils.rows[0].status == 0){
                           res.pageUtils.rows[0].statusType = '待支付'
						}else if (res.pageUtils.rows[0].status == 1) {
							res.pageUtils.rows[0].statusType = '待核销'
						}else if (res.pageUtils.rows[0].status == 2) {
							res.pageUtils.rows[0].statusType = ' 已核销'
						}else if (res.pageUtils.rows[0].status == 3) {
							res.pageUtils.rows[0].statusType = '已取消'
						}
					res.pageUtils.rows[0].createTime = Index_Lib.formatTime(res.pageUtils.rows[0].createTime)
					if(res.pageUtils.rows[0].beginTime!=null&&res.pageUtils.rows[0].endTime!=null){
						res.pageUtils.rows[0].beginTime=Index_Lib.formatTime(res.pageUtils.rows[0].beginTime)
					    res.pageUtils.rows[0].endTime=Index_Lib.formatTime(res.pageUtils.rows[0].endTime)
					}
						
					that.OrderInfo = res.pageUtils.rows[0]
				};
			},
			jumpHome(){
				wx.switchTab({
					url:'../index/main'
				})
			},
			timeFormat(timestamp){
				var time = new Date(timestamp);
				var month = time.getMonth()+1;
    		    var date = time.getDate();
    		    return `${month}月${date}日`
    		}, 
			jumpShop(){
				let that = this;
				if(that.OrderInfo.orderType == 1){//跳转到普通详情
					wx.navigateTo({url:`../detail/main?goodsId=${that.OrderInfo.goodsId}`})
				}else if(that.OrderInfo.orderType == 2){//跳转到预约详情
					wx.navigateTo({url:`../appointmentDetail/main?goodsId=${that.OrderInfo.goodsId}`})
				}else{
					wx.navigateTo({//跳转到积分详情
					    url: `../welfareDetail/main?goodsId=${that.OrderInfo.goodsId}`　
					})
				}
			},
		},

		onLoad(options){
			 let that = this;
			 that.userInfo=store.state.userInfo
			 that.orderId = options.orderId;
			 that.getOnList();
		},

	}
</script>

<style lang="less">
	.order-detail {
		background-color: #F9F9F9;
		/*模块1*/
		.title {
			width: 100%;
			height: 128px;
			position: relative;
			/*background-color: #ff7d28;*/
			background: linear-gradient(#ff7d28, #ff9a4c);
			span {
				display: block;
				&:nth-child(1) {
					padding-top: 40px;
					padding-left: 28px;
					color: #ffffff;
					font-size: 19px;
				}
				&:nth-child(2) {
					position: absolute;
					bottom: -20px;
					width: 351px;
					height: 60px;
					color: #ff7d28;
					font-size: 25px;
					text-align: center;
					line-height: 60px;
					background-color: #fff;
					left: 50%;
					margin-left: -175px;
					font-weight: bold;
				}
			}
		}
		/*模块2*/
		.rec-li {
			.rec-li-warp {
				padding: 20px 12px;
				margin-top: 32px;
				background-color: #fff;
				border-bottom: 1px solid #dedede;
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
					width: 176px;
					line-height: 20px;
					overflow: hidden;
					padding-left: 12px;
					box-sizing: border-box;
					margin-top: 8px;
					.tit {
						font-size: 15px;
						color: #111111;
					}
					.name {
						font-size: 12px;
						color: #999999;
					}
					.present {
						span {
							&:nth-child(1) {
								color: #111111;
								font-size: 12px;
							}
							&:nth-child(2) {
								color: #999999;
								font-size: 10px;
								margin-left: 12px;
								text-decoration: line-through;
							}
						}
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
					.dianzhan {
						width: 68px;
						height: 15px;
						color: #ffb10f;
						border: 1px solid #ffb10f;
						border-radius: 5px;
						text-align: center;
						line-height: 15px;
						font-size: 11px;
						font-family: "宋体";
					}
				}
				.rec-right {
					width: 70px;
					line-height: 24px;
					overflow: hidden;
					margin-top: 8px;
					text-align: right;
					.make {
						font-size: 10px;
						color: #4aa9fe;
						width: 40px;
						height: 15px;
						border-radius: 5px;
						border: 1px solid #4aa9fe;
						line-height: 15px;
						text-align: center;
					}
					.people {
						color: #999999;
						font-size: 12px;
					}
					.sell {
						color: #666666;
						font-size: 12px;
					}
				}
			}
			.prices {
				background-color: #fff;
				padding: 18px 12px;
				.price1,
				.price2,
				.price3,
				.price4,
				{
					display: flex;
					justify-content: space-between;
					margin-bottom: 11px;
				}
				.price1,
				.price2,
				{
					span {
						color: #999999;
						font-size: 11px;
					}
				}
				.price3,
				{
					margin-bottom: 22px;
					span {
						color: #111111;
						font-size: 13px;
					}
				}
				.price4,
				{
					margin-bottom: 0;
					span {
						color: #fd0200;
						font-size: 13px;
					}
				}
			}
		}
		/*模板3*/
		.code {
			background-color: #fff;
			margin-top: 8px;
			.code-center {
				padding: 20px 12px;
				.txt-img {
					display: flex;
					.txt {
						font-size: 14px;
						font-weight: bold;
					}
					.img {
						width: 124px;
						height: 124px;
						margin: 0 auto;
						padding-right: 21px;
					}
				}
				.number {
					padding-top: 12px;
					span {
						display: block;
						font-size: 12px;
						color: #666666;
						&:nth-child(2) {
							width: 249px;
							text-align: center;
						}
					}
				}
			}
		}
		/*订单详情*/
		.detail-order {
			background-color: #fff;
			margin-top: 8px;
			padding-bottom: 44px;
			.tit {
				font-size: 14px;
				font-weight: bold;
				padding: 20px 12px 9px 12px;
			}
			.detail-order-li {
				padding: 0px 12px 50px 12px;
				div {
					span {
						display: inline-block;
						font-size: 12px;
						color: #666666;
						margin-top: 10px;
						&:nth-child(1) {
							width: 100px;
							margin-top: 0;
						}
						&:nth-child(2) {
							margin-left: 22px;
						}
					}
				}
			}
		}
		.dele {
			background-color: #fff;
			display: flex;
			width: 100%;
			border-top: 1px solid #DEDEDE;
			padding: 8px 0;
			/*flex-direction: row-reverse;*/
			justify-content: flex-end;
			position: fixed;
			bottom: 0;
			span {
				width: 80px;
				height: 32px;
				border-radius: 17px;
				border: 1px solid #DEDEDE;
				text-align: center;
				line-height: 32px;
				font-size: 14px;
				display: block;
				margin-right: 12px;
			}
			.jumpHomebtn{
				color: #fff;
				background-color: #ff7d28;
				border: 1px solid #ff7d28;
			}
		}
	}
</style>