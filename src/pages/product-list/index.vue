<template>
	<div style="width: 100%;">
		<!--搜索-->
		<Search></Search>
		<!--轮播-->
		<Banner></Banner>
		<!--类目-->
		<div class="product-list centered">
			<div @click="click(index)" v-for="(item,index) in productlist"  :class="timeindex === index? 'product-list-li-on':'product-list-li' " >
				<div class="title">{{item.title}}</div>
				<div class="desc">{{item.desc}}</div>
			</div>
		</div>
		<!--最新最火-->
		<div class="order">
			<div class="latest">最新</div>
			<div class="hot">最热</div>
			<div class="active"></div>
		</div>
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
	export default { 
		data() {
			return {
				 timeindex:0, 
				productlist: [{
					title: "美食",
					desc: "畅享美味",
				}, {
					title: "美食",
					desc: "畅享美味",
				}, {
					title: "美食",
					desc: "畅享美味" ,
				}, {
					title: "美食",
					desc: "畅享美味",
				}],
				wid:"100%",
				magleft:'0px',
				discount: [
				{ 
					goodsid:1,
					img: "/static/images/banner.png",
					name: "世茂/金塔/新力/莲塘/四店通用",
					make: "免预约",
					desc: "西江月园林艺术餐厅，真正的艺术赣菜,快来抢购！",
					original: "223",
					Present: "16.9",
					discounts: "83",
					people: "2人",
					sell: "2368",
					dianzhan: "1188"
				},
				{
					goodsid:2,
					img: "/static/images/banner.png",
					name: "世茂/金塔/新力/莲塘/四店通用",
					make: "需预约",
					desc: "西江月园林艺术餐厅，真正的艺术赣菜,快来抢购！",
					original: "223",
					Present: "16.9",
					discounts: "83",
					people: "2人",
					sell: "200",
					dianzhan: "1188"
				},
				{
					goodsid:3,
					img: "/static/images/banner.png",
					name: "世茂/金塔/新力/莲塘/四店通用",
					make: "免预约",
					desc: "西江月园林艺术餐厅，真正的艺术赣菜,快来抢购！",
					original: "223",
					Present: "16.9",
					discounts: "83",
					people: "2人",
					sell: "200",
					dianzhan: "1188"
				},

				],
			}

		},
		components: {
			Search,
			Banner,
			discount
		},

		methods: {
           click(index){
              this.timeindex=index;            
           }
		},

		created() {
			
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
		justify-content: space-between;
		text-align: center;
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