<template>
	<div>
		<div class="heads">
			<div class="img"><img :src="memberInfo.face" /></div>
			<div class="cant">
				<span>{{memberInfo.uname}}</span>
				<span>{{memberInfo.lvname}}</span>
			</div>
			<div class="btn" @click="updatememberInfo">
				{{compile}}
			</div>
		</div>

		<div class="mymessage">
			<div class="mymessage-li">
				<span>我 的 I D<i></i></span>
				<span>:</span>
				<input class="mymessage-value" :class="isOn===true?'on':''" type="text" v-model="memberInfo.id" disabled="true" />
			</div>
			<div class="mymessage-li">
				<span>消费金额<i></i></span>
				<span>:</span>
				<input class="mymessage-value" :class="isOn===true?'on':''" type="text" v-model="memberInfo.consumeAmount" disabled="true" />
			</div>
			<div class="mymessage-li">
				<span>推荐人<i></i></span>
				<span>:</span>
				<input class="mymessage-value" :class="isOn===true?'on':''" type="text" v-model="tjname" disabled="true" />
			</div>
			<div class="mymessage-li">
				<span>加入时间<i></i></span>
				<span>:</span>
				<input class="mymessage-value" :class="isOn===true?'on':''" type="text" v-model="memberInfo.time" disabled="true" />
			</div>
			<div class="mymessage-li">
				<span>性 别<i></i></span>
				<span>:</span>
				<input class="mymessage-value" :class="isOn===true?'on':''" type="text" v-model="sex" :disabled="isDisabled" />
			</div>
			<div class="mymessage-li">
				<span>真实姓名<i></i></span>
				<span>:</span>
				<input class="mymessage-value" :class="isOn===true?'on':''" type="text" v-model="memberInfo.name" :disabled="isDisabled" />
			</div>
			<div class="mymessage-li">
				<span>电 话<i></i></span>
				<span>:</span>
				<input class="mymessage-value" :class="isOn===true?'on':''" type="text" v-model="memberInfo.mobile" :disabled="isDisabled" />
			</div>
			<div class="mymessage-li">
				<span>地 区<i></i></span>
				<span>:</span>
				<input class="mymessage-value" :class="isOn===true?'on':''" type="text" v-model="memberInfo.city" :disabled="isDisabled" />
			</div>

		</div>

	</div>
</template>
<script>
	import Api from "@/api/userinfo";
	export default {

		data() {
			return {
				compile: "编辑",
				isOn: false,
				isDisabled: true,
				memberInfo:{},
				sex:''
			};
		},
		methods: {
			async updatememberInfo(){
				let that=this
				if(this.compile=='完成'){
					wx.showLoading({
						title: '请稍等',
					})
					this.memberInfo.sex=this.sex=='男'?1:this.sex=='女'?2:0
					let updateRes=await Api.memberInfoUpdate(this.memberInfo)
					if(updateRes.code==0){
						wx.hideLoading()
						that.compile='编辑'
						that.isOn = false
						that.isDisabled = true
						wx.showToast({
							title: '修改成功',
							icon: 'success',
							duration: 1500
						})
					}
					
				}
				else{
					this.compile='完成'
					this.isOn = true
					this.isDisabled = false
				}
			}
			// btn(index) {
			// 	this.compile = "完成"
			// 	this.isOn = true
			// 	this.isDisabled = false
				

			// },
			// btn1() {
			// 	this.compile = "编辑"
			// 	this.isOn = false
			// 	this.isDisabled = true
			// 	wx.showToast({
			// 		title: '修改成功',
			// 		icon: 'success',
			// 		duration: 1500
			// 	})
			// },
		},
		async onLoad(options){
			let that=this
			wx.showLoading({
				title: '加载中',
			})
			let memberInfo=await Api.memberInfo(options)
			if(memberInfo.code==0){
				that.memberInfo=memberInfo.data
				that.sex=that.memberInfo.sex==1?'男':that.memberInfo.sex==2?'女':'未知'
				wx.hideLoading()
			}	
		},
		computed: {
			sexfilter(){
				let that=this
				return that.memberInfo.sex==1?'男':that.memberInfo.sex==2?'女':'未知'
			},
			tjname(){
				let that=this
				return that.memberInfo.tjname==null?'无推荐人':that.memberInfo.tjname
			}
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