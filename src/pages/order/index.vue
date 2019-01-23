<template>
	<!--类目-->
	<div class="container">
		<div class="order-nav">
			<div @click="change(index)" v-for="(item,index) in nav" class="order-nav-li" :class="item.isSelect? 'active':''">
				{{item.name}}
			</div>
		</div>
		
		<!--列表-->
		<div class="rec-wrap centered">
			<div class="rec-li" v-for="(goodlist , index) in rec" :key="goodlist.recId">
				<div class="top">
					<div>
						订单编号:{{goodlist.sn}}
					</div>
					<div>
						下单时间:2019-08-32
					</div>
				</div>
				<div class="center">
					<div class="cant clr">
						<div class="img fl"><img :src="goodlist.img" /></div>
						<div class="rec-center fl">
							<div class="tit">{{goodlist.title}}</div>
							<div class="name">{{goodlist.name}}</div>
							<div class="present ">￥:{{goodlist.price}}</div>
							<div class="time ">{{goodlist.time}}</div>
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
						订单总额:{{goodlist.orderAmount}}
					</div>
				</div>
				<div class="bottom">
					<span>删除订单</span>
				 	<span @click="orderDetail">订单详情</span>
				</div>
					
			</div>
		</div>
		
		<!--空空如也-->
		<!-- <div class="not" style="display: none;"><img src="/static/images/not.png"/></div> -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				nav: [{
						name: "全部",
						isSelect:true
					}, {
						name: "待付款",
						isSelect:false
					}, {
						name: "待使用",
						isSelect:false
					}, {
						name: "已使用",
						isSelect:false
					}],
				rec: [{
					sn: 1212121,
					img: "https://oss.etuetf.cn/advImage/2346c6c9-f227-4f7c-a801-62545f687818.jpg",
					payStatus:2,
					status:0,
					shipStatus:2,
					shopName: "世茂/金塔/新力/莲塘/四店通用",
					image: '',
					name: "西江月园林艺术餐厅，真正的艺术赣菜,快来抢购！",
					num: 1,
					price: "16.9",
					orderAmount: "83",
					num: "1"
				}, {
					sn: 1212121,
					img: "https://oss.etuetf.cn/advImage/2346c6c9-f227-4f7c-a801-62545f687818.jpg",
					payStatus:2,
					status:0,
					shipStatus:2,
					shopName: "世茂/金塔/新力/莲塘/四店通用",
					image: '',
					name: "西江月园林艺术餐厅，真正的艺术赣菜,快来抢购！",
					num: 1,
					price: "16.9",
					orderAmount: "83",
					num: "1"
				}, {
					sn: 1212121,
					img: "https://oss.etuetf.cn/advImage/2346c6c9-f227-4f7c-a801-62545f687818.jpg",
					payStatus:2,
					status:0,
					shipStatus:2,
					shopName: "世茂/金塔/新力/莲塘/四店通用",
					image: '',
					name: "西江月园林艺术餐厅，真正的艺术赣菜,快来抢购！",
					num: 1,
					price: "16.9",
					orderAmount: "83",
					num: "1"
				}, ]
			}
		},

		components: {

		},

		methods: {
			change(index) {
				let that=this
				that.nav.map(item=>{
					item.isSelect=false
					return item
				})
				that.nav[index].isSelect=true
				console.log(that.nav)
			},
			orderDetail(){
				
			}
		},

		created() { // 调用应用实例的方法获取全局数据
		}
	}
</script>

<style scoped lang="less">
/*空空如也*/
.not{
	width:133px ;
	height: 181px;
	position: absolute;
	left: 50%;
	top: 112px;
	margin-left: -65px;
}



	/*导航*/
	.order-nav {
		position: fixed;
		top: 0;
		display: flex;
		justify-content: space-around;
		background-color: #fff;
		width: 100%;
		.order-nav-li {
			flex-grow:1;
			height: 38px;
			line-height: 38px;
			text-align: center;
			font-size: 14px;
			color: #111111;	
		}
		.active {
			border-bottom: 1px solid #ff7d28;
			color: #ff7d28;
		}
	}
	/*列表*/
	
	.rec-li {
		padding-bottom: 36px;
		&:nth-child(1) {
			margin-top: 56px;
		}
		.top{
			display: flex;
			justify-content: space-between;
			font-size: 15px;
			height: 30px;
			line-height:30px;
		}
		.center{
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
				color: #999999;
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
			font-size: 14px;
			text-align: right;
			height: 25px;
			line-height:25px;
			padding-right: 10px;
			box-sizing: border-box;
		}
	}
	.bottom{
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