<template>
	<div class="container">		
		<div class="myself">
			<!--头像-->
			<div class="myself-head">
				<div class="img"><img :src="head.img" /></div>
				<div class="cant">
					<span>{{head.name}}</span>
					<span>ID : {{head.id}}</span>
				</div>
				<div class="service">
					<span class="iconfont">&#xe61a;</span>
					<span>客服</span>
				</div>
			</div>
			<!--会员 推荐师-->
			<div class="member-recommended">
				<div class="xian"></div>
				<navigator url="../../pages/myself-grade/main" hover-class="none">
					<div class="wrap-on">
						<div class="wrap">

							<!--会员-->
							<div class="member">
								<div class="top">初级会员</div>
								<div class="bottom">
									<div><span>100</span><span>累计积分</span></div>
									<div><span>100</span><span>可用积分</span></div>
								</div>
							</div>
							<!--已开通推荐师-->
							<div class="recommended" v-if="isRe1">
								<div class="top">金牌推荐师</div>
								<div class="bottom">
									<div><span>100</span><span>累计佣金</span></div>
									<div><span>100</span><span>可用佣金</span></div>
								</div>
							</div>
							<!--未开通推荐师-->
							<div class="recommended" v-if="isRe2">
								<div class="top">金牌推荐师</div>
								<div class="bottom1">
									<navigator class="hear" url="../../pages/myself-team/main" hover-class="navigator-hover">
									<span>开通</span>
									</navigator> 
									<span>了解</span>
								</div>
							</div>
							
						</div>
					</div>
				</navigator>
			</div>

			<div class="list">
				<div class="list-cant" v-for="(item,index) in list">
					<navigator :url="item.ourl" class="list-li" hover-class="navigator-hover">
						<div class="name">{{item.name}}</div>
						<div class="iconfont" style="color: #666666;">&#xe65c;</div>
					</navigator>
				</div>

			</div>
		</div>
	</div>
</template>
<script>
	import store from '@/store/store'
	export default {
		data() {
			return {
				isRe1:false,
				isRe2:true,
				list: [{
						name: "我的预约",
						ourl: "../../pages/myself-grade/main"
					},
					{
						name: "我的团队",
						ourl: "../../pages/myself-team/main"
					},
					{
						name: "推荐邀请",
						ourl: "../../pages/myself-team/main"
					},
					{
						name: "个人资料",
						ourl: "../../pages/myself-data/main"
					},
				],
				head: {
					name: "bobo",
					id: "12345",
					img: "/static/images/head.png"
				},

			userInfo:{},
         
			}
		},
		components: {

		},

		methods: {

		},
		mounted() {
			let that=this
			that.userInfo=store.state.userInfo
		},
	}
</script>

<style lang="less">

	
	.myself {
		/*头部*/
		.myself-head {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 295px;
			padding: 20px 0 40px 0;
			margin: 0 auto;
			.img {
				width: 58px;
				height: 58px;
				border-radius: 50%;
				overflow: hidden;
			}
			.cant {
				margin-right: 120px;
				span {
					display: block;
					&:nth-child(1) {
						color: #111111;
						font-size: 18px;
						font-weight: bold;
					}
					&:nth-child(2) {
						color: #999999;
						font-size: 13px;
					}
				}
			}
			.service {
				span {
					display: block;
					text-align: center;
					&:nth-child(1) {}
					&:nth-child(2) {
						font-size: 12px;
						color: #999999;
					}
				}
			}
		}
		/*会员 推荐师*/
		.member-recommended {
			position: relative;
			.xian {
				width: 1px;
				height: 50px;
				position: absolute;
				left: 50%;
				top: 50%;
				z-index: 99;
				background-color: rgba(255, 255, 255, .4);
				margin-top: -25px;
			}
			width: 100%;
			padding: 0 12px;
			border-radius: 3px;
			box-sizing: border-box;
			.wrap-on {
				width: 280px;
				height: 156px;
				position: relative;
				background-color: #0A81F9;
				margin: 0 auto;
				box-shadow: 0px 5px 15px rgba(73, 161, 250, .7);
				.wrap {
					width: 350px;
					height: 156px;
					position: absolute;
					background: linear-gradient(#047df9, #4aa2fa);
					left: 50%;
					margin-left: -175px;
					border-radius: 6px;
					display: flex;
					/*会员*/
					/*推荐师*/
					.member,
					.recommended {
						width: 50%;
						.top {
							text-align: center;
							padding-top: 18px;
							color: #ffffff;
							font-size: 15px;
						}
						.bottom {
							display: flex;
							padding-top: 60px;
							padding: 60px 15px 0 15px;
							div {
								width: 50%;
								text-align: center;
								span {
									display: block;
									&:nth-child(1) {
										color: #ffffff;
										font-size: 18px;
									}
									&:nth-child(2) {
										color: #FFFFFF;
										font-size: 12px;
									}
								}
							}
						}
						/*未开通*/
						.bottom1{
							display: flex;
							padding-top: 72px;
							.hear{	
								margin-right:4px; 
								margin-left: 25px;
								background: #fff;								
								}
								.navigator-hover{background-color: #057EF9;}							
							span{
								display: block;
								width: 60px;
								height: 25px;
								border: 1px solid #fff;
								line-height: 25px;
								font-size: 14px;
								text-align:center;
								border-radius: 3px;							
								&:nth-child(1){																		
									color: #057ef9;									
								}
								&:nth-child(2){							
									color: #fff;								
								}
							}
							
						}
					}
				 
				}
			}
		}
		/*下面列表*/
		.list {
			padding-bottom: 100px;
			.list-cant {
				width: 100%;		
				height: 50px;
			    margin-top: 20px;
				 line-height: 50px;
				 &:nth-child(1){
				 	margin-top: 50px;
				 }
				.list-li {				  
					width: 100%;
					padding: 0 30px;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;					
					.name {
						font-size: 15px;
						color: #111111;
						&:before {
							font-family: 'iconfont';
							margin-right: 8px;
							font-size: 25px;
							color: #111111;
							font-weight: bold;
							vertical-align: middle;
						}
					}
					&:nth-child(1) {
						.name {
							&:before {
								content: "\e610";
							}
						}
					}
					&:nth-child(2) {
						.name {
							&:before {
								content: "\e624";
							}
						}
					}
					&:nth-child(3) {
						.name {
							&:before {
								content: "\e7dd";
							}
						} 
					}
					&:nth-child(4) {
						.name {
							&:before {
								content: "\e609";
							}
						}
					}
				}
			}
		}
	}
</style>