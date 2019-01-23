<template>
	<div>
		<div class="myselfcash">
			<span>可提佣金   (元)</span>
			<span>{{userInfo.balance}}</span>
			<span>我要提取  ¥  <input v-model="inp" v-on:input="changeCss(val)"  type="number" class="inp" placeholder="请输入提取金额" placeholder-style="color:#999999;font-size: 14px;"/> 元</span>
			<span>提取的佣金将存入您的微信钱包当中，记得查看哦</span>
			<div :class="{btnon:isOn}" class="btn">提现</div>
		</div>
	</div>
</template>
<script>
	import store from '@/store/store'
	export default { 
		data() {
			return {
				isOn: false,
				inp: "",
				userInfo:{}
			};
		},
		methods: {
			changeCss() {
				if(this.inp == "") {
					this.isOn = false
				} else {
					this.isOn = true
				}
				//判断用户输入的是否为数字
				var regNum = new RegExp('[0-9]', 'g');
				console.log(regNum)
			},
		},
		mounted(){
		  let that=this
		  that.userInfo = store.state.userInfo
		},
		computed: {

		}
	};
</script>

<style scoped lang="less">
	.myselfcash {
		width: 100%;
		span {
			text-align: center;
			display: block;
			&:nth-child(1) {
				font-size: 15px;
				color: #111111;
				padding-top: 35px;
			}
			&:nth-child(2) {
				font-size: 33px;
				color: #32A1FF;
				font-family: "roboto";
				padding: 12px 0 53px 0;
			}
			&:nth-child(3) {
				font-size: 18px;
				color: #111111;
				font-weight: bold;
				.inp {
					border-bottom: 1px solid #DEDEDE;
					color: #111111;
					width: 165px;
					display: inline-block;
					vertical-align: bottom;
					text-align: left;
					padding-left: 20px;
					font-size: "roboto";
				}
			}
			&:nth-child(4) {
				padding: 20px 0 30px 0;
				font-size: 12px;
				color: #999999;
			}
		}
		.btn {
			width: 80px;
			height: 33px;
			background-color: #999999;
			color: #fff;
			font-size: 14px;
			border: 0;
			text-align: center;
			line-height: 33px;
			border-radius: 3px;
			margin:  0 auto;
		}
		.btnon {
			background-color: #32a1ff;
		}
	}
</style>