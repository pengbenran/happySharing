<template>
	<div>
		<div class="heads">
			<div class="img"><img :src="heads.head" /></div>
			<div class="cant">
				<span>{{heads.name}}</span>
				<span>{{heads.member}}</span>
			</div>
			<div class="btn" @click="btn" v-if="compile=='编辑'">
				{{compile}}
			</div>
			<div class="btn" @click="btn1" v-if="compile=='完成'">
				{{compile}}
			</div>
		</div>

		<div class="mymessage">
			<div class="mymessage-li" v-for="(item,index) in mymessage">
				<span>{{item.attribute}}<i></i></span>
				<span>:</span>
				<input class="mymessage-value" :class="isOn===true?'on':''" type="text" v-model="item.value" :disabled="isDisabled" />
			</div>
		</div>

	</div>
</template>
<script>
	export default {

		data() {
			return {
				compile: "编辑",
				isOn: false,
				isDisabled: true,
				heads: {
					head: "/static/images/head.png",
					member: "高级会员",
					name: "bobo",
				},
				mymessage: [{
						attribute: "我 的 I D",
						value: "余文迎谈恋爱了"
					},
					{
						attribute: "消费金额",
						value: "余文迎谈恋爱了"
					},
					{
						attribute: "推荐人",
						value: "余文迎谈恋爱了"
					},
					{
						attribute: "推荐时间",
						value: "余文迎谈恋爱了"
					},
					{
						attribute: "性 别",
						value: "余文迎谈恋爱了"
					},
					{
						attribute: "职 业",
						value: "余文迎谈恋爱了"
					},
					{
						attribute: "微 信 号",
						value: "余文迎谈恋爱了"
					},
					{
						attribute: "QQ 号",
						value: "余文迎谈恋爱了"
					},
					{
						attribute: "电 话",
						value: "余文迎谈恋爱了"
					},
					{
						attribute: "地 区",
						value: "余文迎谈恋爱了"
					},
				],
			};
		},
		methods: {
			btn(index) {
				this.compile = "完成"
				this.isOn = true
				this.isDisabled = false
				

			},
			btn1() {
				this.compile = "编辑"
				this.isOn = false
				this.isDisabled = true
wx.showToast({

 title: '修改成功',

 icon: 'success',

 duration: 1500

})
			},
		},
		computed: {

		}
	}
</script>
<style lang="less">
	.heads {
		display: flex;
		align-items: center;
		padding: 20px 0 12px 20px;
		position: relative;
		width: 100%;
		background-color: #fff;
		margin-top: 50px;
		.img {
			width: 44px;
			height: 44px;
			border-radius: 50%;
			overflow: hidden;
		}
		.cant {
			display: flex;
			margin-left: 12px;
			line-height: 20px;
			span {
				display: block;
				&:nth-child(2) {
					font-size: 12px;
					color: #ffa800;
					margin-left: 12px;
				}
				&:nth-child(1) {
					font-size: 16px;
					color: #111111;
				}
			}
		}
	}
	
	.mymessage {
		padding: 0 12px;
		.mymessage-li {
			padding-top: 16px;
			border-top: 1px solid #DEDEDE;
			display: flex;
			align-items: flex-start;
			&:nth-last-child(1) {
				padding-bottom: 50px;
			}
			span {
				display: block;
				&:nth-child(1) {
					font-size: 15px;
					color: #111111;
					width: 60px;
					text-align: justify;
					i {
						display: inline-block;
						padding-left: 100%;
					}
				}
				&:nth-child(2) {
					font-size: 15px;
					color: #111111;
					margin-left: 3px;
				}
			}
			.mymessage-value {
				font-size: 14px;
				color: #111111;
				margin-left: 27px;
				width: 200px;
				position: relative;
				top: -4px;
			}
			.on {
				color: #666666;
			}
		}
	}
	
	.btn {
		color: #11111;
		font-size: 14px;
		width: 100%;
		background-color: #fff;
		padding: 8px 0;
		text-align: center;
		position: fixed;
		top: 0;
		right: 0;
		z-index: 9;
		line-height: 38px;
		border-bottom: 1px solid #DEDEDE;
	}
</style>