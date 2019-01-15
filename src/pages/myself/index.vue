<template>
	<div class="container">
		<navigator url="../../pages/myself-grade/main">
			这是我的
		</navigator>

		<navigator url="../../pages/myself-data/main">
			个人资料
		</navigator>
		<navigator url="../../pages/myself-team/main">
			我的团队
		</navigator>

		<div class="myself">
			<!--头像-->
            <div class="myself-head">
            	<div class="img"><img :src="head.img"/></div>
            	<div class="cant">
            		<span>{{head.name}}</span>
            		<span>ID : {{head.id}}</span>
            	</div>
            	<div class="service">
            		<span class="iconfont">&#xe61a;</span>
            		<span>客服</span>
            	</div>
            </div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
              head:{
              	name:"bobo",
              	id:"12345",
              	img:"/static/images/head.png"
              }
			}
		},
		components: {

		},

		methods: {

		},
		mounted() {

		},
	}
</script>

<style lang="less">
.myself{
	.myself-head{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 295px;
		padding: 20px 0 40px 0;
		margin:  0 auto;
		
		.img{
			width: 58px;
			height: 58px;
			border-radius: 50%;
			overflow: hidden;
		}
		.cant{
			margin-right:120px ;
			span{
				display: block;
				&:nth-child(1){
					color: #111111;
					font-size: 18px;
					font-weight: bold;
					
				}
				&:nth-child(2){
					color: #999999;
					font-size: 13px;
					
				}
			}
		}
		.service{
			span{
				display: block;
				text-align:center; 
				&:nth-child(1){
					
				}
				&:nth-child(2){
					font-size: 12px;
					color: #999999;
					
				}
			}
		}
	}
}
</style>