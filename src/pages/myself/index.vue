<template>
	<div class="container">
		<div class="myself">
			<!--头像-->
			<div class="myself-head">
				<div class="img"><img :src="userInfo.face" /></div>
				<div class="cant">
					<span>{{userInfo.name}}</span>
					<span>ID : {{userInfo.memberId}}</span>
				</div>
				<div class="service">
					<button  open-type="contact" session-from="weapp">
					<span class="iconfont">&#xe61a;</span>
					<span>客服</span>
					</button>
				</div>
			</div>

			<!--会员 推荐师-->
			<div class="member-recommended">
				<div class="xian"></div>
					<div class="wrap-on">
						<div class="wrap">
							<!--会员-->
							<div class="member">
								<div class="top">{{userInfo.lvName}}</div>
								<div class="bottom">
									<div><span>{{totalPoint}}</span><span>累计积分</span></div>
									<div><span>{{point}}</span><span>可用积分</span></div>
								</div>
							</div>
							<!--已开通推荐师-->
							<div class="recommended" v-if="userInfo.distributorStatus==1">
								<div class="top">{{distribInfo.lvName}}</div>
								<div class="bottom" @click="jumpUrl('../myself-detail/main')">
									<div><span>{{total}}</span><span>累计佣金</span></div>
									<div><span>{{balance}}</span><span>可用佣金</span></div>
								</div>
							</div>
							<!--未开通推荐师-->
							<div class="recommended" v-else>
								<div class="top">开通推荐师</div>
								<div class="bottom1">
									<navigator class="hear" url="../myself-dredge/main" hover-class="navigator-hover">
										<span>开通</span>
									</navigator>
									<navigator class="hear" url="../myself-dredge/main" hover-class="navigator-hover">
										<span>了解</span>
									</navigator>
							</div>
						</div>

					</div>
				</div>
			</div>
			<!--下面列表-->
			<div class="list">
				<div class="list-cant" v-for="(item,index) in list">
					<div class="list-li" @click="jumpUrl(item.ourl)">
						<div class="name">{{item.name}}</div>
						<div class="iconfont" style="color: #666666;">&#xe65c;</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import distribeApi from '@/api/distribe'
import store from '@/store/store'
import utils from '@/utils/index'
	export default {
		data() {
			return {
				list: [
				{
					name: "我的团队",
					ourl: "../myself-team/main"
				},
				{
					name: "推荐邀请",
					ourl: "../myself-make/main" 
				},
				{
					name: "我的特权",
					ourl: "../myself-detail/main"
				},
				],
				config:{},
				userInfo:{},
				canSubmit:true,
				distribInfo:{}
			}
		},
		components: {

		},
		computed:{
			totalPoint(){
				let that=this
				return utils.accAdd(store.state.userInfo.point,store.state.userInfo.consumePoint)
			},
			consumePoint(){
				let that=this
				return store.state.userInfo.consumePoint
			},
			point(){
				let that=this
				return store.state.userInfo.point
			},
			total(){
				let that=this
				if(store.state.userInfo.distributorStatus==1){
					return store.state.distribInfo.total
				}
				else{
					return 0
				}				
			},
			balance(){
				let that=this
				if(store.state.userInfo.distributorStatus==1){
					return store.state.distribInfo.balance
				}
				else{
					return 0
				}				
			}
		},
		methods: {
			async jumpUrl(url){
				let that=this
				if(url=='../myself-invite/main'){
					wx.navigateTo({ url:url});
				}
				else{
					if(that.userInfo.distributorStatus==2){
						wx.showToast({
							title:'该功能仅对推荐师开放',
							icon:"none",
							duration:1500
						})
					}
					else{
						wx.navigateTo({ url:url});
					}
				}
			}
		},
		onShow(){
			let that = this
			that.userInfo = store.state.userInfo
			if(that.userInfo.distributorStatus==1){
				that.distribInfo=store.state.distribInfo
			}
			that.config = store.state.config
		},
		onPullDownRefresh: function(){
			let that=this
   			util.updateUserInfo()	
   			wx.stopPullDownRefresh()
   			that.userInfo = store.state.userInfo
			that.config = store.state.config
   		},
	}
</script>

<style lang="less">
	/*跳转按下后样式*/
	
	.navigator-hover {
		background-color: #e5f3ff;
	}
	
	.myself {
		/*头部*/
		.myself-head {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			padding: 20px 30px 40px 30px;
			box-sizing: border-box;
			margin: 0 auto;
			.img {
				width: 58px;
				height: 58px;
				border-radius: 50%;
				overflow: hidden;
			}
			.cant {
				span {
					display: block;
					&:nth-child(1) {
						color: #111111;
						font-size: 18px;
						font-weight: bold;
						width:200px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					&:nth-child(2) {
						color: #999999;
						font-size: 13px;
					}
				}
			}
			.service {
				button{
					padding: 0;
					line-height: 1;
					background: #fff;
				}
				button::after {
			     	border: none;
				}
				span {
					display: block;
					text-align: center;
					margin-top: 2px;
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
			width: 100%;
			padding: 0 12px;
			border-radius: 3px;
			box-sizing: border-box;
			.member-recommended-href {
				position: absolute;
				top: 0;
				width:100%;
				height: 68%;
				z-index: 999;
			}
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
						.bottom1 {
							display: flex;
							padding-top: 72px;
							.hear {
								border-radius: 3px;
								width: 60px;
								height: 25px;
								line-height: 25px;
								border: 1px solid #fff;
								text-align: center;
								font-size: 14px;
								&:nth-child(1) {
									margin-right: 4px;
									margin-left: 25px;
									background: #fff;
									span {
										color: #057ef9;
									}
								}
								&:nth-child(2) {
									span {
										color: #fff;
									}
								}
							}
							.navigator-hover {
								background-color: #e5f3ff;
							}
						}
					}
				}
			}
		}
		/*下面列表*/
		.list {
			padding-bottom: 81px;
			.list-cant {
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
					.list-li {
						.name {
							&:before {
								content: "\e609";
								font-size: 20px;
								margin-left: 2px;
							}
						}
					}
				}
				width: 100%;
				height: 50px;
				margin-top: 20px;
				line-height: 50px;
				&:nth-child(1) {
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
				}
			}
		}
	}
</style>