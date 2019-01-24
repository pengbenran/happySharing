<template>
	<div>
		<div class="myself-dredge" v-if="!isApply">
			<div class="dredge-banner">
				<img src="/static/images/dredge-banner.png" />
			</div>
			<!--注册类容-->
			<div class="cant">
				<div class="weixin">
					<span>微 信 号:</span>
					<span> <input @click="togg" class="inp" type="text" placeholder="请输入微信号" v-model='distribeInfo.name'/></span>
				</div>
				<div class="weixin">
					<span>手 机 号:</span>
					<span> <input @click="togg" class="inp" type="number" placeholder="请输入手机号" v-model='distribeInfo.mobile'/></span>
				</div>
				<div class="weixin">
					<span>真实姓名:</span>
					<span> <input @click="togg" class="inp" type="text" placeholder="请输入真实姓名" v-model='distribeInfo.uname'/></span>
				</div>
				<!--按钮·-->
			<button class="btn" :disabled='isSubmit' @click='distribeApply'>提交审核</button>
			</div>	
		</div>
		<div v-else>
			已经提交申请,
		</div>
	</div>
</template>
<script>
	import Api from "@/api/distribe";
	import store from '@/store/store'
	export default {
		data() {
			return {
				isSubmit:false,
				memberId:'',
				isApply:false,
				config:{},
				distribeInfo:{
					uname:'',
					name:'',
					mobile:'',
				}
			};
		},
		methods: {
			async distribeApply(){
				console.log(111111);
				let that=this
				if(that.distribeInfo.name==''){
					wx.showToast({
						title: '微信号不能为空',
						icon: 'none',
						duration: 1500
					})
				}
				else if(that.distribeInfo.mobile=='')
				{
					wx.showToast({
						title: '手机号不能为空',
						icon: 'none',
						duration: 1500
					})
				}
				else if(that.distribeInfo.uname==''){
					wx.showToast({
						title: '真实姓名不能为空',
						icon: 'none',
						duration: 1500
					})
				}
				else{
					wx.showLoading({
						title: '请稍等',
					})
					that.distribeInfo.tjunionid=store.state.userInfo.tjUnionid
					that.distribeInfo.type=store.state.config.auditWay
					that.distribeInfo.memberId=that.memberId
				    let submitApplyRes=	await Api.submitApply(JSON.stringify(that.distribeInfo))
				    if(submitApplyRes.code==0){
				    	wx.hideLoading()
				    	if(store.state.config.auditWay==2){
				    		wx.showToast({
				    			title: '申请提交成功',
				    			icon: 'success',
				    			duration: 1500
				    		})
				    		that.isApply=true
				    	}
				    	else{
				    		wx.showToast({
				    			title: '开通成功',
				    			icon: 'success',
				    			duration: 1500
				    		})
				 			wx.switchTab({
				 				url:'../index/main'
				 			})
				    	}
				    	
				    }

				}
				console.log(this.distribeInfo);
				// Api.submitApply()
			}
		},
		computed: {

		},
		async mounted(){
			// 判断是否已经提交过申请
			let that=this
			that.memberId=wx.getStorageSync("memberId")
			let params={}
			params.memberId=that.memberId
			let isApplyRes=await Api.judgeApply(params)
			if(isApplyRes.status=='未提交申请'){
				that.isApply=false
			}
			else{
				that.isApply=true
			}
		}
	};
</script>

<style lang="less">
	.myself-dredge{
		.dredge-banner{
			width: 100%;
			height: 210px;
			overflow: hidden;
		}
		.cant{
			.weixin{
				padding: 0 40px 0 29px ;
				display: flex;
				justify-content: space-between;
				margin-top: 45px;
				&:nth-child(1){
					margin-top:39px ;
				}
				span{
					display: block;
					&:nth-child(1){
						font-size: 20px;
						color: #111111;
						font-weight: bold;
						text-align: center;						
					}
					&:nth-child(2){
						.inp{ 
							width: 199px;
							border-bottom: 1px solid #000000;
							padding-left: 10px;
							box-sizing: border-box; 
							
						}
					}
				}
			}
			.btn{
				width: 290px;
				height: 49px;
				background-color: #32a1ff;
				line-height: 49px;
				border-radius: 3px;
				text-align: center;
				color: #ffffff;
				font-size: 16px;
				border: 0;
				outline: none;
				margin:  64px auto 0 auto;
			}
		}
	}
</style>