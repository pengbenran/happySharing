<template>
	<div>
		<div class="myselfcash">
			<span>可提佣金   (元)</span>
			<span>{{distribInfo.balance}}</span>
			<span>我要提取  ¥  <input v-model="inp" :input="changeCss()"  type="digit" class="inp" placeholder="请输入提取金额" placeholder-style="color:#999999;font-size: 14px;"/> 元</span>
			<span>提取的佣金将会以红包的形式发送到公众号，记得查看哦</span>
			<span class="tip">{{tip}}</span>
			<button :class="{btnon:isOn}" :disbaled='isSubmit' class="btn" @click="submit">提现</button>
		</div>
	</div>
</template>
<script>
	import store from '@/store/store'
	import Api from '@/api/distribe'
	import util from '@/utils/index'
	export default { 
		data() {
			return {
				isOn: false,
				inp: "",
				tip:'',
				isSubmit:false,
				userInfo:{},
				distribInfo:{}
			};
		},
		methods: {
			changeCss() {
				let that=this
				if(that.inp==''){
					that.isOn=false
				}
				else if(that.inp>that.distribInfo.balance){
					that.isOn=false
					that.tip="余额不足"
				}
				else if(that.inp<1||that.inp>200){
					that.isOn=false
					that.tip="红包提现范围为1~200元之间"
				}
				else{
					that.isOn=true
					that.tip=""
				}

				//判断用户输入的是否为数字s
			},
			async submit(){
				let that=this
				if(!that.isSubmit&&that.isOn){
					wx.showLoading({
						title: '请稍等',
					})
					that.isSubmit=true
					that.isOn=false
					let params={}
					params.distributorId=that.distribInfo.distributorId;
					params.money=that.inp;
					let widthdrawRes=await Api.withdrawal(params)
					that.isSubmit=false
					that.isOn=false
					if(widthdrawRes.code==0){
						wx.hideLoading()
						wx.showToast({
							title:'提现成功',
							duration:1500
						})
						that.userInfo.balance=util.accSub(that.distribInfo.balance,that.inp)
						store.commit("storeUserInfo",that.userInfo)
						wx.navigateTo({ url:'../myself-detail/main'});
					}
					else if(widthdrawRes.code==500){
						wx.hideLoading()
						wx.showToast({
							title:'平台余额不足,请联系客服',
							duration:1500,
							icon:'none'
						})
					}
					
				}
				
			}

		},
		mounted(){
		  let that=this
		  that.userInfo=store.state.userInfo
		  if(that.userInfo.distributorStatus==1){
		  	that.distribInfo=store.state.distribInfo
		  }
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
		.tip{
			color:red;
			height: 40px;
			line-height:40px;
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