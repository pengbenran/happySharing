<template>
	<div>
		<div class="rec-wrap centered">
			<div class="rec-li" v-for="(goodlist , index) in rec" :key="goodlist.recId">
				<navigator url="../order-detail/main" hover-class="none">
					<div class="cant clr">
						<div class="img fl"><img :src="goodlist.img" /></div>
						<div class="rec-center fl">
							<div class="tit">{{goodlist.title}}</div>
							<div class="name">{{goodlist.name}}</div>
							<div class="present ">￥:{{goodlist.present}}</div>
							<div class="time ">预约时间：{{goodlist.time}}</div>
						</div>
						<div class="rec-right fr">
							<div class="use">{{goodlist.use}}</div>
							<div class="num ">数量 : {{goodlist.num}}</div>
						</div>
					</div>
					<div class="clr">
						<div class="line fr"></div>
					</div>
					<div class="rec-bottom">
						<span>{{goodlist.dele}}</span>
						<span>{{goodlist.detail}}</span>					
					</div>
				</navigator>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				rec: [{
					recId: 1,
					img: "/static/images/d.png",
					title: "西江月园林火锅",
					name: "世茂/金塔/新力/莲塘/四店通用",
					use: "待使用",
					desc: "西江月园林艺术餐厅，真正的艺术赣菜,快来抢购！",
					original: "223",
					present: "16.9",
					discounts: "83",
					num: "1",
					sell: "2368",
					time: "2018-12-31",
					dele: "删除订单",
					detail: "订单详情",
					integral: "积分兑换",
				},  ]
			};
		},
		methods: {

		},
		computed: {}
	};
</script>
<style lang="less">
	/*列表*/
	
	.rec-li {
		padding-bottom: 36px;
		&:nth-child(1) {
			margin-top: 20px;
		}
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
			line-height: 23px;
			overflow: hidden;
			padding-left: 12px;
			box-sizing: border-box;
			.tit {
				font-size: 15px;
				color: #111111;
				line-height: 24px;
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
			.time {
				color: #ffb10f;
				font-size: 11px;
			}
		}
		.rec-right {
			width: 60px;
			line-height: 65px;
			text-align: right;
			.use {
				line-height: 24px;
				font-size: 12px;
				color: #ff7d28;
			}
			.num {
				color: #333333;
				font-size: 12px;
			}
			.sell {
				color: #666666;
				font-size: 12px;
			}
		}
		.line {
			width: 264px;
			height: 1px;
			background-color: #DEDEDE;
			margin: 6px 0 10px 0;
		}
		.rec-bottom {
			display: flex;
			justify-content: flex-end;
			span {
				width: 80px;
				height: 33px;
				border: 1px solid #999999;
				border-radius: 17px;
				line-height: 33px;
				text-align: center;
				color: #666666;
				font-size: 14px;
				display: block;
				margin-right: 12px;
				&:nth-last-child(1) {
					margin-right: 0;
					background-color: #ff7d28;
					border: 1px solid #ff7d28;
					color: #fff;
				}
			}
		}
	}
</style>