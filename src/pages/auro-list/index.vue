<template>
	<div style="width: 100%;">
		<!--搜索-->
		<Search></Search>
		<!--超值优惠-->
		<div class="discount-wrap centered">
			<div class="discount">
				<discount :discountList="item" v-for="(item , index) in discount" :key="item.goodsid" :wid="wid" :magleft="magleft"></discount>
			</div>	
		</div>	
	</div>
</template>

<script> 
	import Search from '@/components/search'
	import discount from '@/components/discount'
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
				wid:'100%',
				magleft:'0',
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
			discount
		},

		methods: {
         jump(index){
         	console.log(111);
         	console.log(index)
         }
		},

		created() {
			// 调用应用实例的方法获取全局数据

		}
	}
</script>

<style scoped lang="less">
	.discount-wrap {
		padding: 24px 0;
		.title {
			font-size: 18px;
			color: #111111;
			margin-bottom: 18px; 
			font-weight: bold;
		}
	
	}
</style>