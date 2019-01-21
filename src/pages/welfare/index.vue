<template>
	<div>
		<!--背景图-->
		<div class="dial">
			<div class="img"><img src="https://shop.guqinet.com/html/images/zhifenxiang/dial-bg.png" /></div>
			<!--转盘-->
			<div id="rotary-table">
				<div class="award" v-for="(item,index) in awards" :class="['award'+index,{'active': index==current}]">
					<div><span>x</span><span>{{item.name}}</span></div>
				</div>
				<div id="start-btn" @click="start">开始</div>

				<div class="popup">
					<!--中奖数字-->
					<div class="popup-left">
						<span>{{award.name}}100</span>
					</div>
					<!--可用积分-->
					<div class="popup-right">
						<spna>{{sum}}100</spna>
					</div>
				</div>

				<!--下面的确认按钮-->
				<div class="confirm">
					<img src="https://shop.guqinet.com/html/images/zhifenxiang/confirm.png" />
				</div>
			</div>
			<!--列表-->
			<div class="list">
				<div class="list-wp">

				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'raffle',
		data() {
			return {
				current: 0,
				awards: [{
						id: 1,
						name: 6
					},
					{
						id: 2,
						name: 50
					},
					{
						id: 3,
						name: 5
					},
					{
						id: 4,
						name: "谢谢参与"

					},
					{
						id: 5,
						name: 20
					},
					{
						id: 6,
						name: 15

					},
					{
						id: 7,
						name: 40
					},
					{
						id: 8,
						name: 5,

					}
				],
				speed: 200,
				diff: 15,
				award: {},
				time: 0,
				timeout: '',
				iss: false,

			};
		},
		methods: {
			start() {
				// 开始抽奖
				this.drawAward()
				this.time = Date.now();
				this.speed = 200;
				this.diff = 15;
			},
			drawAward() {
				// 请求接口, 这里我就模拟请求后的数据
				setTimeout(() => {
					this.award = {
						id: '3',
						name: 5,
					};
				}, 1000);
				this.move();
			},
			move() {

				let that = this;
				that.timeout = setTimeout(() => {
					this.current++;
					if(this.current > 7) {
						this.current = 0;
					}
					if(this.award.id && (Date.now() - this.time) / 1000 > 2) {
						this.speed += this.diff;
						if((Date.now() - this.time) / 1000 > 4 && this.award.id == this.awards[this.current].id) {
							clearTimeout(that.timeout);
							setTimeout(() => {
								//								this.iss = true								
							}, 0);
							return;
						}
					} else {
						this.speed -= this.diff;
					}
					console.log(this.speed);
					this.move();
				}, this.speed);
			}
		}
	};
</script>

<style rel="stylesheet/less" lang="less">
	.dial {
		position: relative;
		.img {
			width: 100%;
			height: 624px;
		}
		#rotary-table {
			width: 340px;
			height: 349px;
			position: absolute;
			margin: auto;
			left: 20px;
			top: 84px;
			.award {
				width: 90px;
				height: 96px;
				float: left;
				position: absolute;
				overflow: hidden;
				div {
					position: absolute;
					top: 4px;
					right: 8px;
					font-size: 18px;
					font-weight: bold;
					span {
						color: #ffffff;
					}
				}
				&.active {
					width: 90px;
					height: 96px;
					background-color: rgba(255, 255, 255, 0.2);
					box-shadow: 0 0 10px 6px #fff;
					border-radius: 6px;
					border: 1px solid #fff;
				}
				&.award0 {
					top: 18px;
					left: 16.5px;
					text-shadow: 0px 0px 5px #b20000;
				}
				&.award1 {
					top: 18px;
					left: 122.5px;
					text-shadow: 0px 0px 5px #e56721;
				}
				&.award2 {
					top: 18px;
					right: 22px;
					text-shadow: 0px 0px 5px #3875a1;
				}
				&.award3 {
					top: 124.5px;
					right: 22px;
					text-shadow: 0px 0px 5px #38e10d;
				}
				&.award4 {
					bottom: 22.5px;
					right: 22px;
					text-shadow: 0px 0px 5px #38e10d;
				}
				&.award5 {
					bottom: 22.5px;
					left: 122.5px;
					text-shadow: 0px 0px 5px #e56721;
				}
				&.award6 {
					bottom: 22.5px;
					left: 16.5px;
					text-shadow: 0px 0px 5px #3875a1;
				}
				&.award7 {
					top: 124.5px;
					left: 17px;
					text-shadow: 0px 0px 5px #38e10d;
				}
			}
			#start-btn {
				position: absolute;
				top: 124.5px;
				left: 122.5px;
				width: 90px;
				height: 96px;
				line-height: 90px;
				text-align: center;
			}
			.popup {
				display: flex;
				justify-content: space-between;
				position: relative;
				.popup-left,
				.popup-right {
					text-align: center;
					width: 126px;
					height: 45px;
					line-height: 45px;
					color: #ffffff;
					font-size: 22px;
				}
				.popup-left {
					position: absolute;
					left: 18px;
					top: -50px;
				}
				.popup-right {
					position: absolute;
					right: 23px;
					top: -50px;
				}
			}
			.confirm {
				width: 126px;
				height: 45px;
				position: absolute;
				bottom: -72px;
				left: 18px;
			}
		}
		/*产品列表*/
		.list {
			width: 100%;
			height: 156px;
			border-radius: 50%;
			background-color: #ffb833;
			position: absolute;
			bottom: -78px;
			.list-wp {
				position: relative;
				width: 100%;
				background-color: #ffb833;
				height: 100px;
				bottom: -78px;
			}
		}
	}
</style>