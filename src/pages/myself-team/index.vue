<template>
	<div>
		<!--头部-->
		<div class="teams">
			<div class="img"><img src="/static/images/head.png" /></div>
			<div class="inp"><span class="iconfont">&#xe60b;</span><span>查找队友</span></div>
			<div class="jia">＋</div>
		</div>
		<!--切换-->
		<div class="switchs">
			<div class="switchs-li" v-for="item in switchs">
				<span @click="tab(index)" :class="index===curr?'on':''">{{item.tab}}</span>
			</div>
		</div>
		<!--会员队友-->
		<div class="tamemate" v-if="isO">
			<div class="tamemate-li">
				<div class="tamemate-tit clr" @click="show">
					<span :class=" isIocn?'icon':''" class="iconfont fl">&#xe65c;</span>
					<span class="iconfont fl">&#xeb2b;</span>
					<span class="fl">全部会员</span>
					<span class="fr">{{num1+num2+num3}}人</span>
				</div>
				<div class="data" v-if="isLi">
					<div v-for="(item,index) in quan">
						<div class="data-li clr" v-for="(item1,index1) in item">
							<div class="img fl"><img :src="item1.img" /></div>
							<div class="name fl">
								<span>{{item1.name}}</span>
								<span>消费金额： {{item1.numbe}}</span>
							</div>
							<div class="day fr">{{item1.day}}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="tamemate-li">
				<div class="tamemate-tit clr" @click="show1">
					<span :class=" isIocn1?'icon':''" class="iconfont fl">&#xe65c;</span>
					<span class="iconfont fl">&#xe608;</span>
					<span class="fl">高级会员</span>
					<span class="fr">{{num1}}人</span>
				</div>
				<div class="data" v-if="isLi1">
					<div class="data-li clr" v-for="(item,index) in quan.gao">
						<div class="img fl"><img :src="item.img" /></div>
						<div class="name fl">
							<span>{{item.name}}</span>
							<span>消费金额：{{item.numbe}}</span>
						</div>
						<div class="day fr">{{item.day}}</div>
					</div>
				</div>
			</div>
			<div class="tamemate-li">
				<div class="tamemate-tit clr" @click="show2">
					<span :class=" isIocn2?'icon':''" class="iconfont fl">&#xe65c;</span>
					<span class="iconfont fl">&#xe608;</span>
					<span class="fl">中级会员</span>
					<span class="fr">{{num2}}人</span>
				</div>
				<div class="data" v-if="isLi2">
					<div class="data-li clr" v-for="(item,index) in quan.zhong">
						<div class="img fl"><img :src="item.img" /></div>
						<div class="name fl">
							<span>{{item.name}}</span>
							<span>消费金额:{{item.numbe}}</span>
						</div>

						<div class="day fr">{{item.day}}</div>
					</div>
				</div>
			</div>
			<div class="tamemate-li">
				<div class="tamemate-tit clr" @click="show3">
					<span :class=" isIocn3?'icon':''" class="iconfont fl">&#xe65c;</span>
					<span class="iconfont fl">&#xe608;</span>
					<span class="fl">初级会员</span>
					<span class="fr">{{num3}}人</span>
				</div>
				<div class="data" v-if="isLi3">
					<div class="data-li clr" v-for="(item,index) in quan.chu">
						<div class="img fl"><img :src="item.img" /></div>
						<div class="name fl">
							<span>{{item.name}}</span>
							<span>消费金额：{{item.numbe}} </span>
						</div>
						<div class="day fr">{{item.day}}</div>
					</div>
				</div>
			</div>
		</div>
		<!--推荐师队友-->
		<div class="tamemate" v-if="isR">
			<div class="tamemate-li">
				<div class="tamemate-tit clr" @click="show">
					<span :class="isIocn?'icon':''" class="iconfont fl">&#xe65c;</span>
					<span style="color: #2bc24b;" class="iconfont fl">&#xeb2b;</span>
					<span class="fl">全部推荐师</span>
					<span class="fr">{{num1+num2+num3}}人</span>
				</div>
				<div class="data" v-if="isLi">
					<div v-for="(item,index) in quan">
						<div class="data-li clr" v-for="(item1,index1) in item">
							<div class="img fl"><img :src="item1.img" /></div>
							<div class="name fl">
								<span>{{item1.name}}</span>
								<span>消费金额： {{item1.numbe}}</span>
							</div>
							<div class="day fr">{{item1.day}}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="tamemate-li">
				<div class="tamemate-tit clr" @click="show1">
					<span :class=" isIocn1?'icon':''" class="iconfont fl">&#xe65c;</span>
					<span class="iconfont fl">&#xe608;</span>
					<span class="fl">高级推荐师</span>
					<span class="fr">{{num1}}人</span>
				</div>
				<div class="data" v-if="isLi1">
					<div class="data-li clr" v-for="(item,index) in quan.gao">
						<div class="img fl"><img :src="item.img" /></div>
						<div class="name fl">
							<span>{{item.name}}</span>
							<span>消费金额：{{item.numbe}}</span>
						</div>
						<div class="day fr">{{item.day}}</div>
					</div>
				</div>
			</div>
			<div class="tamemate-li">
				<div class="tamemate-tit clr" @click="show2">
					<span :class=" isIocn2?'icon':''" class="iconfont fl">&#xe65c;</span>
					<span class="iconfont fl">&#xe608;</span>
					<span class="fl">中级推荐师</span>
					<span class="fr">{{num2}}人</span>
				</div>
				<div class="data" v-if="isLi2">
					<div class="data-li clr" v-for="(item,index) in quan.zhong">
						<div class="img fl"><img :src="item.img" /></div>
						<div class="name fl">
							<span>{{item.name}}</span>
							<span>消费金额:{{item.numbe}}</span>
						</div>

						<div class="day fr">{{item.day}}</div>
					</div>
				</div>
			</div>
			<div class="tamemate-li">
				<div class="tamemate-tit clr" @click="show3">
					<span :class=" isIocn3?'icon':''" class="iconfont fl">&#xe65c;</span>
					<span class="iconfont fl">&#xe608;</span>
					<span class="fl">初级推荐师</span>
					<span class="fr">{{num3}}人</span>
				</div>
				<div class="data" v-if="isLi3">
					<div class="data-li clr" v-for="(item,index) in quan.chu">
						<div class="img fl"><img :src="item.img" /></div>
						<div class="name fl">
							<span>{{item.name}}</span>
							<span>消费金额：{{item.numbe}} </span>
						</div>
						<div class="day fr">{{item.day}}</div>
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
				isIocn: false,
				isIocn1: false,
				isIocn2: false,
				isIocn3: false,
				isLi: false,
				isLi1: false,
				isLi2: false,
				isLi3: false,
				isO: true,
				isR: false,
				curr: 0,
				aaa: [],
				switchs: [{
						tab: "会员队友"
					},
					{
						tab: "推荐师队友"
					}
				],
				quan: {
					gao: [{
							img: "/static/images/head.png",
							name: "aaaaa",
							numbe: "3000",
							day: "12月15-2018"
						},
						{
							img: "/static/images/head.png",
							name: "bbbbb",
							numbe: "3000",
							day: "12月15-2018"
						},
						{
							img: "/static/images/head.png",
							name: "ccccc",
							numbe: "3000",
							day: "12月15-2018"
						}
					],
					zhong: [{
							img: "/static/images/head.png",
							name: "ddddd",
							numbe: "3000",
							day: "12月15-2018"
						},
						{
							img: "/static/images/head.png",
							name: "eeeeee",
							numbe: "3000",
							day: "12月15-2018"
						},
						{
							img: "/static/images/head.png",
							name: "fffff",
							numbe: "3000",
							day: "12月15-2018"
						},
					],
					chu: [{
							img: "/static/images/head.png",
							name: "gggggg",
							numbe: "3000",
							day: "12月15-2018"
						},
						{
							img: "/static/images/head.png",
							name: "hhhhhh",
							numbe: "3000",
							day: "12月15-2018"

						},
						{
							img: "/static/images/head.png",
							name: "iiiiii",
							numbe: "3000",
							day: "12月15-2018"
						},
					],
				}
			};
		},
		methods: {
			tab(index) {
				this.curr = index
				if(index == 0) {
					this.isO = true;
					this.isR = false;
				}
				if(index == 1) {
					this.isO = false;
					this.isR = true;
				}
			},
			//点击显示
			show(index) {
				this.isLi = !this.isLi
				this.isIocn = !this.isIocn
			},
			show1() {
				this.isLi1 = !this.isLi1
				this.isIocn1 = !this.isIocn1
			},
			show2() {
				this.isLi2 = !this.isLi2
				this.isIocn2 = !this.isIocn2
			},
			show3() {
				this.isLi3 = !this.isLi3
				this.isIocn3 = !this.isIocn3
			},

		},
		computed: {
			num1() {
				var num = this.quan.gao.length
				return num
			},
			num2() {
				var num = this.quan.zhong.length
				return num
			},
			num3() {
				var num = this.quan.chu.length
				return num
			}
		}
	};
