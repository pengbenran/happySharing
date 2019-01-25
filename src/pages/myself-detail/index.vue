<template>
	<div class="container">
		<!--佣金-->
		<div class="myselfdetails">
			<div class="myselfdetail">
				<div class="myselfdetail-left">
					<span>累计佣金（元）</span>
					<span>{{userInfo.total}}</span>
				</div>
				<div class="myselfdetail-right">
					<span>可提佣金（元）</span>
					<span>{{userInfo.balance}}</span>
					<span class="cashBtn" @click="jumpCash">提现</span>
				</div>
			</div>
		</div>

		<div class="flowbill">
			<!--流水信息栏-->
			<div class="flowbill-cate">

				<div class="tit">
					流水信息
				</div>
				<div class="type" @click="btnShow">
					类型-{{type}}<span class="iconfont" style="color: #666666;">&#xe600;</span>
				</div>
				<div class="day">
					<!-- 2018-12-30<span class="iconfont" style="color: #666666;">&#xe600;</span> -->
				</div>
			</div>

			<!--流水列表 -->
			<div class="flowbill-list" v-if="current==0">
				<div v-for="(item,index) in commissionList" class="flowbill-list-li" >
					<div class="top">
						<div class="img"> <img :src="item.face" /></div>
						<div class="name">
							<span class="oneover">{{item.name}} - {{item.stauname}}</span>
							<span class="oneover">购买商品-{{item.goodName}}</span>
							<span>{{item.time}}</span>
						</div>
						<div class="num">
							<p>商品返佣<span>+{{item.commission}}</span></p> 
							<p>上下线佣金<span>+{{item.rankMoney}}</span></p>
						</div>
					</div>
					<div class="xian"></div>
				</div>
				<nomoreTip v-if="!hasMore[0]"></nomoreTip>
			</div>
			<div class="flowbill-list" v-else>
				<div v-for="(item,index) in withdeawList" class="flowbill-list-li" >
					<div class="top">
						<div class="img"> <img :src="item.face" /></div>
						<div class="name">
							<span>{{item.name}} - {{item.stauname}}</span>
							<span></span>
							<span>{{item.time}}</span>
						</div>
						<div class="num">-{{item.withdraw}}</div>
					</div>
					<div class="xian"></div>
				</div>
				<nomoreTip v-if="!hasMore[1]"></nomoreTip>
			</div>
		</div>
		<!--弹窗-->
		<div class="popup" v-if="isShow">
			<div class="popup-wp">
				<div class="popup-header">选择流水类型</div>
				<div class="popup-cant">
					<span v-for="(item,index) in popup" @click="addClass(index)" :class="{on:index == current}">{{item.name}}</span>
				</div>
				<div @click="btnHide" class="popup-footer">取消</div>
			</div>
		</div>
	</div>
</template>

<script>
	import store from '@/store/store'
	import Api from '@/api/distribe'
	import nomoreTip from "@/components/nomoreTip"
	export default {
		data() {
			return {
				type:'',
				userInfo:{},
				popup: [{
					name: "返佣详情",
				},
				{
					name: "提现详情"
				},	
				],
				commissionList:[],
				withdeawList:[],
				isShow: false,
				current: 0,
				nowPage:[0,0],
				hasMore:[true,true]
			}
		},

		components: {
			nomoreTip
		},
		mounted() {
			let that=this
			that.userInfo = store.state.userInfo
			this.type = this.popup[0].name;
			that.getCommissionList(0,6,that.userInfo.unionid)
		},
		methods: {
			btnShow() {
				this.isShow = true;
			},
			jumpCash(){
				wx.navigateTo({url:`../myself-cash/main`})
			},
			btnHide() {
				this.isShow = false;
			},
			// 获取返佣列表
			async getCommissionList(pagesNum,pageSize,unionid){
				let that=this
				if(that.hasMore[0]){
					wx.showLoading({
						title: '加载中',
					})
					let params={}
					params.offset=pagesNum*pageSize
					params.limit=pageSize
					// params.tjUnionid=unionid
					params.tjUnionid=unionid
					let commissionRes=await Api.getCommissionList(params)
					wx.hideLoading();
					commissionRes.rows.map(item=>{
						item.stauname=item.status==1?'已红包返佣':item.status==2?'返佣失败':'返佣已加余额'
						return item
					})
					if(commissionRes.rows.length<pageSize){
						that.hasMore[0]=false
					}
					that.commissionList=that.commissionList.concat(commissionRes.rows)
				}
				else{
					wx.showToast({
						title:'没有更多数据了',
						icon:"none",
						duration:1500
					})
				}
				

			},
			async getWithdrawList(pagesNum,pageSize,unionid){
				let that=this
				if(that.hasMore[1]){
					wx.showLoading({
						title: '加载中',
					})
					let params={}
					params.offset=pagesNum*pageSize
					params.limit=pageSize
					params.unionid=unionid
					let withdeawRes=await Api.getWithdrawList(params)
					wx.hideLoading();
					withdeawRes.rows.map(item=>{
						item.stauname=item.status==1?'提现成功':'提现失败'
						return item
					})
					if(withdeawRes.rows.length<pageSize){
						that.hasMore[1]=false
					}
					that.withdeawList=that.withdeawList.concat(withdeawRes.rows)
				}
				else{
					wx.showToast({
						title:'没有更多数据了',
						icon:"none",
						duration:1500
					})
				}
			},
			// 获取提现列表
			addClass(index) {
				let that=this
				that.current = index;
				that.isShow = false;
				that.type = that.popup[index].name;
				if(that.withdeawList.length==0){
					that.getWithdrawList(0,6,that.userInfo.unionid)
				}

			}
		},
		onReachBottom:function(){
			let that = this;		
			if(that.type=="返佣详情"){
				that.nowPage[0]+=1
				that.getCommissionList(that.nowPage[0],6,that.userInfo.unionid)	
			}
			else{
				that.nowPage[1]+=1
				that.getWithdrawList(that.nowPage[1],6,that.userInfo.unionid)
			}
			
		},
		computed: {
			// expenditure() {
			// 	return this.bills.expenditure.toFixed(2);
			// },
			// income() {
			// 	return this.bills.income.toFixed(2);
			// },
			// tofiex() {
			// 	return(this.bills.income - this.bills.expenditure).toFixed(2);
			// },
			// num() {
			// 	for(var i in this.bill) {
			// 		var num = this.bill[i].num.toFixed(2);
			// 		return num;
			// 	}
			// }
		},
	}
