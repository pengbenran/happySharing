<template>
	<div style="width: 100%;">
		<!--搜索-->
		<Search></Search>
		<!--轮播-->
		<Banner></Banner>
		<!--类目-->
		<div class="cate centered">
			<div v-for="(item , index) in cate" class="cate-li">
				<div class="img"><img :src="item.image" /></div>
				<div class="name">{{item.name}}</div>
			</div>
		</div>
		<!--超值优惠-->
		<div class="discount-wrap centered">
			<div class="title">超值优惠</div>
			<scroll-view class="scroll-view_H" scroll-x style="width: 100%">
				<div class="discount">
					<div v-for="(item , index) in discount" class="discount-li">
						<div class="img"><img :src="item.img" /></div>
						<div class="name-make clr">
							<div class="name fl">{{item.name}}</div>
							<div class="make fr">{{item.make}}</div>
						</div>
						<div class="desc">{{item.desc}}</div>
						<div class="original-people clr">
							<div class="original fl">原价:{{item.original}}</div>
							<div class="people fr">{{item.people}}</div>
						</div>
						<div class="Present-discounts-sell clr">
							<div class="Present fl">￥:{{item.Present}}</div>
							<div class="discounts fl">优惠:{{item.discounts}}</div>
							<div class="sell fr">已售:{{item.sell}}</div>
						</div>
					</div>
				</div>
			</scroll-view>
		</div>
		<!--超赞推荐-->
		<div class="rec-wrap centered">
			<div class="title ">超赞推荐</div>
			<div class="image"><img src="/static/images/rec-banner.png" /></div>
			<div v-for="(item , index) in rec" class="rec-li clr">
				<div class="img fl"><img :src="item.img" /></div>
				<div class="rec-center fl">
					<div class="tit">{{item.title}}</div>
					<div class="name">{{item.name}}</div>
					<div class="present ">￥:{{item.present}}</div>
					<div class="original ">原价:{{item.original}}</div>
					<div class="dianzhan">点赞:{{item.dianzhan}}</div>
				</div>

				<div class="rec-right fr">
					<div class="make ">{{item.make}}</div>
					<div class="people ">{{item.people}}</div>
					<div class="sell ">已售:{{item.sell}}</div>
				</div>

			</div>
		</div>
		<!--2-->
		<div class="rec-wrap centered">
			<div class="image"><img src="/static/images/rec-banner.png" /></div>
			<div v-for="(item , index) in rec" class="rec-li clr">
				<div class="img fl"><img :src="item.img" /></div>
				<div class="rec-center fl">
					<div class="tit">{{item.title}}</div>
					<div class="name">{{item.name}}</div>
					<div class="present ">￥:{{item.present}}</div>
					<div class="original ">原价:{{item.original}}</div>
					<div class="dianzhan">点赞:{{item.dianzhan}}</div>
				</div>

				<div class="rec-right fr">
					<div class="make ">{{item.make}}</div>
					<div class="people ">{{item.people}}</div>
					<div class="sell ">已售:{{item.sell}}</div>
				</div>

			</div>
		</div>

	</div>
</template>

<script>
	import Search from '@/components/search'
	import Banner from '@/components/banner'
	export default {
		data() {
			return {
				
			

				cate: [{
					
						name: "火锅",
						image: "/static/images/down_icon_h.png"
					},
					{
						name: "火锅",
						image: "/static/images/down_icon_h.png"
					},
					{
						name: "火锅",
						image: "/static/images/down_icon_h.png"
					},
					{
						name: "火锅",
						image: "/static/images/down_icon_h.png"
					},
					{
						name: "火锅",
						image: "/static/images/down_icon_h.png"
					},
					{
						name: "火锅",
						image: "/static/images/down_icon_ff.png"
					},
					{
						name: "火锅",
						image: "/static/images/down_icon_ff.png"
					},
					{
						name: "火锅",
						image: "/static/images/down_icon_ff.png"
					},
					{
						name: "火锅",
						image: "/static/images/down_icon_ff.png"
					},
					{
						name: "火锅",
						image: "/static/images/down_icon_ff.png"
					},
				],
				discount: [

					{ 
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
				}, ],
				rec1: [{
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
			Banner
		},

		methods: {

		},

		created() {
			// 调用应用实例的方法获取全局数据
			
		}
	}
</script>

<style scoped lang="less">
	/*浮动*/
	
	.fl {
		float: left;
	}
	
	.fr {
		float: right;
	}
	/*清除浮动*/
	
	.clr {
		&:after {
			content: "";
			display: block;
			clear: both
		}
		zoom:1
	}
	/*字体图标*/
	
	@font-face {
		font-family: 'iconfont';
		/* project id 977189 */
		src: url('//at.alicdn.com/t/font_977189_gjvgj44cte.eot');
		src: url('//at.alicdn.com/t/font_977189_gjvgj44cte.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_977189_gjvgj44cte.woff') format('woff'), url('//at.alicdn.com/t/font_977189_gjvgj44cte.ttf') format('truetype'), url('//at.alicdn.com/t/font_977189_gjvgj44cte.svg#iconfont') format('svg');
	}
	/*公共居中*/
	
	.centered {
		width: 350px;
		margin: 0 auto;
	}
	/*类目*/
	
	.cate {
		display: flex;
		justify-content: space-around;
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
			.discount-li {
				margin-left: 20px;
				width: 240px;
				&:nth-child(1) {
					margin-left: 0;
				}
				.img {
					width: 100%;
					height: 75px;
					img {
						width: 100%;
						height: 100%;
						border-radius: 5px;
					}
				}
				.name {
					font-size: 12px;
					color: #ff0000;
					border-bottom: 1px solid #ff0000;
					margin: 6px 0;
				}
				.make {
					font-size: 10px;
					color: #4aa9fe;
					width: 40px;
					height: 15px;
					border-radius: 5px;
					border: 1px solid #4aa9fe;
					line-height: 15px;
					text-align: center;
					margin-top: 8px;
				}
				.desc {
					font-size: 15px;
					color: #111111;
					line-height: 18px;
					width: 220px;
				}
				.original-people {
					padding-bottom: 8px;
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
		.rec-li {
			padding-bottom: 16px;
			margin-top: 16px;
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
				width: 210px;
				line-height: 20px;
				overflow: hidden;
				padding-left: 12px;
				box-sizing: border-box;
				.tit {
					font-size: 15px;
					color: #111111;
				}
				.name {
					font-size: 12px;
					color: #999999;
				}
				.present {
					color: #ff0000;
					font-size: 17px;
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
				width: 60px;
				line-height: 24px;
				overflow: hidden;
				.make {
					font-size: 10px;
					color: #4aa9fe;
					width: 40px;
					height: 15px;
					border-radius: 5px;
					border: 1px solid #4aa9fe;
					line-height: 15px;
					text-align: center;
					margin-top: 8px;
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
	}
</style>