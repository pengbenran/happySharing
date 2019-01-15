<template>
	<div class="kind centered">
		<div class="kindList" v-for="(item,index) in kind_item">
			<navigator url="../../pages/product-list/main">
				<div class="kindIntro">
					<div class="tipIcon">{{item.tipIcon}}</div>
					<div class="kindname oneover">{{item.kindname}}</div>
					<div class="kinddetail oneover">{{item.kindintro}}</div>
				</div>
				<div class="rightImg">
					<img :src="item.kindImg" mode="widthFix">
				</div>
			</navigator>
		</div>
	</div>

</template>
<script>
	export default {
		props: ['kind_item'],
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
	/*中间居中*/
	
	.centered {
		width: 95%;
		margin: 0 auto;
	}
	
	.kind {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.kindList {
			width: 175px;
			height: 72px;
			border-radius: 3px;
			margin-bottom: 5px;
			display: flex;
			justify-content: space-between;
			position: relative;
			overflow: hidden;
			.kindIntro {
				.tipIcon {
					width: 40px;
					height: 18px;
					line-height: 18px;
					font-size: 12px;
					color: #fff;
					border-bottom-right-radius: 3px;
					border-top-left-radius: 3px;
					text-align: center;
				}
				.kindname {
					font-size: 13px;
					color: #111111;
					width: 80px;
					overflow: hidden;
					margin-top: 5px;
					padding-left: 6px;
				}
				.kinddetail {
					font-size: 12px;
					color: #FE494D;
					margin-top: 5px;
					padding-left: 6px;
				}
			}
			.rightImg {
				width: 100px;
				height: 100px;
				border-radius: 50%;
				border: 1px solid #ddd;
				overflow: hidden;
				position: absolute;
				top: 30px;
				right: -10px;
			}
			&:nth-child(1) {
				background-color: #ffb2b5;
				.kindIntro {
					.tipIcon {
						background: linear-gradient(to right, #ff666b,#ff333a);
					}
				}
			}
			&:nth-child(2) {
				background-color: #ffcdb2;
				.kindIntro {
					.tipIcon {
					background: linear-gradient(to right, #ff9c66, #ff7e33 );
					}
				}
			}
			&:nth-child(3) {
				background-color: #ffb2f7;
				.kindIntro {
					.tipIcon {
					background: linear-gradient(to right, #ff66f0, #ff33eb);
					}
				}
			}
			&:nth-child(4) {
				background-color: #b2d0ff;
				.kindIntro {
					.tipIcon {
					background: linear-gradient(to right, #659fff , #32a1ff);
					}
				}
			}
		}
	}
</style>