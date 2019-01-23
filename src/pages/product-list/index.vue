<template>
	<div style="width: 100%;">
		<!--搜索-->
		<Search></Search>
		<!--轮播-->
		<Banner></Banner>
		<!--类目-->
		<div class="product-list centered">
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
		<div class="discount centered">
			<discount :discountList="item" v-for="(item , index) in discount" :key="item.goodsid" :wid="wid" :magleft="magleft"></discount> 
		</div>		
	</div>
</template>

<script>
	import Search from '@/components/search'
	import Banner from '@/components/banner'
	import discount from '@/components/discount'
	import kindApi from "@/api/home";
	import Api from '@/api/goods'
	export default { 
		data() {
			return {
				timeindex:0, 
				kindItem: [],
				wid:"100%",
				magleft:'0px',
				bookList: [],
			}

		},
		components: {
			Search,
			Banner,
			discount
		},

		methods: {
           kindChang(index) {
				let that=this
				that.timeindex = index;
				let params={}
				params.goodCatId=that.kindItem[index].id
				that.getBookGood(1,3,params)
				// that.bookList=bookGoodRes.rows
			},
           async getBookGood(pageNum,pageSize,params){
				let that=this
				let bookRes=await Api.getBookGood(pageNum,pageSize,params)
				bookRes.rows.map(item=>{
					item.saveMoney=util.accSub(item.showPrice,item.price)	
				})
				that.bookList=bookRes.rows
			}
		},

		async mounted() {
			let that=this
			let rootKindRes=await kindApi.getRootKind()
			that.kindItem=rootKindRes.rootCats
			let params={}
			params.goodCatId=that.kindItem[0].id
			that.getBookGood(1,3,params)
			// 调用应用实例的方法获取全局数据
		}
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
		margin-top: 18px;
		
		.product-list-li{
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