<template>
	<div class="container">
		<!-- 顶部导航 -->
		<div class="top">		
				<span>南昌</span>
				<span class="iconfont">&#xe60c;</span>
			    <span><Search></Search></span> 
			    <span>+</span>
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
				<!-- <day ref="day" :endtime="endtime"></day>	 -->
				<discount :discountList="item" v-for="(item , index) in discount" :key="item.goodsid" :wid="wid" :magleft="magleft" ref="discounts"></discount>
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
					tipIcon:"美食",
					kindicon: '/static/images/label_fight_up.png',
					kindname: '老哥龙虾店老哥龙虾店老哥龙虾店',
					kindintro: '66抵200',
					kindImg: '/static/images/banner_label_a.png',
					backGround: '#FEB2B6'
				}, {
					tipIcon:"亲子",
					kindicon: '/static/images/label_fight_up.png',
					kindname: '老哥龙虾店老哥龙虾店老哥龙虾店',
					kindintro: '66抵200',
					kindImg: '/static/images/banner_label_b.png',
					backGround: '#FFCDB2'
				}, {
					tipIcon:"美业",
					kindicon: '/static/images/label_fight_up.png',
					kindname: '老哥龙虾店老哥龙虾店老哥龙虾店',
					kindintro: '66抵200',
					kindImg: '/static/images/banner_label_c.png',
					backGround: '#FFB2F8'
				}, {
					tipIcon:"旅游",
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
						dianzhan: "1188",
						endtime:"2018-12-30 16:50:00",
						d:0,
						h:0,
						m:0,
						s:0
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
						dianzhan: "1188",
						endtime:"2018-12-29 16:50:00",
						d:0,
						h:0,
						m:0,
						s:0
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
						dianzhan: "1188",
						endtime:"2018-12-28 16:50:00",
						d:0,
						h:0,
						m:0,
						s:0
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


  components: {
    Search, 
    Banner,
    kindTemplate,
    discount,
  },

  methods: {
   
  },


		methods: {
			cutTimes: function(i,endtime) {
				//获取当前时间
				let that=this
				var date = new Date();
				var now = date.valueOf();
				//设置截止时间
				var endDate = new Date(endtime).valueOf();
				//时间差
				var leftTime = endDate - now;
				//定义变量 d,h,m,s保存倒计时的时间 
				if(leftTime >= 0) {
					var interval = setInterval(function () {
						that.discount[i].d = parseInt(leftTime / 1000 / 60 / 60 / 24,10);
						that.discount[i].h = parseInt(leftTime / 1000 / 60 / 60 % 24,10);
						that.discount[i].m = parseInt(leftTime / 1000 / 60 % 60,10);
						that.discount[i].s = parseInt(leftTime / 1000 % 60,10);
						leftTime = leftTime - 1000;
						if(leftTime<0){
							clearinterval(interval)
						}
     				},1000)	
				}	
			}
		},
		mounted(){
			let that = this;
			// that.$refs.discounts.timeouts()
			for(var i in that.discount){
				that.cutTimes(i,that.discount[i].endtime)
			}
			// console.log(that.$refs.discounts);
		    // this.$refs.discounts.get()
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
			align-items: center;
			padding: 9px 12px;
			span{
				display: block;
				&:nth-child(1),&:nth-child(2){
					font-size: 15px;
					color: #111111;
					font-weight: bold;
				}
				&:nth-child(2){
					font-size: 12px;
					margin-left: 2px;
					margin-top: 5px;
				}
				&:nth-child(3){
					margin-left: 14px;
				}
				&:nth-child(4){
					font-size: 23px;
					color: #111111;
					font-weight: bold;
					margin-left: 14px;
					margin-bottom: 4px;
				}
			}
		}
		.pointLogo{
			width:  240px;
		    height: 55px;
		    margin:  10px auto;
		    
			
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
					font-size: 12px;
					color: #666666;
				}
			}
		}
		//@keyframes kf-marque-animation{ 0% { transform: translateX(0); } 100% { transform: translateX(-53.3%); } }
		.adv {
			border: 1px solid #ddd;
			height: 33px;
			font-size: 12px;
			line-height: 33px;
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
			padding-top: 30px;
			.title {
				font-size: 18px;
				color: #111111;
				margin-bottom: 30px;
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