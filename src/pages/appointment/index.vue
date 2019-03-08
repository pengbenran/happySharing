<template>
	<div style="width: 100%;">
		<blockquote v-if="!isLoading">
			<loading></loading>
		</blockquote>
		<blockquote v-else>
			<!--搜索-->
			<Search></Search>
			<!--类目-->
			<div class="product-list centered">
				<div @click="kindChang(index)" v-for="(item,index) in goodCart" :class="timeindex === index? 'product-list-li-on':'product-list-li' ">
					<div class="title">{{item.name}}</div>
					<div class="desc">{{item.description}}</div>
				</div>
			</div>
			<!--列表-->
			<div class="discount-wrap">
				<div class="discount-li centered" v-for="(discountList,index) in bookItem" @click="jumpGoodDetail(discountList.id)">
					<div class="img"><img :src="discountList.thumbnail" /></div>
					<div class="cant">
						<div class="name-make clr">
							<div class="name fl">{{discountList.title}}</div>
							<div class="make fr">需预约</div>
						</div>
						<div class="desc">{{discountList.goodName}}</div>
						<div class="original-people clr">
							<div class="original fl">原价:{{discountList.showPrice}}</div>
						</div>
						<div class="Present-discounts-sell clr">
							<div class="Present fl">￥:{{discountList.price}}</div>
							<div class="discounts fl">优惠:{{discountList.saveMoney}}元</div>
							<div class="sell fr">已售:{{discountList.showSales}}</div>
						</div>
					</div>
				</div>
				<nomoreTip v-if="!hasMore[timeindex]"></nomoreTip>
			</div>
		</blockquote>
	</div>
</template>

<script>
	import Search from '@/components/search'
	import Api from '@/api/goods'
	import apiKind from '@/api/home'
	import util from '@/utils/index'
	import nomoreTip from "@/components/nomoreTip"
	import loading from '@/components/loading'

	export default {
		data() {
			return {
				isLoading:false,
				timeindex: 0,
				goodCart: [],
				wid: "100%",
				magleft: '0px',
				bookList:[],
				goodCatId:'',
				nowPage:1,
				bookItem:[],
				hasMore:[],
				nowPage:[]
			}

		},
		components: {
			Search,
			nomoreTip,
			loading
		},

		methods: {
			kindChang(index) {
				let that=this
				that.timeindex = index;
				that.goodCatId=that.goodCart[index].id
				if(that.bookList[that.timeindex].length==0){
					that.getBookGood(1,3,that.goodCatId)
				}		
				else{
					that.bookItem=that.bookList[that.timeindex]
				}	
			},
			jumpGoodDetail(goodsId){
				wx.navigateTo({url:'../appointmentDetail/main?goodsId='+goodsId+'&codeUnionid='})
			},
			async getBookGood(pageNum,pageSize,goodCatId){
				let that=this
				if(that.hasMore[that.timeindex]){
					let params={}
					params.goodCatId=goodCatId
					let bookRes=await Api.getBookGood(pageNum,pageSize,params)
					bookRes.rows.map(item=>{
						item.saveMoney=util.accSub(item.showPrice,item.price)	
					})
					if(bookRes.rows.length<pageSize){
						that.hasMore[that.timeindex]=false
					}
					that.bookList[that.timeindex]=that.bookList[that.timeindex].concat(bookRes.rows)
					
				}
				else{
					wx.showToast({
						title:'没有更多数据了',
						icon:"none",
						duration:1500
					})
				}
				that.bookItem=that.bookList[that.timeindex]		
			}
		},
		onReachBottom:function(){
			let that = this;
			that.nowPage[that.timeindex]+=1
			that.getBookGood(that.nowPage[that.timeindex],3,that.goodCatId)
		},
		async mounted() {
			let that=this
			let goodCartRes=await apiKind.getGoodCart()
			that.goodCart=goodCartRes.goodCats
			that.goodCatId=that.goodCart[0].id
			for(var i in that.goodCart){
				that.hasMore[i]=true
				that.bookList[i]=[]
				that.nowPage[i]=1
			}
			await that.getBookGood(1,3,that.goodCatId)
			that.bookItem=that.bookList[0]
			that.isLoading=true
			// 调用应用实例的方法获取全局数据
		},
		//		  用户点击右上角分享
	}
</script>

<style scoped lang="less">
	/*中间居中*/
	
	.centered {
		width: 95%;
		margin: 0 auto;
	}
	/*类目*/
	
	.product-list {
		display: flex;
		text-align: center;
		margin-top: 18px;
		width: 100%;
		overflow-x: auto;
		overflow-y: hidden;
		.product-list-li {
			margin-bottom: 16px;
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
	/*最新最火*/
	
	.order {
		width: 85px;
		height: 22px;
		border-radius: 11px;
		border: 1px solid #999999;
		margin: 0 auto;
		line-height: 24px;
		display: flex;
		justify-content: space-between;
		margin-bottom: 16px;
		position: relative;
		.latest,
		.hot {
			font-size: 12px;
			color: #999999;
			line-height: 24px;
			text-align: center;
			width: 50%;
			height: 100%;
		}
		.active {
			position: absolute;
			left: -1px;
			top: -1px;
			width: 50%;
			height: 100%;
			border: 1px solid #ff9a4c;
			border-radius: 11px;
		}
	}
	/*列表*/
	
	.discount-li {
		position: relative;
		flex-shrink: 0;
		margin-bottom: 164px;
		border-radius: 5px;
		// &:nth-child(1),
		// &:nth-child(2) {
		// 	margin: 0;
		// }
		.img {
			width: 100%;
			border-radius: 5px;
			height: 200px;
			img {
				width: 100%;
				height: 100%;
				border-radius: 5px;
			}
		}
		.cant {
			box-sizing: border-box;position: absolute;
			bottom: -139px;left: 50%;margin-left: -165px; background-color: #ffffff;
			padding: 0 10px;border: 1px solid #cccccc;
			width: 331px;height: 168px;
			border-radius: 6px;
			.name-make {
				margin: 20px 0;
				.name {
					font-size: 12px;
					color: #999999;
				/*	border-bottom: 1px solid #ff0000;*/
				}
				.make {
					font-size: 10px;
					color: #ffb10f;
					width: 40px;
					height: 15px;
					border: 1px solid #ffb10f;
					line-height: 15px;
					text-align: center;
					border-radius: 5px;
				}
			}
			.desc {
				font-size: 15px;
				color: #111111;
				line-height: 18px;
			}
			.original-people {
				padding: 8px 0;
				.original {
					text-decoration: line-through;
					color: #999999;
					font-size: 12px;
				}
				.people {
					color: #999999;
					font-size: 12px;
				}
			}
			.Present-discounts-sell {
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
				.sell {
					color: #666666;
					font-size: 12px;
				}
			}
		}
	}
</style>