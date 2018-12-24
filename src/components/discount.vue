<template>
	<div>
		<div class="discount-wrap centered">
			<div class="title">为你推荐</div>
			<div class="discount">
				<div v-for="(item , index) in discount" class="discount-li">
					<div class="img"><img :src="item.img" /></div>
					<div class="cant">
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
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				discount: [{
						img: "/static/images/banner.png",
						name: "世茂/金塔/新力/莲塘/",
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
						name: "世茂/金塔/新力/莲塘/",
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
						name: "世茂/金塔/新力/莲塘/",
						make: "免预约",
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
						name: "世茂/金塔/新力/莲塘/",
						make: "免预约",
						desc: "西江月园林艺术餐厅，真正的艺术赣菜,快来抢购！",
						original: "223",
						Present: "16.9",
						discounts: "83",
						people: "2人",
						sell: "200",
						dianzhan: "1188"
					}

				]
			}
		},

		components: {

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
	/*中间居中*/
	.centered{
		width: 95%;margin:  0 auto;
	}
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
			flex-wrap: wrap;
			justify-content: space-between;
			.discount-li {
				width: 48%;
				border: 1px solid #cccccc;
				margin-top: 15px;
				border-radius: 5px;
				&:nth-child(1),
				&:nth-child(2) {
					margin: 0;
				}
				.img {
					width: 100%;
					border-radius: 5px;
					height: 75px;
					img {
						width: 100%;
						height: 100%;
						border-radius: 5px;
					}
				}
				.cant {
					box-sizing: border-box;
					padding: 0 5px;
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
	}
	
	
</style>