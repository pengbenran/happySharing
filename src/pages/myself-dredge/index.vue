<template>
	<div>
		<div class="myself-dredge">
			<div class="dredge-banner">
				<img src="/static/images/dredge-banner.png" />
			</div>

			<!--注册类容-->
			<div class="cant">
				<div class="weixin" v-for="(item,index) in weixin">
					<span>{{item.name}}:</span>
					<span> <input @click="togg" class="inp" :type="item.txt"/></span>
				</div>
				<!--按钮·-->
			<div class="btn">提交审核</div>
			</div>
			
		</div>

	</div>
</template>
<script>
	export default {
		data() {
			return {
				show:true,  
				weixin: [{
						txt: "text",
						name:"微 信 号"
					},
					{
						txt: "number",
						name:"手 机 号"
					},
					{
						txt: "text",
						name:"真实姓名"
					},
				]
			};
		},
		methods: {
			togg(){
				this.show = false
			}
		},
		computed: {

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
				margin:  64px auto 0 auto;
			}
		}
	}
</style>