</script>
<style lang="less">
	/*头部*/
	
	.teams {
		background-color: #32a1ff;
		display: flex;
		box-sizing: border-box;
		align-items: center;
		padding: 23px 0 23px 12px;
		.img {
			width: 44px;
			height: 44px;
			overflow: hidden;
			border-radius: 50%;
			img {
				display: block;
			}
		}
		.inp {
			width: 250px;
			height: 33px;
			text-align: center;
			line-height: 33px;
			background-color: #0088ff;
			border-radius: 3px;
			color: #FFFFFF;
			font-size: 12px;
			margin-left: 12px;
			span {
				color: #fefefe;
				&:nth-child(1) {
					font-size: 20px;
				}
			}
		}
		.jia {
			font-size: 22px;
			color: #FFFFFF;
			margin-left: 19px;
			margin-bottom: 1px;
		}
	}
	/*切换*/
	
	.switchs {
		width: 100%;
		display: flex;
		border-bottom: 1px solid #DEDEDE;
		justify-content: space-between;
		.switchs-li {
			span {
				display: block;
				color: #666666;
				font-size: 14px;
				height: 47px;
				line-height: 47px;
			}
			&:nth-child(1) {
				span {
					margin-left: 65px;
				}
			}
			&:nth-child(2) {
				span {
					margin-right: 65px;
				}
			}
			.on {
				color: #32a1ff;
				border-bottom: 2px solid #32a1ff;
			}
		}
	}
	/*会员*/
	
	.tamemate {
		.tamemate-li {
			.tamemate-tit {
				width: 100%;
				height: 54px;
				padding: 0 20px 0 12px;
				box-sizing: border-box;
				line-height: 54px;
				span {
					display: block;
					&:nth-child(1) {
						color: #666666;
					}
					&:nth-child(2) {
						font-size: 30px;
						margin-left: 8px;
					}
					&:nth-child(3) {
						color: #111111;
						font-size: 14px;
						margin-left: 6px;
					}
					&:nth-child(4) {
						color: #999999;
						font-size: 12px;
					}
				}
				.icon {
					transform: rotate(90deg);
				}
			}
			&:nth-child(1) {
				.tamemate-tit {
					span {
						&:nth-child(2) {
							color: #0a81f9;
						}
					}
				}
			}
			&:nth-child(2) {
				.tamemate-tit {
					span {
						&:nth-child(2) {
							color: #ffa800;
						}
					}
				}
			}
			&:nth-child(3) {
				.tamemate-tit {
					span {
						&:nth-child(2) {
							color: #2b92fa;
						}
					}
				}
			}
			&:nth-child(4) {
				.tamemate-tit {
					span {
						&:nth-child(2) {
							color: #ff5959;
						}
					}
				}
			}
			.data {
				padding: 0px 20px 0px 12px;
				box-sizing: border-box;
							
				.data-li{
					padding: 12px 0;
					border-bottom: 1px solid #DEDEDE;
					
					.img {
						width: 44px;
						height: 44px;
						border-radius: 50%;
						overflow: hidden;
					}
					.name {
						margin-left: 11px;
						span {
							display: block;
							&:nth-child(1){
								color: #111111;
								font-size: 16px;
							}
							&:nth-child(2){
								color: #999999;
								font-size: 12px;
							}
						}
					}
					.day {
						color: #999999;
						font-size: 11px;
						line-height: 44px
						;
					}
				}
			}
		}
	}
</style>