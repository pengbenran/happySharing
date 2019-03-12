<template>
	<div style="width: 100%;">
		<blockquote v-if="!isLoading">
			<loading></loading>
		</blockquote>
		<blockquote v-else>
           	<!--搜索-->
			<Search></Search>
			<!--轮播-->
			<Banner :banner='bannerImg'></Banner>
			<!--类目-->
			<div class="product-list">
				<div @click="kindChang(index)" v-for="(item,index) in kindItem"  :class="timeindex === index? 'product-list-li-on':'product-list-li' " >
					<div class="title">{{item.name}}</div>
					<div class="desc">{{item.description}}</div>
				</div>
			</div>
			<!--最新最火-->
		<!-- 	<div class="order">
				<div class="latest">最新</div>
				<div class="hot">最热</div>
				<div class="active"></div>
			</div> -->
			<!--列表-->
			<div class="centered">
				<discount :discountList="goodCatList" :wid="wid" :magleft="magleft" ref="discounts" :isflex='displayType'></discount> 
				<nomoreTip v-if="!hasMore[timeindex]"></nomoreTip>
			</div>
		</blockquote>

			
	</div>
</template>

<script>
	import Search from '@/components/search'
	import Banner from '@/components/banner'
	import discount from '@/components/discount'
	import kindApi from "@/api/home"
	import util from '@/utils/index'
	import Api from '@/api/goods'
	import nomoreTip from "@/components/nomoreTip"
	import loading from '@/components/loading'
	export default { 
		data() {
			return {
				isLoading:false,
				timeindex:0, 
				displayType:'block',
				kindItem: [],
				wid:"100%",
				magleft:'0px',
				bookList:[],
				nowPage:[],
				hasMore:[],
				goodCatList:[],
				bannerImg:[]
			}
		},
		components: {
			Search,
			Banner,
			discount,
			nomoreTip,
			loading
		},

		methods: {
           kindChang(index) {
				let that=this
				that.timeindex = index;
				that.goodCatId=that.kindItem[index].id
				if(that.bookList[that.timeindex].length==0){
					that.getKindGood(1,3,that.goodCatId)
				}		
				else{
					that.goodCatList=that.bookList[that.timeindex]
				}	
				// that.bookList=bookGoodRes.rows
			},
			getbannerMessage(typeId){
				// 获取地区分类下的广告
				let that=this
				Api.getTypeImg(4,typeId).then(function(typeImgRes){
					that.bannerImg=typeImgRes.data.imgs
				})
				
			},
           async getKindGood(pageNum,pageSize,goodCatId){
				let that=this
				console.log(that.hasMore[that.timeindex])
				if(that.hasMore[that.timeindex]){
					let params={}
					wx.showLoading({
						title: '加载中',
					})
					params.goodCatId=goodCatId
					let goodKindRes=await Api.getkindGood(pageNum,pageSize,params)
					goodKindRes.rows.map(item=>{
						item.saveMoney=util.accSub(item.showPrice,item.price)	
					})
					wx.hideLoading();

					if(goodKindRes.rows.length<pageSize){
						that.hasMore[that.timeindex]=false
					}
					
					that.bookList[that.timeindex]=that.bookList[that.timeindex].concat(goodKindRes.rows)

				}
				else{
					wx.showToast({
						title:'没有更多数据了',
						icon:"none",
						duration:1500
					})
				}
				that.goodCatList=that.bookList[that.timeindex]	
				
			}
		},
		onReachBottom:function(){
			let that = this;
			that.nowPage+=1
			that.getKindGood(that.nowPage,3,that.goodCatId)
		},
		async onLoad(options) {
			let that=this
			let params={}
			params.parentId=options.parentId
			that.getbannerMessage(options.parentId)
			let childKindRes=await Api.getChild(params)
			if(childKindRes.goodCats.length>0){
				that.kindItem=childKindRes.goodCats
				for(var i in that.kindItem){
					that.hasMore[i]=true
					that.bookList[i]=[]
					that.nowPage[i]=1
				}
				that.goodCatId=that.kindItem[0].id
				that.isLoading = true;
				that.getKindGood(that.nowPage[0],3,that.goodCatId)
			}else{
				wx.showToast({
						title:'该分类暂无商品',
						icon:"none",
						duration:1500
				})
			    let timr=setTimeout(function(){
					wx.switchTab({
						url: '../index/main',  
					})
				},1500);
				
			}
			
			// 调用应用实例的方法获取全局数据
		},
		onUnload(){
				this.isLoading=false,
				this.timeindex=0, 
				this.displayType='block',
				this.kindItem= [],
				this.wid="100%",
				this.magleft='0px',
				this.bookList=[],
				this.nowPage=[],
				this.hasMore=[],
				this.goodCatList=[]
		},
	}
</script>

<style scoped lang="less">
	/*中间居中*/
	
	.centered {
		width: 95%;
		margin: 0 auto;
	}
	
	.product-list {
		display: flex;
		justify-content: space-around;
		text-align: center;
		margin:20px auto;
		.product-list-li{
			.title {
				color: #111111;
				font-size: 16px;
			}
			.desc {
				color: #999999;
				font-size: 14px;
				width: 70px;
				height: 18px;
				text-align: center;
				line-height: 18px;
				margin-top: 5px;
			}
		} 
		.product-list-li-on {			
			.desc {
				border-radius: 20px;
				background-color: #ff9a4c;
				color: #ffffff;
				font-size: 14px;
				width: 70px;
				height: 18px;
				text-align: center;
				line-height: 18px;
				margin-top: 5px;
			}
			.title {
				color: #ff9a4c;
				font-size: 16px;
			}
		}
	}
	
	.order {
		width: 85px;
		height: 22px;
		border-radius: 11px;
		border: 1px solid #999999;
		margin: 0 auto;
		line-height: 24px;
		display: flex;
		justify-content: space-between;
		margin-bottom: 19px;
		position: relative;
		.latest,
		.hot {
			font-size: 12px;
			color: #999999;
			line-height: 24px;
			text-align: center;
			width: 50%;height: 100%;		
		}
		.active{
			position: absolute;left: -1px;top: -1px;
			width: 50%;height: 100%;border: 1px solid #ff9a4c;
			border-radius: 11px;
		}
	}
	.discount {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
</style>