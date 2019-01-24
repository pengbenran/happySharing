<template>
	<div class="container">
		<div class="container-wrap">
			<div class="cant">
				<!--会员等级-->
				<div class="membershipLevel">
					<span>会员等级</span>
					<span>等级规则</span>
				</div>
				<!--进度条-->
				<div class="progress">
					<div class="num clr">
						<span class="fl">0</span>
						<span class="fr">300</span>
					</div>
					<progress class="pro" percent="30" active backgroundColor='#fff0e5' activeColor='#ff7d28' stroke-width='12px' border-radius='12px' show-info='font-size: 50px' />
					<div class="rank clr">
						<span class="fl">初级</span>
						<span class="fr">中级</span>
					</div>
				</div>
				<!--积分-->
				<div class="integrals">
					<div class="integral">
						<div class="integral-left">
							<span>累计积分</span>
							<span>100</span>
						</div>
					</div>
					<div class="integral">
						<div class="integral-left">
							<span>可用积分</span>
							<span>100</span>
						</div>
					</div>
				</div>
			</div>

			<!--推荐师等级-->
			<div class="recommenderRank">
				<div class="title">推荐师等级</div>
				<div class="recommenderImg">
					<div class="img"><img src="/static/images/single-dog.png" /></div>
					<span class="tex">你还没有开通推荐师身份</span>
				</div>
				<div class="recommenderTits">
					<div class="recommenderTit">
						<span><img src="/static/images/yin.png" /></span>
						<span>推荐师</span>
						<span>尊享丰厚佣金奖励、商品购买优惠特权</span>
					</div>
					<div class="btn">
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
</template>

<script>
	export default {
		data() {
			return {

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
	.container {
		width: 100%;
		background-color: #f9f9f9;
		.container-wrap {
			.cant {
				background-color: #fff;
				padding-left: 12px;
				padding-right: 12px;
				/*会员等级*/
				.membershipLevel {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 32px 0 40px 0;
					span {
						display: block;
						&:nth-child(1) {
							font-size: 18px;
							color: #111111;
							font-weight: bold;
						}
						&:nth-child(2) {
							font-size: 14px;
							color: #fe8332;
							border-bottom: 1px solid #FE8332;
						}
					}
				}
				/*进度条*/
				.progress {
					.num {
						padding-right: 53px;
						span {
							font-size: 15px;
							&:nth-child(1) {
								color: #ff7d28;
							}
							&:nth-child(2) {
								color: #666666;
							}
						}
					}
					.rank {
						padding-right: 53px;
						span {
							font-size: 15px;
							&:nth-child(1) {
								color: #ff7d28;
							}
							&:nth-child(2) {
								color: #666666;
							}
						}
					}
				}
				/*积分*/
				.integrals {
					padding: 20px 0;
					display: flex;
					justify-content: space-between;
					width: 233px;
					margin: 0 auto;
					.integral {
						.integral-left {
							span {
								display: block;
								text-align: center;
								&:nth-child(1) {
									font-size: 12px;
									color: #999999;
								}
								&:nth-child(2) {
									font-size: 16px;
									color: #111111;
									font-family: "roboto";
								}
							}
						}
					}
				}
			}
			/*推荐师等级*/
			.recommenderRank {
				margin-top: 6px;
				padding: 20px 12px;
				background-color: #fff;
				.title {
					font-size: 18px;
					color: #111111;
					font-weight: bold;
				}
				.recommenderImg {
					border-bottom: 1px solid #DEDEDE;
					padding-bottom: 20px;
					.img {
						width: 65px;
						height: 80px;
						margin: 0 auto;
						padding: 11px 0 15px 0;
					}
				}
				.tex {
					font-size: 13px;
					text-align: center;
					font-weight: bold;
					color: #111111;
					display: block;
				}
			}
			.recommenderTits {
				.recommenderTit {
					text-align: center;
					padding-top: 20px;
					span {
						display: inline-block;
						&:nth-child(1) {
							width: 15px;
							height: 25px;
							vertical-align: middle;
							margin-right: 9px;
						}
						&:nth-child(2) {
							color: #111111;
							font-weight: bold;
							font-size: 13px;
						}
						&:nth-child(3) {
							font-size: 13px;
							color: #666666;
							display: block;
							padding: 12px 0 17px 0;
						}
					}
				}
				.btn {
					display: flex;
					justify-content: center;
					.hear {
						border-radius: 3px;
						width: 60px;
						height: 25px;
						line-height: 25px;
						border: 1px solid #007bf9;
						text-align: center;
						font-size: 14px;
						&:nth-child(1) {
							margin-right: 4px;
							margin-left: 25px;
							background: #007bf9;
							span {
								color: #fff;
							}
						}
						&:nth-child(2) {
							span {
								color: #007bf9;
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
</style>