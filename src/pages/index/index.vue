<template>
	<div class="container">
		<!-- 顶部导航 -->
		<div class="top">
			<div class="address"><span class="addressName oneover">南昌</span><span class="iconfont">&#xe60c;</span></div>
			<Search></Search>
		</div>
		<!-- banner图 -->
		<div class="banner">
			<Banner></Banner>
		</div>
		<!-- 积分商城 -->
		<div class="pointLogo">
			<img src="/static/images/pointLogo.png" mode="widthFix">
		</div>
		<!-- 地区列表 -->
		<div class="addressItem">

			<div class="addressItemList" v-for="(item,index) in addressItem">
				<navigator url="../../pages/auro/main">
					<img :src="item.icon" mode="widthFix">
					<span>{{item.name}}</span>
				</navigator>
			</div>

		</div>
		<!-- 菜单列表 -->
		<div class="menuItem">
			<div class="menuItemList" v-for="(item,index) in menuItem">
				<img :src="item.icon" mode="widthFix">
				<span>{{item.name}}</span>
			</div>
		</div>
		<!-- 头条广告 -->
		<div class="adv">
			<img src="/static/images/tou.png">
			<span>这是一条公告公告</span>
		</div>
		<!-- 分类列表 -->
		<kindTemplate :kind_item='kindItem'></kindTemplate>
		<!--为你推荐-->
		<div class="discount-wrap centered">
			<div class="title">为你推荐</div>
			<div class="discount">
				<discount :discountList="item" v-for="(item , index) in discount" :key="item.goodsid" :wid="wid" :magleft="magleft"></discount>
					<day ref='day'> </day>
			</div>
		</div>
		
	
	</div>

</template>

<script>
	import discount from '@/components/discount'
	import Search from '@/components/search'
	import Banner from '@/components/banner'
	import kindTemplate from '@/components/kindTemplate'
	import day from '@/components/day'
	export default {
		data() {
			return {
				addressItem: [{
					name: "东湖区",
					icon: '/static/images/up_icon_a.png'
				}, {
					name: "东湖区",
					icon: '/static/images/up_icon_a.png'
				}, {
					name: "东湖区",
					icon: '/static/images/up_icon_a.png'
				}, {
					name: "东湖区",
					icon: '/static/images/up_icon_a.png'
				}, {
					name: "东湖区",
					icon: '/static/images/up_icon_a.png'
				}, {
					name: "东湖区",
					icon: '/static/images/up_icon_a.png'
				}, {
					name: "东湖区",
					icon: '/static/images/up_icon_a.png'
				}],
				menuItem: [{
					name: '火锅',
					icon: '/static/images/down_icon_a.png'
				}, {
					name: '火锅',
					icon: '/static/images/down_icon_a.png'
				}, {
					name: '火锅',
					icon: '/static/images/down_icon_a.png'
				}, {
					name: '火锅',
					icon: '/static/images/down_icon_a.png'
				}, {
					name: '火锅',
					icon: '/static/images/down_icon_a.png'
				}, {
					name: '火锅',
					icon: '/static/images/down_icon_a.png'
				}, {
					name: '火锅',
					icon: '/static/images/down_icon_a.png'
				}, ],
				kindItem: [{
					kindicon: '/static/images/label_fight_up.png',
					kindname: '老哥龙虾店老哥龙虾店老哥龙虾店',
					kindintro: '66抵200',
					kindImg: '/static/images/banner_label_a.png',
					backGround: '#FEB2B6'
				}, {
					kindicon: '/static/images/label_fight_up.png',
					kindname: '老哥龙虾店老哥龙虾店老哥龙虾店',
					kindintro: '66抵200',
					kindImg: '/static/images/banner_label_b.png',
					backGround: '#FFCDB2'
				}, {
					kindicon: '/static/images/label_fight_up.png',
					kindname: '老哥龙虾店老哥龙虾店老哥龙虾店',
					kindintro: '66抵200',
					kindImg: '/static/images/banner_label_c.png',
					backGround: '#FFB2F8'
				}, {
					kindicon: '/static/images/label_fight_up.png',
					kindname: '老哥龙虾店老哥龙虾店老哥龙虾店',
					kindintro: '66抵200',
					kindImg: '/static/images/banner_label_d.png',
					backGround: '#B1D0FF'
				}],
				discount: [{
						goodsid: 1,
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
						goodsid: 2,
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
						goodsid: 3,
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
					}

				],
				wid: "100%",
				magleft: '0px'
			}
		},

		components: {
			Search,
			Banner,
			kindTemplate,
			discount,
			day,
		},

		methods: {

		},
		mounted(){
						let that = this;
			that.$refs.day.Times()
		}

	}
</script>

<style scoped lang="less">
	/*隐藏滚动条*/
	
	 ::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}
	/*centered*/
	
	.centered {
		width: 95%;
		margin: 0 auto;
	}
	
	.index-title {
		font-size: 18px;
		color: #111111;
		margin: 24px auto 18px auto;
		font-weight: bold;
	}
	
	.container {
		.top {
			display: flex;
			margin-bottom: 10px;
			.address {
				width: 80px;
				height: 50px;
				line-height: 50px;
				text-align: center;
				.addressName {
					width: 55px;
					height: 100%;
					display: inline-block;
				}
				.iconfont {
					vertical-align: top;
				}
			}
		}
		.addressItem,
		.menuItem {
			font-size: 0.8em;
			color: #9a9a9a;
			display: flex;
			width: 100%;
			overflow-x: auto;
			overflow-y: hidden;
			// white-space: nowrap;
			.addressItemList,
			.menuItemList {
				width: 20%;
				text-align: center;
				flex-shrink: 0;
				img {
					width: 50px;
					height: 50px;
				}
				span {
					display: block;
				}
			}
		}
		// @keyframes kf-marque-animation{ 0% { transform: translateX(0); } 100% { transform: translateX(-53.3%); } }
		.adv {
			border: 1px solid #ddd;
			height: 40px;
			font-size: 0.8em;
			line-height: 40px;
			width: 95%;
			margin: 5px auto;
			padding: 0 10px;
			box-sizing: border-box;
			img {
				width: 50px;
				height: 18px;
				display: inline-block;
				vertical-align: middle;
			}
			span {
				padding: 0 5px;
				box-sizing: border-box;
			}
		}
		.centered {
			width: 95%;
			margin: 0 auto;
		}
		.discount-wrap {
			padding-top: 24px;
			.title {
				font-size: 18px;
				color: #111111;
				margin-bottom: 18px;
				font-weight: bold;
			}
			.discount {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
			}
		}
	}
</style>