</script>

<style scoped lang="less">
.container {
	width: 100%;
	background-color: #f9f9f9;
}
.myselfdetails {
	background-color: #fff;
	.myselfdetail {
		display: flex;
		justify-content: space-between;
		width: 283px;
		margin: 0 auto;
		padding: 20px 0;
		.myselfdetail-left {
			text-align: center;
			span {
				display: block;
				&:nth-child(1) {
					color: #111111;
					font-size: 15px;
				}
				&:nth-child(2) {
					color: #111111;
					font-size: 33px;
					font-family: "roboto";
					padding: 30px 0;
				}
			}
		}
		.myselfdetail-right {
			text-align: center;
			span {
				display: block;
				&:nth-child(1) {
					color: #111111;
					font-size: 15px;
				}
				&:nth-child(2) {
					color: #32a1ff;
					font-size: 33px;
					font-family: "roboto";
					padding: 30px 0;
				}
			}
			.cashBtn {
				width: 80px;
				height: 33px;
				background-color: #32a1ff;
				color: #fff;
				font-size: 14px;
				line-height: 33px;
				border-radius: 3px;
				margin: 0 auto;
				text-align: center;
				span {
					color: #fff;
				}
			}
		}
	}
}
.flowbill{
	margin-top:8px;
	background: #fff;
	width: 100%;
	padding: 0 12px;
	box-sizing: border-box;
	.flowbill-cate{
		margin-bottom: 10px;
		width: 100%;
		height: 60px;
		line-height: 60px;
		display: flex;
		justify-content: space-between;
		.tit {
			color: 111111;
			font-size: 18px;
			font-weight: bold;
		}.type {color: #666666;font-size: 14px;}
		.day {font-size: 14px;color: #111111;}
	}
}
.flowbill-list {
	.flowbill-list-li{
		.top{
			display: flex;
			justify-content: space-around;
			.img{
				width: 44px;
				height: 44px;
				vertical-align: middle;
				border-radius: 50%;
				overflow: hidden;
			}
			.name{
				margin-left: 12px;
				flex-grow: 1;
				margin-top: 4px;
				span {
					max-width: 200px;
					display: block;
					&:nth-child(1) {
						font-size: 14px;
						color: #111111;
						height: 20px;
						line-height:20px;
					}
					&:nth-child(2) {
						font-size: 12px;
						color: #999999;
						margin-top: 2px;
					}
					&:nth-child(3) {
						font-size: 12px;
						color: #999999;
						margin-top: 2px;
						height: 20px;
						line-height:20px;
					}
				}
			}
			.num{
				p{
					font-size: 14px;
					font-family: "roboto";
					line-height: 25px;
					span{
						color:red;
						font-size: 18px;
					}
				}
			
			}

		}
		.xian {
			height: 1px;
			background-color: #DEDEDE;
			width: 297px;
		}
	}
}
.popup {
	position: fixed;
	bottom: 0;
	width: 100%;
	background-color: #f9f9f9;
	.popup-wp {
		padding: 20px 12px;
		.popup-header {
			padding-bottom: 20px;
			border-bottom: 1px solid #DEDEDE;
			font-size: 14px;
			color: #111111;
			text-align: center;
		}
		.popup-cant {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			padding: 10px 8px 20px 8px;
			span {
				display: block;
				color: #666666;
				font-size: 14px;
				text-align: center;
				width: 105px;
				height: 66px;
				line-height: 66px;
				background-color: #fff;
				border-radius: 5px;
				margin-top: 10px;
			}
			.on {
				color: #fff;
				background-color: #32A1FF;
			}
		}
		.popup-footer {
			padding-top: 20px;
			border-top: 1px solid #DEDEDE;
			text-align: center;
			font-size: 14px;
			color: #111111;
		}
	}
}
</style>