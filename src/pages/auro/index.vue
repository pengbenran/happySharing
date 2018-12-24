<template>
	<div style="width: 100%;">
		<!--搜索-->
		<Search></Search>
		<!--轮播-->
		<Banner></Banner>
		<!--类目-->
		<div class="cate centered">
			<div v-for="(item , index) in cate" :key="item.cateid" class="cate-li">
				<div class="img"><img :src="item.image" /></div>
				<div class="name">{{item.name}}</div>
			</div>
		</div>
		<!--超值优惠-->
		<div class="discount-wrap centered">
			<div class="title">超值优惠</div>
			<div class="discount">
				<discount :discountList="item" v-for="(item , index) in discount" :key="item.goodsid" :wid="wid" :magleft="magleft"></discount>
			</div>
		</div>
		<!--超赞推荐-->
		<div class="rec-wrap centered">
			<div class="title ">超赞推荐</div>
			<div class="image"><img src="/static/images/rec-banner.png" /></div>
            <goodslist v-for="(item , index) in rec" :goodlist="item" :key="item.recId"></goodslist>
		</div>
	</div>
</template>

<script> 
	import Search from '@/components/search'
	import Banner from '@/components/banner'
	import discount from '@/components/discount'
	import goodslist from '@/components/goodslist'
	export default {
		data() {
			return {

				cate: [{
						cateid:1,
						name: "火锅",
						image: "/static/images/down_icon_h.png"
					},
					{
						cateid:2,
						name: "火锅", 
						image: "/static/images/down_icon_h.png"
					},
					{
						cateid:3,
						name: "火锅",
						image: "/static/images/down_icon_h.png"
					},
					{
						cateid:4,
						name: "火锅",
						image: "/static/images/down_icon_h.png"
					},
					{
						cateid:5,
						name: "火锅",
						image: "/static/images/down_icon_h.png"
					},
					{
						cateid:6,
						name: "火锅",
						image: "/static/images/down_icon_ff.png"
					},
					{
						cateid:7,
						name: "火锅",
						image: "/static/images/down_icon_ff.png"
					},
					{
						cateid:8,
						name: "火锅",
						image: "/static/images/down_icon_ff.png"
					},
					{
						cateid:9,
						name: "火锅",
						image: "/static/images/down_icon_ff.png"
					},
					{
						cateid:10,
						name: "火锅",
						image: "/static/images/down_icon_ff.png"
					},
				],
				wid:'240px',
				magleft:'10px',
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
				rec: [{
					recId:1,
					img: "/static/images/d.png",
					title: "西江月园林火锅",
					name: "世茂/金塔/新力/莲塘/四店通用",
					make: "免预约",
					desc: "西江月园林艺术餐厅，真正的艺术赣菜,快来抢购！",
					original: "223",
					present: "16.9",
					discounts: "83",
					people: "2人",
					sell: "2368",
					dianzhan: "1188"
				}, {
					recId:2,
					img: "/static/images/d.png",
					title: "西江月园林火锅",
					name: "世茂/金塔/新力/莲塘/四店通用",
					make: "需预约",
					desc: "西江月园林艺术餐厅，真正的艺术赣菜,快来抢购！",
					original: "223",
					present: "16.9",
					discounts: "83",
					people: "2人",
					sell: "200",
					dianzhan: "1188"
				}, {
					recId:3,
					img: "/static/images/d.png",
					title: "西江月园林火锅",
					name: "世茂/金塔/新力/莲塘/四店通用",
					make: "免预约",
					desc: "西江月园林艺术餐厅，真正的艺术赣菜,快来抢购！",
					original: "223",
					present: "16.9",
					discounts: "83",
					people: "2人",
					sell: "200",
					dianzhan: "1188"
				}, ]
			}
		},

		components: {
			Search,
			Banner,
			discount,
			goodslist
		},

		methods: {

		},

		created() {
			// 调用应用实例的方法获取全局数据

		}
	}
</script>

<style scoped lang="less">
	/*类目*/
	.cate {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		text-align: center;
		.cate-li {
			margin-top: 16px;
			width: 70px;
			.img {
				width: 25px;
				height: 25px;
				margin: 0 auto;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.name {
				font-size: 12px;
				color: #666666;
				margin-top: 4px;
			}
		}
	}
	/*超值优惠*/
	
	.discount-wrap {
		padding: 24px 0 40px 0;
		.title {
			font-size: 18px;
			color: #111111;
			margin-bottom: 18px;
			font-weight: bold;
		}
		.discount {
			display: flex;
	        overflow-x:auto;
	        overflow-y:hidden;  
		}
	}
	/*超赞推荐*/
	
	.rec-wrap {
		.title {
			font-size: 18px;
			color: #111111;
			/*margin-bottom: 18px;*/
			font-weight: bold;
		}
		.image {
			width: 100%;
			padding-bottom: 16px;
			height: 96px;
			margin-top: 18px;
			border-bottom: 1px solid #dedede;
			img {
				width: 100%;
				height: 100%;
				border-radius: 5px;
			}
		}
	}
</style>